"use client";

import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineGlobeAlt, HiOutlineSwatch } from "react-icons/hi2";

const values = [
  {
    icon: HiOutlineHeart,
    title: "Made With Love",
    description: "Every creation begins with a spark of inspiration and hours of dedicated handwork.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Exceptional Quality",
    description: "We use only premium materials and time-honored techniques to ensure lasting beauty.",
  },
  {
    icon: HiOutlineSwatch,
    title: "Sustainable Fashion",
    description: "Slow fashion is our commitment. Quality pieces designed to be treasured for years.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Proudly Indian",
    description: "Every piece is handcrafted in India, celebrating our rich textile heritage.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-[88px]">
      <section className="section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-premium block">About Us</span>
              <h1 className="mt-4 heading-lg text-[var(--color-text-primary)] text-balance">
                Our Story
              </h1>
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
                <p>
                  Founded with a vision to revive the beauty of handmade craftsmanship, HookedByPree
                  celebrates the imperfect perfection that only human hands can create. Each piece tells
                  a story — of patience, of skill, of love for the craft.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-bg-secondary)] to-[var(--color-bg-secondary)] overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <span className="text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase font-medium">
                      Since 2024
                    </span>
                  </div>
                  <p className="mt-8 font-serif text-2xl text-[var(--color-text-primary)]">
                    HookedByPree
                  </p>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)] tracking-[0.15em] uppercase">
                    Elegance in Every Stitch
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="container-site">
          <div className="max-w-xl">
            <span className="label-premium block">Our Values</span>
            <h2 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
              What We Stand For
            </h2>
            <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">
              Every creation reflects our commitment to craftsmanship, sustainability, and love.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[var(--radius-lg)] p-6 lg:p-8 bg-[var(--color-card-bg)] border border-[var(--color-border)]"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                  <value.icon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="mt-5 text-base font-medium text-[var(--color-text-primary)]">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
