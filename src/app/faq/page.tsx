"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { faqItems } from "@/lib/products";

const categories = [...new Set(faqItems.map((item) => item.category))];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? faqItems : faqItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-20 lg:pt-[88px]">
      <div className="container-site section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-premium block">FAQ</span>
          <h1 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
            Questions & Answers
          </h1>
          <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-md">
            Find answers to common questions about our products, shipping, and more.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-10 px-5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[var(--color-overlay)] transition-colors"
              >
                <span className="text-sm font-medium text-[var(--color-text-primary)] pr-4">
                  {item.question}
                </span>
                <HiOutlineChevronDown
                  className={`w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0 transition-transform duration-300 ${
                    openId === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openId === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
