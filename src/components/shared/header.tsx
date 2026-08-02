"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { NAV_ITEMS } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled, activeSection, isVisible } = useScroll();

  const handleClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/5"
            : "bg-gradient-to-b from-black/50 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => handleClick("home")}
              className="group flex items-center gap-1 text-sm font-medium tracking-wider text-white/80 hover:text-white transition-colors"
            >
              <span>JA</span>
              <span className="text-blue-400/80">
                .
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const active = activeSection === id;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleClick(id)}
                    className={cn(
                      "relative px-4 py-2 text-sm tracking-wide transition-colors duration-300",
                      active ? "text-white" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => handleClick(item.href.slice(1))}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "text-2xl tracking-wide transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
