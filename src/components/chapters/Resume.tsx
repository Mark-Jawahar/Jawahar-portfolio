"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import ScrollParallax from "@/components/effects/ScrollParallax";
import {
  Download,
  Check,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  BarChart3,
  Wrench,
  Globe,
  Brain,
  Mail,
  Award,
  TrendingUp,
  Clock,
} from "lucide-react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);
import { profile, experiences, skills, education, highlights, summaryHighlights } from "@/lib/resume-data";

const skillIconMap: Record<string, React.ReactNode> = {
  Users: <Users size={11} />,
  BarChart3: <BarChart3 size={11} />,
  Wrench: <Wrench size={11} />,
  Globe: <Globe size={11} />,
  Brain: <Brain size={11} />,
  GraduationCap: <GraduationCap size={11} />,
};

const statIcons = [
  <Users key="u" size={14} />,
  <Clock key="c" size={14} />,
  <TrendingUp key="t" size={14} />,
  <Award key="a" size={14} />,
];

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

function GlassBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "#8e8e93",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 4px rgba(0,0,0,0.03)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.color = "#e8e8ed";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.color = "#8e8e93";
      }}
    >
      {label}
    </span>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="text-xs whitespace-nowrap"
      style={{
        color: "#8e8e93",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "0.2rem 0.65rem",
        borderRadius: "6px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.color = "#e8e8ed";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.color = "#8e8e93";
      }}
    >
      {label}
    </span>
  );
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <h3 className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-3"
      style={{ color: "rgba(142, 142, 147, 0.6)" }}
    >
      <span style={{ color: "rgba(111, 128, 149, 0.6)" }}>{icon}</span>
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
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: phase === "done" ? "rgba(201,195,184,0.8)" : "rgba(232,232,237,0.7)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        if (phase === "idle") {
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.color = "#e8e8ed";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
        }
      }}
      onMouseLeave={(e) => {
        if (phase === "idle") {
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)";
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
            <span className="w-3 h-3 rounded-full" style={{ border: "2px solid rgba(111,128,149,0.3)", borderTopColor: "rgba(111,128,149,0.8)" }}>
              <span className="animate-spin block w-full h-full rounded-full border-2 border-transparent border-t-current" />
            </span>
            <span style={{ color: "#8e8e93" }}>Preparing</span>
          </>
        )}
        {phase === "downloading" && (
          <>
            <span className="w-16 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
              <span className="block h-full rounded-full" style={{ background: "rgba(111,128,149,0.6)", width: "100%", animation: "download-progress 0.5s ease-out forwards" }} />
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

function TimelineDot() {
  return (
    <div className="relative flex-shrink-0"
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "rgba(111, 128, 149, 0.6)",
        boxShadow: "0 0 0 3px rgba(111, 128, 149, 0.15)",
      }}
    />
  );
}

function TimelineLine() {
  return (
    <div style={{
      width: "1px",
      flexShrink: 0,
      background: "linear-gradient(to bottom, rgba(111,128,149,0.15), transparent)",
      marginLeft: "4.5px",
    }} />
  );
}

