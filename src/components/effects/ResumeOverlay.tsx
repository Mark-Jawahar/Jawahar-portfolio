"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, X } from "lucide-react";
import { profile } from "@/lib/resume-data";

const resumeContent = {
  phone: "+91 9620151434",
  location: "Bengaluru, Karnataka",
  name: "Jawahar A",
  role: "Customer Experience Specialist",
  email: "markjawahar17@gmail.com",
  linkedin: "linkedin.com/in/jawahar-a-47037a240",
  summary: "Customer Experience Specialist with 5+ years of Experience in Customer Onboarding, Customer Success, Client Relationship Management, and Customer Lifecycle Management across EdTech, Real Estate, and Financial Services. Proven expertise in onboarding 500+ learners, enhancing Customer satisfaction through proactive engagement, resolving Customer issues, and delivering seamless Customer experiences. Skilled in CRM tools, Cross-functional collaboration, process improvement, and building long-term Customer relationships that drive Customer retention and business growth.",

  skills: [
    {
      category: "Customer Success & Operations",
      items: ["Customer Onboarding & Implementation", "Customer Lifecycle Management", "Customer Onboarding", "Account Management", "Escalation Management", "Technical Support"],
    },
    {
      category: "Operations & Analytics",
      items: ["Process Improvement", "Customer Satisfaction (CSAT)", "CRM Management", "Data Analysis", "Cross-functional Collaboration"],
    },
    {
      category: "Tools & Platforms",
      items: ["Zoho CRM", "Zoho Desk", "Zoho SalesIQ", "Zoho Sheets", "Zoho Backstage", "Zoho Meeting", "MS Excel", "Google Sheets"],
    },
    {
      category: "Languages",
      items: ["English (Professional)", "Tamil (Native)", "Kannada (Professional)", "Telugu (Conversational)"],
    },
  ],

  experience: [
    {
      role: "Customer Experience Specialist",
      company: "Hello Mentor",
      period: "Sep 2024 — Present",
      location: "Bengaluru, Karnataka",
      bullets: [
        "Managed end-to-end customer onboarding for 500+ learners, ensuring a seamless transition from enrollment to program commencement while delivering a positive customer experience.",
        "Served as the primary point of contact for students and parents, providing timely support, resolving queries, and ensuring high customer satisfaction throughout the customer lifecycle.",
        "Created and standardized onboarding checklists, communication templates, and customer support processes, reducing onboarding confusion and improving operational efficiency.",
        "Collaborated with Admissions, Product, Operations, and Marketing teams to resolve customer concerns, streamline processes, and enhance the overall learner journey.",
        "Conducted regular follow-ups with customers to improve engagement, encourage program participation, and build long-term customer relationships that supported retention.",
        "Maintained accurate customer records using CRM tools, analyzed customer feedback, and identified process improvement opportunities to enhance onboarding quality and service delivery.",
      ],
    },
    {
      role: "Relationship Manager",
      company: "NoBrokers.com",
      period: "Sep 2023 — June 2024",
      location: "Bengaluru, Karnataka",
      bullets: [
        "Managed 80+ concurrent property transactions.",
        "Conducted locality and pricing analyses.",
        "Resolved client escalations within a 48-hour SLA.",
        "Collaborated with cross-functional teams.",
        "Negotiated between multiple stakeholders.",
      ],
    },
    {
      role: "Senior Lead Generation Executive",
      company: "Daztek Online Services Pvt Ltd",
      period: "July 2021 — Aug 2023",
      location: "Bengaluru, Karnataka",
      bullets: [
        "Qualified and managed 150+ inbound and outbound customer leads.",
        "Assisted customers throughout the loan application journey.",
        "Maintained customer records using Excel.",
        "Coordinated with internal teams.",
        "Consistently achieved monthly performance targets.",
      ],
    },
  ],

  education: {
    degree: "Bachelor of Commerce (B.Com)",
    school: "SSMRV College",
    year: "Apr 2021",
    location: "Bengaluru, Karnataka",
  },
};

