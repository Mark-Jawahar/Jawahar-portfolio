"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, MessageCircle, Mail, ArrowDown } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="intro"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/95 to-bg-primary" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-ice/5 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[100px] animate-glow" style={{ animationDelay: "2s" }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-block glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-accent-ice mb-8"
          >
            {personalInfo.availability}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-6"
        >
          <span className="text-gradient">Jawahar</span>
          <br />
          <span className="text-gradient-accent">A</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white-muted max-w-2xl mx-auto mb-4"
        >
          Customer Experience Specialist
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-sm text-white-subtle mb-10"
        >
          {personalInfo.currentPosition} &middot; {personalInfo.company} &middot; {personalInfo.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/images/resume.pdf"
            download
            className="glass rounded-full px-6 py-3 text-sm text-white-soft hover:glass-hover transition-all duration-300 flex items-center gap-2"
          >
            <Download size={16} />
            Resume
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="glass rounded-full px-6 py-3 text-sm text-white-soft hover:glass-hover transition-all duration-300 flex items-center gap-2"
          >
            <Mail size={16} />
            Contact
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-6 py-3 text-sm text-white-soft hover:glass-hover transition-all duration-300 flex items-center gap-2"
          >
            <FaLinkedinIn size={14} />
            LinkedIn
          </a>
          <a
            href={`https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-6 py-3 text-sm text-accent-ice hover:glass-hover transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Hire Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-white-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
