import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (collection) where.collection = collection;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { tagline: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { [sort]: order },
    });

    const parsed = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images),
      sizes: p.sizes ? JSON.parse(p.sizes) : null,
      colors: p.colors ? JSON.parse(p.colors) : null,
      materials: JSON.parse(p.materials),
      occasions: p.occasions ? JSON.parse(p.occasions) : null,
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        id: data.id || `product-${Date.now()}`,
        name: data.name,
        tagline: data.tagline || "",
        description: data.description || "",
        price: data.price,
        comparePrice: data.comparePrice || null,
        images: JSON.stringify(data.images || []),
        category: data.category,
        collection: data.collection,
        sizes: data.sizes ? JSON.stringify(data.sizes) : null,
        colors: data.colors ? JSON.stringify(data.colors) : null,
        materials: JSON.stringify(data.materials || []),
        isBestSeller: data.isBestSeller || false,
        isNew: data.isNew || false,
        isCustomizable: data.isCustomizable || false,
        isGiftReady: data.isGiftReady || false,
        isPremiumPackaging: data.isPremiumPackaging || false,
        occasions: data.occasions ? JSON.stringify(data.occasions) : null,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        deliveryEstimate: data.deliveryEstimate || "5-7",
        inStock: data.inStock !== false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
