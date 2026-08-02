"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = ["home", "about", "impact", "journey", "resume", "contact"];

export function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    const update = () => {
      ticking = false;
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);
      setIsVisible(
        currentScrollY <= 80 || currentScrollY <= lastScrollY.current
      );
      lastScrollY.current = currentScrollY;

      let current = "home";
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          current = SECTIONS[i];
          break;
        }
      }
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { scrolled, activeSection, isVisible };
}
