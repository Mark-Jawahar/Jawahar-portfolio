"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-6",
  md: "p-8",
  lg: "p-10",
};

export function GlassCard({ children, className, delay = 0, hover = true, padding = "md" }: GlassCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "glass-card rounded-2xl",
        paddings[padding],
        hover && "cursor-default",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
