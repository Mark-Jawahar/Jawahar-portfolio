"use client";

import { useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const renderPage = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const pdf = await pdfjsLib.getDocument("/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.pdf").promise;
      const page = await pdf.getPage(1);

      const container = canvasRef.current?.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: scale * Math.min(window.devicePixelRatio || 1, 2) });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / (window.devicePixelRatio || 1)}px`;
      canvas.style.height = `${viewport.height / (window.devicePixelRatio || 1)}px`;

      await page.render({ canvasContext: context, viewport: page.getViewport({ scale: scale * Math.min(window.devicePixelRatio || 1, 2) }) }).promise;
    } catch (err) {
      console.error("Failed to render page:", err);
    }
  }, []);

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
      <div
        ref={panelRef}
        className="relative flex flex-col w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl overflow-hidden glass-panel bg-black"
        style={{ maxWidth: "min(90vw, 1000px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 bg-black/50 backdrop-blur-xl safe-top">
          <span className="text-sm font-medium text-silver">Resume</span>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href="/resumes/Jawahar_A_Bcom_BCA.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-graphite hover:text-accent-bright hover:text-white transition-colors active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-bright/80"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">PDF</span>
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-graphite hover:text-white hover:bg-white/10 active:scale-90 transition-all"
              aria-label="Close resume viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative min-h-0" style={{ overscrollBehavior: "contain" }}>
          <div className="flex items-center justify-center min-h-full p-4 sm:p-8">
            <div className="relative bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden w-full max-w-[900px] mx-auto">
              <canvas
                ref={canvasRef}
                className="block mx-auto"
                style={{ background: "transparent" }}
              />
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/90 sm:hidden safe-bottom">
          <a
            href="/resumes/Jawahar_A_Bcom_BCA.pdf"
            download
            className="btn btn-primary px-4 py-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-graphite hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}