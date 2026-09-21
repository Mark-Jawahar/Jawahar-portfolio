"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { siteConfig } from "@/config/site";
import { Users, Target, RefreshCw, AlertTriangle, BarChart2, Database } from "lucide-react";
import { EASE } from "@/lib/motion";

const focusAreas = [
  { icon: Users, label: "Customer Success" },
  { icon: Target, label: "Customer Onboarding" },
  { icon: RefreshCw, label: "Customer Lifecycle Management" },
  { icon: AlertTriangle, label: "Escalation Management" },
  { icon: BarChart2, label: "Process Improvement" },
  { icon: Database, label: "CRM & Operations" },
];

const paragraphContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const paragraphItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-36 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.4_0.03_240_/_0.04),_transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SectionBadge label="About Me" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-8 leading-[1.08]">
              Who <span className="text-gradient font-semibold">I Am</span>
            </h2>
<motion.div
              variants={paragraphContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-5 text-silver/75 leading-[1.95] text-[15px] sm:text-base"
            >
              <motion.p variants={paragraphItem}>
                I&apos;m an Assistant Team Lead — Customer Experience in Bengaluru with 5+ years
                across Customer Success, Customer Onboarding, and CX Operations in EdTech,
                Real Estate, and Financial Services. I lead a 10-member CX team, onboard
                500+ learners, and have cut repeat queries by 30%, lifted CSAT 25%, and
                improved team productivity 20%.
              </motion.p>
              <motion.p variants={paragraphItem}>
                My career path — Lead Generation (2021) to Relationship Management (2023)
                to Customer Experience (2024) and now Assistant Team Lead (2026) — reflects
                a consistent focus on scalable customer operations. I&apos;ve managed 80+
                concurrent property transactions with a 48-hour SLA and qualified 150+
                leads monthly.
              </motion.p>
              <motion.p variants={paragraphItem}>
                I turn fragmented customer journeys into measurable outcomes: structured
                onboarding workflows, proactive communication cadences, KPI-driven coaching,
                CRM hygiene, and cross-functional collaboration with Product, Sales,
                Marketing, and Operations to resolve UX pain points at the root.
              </motion.p>
            </motion.div>
          </motion.div>

          <LiquidGlassCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            tilt={false}
            className="rounded-3xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/10 shrink-0">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase">
                Core Focus Areas
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: EASE }}
                  className="group flex flex-col items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center transition-all duration-300 group-hover:bg-accent/15 group-hover:border-accent/35">
                    <area.icon
                      size={18}
                      className="text-accent-bright/80 group-hover:text-accent-bright transition-colors"
                    />
                  </div>
                  <span className="text-sm text-silver/80 group-hover:text-white transition-colors">
                    {area.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
}
