"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface SectionBadgeProps {
  label: string;
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-wider uppercase"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
      {label}
    </motion.div>
  );
}
