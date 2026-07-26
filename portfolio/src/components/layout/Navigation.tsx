"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollToSection } from "@/lib/utils";
import { chapters } from "@/lib/resume-data";

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const ids = chapters.map((c) => c.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      o.observe(el);
      observers.push(o);
    });

    const onScroll = () => {
      const sy = window.scrollY;
      if (sy > 80 && sy > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (sy < lastScrollY.current - 8 || sy < 60) {
        setIsVisible(true);
      }
      setScrolled(sy > 60);
      lastScrollY.current = sy;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        scrolled
          ? "bg-[rgba(5,5,5,0.65)] backdrop-blur-2xl shadow-[0_1px_24px_rgba(0,0,0,0.3)] border-b border-[rgba(255,255,255,0.04)]"
          : "bg-transparent border-b border-transparent"
      )}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto px-5 h-14 md:h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium tracking-tight text-[#f5f5f7] hover:text-[#a8d8ea] transition-colors"
        >
          JA
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-0.5 bg-[rgba(255,255,255,0.02)] rounded-2xl p-0.5">
          {chapters.map((ch) => {
            const active = activeSection === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToSection(ch.id)}
                className={cn(
                  "relative px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300",
                  active
                    ? "text-[#f5f5f7]"
                    : "text-[#8e8e93] hover:text-[#f5f5f7]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-[rgba(168,216,234,0.07)] border border-[rgba(168,216,234,0.1)]"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-[1]">{ch.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-[20%] right-[20%] h-[2px] rounded-full bg-gradient-to-r from-[#a8d8ea] via-[#c4b5fd] to-[#a8d8ea] opacity-60"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Menu"
        >
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-[#8e8e93] transition-all duration-300",
              mobileOpen && "rotate-45 translate-y-[5.5px]"
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-[#8e8e93] transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-[#8e8e93] transition-all duration-300",
              mobileOpen && "-rotate-45 -translate-y-[5.5px]"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)] overflow-hidden"
          >
            <div className="flex flex-col px-5 py-3 gap-1">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    scrollToSection(ch.id);
                    setMobileOpen(false);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-[#8e8e93] hover:text-[#f5f5f7] transition-colors text-left rounded-lg hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <span className="text-[0.65rem] text-[#a8d8ea] opacity-60 mr-2 font-mono">
                    {ch.number}
                  </span>
                  {ch.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
