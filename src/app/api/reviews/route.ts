import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Please login to leave a review" }, { status: 401 });
    }

    const { productId, rating, content } = await request.json();

    if (!productId || !rating || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const hasOrdered = await prisma.orderItem.findFirst({
      where: { productId, order: { userId: user.id } },
    });

    const existing = await prisma.review.findUnique({
      where: { productId_userId: { productId, userId: user.id } },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: user.id,
        rating,
        content,
        isVerified: !!hasOrdered,
      },
      include: { user: { select: { name: true } } },
    });

    const avg = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true,
    });

    await prisma.product.update({
      where: { id: productId },
      data: { rating: avg._avg.rating || 0, reviewCount: avg._count },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
