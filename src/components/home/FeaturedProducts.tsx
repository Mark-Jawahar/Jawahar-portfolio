"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="section">
      <div className="container-luxury">
        <SectionHeading
          label="Best Sellers"
          title="Our Most Treasured Pieces"
          description="Discover the designs that have captured hearts — each piece a testament to exceptional craftsmanship."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-60 transition-opacity group"
          >
            View All Products
            <HiOutlineArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
