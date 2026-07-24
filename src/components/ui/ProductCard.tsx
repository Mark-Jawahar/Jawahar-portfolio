"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineEye, HiStar } from "react-icons/hi2";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <div className="relative rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-bg-secondary)] aspect-[3/4] shadow-[var(--shadow-xs)]">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/90 backdrop-blur-md text-[10px] font-medium text-white tracking-wider uppercase">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 rounded-full bg-[var(--color-text-primary)]/90 text-[10px] font-medium text-[var(--color-bg-primary)] tracking-wider uppercase">
              New
            </span>
          )}
          {product.comparePrice && (
            <span className="px-3 py-1 rounded-full bg-[var(--color-error)]/90 text-[10px] font-medium text-white tracking-wider uppercase">
              Sale
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
          <button
            className="w-10 h-10 rounded-full bg-[var(--color-glass)] backdrop-blur-md border border-[var(--color-glass-border)] flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300 shadow-[var(--shadow-sm)]"
            aria-label="Add to wishlist"
          >
            <HiOutlineHeart className="w-[18px] h-[18px]" />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-[var(--color-glass)] backdrop-blur-md border border-[var(--color-glass-border)] flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300 shadow-[var(--shadow-sm)]"
            aria-label="Quick view"
          >
            <HiOutlineEye className="w-[18px] h-[18px]" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/product/${product.id}`}
            className="block w-full text-center h-11 flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-glass)] backdrop-blur-md text-xs font-medium text-[var(--color-text-primary)] border border-[var(--color-glass-border)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300 shadow-[var(--shadow-sm)]"
          >
            Quick Add
          </Link>
        </div>

        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[10px] text-[var(--color-text-tertiary)] bg-[var(--color-glass)] backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--color-glass-border)]">
            Handmade
          </span>
        </div>
      </div>

      <div className="mt-5 flex-1 flex flex-col gap-0">
        <div className="flex items-center gap-1.5 mb-2">
          <HiStar className="w-3 h-3 text-[var(--color-accent)]" />
          <span className="text-[11px] text-[var(--color-text-tertiary)]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] leading-snug hover:opacity-60 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-1 line-clamp-1">
          {product.tagline}
        </p>
        <div className="flex items-center gap-2.5 mt-2.5">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-[var(--color-text-tertiary)] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-[14px] h-[14px] rounded-full border border-[var(--color-border)] ring-1 ring-white"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[var(--color-text-tertiary)] ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
