"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

export function ResumeSection() {
  return (
    <section className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="h-14 w-14 rounded-2xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center mx-auto mb-5">
            <FileText className="h-7 w-7 text-[#a8d8ea]" />
          </div>
          <h2 className="section-title">
            View my<br />
            <span className="text-gradient-ice">resume.</span>
          </h2>
          <p className="section-description mx-auto mb-8">
            A comprehensive overview of my professional experience, achievements,
            and educational background.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <PremiumButton href="/resume.pdf" download variant="primary">
              <Download className="h-4 w-4" /> Download PDF
            </PremiumButton>
            <PremiumButton href="/resume.pdf" variant="secondary">
              <Eye className="h-4 w-4" /> Preview
            </PremiumButton>
          </div>
          <p className="text-xs text-white/15 mt-6">
            PDF format &bull; Updated 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
