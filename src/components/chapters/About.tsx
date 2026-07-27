"use client";

import { profile, summaryHighlights } from "@/lib/resume-data";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function About() {
  return (
    <section id="profile" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">02</span>
            <span>About</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3">
              <ScrollReveal delay={0.1}>
                <h2 className="chapter-title mb-6">
                  Customer Experience,<br />
                  <span className="text-gradient-accent">Reimagined.</span>
                </h2>
                <p className="chapter-subtitle mb-6">
                  Customer experience leader with 5+ years of expertise in customer onboarding, lifecycle management, process excellence, and cross-functional collaboration. Currently leading onboarding initiatives for 500+ learners at Hello Mentor, driving measurable improvements in customer satisfaction and operational efficiency.
                </p>
                <p className="chapter-subtitle">
                  End-to-end onboarding, standardized processes, cross-functional collaboration, and strategic customer engagement that builds lasting relationships and turns customers into advocates.
                </p>
              </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal delay={0.2} direction="right">
              <div className="glass-panel-strong p-6 md:p-8">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-muted/60 mb-4">At a Glance</h3>
                <div className="space-y-3">
                  {summaryHighlights.map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <span className="text-sm text-muted">{item.label}</span>
                      <span className="text-sm font-medium text-ice/90">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
