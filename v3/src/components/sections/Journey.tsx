"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";
import { FadeReveal } from "@/components/effects/FadeReveal";

function TimelineItem({ item, index }: { item: (typeof experience)[0]; index: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <div ref={sectionRef} className="relative flex items-start py-16">
      <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px">
        <div className="w-full h-full bg-glass-border" />
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-pearl/50 via-accent-silver/40 to-accent-soft-lavender/30"
          initial={{ height: "0%" }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-[1.35rem] md:left-[2.1rem] w-3 h-3 rounded-full bg-bg-primary border border-accent-pearl/60 z-10"
      />

      <div className="grid md:grid-cols-5 gap-8 md:gap-14 w-full pl-16 md:pl-20">
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="glass inline-flex rounded-full px-3 py-1 text-[0.6875rem] tracking-wide text-white-muted/80 mb-4">
              {item.duration}
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white-soft mb-2.5 tracking-tight leading-[1.15]">
              {item.role}
            </h3>
            <p className="text-base text-white-muted/80 mb-1">{item.company}</p>
            <p className="text-sm text-white-subtle/70">{item.location}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              {Object.entries(item.metrics).map(([key, val]) => (
                <div key={key} className="glass-card rounded-xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-lg font-semibold text-accent-pearl">{val}</p>
                  <p className="text-[0.625rem] uppercase tracking-[0.12em] text-white-subtle/70 mt-1">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-3">
          <ul className="space-y-3">
            {item.achievements.map((ach, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                className="glass-card rounded-xl p-4 text-sm text-white-muted/80 leading-relaxed"
              >
                {ach}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Journey() {
  const sectionRef = useRef(null);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="aurora-bg relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-accent-soft-cyan/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-accent-soft-lavender/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 03</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">My</span>{" "}
            <span className="text-gradient-accent">Journey</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-16">
            {experience.length} companies &middot;{" "}
            {experience.reduce((acc, e) => acc + e.achievements.length, 0)} achievements
          </p>
        </FadeReveal>
      </div>

      <div className="section-container">
        {experience.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>

      <div className="section-container mt-12">
        <FadeReveal>
          <div className="glass-card inline-flex flex-col rounded-2xl px-8 py-6 items-center">
            <p className="text-4xl sm:text-5xl font-semibold text-accent-pearl">{experience.length}</p>
            <p className="text-[0.6875rem] text-white-subtle/70 mt-1.5 tracking-wide uppercase">Companies</p>
            <div className="flex gap-6 mt-5 pt-5 border-t border-glass-border">
              {experience.map((e) => (
                <span key={e.company} className="text-xs text-white-muted/60 tracking-wide">
                  {e.company.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
