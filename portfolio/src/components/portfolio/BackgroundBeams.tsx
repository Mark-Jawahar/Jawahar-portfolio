"use client";

import { useEffect, useRef } from "react";

export function BackgroundBeams() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    const beams: { x: number; y: number; vx: number; vy: number; hue: number }[] = [];
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        hue: 220 + Math.random() * 40,
      });
    }

    let anim = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const b of beams) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -100 || b.x > w + 100) b.vx *= -1;
        if (b.y < -100 || b.y > h + 100) { b.y = h + 100; b.vy = -Math.abs(b.vy); }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 300);
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 60%, 0.04)`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 80%, 60%, 0.015)`);
        grad.addColorStop(1, `hsla(${b.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      anim = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
