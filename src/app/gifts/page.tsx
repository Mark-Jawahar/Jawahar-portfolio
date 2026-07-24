"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

export default function GiftsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=gifts&sort=createdAt&order=desc")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.map((p: Record<string, unknown>) => ({ ...p, category: p.category as "apparel" | "gifts" })) as Product[] : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 lg:pt-[88px]">
      <div className="container-site section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-premium block">Collection 02</span>
          <h1 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
            The Gifting Collection
          </h1>
          <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
            Everlasting Crochet Bouquets · Signature Crochet Keychains — Give the gift of everlasting memories with handcrafted creations made to last forever.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)]" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
