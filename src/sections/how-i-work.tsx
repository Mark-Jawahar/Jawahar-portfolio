"use client";

import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { EASE } from "@/lib/motion";

const principles = [
  {
    title: "Listen First",
    description:
      "Understanding the customer's real problem before proposing solutions.",
  },
  {
    title: "Think in Processes",
    description:
      "Rather than solving the same issue repeatedly, I improve the process so the problem occurs less often.",
  },
  {
    title: "Collaborate Across Teams",
    description:
      "Great customer experiences are built through collaboration with Admissions, Product, Operations, Marketing, and Support.",
  },
  {
    title: "Use Data with Empathy",
    description:
      "Customer feedback, CRM insights, and operational metrics guide decisions — but empathy remains the foundation.",
  },
  {
    title: "Always Improve",
    description:
      "I continuously refine documentation, workflows, and communication to create smoother experiences for customers and internal teams.",
  },
];

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function HowIWork() {
  return (
    <section id="how-i-work" className="relative py-24 sm:py-36 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.7_0.05_285_/_0.04),_transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Approach" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-6 leading-[1.08]">
            How I{" "}
            <span className="text-gradient font-semibold">Work</span>
          </h2>
          <p className="text-silver/75 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The principles that guide every customer interaction I design.
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-4 sm:gap-6"
        >
          {principles.map((principle, i) => (
            <LiquidGlassCard
              key={principle.title}
              variants={gridItem}
              className={
                i === principles.length - 1
                  ? "rounded-2xl p-7 sm:p-9 md:col-span-2 flex md:flex-row md:items-center gap-5 md:gap-8"
                  : "rounded-2xl p-7 sm:p-9"
              }
            >
              <div
                className={
                  i === principles.length - 1
                    ? "text-4xl sm:text-5xl font-extralight text-graphite tracking-tight shrink-0"
                    : "text-4xl sm:text-5xl font-extralight text-graphite tracking-tight mb-5"
                }
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-2">
                  {principle.title}
                </h3>
                <p className="text-[15px] text-silver/70 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