function ExperienceTimeline() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-0 pt-1">
        {experiences.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <TimelineDot />
            {i < experiences.length - 1 && (
              <div className="flex-1 min-h-[24px] w-px" style={{ background: "linear-gradient(to bottom, rgba(111,128,149,0.15), transparent)" }} />
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-6">
        {experiences.map((exp, i) => (
          <div key={exp.company}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: "#e8e8ed" }}>{exp.company}</span>
                {i === 0 && (
                  <span className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                    style={{
                      background: "rgba(111, 128, 149, 0.10)",
                      color: "rgba(111, 128, 149, 0.7)",
                      border: "1px solid rgba(111, 128, 149, 0.15)",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: "rgba(142, 142, 147, 0.6)" }}>{exp.period}</span>
            </div>
            <p className="text-xs font-medium mb-1" style={{ color: "rgba(232, 232, 237, 0.5)" }}>{exp.role} &middot; {exp.location}</p>
            <p className="text-xs leading-relaxed mb-1.5" style={{ color: "rgba(142, 142, 147, 0.7)" }}>{exp.description}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {exp.achievements.slice(0, 2).map((a, j) => (
                <span key={j} className="text-xs flex items-center gap-1" style={{ color: "rgba(142, 142, 147, 0.5)" }}>
                  <span style={{ color: "rgba(111, 128, 149, 0.4)" }}>◆</span>
                  {a}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative z-10 py-[clamp(3rem,5vw,5rem)] px-4 md:px-6 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: inView ? "rgba(0,0,0,0.3)" : "transparent" }}
    >
      <ScrollParallax speed={0.12} offset={80} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: inView ? "radial-gradient(ellipse 60% 35% at 50% 15%, rgba(111,128,149,0.04) 0%, transparent 60%)" : "none",
          transition: "opacity 1s ease",
        }} />
      </ScrollParallax>

      <div className="max-w-[1000px] mx-auto">
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

        <div className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-8 items-start">

          <div className="space-y-5">
            <Section delay={0.1}>
              <div className="glass-panel p-5 md:p-6 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden mx-auto mb-4" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <Image src={profile.portraitUrl} alt={profile.name} width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-base font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>{profile.name}</h3>
                <p className="text-xs mt-1" style={{ color: "rgba(232,232,237,0.5)" }}>{profile.role}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(201, 195, 184, 0.08)",
                    color: "rgba(201, 195, 184, 0.7)",
                    border: "1px solid rgba(201, 195, 184, 0.12)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(201, 195, 184, 0.6)", animation: "pulse 2s ease-in-out infinite" }} />
                  Open to Opportunities
                </div>
                <div className="mt-4 space-y-1 text-xs" style={{ color: "rgba(142,142,147,0.6)" }}>
                  <div className="flex items-center justify-center gap-1"><MapPin size={10} /> {profile.location}</div>
                  <div className="flex items-center justify-center gap-1"><Briefcase size={10} /> {profile.experience}</div>
                </div>
              </div>
            </Section>

            <Section delay={0.15}>
              <div className="glass-panel p-4">
                <SectionHeader icon={<Mail size={11} />} label="Connect" />
                <div className="flex flex-col gap-2 text-xs mt-2">
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 transition-colors rounded-lg px-2 py-1.5"
                    style={{ color: "rgba(111,128,149,0.6)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(111,128,149,0.9)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(111,128,149,0.6)"; }}
                  >
                    <Mail size={11} /> <span>{profile.email}</span>
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors rounded-lg px-2 py-1.5"
                    style={{ color: "rgba(111,128,149,0.6)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(111,128,149,0.9)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(111,128,149,0.6)"; }}
                  >
                    <LinkedinIcon /> <span>{profile.linkedinDisplay}</span>
                  </a>
                </div>
              </div>
            </Section>

            <Section delay={0.2}>
              <DownloadButton compact />
            </Section>
          </div>

          <div className="space-y-6">
            <Section delay={0.1}>
              <div className="glass-panel p-5 md:p-6">
                <SectionHeader icon={<Award size={11} />} label="Executive Summary" />
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(142,142,147,0.8)" }}>
                  {profile.about}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {summaryHighlights.map((s) => (
                    <div key={s.label} className="rounded-lg p-2.5"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(232,232,237,0.7)" }}>{s.label}</div>
                      <div className="text-[0.65rem]" style={{ color: "rgba(142,142,147,0.5)" }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {highlights.slice(0, 4).map((h) => (
                  <div key={h.label} className="glass-card p-4 text-center">
                    <div className="text-lg md:text-xl font-semibold tracking-tight mb-0.5"
                      style={{ color: "rgba(245,245,247,0.9)" }}>
                      {h.value}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(142,142,147,0.6)" }}>
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section delay={0.2}>
              <div>
                <SectionHeader icon={<Briefcase size={11} />} label="Career Timeline" />
                <div className="glass-panel p-5 md:p-6">
                  <ExperienceTimeline />
                </div>
              </div>
            </Section>

            <Section delay={0.25}>
              <div>
                <SectionHeader icon={<BarChart3 size={11} />} label="Core Skills &amp; Expertise" />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.filter(s => s.category !== "Education").map((skill) => (
                    <div key={skill.category} className="glass-card p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span style={{ color: "rgba(111,128,149,0.6)" }}>{skillIconMap[skill.icon]}</span>
                        <span className="text-[0.55rem] font-semibold uppercase tracking-wider" style={{ color: "rgba(232,232,237,0.5)" }}>{skill.category}</span>
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
            </Section>

            <Section delay={0.3}>
              <div className="glass-panel p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <GraduationCap size={13} style={{ color: "rgba(111,128,149,0.6)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(232,232,237,0.8)" }}>{education.degree}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(142,142,147,0.6)" }}>{education.college} &middot; {education.year} &middot; {education.location}</p>
                  </div>
                </div>
              </div>
            </Section>
          </div>

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
