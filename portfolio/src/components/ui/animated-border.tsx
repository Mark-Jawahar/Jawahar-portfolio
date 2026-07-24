"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedBorder({
  children,
  className = "",
  active = true,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            padding: 1,
            background:
              "conic-gradient(from 0deg, transparent, rgba(59,130,246,0.3), rgba(139,92,246,0.3), transparent)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </div>
  );
}
