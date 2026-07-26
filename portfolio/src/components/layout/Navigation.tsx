"use client";

import { useState, useEffect } from "react";
import { cn, scrollToSection } from "@/lib/utils";
import { chapters } from "@/lib/resume-data";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[rgba(5,5,5,0.7)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)]"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto px-5 h-14 md:h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium tracking-tight text-[#f5f5f7] hover:text-[#a8d8ea] transition-colors"
        >
          JA
        </button>

        <div className="hidden md:flex items-center gap-1">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToSection(ch.id)}
              className="px-3 py-1.5 text-xs font-medium text-[#8e8e93] hover:text-[#f5f5f7] transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.03)]"
            >
              {ch.label}
            </button>
          ))}
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

      {mobileOpen && (
        <div className="md:hidden bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)]">
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
        </div>
      )}
    </header>
  );
}
