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
    <section id="growth" ref={ref} className="aurora-bg relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-soft-lavender/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-accent-soft-cyan/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 05</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">Professional</span>{" "}
            <span className="text-gradient-accent">Growth</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-14">
            Key milestones throughout a 5+ year journey of growth and impact.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {milestones.map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard key={i} delay={0.15 + i * 0.08} padding="md">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent-pearl/80" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] text-white-muted/70 mb-1 tracking-wide uppercase">{item.subtitle}</p>
                    <h3 className="text-lg font-semibold text-white-soft mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-white-muted/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <FadeReveal delay={0.5}>
          <div className="mt-14 glass-card rounded-2xl p-8 sm:p-10 text-center">
            <p className="text-sm text-white-muted/60 mb-2 tracking-wide">Career Span</p>
            <p className="text-5xl sm:text-6xl font-semibold text-gradient-aurora leading-none">5+</p>
            <p className="text-sm text-white-muted/60 mt-2 mb-6">Years of Continuous Growth</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-white-subtle/70">
              <span className="tracking-wide">2021 — Daztek</span>
              <span className="tracking-wide">2023 — NoBrokers</span>
              <span className="tracking-wide">2024 — Hello Mentor</span>
              <span className="tracking-wide">2026 — Present</span>
            </div>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
