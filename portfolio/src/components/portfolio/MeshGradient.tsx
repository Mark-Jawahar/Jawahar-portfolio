"use client";

import { useEffect, useRef } from "react";

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    const blobs = [
      { x: w * 0.2, y: h * 0.3, r: 350, vx: 0.15, vy: 0.1, color: [168, 216, 234] },
      { x: w * 0.8, y: h * 0.6, r: 300, vx: -0.1, vy: 0.15, color: [196, 181, 253] },
      { x: w * 0.5, y: h * 0.8, r: 250, vx: 0.12, vy: -0.08, color: [167, 243, 208] },
      { x: w * 0.7, y: h * 0.2, r: 200, vx: -0.08, vy: -0.12, color: [168, 216, 234] },
    ];

    let animId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r || b.x > w + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > h + b.r) b.vy *= -1;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0.12)`);
        grad.addColorStop(0.5, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0.04)`);
        grad.addColorStop(1, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
