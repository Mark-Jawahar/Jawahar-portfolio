"use client";

import { useRef, ReactNode } from "react";
import { useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionStyles: Record<string, { opacity: number; x: number; y: number }> = {
    up: { opacity: 0, x: 0, y: 30 },
    down: { opacity: 0, x: 0, y: -30 },
    left: { opacity: 0, x: 30, y: 0 },
    right: { opacity: 0, x: -30, y: 0 },
    none: { opacity: 0, x: 0, y: 0 },
  };

  const from = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : from.opacity,
        transform: isInView
          ? "translate(0, 0)"
          : `translate(${from.x}px, ${from.y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
