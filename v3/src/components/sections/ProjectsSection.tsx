"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  const sectionRef = useRef(null);

  return (
    <section id="projects" ref={sectionRef} className="aurora-bg relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-soft-cyan/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-accent-soft-lavender/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 06</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">Key</span>{" "}
            <span className="text-gradient-accent">Projects</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-14">
            Impact-driven initiatives that shaped processes, improved experiences, and delivered results.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="glass rounded-full px-2.5 py-1 text-[0.625rem] tracking-wider uppercase text-white-muted/70">
                  {project.company}
                </span>
                <ArrowUpRight size={14} className="text-white-subtle/40 group-hover:text-accent-pearl/60 transition-colors duration-400" />
              </div>

              <h3 className="text-lg font-semibold text-white-soft mb-3 tracking-tight leading-snug">
                {project.title}
              </h3>

              <p className="text-sm text-white-muted/70 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="mt-5 pt-4 border-t border-glass-border">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full glass flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp size={12} className="text-accent-pearl/70" />
                  </div>
                  <p className="text-sm text-white-muted/70 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
