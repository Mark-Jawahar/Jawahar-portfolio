import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest, requireAdmin } from "@/lib/auth/auth";
import { generateOrderId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const admin = requireAdmin(request);
    if (admin) {
      const orders = await prisma.order.findMany({
        include: { items: true, payment: true, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(orders);
    }

    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true, payment: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, addressId, customer, subtotal } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const user = getUserFromRequest(request);
    const orderId = generateOrderId();

    let addressRecord = null;
    if (addressId && user) {
      addressRecord = await prisma.address.findFirst({ where: { id: addressId, userId: user.id } });
    } else if (customer) {
      addressRecord = await prisma.address.create({
        data: {
          userId: user?.id || "guest",
          fullName: customer.name,
          phone: customer.phone,
          street: customer.address,
          city: customer.city,
          pincode: customer.pincode,
          label: "Delivery",
          isDefault: false,
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        id: orderId,
        userId: user?.id || null,
        addressId: addressRecord?.id || null,
        subtotal,
        total: subtotal,
        status: "pending",
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number; size?: string; color?: string; image?: string }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        userId: user?.id || null,
        amount: subtotal,
        status: "pending",
      },
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
