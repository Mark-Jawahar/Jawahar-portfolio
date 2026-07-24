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
    <div className="page-top">
      <div className="container-luxury section">
        <SectionHeading
          label="Collection 01"
          title="The Apparel Collection"
          description="Bespoke Crochet Tops · Statement Jackets · Artisan Caps — Step into sustainable handcrafted fashion that makes a statement."
        />
        {loading ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)]" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
