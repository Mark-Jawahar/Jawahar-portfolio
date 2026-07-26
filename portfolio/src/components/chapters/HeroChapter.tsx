"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { profile, highlights } from "@/lib/resume-data";
import { scrollToSection } from "@/lib/utils";

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[1] w-[300px] h-[300px] rounded-full opacity-[0.06] transition-transform duration-300 ease-out"
      style={{
        background:
          "radial-gradient(circle, rgba(168,216,234,0.6) 0%, transparent 70%)",
      }}
    />
  );
}

function TypewriterRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      const next = deleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);
      timeout = setTimeout(() => setText(next), deleting ? 30 : 50);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return (
    <span className="text-gradient-accent">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-[#a8d8ea] ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export function HeroChapter() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  return (
    <section
      id="introduction"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 overflow-hidden"
    >
      <MouseGlow />

      {/* Portrait */}
      <motion.div
        className="relative mb-8 md:mb-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <div className="portrait-frame w-full h-full">
            <div className="portrait-glow" />
            <img
              src="/profile-pic.png"
              alt={profile.name}
              className="w-full h-full object-cover"
              style={{
                filter:
                  "brightness(1.02) contrast(0.92) saturate(1.04)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.02em] text-[#f5f5f7] text-center leading-[1.15]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {profile.name}
      </motion.h1>

      {/* Role */}
      <motion.p
        className="text-[clamp(0.9rem,1.3vw,1.05rem)] text-[#8e8e93] mt-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <TypewriterRoles roles={profile.roles} />
      </motion.p>

      {/* Badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-2 mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="tag-pill flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to Opportunities
        </span>
      </motion.div>

      {/* Headline */}
      <motion.p
        className="text-[clamp(0.85rem,1.1vw,0.95rem)] text-[#8e8e93] leading-relaxed max-w-[600px] text-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {profile.headline}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={(e) => {
            handleRipple(e);
            scrollToSection("connect");
          }}
          className="btn-primary relative overflow-hidden"
        >
          <Sparkles className="w-4 h-4" />
          Let&apos;s Connect
          {ripples.map((r) => (
            <span
              key={r.id}
              className="btn-ripple"
              style={{ left: r.x, top: r.y, width: 10, height: 10 }}
            />
          ))}
        </button>
        <a
          href="/resume.pdf"
          download
          className="btn-secondary"
        >
          <Download className="w-4 h-4" />
          Resume
        </a>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 md:mt-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        {highlights.slice(0, 4).map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("profile")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8e8e93] hover:text-[#f5f5f7] transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
