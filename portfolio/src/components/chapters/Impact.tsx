"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const stats = [
  { value: "500+", label: "Learners Onboarded" },
  { value: "5+", label: "Years of Experience" },
  { value: "25%", label: "CSAT Improvement" },
  { value: "30%", label: "Query Reduction" },
  { value: "80+", label: "Concurrent Transactions" },
  { value: "150+", label: "Customer Leads Managed Monthly" },
];

function StatCard({ stat, delay }: { stat: (typeof stats)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const num = parseInt(stat.value.replace(/[^0-9]/g, ""), 10);
  const suffix = stat.value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * num));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, num, delay]);

  return (
    <div ref={ref} className="glass-card p-6 md:p-8 text-center group relative overflow-hidden">
      <div className="relative z-10">
        <div className="stat-value tracking-tight">
          {count}
          {suffix && (
            <span className="text-[0.6em] text-[#a8d8ea] align-top ml-0.5">
              {suffix}
            </span>
          )}
        </div>
        <div className="stat-label mt-2">{stat.label}</div>
      </div>
    </div>
  );
}

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
            Customer Impact,
            <br />
            Measured.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="chapter-subtitle mt-4">
            Every metric reflects a meaningful improvement in customer
            experience, operational excellence, collaboration, and long-term
            business value.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={0.2 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
