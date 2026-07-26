"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import { GlassCard } from "@/components/effects/GlassCard";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { ExternalLink, TrendingUp } from "lucide-react";

export function ProjectsSection() {
  const ref = useRef(null);

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 06
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">Key</span>{" "}
            <span className="text-gradient-accent">Projects</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-16">
            Impact-driven initiatives that shaped processes, improved experiences, and delivered results.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <GlassCard key={i} delay={0.2 + i * 0.15}>
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <p className="text-xs text-accent-ice mb-2">{project.company}</p>
                  <h3 className="text-xl font-bold text-white-soft mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-glass-border">
                  <div className="flex items-start gap-2">
                    <TrendingUp size={14} className="text-accent-cyan mt-0.5 shrink-0" />
                    <p className="text-xs text-accent-cyan">{project.impact}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
