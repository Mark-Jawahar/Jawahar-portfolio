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
                {profile.about}
              </p>
              <p className="chapter-subtitle">
                From EdTech to Real Estate to Financial Services — the common thread has always been people.
                Understanding their needs, anticipating their challenges, and crafting experiences that
                turn customers into advocates.
              </p>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal delay={0.2} direction="right">
              <div className="glass-panel-strong p-6">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted/60 mb-4">At a Glance</h3>
                <div className="space-y-3">
                  {summaryHighlights.map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-medium text-ice/90">{item.desc}</span>
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
