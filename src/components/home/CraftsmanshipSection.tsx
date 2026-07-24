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
    <section className="section">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
              Craftsmanship
            </span>
            <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-serif text-[var(--color-text-primary)] leading-[1.1] text-balance">
              The Art of
              <br />
              <span className="italic">Slow Making</span>
            </h2>
            <p className="mt-8 text-sm lg:text-[15px] text-[var(--color-text-secondary)] leading-relaxed text-pretty max-w-md">
              In a world of mass production, we choose a different path. Every HookedByPree creation
              is a meditation in patience — hours of meticulous handwork transformed into something
              truly extraordinary.
            </p>
            <div className="mt-12 grid sm:grid-cols-2 gap-7">
              {values.map((value) => (
                <div key={value.title}>
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                    <value.icon className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)] leading-relaxed text-pretty">
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
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] overflow-hidden shadow-[var(--shadow-md)]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border-2 border-dashed border-[var(--color-accent)]/30">
                    <div className="text-center">
                      <p className="text-5xl font-serif text-[var(--color-accent)]">40+</p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1 tracking-wider uppercase">Hours Per Piece</p>
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
