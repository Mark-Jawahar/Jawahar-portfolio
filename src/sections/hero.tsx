"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
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

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 160,
    damping: 24,
  });
  const parallaxY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), {
    stiffness: 160,
    damping: 24,
  });

  const motionContainer = reducedMotion ? { hidden: {}, show: {} } : container;
  const motionItem = reducedMotion ? { hidden: {}, show: {} } : item;
  const motionPortrait = reducedMotion ? { hidden: {}, show: {} } : portraitItem;

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    mx.set((e.clientX - window.innerWidth / 2) / window.innerWidth);
    my.set((e.clientY - window.innerHeight / 2) / window.innerHeight);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100svh] flex flex-col overflow-hidden"
      onMouseMove={handlePointerMove}
    >
      {/* Background stage — contained to the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.45_0.03_250_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.4_0.025_285_/_0.04),_transparent_55%)]" />
      </motion.div>

      {/* Decorative elements — subtle ambient lighting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[16%] right-[8%] w-48 h-48 rounded-full bg-[oklch(0.7_0.025_200_/_0.035)] blur-[120px]" />
        <div className="absolute bottom-[18%] left-[4%] w-56 h-56 rounded-full bg-[oklch(0.65_0.02_290_/_0.025)] blur-[130px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        <motion.div
          variants={motionContainer}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-start w-full pt-20 pb-10 lg:pt-24 lg:pb-16"
        >
          <motion.div variants={motionItem} className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              variants={motionItem}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bright/80" />
              Open to opportunities
            </motion.div>

            <motion.h1
              variants={motionItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 leading-[1.04]"
            >
              <span className="block text-white/40 font-extralight text-2xl sm:text-3xl md:text-4xl mb-3">
                Hi, I&apos;m
              </span>
              <span className="text-gradient font-semibold">
                {siteConfig.name}
              </span>
            </motion.h1>

            <motion.p
              variants={motionItem}
              className="text-lg sm:text-xl text-silver/90 font-light tracking-wide mb-3"
            >
              {siteConfig.role}
            </motion.p>

            <motion.p
              variants={motionItem}
              className="text-[15px] sm:text-base text-graphite max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              5+ years across Customer Success, Customer Experience, and Operations.
              I build scalable onboarding, cut repeat queries, and lead a 10-person
              CX team, turning fragmented journeys into measurable outcomes.
            </motion.p>

            {/* Supporting Metrics */}
            <motion.div
              variants={motionItem}
              className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 text-center lg:text-left"
            >
              <div className="glass rounded-xl p-4 sm:p-5 flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-light text-gradient">10</span>
                <span className="text-xs text-graphite uppercase tracking-wider">Team Members Led</span>
              </div>
              <div className="glass rounded-xl p-4 sm:p-5 flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-light text-gradient">500+</span>
                <span className="text-xs text-graphite uppercase tracking-wider">Learners Onboarded</span>
              </div>
              <div className="glass rounded-xl p-4 sm:p-5 flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-light text-gradient">30%</span>
                <span className="text-xs text-graphite uppercase tracking-wider">Repeat Query Reduction</span>
              </div>
              <div className="glass rounded-xl p-4 sm:p-5 flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-light text-gradient">25%</span>
                <span className="text-xs text-graphite uppercase tracking-wider">CSAT Improvement</span>
              </div>
            </motion.div>

            <motion.div
              variants={motionItem}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-8"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn btn-ghost px-6 py-3"
              >
                <Mail size={16} />
                Get in touch
              </a>
              <a
                href={siteConfig.resumeDownloadUrl}
                download
                className="btn btn-primary px-6 py-3"
              >
                <Download size={16} />
                Download PDF
              </a>
            </motion.div>

            <motion.div
              variants={motionItem}
              className="hidden lg:flex items-center gap-6 mt-8 text-silver/70 text-xs tracking-widest uppercase"
            >
              <span className="text-silver/60">Trusted by</span>
              {["Hello Mentor", "NoBrokers", "Dalztek"].map((company) => (
                <span
                  key={company}
                  className="text-silver/70 font-medium hover:text-white transition-colors"
                >
                  {company}
                </span>
              ))}
            </motion.div>
          </motion.div>

{/* Portrait — large, elegant, confined to the hero */}
          <motion.div
            variants={motionPortrait}
            className="relative mx-auto lg:ml-auto w-[min(72vw,260px)] sm:w-[min(56vw,300px)] lg:w-[min(36vw,430px)] order-1 lg:order-2 mt-6 lg:mt-0"
          >
            <motion.div
              className="relative aspect-square"
              style={
                reducedMotion
                  ? undefined
                  : { x: parallaxX, y: parallaxY }
              }
            >
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
              <div className="absolute bottom-3 right-3 w-20 h-20 sm:w-24 sm:h-24 rounded-full glass border-accent/20 flex items-center justify-center">
                <span className="text-xs sm:text-sm text-accent-bright/90 font-medium">
                  5+ Yrs
                </span>
              </div>
</motion.div>
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
