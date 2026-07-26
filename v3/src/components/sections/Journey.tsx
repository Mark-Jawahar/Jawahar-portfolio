"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/data";
import { FadeReveal } from "@/components/effects/FadeReveal";

function TimelineItem({
  item,
  index,
  scrollYProgress,
  baseOffset,
}: {
  item: (typeof experience)[0];
  index: number;
  scrollYProgress: any;
  baseOffset: number;
}) {
  const sectionRef = useRef(null);
  const progress = useTransform(
    scrollYProgress,
    [baseOffset, baseOffset + 0.15],
    [0, 1]
  );

  return (
    <div ref={sectionRef} className="relative min-h-[80vh] flex items-center py-16">
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-glass-border">
        <motion.div
          className="w-full bg-gradient-to-b from-accent-ice to-accent-cyan"
          style={{ scaleY: progress, originY: 0 }}
        />
      </div>

      <div className="grid md:grid-cols-5 gap-8 md:gap-16 w-full pl-8 md:pl-16">
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <div className="glass inline-block rounded-full px-3 py-1 text-xs text-accent-ice mb-4">
              {item.duration}
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white-soft mb-2">
              {item.role}
            </h3>
            <p className="text-lg text-accent-cyan mb-1">{item.company}</p>
            <p className="text-sm text-white-subtle">{item.location}</p>

            <div className="flex gap-4 mt-6">
              {Object.entries(item.metrics).map(([key, val]) => (
                <div key={key} className="glass rounded-xl px-4 py-3 text-center">
                  <p className="text-lg font-bold text-gradient-accent">{val}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white-subtle">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-3">
          <ul className="space-y-4">
            {item.achievements.map((ach, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + i * 0.08 }}
                className="glass rounded-xl p-4 text-sm text-white-muted leading-relaxed"
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <section
      id="journey"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 03
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">My</span>{" "}
            <span className="text-gradient-accent">Journey</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-20">
            {experience.length} companies &middot; {experience.reduce((acc, e) => acc + e.achievements.length, 0)} achievements
          </p>
        </FadeReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {experience.map((item, i) => (
          <TimelineItem
            key={i}
            item={item}
            index={i}
            scrollYProgress={scrollYProgress}
            baseOffset={i * 0.2}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <FadeReveal>
          <div className="glass inline-block rounded-2xl px-8 py-6">
            <p className="text-3xl font-bold text-gradient-accent">{experience.length}</p>
            <p className="text-xs text-white-subtle mt-1">Companies</p>
            <div className="flex gap-6 mt-4 justify-center">
              {experience.map((e) => (
                <span key={e.company} className="text-xs text-white-muted">
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
