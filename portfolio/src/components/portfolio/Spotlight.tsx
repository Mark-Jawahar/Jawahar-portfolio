"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.setProperty("--x", `${e.clientX}px`);
        ref.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50vw) var(--y, 50vh), rgba(168,216,234,0.05) 0%, transparent 60%)",
      }}
    />
  );
}
