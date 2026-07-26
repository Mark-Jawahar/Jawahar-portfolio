"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "./section-badge";
import { Download, MapPin, Globe, Award, ChevronRight } from "lucide-react";

const skills = [
  { category: "Customer Success & Operations", items: ["Customer Onboarding", "Customer Lifecycle Management", "Account Management", "Escalation Management", "Technical Support"] },
  { category: "Operations & Analytics", items: ["Process Improvement", "CSAT Management", "CRM Management", "Data Analysis", "Cross-functional Collaboration"] },
  { category: "Tools & Platforms", items: ["Zoho CRM", "Zoho Desk", "Zoho SalesIQ", "MS Excel", "Google Sheets"] },
  { category: "Languages", items: ["English (Professional)", "Tamil (Native)", "Kannada (Professional)", "Telugu (Conversational)"] },
];

const timeline = [
  { period: "Sep 2024 — Present", role: "Customer Experience Specialist", company: "Hello Mentor" },
  { period: "Sep 2023 — June 2024", role: "Relationship Manager", company: "NoBrokers.com" },
  { period: "July 2021 — Aug 2023", role: "Senior Lead Generation Executive", company: "Daztek Online Services" },
  { period: "Apr 2021", role: "B.Com", company: "SSMRV College" },
];

export function InteractiveResume() {
  return (
    <section id="resume" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.7_0.08_240_/_0.04),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Resume" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6">
            Executive <span className="text-gradient font-semibold">Profile</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-3xl p-6 sm:p-8 h-full flex flex-col">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-gradient-to-br from-blue-900/30 to-zinc-900 flex items-center justify-center">
                <span className="text-3xl font-light text-white/20 select-none">JA</span>
              </div>

              <h3 className="text-xl font-medium text-white mb-1">Jawahar A</h3>
              <p className="text-sm text-white/50 mb-4">Customer Experience Specialist</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <MapPin size={12} className="shrink-0 text-blue-300/60" />
                  Bengaluru, Karnataka
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Globe size={12} className="shrink-0 text-blue-300/60" />
                  markjawahar17@gmail.com
                </div>
              </div>

              <p className="text-sm text-white/40 leading-relaxed mb-6">
                Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, and Client Relationship Management across EdTech, Real Estate, and Financial Services.
              </p>

              <div className="mt-auto">
                <a
                  href="/Jawahar_A_Resume.pdf"
                  download
                  className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
                >
                  <Download size={15} className="group-hover:scale-110 transition-transform" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                Experience Timeline
              </h3>
              <div className="space-y-4 mb-8">
                {timeline.map((item, i) => (
                  <div
                    key={`${item.company}-${item.period}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                      <ChevronRight size={14} className="text-blue-300/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 truncate">{item.role}</p>
                      <p className="text-xs text-white/40 truncate">{item.company}</p>
                    </div>
                    <span className="text-[11px] text-white/30 font-mono shrink-0">{item.period}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                Skills & Expertise
              </h3>
              <div className="space-y-5">
                {skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs text-white/40 mb-2.5">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
