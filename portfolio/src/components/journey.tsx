"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "./section-badge";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Customer Experience Specialist",
    company: "Hello Mentor",
    location: "Bengaluru, Karnataka",
    period: "Sep 2024 — Present",
    achievements: [
      "Managed end-to-end customer onboarding for 500+ learners, ensuring a seamless transition from enrollment to program commencement",
      "Served as primary point of contact for students and parents, providing timely support and resolving queries",
      "Created and standardized onboarding checklists, communication templates, and customer support processes",
      "Collaborated with Admissions, Product, Operations, and Marketing teams to enhance the learner journey",
      "Conducted regular follow-ups to improve engagement and build long-term customer relationships",
    ],
  },
  {
    type: "work",
    title: "Relationship Manager",
    company: "NoBrokers.com",
    location: "Bengaluru, Karnataka",
    period: "Sep 2023 — June 2024",
    achievements: [
      "Managed 80+ concurrent property transactions ensuring end-to-end client satisfaction",
      "Conducted locality and pricing analyses to improve deal conversion rates",
      "Resolved client escalations within a 48-hour SLA, maintaining high satisfaction scores",
      "Collaborated with cross-functional teams to streamline workflows and enhance customer experience",
    ],
  },
  {
    type: "work",
    title: "Senior Lead Generation Executive",
    company: "Daztek Online Services Pvt Ltd",
    location: "Bengaluru, Karnataka",
    period: "July 2021 — Aug 2023",
    achievements: [
      "Qualified and managed 150+ inbound and outbound customer leads each month",
      "Assisted customers throughout the loan application journey with clear guidance",
      "Maintained accurate customer records and sales pipelines using Excel",
      "Coordinated with internal teams for document verification and query resolution",
      "Consistently achieved monthly performance targets",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Commerce (B.Com)",
    company: "SSMRV College",
    location: "Bengaluru, Karnataka",
    period: "Apr 2021",
    achievements: [],
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.7_0.08_240_/_0.03),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Journey" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6">
            Professional <span className="text-gradient font-semibold">Path</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-blue-400/10 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative pl-14 sm:pl-20"
              >
                <div
                  className={`absolute left-0 top-1 w-12 sm:w-16 h-12 sm:h-16 rounded-xl flex items-center justify-center border ${
                    exp.type === "education"
                      ? "bg-emerald-500/10 border-emerald-400/20"
                      : "bg-blue-500/10 border-blue-400/20"
                  }`}
                >
                  {exp.type === "education" ? (
                    <GraduationCap size={18} className="text-emerald-300/80" />
                  ) : (
                    <Briefcase size={18} className="text-blue-300/80" />
                  )}
                </div>

                <div className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/[0.08] transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-medium text-base sm:text-lg">
                        {exp.title}
                      </h3>
                      <p className="text-white/50 text-sm">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-white/30 font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {exp.achievements.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="flex items-start gap-3 text-white/40 text-sm leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-blue-400/40 shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
