"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)] to-[var(--color-bg-secondary)] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <span className="text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase font-medium">
                      Since 2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-premium block">Our Story</span>
            <h2 className="mt-4 heading-lg text-[var(--color-text-primary)] text-balance">
              Where Craftsmanship
              <br />
              <span className="italic">Meets Design</span>
            </h2>
            <div className="mt-8 space-y-5 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty max-w-md">
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
