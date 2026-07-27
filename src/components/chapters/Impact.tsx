"use client";

import { highlights } from "@/lib/resume-data";
import { TrendingUp, Users, BarChart3, Zap } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const iconMap = [TrendingUp, Users, BarChart3, Zap, Users, BarChart3];

export default function Impact() {
  return (
    <section id="impact" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">03</span>
            <span>Impact</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mb-4">
            Numbers That{" "}
            <span className="text-gradient-accent">Matter.</span>
          </h2>
          <p className="chapter-subtitle mb-10">
            Metrics aren&apos;t just statistics — they represent real people whose experiences improved.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {highlights.map((item, i) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <ScrollReveal key={item.label} delay={0.05 * i}>
                <div className="glass-card p-5 md:p-6 text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                      <Icon size={16} className="text-cyan/60" />
                    </div>
                  </div>
                  <div className="stat-value text-gradient mb-1">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
