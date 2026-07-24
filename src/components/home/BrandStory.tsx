"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function BrandStory() {
  return (
    <section className="section-lg">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] overflow-hidden shadow-[var(--shadow-md)]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)]/25 to-transparent" />
                  <p className="mt-8 text-xs text-[var(--color-text-tertiary)] tracking-[0.15em] uppercase leading-loose">
                    Since 2024
                    <br />
                    Crafted in India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] font-medium">
              <span className="w-6 h-px bg-[var(--color-accent)]" />
              Our Story
            </span>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.75rem)] font-serif text-[var(--color-text-primary)] leading-[0.92] tracking-[-0.02em] text-balance">
              Where Craftsmanship
              <br />
              <span className="italic">Meets Design</span>
            </h2>
            <div className="mt-8 space-y-5 text-sm lg:text-[15px] text-[var(--color-text-secondary)] leading-relaxed text-pretty">
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
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-60 transition-opacity group"
              >
                Read Our Story
                <HiOutlineArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
