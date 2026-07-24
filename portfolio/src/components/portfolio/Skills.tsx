"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, Brain, Wrench, Globe, GraduationCap } from "lucide-react";

const categories = [
  {
    title: "Customer Success & Operations",
    icon: Users,
    skills: [
      "Customer Lifecycle Management",
      "Onboarding Strategy",
      "Churn Reduction",
      "Escalation Management",
      "KPI Tracking",
      "NPS/CSAT Analysis",
      "Data Analysis",
    ],
  },
  {
    title: "Leadership & Management",
    icon: BarChart3,
    skills: [
      "Team Leadership & Coaching",
      "Process Optimization",
      "Stakeholder Management",
      "Renewal Management",
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
    title: "Soft Skills",
    icon: Brain,
    skills: [
      "Communication",
      "Problem Solving",
      "Process Improvement",
      "Team Leadership",
    ],
  },
  {
    title: "Education",
    icon: GraduationCap,
    skills: [
      "B.Com, SSMRV College (Apr 2021)",
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
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
          <span className="section-label">
            <Wrench className="h-3 w-3" />
            Skills
          </span>
          <h2 className="section-title">
            Tools &amp; expertise<br />
            <span className="text-gradient-ice">I bring.</span>
          </h2>
          <p className="section-description">
            A growing toolkit built over 3+ years of delivering results.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={itemAnim}
                className="group relative rounded-2xl p-5 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center group-hover:bg-[rgba(168,216,234,0.12)] transition-colors">
                    <Icon className="h-4 w-4 text-[#a8d8ea]" />
                  </div>
                  <h3 className="text-sm font-medium">{cat.title}</h3>
                </div>
                <div className="space-y-2">
                  {cat.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <div className="h-1 w-1 rounded-full bg-white/15 group-hover:bg-[#a8d8ea]/50 transition-colors" />
                      <span className="text-sm text-white/30 group-hover:text-white/50 transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