export default function ResumeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<"idle" | "preparing" | "downloading" | "done">("idle");
  const scrollPosRef = useRef(0);

  const handleDownload = useCallback(() => {
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

  useEffect(() => {
    if (open) {
      scrollPosRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollPosRef.current });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={onBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Resume - Jawahar A"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="resume-glass relative w-full overflow-y-auto"
            style={{ maxWidth: "85vw", maxHeight: "90vh" }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-end gap-2 px-6 py-3"
              style={{
                background: "linear-gradient(to bottom, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.5) 80%, transparent 100%)",
              }}
            >
              <button
                onClick={handleDownload}
                disabled={phase !== "idle"}
                className="relative overflow-hidden rounded-lg text-xs font-medium cursor-pointer disabled:cursor-not-allowed px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: phase === "done" ? "rgba(142,142,147,0.6)" : "rgba(232,232,237,0.7)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (phase === "idle") { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#e8e8ed"; }
                }}
                onMouseLeave={(e) => {
                  if (phase === "idle") { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(232,232,237,0.7)"; }
                }}
              >
                <span className="flex items-center gap-1.5">
                  {phase === "idle" && <><Download size={10} /><span>Download PDF</span></>}
                  {phase === "preparing" && <><span className="w-2.5 h-2.5 rounded-full border-2 border-transparent border-t-current animate-spin" /><span>Preparing</span></>}
                  {phase === "downloading" && <><span className="w-8 h-0.5 rounded-full bg-white/10 overflow-hidden"><span className="block h-full rounded-full" style={{ background: "rgba(142,142,147,0.3)", width: "100%", animation: "download-progress 0.5s ease-out forwards" }} /></span><span>DL</span></>}
                  {phase === "done" && <><Check size={10} /><span>Done</span></>}
                </span>
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 transition-colors"
                style={{ color: "rgba(142,142,147,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,232,237,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(142,142,147,0.4)"; e.currentTarget.style.background = "transparent"; }}
                aria-label="Close resume"
              >
                <X size={14} />
              </button>
            </div>

            <div className="px-6 md:px-10 pb-8 md:pb-12 pt-2">

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6 pb-5 mb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-center md:text-left order-2 md:order-1">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(142,142,147,0.7)" }}>
                    {resumeContent.phone}<br />
                    {resumeContent.location}
                  </p>
                </div>
                <div className="text-center order-1 md:order-2">
                  <h1 className="text-xl md:text-2xl font-semibold" style={{ color: "rgba(245,245,247,0.95)" }}>{resumeContent.name}</h1>
                  <p className="text-xs md:text-sm mt-0.5" style={{ color: "rgba(232,232,237,0.5)" }}>{resumeContent.role}</p>
                </div>
                <div className="text-center md:text-right order-3">
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(142,142,147,0.7)" }}>
                    {resumeContent.email}<br />
                    {resumeContent.linkedin}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>Professional Summary</h2>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: "rgba(232,232,237,0.7)" }}>
                  {resumeContent.summary}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>Skills</h2>
                <div className="space-y-1.5">
                  {resumeContent.skills.map((skillGroup) => (
                    <p key={skillGroup.category} className="text-xs md:text-sm leading-relaxed" style={{ color: "rgba(232,232,237,0.7)" }}>
                      <span className="font-medium" style={{ color: "rgba(245,245,247,0.85)" }}>{skillGroup.category}:</span>{" "}
                      {skillGroup.items.join(", ")}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "rgba(142,142,147,0.5)" }}>Technical Experience</h2>
                <div className="space-y-5">
                  {resumeContent.experience.map((exp, i) => (
                    <div key={`${exp.company}-${i}`}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>{exp.role}</span>
                          {i === 0 && (
                            <span className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                              style={{ background: "rgba(142,142,147,0.08)", color: "rgba(142,142,147,0.5)", border: "1px solid rgba(142,142,147,0.08)" }}>
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-xs" style={{ color: "rgba(142,142,147,0.5)" }}>{exp.period}</span>
                      </div>
                      <p className="text-xs mb-1.5" style={{ color: "rgba(232,232,237,0.45)" }}>
                        {exp.company} &middot; {exp.location}
                      </p>
                      <ul className="space-y-1">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-xs leading-relaxed flex items-start gap-2" style={{ color: "rgba(232,232,237,0.65)" }}>
                            <span className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(142,142,147,0.25)" }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(142,142,147,0.5)" }}>Education</h2>
                <p className="text-sm font-semibold" style={{ color: "rgba(245,245,247,0.9)" }}>{resumeContent.education.degree}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(232,232,237,0.6)" }}>
                  {resumeContent.education.school} &middot; {resumeContent.education.year} &middot; {resumeContent.education.location}
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
