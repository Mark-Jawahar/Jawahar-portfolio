"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, Check, Building2 } from "lucide-react";

type Role = {
  title: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
};

type MultiRoleExp = { company: string; roles: Role[] };
type SingleRoleExp = { company: string; role: string; period: string; responsibilities: string[]; achievements: string[] };
type Experience = MultiRoleExp | SingleRoleExp;

const experiences: Experience[] = [
  {
    company: "Hello Mentor",
    roles: [
      {
        title: "Assistant Team Lead \u2013 Customer Experience",
        period: "March 2026 \u2013 Present",
        responsibilities: [
          "Led a 10-member Customer Success team managing the full customer lifecycle \u2014 onboarding, engagement, escalation resolution, and renewals for an EdTech platform",
          "Designed and implemented structured onboarding journeys for 500+ learners, reducing average onboarding time by 20%",
          "Developed a query-reduction playbook (self-serve knowledge base + proactive communication cadence) that cut repeat contacts by 30%, saving 15+ support hours per week",
          "Increased CSAT scores by 25% through NPS surveys, closed feedback loops, and personalized follow-up protocols",
          "Improved team productivity by 20% via weekly KPI dashboards, structured 1:1 coaching, and performance improvement plans",
          "Partnered with Product, Sales, and Marketing to resolve 3 UX pain points, directly reducing inbound support volume",
        ],
        achievements: [
          "Zero escalation breaches over 12 months",
          "25% CSAT improvement",
          "30% reduction in repeat queries",
          "20% faster onboarding time",
        ],
      },
      {
        title: "Customer Experience Specialist",
        period: "Sep 2024 \u2013 March 2026",
        responsibilities: [
          "Delivered end-to-end onboarding and admission counselling for 200+ students and parents per quarter across multiple programme tracks",
          "Created onboarding checklists and communication templates adopted across the team, reducing onboarding confusion by 40%",
          "Maintained proactive customer check-in cadence, contributing to a measurable uplift in repeat engagement and referrals",
        ],
        achievements: [
          "Promoted to Assistant Team Lead within 18 months",
          "40% reduction in onboarding confusion",
          "200+ students onboarded per quarter",
        ],
      },
    ],
  },
  {
    company: "NoBrokers.com",
    role: "Relationship Manager",
    period: "Sep 2023 \u2013 June 2024",
    responsibilities: [
      "Managed 80+ concurrent property transactions (buy, sell, rent), ensuring end-to-end client satisfaction in a high-velocity transactional environment",
      "Conducted locality and pricing analyses to identify matching opportunities faster, improving deal conversion rates",
      "Resolved client escalations within a 48-hour SLA, maintaining high satisfaction scores",
      "Collaborated with cross-functional teams (Field Relationship Manager) to streamline workflows and enhance overall customer experience",
    ],
    achievements: [
      "80+ concurrent transactions managed",
      "48-hour escalation SLA maintained",
      "Improved deal conversion rates",
    ],
  },
  {
    company: "Daztek Online Services Pvt Ltd",
    role: "Senior Lead Generation Executive",
    period: "July 2021 \u2013 Aug 2023",
    responsibilities: [
      "Qualified 150+ inbound and outbound leads per month across domestic and international loan products",
      "Supported end-to-end loan processing workflows with a compliance-first approach, consistently meeting or exceeding monthly targets",
      "Maintained accurate CRM records and tracked sales pipelines to improve follow-up efficiency and lead conversion rates",
      "Provided clear loan product guidance and eligibility insights to clients, reducing drop-offs and improving engagement",
      "Coordinated with internal teams for documentation, verification, and processing to ensure accuracy and faster loan approvals",
    ],
    achievements: [
      "150+ leads qualified per month",
      "Consistently exceeded monthly targets",
      "Compliance-first approach",
    ],
  },
];

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><Briefcase className="h-3 w-3" />Experience</span>
          <h2 className="section-title">
            Professional<br />
            <span className="text-gradient-ice">journey.</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(168,216,234,0.25)] via-[rgba(196,181,253,0.15)] to-transparent" />

            {experiences.map((exp, idx) => {
              const isMulti = "roles" in exp;
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-14 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-[38px] h-[38px] rounded-full bg-[rgba(168,216,234,0.06)] border border-[rgba(168,216,234,0.1)] flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-[#a8d8ea]" />
                  </div>

                  <div
                    className="rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] overflow-hidden transition-all duration-500 cursor-pointer hover:bg-[rgba(255,255,255,0.025)]"
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <span className="text-[11px] font-medium text-[#a8d8ea] bg-[rgba(168,216,234,0.06)] px-2.5 py-1 rounded-full">
                            {exp.company}
                          </span>
                          <h3 className="text-base md:text-lg font-semibold mt-2">
                            {isMulti ? exp.roles[0].title : exp.role}
                          </h3>
                        </div>
                        <span className="text-[11px] text-white/15 bg-white/5 px-2.5 py-1 rounded-full flex-shrink-0 mt-1">
                          {isMulti ? exp.roles[0].period : exp.period}
                        </span>
                      </div>

                      <motion.div
                        animate={{ height: expanded === idx ? "auto" : 0, opacity: expanded === idx ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-6">
                          {isMulti ? (
                            (exp as MultiRoleExp).roles.map((role, ri) => (
                              <div key={ri}>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-sm font-medium text-white/70">{role.title}</h4>
                                  <span className="text-[11px] text-white/15">{role.period}</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="text-[11px] font-medium text-white/15 uppercase tracking-widest mb-3">Responsibilities</h5>
                                    <div className="space-y-2">
                                      {role.responsibilities.map((r) => (
                                        <div key={r} className="flex items-start gap-2.5">
                                          <div className="h-1 w-1 rounded-full bg-[#a8d8ea]/30 mt-2 flex-shrink-0" />
                                          <span className="text-sm text-white/30 leading-relaxed">{r}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="text-[11px] font-medium text-white/15 uppercase tracking-widest mb-3">Achievements</h5>
                                    <div className="space-y-2">
                                      {role.achievements.map((a) => (
                                        <div key={a} className="flex items-start gap-3 p-2.5 rounded-xl bg-[rgba(167,243,208,0.03)] border border-[rgba(167,243,208,0.06)]">
                                          <div className="h-5 w-5 rounded-full bg-[rgba(167,243,208,0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="h-3 w-3 text-[#a7f3d0]/60" />
                                          </div>
                                          <span className="text-sm text-[#a7f3d0]/50">{a}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-[11px] font-medium text-white/15 uppercase tracking-widest mb-3">Responsibilities</h4>
                                <div className="space-y-2">
                                  {(exp as SingleRoleExp).responsibilities.map((r) => (
                                    <div key={r} className="flex items-start gap-2.5">
                                      <div className="h-1 w-1 rounded-full bg-[#a8d8ea]/30 mt-2 flex-shrink-0" />
                                      <span className="text-sm text-white/30 leading-relaxed">{r}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-[11px] font-medium text-white/15 uppercase tracking-widest mb-3">Achievements</h4>
                                <div className="space-y-2">
                                  {(exp as SingleRoleExp).achievements.map((a) => (
                                    <div key={a} className="flex items-start gap-3 p-2.5 rounded-xl bg-[rgba(167,243,208,0.03)] border border-[rgba(167,243,208,0.06)]">
                                      <div className="h-5 w-5 rounded-full bg-[rgba(167,243,208,0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="h-3 w-3 text-[#a7f3d0]/60" />
                                      </div>
                                      <span className="text-sm text-[#a7f3d0]/50">{a}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <button className="mt-2 flex items-center gap-1.5 text-[11px] text-white/10 hover:text-white/35 transition-colors">
                        <motion.span animate={{ rotate: expanded === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="h-3 w-3" />
                        </motion.span>
                        {expanded === idx ? "Collapse" : "Expand"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
