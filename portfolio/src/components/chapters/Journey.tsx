"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Award,
  Check,
} from "lucide-react";
import { ScrollReveal, FadeIn } from "@/components/effects/ScrollReveal";
import { experiences } from "@/lib/resume-data";

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative pl-8 md:pl-10">
      {/* Timeline line */}
      {index < experiences.length - 1 && (
        <div
          className="timeline-line absolute left-[4px] md:left-[5px] top-3 bottom-0"
          style={{ height: "calc(100% + 2rem)" }}
        />
      )}

      {/* Dot */}
      <motion.div
        className="timeline-dot absolute left-0 top-1.5"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass-card p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-[#f5f5f7]">
                {exp.company}
              </h3>
              <p className="text-sm text-[#a8d8ea] mt-0.5">{exp.role}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#8e8e93] shrink-0">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-[#8e8e93] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.05)]">
              {exp.period}
            </span>
          </div>

          <p className="text-sm text-[#8e8e93] leading-relaxed mb-4">
            {exp.description}
          </p>

          <details className="group">
            <summary className="text-xs font-medium text-[#a8d8ea] cursor-pointer hover:text-[#f5f5f7] transition-colors list-none flex items-center gap-1.5">
              <span className="group-open:hidden">View details</span>
              <span className="hidden group-open:inline">Hide details</span>
              <motion.span
                className="inline-block"
                animate={{ rotate: 0 }}
              >
                <Check className="w-3 h-3" />
              </motion.span>
            </summary>

            <div className="mt-4 space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-[#f5f5f7] uppercase tracking-wider mb-2">
                  Key Achievements
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.achievements.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1 text-xs text-[#a8d8ea] bg-[rgba(168,216,234,0.06)] px-2.5 py-1 rounded-full border border-[rgba(168,216,234,0.08)]"
                    >
                      <Award className="w-3 h-3" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#f5f5f7] uppercase tracking-wider mb-2">
                  Responsibilities
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((r) => (
                    <li
                      key={r.substring(0, 20)}
                      className="text-xs text-[#8e8e93] leading-relaxed pl-3 border-l border-[rgba(255,255,255,0.06)]"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </motion.div>
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">04</span>
            Professional Journey
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mt-8">My path in customer experience</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="chapter-subtitle mt-4">
            From lead generation to team leadership — each role built on a
            foundation of customer-first thinking and measurable impact.
          </p>
        </ScrollReveal>

        <div className="max-w-[700px] mt-12 space-y-8">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
