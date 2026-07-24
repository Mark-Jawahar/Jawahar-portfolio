"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
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
        <SectionHeading
          label="Collection 02"
          title="The Gifting Collection"
          description="Everlasting Crochet Bouquets · Signature Crochet Keychains — Give the gift of everlasting memories with handcrafted creations made to last forever."
        />
        {loading ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-[var(--radius-card)] bg-[var(--color-bg-secondary)]" />
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
