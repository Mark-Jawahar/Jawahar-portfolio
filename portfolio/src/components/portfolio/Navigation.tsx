"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const direction = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); } },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: direction === "down" && scrolled ? -96 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 z-50",
            "h-11 px-1 rounded-full flex items-center gap-1",
            "will-change-transform",
            scrolled
              ? "glass-premium shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              : "bg-transparent border border-transparent"
        )}
      >
        <a href="#" className="px-3.5 text-sm font-semibold tracking-tight">
          <span className="text-gradient-ice">JA</span>
        </a>
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href.slice(1))}
              className={cn(
                "relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                active === l.href.slice(1) ? "text-white" : "text-[rgba(255,255,255,0.4)] hover:text-white/70"
              )}
            >
              {active === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-8 w-8 rounded-full flex items-center justify-center text-white/40 hover:text-white"
        >
          {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-20 left-4 right-4 z-50 rounded-2xl bg-[rgba(5,5,5,0.85)] backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] p-3 md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
