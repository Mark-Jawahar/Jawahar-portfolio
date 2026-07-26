"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(168,216,234,0.06)] to-transparent" />
      <div className="container-premium px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-sm font-semibold">
            <span className="text-gradient-ice">JA</span>
          </a>
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Jawahar A. Customer Experience Specialist.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            className="h-8 w-8 rounded-full glass-apple-card flex items-center justify-center text-white/15 hover:text-[#a8d8ea] hover:border-[rgba(168,216,234,0.15)] transition-all"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
