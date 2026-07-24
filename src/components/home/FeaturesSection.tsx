"use client";

import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineGlobeAlt, HiOutlineTruck, HiOutlineSwatch, HiOutlineGift } from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "100% Handmade",
    description: "Every piece is individually hand-crocheted by skilled artisans. No machines, just pure craftsmanship.",
  },
  {
    icon: HiOutlineHeart,
    title: "Made With Love",
    description: "Each stitch carries the passion and dedication of its maker. Every creation is infused with care.",
  },
  {
    icon: HiOutlineSwatch,
    title: "Premium Yarn",
    description: "We source only the finest cotton, merino, and alpaca blends for lasting beauty and comfort.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Slow Fashion",
    description: "We believe in mindful making. Quality over quantity, timeless over trendy, sustainable over disposable.",
  },
  {
    icon: HiOutlineGift,
    title: "Premium Packaging",
    description: "Every order arrives in elegant signature packaging, ready to gift or treasure.",
  },
  {
    icon: HiOutlineTruck,
    title: "Custom Orders",
    description: "Dream it, we'll craft it. We love bringing your unique vision to life through custom commissions.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="container-site">
        <div className="max-w-xl">
          <span className="label-premium block">Why HookedByPree</span>
          <h2 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
            The Art of Handmade
          </h2>
          <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty">
            Every creation is a celebration of slow fashion, premium materials, and timeless design.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-lg)] p-6 lg:p-8 bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="mt-5 text-base font-medium text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
