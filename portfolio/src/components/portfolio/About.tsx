"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Brain, Palette, Bot, Workflow } from "lucide-react";

const highlights = [
  { icon: Heart, label: "Customer Success", desc: "Building relationships that last" },
  { icon: Brain, label: "Leadership", desc: "Leading teams to deliver excellence" },
  { icon: Workflow, label: "Operations", desc: "Streamlining processes for impact" },
  { icon: Palette, label: "UI/UX & Design", desc: "Personal learning & exploration" },
  { icon: Bot, label: "AI & Automation", desc: "Prompt engineering & workflows" },
  { icon: Sparkles, label: "Website Building", desc: "Crafting premium digital experiences" },
];

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label"><Sparkles className="h-3 w-3" />About</span>
          <h2 className="section-title">
            Building experiences<br />
            <span className="text-gradient-ice">that matter.</span>
          </h2>
          <p className="section-description mb-14">
            Results-driven Customer Success Manager with 3+ years of experience
            in onboarding, retention, and customer lifecycle management across
            EdTech, Real Estate, and Financial Services. Led a 10-member CX team
            to deliver a 30% reduction in repeat queries and 25% CSAT improvement.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.035)] transition-all duration-500"
              >
                <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center mb-3 group-hover:bg-[rgba(168,216,234,0.12)] transition-colors">
                  <Icon className="h-4 w-4 text-[#a8d8ea]" />
                </div>
                <h3 className="text-sm font-medium mb-1">{item.label}</h3>
                <p className="text-xs text-white/30">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-white/15 mt-8 max-w-lg text-center mx-auto"
        >
          Design, AI, and website efforts are personal learning projects and explorations.
        </motion.p>
      </div>
    </section>
  );
}
