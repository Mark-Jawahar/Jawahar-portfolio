"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { Magnetic } from "@/components/shared/magnetic";
import { EASE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const photoY = useTransform(scrollY, [0, 700], [0, 110]);
  const photoScale = useTransform(scrollY, [0, 700], [1, 0.9]);
  const badgeY = useTransform(scrollY, [0, 700], [0, -60]);
  const glowOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.08),_transparent_70%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                Available for opportunities
              </motion.div>

              <motion.h1
                variants={item}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-7 leading-[1.05]"
              >
                <span className="block text-white/40 font-extralight text-3xl sm:text-4xl md:text-5xl mb-4">
                  Hi, I&apos;m
                </span>
                <span className="text-gradient font-semibold">
                  {siteConfig.name}
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-lg sm:text-2xl text-white/50 font-light tracking-wide mb-3"
              >
                {siteConfig.role}
              </motion.p>

              <motion.p
                variants={item}
                className="text-sm sm:text-base text-white/30 max-w-md mx-auto lg:mx-0 mb-12 leading-relaxed"
              >
                5+ years transforming customer journeys across EdTech, Real
                Estate, and Financial Services.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Magnetic strength={0.25}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <Mail
                      size={16}
                      className="group-hover:scale-110 group-hover:rotate-6 transition-transform"
                    />
                    Get in touch
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href={siteConfig.resumeUrl}
                    download
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
                  >
                    <Download
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Download Resume
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div
                variants={item}
                className="hidden lg:flex items-center gap-6 mt-20 text-white/20 text-xs tracking-widest uppercase"
              >
                <span className="text-white/10">Trusted by</span>
                {["Hello Mentor", "NoBrokers", "Daztek"].map((company) => (
                  <span
                    key={company}
                    className="text-white/15 font-medium hover:text-white/40 transition-colors"
                  >
                    {company}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: photoY, scale: photoScale }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]"
            >
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/8 to-transparent blur-[80px]"
              />
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
                className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl glow"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 0.4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
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
              </motion.div>
              <motion.div
                style={{ y: badgeY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1 }}
                className="absolute -bottom-3 -right-3 w-28 h-28 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl flex items-center justify-center"
              >
                <span className="text-sm text-blue-300/70 font-medium">
                  5+ Yrs
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
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
