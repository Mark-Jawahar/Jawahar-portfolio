"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

export function PremiumButton({
  children,
  href,
  download,
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  download?: boolean;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;
    if (onClick) onClick();
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    variant === "primary"
      ? "relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium text-white inline-flex items-center gap-2 group cursor-pointer select-none"
      : variant === "secondary"
      ? "relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium text-white/80 border border-white/10 inline-flex items-center gap-2 group cursor-pointer select-none hover:border-white/20"
      : "relative overflow-hidden rounded-full px-5 py-3 text-sm font-medium text-white/50 inline-flex items-center gap-2 group cursor-pointer select-none hover:text-white";

  const Tag = href ? "a" : "div";

  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`inline-block ${disabled || loading ? "opacity-40 pointer-events-none" : ""}`}
    >
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={disabled ? undefined : href}
        download={download}
        onClick={handleClick}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className={`${base} ${className}`}
        style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#a8d8ea] via-[#c4b5fd] to-[#a8d8ea] bg-[length:200%_100%] animate-shimmer group-hover:brightness-110 transition-all" />
        )}
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(168,216,234,0.15)]" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <motion.div
              className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            children
          )}
        </span>
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: r.x - 8,
              top: r.y - 8,
              width: 16,
              height: 16,
              transform: "scale(0)",
              animation: "ripple 0.7s ease-out forwards",
            }}
          />
        ))}
      </Tag>
    </motion.div>
  );
}
