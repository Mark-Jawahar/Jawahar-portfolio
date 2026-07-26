"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      el.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[2]"
      style={{
        background: "radial-gradient(circle at center, rgba(168, 216, 234, 0.04) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
