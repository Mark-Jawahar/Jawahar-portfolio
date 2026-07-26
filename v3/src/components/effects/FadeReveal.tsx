"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  blur?: boolean;
  once?: boolean;
  distance?: number;
}

export function FadeReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  blur = false,
  once = true,
  distance = 40,
}: FadeRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const offsets: Record<string, Record<string, number>> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...offsets[direction],
        filter: blur ? "blur(6px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
