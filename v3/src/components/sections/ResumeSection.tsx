"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Loader2, FileText } from "lucide-react";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { GlassCard } from "@/components/effects/GlassCard";
import { experience, education, skills, personalInfo } from "@/lib/data";

function DownloadButton() {
  const [state, setState] = useState<"idle" | "preparing" | "success">("idle");

  const handleDownload = async () => {
    setState("preparing");
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
    const a = document.createElement("a");
    a.href = "/images/resume.pdf";
    a.download = "Jawahar_A_Resume.pdf";
    a.click();
    await new Promise((r) => setTimeout(r, 2000));
    setState("idle");
  };

  return (
    <button
      onClick={handleDownload}
      disabled={state !== "idle"}
      className="btn-primary rounded-2xl px-10 py-4 text-sm flex items-center gap-3 mx-auto disabled:cursor-not-allowed min-w-[200px] justify-center"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2.5"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </motion.span>
        )}
        {state === "preparing" && (
          <motion.span
            key="preparing"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2.5"
          >
            <Loader2 size={16} className="animate-spin" />
            <span>Preparing Resume</span>
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Check size={16} className="text-accent-pearl" />
            </motion.span>
            <span>Downloading...</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ResumeSection() {
  return (
    <section id="resume" className="aurora-bg relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-soft-lavender/15 rounded-full blur-[140px]" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-accent-soft-cyan/15 rounded-full blur-[100px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 07</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">Interactive</span>{" "}
            <span className="text-gradient-accent">Resume</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-10">
            A complete overview of my professional journey, ready to download.
          </p>
        </FadeReveal>

        <GlassCard padding="lg" className="mb-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
            <div className="w-14 h-14 rounded-full glass flex items-center justify-center shrink-0">
              <FileText size={24} className="text-accent-pearl/80" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white-soft tracking-tight">{personalInfo.name}</h3>
              <p className="text-sm text-white-muted/70 mt-0.5">{personalInfo.role}</p>
            </div>
          </div>

          <div className="space-y-7">
            <div>
              <h4 className="text-[0.625rem] uppercase tracking-[0.25em] text-white-subtle/70 mb-3 pb-2 border-b border-glass-border">
                Summary
              </h4>
              <p className="text-sm text-white-muted/80 leading-[1.8] max-w-3xl">
                Customer Experience Specialist with 5+ years of Experience in Customer Onboarding, Customer Success,
                Client Relationship Management, and Customer Lifecycle Management across EdTech, Real Estate, and
                Financial Services. Proven expertise in onboarding 500+ learners, enhancing Customer satisfaction
                through proactive engagement, resolving Customer issues, and delivering seamless Customer experiences.
              </p>
            </div>

            <div>
              <h4 className="text-[0.625rem] uppercase tracking-[0.25em] text-white-subtle/70 mb-3 pb-2 border-b border-glass-border">
                Experience
              </h4>
              {experience.map((exp, i) => (
                <div key={i} className="mb-5 last:mb-0 pb-5 last:pb-0 border-b border-glass-border last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                    <div>
                      <p className="text-sm font-medium text-white-soft">{exp.role}</p>
                      <p className="text-xs text-white-muted/70 mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[0.6875rem] text-white-subtle/60 whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="text-xs text-white-muted/70 flex gap-2.5 leading-relaxed">
                        <span className="text-white-subtle/50 mt-1.5 shrink-0">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h4 className="text-[0.625rem] uppercase tracking-[0.25em] text-white-subtle/70 mb-3 pb-2 border-b border-glass-border">
                  Education
                </h4>
                <p className="text-sm text-white-soft">{education.degree}</p>
                <p className="text-xs text-white-muted/70 mt-1">{education.institution} &middot; {education.year}</p>
              </div>

              <div>
                <h4 className="text-[0.625rem] uppercase tracking-[0.25em] text-white-subtle/70 mb-3 pb-2 border-b border-glass-border">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.customerSuccess.slice(0, 4).map((s, i) => (
                    <span key={i} className="glass rounded-full px-2.5 py-1 text-[0.6875rem] text-white-muted/70">{s}</span>
                  ))}
                  <span className="text-xs text-white-subtle/50 self-center ml-1">+{skills.customerSuccess.length + skills.operations.length + skills.tools.length - 4} more</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <FadeReveal delay={0.35}>
          <DownloadButton />
        </FadeReveal>
      </div>
    </section>
  );
}
