"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionHeading
          label="Best Sellers"
          title="Our Most Treasured Pieces"
          description="Discover the designs that have captured hearts — each piece a testament to exceptional craftsmanship."
        />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-70 transition-opacity"
          >
            View All Products
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
