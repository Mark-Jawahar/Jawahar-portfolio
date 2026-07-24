"use client";

import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineGlobeAlt, HiOutlineSwatch } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <div className="page-top">
      <section className="section">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
                About Us
              </span>
              <h1 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-serif text-[var(--color-text-primary)] leading-tight">
                Our Story
              </h1>
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
                <p>
                  Founded with a vision to revive the beauty of handmade craftsmanship, HookedByPree
                  celebrates the imperfect perfection that only human hands can create. Each piece tells
                  a story — of patience, of skill, of love for the craft.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] overflow-hidden flex items-center justify-center shadow-[var(--shadow-md)]">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 via-transparent to-transparent" />
                  <p className="mt-6 font-serif text-2xl text-[var(--color-text-primary)]">
                    HookedByPree
                  </p>
                  <p className="mt-2 text-xs text-[var(--color-text-tertiary)] tracking-[0.15em] uppercase">
                    Elegance in Every Stitch
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-luxury">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            description="Every creation reflects our commitment to craftsmanship, sustainability, and love."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[var(--radius-xl)] p-7 lg:p-8 bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                  <value.icon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="mt-5 text-sm font-medium text-[var(--color-text-primary)]">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm text-[var(--color-text-secondary)] leading-relaxed text-pretty">
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
