"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.08),_transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/3 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
            >
              <span className="text-white/40 font-extralight">Hi, I&apos;m</span>
              <br />
              <span className="text-gradient font-semibold">{siteConfig.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/50 font-light tracking-wide mb-2"
            >
              {siteConfig.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-white/30 max-w-md mx-auto lg:mx-0 mb-12 leading-relaxed"
            >
              5+ years transforming customer journeys across EdTech, Real Estate, and Financial Services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                Get in touch
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
              >
                <Download size={16} className="group-hover:scale-110 transition-transform" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="hidden lg:flex items-center gap-6 mt-20 text-white/20 text-xs tracking-widest uppercase"
            >
              <span className="text-white/10">Trusted by</span>
              {["Hello Mentor", "NoBrokers", "Daztek"].map((company) => (
                <span key={company} className="text-white/15 font-medium">{company}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/8 to-transparent blur-[80px]" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl glow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 420px"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-3 -right-3 w-28 h-28 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl flex items-center justify-center"
              >
                <span className="text-sm text-blue-300/70 font-medium">5+ Yrs</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/20 hover:text-white/40 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.a>
      </motion.div>
    </section>
  );
}
