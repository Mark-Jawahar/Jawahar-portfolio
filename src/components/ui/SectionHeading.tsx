"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
        {label}
      </span>
      <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-serif text-[var(--color-text-primary)] leading-[1.1] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  );
}
