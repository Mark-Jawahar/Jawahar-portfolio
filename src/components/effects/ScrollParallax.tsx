"use client";

import { useRef, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export default function ScrollParallax({ children, className = "", speed = 0.3, offset = 120 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * offset, -speed * offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
