"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/types";

export default function ApparelPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=apparel&sort=createdAt&order=desc")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.map((p: Record<string, unknown>) => ({ ...p, category: p.category as "apparel" | "gifts" })) as Product[] : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 lg:pt-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <SectionHeading
          label="Collection 01"
          title="The Apparel Collection"
          description="Bespoke Crochet Tops · Statement Jackets · Artisan Caps — Step into sustainable handcrafted fashion that makes a statement."
        />
        {loading ? (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-[var(--radius-card)] bg-[var(--color-bg-secondary)]" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
