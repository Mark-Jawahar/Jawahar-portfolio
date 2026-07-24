"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] font-medium">
        <span className="w-6 h-px bg-[var(--color-accent)] hidden sm:block" />
        {label}
      </span>
      <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.75rem)] font-serif text-[var(--color-text-primary)] leading-[0.92] tracking-[-0.02em] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  );
}
