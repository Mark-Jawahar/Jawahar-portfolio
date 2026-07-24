"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="section-padding bg-[var(--color-bg-primary)]">
      <div className="container-site">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="label-premium block">Best Sellers</span>
            <h2 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
              Our Most Treasured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
          >
            View All
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            View All Products &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
