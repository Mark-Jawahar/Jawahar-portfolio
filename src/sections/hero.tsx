"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, animate, type Variants } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
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
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  const reducedMotion = useReducedMotion();

  /*
   * Portrait choreography — every value is derived from scroll progress.
   * A single, gentle arc: settle right, drift up-left, then recede.
   */
  const portraitX = useTransform(p, [0, 0.25, 0.5, 0.75, 1], ["10%", "6%", "-6%", "-14%", "-16%"]);
  const portraitY = useTransform(p, [0, 0.25, 0.5, 0.75, 1], ["0%", "-8%", "-16%", "-28%", "-42%"]);
  const portraitScale = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [1, 0.88, 0.7, 0.55, 0.4]);
  const portraitRotate = useTransform(p, [0, 0.5, 1], [0, -0.5, -0.8]);
  const portraitOpacity = useTransform(p, [0, 0.35, 0.6, 0.8, 1], [1, 0.92, 0.78, 0.45, 0]);
  const portraitBlur = useTransform(p, [0.85, 0.95, 1], ["blur(0px)", "blur(4px)", "blur(12px)"]);
  const portraitZ = useTransform(p, [0, 0.4, 0.75, 1], [0, 70, 50, 0]);
  const portraitOrigin = useTransform(p, [0, 1], ["50% 50%", "25% 80%"]);

  /* Mount entrance only — never scroll-triggered. */
  const portraitEnter = useMotionValue(0);
  useEffect(() => {
    const controls = animate(portraitEnter, 1, { duration: 1.2, ease: EASE, delay: 0.35 });
    return () => controls.stop();
  }, [portraitEnter]);
  const entranceOpacity = useTransform(portraitEnter, [0, 1], [0, 1]);
  const entranceY = useTransform(portraitEnter, [0, 1], [24, 0]);

  /* Parallax layers — background drifts slowly, decorative elements faster. */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0.45]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const decorOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.1]);

  /* Large typography — recedes and blurs softly as the hero releases. */
  const textY = useTransform(p, [0, 0.16], ["0%", "-18%"]);
  const textOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const textBlur = useTransform(p, [0, 0.12], ["blur(0px)", "blur(8px)"]);

  return (
    <section id="home" className="relative z-20">
      {/* Fixed background stage */}
      <motion.div
        style={{
          y: reducedMotion ? 0 : bgY,
          scale: reducedMotion ? 1 : bgScale,
          opacity: reducedMotion ? 1 : bgOpacity,
        }}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.08),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.6_0.06_260_/_0.04),_transparent_60%)]" />
      </motion.div>

      {/* Decorative elements (parallax 1.4) */}
      <motion.div
        style={{ y: reducedMotion ? 0 : decorY, opacity: reducedMotion ? 1 : decorOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[18%] right-[10%] w-40 h-40 rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute bottom-[25%] left-[6%] w-52 h-52 rounded-full bg-purple-500/4 blur-[100px]" />
      </motion.div>

      {/* Fixed portrait — the cinematic subject, fully driven by scroll */}
      <div
        className="fixed inset-0 z-30 pointer-events-none"
        style={{ perspective: 1200 }}
        data-cinematic-portrait
      >
        <motion.div
          className="relative w-full h-full will-change-transform"
          style={{
            x: reducedMotion ? 0 : portraitX,
            y: reducedMotion ? 0 : portraitY,
            scale: reducedMotion ? 1 : portraitScale,
            rotate: reducedMotion ? 0 : portraitRotate,
            opacity: reducedMotion ? 1 : portraitOpacity,
            filter: reducedMotion ? "none" : portraitBlur,
            z: reducedMotion ? 0 : portraitZ,
            transformOrigin: reducedMotion ? "50% 50%" : portraitOrigin,
          }}
        >
          <div className="w-full h-full flex items-center justify-center mt-[16vh] lg:mt-0">
            <motion.div
              style={{ opacity: entranceOpacity, y: entranceY }}
              className="relative w-[min(64vw,280px)] sm:w-[min(50vw,340px)] lg:w-[min(36vw,430px)] aspect-square"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/8 to-transparent blur-[80px]" />
              <Image
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 640px) 64vw, (max-width: 1024px) 50vw, 36vw"
                className="object-cover rounded-full border border-white/10 shadow-2xl glow"
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl flex items-center justify-center">
                <span className="text-sm text-blue-300/70 font-medium">5+ Yrs</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Pinned hero — text recedes while the next section emerges beneath */}
      <div className="relative h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{
              y: reducedMotion ? 0 : textY,
              opacity: reducedMotion ? 1 : textOpacity,
              filter: reducedMotion ? "none" : textBlur,
            }}
            className="w-full h-full"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center pt-24">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="text-center lg:text-left"
                >
                  <motion.div
                    variants={item}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase mb-10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
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
                        className="group-hover:scale-110 transition-transform"
                      />
                      Get in touch
                    </a>
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

                <div className="hidden lg:block" aria-hidden />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: reducedMotion ? 1 : textOpacity }}
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
        </div>
      </div>
    </section>
  );
}
