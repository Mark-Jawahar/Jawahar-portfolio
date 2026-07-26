"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { GlassCard } from "@/components/effects/GlassCard";
import { education } from "@/lib/data";
import { GraduationCap, TrendingUp, Award, Target } from "lucide-react";

const milestones = [
  {
    icon: Award,
    title: "Assistant Team Lead",
    subtitle: "Hello Mentor",
    description: "Promoted within 18 months for consistent performance and leadership potential.",
  },
  {
    icon: Target,
    title: "500+ Learners Onboarded",
    subtitle: "End-to-End",
    description: "Managed complete onboarding lifecycle for 500+ learners across programs.",
  },
  {
    icon: TrendingUp,
    title: "80+ Concurrent Transactions",
    subtitle: "NoBrokers.com",
    description: "Managed high-volume property transactions while maintaining client satisfaction.",
  },
  {
    icon: GraduationCap,
    title: education.degree,
    subtitle: education.institution,
    description: `${education.location} · ${education.year}`,
  },
];

export function GrowthSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="growth" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-lavender/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 05
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">Professional</span>{" "}
            <span className="text-gradient-accent">Growth</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-16">
            Key milestones throughout a 5+ year journey of growth and impact.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard key={i} delay={0.2 + i * 0.12}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-accent-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-accent-ice mb-1">{item.subtitle}</p>
                    <h3 className="text-xl font-bold text-white-soft mb-2">{item.title}</h3>
                    <p className="text-sm text-white-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <FadeReveal delay={0.5}>
          <div className="mt-16 glass rounded-2xl p-8 text-center">
            <p className="text-sm text-white-muted mb-2">Career Span</p>
            <p className="text-5xl sm:text-7xl font-bold text-gradient-accent">5+</p>
            <p className="text-sm text-white-muted mt-2">Years of Continuous Growth</p>
            <div className="flex justify-center gap-8 mt-6 text-xs text-white-subtle">
              <span>2021 — Daztek</span>
              <span>2023 — NoBrokers</span>
              <span>2024 — Hello Mentor</span>
              <span>2026 — Present</span>
            </div>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
