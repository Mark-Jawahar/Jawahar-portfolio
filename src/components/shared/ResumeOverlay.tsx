"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ChevronDown, Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { useModalLock } from "@/hooks/use-modal-lock";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useModalLock(onClose, panelRef, scrollRef);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const workExperiences = experiences.filter((e) => e.type === "work");
  const education = experiences.find((e) => e.type === "education");
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[9999] flex flex-col sm:items-center sm:justify-center bg-black sm:bg-black/70"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.4, ease, delay: 0.05 }}
        className="relative flex flex-col w-full h-full
                   sm:h-auto sm:max-h-[90vh] sm:rounded-2xl
                   overflow-hidden glass-panel bg-black"
        style={{ maxWidth: "min(85vw, 960px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header — stays visible while content scrolls */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <span className="text-sm font-medium text-silver">Resume</span>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 text-xs text-graphite hover:text-accent-bright hover:text-white transition-colors active:scale-95"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-graphite hover:text-white hover:bg-white/10 active:scale-90 transition-all"
              aria-label="Close resume viewer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          tabIndex={0}
          className="flex-1 overflow-y-auto modal-scroll outline-none"
        >
          <div className="px-4 sm:px-10 lg:px-12 py-6 sm:py-10 lg:py-14">
            <div className="mx-auto w-full" style={{ maxWidth: "720px" }}>
              {/* Resume Header */}
              <div className="mb-12 pb-9 border-b border-white/5">
                <h1 className="text-5xl lg:text-[54px] font-light text-white tracking-tight leading-[1.05]">
                  {siteConfig.name}
                </h1>
                <p className="text-2xl sm:text-[26px] text-silver/80 mt-3 font-light">
                  {siteConfig.role}
                </p>
                <p className="text-base text-graphite mt-4 leading-relaxed">
                  {siteConfig.location} &middot; {siteConfig.email}
                </p>
              </div>

              {/* Professional Summary */}
              <section className="mb-12">
                <SectionTitle>Professional Summary</SectionTitle>
                <p className="text-lg text-silver/85 leading-[1.75]">
                  Customer Experience Specialist with 5+ years of experience in
                  Customer Onboarding, Customer Success, and Client Relationship
                  Management across EdTech, Real Estate, and Financial Services.
                  Proven track record of managing end-to-end onboarding for 500+
                  learners, handling 80+ concurrent high-value property
                  transactions, and qualifying 150+ leads monthly. Adept at CRM
                  management, process improvement, cross-functional
                  collaboration, and delivering measurable improvements in
                  customer satisfaction and operational efficiency.
                </p>
              </section>

              {/* Skills */}
              <section className="mb-12">
                <SectionTitle>Skills</SectionTitle>
                <div className="space-y-5">
                  {categories.map((category) => (
                    <div key={category}>
                      <p className="text-base text-graphite mb-3">
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter((s) => s.category === category)
                          .map((skill) => (
                            <span
                              key={skill.id}
                              className="px-3.5 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-silver/80"
                            >
                              {skill.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Professional Experience */}
              <section className="mb-12">
                <SectionTitle>Professional Experience</SectionTitle>
                <div className="space-y-6">
                  {workExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden"
                    >
                      <div className="p-5 sm:p-7">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-white/90">
                              {exp.company}
                            </h3>
                            <p className="text-sm text-silver/70 mt-1">
                              {exp.title}
                            </p>
                          </div>
                          <div className="text-sm text-graphite font-mono shrink-0 text-left sm:text-right">
                            <p>{exp.period}</p>
                            <p className="text-graphite/80">{exp.location}</p>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {exp.achievements.slice(0, 2).map((a, i) => (
                            <li
                              key={i}
                              className="text-[17px] sm:text-[18px] text-silver/80 leading-[1.75] pl-4 relative"
                            >
                              <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full bg-accent/50" />
                              {a}
                            </li>
                          ))}
                        </ul>

                        {exp.achievements.length > 2 && (
                          <>
                            <button
                              onClick={() => toggleExpand(exp.id)}
                              className="group inline-flex items-center gap-1.5 mt-3 text-sm text-accent-bright/80 hover:text-accent-bright transition-colors"
                            >
                              {expandedId === exp.id
                                ? "Hide Responsibilities"
                                : `View Responsibilities (${exp.achievements.length - 2})`}
                              <ChevronDown
                                size={13}
                                className={`transition-transform duration-200 ${
                                  expandedId === exp.id ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <motion.div
                              initial={false}
                              animate={{
                                height:
                                  expandedId === exp.id ? "auto" : 0,
                                opacity:
                                  expandedId === exp.id ? 1 : 0,
                              }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-3 mt-4 pt-4 border-t border-white/5">
                                {exp.achievements.slice(2).map((a, i) => (
                                  <li
                                    key={i}
                                    className="text-[17px] sm:text-[18px] text-silver/80 leading-[1.75] pl-4 relative"
                                  >
                                    <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full bg-accent/60" />
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <SectionTitle>Education</SectionTitle>
                {education && (
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5 sm:p-7">
                    <h3 className="text-lg font-medium text-white/90">
                      {education.title}
                    </h3>
                    <p className="text-sm text-silver/70 mt-1.5">
                      {education.company} &middot; {education.period}
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        {/* Sticky Footer (mobile only) */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/5 bg-black/90 sm:hidden">
          <a
            href={siteConfig.resumeUrl}
            download
            className="btn btn-primary px-4 py-2"
          >
            <Download size={14} />
            Download Resume
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-graphite hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-semibold text-graphite uppercase tracking-[0.12em] mb-6">
      {children}
    </h2>
  );
}
