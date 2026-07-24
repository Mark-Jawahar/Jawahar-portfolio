"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, Sparkles } from "lucide-react";

const highlights = [
  "Customer Success",
  "Customer Experience",
  "Operations",
  "Team Leadership",
];

const passions = [
  "Artificial Intelligence",
  "Technology",
  "Business",
  "UI/UX",
  "Leadership",
  "Investing",
  "Entrepreneurship",
];

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="section-label">
            <Sparkles className="h-3 w-3" />
            About Me
          </span>
          <h2 className="section-title">
            A brief introduction
          </h2>
          <p className="section-description mb-12">
            With over 3 years of professional experience, I specialize in
            building exceptional customer experiences through strategic
            leadership, operational excellence, and process innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gradient-border p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#2563eb]/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <p className="text-sm text-muted">3+ Years</p>
                </div>
              </div>
              <p className="text-muted mb-6">
                Currently serving as Assistant Team Lead &ndash; Customer
                Experience at Hello Mentor, where I lead a team of 10
                professionals focused on delivering outstanding customer
                satisfaction.
              </p>
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
                    <span className="text-sm text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="gradient-border p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#7c3aed]/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-[#7c3aed]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Passionate About</h3>
                  <p className="text-sm text-muted">What drives me</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {passions.map((passion, i) => (
                  <motion.span
                    key={passion}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-muted hover:text-foreground hover:border-[#7c3aed]/30 transition-all duration-300"
                  >
                    {passion}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
