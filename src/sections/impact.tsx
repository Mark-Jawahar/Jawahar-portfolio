"use client";

import { motion, useInView, useMotionValue, useTransform, useMotionTemplate, useReducedMotion, animate, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionBadge } from "@/components/ui/section-badge";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { EASE } from "@/lib/motion";

interface CounterProps {
  end: number;
  suffix?: string;
}

function Counter({ end, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const text = useMotionTemplate`${rounded}${suffix}`;

  useEffect(() => {
    if (!inView) return;

    const controls = animate(motionValue, end, {
      duration: prefersReducedMotion ? 0 : 2,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, end, motionValue, prefersReducedMotion]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

type Stat =
  | { label: string; sublabel: string; value: number; suffix?: string }
  | { label: string; sublabel: string; headline: string };

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Learners Onboarded", sublabel: "Seamless onboarding journeys" },
  { value: 80, suffix: "+", label: "Property Transactions", sublabel: "End-to-end client management" },
  { value: 150, suffix: "+", label: "Customer Leads Managed", sublabel: "Monthly qualification & follow-up" },
  { value: 30, suffix: "%", label: "Process Improvement", sublabel: "Standardized onboarding workflows" },
  { value: 5, suffix: "+ Years", label: "Experience", sublabel: "Across EdTech, Real Estate & Financial Services" },
  { headline: "Customer-First", label: "Mindset", sublabel: "Empathy-driven service & long-term relationships" },
];

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Impact() {
  return (
    <section id="impact" className="relative py-24 sm:py-36 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.7_0.08_240_/_0.04),_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 sm:mb-24"
        >
          <SectionBadge label="Impact" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-6 leading-[1.08]">
            Customer Impact,<br />
            <span className="text-gradient font-semibold">Measured.</span>
          </h2>
          <p className="text-silver/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every metric reflects meaningful improvements in customer experience, operational excellence, and long-term business value.
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <LiquidGlassCard
              key={stat.label}
              variants={gridItem}
              className="group rounded-2xl p-6 sm:p-8 h-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl font-light text-gradient mb-3 tracking-tight">
                  {"value" in stat ? (
                    <Counter end={stat.value} suffix={stat.suffix} />
                  ) : (
                    <span className="block text-3xl sm:text-4xl leading-tight">
                      {stat.headline}
                    </span>
                  )}
                </div>
                <h3 className="text-silver/90 font-medium text-sm sm:text-base mb-1">
                  {stat.label}
                </h3>
                <p className="text-graphite text-xs sm:text-sm">{stat.sublabel}</p>
              </div>
            </LiquidGlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
