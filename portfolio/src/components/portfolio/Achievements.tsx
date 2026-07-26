"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Users, TrendingUp, MessageCircle } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience", desc: "Professional experience", icon: Award },
  { value: 10, suffix: "+", label: "Team Members Led", desc: "Direct reports managed", icon: Users },
  { value: 25, suffix: "%", label: "CSAT Improvement", desc: "Customer satisfaction", icon: TrendingUp },
  { value: 30, suffix: "%", label: "Queries Reduced", desc: "Repeat customer queries", icon: MessageCircle },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const steps = 50;
          const inc = target / steps;
          let cur = 0;
          const t = setInterval(() => {
            cur += inc;
            if (cur >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(cur));
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} className="text-3xl md:text-4xl font-semibold text-gradient-ice">{count}{suffix}</div>;
}

export function Achievements() {
  return (
    <section className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <span className="section-label"><Award className="h-3 w-3" />Impact</span>
          <h2 className="section-title">Results that<span className="text-gradient-ice"> speak.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-6 glass-premium text-center group"
              >
                <div className="h-10 w-10 rounded-2xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[rgba(168,216,234,0.12)] transition-colors">
                  <Icon className="h-5 w-5 text-[#a8d8ea]" />
                </div>
                <Counter target={s.value} suffix={s.suffix} />
                <div className="text-sm font-medium text-white/60 mt-1">{s.label}</div>
                <div className="text-xs text-white/20 mt-0.5">{s.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
