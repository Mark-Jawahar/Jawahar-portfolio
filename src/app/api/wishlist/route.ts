import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    const parsed = wishlist.map((w) => ({
      ...w,
      product: {
        ...w.product,
        images: JSON.parse(w.product.images),
        sizes: w.product.sizes ? JSON.parse(w.product.sizes) : null,
        colors: w.product.colors ? JSON.parse(w.product.colors) : null,
        materials: JSON.parse(w.product.materials),
      },
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { productId } = await request.json();

    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return NextResponse.json({ wishlisted: false });
    }

    await prisma.wishlist.create({ data: { userId: user.id, productId } });
    return NextResponse.json({ wishlisted: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
