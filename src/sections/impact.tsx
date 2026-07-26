"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/section-badge";

interface CounterProps {
  end: number;
  suffix?: string;
}

function Counter({ end, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) { setCount(end); clearInterval(timer); }
            else setCount(current);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{Math.round(count)}{suffix}</div>;
}

const stats = [
  { value: 500, suffix: "+", label: "Learners Onboarded", sublabel: "End-to-end onboarding" },
  { value: 80, suffix: "+", label: "Transactions Managed", sublabel: "Concurrent property deals" },
  { value: 150, suffix: "+", label: "Leads Qualified/Month", sublabel: "Inbound & outbound" },
  { value: 48, suffix: "hr SLA", label: "Escalation Resolution", sublabel: "Client satisfaction" },
  { value: 5, suffix: "+ Years", label: "Industry Experience", sublabel: "EdTech, Real Estate, Fin Services" },
  { value: 100, suffix: "%", label: "CSAT Oriented", sublabel: "Customer-first approach" },
];

export function Impact() {
  return (
    <section id="impact" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.7_0.08_240_/_0.04),_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Impact" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
            Customer Impact,<br />
            <span className="text-gradient font-semibold">Measured.</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every metric reflects meaningful improvements in customer experience, operational excellence, and long-term business value.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full hover:bg-white/[0.08] transition-all duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-light text-gradient mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-white/80 font-medium text-sm sm:text-base mb-1">{stat.label}</h3>
                  <p className="text-white/30 text-xs sm:text-sm">{stat.sublabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
