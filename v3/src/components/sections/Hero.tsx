"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="intro"
      ref={ref}
      className="aurora-bg relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Depth layers */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/98 to-bg-primary" />

        {/* Aurora orbs */}
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-accent-soft-cyan/20 rounded-full blur-[160px] animate-aurora" />
        <div className="absolute bottom-[25%] right-[20%] w-[400px] h-[400px] bg-accent-soft-lavender/20 rounded-full blur-[140px] animate-aurora" style={{ animationDelay: "4s" }} />
        <div className="absolute top-[50%] right-[35%] w-[350px] h-[350px] bg-accent-soft-warm/15 rounded-full blur-[120px] animate-aurora" style={{ animationDelay: "8s" }} />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="relative z-10 section-container py-24">
        <div className="flex flex-col items-center text-center">

          {/* Portrait — editorial centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mb-12"
          >
            {/* Spotlight glow */}
            <div className="absolute -inset-16 bg-gradient-radial from-accent-soft-cyan/15 via-accent-soft-lavender/8 to-transparent rounded-full blur-[60px]" />

            {/* Portrait frame */}
            <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[3px] rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02), rgba(200,190,230,0.04), rgba(180,220,230,0.06))",
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image container */}
              <div className="w-full h-full rounded-2xl overflow-hidden glass-card p-0.5">
                <div className="w-full h-full rounded-[calc(1rem-1px)] overflow-hidden">
                  <img
                    src="/images/hero-portrait.jpg"
                    alt="Jawahar A"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Subtle reflection line */}
              <motion.div
                className="absolute inset-x-[15%] top-[8%] h-[30%] rounded-full"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)",
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mb-8"
          >
            <span className="glass rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white-muted/70">
              {personalInfo.availability}
            </span>
          </motion.div>

          {/* Name — reduced ~40% from before */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
          >
            <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg sm:text-xl text-white-muted/80 max-w-lg mx-auto font-light tracking-tight mb-3"
          >
            {personalInfo.role}
          </motion.p>

          {/* Context */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-sm text-white-subtle/70 mb-10 tracking-wide"
          >
            {personalInfo.currentPosition} &middot; {personalInfo.company} &middot; {personalInfo.location}
          </motion.p>

          {/* CTAs — minimal, premium */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href="/images/resume.pdf"
              download
              className="btn-primary rounded-full px-7 py-3 text-sm flex items-center gap-2.5"
            >
              <Download size={14} />
              Resume
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn rounded-full px-7 py-3 text-sm flex items-center gap-2.5"
            >
              <FaLinkedinIn size={12} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
