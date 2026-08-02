"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Download, MapPin, Mail, ExternalLink, GraduationCap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experience";
import { EASE } from "@/lib/motion";

const ResumeOverlay = dynamic(
  () =>
    import("@/components/shared/ResumeOverlay").then(
      (m) => m.ResumeOverlay
    ),
  { ssr: false }
);

const metrics = [
  { value: "500+", label: "Learners" },
  { value: "5+", label: "Years" },
  { value: "25%", label: "CSAT" },
  { value: "30%", label: "Queries" },
];

const expertise = [
  "Customer Success",
  "Customer Onboarding",
  "CRM",
  "Process Improvement",
  "Cross-functional Collaboration",
  "Operations",
];

function truncate(text?: string, max = 90) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, "") + "..." : text;
}

export function Resume() {
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = useCallback(() => setShowOverlay(true), []);
  const closeOverlay = useCallback(() => setShowOverlay(false), []);

  const workExperiences = experiences.filter((e) => e.type === "work");
  const educationExperience = experiences.find((e) => e.type === "education");

  return (
    <>
      <section id="resume" className="relative py-24 sm:py-36 lg:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.7_0.08_240_/_0.04),_transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-14 sm:mb-20"
          >
            <SectionBadge label="Resume" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 leading-[1.08]">
              Executive{" "}
              <span className="text-gradient font-semibold">Profile</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            {/* Profile Header */}
            <header className="flex flex-col sm:flex-row items-start gap-5 pb-8 border-b border-white/5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0 self-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium text-white">
                        {siteConfig.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-bright/10 border border-accent-bright/25 text-[10px] font-medium text-accent-bright/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-bright/70" />
                        Open to Opportunities
                      </span>
                    </div>
                    <p className="text-sm text-silver/75 mt-0.5">
                      {siteConfig.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-graphite shrink-0">
                    <MapPin size={12} className="text-accent-bright/70" />
                    {siteConfig.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-graphite">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-silver transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail size={11} className="text-accent-bright/70" />
                    {siteConfig.email}
                  </a>
                  <a
                    href="https://linkedin.com/in/jawahar-a-47037a240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-silver transition-colors inline-flex items-center gap-1.5"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-current text-accent-bright/70"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    linkedin.com/in/jawahar-a-47037a240
                  </a>
                  <a
                    href={siteConfig.resumeUrl}
                    download
                    className="inline-flex items-center gap-1.5 hover:text-silver transition-colors"
                  >
                    <Download size={11} className="text-accent-bright/70" />
                    Resume PDF
                  </a>
                </div>
              </div>
            </header>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 py-8 border-b border-white/5">
              {metrics.map((m) => (
                <div key={m.value}>
                  <p className="text-2xl sm:text-3xl font-light text-gradient tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-graphite mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Summary + Expertise */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 py-8 border-b border-white/5">
              <div className="lg:col-span-3">
                <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
                  Executive Summary
                </h4>
                <p className="text-[15px] text-silver/80 leading-[1.85]">
                  Customer Experience Specialist with 5+ years of experience in
                  Customer Onboarding, Customer Success, and Client Relationship
                  Management across EdTech, Real Estate, and Financial Services.
                  Proven track record of managing end-to-end onboarding for 500+
                  learners and delivering measurable improvements in customer
                  satisfaction and operational efficiency.
                </p>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
                  Core Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Highlights */}
            <div className="py-8">
              <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-5">
                Career Highlights
              </h4>
              <div className="space-y-3">
                {workExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent/60 mt-2 shrink-0 ring-2 ring-accent/15" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="text-sm text-silver/90 font-medium">
                          {exp.company}
                        </p>
                        <span className="text-[11px] text-graphite font-mono shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-silver/70 mt-0.5">
                        {exp.title}
                      </p>
                      <p className="text-xs text-graphite mt-1.5 leading-relaxed">
                        {truncate(exp.achievements[0])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education + View Resume */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-white/5">
              {educationExperience && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-violet/10 border border-accent-violet/25 flex items-center justify-center shrink-0">
                    <GraduationCap size={14} className="text-accent-violet/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-silver/90">
                      {educationExperience.title}
                    </p>
                    <p className="text-xs text-graphite">
                      {educationExperience.company} &middot;{" "}
                      {educationExperience.period}
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={openOverlay}
                className="btn btn-ghost px-7 py-3 shrink-0"
              >
                View Resume
                <ExternalLink
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showOverlay && <ResumeOverlay onClose={closeOverlay} />}
      </AnimatePresence>
    </>
  );
}
