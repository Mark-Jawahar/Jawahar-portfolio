"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Download,
  Check,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  X,
  GraduationCap,
  Users,
  BarChart3,
  Wrench,
  Globe,
  Brain,
} from "lucide-react";
import { profile, experiences, skills, education } from "@/lib/resume-data";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4l-10 7L2 4" />
  </svg>
);

const skillIconMap: Record<string, React.ReactNode> = {
  Users: <Users size={12} />,
  BarChart3: <BarChart3 size={12} />,
  Wrench: <Wrench size={12} />,
  Globe: <Globe size={12} />,
  Brain: <Brain size={12} />,
  GraduationCap: <GraduationCap size={12} />,
};

  const executiveBadges = [
    "5+ Years Experience",
    "500+ Learners Onboarded",
    "Customer Success",
    "Customer Experience",
    "CRM",
    "Cross-Functional Collaboration",
    "Process Improvement",
  ];

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
      }, 500);
    }, 1400);
  }, [phase]);

  return (
    <button
      onClick={handleClick}
      disabled={phase !== "idle"}
      className="relative overflow-hidden rounded-xl bg-white/5 border border-white/8 px-5 py-3 w-full text-[0.7rem] font-medium text-ice/70 hover:text-pearl hover:bg-white/8 hover:border-white/12 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed group"
    >
      <span className="relative flex items-center justify-center gap-2">
        {phase === "idle" && (
          <>
            <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </>
        )}
        {phase === "preparing" && (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan/30 border-t-cyan/80 animate-spin" />
            <span className="text-muted">Preparing Resume</span>
          </>
        )}
        {phase === "downloading" && (
          <>
            <span className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
              <span className="block h-full bg-cyan/60 rounded-full animate-[download-progress_0.5s_ease-out_forwards]" />
            </span>
            <span className="text-muted">Downloading</span>
          </>
        )}
        {phase === "done" && (
          <>
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check size={10} strokeWidth={3} className="text-emerald-400" />
            </span>
            <span className="text-emerald-400">Downloaded</span>
          </>
        )}
      </span>
    </button>
  );
}

function GlassBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.55rem] font-medium bg-white/[0.04] border border-white/6 text-muted hover:bg-white/[0.07] hover:border-white/12 hover:text-ice transition-all duration-300 cursor-default whitespace-nowrap">
      {label}
    </span>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="text-[0.55rem] text-muted bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md hover:bg-white/[0.06] hover:text-ice transition-all duration-200">
      {label}
    </span>
  );
}

function ProfileCard({ onViewComplete }: { onViewComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="glass-panel-strong p-6 md:p-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: "0.15s",
      }}
    >
      <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-white/8">
          <Image src={profile.portraitUrl} alt={profile.name} width={80} height={80} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight text-pearl">{profile.name}</h3>
            <span className="inline-flex items-center gap-1.5 text-[0.5rem] font-medium px-2 py-0.5 rounded-full bg-emerald-500/8 text-emerald-400 border border-emerald-500/15 whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Open to Opportunities
            </span>
          </div>
          <p className="text-sm font-medium text-ice/70 mb-1.5">{profile.role}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.65rem] text-muted">
            <span className="flex items-center gap-1"><MapPin size={9} /> {profile.location}</span>
            <span className="flex items-center gap-1"><Calendar size={9} /> {profile.experience}</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan/60 hover:text-cyan transition-colors">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 text-cyan/60 hover:text-cyan transition-colors">
              <MailIcon /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5">Executive Summary</h4>
        <p className="text-[0.75rem] md:text-[0.8rem] text-muted leading-relaxed max-w-[60ch] mb-3">
          Customer experience leader with 5+ years of expertise in customer onboarding, lifecycle management, process excellence, and cross-functional collaboration. Currently leading onboarding initiatives for 500+ learners and driving measurable improvements in customer satisfaction and operational efficiency.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {executiveBadges.slice(0, 5).map((b) => (
            <GlassBadge key={b} label={b} />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-5 md:mb-6">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={11} className="text-cyan/60" />
            <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-muted/50">Customer Experience</span>
          </div>
          <p className="text-[0.75rem] font-medium text-ice/80 mb-0.5">{experiences[0].company}</p>
          <p className="text-[0.65rem] text-muted">{experiences[0].role} &middot; {experiences[0].period}</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={11} className="text-cyan/60" />
            <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-muted/50">Education</span>
          </div>
          <p className="text-[0.75rem] font-medium text-ice/80 mb-0.5">{education.degree}</p>
          <p className="text-[0.65rem] text-muted">{education.college} &middot; {education.year}</p>
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5">Core Skills</h4>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 3).flatMap((s) => s.items.slice(0, 3)).map((item) => (
            <SkillChip key={item} label={item} />
          ))}
          <span className="text-[0.55rem] text-muted/40 px-2 py-0.5">+ more</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={onViewComplete}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-pearl text-background px-5 py-3 text-[0.7rem] font-medium hover:bg-white transition-all duration-300 group"
        >
          <span>View Complete Profile</span>
          <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        <div className="sm:w-48">
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}

function ModalExperienceCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel-strong p-5 md:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-pearl">{exp.company}</h3>
          {index === 0 && (
            <span className="text-[0.45rem] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/8 text-emerald-400 border border-emerald-500/15 uppercase tracking-wider">
              Current
            </span>
          )}
        </div>
        <span className="text-[0.6rem] text-muted">{exp.period}</span>
      </div>
      <p className="text-[0.65rem] font-medium text-ice/70 mb-1.5">
        {exp.role} &middot; {exp.location}
      </p>
      <p className="text-[0.65rem] text-muted leading-relaxed mb-3">{exp.description}</p>

      {exp.responsibilities.length > 0 && (
        <div className="mb-3">
          <p className="text-[0.5rem] font-semibold uppercase tracking-wider text-muted/50 mb-1.5">Responsibilities</p>
          <ul className="space-y-1">
            {exp.responsibilities.map((r, j) => (
              <li key={j} className="flex items-start gap-2 text-[0.6rem] text-muted leading-relaxed">
                <span className="mt-[4px] w-[2px] h-[2px] rounded-full bg-cyan/40 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {exp.achievements.length > 0 && (
        <div className="pl-3 border-l border-cyan/15">
          <p className="text-[0.45rem] font-semibold uppercase tracking-wider text-cyan/50 mb-1">Key Achievements</p>
          <ul className="space-y-0.5">
            {exp.achievements.map((ach, j) => (
              <li key={j} className="flex items-start gap-2 text-[0.6rem] text-muted leading-relaxed">
                <span className="mt-[4px] w-1 h-1 rounded-full bg-emerald-400/40 flex-shrink-0" />
                {ach}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl mx-4 my-6 md:my-10 max-h-[calc(100vh-3rem)] flex flex-col"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel-strong p-5 md:p-6 flex flex-col max-h-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-semibold text-pearl">Complete Professional Profile</h3>
                  <p className="text-[0.6rem] text-muted mt-0.5">{profile.name} &middot; Updated {profile.resumeLastUpdated}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted hover:text-pearl flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              <div ref={scrollRef} className="overflow-y-auto pr-1 space-y-3 scroll-smooth">
                <div className="glass-panel p-5">
                  <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5">Executive Summary</h4>
                  <p className="text-[0.7rem] text-muted leading-relaxed mb-3">{profile.about}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {executiveBadges.map((b) => (
                      <GlassBadge key={b} label={b} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5 px-1">Professional Experience</h4>
                  <div className="space-y-3">
                    {experiences.map((exp, i) => (
                      <ModalExperienceCard key={exp.company} exp={exp} index={i} />
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-5">
                  <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5">Education</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0"><GraduationCap size={12} className="text-cyan/60" /></div>
                    <div>
                      <p className="text-[0.75rem] font-medium text-ice/80">{education.degree}</p>
                      <p className="text-[0.6rem] text-muted mt-0.5">{education.college} &middot; {education.year} &middot; {education.location}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-5">
                  <h4 className="text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-muted/60 mb-2.5">Skills &amp; Expertise</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {skills.map((skill) => (
                      <div key={skill.category}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-cyan/60">{skillIconMap[skill.icon]}</span>
                          <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-ice/60">{skill.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {skill.items.map((item) => (
                            <SkillChip key={item} label={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-2 pb-1">
                  <button onClick={onClose} className="text-[0.6rem] text-muted/50 hover:text-muted transition-colors px-4 py-2">
                    Close Profile
                  </button>
                </div>
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
        className="relative z-10 py-[clamp(3rem,5vw,5rem)] px-4 md:px-6 overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: inView ? "rgba(0,0,0,0.3)" : "transparent" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: inView ? "radial-gradient(ellipse 60% 35% at 50% 15%, rgba(168,216,234,0.03) 0%, transparent 60%)" : "none",
          transition: "opacity 1s ease",
        }} />

        <div className="max-w-[800px] mx-auto">
          <div
            className="text-center mb-8 md:mb-10"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2 className="text-[clamp(1.4rem,2.3vw,2rem)] font-semibold tracking-tight text-white/90 leading-[1.15]">
              Professional Profile
            </h2>
            <p className="mt-2 text-[clamp(0.7rem,0.9vw,0.8rem)] text-white/30 max-w-[42ch] mx-auto leading-relaxed">
              An executive overview of experience, expertise, and professional impact.
            </p>
          </div>

          <ProfileCard onViewComplete={() => setModalOpen(true)} />

          <div
            className="mt-4 text-center"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.5s ease",
              transitionDelay: "0.5s",
            }}
          >
            <p className="text-[0.55rem] text-muted/30">
              {profile.name} &middot; {profile.role} &middot; Updated {profile.resumeLastUpdated}
            </p>
          </div>
        </div>
      </section>

      <ResumeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
