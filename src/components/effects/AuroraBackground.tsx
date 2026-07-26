"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const gradients = [
        { x: w * 0.2, y: h * 0.3, r: Math.min(w, h) * 0.35, colors: ["rgba(168, 216, 234, 0.04)", "transparent"] },
        { x: w * 0.8, y: h * 0.5, r: Math.min(w, h) * 0.3, colors: ["rgba(196, 181, 253, 0.03)", "transparent"] },
        { x: w * 0.5, y: h * 0.7, r: Math.min(w, h) * 0.4, colors: ["rgba(168, 216, 234, 0.02)", "transparent"] },
      ];

      gradients.forEach((g, i) => {
        const offsetX = Math.sin(time + i * 2) * w * 0.03;
        const offsetY = Math.cos(time * 0.8 + i * 1.5) * h * 0.03;
        const gradient = ctx.createRadialGradient(g.x + offsetX, g.y + offsetY, 0, g.x + offsetX, g.y + offsetY, g.r);
        gradient.addColorStop(0, g.colors[0]);
        gradient.addColorStop(1, g.colors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
