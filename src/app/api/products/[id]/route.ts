import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      images: JSON.parse(product.images),
      sizes: product.sizes ? JSON.parse(product.sizes) : null,
      colors: product.colors ? JSON.parse(product.colors) : null,
      materials: JSON.parse(product.materials),
      occasions: product.occasions ? JSON.parse(product.occasions) : null,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        price: data.price,
        comparePrice: data.comparePrice,
        images: data.images ? JSON.stringify(data.images) : undefined,
        category: data.category,
        collection: data.collection,
        sizes: data.sizes ? JSON.stringify(data.sizes) : undefined,
        colors: data.colors ? JSON.stringify(data.colors) : undefined,
        materials: data.materials ? JSON.stringify(data.materials) : undefined,
        isBestSeller: data.isBestSeller,
        isNew: data.isNew,
        isCustomizable: data.isCustomizable,
        isGiftReady: data.isGiftReady,
        isPremiumPackaging: data.isPremiumPackaging,
        occasions: data.occasions ? JSON.stringify(data.occasions) : undefined,
        inStock: data.inStock,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
