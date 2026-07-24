"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-container)] bg-[var(--color-bg-secondary)] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-transparent" />
                  <p className="mt-4 text-xs text-[var(--color-text-secondary)] tracking-[0.15em] uppercase">
                    Since 2024
                    <br />
                    Crafted in India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl xl:text-5xl font-serif text-[var(--color-text-primary)] leading-tight">
              Where Craftsmanship
              <br />
              <span className="italic">Meets Design</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                Welcome to HookedByPree, where the timeless art of crochet meets contemporary design.
              </p>
              <p>
                Every piece in our collection is 100% handcrafted with precision, passion, and premium yarn.
              </p>
              <p>
                We don&apos;t just make products. We craft bespoke wearable art and unforgettable keepsakes
                designed exclusively for you.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-70 transition-opacity"
              >
                Read Our Story
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
