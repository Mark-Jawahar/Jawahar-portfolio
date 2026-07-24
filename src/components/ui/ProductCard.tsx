"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineEye } from "react-icons/hi2";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] aspect-[3/4] shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-elevated)]">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="px-3 py-1 rounded-full bg-[var(--color-accent)] text-[10px] font-medium text-white tracking-wide">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-medium text-[var(--color-text-primary)] tracking-wide">
              New
            </span>
          )}
          {product.comparePrice && (
            <span className="px-3 py-1 rounded-full bg-[var(--color-error)]/90 text-[10px] font-medium text-white tracking-wide">
              Sale
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
          <button
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-white transition-all duration-300 shadow-[var(--shadow-sm)]"
            aria-label="Add to wishlist"
          >
            <HiOutlineHeart className="w-4 h-4" />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-white transition-all duration-300 shadow-[var(--shadow-sm)]"
            aria-label="Quick view"
          >
            <HiOutlineEye className="w-4 h-4" />
          </Link>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400"
        >
          <span className="block w-full text-center h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-xs font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-text-primary)] hover:text-white transition-all duration-300 shadow-[var(--shadow-sm)]">
            Quick Add
          </span>
        </Link>
      </div>

      <div className="mt-4 px-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-1">
          {product.tagline}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-[var(--color-text-secondary)] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-[10px] text-[var(--color-star)]">{product.rating}</span>
          <span className="text-[10px] text-[var(--color-text-tertiary)]">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </motion.div>
  );
}
