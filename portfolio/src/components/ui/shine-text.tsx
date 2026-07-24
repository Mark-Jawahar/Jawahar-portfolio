"use client";

import { motion } from "framer-motion";

export function ShineText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, #fff 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.15) 100%)",
        backgroundSize: "250% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      <motion.span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {children}
    </span>
  );
}
