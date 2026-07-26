"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Download, Check, MapPin, Mail, Calendar } from "lucide-react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);
import { profile, experiences, skills, education } from "@/lib/resume-data";

function DownloadButton() {
  const [phase, setPhase] = useState<"idle" | "preparing" | "downloading" | "done">("idle");
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== "idle") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples([{ x, y, id }]);
    setTimeout(() => setRipples([]), 600);

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
      className="relative overflow-hidden rounded-full bg-white text-background border-none px-6 py-3 text-[0.75rem] font-medium tracking-tight cursor-pointer disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute w-4 h-4 rounded-full bg-black/10"
          style={{
            left: r.x - 8,
            top: r.y - 8,
            animation: "ripple 0.6s ease-out forwards",
          }}
        />
      ))}

      <span className="relative flex items-center justify-center gap-2 min-w-[140px]">
        {phase === "idle" && (
          <>
            <Download size={13} />
            <span>Download Resume</span>
          </>
        )}
        {phase === "preparing" && (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
            <span>Preparing Resume</span>
          </>
        )}
        {phase === "downloading" && (
          <>
            <span className="w-20 h-1 bg-black/10 rounded-full overflow-hidden">
              <span className="block h-full bg-black rounded-full animate-[download-progress_0.5s_ease-out_forwards]" />
            </span>
            <span className="text-black/60">Downloading</span>
          </>
        )}
        {phase === "done" && (
          <>
            <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
              <Check size={10} strokeWidth={3} className="text-white" />
            </span>
            <span className="text-green-700">Downloaded</span>
          </>
        )}
      </span>
    </button>
  );
}

function ResumeHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 md:gap-7 pb-6 md:pb-7 border-b border-black/6">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-black/4">
        <Image
          src={profile.portraitUrl}
          alt={profile.name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-black/88">
            {profile.name}
          </h1>
          <span className="inline-flex items-center gap-1.5 text-[0.55rem] font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Open to Opportunities
          </span>
        </div>
        <p className="text-sm font-medium text-black/60 mb-1.5">{profile.role}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.7rem] text-black/45">
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {profile.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {profile.experience}
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-black/50 hover:text-black/80 transition-colors"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1 text-black/50 hover:text-black/80 transition-colors"
          >
            <Mail size={10} />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

function SummarySection() {
  const badges = [
    "5+ Years Experience",
    "500+ Learners Onboarded",
    "Customer Success",
    "Customer Experience",
    "Leadership",
    "CRM",
    "Cross-Functional Collaboration",
    "Process Improvement",
  ];

  return (
    <section className="py-5 md:py-6">
      <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-black/30 mb-3">
        Executive Summary
      </h2>
      <p className="text-[0.8rem] md:text-[0.85rem] text-black/65 leading-[1.75] mb-4">
        {profile.about}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.55rem] font-medium bg-black/3 text-black/50 border border-black/6"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="py-5 md:py-6 border-t border-black/6">
      <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-black/30 mb-4">
        Professional Experience
      </h2>
      <div className="space-y-5 md:space-y-6">
        {experiences.map((exp, i) => (
          <div key={exp.company}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-black/80">{exp.company}</h3>
                {i === 0 && (
                  <span className="text-[0.5rem] font-medium px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                    Current
                  </span>
                )}
              </div>
              <span className="text-[0.65rem] text-black/40">{exp.period}</span>
            </div>
            <p className="text-[0.7rem] font-medium text-black/55 mb-1.5">
              {exp.role} &middot; {exp.location}
            </p>
            <p className="text-[0.72rem] text-black/50 leading-relaxed mb-2">
              {exp.description}
            </p>
            {exp.responsibilities.length > 0 && (
              <ul className="space-y-1">
                {exp.responsibilities.map((r, j) => (
                  <li key={j} className="flex items-start gap-2 text-[0.7rem] text-black/50 leading-relaxed">
                    <span className="mt-[5px] w-[2.5px] h-[2.5px] rounded-full bg-black/25 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {exp.achievements.length > 0 && (
              <div className="mt-2 pl-3 border-l-2 border-black/8">
                <p className="text-[0.5rem] font-semibold uppercase tracking-wider text-black/35 mb-1">
                  Key Achievements
                </p>
                <ul className="space-y-0.5">
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className="flex items-start gap-2 text-[0.65rem] text-black/45 leading-relaxed">
                      <span className="mt-[4px] w-1 h-1 rounded-full bg-green-400/50 flex-shrink-0" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="py-5 md:py-6 border-t border-black/6">
      <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-black/30 mb-3">
        Education
      </h2>
      <div>
        <p className="text-sm font-medium text-black/80">{education.degree}</p>
        <p className="text-[0.7rem] text-black/50 mt-0.5">
          {education.college} &middot; {education.year} &middot; {education.location}
        </p>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="py-5 md:py-6 border-t border-black/6">
      <h2 className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-black/30 mb-3">
        Skills &amp; Expertise
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div key={skill.category}>
            <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-black/55 mb-1">
              {skill.category}
            </p>
            <div className="flex flex-wrap gap-1">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="text-[0.6rem] text-black/45 bg-black/3 px-2 py-0.5 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResumeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative z-10 py-[clamp(3rem,5vw,5rem)] px-4 md:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: inView
              ? "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255,255,255,0.02) 0%, transparent 60%)"
              : "none",
            transition: "opacity 1s ease",
          }}
        />
      </div>

      <div className="max-w-[900px] mx-auto">
        <div
          className="text-center mb-8 md:mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold tracking-tight text-white/90 leading-[1.15]">
            Professional Profile
          </h2>
          <p className="mt-2 text-[clamp(0.75rem,1vw,0.85rem)] text-white/35 max-w-[40ch] mx-auto leading-relaxed">
            An executive overview of experience, expertise, and professional impact.
          </p>
        </div>

        <div
          ref={docRef}
          className="relative mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0.15s",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.015)",
              transition: "box-shadow 0.8s ease",
              transitionDelay: "0.3s",
            }}
          />

          {inView && (
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                  animation: "sweep 1.2s ease-out forwards",
                  transformOrigin: "center",
                }}
              />
            </div>
          )}

          <div
            className="relative rounded-2xl p-6 md:p-8 lg:p-10"
            style={{
              backgroundColor: "#f5f4f1",
              color: "#1d1d1f",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              animation: inView ? "doc-float 6s ease-in-out infinite" : "none",
              animationDelay: "1s",
            }}
          >
            <ResumeHeader />
            <SummarySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />

            <div className="pt-5 md:pt-6 border-t border-black/6">
              <p className="text-[0.55rem] text-black/30 text-center">
                {profile.name} &middot; {profile.role} &middot; Updated {profile.resumeLastUpdated}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center mt-8 md:mt-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0.6s",
          }}
        >
          <DownloadButton />
        </div>
      </div>
    </section>
  );
}
