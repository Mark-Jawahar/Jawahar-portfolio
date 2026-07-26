"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Download,
  Check,
  Loader2,
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { ScrollReveal, FadeIn } from "@/components/effects/ScrollReveal";
import {
  profile,
  experiences,
  skills,
  education,
  summaryHighlights,
} from "@/lib/resume-data";

/* ─── Download button states ─── */
type DState = "idle" | "compressing" | "preparing" | "downloading" | "success";

const iconMap: Record<string, React.ElementType> = {
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  BarChart3: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
  Wrench: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  Brain: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a6 6 0 0 0-6 6c0 2.4 1.5 4.5 3.7 5.4l.3.1v3.5a1 1 0 0 0 2 0v-3.5l.3-.1A6 6 0 0 0 18 8a6 6 0 0 0-6-6z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M6 6H4"/><path d="M18 6h2"/><path d="M4 12h2"/><path d="M18 12h2"/></svg>
  ),
  GraduationCap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
};

/* ─── Mouse spotlight on the glass container ─── */
function ContainerSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="pointer-events-none absolute inset-0 z-0 rounded-[20px]" style={{ background: "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(168,216,234,0.04) 0%, transparent 70%)" }} />;
}

/* ─── Single experience timeline card ─── */
function ExpCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* timeline stalk */}
      {index < 2 && <div className="absolute left-[11px] top-10 bottom-0 w-px bg-gradient-to-b from-[rgba(168,216,234,0.2)] to-transparent" />}

      <div className="glass-card p-5 md:p-6 ml-8 relative overflow-hidden transition-all duration-500 group-hover:border-[rgba(168,216,234,0.15)] group-hover:shadow-[0_0_30px_rgba(168,216,234,0.04)]">
        {/* timeline dot */}
        <div className="absolute -left-8 top-6 w-[10px] h-[10px] rounded-full bg-[#a8d8ea] ring-[3px] ring-[rgba(168,216,234,0.12)]" />

        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-sm font-semibold text-[#f5f5f7]">{exp.company}</h3>
            <p className="text-xs text-[#a8d8ea] mt-0.5">{exp.role}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[0.65rem] text-[#8e8e93] whitespace-nowrap">
            <Calendar className="w-3 h-3" />
            {exp.period}
          </div>
        </div>

        <p className="text-xs text-[#8e8e93] leading-relaxed mb-3">{exp.description}</p>

        {/* achievements as tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {exp.achievements.map((a) => (
            <span key={a} className="text-[0.6rem] font-medium text-[#a8d8ea] bg-[rgba(168,216,234,0.06)] px-2 py-0.5 rounded-full border border-[rgba(168,216,234,0.08)]">
              {a}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-[0.65rem] font-medium text-[#8e8e93] hover:text-[#f5f5f7] transition-colors"
        >
          <span>{open ? "Hide details" : "View details"}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3 h-3" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2 border-t border-[rgba(255,255,255,0.04)] pt-3">
                {exp.responsibilities.map((r) => (
                  <li key={r.substring(0, 24)} className="text-[0.7rem] text-[#8e8e93] leading-relaxed pl-3 border-l border-[rgba(255,255,255,0.06)]">
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Skill category with expand ─── */
function SkillCategory({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [open, setOpen] = useState(index === 0 || index === 1);
  const Icon = iconMap[skill.icon] || (() => null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 md:p-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0 text-[#a8d8ea]">
            <Icon />
          </div>
          <span className="text-xs font-medium text-[#f5f5f7]">{skill.category}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-[#8e8e93]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 md:px-4 pb-3 md:pb-4 flex flex-wrap gap-1.5">
              {skill.items.map((item) => (
                <span key={item} className="text-[0.6rem] text-[#8e8e93] bg-[rgba(255,255,255,0.03)] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(168,216,234,0.06)] hover:text-[#a8d8ea] hover:border-[rgba(168,216,234,0.12)] transition-all duration-300">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ─── */
export function ResumeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const bgDark = useTransform(scrollYProgress, [0, 0.5], [0, 0.5]);
  const glassY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const glassO = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  const [dState, setDState] = useState<DState>("idle");
  const [progress, setProgress] = useState(0);
  const dRippleId = useRef(0);
  const [dRipples, setDRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = dRippleId.current++;
    setDRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setDRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const handleDownload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      addRipple(e);
      setDState("compressing");
      setProgress(0);
      for (let i = 0; i <= 100; i += 5) {
        await new Promise((r) => setTimeout(r, 20));
        setProgress(i);
      }
      setDState("preparing");
      await new Promise((r) => setTimeout(r, 600));
      setDState("downloading");
      await new Promise((r) => setTimeout(r, 400));
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Jawahar_A_Resume.pdf";
      link.click();
      setDState("success");
      await new Promise((r) => setTimeout(r, 2000));
      setDState("idle");
      setProgress(0);
    },
    [addRipple]
  );

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="resume" ref={sectionRef} className="relative">
      {/* pinned darkening overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: useTransform(bgDark, (v) => `rgba(0,0,0,${v})`) }}
      />

      <div className="chapter-section relative z-10">
        <div className="chapter-container">
          <ScrollReveal>
            <div className="chapter-label">
              <span className="chapter-number">06</span>
              Interactive Resume
            </div>
          </ScrollReveal>

          {/* editorial heading */}
          <ScrollReveal delay={0.1}>
            <h2 className="chapter-title mt-8 max-w-[700px]">
              Professional profile
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="chapter-subtitle mt-3">
              A living document of my career — explore my experience, skills, and background in an interactive format.
            </p>
          </ScrollReveal>

          {/* ── Glass resume container ── */}
          <motion.div
            style={{ y: glassY, opacity: glassO }}
            className="relative max-w-[820px] mx-auto mt-10"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="glass-panel-strong p-6 md:p-8 lg:p-10 relative overflow-hidden rounded-[20px]">
                <ContainerSpotlight />

                {/* glass reflection sweep */}
                <div className="pointer-events-none absolute inset-0 z-[1] rounded-[20px] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.04)_35%,rgba(255,255,255,0.02)_45%,transparent_60%)] bg-[length:200%_100%] animate-[shimmer_6s_ease-in-out_infinite]" />
                </div>

                <div className="relative z-[2]">
                  {/* ── Header ── */}
                  <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6">
                    {/* portrait */}
                    <div className="relative w-[72px] h-[72px] shrink-0">
                      <div className="portrait-frame w-full h-full">
                        <div className="portrait-glow" />
                        <img
                          src="/profile-pic.png"
                          alt={profile.name}
                          className="w-full h-full object-cover"
                          style={{ filter: "brightness(1.02) contrast(0.92) saturate(1.04)" }}
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl md:text-2xl font-semibold text-[#f5f5f7] tracking-tight">
                            {profile.name}
                          </h2>
                          <p className="text-sm text-gradient-accent mt-0.5">
                            {profile.role}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[0.7rem] text-[#8e8e93]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {profile.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {profile.experience}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              Open to Opportunities
                            </span>
                          </div>
                        </div>

                        {/* Download button */}
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <button
                            onClick={handleDownload}
                            disabled={dState === "downloading" || dState === "preparing" || dState === "compressing"}
                            className="btn-primary relative overflow-hidden justify-center min-w-[48px] min-h-[48px] w-[48px] h-[48px] rounded-full p-0 flex items-center justify-center"
                          >
                            <AnimatePresence mode="wait">
                              {dState === "idle" && (
                                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                                  <Download className="w-4 h-4" />
                                </motion.span>
                              )}
                              {dState === "compressing" && (
                                <motion.svg key="compressing" className="w-5 h-5 -rotate-90" viewBox="0 0 36 36" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
                                  <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke="#050505" strokeWidth="2" strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: progress / 100 }}
                                    transition={{ duration: 0.1 }}
                                  />
                                </motion.svg>
                              )}
                              {dState === "preparing" && (
                                <motion.span key="preparing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                </motion.span>
                              )}
                              {dState === "downloading" && (
                                <motion.span key="downloading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                                </motion.span>
                              )}
                              {dState === "success" && (
                                <motion.span key="success" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-green-400">
                                  <Check className="w-4 h-4" />
                                </motion.span>
                              )}
                            </AnimatePresence>
                            {dRipples.map((r) => (
                              <span key={r.id} className="btn-ripple" style={{ left: r.x, top: r.y, width: 10, height: 10 }} />
                            ))}
                          </button>
                          <span className="text-[0.55rem] text-[#8e8e93] whitespace-nowrap">
                            Updated {profile.resumeLastUpdated}
                          </span>
                        </div>
                      </div>

                      {/* Contact row */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-[0.65rem] text-[#8e8e93]">
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                          {profile.email}
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#f5f5f7] transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          {profile.linkedinDisplay}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ── Summary ── */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                    <h3 className="text-[0.6rem] font-semibold text-[#8e8e93] uppercase tracking-widest mb-3">Summary</h3>
                    <p className="text-xs md:text-sm text-[#8e8e93] leading-[1.8]">
                      {profile.about}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {summaryHighlights.map((h) => (
                        <span key={h.label} className="text-[0.6rem] font-medium text-[#a8d8ea] bg-[rgba(168,216,234,0.06)] px-2.5 py-1 rounded-full border border-[rgba(168,216,234,0.08)] inline-flex items-center gap-1">
                          {h.label}
                          <span className="text-[#8e8e93] font-normal">{h.desc}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Experience ── */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                    <h3 className="text-[0.6rem] font-semibold text-[#8e8e93] uppercase tracking-widest mb-4">
                      Technical Experience
                    </h3>
                    <div className="space-y-5">
                      {(expanded ? experiences : experiences.slice(0, 1)).map((exp, i) => (
                        <ExpCard key={exp.company} exp={exp} index={i} />
                      ))}
                    </div>

                    {!expanded && experiences.length > 1 && (
                      <motion.button
                        onClick={() => setExpanded(true)}
                        className="mt-4 w-full py-3 text-xs font-medium text-[#a8d8ea] hover:text-[#f5f5f7] transition-colors bg-[rgba(168,216,234,0.03)] hover:bg-[rgba(168,216,234,0.06)] rounded-xl border border-[rgba(168,216,234,0.08)]"
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          View Complete Resume
                          <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      </motion.button>
                    )}
                    {expanded && (
                      <motion.button
                        onClick={() => setExpanded(false)}
                        className="mt-3 text-[0.65rem] text-[#8e8e93] hover:text-[#f5f5f7] transition-colors flex items-center gap-1 mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Show less
                        <ChevronDown className="w-3 h-3 rotate-180" />
                      </motion.button>
                    )}
                  </div>

                  {/* ── Skills ── */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                    <h3 className="text-[0.6rem] font-semibold text-[#8e8e93] uppercase tracking-widest mb-3">Skills</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {skills.slice(0, 5).map((skill, i) => (
                        <SkillCategory key={skill.category} skill={skill} index={i} />
                      ))}
                    </div>
                  </div>

                  {/* ── Education ── */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                    <h3 className="text-[0.6rem] font-semibold text-[#8e8e93] uppercase tracking-widest mb-3">Education</h3>
                    <div className="glass-card p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8d8ea" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#f5f5f7]">{education.degree}</p>
                        <p className="text-xs text-[#8e8e93]">{education.college} &middot; {education.year} &middot; {education.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* ── Bottom actions ── */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.04)] flex flex-wrap items-center justify-between gap-4">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#a8d8ea] hover:text-[#f5f5f7] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open PDF version
                    </a>
                    <span className="text-[0.55rem] text-[#8e8e93]">
                      PDF &middot; Updated {profile.resumeLastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
