"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import ScrollParallax from "@/components/effects/ScrollParallax";
import {
  Download, Check, MapPin, Briefcase, GraduationCap,
  Users, BarChart3, Wrench, Globe, Brain,
  Award, TrendingUp, Clock, ChevronDown,
  Target, Sparkles, Eye,
} from "lucide-react";
import ResumeOverlay from "@/components/effects/ResumeOverlay";
import { profile, experiences, skills, education, highlights, summaryHighlights } from "@/lib/resume-data";

const skillIconMap: Record<string, React.ReactNode> = {
  Users: <Users size={12} />,
  BarChart3: <BarChart3 size={12} />,
  Wrench: <Wrench size={12} />,
  Globe: <Globe size={12} />,
  Brain: <Brain size={12} />,
  GraduationCap: <GraduationCap size={12} />,
};

function useProgressiveInView(delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return {
    ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
      transitionDelay: `${delay}s`,
    },
  };
}

function Section({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const { ref, style } = useProgressiveInView(delay);
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <h3 className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-3"
      style={{ color: "rgba(142, 142, 147, 0.6)" }}
    >
      <span style={{ color: "rgba(142, 142, 147, 0.4)" }}>{icon}</span>
      {label}
    </h3>
  );
}

function DownloadButton({ compact = false }: { compact?: boolean }) {
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
      className="relative overflow-hidden rounded-xl w-full text-sm font-medium cursor-pointer disabled:cursor-not-allowed group"
      style={{
        padding: compact ? "0.6rem 1rem" : "0.7rem 1.4rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: phase === "done" ? "rgba(142,142,147,0.6)" : "rgba(232,232,237,0.7)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        if (phase === "idle") {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.color = "#e8e8ed";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
        }
      }}
      onMouseLeave={(e) => {
        if (phase === "idle") {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.color = "rgba(232,232,237,0.7)";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 4px rgba(0,0,0,0.04)";
        }
      }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {phase === "idle" && (
          <>
            <Download size={12} />
            <span>Download Resume</span>
          </>
        )}
        {phase === "preparing" && (
          <>
            <span className="w-3 h-3 rounded-full" style={{ border: "2px solid rgba(142,142,147,0.2)", borderTopColor: "rgba(142,142,147,0.5)" }}>
              <span className="animate-spin block w-full h-full rounded-full border-2 border-transparent border-t-current" />
            </span>
            <span style={{ color: "#8e8e93" }}>Preparing</span>
          </>
        )}
        {phase === "downloading" && (
          <>
            <span className="w-16 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
              <span className="block h-full rounded-full" style={{ background: "rgba(142,142,147,0.3)", width: "100%", animation: "download-progress 0.5s ease-out forwards" }} />
            </span>
            <span style={{ color: "#8e8e93" }}>Downloading</span>
          </>
        )}
        {phase === "done" && (
          <>
            <Check size={12} />
            <span>Downloaded</span>
          </>
        )}
      </span>
    </button>
  );
}

function SkillCategory({ category, icon, items }: { category: string; icon: React.ReactNode; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden" style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
        style={{ transition: "background 0.2s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: "rgba(142,142,147,0.4)" }}>{icon}</span>
          <span className="text-xs font-medium" style={{ color: "rgba(232,232,237,0.7)" }}>{category}</span>
          <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full" style={{
            background: "rgba(255,255,255,0.04)",
            color: "rgba(142,142,147,0.5)",
          }}>
            {items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: "rgba(142,142,147,0.3)" }}
        >
          <ChevronDown size={12} />
        </motion.div>
      </button>
      <div style={{
        maxHeight: open ? "300px" : "0",
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
      }}>
        <div className="px-4 pb-3 pt-1 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span key={item} className="text-xs px-2.5 py-1 rounded-md" style={{
              color: "rgba(142,142,147,0.6)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="stat-card p-3 md:p-4 text-center min-w-0">
      {icon && (
        <div className="flex justify-center mb-1.5" style={{ color: "rgba(142,142,147,0.3)" }}>
          {icon}
        </div>
      )}
      <div className="text-lg md:text-xl font-semibold tracking-tight" style={{ color: "rgba(245,245,247,0.9)" }}>
        {value}
      </div>
      <div className="text-[0.6rem] md:text-xs mt-0.5 leading-tight" style={{ color: "rgba(142,142,147,0.6)" }}>
        {label}
      </div>
    </div>
  );
}

const statIcons = [
  <Users key="u" size={14} />,
  <Clock key="c" size={14} />,
  <TrendingUp key="t" size={14} />,
  <Award key="a" size={14} />,
];

