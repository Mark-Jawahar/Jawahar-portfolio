"use client";

import { MessageCircle } from "lucide-react";
import { profile } from "@/lib/resume-data";

export default function WhatsAppButton() {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/90 backdrop-blur-md text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
    </a>
  );
}
