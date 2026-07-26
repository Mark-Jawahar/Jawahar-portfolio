"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { GlassCard } from "@/components/effects/GlassCard";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { Users, BarChart3, Wrench, Globe } from "lucide-react";

const categories = [
  { key: "customerSuccess", label: "Customer Success & Operations", icon: Users },
  { key: "operations", label: "Operations & Analytics", icon: BarChart3 },
  { key: "tools", label: "Tools & Platforms", icon: Wrench },
  { key: "languages", label: "Languages", icon: Globe },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="experience" ref={sectionRef} className="aurora-bg relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-soft-cyan/15 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-accent-soft-lavender/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 04</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">Customer</span>{" "}
            <span className="text-gradient-accent">Experience</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-14">
            Tools and expertise built across 5+ years in EdTech, Real Estate, and Financial Services.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const items = skills[cat.key as keyof typeof skills];

            return (
              <GlassCard key={cat.key} delay={0.15 + idx * 0.1} padding="md">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent-pearl/80" />
                  </div>
                  <h3 className="text-sm font-medium text-white-soft tracking-tight">{cat.label}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(items) &&
                    items.map((item: any, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 + idx * 0.1 + i * 0.04 }}
                        className="glass rounded-full px-3.5 py-1.5 text-[0.75rem] text-white-muted/80 hover:glass-hover hover:text-accent-pearl/80 transition-all duration-400 cursor-default"
                      >
                        {typeof item === "string" ? item : `${item.name} — ${item.level}`}
                      </motion.span>
                    ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
