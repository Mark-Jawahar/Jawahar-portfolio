"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

const roles = [
  "Assistant Team Lead",
  "Customer Success Manager",
  "Operations Strategist",
  "Team Builder",
];

function Typewriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = texts[index];
    if (!t) return;
    const delay = dir === 1 ? 65 : 30;
    const timer = setTimeout(() => {
      setChar((c) => c + dir);
      if (char + dir > t.length) setTimeout(() => setDir(-1), 1600);
      else if (char + dir < 0) { setDir(1); setIndex((i) => (i + 1) % texts.length); setChar(0); }
    }, delay);
    return () => clearTimeout(timer);
  }, [char, dir, index, texts]);

  return (
    <span className="text-gradient-ice">
      {texts[index]?.slice(0, char)}
      <span className="inline-block w-[2px] h-[1em] bg-[#a8d8ea] ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "500+", label: "Learners Onboarded" },
  { value: "25%", label: "CSAT Growth" },
  { value: "30%", label: "Query Reduction" },
  { value: "10", label: "Team Leadership" },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="container-premium px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-[rgba(168,216,234,0.06)] text-[#a8d8ea] border border-[rgba(168,216,234,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open to Opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)] shadow-[0_0_40px_rgba(168,216,234,0.08)]">
                <div className="w-full h-full bg-gradient-to-br from-[rgba(168,216,234,0.12)] to-[rgba(196,181,253,0.12)] flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gradient-ice">JA</span>
                </div>
              </div>
              <motion.div
                className="absolute -inset-1.5 rounded-full border border-[rgba(168,216,234,0.08)]"
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0, 0.15] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05] mb-4"
          >
            <span className="text-gradient-white">Jawahar A</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-white/40 mb-1 h-8"
          >
            <Typewriter texts={roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-white/30 max-w-lg leading-relaxed mb-6"
          >
            Assistant Team Lead at Hello Mentor. I help organizations build
            exceptional customer experiences through leadership, operations,
            and process excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <PremiumButton href="/resume.pdf" download variant="primary">
              <Download className="h-4 w-4" /> Download Resume
            </PremiumButton>
            <PremiumButton href="#contact" variant="secondary">
              Hire Me
            </PremiumButton>
            <PremiumButton href="#contact" variant="secondary">
              Schedule a Call
            </PremiumButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gradient-ice">{s.value}</span>
                <span className="text-xs text-white/25">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, y: [0, 5, 0] }}
        transition={{ opacity: { delay: 1.3 }, y: { duration: 2, repeat: Infinity } }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 transition-colors"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
