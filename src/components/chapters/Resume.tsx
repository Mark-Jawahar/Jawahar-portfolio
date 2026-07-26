"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Download,
  Check,
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  ChevronDown,
  X,
  Mail,
  Users,
  BarChart3,
  Wrench,
  Globe,
  Brain,
  GraduationCap,
} from "lucide-react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);
import { profile, experiences, skills, education, summaryHighlights } from "@/lib/resume-data";

const skillIcons: Record<string, React.ReactNode> = {
  Users: <Users size={14} />,
  BarChart3: <BarChart3 size={14} />,
  Wrench: <Wrench size={14} />,
  Globe: <Globe size={14} />,
  Brain: <Brain size={14} />,
  GraduationCap: <GraduationCap size={14} />,
};

const executiveBadges = [
  "5+ Years Experience",
  "500+ Learners Onboarded",
  "Customer Success",
  "Customer Experience",
  "Leadership",
  "CRM",
  "Cross-Functional Collaboration",
  "Process Improvement",
];

function WordByWordTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className="text-[clamp(1.6rem,3vw,2.6rem)] font-semibold tracking-tight leading-[1.1]">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.3em]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
            transitionDelay: `${0.08 * i}s`,
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}

function PremiumBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.6rem] font-medium bg-white/[0.03] border border-white/[0.06] text-muted hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-ice transition-all duration-300 cursor-default select-none">
      {label}
    </span>
  );
}

