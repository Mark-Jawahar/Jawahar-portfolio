"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-primary)]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-primary)]/30 to-[var(--color-bg-primary)] z-10" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 80% 30%, var(--color-accent) 0%, transparent 40%)`
      }} />

      <div className="relative z-20 container-site w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto pt-32 lg:pt-40 pb-20 lg:pb-32"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="label-premium block mb-6"
          >
            Premium Handcrafted Crochet
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl text-[var(--color-text-primary)] text-balance"
          >
            Elegance in
            <br />
            <span className="italic">Every Stitch</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-lg text-pretty leading-relaxed"
          >
            Artistry in Every Thread. Discover bespoke handcrafted crochet creations
            where timeless tradition meets contemporary design.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link
              href="/apparel"
              className="group relative inline-flex items-center h-12 px-8 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium overflow-hidden transition-all duration-500 hover:opacity-90"
            >
              <span className="relative z-10">Shop Collection</span>
            </Link>
            <Link
              href="/gifts"
              className="group relative inline-flex items-center h-12 px-8 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium overflow-hidden transition-all duration-500 hover:border-[var(--color-text-primary)]"
            >
              <span className="relative z-10">Explore Gifts</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-10 mt-16 pt-8 border-t border-[var(--color-border)]"
          >
            {[
              { value: "100%", label: "Handmade" },
              { value: "50+", label: "Premium Designs" },
              { value: "5K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl lg:text-3xl font-serif text-[var(--color-text-primary)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-[var(--color-text-tertiary)]">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-[var(--color-text-tertiary)]" />
        </div>
      </motion.div>
    </section>
  );
}
