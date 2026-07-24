"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "VP of Customer Success",
    company: "TechStart Inc.",
    content:
      "Jawahar brings an exceptional level of dedication to customer experience. His ability to lead teams and drive measurable improvements in CSAT is truly impressive.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Director",
    company: "GrowthLab",
    content:
      "Working with Jawahar has been a pleasure. His systematic approach to process improvement and team leadership consistently delivers outstanding results.",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "CustomerFirst Solutions",
    content:
      "Jawahar has a rare combination of strategic thinking and operational excellence. He understands what it takes to build customer-centric organizations.",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="section-label">
            <MessageSquare className="h-3 w-3" />
            Testimonials
          </span>
          <h2 className="section-title">Kind Words</h2>
          <p className="section-description mx-auto">
            What colleagues and leaders say about working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="gradient-border p-6 flex flex-col hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[#2563eb] text-[#2563eb]"
                  />
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2563eb]/20 to-[#7c3aed]/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gradient">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
