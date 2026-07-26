"use client";

import { useState, useEffect, useRef } from "react";

export function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isVisibleRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);

      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      if (currentScrollY > 80 && direction === "down") {
        isVisibleRef.current = false;
        setIsVisible(false);
      } else if (direction === "up") {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      const sections = ["home", "about", "impact", "journey", "resume", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrolled, activeSection, scrollY, isVisible };
}