function ExperienceCard({
  exp,
  index,
  isLatest,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLatest: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="group relative pl-7"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${0.1 * index}s`,
      }}
    >
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-cyan/20 to-transparent" />
      <div className="absolute left-[-3px] top-[5px] w-[7px] h-[7px] rounded-full bg-cyan ring-[3px] ring-cyan/10 group-hover:ring-cyan/20 group-hover:scale-125 transition-all duration-500" />
      {isLatest && (
        <div className="absolute left-[-3px] top-[5px] w-[7px] h-[7px] rounded-full bg-cyan animate-ping opacity-30" />
      )}

      <div className="glass-card p-4 md:p-5 group-hover:bg-white/[0.05] group-hover:border-white/[0.1] group-hover:-translate-y-0.5 transition-all duration-400">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-pearl">{exp.company}</span>
            {isLatest && (
              <span className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                Current
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[0.6rem] text-muted">
            <Calendar size={9} />
            <span>{exp.period}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <Briefcase size={10} className="text-cyan/60" />
          <span className="text-[0.7rem] font-medium text-ice/80">{exp.role}</span>
          <MapPin size={10} className="text-muted ml-1" />
          <span className="text-[0.6rem] text-muted">{exp.location}</span>
        </div>

        <p className="text-[0.7rem] text-muted leading-relaxed mb-2.5">{exp.description}</p>

        <div className="grid gap-1">
          {exp.achievements.map((ach, j) => (
            <div key={j} className="flex items-start gap-2">
              <span className="mt-[4px] w-[3px] h-[3px] rounded-full bg-cyan/40 flex-shrink-0" />
              <span className="text-[0.65rem] text-muted leading-relaxed">{ach}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillCategory({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const [open, setOpen] = useState(index < 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${0.05 * index}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass-card p-3 flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors text-cyan/60">
            {skillIcons[skill.icon] || null}
          </div>
          <span className="text-[0.7rem] font-medium text-ice/80">{skill.category}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <ChevronDown size={12} className="text-muted/60" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 px-3 pb-3 pt-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="tag-pill text-[0.6rem] hover:bg-white/[0.06] hover:text-ice transition-all duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DownloadButton() {
  const [phase, setPhase] = useState<"idle" | "preparing" | "downloading" | "done">("idle");

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("preparing");
    setTimeout(() => {
      setPhase("downloading");
      const link = document.createElement("a");
      link.href = profile.resumeUrl;
      link.download = "Jawahar_A_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setPhase("done");
        setTimeout(() => setPhase("idle"), 3000);
      }, 400);
    }, 1200);
  }, [phase]);

  return (
    <button
      onClick={handleClick}
      disabled={phase !== "idle"}
      className="relative w-full overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-3.5 transition-all duration-500 group cursor-pointer disabled:cursor-not-allowed"
    >
      <motion.div
        className="absolute inset-0 bg-white/[0.02]"
        initial={false}
        animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      />

      <div className="relative flex items-center justify-center gap-2.5">
        {phase === "idle" && (
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Download size={14} className="text-cyan/60 group-hover:text-cyan/80 transition-colors" />
            <span className="text-[0.75rem] font-medium text-ice/80 group-hover:text-pearl transition-colors">
              Download Resume
            </span>
          </motion.div>
        )}

        {phase === "preparing" && (
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-3.5 h-3.5 rounded-full border-2 border-cyan/30 border-t-cyan/80"
            />
            <span className="text-[0.75rem] font-medium text-muted">Preparing Resume</span>
          </motion.div>
        )}

        {phase === "downloading" && (
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-1 bg-cyan/30 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-cyan rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="text-[0.7rem] text-muted">Downloading</span>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], type: "spring" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], type: "spring" }}
              className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center"
            >
              <Check size={10} className="text-emerald-400" />
            </motion.div>
            <span className="text-[0.75rem] font-medium text-emerald-400">Downloaded</span>
          </motion.div>
        )}
      </div>
    </button>
  );
}

function ViewResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-3xl mx-4 my-8 md:my-12"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel-strong p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-pearl">Complete Professional Profile</h3>
                  <p className="text-[0.65rem] text-muted mt-0.5">{profile.name} &middot; {profile.resumeLastUpdated}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted hover:text-pearl"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-5">
                {experiences.map((exp, i) => (
                  <div key={exp.company} className="glass-card p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <span className="text-xs font-semibold text-pearl">{exp.company}</span>
                      <span className="text-[0.6rem] text-muted">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Briefcase size={10} className="text-cyan/60" />
                      <span className="text-[0.7rem] font-medium text-ice/80">{exp.role}</span>
                      <MapPin size={10} className="text-muted ml-1" />
                      <span className="text-[0.6rem] text-muted">{exp.location}</span>
                    </div>
                    <p className="text-[0.7rem] text-muted leading-relaxed mb-2.5">{exp.description}</p>
                    <div className="grid gap-1.5">
                      {exp.responsibilities.map((r, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="mt-[4px] w-[3px] h-[3px] rounded-full bg-cyan/30 flex-shrink-0" />
                          <span className="text-[0.65rem] text-muted leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                    {exp.achievements.length > 0 && (
                      <>
                        <div className="mt-3 mb-1.5 text-[0.55rem] font-semibold uppercase tracking-wider text-cyan/50">
                          Key Achievements
                        </div>
                        <div className="grid gap-1">
                          {exp.achievements.map((ach, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="mt-[4px] w-[3px] h-[3px] rounded-full bg-emerald-400/40 flex-shrink-0" />
                              <span className="text-[0.65rem] text-muted leading-relaxed">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <button onClick={onClose} className="btn-secondary text-xs">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResumeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        ref={sectionRef}
        id="resume"
        className="relative z-10 py-[clamp(3.5rem,6vw,6rem)] px-6 overflow-hidden transition-colors duration-700"
        style={{
          backgroundColor: inView ? "rgba(0,0,0,0.35)" : "transparent",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: inView
              ? "radial-gradient(ellipse at 50% 0%, rgba(168,216,234,0.04) 0%, transparent 60%)"
              : "none",
            transition: "opacity 0.8s ease",
          }}
        />

        <div className="max-w-[1100px] mx-auto">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.1s",
            }}
          >
            <WordByWordTitle text="Interactive Resume" />
            <p className="mt-3 text-[clamp(0.8rem,1.1vw,0.95rem)] text-muted leading-relaxed max-w-[55ch]">
              Explore my professional journey through an interactive executive profile designed for recruiters and hiring managers.
            </p>
          </div>

          <div
            className="mt-8 md:mt-10 glass-panel-strong p-5 md:p-7"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.25s",
            }}
          >
            <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-white/[0.06]">
                <Image
                  src={profile.portraitUrl}
                  alt={profile.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1.5">
                  <h3 className="text-base md:text-lg font-semibold text-pearl">{profile.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[0.55rem] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Opportunities
                  </span>
                </div>
                <p className="text-[0.75rem] md:text-[0.8rem] font-medium text-ice/80 mb-1">{profile.role}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6rem] text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={9} />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={9} />
                    {profile.experience}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-2.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[0.6rem] font-medium text-cyan/70 hover:text-cyan transition-colors"
                  >
                    <LinkedinIcon />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1.5 text-[0.6rem] font-medium text-cyan/70 hover:text-cyan transition-colors"
                  >
                    <Mail size={10} />
                    Email
                  </a>
                  <span className="text-[0.55rem] text-muted/50">
                    Updated {profile.resumeLastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.35s",
            }}
          >
            <div className="glass-panel-strong p-5 md:p-6">
              <h4 className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted/50 mb-3">
                Executive Summary
              </h4>
              <p className="text-[0.75rem] md:text-[0.8rem] text-muted leading-relaxed mb-3.5">
                {profile.about}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {executiveBadges.map((badge) => (
                  <PremiumBadge key={badge} label={badge} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.5s ease",
                transitionDelay: "0.4s",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted/50">
                  Professional Experience
                </h4>
                <span className="text-[0.55rem] text-muted/40">{experiences.length} roles</span>
              </div>

              <div className="space-y-4">
                {experiences.slice(0, modalOpen ? undefined : 1).map((exp, i) => (
                  <ExperienceCard key={exp.company} exp={exp} index={i} isLatest={i === 0} />
                ))}
              </div>

              {!modalOpen && experiences.length > 1 && (
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[0.7rem] font-medium text-muted hover:text-ice hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                  >
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    View Complete Resume
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "0.5s",
              }}
            >
              <h4 className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted/50 mb-3">
                Skills &amp; Expertise
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {skills.map((skill, i) => (
                  <SkillCategory key={skill.category} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.6s",
            }}
          >
            <div className="glass-panel-strong p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={14} className="text-cyan/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted/60 mb-1">Education</h5>
                  <p className="text-[0.8rem] font-medium text-pearl">{education.degree}</p>
                  <p className="text-[0.65rem] text-muted mt-0.5">
                    {education.college} &middot; {education.year} &middot; {education.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.7s",
            }}
          >
            <div className="glass-panel-strong p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <DownloadButton />
                </div>
                <div className="flex-1">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-5 py-3.5 flex items-center justify-center gap-2.5 text-[0.75rem] font-medium text-ice/80 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                  >
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    View Interactive Resume
                  </button>
                </div>
              </div>
              <p className="text-[0.55rem] text-muted/40 text-center mt-2">
                PDF download &middot; Updated {profile.resumeLastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ViewResumeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
