"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[9999] flex flex-col sm:items-center sm:justify-center bg-black sm:bg-black/70"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.4, ease: ease, delay: 0.05 }}
        className="relative flex flex-col w-full h-full
                   sm:h-auto sm:max-h-[90vh] sm:rounded-2xl
                   overflow-hidden glass-panel bg-black"
        style={{ maxWidth: "min(90vw, 1000px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header — stays visible while content scrolls */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 bg-black/50 backdrop-blur-xl safe-top">
          <span className="text-sm font-medium text-silver">Resume</span>
          <div className="flex items-center gap-3">
            <a
              href="/resumes/Jawahar_A_Bcom_BCA.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-graphite hover:text-accent-bright hover:text-white transition-colors active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-bright/80"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-graphite hover:text-white hover:bg-white/10 active:scale-90 transition-all"
              aria-label="Close resume viewer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          <iframe
            ref={iframeRef}
            src="/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.pdf"
            title="Jawahar A — GlassMorphism Resume"
            className="w-full h-full border-0 bg-transparent"
            style={{
              border: "none",
              background: "transparent",
            }}
            onLoad={() => setIsLoaded(true)}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center">
                <div
                  className="w-10 h-10 border-2 border-accent-bright/50 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                />
                <p className="text-silver/70 text-sm">Loading GlassMorphism resume…</p>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer (mobile only) */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/90 sm:hidden safe-bottom">
          <a
            href="/resumes/Jawahar_A_Bcom_BCA.pdf"
            download
            className="btn btn-primary px-4 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-graphite hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}