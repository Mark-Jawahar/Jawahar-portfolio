"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Resume viewer">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="glass-panel portrait-card resume-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'calc(100vh - 40px)',
          maxWidth: 'calc(100vw - 24px)',
          margin: 'auto',
          overflow: 'hidden',
        }}
      >
        <div className="resume-stage">
          <img
            src="/resumes/Jawahar_A_Bcom_BCA_GlassMorphism.webp"
            alt="Jawahar A resume - Assistant Team Lead Customer Experience"
            className="object-contain rounded-lg mx-auto block"
            onLoad={() => console.log('Image loaded successfully')}
            onError={() => console.log('Image failed to load')}
          />
        </div>

        <div className="resume-actions shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/90 safe-bottom">
            <a
              href="/resumes/Jawahar_A_Bcom_BCA.pdf"
              download
              className="btn btn-primary px-4 py-2 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm text-graphite hover:text-white transition-colors"
              aria-label="Close resume viewer"
            >
              Close
            </button>
          </div>
      </motion.div>
    </div>,
    document.body
  );
}