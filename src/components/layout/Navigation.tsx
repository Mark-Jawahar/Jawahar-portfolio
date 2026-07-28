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
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav
          className="pointer-events-auto rounded-2xl flex items-center gap-8 px-5 py-2 w-fit max-w-[90vw] relative"
          style={{
            background: scrolled
              ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 70%, rgba(255,255,255,0.08) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(48px) saturate(1.4)",
            WebkitBackdropFilter: "blur(48px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: scrolled
              ? "inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.10), 0 12px 48px rgba(0,0,0,0.06)"
              : "inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.02)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 5%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 35%, transparent 60%)",
            }}
          />

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActive("");
            }}
            className="relative text-sm md:text-base font-medium tracking-tight text-ice hover:text-pearl transition-colors"
          >
            JA
          </button>

          <div className="hidden md:flex items-center gap-1">
            {chapters.slice(0, 5).map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleClick(ch.id)}
                style={{
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  active === ch.id
                    ? "text-pearl"
                    : "text-muted hover:text-ice"
                }`}
              >
                {active === ch.id && (
                  <span
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  />
                )}
                <span className="relative">{ch.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleClick("connect")}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.08) 100%)",
              backdropFilter: "blur(12px) saturate(1.3)",
              WebkitBackdropFilter: "blur(12px) saturate(1.3)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e8e8ed",
              boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.07) 70%, rgba(255,255,255,0.10) 100%)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.transform = "translateY(-0.5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.16), 0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.08) 100%)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.06)";
            }}
          >
            Let&apos;s Talk
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 rounded-lg text-muted hover:text-pearl transition-colors relative"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            className="relative ml-auto w-72 h-full p-6 pt-24"
            style={{
              background: "linear-gradient(135deg, rgba(8,8,10,0.92) 0%, rgba(5,5,5,0.88) 100%)",
              backdropFilter: "blur(40px) saturate(1.6)",
              WebkitBackdropFilter: "blur(40px) saturate(1.6)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), -4px 0 24px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 10%, rgba(255,255,255,0.02) 30%, transparent 60%)",
              }}
            />
            <div className="relative flex flex-col gap-1">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleClick(ch.id)}
                  className="text-left px-3 py-2.5 rounded-xl text-sm transition-all relative"
                  style={{
                    color: active === ch.id ? "#e8e8ed" : "#8e8e93",
                    background: active === ch.id
                      ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                      : "transparent",
                    boxShadow: active === ch.id ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 4px rgba(0,0,0,0.04)" : "none",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== ch.id) {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== ch.id) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span className="text-[0.6rem] font-mono opacity-40 mr-2">{ch.number}</span>
                  {ch.label}
                </button>
              ))}
              <hr className="my-3 border-white/[0.06]" />
              <a
                href={`mailto:${profile.email}`}
                className="px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  color: "rgba(142,142,147,0.6)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
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
