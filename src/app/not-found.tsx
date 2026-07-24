"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] font-medium">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl lg:text-7xl font-serif text-[var(--color-text-primary)]">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[var(--radius-button)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[var(--radius-button)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all"
          >
            Browse Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
