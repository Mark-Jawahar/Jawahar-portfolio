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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 glass rounded-full p-4 text-accent-cyan hover:glass-hover transition-all duration-300 shadow-lg shadow-accent-cyan/10"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
