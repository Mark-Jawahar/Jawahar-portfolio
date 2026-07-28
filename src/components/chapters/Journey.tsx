"use client";

import { experiences } from "@/lib/resume-data";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import ScrollParallax from "@/components/effects/ScrollParallax";

export default function Journey() {
  return (
    <section id="journey" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">04</span>
            <span>Journey</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mb-4">
            Professional{" "}
            <span className="text-gradient-accent">Journey.</span>
          </h2>
          <p className="chapter-subtitle mb-10">
            Five years of growth across three industries, driven by a commitment to exceptional customer experiences.
          </p>
        </ScrollReveal>

        <div className="relative">
          <ScrollParallax speed={0.2} offset={100}>
            <div className="absolute left-[3px] md:left-[15px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(111,128,149,0.2), rgba(91,100,116,0.1), transparent)" }} />
          </ScrollParallax>

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={`${exp.company}-${i}`} delay={0.1 * i}>
                <div className="relative pl-8 md:pl-14">
                  <div className="absolute left-0 md:left-[10px] top-1.5 w-[7px] h-[7px] rounded-full" style={{ background: "rgba(111,128,149,0.7)", boxShadow: "0 0 0 3px rgba(111,128,149,0.15)" }} />

                  <div className="glass-card p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                      <h3 className="text-lg md:text-xl font-semibold text-pearl">{exp.company}</h3>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase size={12} style={{ color: "rgba(111, 128, 149, 0.6)" }} />
                      <span className="text-sm font-medium text-ice/80">{exp.role}</span>
                      <MapPin size={12} className="text-muted ml-1" />
                      <span className="text-xs text-muted">{exp.location}</span>
                    </div>

                    <p className="text-sm text-muted leading-relaxed mb-3">{exp.description}</p>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {exp.achievements.map((ach, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(111, 128, 149, 0.4)" }} />
                          <span className="text-xs md:text-sm text-muted leading-relaxed">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
