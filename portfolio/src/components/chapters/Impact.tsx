"use client";

import { ScrollReveal, FadeIn } from "@/components/effects/ScrollReveal";

const stats = [
  { value: "500+", label: "Learners Onboarded", suffix: "" },
  { value: "5+", label: "Years Experience", suffix: "" },
  { value: "10+", label: "Team Members Led", suffix: "" },
  { value: "25", label: "CSAT Improvement", suffix: "%" },
  { value: "30", label: "Queries Reduced", suffix: "%" },
  { value: "80+", label: "Concurrent Transactions", suffix: "" },
];

export function Impact() {
  return (
    <section id="impact" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">03</span>
            Impact
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mt-8">
            Results delivered through
            <br />
            experience and empathy
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="chapter-subtitle mt-4">
            Numbers don&apos;t tell the whole story, but they help illustrate the
            impact of consistent, customer-first thinking across every role.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.2 + i * 0.08}>
              <div className="glass-card p-6 md:p-8 text-center">
                <div className="stat-value">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-[0.6em] text-[#a8d8ea] align-top ml-0.5">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="stat-label mt-2">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
