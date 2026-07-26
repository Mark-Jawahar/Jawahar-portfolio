"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 aurora-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.08),_transparent_70%)]" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/3 blur-3xl animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4"
            >
              <span className="text-white/40 font-extralight">Hi, I&apos;m</span>
              <br />
              <span className="text-gradient font-semibold">Jawahar A</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/50 font-light tracking-wide max-w-lg mx-auto lg:mx-0 mb-3"
            >
              Customer Experience Specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-white/30 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
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
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                Get in touch
              </a>
              <a
                href="/Jawahar_A_Resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
              >
                <Download size={16} className="group-hover:scale-110 transition-transform" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="hidden lg:flex items-center gap-6 mt-16 text-white/20 text-xs tracking-widest uppercase"
            >
              <span className="text-white/10">Trusted by</span>
              {["Hello Mentor", "NoBrokers", "Daztek"].map((company) => (
                <span key={company} className="text-white/15 font-medium tracking-wide">
                  {company}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-900/30 to-zinc-900 flex items-center justify-center"
                >
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-white/20 select-none">
                    JA
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl flex items-center justify-center">
                <span className="text-xs text-blue-300/70 font-medium">5+ Yrs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
