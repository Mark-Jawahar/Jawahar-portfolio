"use client";

import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: 40 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-24 right-5 z-40"
    >
      <motion.a
        href="https://wa.me/919620151434"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center gap-3 h-14 pl-4 pr-5 rounded-full bg-[rgba(5,5,5,0.8)] backdrop-blur-2xl saturate-[1.8] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[rgba(168,216,234,0.04)] to-transparent" />

        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-white/40 group-hover:text-[#a8d8ea] transition-colors duration-300 relative z-10"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>

        {/* Expandable text */}
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          className="text-xs text-white/60 group-hover:text-white/80 transition-colors overflow-hidden whitespace-nowrap relative z-10"
        >
          Let&apos;s Talk
        </motion.span>

        <motion.div
          className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#050505]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </motion.div>
  );
}
