"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

const galleryItems = [
  {
    src: "/profile-pic.png",
    alt: "Jawahar A — Signature Portrait",
    label: "Executive Presence",
    desc: "Primary professional portrait",
    filter: "img-apple-portrait",
  },
  {
    src: "/hero-portrait.jpg",
    alt: "Jawahar A — Alternate Look",
    label: "Monochrome",
    desc: "Timeless black & white aesthetic",
    filter: "img-apple-mono",
  },
  {
    src: "/profile-pic.png",
    alt: "Jawahar A — Cool Tone",
    label: "Ice Blue",
    desc: "Cool-toned signature palette",
    filter: "img-apple-cool",
  },
  {
    src: "/hero-portrait.jpg",
    alt: "Jawahar A — Warm Tone",
    label: "Warmth",
    desc: "Approachable amber undertones",
    filter: "img-apple-warm",
  },
  {
    src: "/profile-pic.png",
    alt: "Jawahar A — Premium Look",
    label: "Signature",
    desc: "Brand-defining professional image",
    filter: "img-apple-portrait",
  },
];

export function PhotoStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pinScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const pinOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const pinBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <section id="gallery" ref={sectionRef} className="relative">
      {/* Pinned hero image — zoom reveal on scroll */}
      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ scale: pinScale, opacity: pinOpacity, filter: pinBlur }}
            className="w-[90vw] max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden glass-apple-strong shadow-[0_0_80px_rgba(168,216,234,0.04)]"
          >
            <div className="relative w-full h-full">
              <img
                src="/profile-pic.png"
                alt="Jawahar A"
                className="w-full h-full object-cover img-apple-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.7)] via-[rgba(5,5,5,0.1)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/30"
                >
                  Professional Gallery
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-5xl font-semibold tracking-tight mt-2"
                >
                  Crafting a <span className="text-gradient-ice">premium presence</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-white/30 mt-3 max-w-md"
                >
                  Every image is curated to reflect professionalism, warmth, and attention to detail
                  — the same qualities I bring to every customer interaction.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="relative py-16">
        <div className="container-premium px-4 sm:px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="section-label mb-0"><Sparkles className="h-3 w-3" />Gallery</span>
            <span className="text-[11px] text-white/15 font-mono">—</span>
            <span className="text-[11px] text-white/20 font-mono">Scroll horizontally</span>
          </motion.div>
        </div>

        <div
          ref={galleryRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 pb-8 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={`${item.label}-${i}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="snap-start shrink-0 w-[70vw] sm:w-[45vw] lg:w-[35vw] max-w-lg"
            >
              <div className="group relative rounded-2xl overflow-hidden glass-apple-strong aspect-[4/5]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${item.filter}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-white/30">{item.label}</span>
                  <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-8 w-16 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-8 w-16 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
