"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ChevronDown, Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { getLenis } from "@/lib/scroll";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ResumeOverlayProps {
  onClose: () => void;
}

export function ResumeOverlay({ onClose }: ResumeOverlayProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = document.getElementById("portfolio-content");
    if (el) el.classList.add("resume-viewer-active");

    const lenis = getLenis();
    lenis?.stop();

    const prevOverflow = document.body.style.overflow;
    const prevScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${prevScrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const prevFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => {
      if (el) el.classList.remove("resume-viewer-active");
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, prevScrollY);
      document.removeEventListener("keydown", handleKeyDown);
      prevFocus?.focus();
    };
  }, [onClose]);

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
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.4, ease, delay: 0.05 }}
        className="relative flex flex-col w-full h-full
                   sm:h-auto sm:max-h-[90vh] sm:rounded-2xl
                   overflow-hidden sm:resume-glass bg-black"
        style={{ maxWidth: "min(85vw, 960px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-black/90 sm:bg-black/60 sm:backdrop-blur-xl">
          <span className="text-sm font-medium text-white/60">Resume</span>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
              aria-label="Close resume viewer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-10 lg:px-14 py-6 sm:py-10 lg:py-12">
            <div className="mx-auto" style={{ maxWidth: "640px" }}>
              {/* Resume Header */}
              <div className="mb-10 pb-8 border-b border-white/5">
                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  {siteConfig.name}
                </h1>
                <p className="text-sm text-white/50 mt-1.5">
                  {siteConfig.role}
                </p>
                <p className="text-xs text-white/35 mt-3 leading-relaxed">
                  {siteConfig.location} &middot; {siteConfig.email}
                </p>
              </div>

              {/* Professional Summary */}
              <section className="mb-10">
                <SectionTitle>Professional Summary</SectionTitle>
                <p className="text-sm text-white/65 leading-[1.95]">
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
              <section className="mb-10">
                <SectionTitle>Skills</SectionTitle>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category}>
                      <p className="text-xs text-white/30 mb-2.5">
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter((s) => s.category === category)
                          .map((skill) => (
                            <span
                              key={skill.id}
                              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60"
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
              <section className="mb-10">
                <SectionTitle>Professional Experience</SectionTitle>
                <div className="space-y-6">
                  {workExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden"
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                          <div>
                            <h3 className="text-sm font-medium text-white/90">
                              {exp.company}
                            </h3>
                            <p className="text-xs text-white/50 mt-0.5">
                              {exp.title}
                            </p>
                          </div>
                          <div className="text-xs text-white/30 font-mono shrink-0 text-left sm:text-right">
                            <p>{exp.period}</p>
                            <p className="text-white/20">{exp.location}</p>
                          </div>
                        </div>

                        <ul className="space-y-2.5">
                          {exp.achievements.slice(0, 2).map((a, i) => (
                            <li
                              key={i}
                              className="text-xs text-white/55 leading-[1.85] pl-4 relative"
                            >
                              <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full bg-blue-400/40" />
                              {a}
                            </li>
                          ))}
                        </ul>

                        {exp.achievements.length > 2 && (
                          <>
                            <button
                              onClick={() => toggleExpand(exp.id)}
                              className="group inline-flex items-center gap-1.5 mt-2.5 text-xs text-blue-300/50 hover:text-blue-300/85 transition-colors"
                            >
                              {expandedId === exp.id
                                ? "Hide Responsibilities"
                                : `View Responsibilities (${exp.achievements.length - 2})`}
                              <ChevronDown
                                size={12}
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
                              <ul className="space-y-2.5 mt-3 pt-3 border-t border-white/5">
                                {exp.achievements.slice(2).map((a, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-white/55 leading-[1.85] pl-4 relative"
                                  >
                                    <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full bg-white/15" />
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
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5 sm:p-6">
                    <h3 className="text-sm font-medium text-white/90">
                      {education.title}
                    </h3>
                    <p className="text-xs text-white/45 mt-1">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300/80 text-sm font-medium hover:bg-blue-500/20 transition-all"
          >
            <Download size={14} />
            Download Resume
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors"
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
    <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-5">
      {children}
    </h2>
  );
}
