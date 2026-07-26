"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

export function ResumeSection() {
  return (
    <section id="resume" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><FileText className="h-3 w-3" />Resume</span>
          <h2 className="section-title">
            My professional<br />
            <span className="text-gradient-ice">profile.</span>
          </h2>
          <p className="section-description">
            Download my resume or preview it directly in your browser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-2xl p-6 md:p-8 glass-apple-card text-center">
            <div className="h-14 w-14 rounded-2xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-[#a8d8ea]" />
            </div>
            <h3 className="text-base font-semibold mb-1">Jawahar A &mdash; Resume</h3>
            <p className="text-xs text-white/25 mb-5">Customer Experience Specialist | 5+ Years Experience</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <PremiumButton href="/resume.pdf" download variant="primary">
                <Download className="h-4 w-4" /> Download PDF
              </PremiumButton>
              <PremiumButton href="/resume.pdf" variant="secondary">
                <Eye className="h-4 w-4" /> Preview
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
