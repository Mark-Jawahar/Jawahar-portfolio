"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "intro", label: "Home" },
  { id: "who-i-am", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Connect" },
];

export function Navigation() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const scrollPos = window.scrollY + 200;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const sec = document.getElementById(chapters[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass border-b border-glass-border" : "bg-gradient-to-b from-bg-primary/50 to-transparent"
        )}
      >
        <div className="section-container h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("intro")}
            className="text-[0.625rem] tracking-[0.25em] uppercase text-white-muted/60 hover:text-white-soft transition-colors duration-300"
          >
            J A W A H A R &nbsp; A
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className={cn(
                  "relative px-3 py-1.5 text-[0.625rem] tracking-[0.2em] uppercase transition-all duration-300 rounded-full",
                  active === ch.id
                    ? "text-white-soft/80"
                    : "text-white-subtle/50 hover:text-white-soft/50"
                )}
              >
                {active === ch.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 glass rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{ch.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white-muted/60 hover:text-white-soft transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-2xl pt-16"
          >
            <div className="flex flex-col items-center gap-4 p-8">
              {chapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => scrollTo(ch.id)}
                  className="text-sm tracking-[0.25em] uppercase text-white-muted/60 hover:text-white-soft transition-colors duration-300"
                >
                  {ch.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
