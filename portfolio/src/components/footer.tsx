"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 tracking-wide">
            &copy; {new Date().getFullYear()} Jawahar A. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Back to top
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
