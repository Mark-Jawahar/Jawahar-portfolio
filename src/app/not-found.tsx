"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center container-luxury"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
          Error 404
        </p>
        <h1 className="mt-6 text-[clamp(3rem,6vw,5rem)] font-serif text-[var(--color-text-primary)] leading-[0.92] tracking-[-0.02em]">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto text-pretty">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-white text-sm font-medium hover:opacity-90 transition-all shadow-[var(--shadow-sm)]"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all"
          >
            Browse Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
