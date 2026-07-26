"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { profile } from "@/lib/resume-data";

type DownloadState = "idle" | "preparing" | "downloading" | "success";

export function ResumeChapter() {
  const [state, setState] = useState<DownloadState>("idle");
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const handleDownload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      handleRipple(e);
      setState("preparing");
      await new Promise((r) => setTimeout(r, 800));
      setState("downloading");
      await new Promise((r) => setTimeout(r, 500));

      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Jawahar_A_Resume.pdf";
      link.click();

      setState("success");
      setTimeout(() => setState("idle"), 2500);
    },
    [handleRipple]
  );

  return (
    <section id="resume" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">06</span>
            Resume
          </div>
        </ScrollReveal>

        <div className="max-w-[700px] mt-10">
          <ScrollReveal delay={0.1}>
            <div className="glass-panel-strong p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-[#f5f5f7]">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-[#8e8e93] mt-1">
                    {profile.role} &middot; {profile.experience}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="tag-pill flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Open to Opportunities
                    </span>
                    <span className="tag-pill">{profile.location}</span>
                    <span className="tag-pill">{profile.experience}</span>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={state === "downloading" || state === "preparing"}
                  className="btn-primary relative overflow-hidden min-w-[160px] justify-center"
                >
                  <AnimatePresence mode="wait">
                    {state === "idle" && (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                      </motion.span>
                    )}
                    {state === "preparing" && (
                      <motion.span
                        key="preparing"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Preparing...
                      </motion.span>
                    )}
                    {state === "downloading" && (
                      <motion.span
                        key="downloading"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Downloading...
                      </motion.span>
                    )}
                    {state === "success" && (
                      <motion.span
                        key="success"
                        className="flex items-center gap-2 text-green-400"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Check className="w-4 h-4" />
                        Downloaded
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {ripples.map((r) => (
                    <span
                      key={r.id}
                      className="btn-ripple"
                      style={{ left: r.x, top: r.y, width: 10, height: 10 }}
                    />
                  ))}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#a8d8ea] hover:text-[#f5f5f7] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Preview Resume
                  <span className="text-xs text-[#8e8e93]">PDF &middot; 2 pages</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
