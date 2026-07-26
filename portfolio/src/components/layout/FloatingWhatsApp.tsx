"use client";

import { MessageCircle, ArrowUp } from "lucide-react";
import { profile } from "@/lib/resume-data";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 backdrop-blur-xl text-[#8e8e93] hover:text-[#f5f5f7]"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      <a
        href={profile.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-[#f5f5f7] bg-[rgba(5,5,5,0.8)] backdrop-blur-xl px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.06)] whitespace-nowrap">
          Let&apos;s Talk
        </span>
      </a>
    </div>
  );
}
