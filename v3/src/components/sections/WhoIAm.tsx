"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { personalInfo, resumeInfo, skills } from "@/lib/data";
import { GlassCard } from "@/components/effects/GlassCard";
import { FadeReveal } from "@/components/effects/FadeReveal";

export function WhoIAm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="who-i-am"
      ref={ref}
      className="aurora-bg relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-soft-lavender/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-accent-soft-cyan/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 02</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-14">
            <span className="text-gradient">Who I</span>{" "}
            <span className="text-gradient-accent">Am</span>
          </h2>
        </FadeReveal>

        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-3 space-y-8">
            <FadeReveal delay={0.25}>
              <p className="text-[0.9375rem] sm:text-base text-white-muted leading-[1.8] max-w-2xl">
                {resumeInfo.summary}
              </p>
            </FadeReveal>

            <FadeReveal delay={0.35}>
              <div className="flex flex-wrap gap-2">
                {resumeInfo.achievements.map((achievement, i) => (
                  <span
                    key={i}
                    className="glass rounded-full px-3.5 py-1.5 text-[0.75rem] text-white-muted/80"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </FadeReveal>

            <FadeReveal delay={0.45}>
              <div className="flex items-center gap-4 pt-3">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <span className="text-lg font-semibold text-accent-pearl">
                    {personalInfo.experience.replace("+", "")}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white-soft font-medium">Years of Experience</p>
                  <p className="text-xs text-white-subtle/70 mt-0.5">EdTech, Real Estate &amp; Finance</p>
                </div>
              </div>
            </FadeReveal>
          </div>

          <div className="md:col-span-2 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card"
            >
              <img
                src="/images/about-portrait.jpg"
                alt="Jawahar A"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4"
            >
              <p className="text-2xl font-semibold text-accent-pearl">{personalInfo.experience}</p>
              <p className="text-[0.6875rem] text-white-subtle/70 mt-0.5">Experience</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-24">
          <FadeReveal delay={0.15}>
            <h3 className="text-xl sm:text-2xl font-semibold text-white-soft mb-8 tracking-tight">
              Languages
            </h3>
          </FadeReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.languages.map((lang, i) => (
              <GlassCard key={i} delay={0.2 + i * 0.08} padding="md">
                <p className="text-lg font-medium text-white-soft tracking-tight">{lang.name}</p>
                <p className="text-sm text-white-subtle/70 mt-1.5">{lang.level}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
