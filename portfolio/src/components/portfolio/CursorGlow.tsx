"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9999] will-change-transform"
      style={{
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
