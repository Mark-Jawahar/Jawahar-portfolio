"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "apparel" | "gifts">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (filter !== "all") params.set("category", filter);
        if (search) params.set("search", search);
        params.set("sort", sort);
        params.set("order", "desc");

        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.map((p: Record<string, unknown>) => ({ ...p, category: p.category as "apparel" | "gifts" })) as Product[] : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter, search, sort]);

  return (
    <div className="pt-24 lg:pt-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <SectionHeading
          label="Our Collection"
          title="Every Piece, a Masterpiece"
          description="Browse our complete collection of handcrafted crochet creations."
        />

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            {(["all", "apparel", "gifts"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]"
                }`}
              >
                {f === "all" ? "All" : f === "apparel" ? "Apparel" : "Gifts"}
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center gap-3 sm:ml-auto">
            <div className="relative flex-1 max-w-xs">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-10 pr-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-text-primary)] transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 px-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-text-primary)] transition-colors"
            >
              <option value="createdAt">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-[var(--radius-card)] bg-[var(--color-bg-secondary)]" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-[var(--color-bg-secondary)] rounded-full w-1/3" />
                  <div className="h-4 bg-[var(--color-bg-secondary)] rounded-full w-2/3" />
                  <div className="h-3 bg-[var(--color-bg-secondary)] rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-[var(--color-text-secondary)] text-sm">No products found</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
