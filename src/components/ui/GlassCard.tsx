"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`rounded-[var(--radius-xl)] bg-[var(--color-glass)] backdrop-blur-xl border border-[var(--color-border)] shadow-[var(--shadow-glass)] ${className}`}
    >
      {children}
    </div>
  );
}
