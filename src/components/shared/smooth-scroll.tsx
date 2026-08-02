"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const rafId = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
