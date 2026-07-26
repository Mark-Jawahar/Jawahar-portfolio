"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Wrench, Globe, Brain, GraduationCap, Search, Filter } from "lucide-react";

const categories = [
  {
    title: "Customer Success & Operations",
    icon: Users,
    skills: [
      "Customer Onboarding & Implementation",
      "Customer Lifecycle Management",
      "Customer Onboarding",
      "Account Management",
      "Escalation Management",
      "Technical Support",
    ],
  },
  {
    title: "Operations & Analytics",
    icon: BarChart3,
    skills: [
      "Process Improvement",
      "Customer Satisfaction (CSAT)",
      "CRM Management",
      "Data Analysis",
      "Cross-functional Collaboration",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      "Zoho CRM",
      "Zoho Desk",
      "Zoho SalesIQ",
      "Zoho Sheets",
      "Zoho Backstage",
      "Zoho Meeting",
      "MS Excel",
      "Google Sheets",
    ],
  },
  {
    title: "Languages",
    icon: Globe,
    skills: [
      "English (Professional)",
      "Tamil (Native)",
      "Kannada (Professional)",
      "Telugu (Conversational)",
    ],
  },
  {
    title: "Core Strengths",
    icon: Brain,
    skills: [
      "Communication",
      "Problem Solving",
      "Process Improvement",
      "Proactive Engagement",
      "Relationship Building",
    ],
  },
  {
    title: "Education",
    icon: GraduationCap,
    skills: [
      "B.Com, SSMRV College (Apr 2021)",
      "Bengaluru, Karnataka",
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const allSkills = categories.flatMap((c) => c.skills);
  const displayedSkills = activeCat
    ? categories.find((c) => c.title === activeCat)?.skills || allSkills
    : allSkills;

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><Search className="h-3 w-3" />Skills</span>
          <h2 className="section-title">
            Expertise &amp; tools<br />
            <span className="text-gradient-ice">I work with.</span>
          </h2>
          <p className="section-description">
            A comprehensive toolkit built over 5+ years of delivering customer success.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 max-w-5xl">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCat(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeCat === null
                ? "bg-[rgba(168,216,234,0.1)] text-[#a8d8ea] border border-[rgba(168,216,234,0.15)]"
                : "bg-[rgba(255,255,255,0.02)] text-white/30 border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <Filter className="h-3 w-3 inline mr-1.5" />
            All
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCat(activeCat === cat.title ? null : cat.title)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCat === cat.title
                  ? "bg-[rgba(168,216,234,0.1)] text-[#a8d8ea] border border-[rgba(168,216,234,0.15)]"
                  : "bg-[rgba(255,255,255,0.02)] text-white/30 border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <cat.icon className="h-3 w-3 inline mr-1.5" />
              {cat.title}
            </motion.button>
          ))}
        </div>

        {/* Glass cards for each category */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            const show = activeCat === null || activeCat === cat.title;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: ci * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl p-5 transition-all duration-500 ${
                  show
                    ? "glass-premium"
                    : "bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.015)] opacity-40"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center group-hover:bg-[rgba(168,216,234,0.12)] transition-colors">
                    <Icon className="h-4 w-4 text-[#a8d8ea]" />
                  </div>
                  <h3 className="text-sm font-medium">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] text-white/30 group-hover:text-white/50 group-hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
