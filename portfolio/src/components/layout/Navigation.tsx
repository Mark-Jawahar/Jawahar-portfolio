"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn, scrollToSection, scrollToTop } from "@/lib/utils";
import { chapters } from "@/lib/resume-data";

function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    if (Math.abs(delta) > 5) {
      setDirection(delta > 0 ? "down" : "up");
    }
    lastY.current = latest;
  });

  return direction;
}

function useActiveSection() {
  const [active, setActive] = useState("introduction");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = chapters.map((c) => c.id);
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return active;
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const direction = useScrollDirection();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const hidden = direction === "down" && scrolled;

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        scrolled
          ? "bg-[rgba(5,5,5,0.72)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)]"
          : "bg-transparent"
      )}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto px-6 h-14 md:h-16">
        <button
          onClick={() => scrollToTop(true)}
          className="text-sm font-semibold tracking-tight text-[#f5f5f7] hover:text-[#a8d8ea] transition-colors"
        >
          JA
        </button>

        <div className="hidden md:flex items-center gap-1 relative">
          {chapters.map((ch) => {
            const isActive = activeSection === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToSection(ch.id)}
                className={cn(
                  "relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300",
                  isActive
                    ? "text-[#f5f5f7]"
                    : "text-[#8e8e93] hover:text-[#f5f5f7]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-[rgba(168,216,234,0.08)] border border-[rgba(168,216,234,0.12)] shadow-[0_0_12px_rgba(168,216,234,0.06)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{ch.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col items-center justify-center gap-1 w-11 h-11 -mr-2 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors"
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[rgba(5,5,5,0.92)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)]"
          >
            <div className="flex flex-col px-5 py-3 gap-0.5">
              {chapters.map((ch) => {
                const isActive = activeSection === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      scrollToSection(ch.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "px-4 py-3 text-sm font-medium text-left rounded-xl transition-colors",
                      isActive
                        ? "text-[#f5f5f7] bg-[rgba(168,216,234,0.08)]"
                        : "text-[#8e8e93] hover:text-[#f5f5f7]"
                    )}
                  >
                    <span className="text-[0.65rem] text-[#a8d8ea] opacity-60 mr-2 font-mono">
                      {ch.number}
                    </span>
                    {ch.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
