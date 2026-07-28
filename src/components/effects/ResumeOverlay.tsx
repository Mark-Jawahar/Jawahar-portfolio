"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Check, X, GraduationCap, BarChart3,
  Target, Sparkles, ChevronDown,
} from "lucide-react";
import { profile, experiences, skills, education } from "@/lib/resume-data";

function Collapsible({ expanded, children }: { expanded: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, children]);

  return (
    <motion.div
      initial={false}
      animate={{ height: expanded ? height : 0, opacity: expanded ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

function CompanyDetail({
  exp,
  index,
  isOpen,
  onToggle,
}: {
  exp: typeof experiences[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <button
        onClick={onToggle}
        className="w-full text-left cursor-pointer px-5 py-3.5"
        style={{ transition: "background 0.2s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>{exp.company}</span>
              {index === 0 && (
                <span className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background: "rgba(142,142,147,0.08)",
                    color: "rgba(142,142,147,0.5)",
                    border: "1px solid rgba(142,142,147,0.08)",
                  }}
                >
                  Current
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5" style={{ color: "rgba(232,232,237,0.4)" }}>
              {exp.role} &middot; {exp.period}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "rgba(142,142,147,0.3)", flexShrink: 0, marginTop: "2px" }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>
      </button>

      <Collapsible expanded={isOpen}>
        <div className="px-5 pb-4 space-y-4">
          <div>
            <h4 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>
              <span className="flex items-center gap-1.5">
                <Target size={9} style={{ color: "rgba(142,142,147,0.3)" }} />
                Responsibilities
              </span>
            </h4>
            <ul className="space-y-1.5">
              {exp.responsibilities.map((r, j) => (
                <li key={j} className="text-xs flex items-start gap-2 leading-relaxed" style={{ color: "rgba(142,142,147,0.6)" }}>
                  <span className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(142,142,147,0.2)" }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>
              <span className="flex items-center gap-1.5">
                <Sparkles size={9} style={{ color: "rgba(142,142,147,0.3)" }} />
                Achievements
              </span>
            </h4>
            <ul className="space-y-1.5">
              {exp.achievements.map((a, j) => (
                <li key={j} className="text-xs flex items-start gap-2 leading-relaxed" style={{ color: "rgba(142,142,147,0.6)" }}>
                  <span className="flex-shrink-0" style={{ color: "rgba(142,142,147,0.25)" }}>◆</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

export default function ResumeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [openCompany, setOpenCompany] = useState<number | null>(0);
  const [phase, setPhase] = useState<"idle" | "preparing" | "downloading" | "done">("idle");
  const scrollPosRef = useRef(0);

  const handleDownload = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("preparing");
    setTimeout(() => {
      setPhase("downloading");
      const link = document.createElement("a");
      link.href = profile.resumeUrl;
      link.download = "Jawahar_A_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setPhase("done");
        setTimeout(() => setPhase("idle"), 3000);
      }, 500);
    }, 1400);
  }, [phase]);

  useEffect(() => {
    if (open) {
      scrollPosRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      setOpenCompany(0);
    } else {
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollPosRef.current });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={onBackdropClick}
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Detailed Resume"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="glass-overlay relative w-full max-w-[680px] max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4"
              style={{
                background: "rgba(5,5,5,0.8)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>Detailed Resume</h2>
                <p className="text-[0.6rem] mt-0.5" style={{ color: "rgba(142,142,147,0.5)" }}>
                  {profile.name} &middot; {profile.role}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleDownload}
                  disabled={phase !== "idle"}
                  className="relative overflow-hidden rounded-lg text-xs font-medium cursor-pointer disabled:cursor-not-allowed px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: phase === "done" ? "rgba(142,142,147,0.6)" : "rgba(232,232,237,0.7)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (phase === "idle") {
                      e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                      e.currentTarget.style.color = "#e8e8ed";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (phase === "idle") {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "rgba(232,232,237,0.7)";
                    }
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    {phase === "idle" && <><Download size={10} /><span>Download</span></>}
                    {phase === "preparing" && <><span className="w-2.5 h-2.5 rounded-full border-2 border-transparent border-t-current animate-spin" /><span>Preparing</span></>}
                    {phase === "downloading" && <><span className="w-8 h-0.5 rounded-full bg-white/10 overflow-hidden"><span className="block h-full rounded-full" style={{ background: "rgba(142,142,147,0.3)", width: "100%", animation: "download-progress 0.5s ease-out forwards" }} /></span><span>DL</span></>}
                    {phase === "done" && <><Check size={10} /><span>Done</span></>}
                  </span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 transition-colors"
                  style={{ color: "rgba(142,142,147,0.4)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,232,237,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(142,142,147,0.4)"; e.currentTarget.style.background = "transparent"; }}
                  aria-label="Close resume"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">

              <div>
                <h3 className="text-sm font-semibold mb-0.5" style={{ color: "rgba(245,245,247,0.9)" }}>{profile.name}</h3>
                <p className="text-xs" style={{ color: "rgba(232,232,237,0.5)" }}>{profile.role}</p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(142,142,147,0.7)" }}>
                  {profile.headline}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(142,142,147,0.5)" }}>Experience</h4>
                {experiences.map((exp, i) => (
                  <CompanyDetail
                    key={exp.company}
                    exp={exp}
                    index={i}
                    isOpen={openCompany === i}
                    onToggle={() => setOpenCompany((prev) => (prev === i ? null : i))}
                  />
                ))}
              </div>

              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "14px 16px",
              }}>
                <h4 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={9} style={{ color: "rgba(142,142,147,0.3)" }} />
                    Education
                  </span>
                </h4>
                <p className="text-xs font-medium" style={{ color: "rgba(232,232,237,0.8)" }}>{education.degree}</p>
                <p className="text-[0.65rem] mt-0.5" style={{ color: "rgba(142,142,147,0.6)" }}>{education.college} &middot; {education.year} &middot; {education.location}</p>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "14px 16px",
              }}>
                <h4 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>
                  <span className="flex items-center gap-1.5">
                    <BarChart3 size={9} style={{ color: "rgba(142,142,147,0.3)" }} />
                    Skills &amp; Tools
                  </span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.flatMap(s => s.items).map((item) => (
                    <span key={item} className="text-[0.6rem] px-2 py-0.5 rounded-md" style={{
                      color: "rgba(142,142,147,0.6)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
