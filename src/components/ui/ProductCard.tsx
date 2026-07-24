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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      <div className="relative rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-bg-secondary)] aspect-[3/4]">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-accent)] text-[10px] font-medium text-[var(--color-text-primary)] backdrop-blur-md">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-text-primary)] text-[10px] font-medium text-[var(--color-bg-primary)]">
              New
            </span>
          )}
          {product.comparePrice && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-error)]/90 text-[10px] font-medium text-white">
              Sale
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            className="w-9 h-9 rounded-full bg-[var(--color-glass)] backdrop-blur-md flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300"
            aria-label="Add to wishlist"
          >
            <HiOutlineHeart className="w-4 h-4" />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-9 h-9 rounded-full bg-[var(--color-glass)] backdrop-blur-md flex items-center justify-center hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300"
            aria-label="Quick view"
          >
            <HiOutlineEye className="w-4 h-4" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/product/${product.id}`}
            className="block w-full text-center h-10 flex items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-glass)] backdrop-blur-md text-xs font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300"
          >
            Quick Add
          </Link>
        </div>

        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-glass)] backdrop-blur-md px-2 py-1 rounded-full">
            Handmade
          </span>
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 mb-1">
          <HiStar className="w-3 h-3 text-[var(--color-star)]" />
          <span className="text-xs text-[var(--color-text-secondary)]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
          {product.tagline}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-[var(--color-text-secondary)] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-[var(--color-border)]"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[var(--color-text-secondary)]">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
