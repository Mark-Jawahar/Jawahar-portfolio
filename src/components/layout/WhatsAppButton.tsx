"use client";

import { MessageCircle } from "lucide-react";
import { profile } from "@/lib/resume-data";

export default function WhatsAppButton() {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md text-white hover:scale-105 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(52,211,153,0.7) 0%, rgba(52,211,153,0.5) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(52,211,153,0.2), 0 1px 4px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(52,211,153,0.8) 0%, rgba(52,211,153,0.6) 100%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(52,211,153,0.7) 0%, rgba(52,211,153,0.5) 100%)";
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
    </a>
  );
}
