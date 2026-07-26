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
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    const a = document.createElement("a");
    a.href = "/images/resume.pdf";
    a.download = "Jawahar_A_Resume.pdf";
    a.click();
    await new Promise((r) => setTimeout(r, 1500));
    setState("idle");
  };

  return (
    <button
      onClick={handleDownload}
      disabled={state !== "idle"}
      className="glass rounded-2xl px-8 py-4 text-white-soft hover:glass-hover transition-all duration-300 flex items-center gap-3 mx-auto disabled:opacity-80"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <Download size={20} />
            Download Resume
          </motion.span>
        )}
        {state === "preparing" && (
          <motion.span
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <Loader2 size={20} className="animate-spin" />
            Preparing Resume
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <Check size={20} className="text-accent-cyan" />
            Downloading...
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ResumeSection() {
  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-lavender/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 07
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">Interactive</span>{" "}
            <span className="text-gradient-accent">Resume</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-12">
            A complete overview of my professional journey, ready to download.
          </p>
        </FadeReveal>

        <GlassCard className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
              <FileText size={24} className="text-accent-ice" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white-soft">Jawahar A</h3>
              <p className="text-sm text-white-muted">Customer Experience Specialist</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-accent-ice mb-3">Summary</h4>
              <p className="text-sm text-white-muted leading-relaxed">
                Customer Experience Specialist with 5+ years of Experience in Customer Onboarding, Customer Success,
                Client Relationship Management, and Customer Lifecycle Management across EdTech, Real Estate, and
                Financial Services. Proven expertise in onboarding 500+ learners, enhancing Customer satisfaction
                through proactive engagement, resolving Customer issues, and delivering seamless Customer experiences.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-accent-ice mb-3">Experience</h4>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-semibold text-white-soft">{exp.role}</p>
                      <p className="text-xs text-accent-cyan">{exp.company}</p>
                    </div>
                    <p className="text-xs text-white-subtle">{exp.duration}</p>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.slice(0, 3).map((ach, j) => (
                      <li key={j} className="text-xs text-white-muted flex gap-2">
                        <span className="text-accent-ice mt-1">•</span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-accent-ice mb-3">Education</h4>
              <p className="text-sm text-white-soft">{education.degree}</p>
              <p className="text-xs text-white-muted">{education.institution} · {education.year}</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-accent-ice mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.customerSuccess.slice(0, 3).map((s, i) => (
                  <span key={i} className="glass rounded-full px-3 py-1 text-xs text-white-muted">{s}</span>
                ))}
                <span className="text-xs text-white-subtle self-center">+ more</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <FadeReveal delay={0.4}>
          <DownloadButton />
        </FadeReveal>
      </div>
    </section>
  );
}
