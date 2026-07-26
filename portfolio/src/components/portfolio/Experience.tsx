"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, Check, Building2, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Hello Mentor",
    location: "Bengaluru, Karnataka",
    role: "Customer Experience Specialist",
    period: "Sep 2024 \u2013 Present",
    responsibilities: [
      "Managed end-to-end customer onboarding for 500+ learners, ensuring a seamless transition from enrollment to program commencement while delivering a positive customer experience.",
      "Served as the primary point of contact for students and parents, providing timely support, resolving queries, and ensuring high customer satisfaction throughout the customer lifecycle.",
      "Created and standardized onboarding checklists, communication templates, and customer support processes, reducing onboarding confusion and improving operational efficiency.",
      "Promoted to Assistant Team Lead within 18 months based on consistent performance, initiative, and leadership potential.",
      "Collaborated with Admissions, Product, Operations, and Marketing teams to resolve customer concerns, streamline processes, and enhance the overall learner experience.",
      "Conducted regular follow-ups with customers to improve engagement, encourage program participation, and build long-term customer relationships that supported retention.",
      "Maintained accurate customer records using CRM tools, analyzed customer feedback, and identified process improvement opportunities to enhance onboarding quality and service delivery.",
    ],
    achievements: [
      "Onboarded 500+ learners end-to-end",
      "Promoted to Assistant Team Lead in 18 months",
      "Reduced onboarding confusion with standardized processes",
      "Cross-functional collaboration across 4 teams",
    ],
  },
  {
    company: "NoBrokers.com",
    location: "Bengaluru, Karnataka",
    role: "Relationship Manager",
    period: "Sep 2023 \u2013 June 2024",
    responsibilities: [
      "Managed 80+ concurrent property transactions (buy, sell, rent), ensuring end-to-end client satisfaction in a high-velocity transactional environment.",
      "Conducted locality and pricing analyses to identify matching opportunities faster, improving deal conversion rates.",
      "Resolved client escalations within a 48-hour SLA, maintaining high satisfaction scores.",
      "Collaborated with cross-functional teams (Field Relationship Manager) to streamline workflows and enhance overall customer experience.",
      "Negotiated between multiple stakeholders to resolve conflicts, accelerate deal closures, and improve customer satisfaction.",
    ],
    achievements: [
      "80+ concurrent transactions managed",
      "48-hour escalation SLA maintained",
      "Improved deal conversion rates",
    ],
  },
  {
    company: "Daztek Online Services Pvt Ltd",
    location: "Bengaluru, Karnataka",
    role: "Senior Lead Generation Executive",
    period: "July 2021 \u2013 Aug 2023",
    responsibilities: [
      "Qualified and managed 150+ inbound and outbound customer leads each month across domestic and international loan products, ensuring timely follow-ups and lead progression.",
      "Assisted customers throughout the loan application journey by providing clear guidance on product features, eligibility criteria, documentation, and application procedures.",
      "Maintained accurate customer records and sales pipelines using Excel spreadsheets, ensuring efficient lead tracking, follow-up scheduling, and data accuracy.",
      "Coordinated with internal teams to facilitate document verification, loan processing, and timely resolution of customer queries, contributing to a seamless customer experience.",
      "Consistently achieved monthly performance targets by identifying customer needs, recommending suitable financial solutions, and delivering a customer-centric service experience.",
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

            {experiences.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${idx}`}
                initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-[38px] h-[38px] rounded-full glass-apple flex items-center justify-center shadow-[0_0_20px_rgba(168,216,234,0.06)]">
                  <Building2 className="h-4 w-4 text-[#a8d8ea]" />
                </div>

                <div
                  className="rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] overflow-hidden transition-all duration-500 cursor-pointer hover:bg-[rgba(255,255,255,0.025)] hover:border-[rgba(255,255,255,0.07)]"
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-medium text-[#a8d8ea] bg-[rgba(168,216,234,0.06)] px-2.5 py-1 rounded-full">
                            {exp.company}
                          </span>
                          <span className="text-[11px] text-white/20 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold mt-2">{exp.role}</h3>
                      </div>
                      <span className="text-[11px] text-white/15 bg-white/5 px-2.5 py-1 rounded-full flex-shrink-0 mt-1">
                        {exp.period}
                      </span>
                    </div>

                    <motion.div
                      animate={{ height: expanded === idx ? "auto" : 0, opacity: expanded === idx ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[11px] font-medium text-white/15 uppercase tracking-widest mb-3">Responsibilities</h4>
                          <div className="space-y-2">
                            {exp.responsibilities.map((r) => (
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
                            {exp.achievements.map((a) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
