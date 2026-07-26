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
    <footer className="relative border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm tracking-widest uppercase text-white-muted">
              Jawahar A
            </p>
            <p className="text-xs text-white-subtle mt-1">
              Customer Experience Specialist
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-3 text-white-muted hover:text-accent-ice hover:glass-hover transition-all duration-300"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href={`https://wa.me/${personalInfo.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-3 text-white-muted hover:text-accent-cyan hover:glass-hover transition-all duration-300"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full p-3 text-white-muted hover:text-accent-lavender hover:glass-hover transition-all duration-300"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="glass rounded-full p-3 text-white-muted hover:text-accent-silver hover:glass-hover transition-all duration-300"
            >
              <Mail size={18} />
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-3 text-white-muted hover:text-white-soft hover:glass-hover transition-all duration-300"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white-subtle/60">
            &copy; {new Date().getFullYear()} Jawahar A. Crafted with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
