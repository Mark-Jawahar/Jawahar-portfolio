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
    <section className="section-lg">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] font-medium">
              <span className="w-6 h-px bg-[var(--color-accent)]" />
              Craftsmanship
            </span>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.75rem)] font-serif text-[var(--color-text-primary)] leading-[0.92] tracking-[-0.02em] text-balance">
              The Art of
              <br />
              <span className="italic">Slow Making</span>
            </h2>
            <p className="mt-8 text-sm lg:text-[15px] text-[var(--color-text-secondary)] leading-relaxed text-pretty max-w-md">
              In a world of mass production, we choose a different path. Every HookedByPree creation
              is a meditation in patience — hours of meticulous handwork transformed into something
              truly extraordinary.
            </p>
            <div className="mt-14 grid sm:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title}>
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/12 flex items-center justify-center">
                    <value.icon className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-5 text-sm font-medium text-[var(--color-text-primary)]">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-[var(--color-text-secondary)] leading-relaxed text-pretty">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] overflow-hidden shadow-[var(--shadow-md)]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-48 h-48 rounded-full border border-dashed border-[var(--color-accent)]/25">
                    <div className="text-center">
                      <p className="text-5xl lg:text-6xl font-serif text-[var(--color-accent)] tracking-tight">40+</p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1.5 tracking-[0.12em] uppercase">Hours Per Piece</p>
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
