"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentPage < numPages) setCurrentPage(currentPage + 1);
      if (e.key === "ArrowLeft" && currentPage > 1) setCurrentPage(currentPage - 1);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, currentPage, numPages]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: "/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.pdf" });
        const pdf = await loadingTask.promise;
        if (!mounted) return;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to load PDF:", err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;
    try {
      const page = await pdfDoc.getPage(pageNum);
      
      // High-DPI rendering: account for devicePixelRatio
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const outputScale = Math.min(dpr, 2); // Cap at 2x for performance
      
      const pageScale = scale * outputScale;
      const viewport = page.getViewport({ scale: pageScale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      // Set actual canvas backing resolution (high-DPI)
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Set CSS size to logical viewport size (viewport at base scale)
      const baseViewport = page.getViewport({ scale });
      canvas.style.width = `${baseViewport.width}px`;
      canvas.style.height = `${baseViewport.height}px`;
      
      const renderContext = {
        canvasContext: canvas.getContext("2d")!,
        viewport,
      };
      await page.render(renderContext).promise;
    } catch (err) {
      console.error("Failed to render page:", err);
    }
  }, [pdfDoc, scale]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, renderPage]);

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
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1); }}
              disabled={currentPage <= 1}
              className="p-2 text-graphite hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-sm font-medium text-silver px-3">
              Page {currentPage} of {numPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
              disabled={currentPage >= numPages}
              className="p-2 text-graphite hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => setScale((prev) => Math.max(prev - 0.25, 0.5))}
                disabled={scale <= 0.5}
                className="p-1.5 text-graphite hover:text-white hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <span className="text-xs text-graphite w-12 text-center">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale((prev) => Math.min(prev + 0.25, 3))}
                disabled={scale >= 3}
                className="p-1.5 text-graphite hover:text-white hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </button>
            </div>
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

          <div className="flex-1 overflow-auto relative min-h-0" style={{ overscrollBehavior: "contain" }}>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-accent-bright/50 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-silver/70 text-sm">Loading GlassMorphism resume…</p>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center min-h-full p-4 sm:p-8">
              <div className="relative bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden">
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
      </div>
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}