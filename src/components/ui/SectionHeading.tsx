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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
        {label}
      </span>
      <h2 className="mt-3 text-3xl lg:text-4xl xl:text-5xl font-serif text-[var(--color-text-primary)] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
