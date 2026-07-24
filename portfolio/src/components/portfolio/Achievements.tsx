"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Users, TrendingUp, MessageCircle } from "lucide-react";

const stats = [
  {
    label: "Years Experience",
    value: 3,
    suffix: "+",
    icon: Award,
    description: "Professional experience",
  },
  {
    label: "Team Members Led",
    value: 10,
    suffix: "+",
    icon: Users,
    description: "Direct reports managed",
  },
  {
    label: "CSAT Improvement",
    value: 25,
    suffix: "%",
    icon: TrendingUp,
    description: "Customer satisfaction increase",
  },
  {
    label: "Reduction in Repeat Queries",
    value: 30,
    suffix: "%",
    icon: MessageCircle,
    description: "Query resolution efficiency",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
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
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

export function Achievements() {
  return (
    <section className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="section-label">
            <Award className="h-3 w-3" />
            Achievements
          </span>
          <h2 className="section-title">By the Numbers</h2>
          <p className="section-description mx-auto">
            Results that speak for themselves.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="gradient-border p-6 text-center group hover-lift"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2563eb]/10 to-[#7c3aed]/10 flex items-center justify-center mx-auto mb-4 group-hover:from-[#2563eb]/20 group-hover:to-[#7c3aed]/20 transition-all duration-300">
                  <Icon className="h-6 w-6 text-[#2563eb]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
