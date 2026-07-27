"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { chapters, profile } from "@/lib/resume-data";
import { scrollToSection } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const prevScrollRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const pastThreshold = currentY > 40;

      setScrolled(pastThreshold);

      if (!pastThreshold) {
        setVisible(true);
        prevScrollRef.current = currentY;
        return;
      }

      const delta = currentY - prevScrollRef.current;
      prevScrollRef.current = currentY;

      if (delta > 8) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setVisible(false), 100);
      } else if (delta < -4) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClick = (id: string) => {
    setActive(id);
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto rounded-2xl flex items-center gap-6 px-5 py-2 w-fit max-w-[90vw]"
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.10)"
            : "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0)"
            : "translateY(-20px)",
          transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s ease",
        }}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("");
          }}
          className="text-sm md:text-base font-medium tracking-tight text-ice hover:text-pearl transition-colors"
        >
          JA
        </button>

        <div className="hidden md:flex items-center gap-1">
          {chapters.slice(0, 5).map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleClick(ch.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                active === ch.id
                  ? "bg-white/[0.08] backdrop-blur-sm text-pearl"
                  : "text-muted hover:text-ice hover:bg-white/[0.03]"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleClick("connect")}
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/[0.10] backdrop-blur-sm border border-white/[0.08] text-pearl text-sm font-medium hover:bg-white/[0.15] hover:border-white/[0.12] transition-all duration-300"
        >
          Let&apos;s Talk
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1.5 rounded-lg text-muted hover:text-pearl transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-64 h-full bg-background-secondary border-l border-white/[0.06] p-6 pt-20">
            <div className="flex flex-col gap-1">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleClick(ch.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                    active === ch.id
                      ? "bg-white/10 text-pearl"
                      : "text-muted hover:text-ice hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="text-[0.6rem] font-mono opacity-40 mr-2">{ch.number}</span>
                  {ch.label}
                </button>
              ))}
              <hr className="my-3 border-white/[0.06]" />
              <a
                href={`mailto:${profile.email}`}
                className="px-3 py-2.5 rounded-xl text-sm text-cyan hover:bg-white/[0.03] transition-all"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
