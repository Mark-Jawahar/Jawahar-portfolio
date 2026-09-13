"use client";

import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { EASE } from "@/lib/motion";

const principles = [
  {
    title: "Listen First",
    description:
      "Understand the customer's real problem before proposing solutions. At Hello Mentor, this meant shadowing support calls and reading 200+ parent emails to redesign onboarding, cutting confusion by 40%.",
  },
  {
    title: "Build Repeatable Processes",
    description:
      "Turn recurring issues into workflows, checklists, templates, and playbooks. Standardized onboarding for 500+ learners and a qualification checklist for 150+ monthly leads made follow-up quality consistent regardless of volume.",
  },
  {
    title: "Collaborate Across Teams",
    description:
      "Great customer experiences are built through collaboration with Product, Sales, Marketing, Operations, and Support. Partnered with these teams to resolve 3 major UX pain points and align handoffs across the learner journey.",
  },
  {
    title: "Measure What Matters",
    description:
      "Use CSAT, NPS, CRM insights, and operational metrics to guide decisions — empathy remains the foundation. Zero escalation breaches over 12 months came from tracking the right signals, not just reacting.",
  },
  {
    title: "Improve at Scale",
    description:
      "Fix the process instead of repeatedly fixing the same issue. A knowledge base and proactive cadence cut repeat queries by 30% (15+ hours saved weekly); team productivity rose 20% via data-driven coaching and CRM hygiene.",
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.4_0.025_285_/_0.03),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Approach" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-6 leading-[1.08]" aria-label="How I Work">
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
