import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { status, adminNotes, orderStatus } = await request.json();

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        status,
        adminNotes,
        verifiedAt: status === "verified" ? new Date() : undefined,
        verifiedBy: admin.id,
      },
    });

    if (orderStatus) {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: orderStatus },
      });
    }

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}
