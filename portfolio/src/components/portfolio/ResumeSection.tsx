"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, FileText, Check } from "lucide-react";

export function ResumeSection() {
  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "progress" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const aRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async () => {
    if (downloadState !== "idle") return;
    setDownloadState("preparing");
    await new Promise((r) => setTimeout(r, 200));

    setDownloadState("progress");
    for (let i = 0; i <= 100; i += 4) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 12));
    }

    setDownloadState("complete");
    aRef.current?.click();
    await new Promise((r) => setTimeout(r, 1200));
    setDownloadState("idle");
    setProgress(0);
  };

  return (
    <section id="resume" className="section-padding relative">
      <a ref={aRef} href="/resume.pdf" download className="hidden" />

      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><FileText className="h-3 w-3" />Resume</span>
          <h2 className="section-title">
            My professional<br />
            <span className="text-gradient-ice">profile.</span>
          </h2>
          <p className="section-description">
            Download my resume or preview it directly in your browser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto"
        >
          <motion.div
            className="group relative rounded-2xl overflow-hidden glass-apple-card p-6 md:p-8 text-center"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(168,216,234,0.03)] to-transparent" />
              <div
                className="absolute -inset-32 bg-[radial-gradient(circle_at_50%_0%,rgba(168,216,234,0.06),transparent_70%)]"
                style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
              />
            </div>

            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(168,216,234,0.06)] text-[#a8d8ea]/60 border border-[rgba(168,216,234,0.08)]">
                Updated Apr 2026
              </span>
            </div>

            <motion.div
              className="relative w-20 h-20 rounded-2xl mx-auto mb-5 overflow-hidden bg-gradient-to-br from-[rgba(168,216,234,0.08)] to-[rgba(196,181,253,0.08)] border border-[rgba(255,255,255,0.04)] flex items-center justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="h-8 w-8 text-[#a8d8ea]" />
            </motion.div>

            <h3 className="text-base font-semibold mb-1 relative">Jawahar A</h3>
            <p className="text-xs text-white/25 mb-2 relative">
              Customer Experience Specialist &middot; 5+ Years
            </p>
            <div className="flex items-center justify-center gap-2 mb-5 relative">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[rgba(167,243,208,0.04)] text-[#a7f3d0]/50 border border-[rgba(167,243,208,0.06)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Open to Opportunities
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[rgba(255,255,255,0.02)] text-white/20 border border-[rgba(255,255,255,0.04)]">
                Bengaluru, KA
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
              <motion.button
                onClick={handleDownload}
                disabled={downloadState !== "idle"}
                whileHover={downloadState === "idle" ? { scale: 1.015 } : {}}
                whileTap={downloadState === "idle" ? { scale: 0.98 } : {}}
                className="relative overflow-hidden rounded-full h-11 px-6 text-sm font-medium text-[#050505] inline-flex items-center justify-center gap-2 cursor-pointer select-none min-w-[180px]"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#a8d8ea] via-[#c4b5fd] to-[#a8d8ea] bg-[length:200%_100%] animate-shimmer"
                  style={{ opacity: downloadState === "idle" ? 1 : 0.7 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {downloadState === "idle" && (
                    <>
                      <Download className="h-4 w-4" />
                      Download Resume
                    </>
                  )}
                  {downloadState === "preparing" && (
                    <>
                      <motion.div
                        className="h-4 w-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Preparing Resume...
                    </>
                  )}
                  {downloadState === "progress" && (
                    <>
                      <svg className="h-4 w-4" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(5,5,5,0.15)" strokeWidth="2" />
                        <motion.circle
                          cx="10" cy="10" r="8"
                          fill="none" stroke="#050505" strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={50.27}
                          initial={{ strokeDashoffset: 50.27 }}
                          animate={{ strokeDashoffset: 50.27 * (1 - progress / 100) }}
                          style={{ rotate: "-90deg", transformOrigin: "center" }}
                        />
                      </svg>
                      {progress}%
                    </>
                  )}
                  {downloadState === "complete" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Downloaded!
                    </motion.span>
                  )}
                </span>
              </motion.button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-full h-11 px-6 text-sm font-medium text-white/70 border border-white/10 inline-flex items-center justify-center gap-2 hover:border-white/20 hover:text-white transition-all"
              >
                <Eye className="h-4 w-4" />
                Preview
              </a>
            </div>

            <AnimatePresence>
              {downloadState === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-[10px] text-[#a7f3d0]/40"
                >
                  Resume downloaded successfully
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
