"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-accent) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, var(--color-accent) 0%, transparent 50%)`
      }} />
      <div className="relative z-10 container-site w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium mb-6">
              Premium Handcrafted Crochet
            </span>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-serif text-[var(--color-text-primary)] leading-[0.95] tracking-tight text-balance">
              Elegance in
              <br />
              <span className="italic">Every Stitch</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md text-pretty">
              Artistry in Every Thread. Discover bespoke handcrafted crochet creations
              where timeless tradition meets contemporary design.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/apparel"
                className="inline-flex items-center h-12 px-8 rounded-[var(--radius-button)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all duration-300 active:scale-[0.97]"
              >
                Shop Collection
              </Link>
              <Link
                href="/gifts"
                className="inline-flex items-center h-12 px-8 rounded-[var(--radius-button)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all duration-300 active:scale-[0.97]"
              >
                Explore Gifts
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[var(--color-border)]">
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">100%</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Handmade</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">50+</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Premium Designs</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">5K+</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[var(--radius-container)] overflow-hidden bg-[var(--color-bg-secondary)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-20" />
                  <p className="mt-4 text-xs text-[var(--color-text-secondary)] tracking-[0.2em] uppercase">
                    Handcrafted with Love
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/50 to-transparent">
                <div className="backdrop-blur-xl bg-[var(--color-glass)] rounded-[var(--radius-card-sm)] border border-[var(--color-border)] p-5">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-[0.15em]">
                    Featured
                  </p>
                  <p className="text-sm font-medium mt-1">The Seraphina Crop Top</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Premium Cotton Blend</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
