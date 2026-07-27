"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { chapters, profile } from "@/lib/resume-data";
import { scrollToSection } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/[0.18] backdrop-blur-[24px] border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        } rounded-2xl px-4 py-2 flex items-center justify-between w-[calc(100%-2rem)] max-w-[700px]`}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("");
          }}
          className="text-xs font-medium tracking-tight text-ice hover:text-pearl transition-colors"
        >
          JA
        </button>

        <div className="hidden md:flex items-center gap-1">
          {chapters.slice(0, 5).map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleClick(ch.id)}
              className={`px-2.5 py-1 rounded-lg text-[0.68rem] font-medium transition-all duration-300 ${
                active === ch.id
                  ? "bg-white/10 text-pearl"
                  : "text-muted hover:text-ice hover:bg-white/[0.03]"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleClick("connect")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pearl text-background text-[0.68rem] font-medium hover:bg-white transition-all duration-300"
        >
          Let's Talk
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1.5 rounded-lg text-muted hover:text-pearl transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

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
