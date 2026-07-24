"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, FileDown, Mail, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { scrollToSection } from "@/lib/utils";

const commands = [
  {
    id: "about",
    label: "Go to About",
    action: () => scrollToSection("about"),
  },
  {
    id: "experience",
    label: "Go to Experience",
    action: () => scrollToSection("experience"),
  },
  {
    id: "skills",
    label: "Go to Skills",
    action: () => scrollToSection("skills"),
  },
  {
    id: "projects",
    label: "Go to Projects",
    action: () => scrollToSection("projects"),
  },
  {
    id: "contact",
    label: "Go to Contact",
    action: () => scrollToSection("contact"),
  },
  {
    id: "resume",
    label: "Download Resume",
    action: () => window.open("/resume.pdf", "_blank"),
    icon: FileDown,
  },
  {
    id: "email",
    label: "Send Email",
    action: () => window.open("mailto:jawahar.a@email.com", "_blank"),
    icon: Mail,
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = query
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filtered.length) % filtered.length
        );
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        setIsOpen(false);
        setQuery("");
      }
    },
    [filtered, selectedIndex]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg"
            >
              <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
                  <Search className="h-4 w-4 text-muted" />
                  <input
                    autoFocus
                    placeholder="Search pages and actions..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted bg-white/5 border border-white/10">
                    <Command className="h-3 w-3" />
                    K
                  </kbd>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                        setQuery("");
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        i === selectedIndex
                          ? "bg-[#2563eb]/10 text-foreground"
                          : "text-muted hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {cmd.icon ? (
                        <cmd.icon className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                      {cmd.label}
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-sm text-muted p-3 text-center">
                      No results found.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
