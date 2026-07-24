"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMagnifyingGlassPlus, HiOutlineXMark } from "react-icons/hi2";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProductImage({ src, alt, priority }: ProductImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className="relative w-full aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-bg-secondary)] cursor-crosshair group shadow-[var(--shadow-sm)]"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-glass)] backdrop-blur-md border border-[var(--color-glass-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[var(--shadow-sm)]">
          <HiOutlineMagnifyingGlassPlus className="w-[18px] h-[18px] text-[var(--color-text-secondary)]" />
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <HiOutlineXMark className="w-5 h-5 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl aspect-[4/5]"
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
