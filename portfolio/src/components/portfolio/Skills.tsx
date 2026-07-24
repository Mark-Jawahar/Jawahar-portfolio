"use client";

import { motion } from "framer-motion";
import { Code2, Users, BarChart3, Brain, Palette, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Core Expertise",
    icon: Users,
    skills: [
      "Customer Success",
      "Customer Experience",
      "Operations",
      "Leadership",
    ],
  },
  {
    title: "Management",
    icon: BarChart3,
    skills: [
      "People Management",
      "Customer Retention",
      "CRM",
      "Escalation Handling",
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
    title: "Tools & Tech",
    icon: Wrench,
    skills: [
      "AI Tools",
      "ChatGPT",
      "Claude",
      "Figma",
    ],
  },
  {
    title: "Design",
    icon: Palette,
    skills: [
      "UI/UX",
      "Microsoft Office",
      "Google Workspace",
    ],
  },
  {
    title: "AI & Innovation",
    icon: Code2,
    skills: [
      "ChatGPT",
      "Claude",
      "AI Tools",
      "Process Automation",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="section-label">
            <Code2 className="h-3 w-3" />
            Skills & Expertise
          </span>
          <h2 className="section-title">What I Bring</h2>
          <p className="section-description mx-auto">
            A comprehensive skill set built over 3+ years of delivering
            results across customer success, operations, and leadership.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="gradient-border p-6 hover-lift group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-[#2563eb]/10 flex items-center justify-center group-hover:bg-[#2563eb]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <h3 className="font-semibold text-sm">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={skillItemVariants}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#2563eb]/40 group-hover:bg-[#2563eb] transition-colors" />
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </motion.div>
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