export default function ResumeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [overlayOpen, setOverlayOpen] = useState(false);

  const shortSummary = "Customer experience leader with 5+ years of expertise in customer onboarding, lifecycle management, and process excellence. Currently leading onboarding initiatives for 500+ learners at Hello Mentor, standardizing processes and driving measurable improvements in customer satisfaction and operational efficiency across EdTech, Real Estate, and Financial Services.";

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative z-10 py-[clamp(3rem,5vw,5rem)] px-4 md:px-6 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: inView ? "rgba(0,0,0,0.3)" : "transparent" }}
    >
      <ScrollParallax speed={0.12} offset={80} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: inView ? "radial-gradient(ellipse 60% 35% at 50% 15%, rgba(255,255,255,0.03) 0%, transparent 60%)" : "none",
          transition: "opacity 1s ease",
        }} />
      </ScrollParallax>

      <ResumeOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />

      <div className="max-w-[800px] mx-auto">
        <Section delay={0}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="chapter-title">
              Professional Profile
            </h2>
            <p className="chapter-subtitle mx-auto text-center">
              An executive overview of experience, expertise, and professional impact.
            </p>
          </div>
        </Section>

        <div className="space-y-5">

          <Section delay={0.05}>
            <div className="glass-panel p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <Image src={profile.portraitUrl} alt={profile.name} width={64} height={64} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <h3 className="text-base md:text-lg font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>{profile.name}</h3>
                  <p className="text-xs md:text-sm mt-0.5" style={{ color: "rgba(232,232,237,0.5)" }}>{profile.role}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(142, 142, 147, 0.06)",
                        color: "rgba(142, 142, 147, 0.5)",
                        border: "1px solid rgba(142, 142, 147, 0.08)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(142, 142, 147, 0.3)" }} />
                      Open to Opportunities
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-1.5 text-xs flex-shrink-0" style={{ color: "rgba(142,142,147,0.6)" }}>
                  <span className="flex items-center gap-1"><MapPin size={10} /> {profile.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={10} /> {profile.experience}</span>
                  <div className="w-full mt-1 min-w-[140px]">
                    <DownloadButton compact />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section delay={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
              {highlights.slice(0, 4).map((h, i) => (
                <StatRow key={h.label} value={h.value} label={h.label} icon={statIcons[i]} />
              ))}
            </div>
          </Section>

          <Section delay={0.11}>
            <div className="glass-panel p-5 md:p-6">
              <SectionHeader icon={<Award size={11} />} label="Executive Summary" />
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(142,142,147,0.8)" }}>
                {shortSummary}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {summaryHighlights.map((s) => (
                  <div key={s.label} className="rounded-lg p-2.5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(232,232,237,0.7)" }}>{s.label}</div>
                    <div className="text-[0.6rem]" style={{ color: "rgba(142,142,147,0.5)" }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={0.14}>
            <div className="glass-panel p-5 md:p-6">
              <SectionHeader icon={<BarChart3 size={11} />} label="Core Skills" />
              <div className="space-y-1.5">
                {skills.filter(s => s.category !== "Education").map((skill) => (
                  <SkillCategory
                    key={skill.category}
                    category={skill.category}
                    icon={skillIconMap[skill.icon]}
                    items={skill.items}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section delay={0.17}>
            <div className="glass-panel p-5 md:p-6">
              <SectionHeader icon={<Briefcase size={11} />} label="Career Timeline" />
              <div className="space-y-3">
                {experiences.map((exp, i) => (
                  <div key={exp.company} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i === 0 ? "rgba(142,142,147,0.5)" : "rgba(142,142,147,0.2)" }} />
                      {i < experiences.length - 1 && (
                        <div className="w-px flex-1 min-h-[8px]" style={{ background: "rgba(142,142,147,0.1)" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium" style={{ color: i === 0 ? "rgba(245,245,247,0.85)" : "rgba(232,232,237,0.6)" }}>{exp.company}</span>
                        {i === 0 && (
                          <span className="text-[0.45rem] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                            style={{
                              background: "rgba(142, 142, 147, 0.08)",
                              color: "rgba(142, 142, 147, 0.5)",
                              border: "1px solid rgba(142, 142, 147, 0.08)",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[0.65rem] mt-0.5" style={{ color: "rgba(232,232,237,0.35)" }}>
                        {exp.role} &middot; {exp.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={0.2}>
            <div className="glass-panel p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <GraduationCap size={14} style={{ color: "rgba(142,142,147,0.4)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "rgba(232,232,237,0.8)" }}>{education.degree}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(142,142,147,0.6)" }}>{education.college} &middot; {education.year} &middot; {education.location}</p>
                </div>
              </div>
            </div>
          </Section>

          <Section delay={0.23}>
            <button
              onClick={() => setOverlayOpen(true)}
              className="w-full group cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <Eye size={13} style={{ color: "rgba(142,142,147,0.4)" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(232,232,237,0.5)" }}>
                  View Resume
                </span>
              </div>
            </button>
          </Section>

        </div>

        <Section delay={0.35}>
          <div className="text-center pt-6">
            <p className="text-xs" style={{ color: "rgba(142,142,147,0.3)" }}>
              {profile.name} &middot; {profile.role} &middot; Updated {profile.resumeLastUpdated}
            </p>
          </div>
        </Section>
      </div>
    </section>
  );
}
