"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}?text=Hi%20Jawahar%2C%20I%20came%20across%20your%20portfolio.`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 glass rounded-full p-3 text-accent-pearl/70 hover:glass-hover hover:text-accent-pearl transition-all duration-400"
      aria-label="WhatsApp"
    >
      <MessageCircle size={18} />
    </motion.a>
  );
}
