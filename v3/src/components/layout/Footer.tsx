"use client";

import { motion } from "framer-motion";
import { ArrowUp, MessageCircle, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-glass-border bg-bg-secondary/30">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.2em] uppercase text-white-muted/60">
              Jawahar A
            </p>
            <p className="text-[0.6875rem] text-white-subtle/50 mt-1">
              Customer Experience Specialist
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {[
              { icon: FaLinkedinIn, href: personalInfo.linkedin },
              { icon: FaInstagram, href: personalInfo.instagram },
              { icon: MessageCircle, href: `https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}` },
              { icon: Mail, href: `mailto:${personalInfo.email}` },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full p-3 text-white-muted/50 hover:text-accent-pearl/70 hover:glass-hover transition-all duration-400"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-3 text-white-muted/50 hover:text-accent-pearl/70 hover:glass-hover transition-all duration-400"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-glass-border text-center">
          <p className="text-[0.6875rem] text-white-subtle/30 tracking-wide">
            &copy; {new Date().getFullYear()} Jawahar A. Crafted with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
