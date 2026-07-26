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

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section
      id="who-i-am"
      ref={ref}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-lavender/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 02
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-16">
            <span className="text-gradient">Who I</span>{" "}
            <span className="text-gradient-accent">Am</span>
          </h2>
        </FadeReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <FadeReveal delay={0.3}>
              <p className="text-lg text-white-muted leading-relaxed">
                {resumeInfo.summary}
              </p>
            </FadeReveal>

            <FadeReveal delay={0.4}>
              <div className="flex flex-wrap gap-3">
                {resumeInfo.achievements.map((achievement, i) => (
                  <span
                    key={i}
                    className="glass rounded-full px-4 py-2 text-xs text-white-muted"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </FadeReveal>

            <FadeReveal delay={0.5}>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-gradient-accent">
                    {personalInfo.experience.replace("+", "")}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white-soft font-medium">Years of Experience</p>
                  <p className="text-xs text-white-subtle">Across EdTech, Real Estate & Finance</p>
                </div>
              </div>
            </FadeReveal>
          </div>

          <div className="relative">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden glass"
            >
              <img
                src="/images/hero-portrait.jpg"
                alt="Jawahar A"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl p-4"
            >
              <p className="text-2xl font-bold text-gradient-accent">{personalInfo.experience}</p>
              <p className="text-xs text-white-subtle">Experience</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-24">
          <FadeReveal delay={0.2}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white-soft mb-10">
              Languages
            </h3>
          </FadeReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.languages.map((lang, i) => (
              <GlassCard key={i} delay={0.3 + i * 0.1}>
                <p className="text-lg font-semibold text-white-soft">{lang.name}</p>
                <p className="text-xs text-white-subtle mt-1">{lang.level}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
