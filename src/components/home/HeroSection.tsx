"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 30% 20%, var(--color-accent) 0%, transparent 60%),
                          radial-gradient(circle at 70% 80%, var(--color-accent) 0%, transparent 60%)`
      }} />
      <div className="relative z-10 container-luxury w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-screen py-32"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium mb-8">
              Premium Handcrafted Crochet
            </span>
            <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-serif text-[var(--color-text-primary)] leading-[0.92] tracking-tight text-balance">
              Elegance in
              <br />
              <span className="italic">Every Stitch</span>
            </h1>
            <p className="mt-8 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md text-pretty">
              Artistry in Every Thread. Discover bespoke handcrafted crochet creations
              where timeless tradition meets contemporary design.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/apparel"
                className="inline-flex items-center h-12 px-8 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all duration-500 active:scale-[0.97]"
              >
                Shop Collection
              </Link>
              <Link
                href="/gifts"
                className="inline-flex items-center h-12 px-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all duration-500 active:scale-[0.97]"
              >
                Explore Gifts
              </Link>
            </div>
            <div className="flex items-center gap-10 mt-14 pt-8 border-t border-[var(--color-border-light)]">
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">100%</p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 tracking-wider uppercase">Handmade</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">50+</p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 tracking-wider uppercase">Designs</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--color-text-primary)]">5K+</p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 tracking-wider uppercase">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-bg-secondary)] shadow-[var(--shadow-lg)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-56 h-56 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-20" />
                  <p className="mt-6 text-xs text-[var(--color-text-tertiary)] tracking-[0.2em] uppercase">
                    Handcrafted with Love
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/60 to-transparent">
                <div className="backdrop-blur-xl bg-[var(--color-glass)] rounded-[var(--radius-lg)] border border-[var(--color-glass-border)] p-5 shadow-[var(--shadow-glass)]">
                  <p className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-[0.15em]">
                    Featured
                  </p>
                  <p className="text-sm font-medium mt-1.5 text-[var(--color-text-primary)]">The Seraphina Crop Top</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">Premium Cotton Blend</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
