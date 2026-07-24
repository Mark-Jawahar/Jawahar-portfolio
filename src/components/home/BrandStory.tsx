"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function BrandStory() {
  return (
    <section className="section">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] overflow-hidden shadow-[var(--shadow-md)]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-transparent" />
                  <p className="mt-6 text-xs text-[var(--color-text-tertiary)] tracking-[0.15em] uppercase leading-loose">
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
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
              Our Story
            </span>
            <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-serif text-[var(--color-text-primary)] leading-[1.1] text-balance">
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
