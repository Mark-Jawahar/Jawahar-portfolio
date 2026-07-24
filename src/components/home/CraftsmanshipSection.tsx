"use client";

import { motion } from "framer-motion";
import { HiOutlineEye, HiOutlineHandRaised, HiOutlineClock, HiOutlineSwatch } from "react-icons/hi2";

const values = [
  {
    icon: HiOutlineHandRaised,
    title: "Handcrafted Excellence",
    description: "Each piece is created entirely by hand using traditional crochet techniques passed down through generations.",
  },
  {
    icon: HiOutlineEye,
    title: "Attention to Detail",
    description: "Every stitch is intentional. Every finish is immaculate. We never compromise on quality.",
  },
  {
    icon: HiOutlineClock,
    title: "Timeless Creation",
    description: "A single piece can take 20-40 hours to complete. We believe great craftsmanship cannot be rushed.",
  },
  {
    icon: HiOutlineSwatch,
    title: "Premium Materials",
    description: "We hand-select every yarn and material for its quality, feel, and longevity.",
  },
];

export default function CraftsmanshipSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-premium block">Craftsmanship</span>
            <h2 className="mt-4 heading-lg text-[var(--color-text-primary)] text-balance">
              The Art of
              <br />
              <span className="italic">Slow Making</span>
            </h2>
            <p className="mt-6 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty max-w-md">
              In a world of mass production, we choose a different path. Every HookedByPree creation
              is a meditation in patience — hours of meticulous handwork transformed into something
              truly extraordinary.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title}>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                    <value.icon className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-[var(--color-text-primary)]">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-accent)]/15 via-[var(--color-bg-secondary)] to-[var(--color-bg-secondary)] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border border-[var(--color-accent)]/20">
                    <div className="text-center">
                      <p className="text-5xl font-serif text-[var(--color-accent)]">40+</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">Hours Per Piece</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
