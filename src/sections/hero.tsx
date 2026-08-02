"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { EASE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const portraitItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.3 },
  },
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  const motionContainer = reducedMotion ? { hidden: {}, show: {} } : container;
  const motionItem = reducedMotion ? { hidden: {}, show: {} } : item;
  const motionPortrait = reducedMotion ? { hidden: {}, show: {} } : portraitItem;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background stage — contained to the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.72_0.06_250_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.7_0.05_285_/_0.06),_transparent_60%)]" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[16%] right-[8%] w-40 h-40 rounded-full bg-accent/5 blur-[90px]" />
        <div className="absolute bottom-[18%] left-[4%] w-52 h-52 rounded-full bg-accent-violet/4 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center">
        <motion.div
          variants={motionContainer}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center w-full pt-32 pb-10 lg:pt-24 lg:pb-16"
        >
          <motion.div variants={motionItem} className="text-center lg:text-left">
            <motion.div
              variants={motionItem}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-9"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bright/80" />
              Available for opportunities
            </motion.div>

            <motion.h1
              variants={motionItem}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-[1.04]"
            >
              <span className="block text-white/40 font-extralight text-3xl sm:text-4xl md:text-5xl mb-4">
                Hi, I&apos;m
              </span>
              <span className="text-gradient font-semibold">
                {siteConfig.name}
              </span>
            </motion.h1>

            <motion.p
              variants={motionItem}
              className="text-xl sm:text-2xl text-silver/90 font-light tracking-wide mb-3"
            >
              {siteConfig.role}
            </motion.p>

            <motion.p
              variants={motionItem}
              className="text-[15px] sm:text-base text-graphite max-w-md mx-auto lg:mx-0 mb-11 leading-relaxed"
            >
              5+ years transforming customer journeys across EdTech, Real
              Estate, and Financial Services.
            </motion.p>

            <motion.div
              variants={motionItem}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn btn-ghost px-7 py-3.5"
              >
                <Mail size={16} />
                Get in touch
              </a>
              <a
                href={siteConfig.resumeUrl}
                download
                className="btn btn-primary px-7 py-3.5"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              variants={motionItem}
              className="hidden lg:flex items-center gap-6 mt-16 text-graphite text-xs tracking-widest uppercase"
            >
              <span className="text-graphite/70">Trusted by</span>
              {["Hello Mentor", "NoBrokers", "Daztek"].map((company) => (
                <span
                  key={company}
                  className="text-graphite/80 font-medium hover:text-silver/80 transition-colors"
                >
                  {company}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait — large, elegant, confined to the hero */}
          <motion.div
            variants={motionPortrait}
            className="relative mx-auto lg:ml-auto w-[min(72vw,300px)] sm:w-[min(56vw,360px)] lg:w-[min(36vw,430px)]"
          >
            <div className="relative aspect-square">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent-bright/15 via-accent-violet/8 to-transparent blur-[70px]" />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
              <Image
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 56vw, 36vw"
                className="object-cover rounded-full border border-white/10 shadow-2xl glow"
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 rounded-full glass border-accent/20 flex items-center justify-center">
                <span className="text-sm text-accent-bright/90 font-medium">
                  5+ Yrs
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-7 flex justify-center">
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-graphite hover:text-silver/80 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.a>
      </div>
    </section>
  );
}
