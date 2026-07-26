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
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-ice/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 04
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">Customer</span>{" "}
            <span className="text-gradient-accent">Experience</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-16">
            Tools and expertise built across 5+ years in EdTech, Real Estate, and Financial Services.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const items = skills[cat.key as keyof typeof skills];

            return (
              <GlassCard key={cat.key} delay={0.2 + idx * 0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                    <Icon size={18} className="text-accent-ice" />
                  </div>
                  <h3 className="text-sm font-semibold text-white-soft">{cat.label}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(items) &&
                    items.map((item: any, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                        className="glass rounded-full px-3 py-1.5 text-xs text-white-muted hover:glass-hover hover:text-accent-ice transition-all duration-300"
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
