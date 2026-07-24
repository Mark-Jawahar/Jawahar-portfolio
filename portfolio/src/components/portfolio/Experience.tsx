"use client";

import { motion } from "framer-motion";
import { Briefcase, Check, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experience = {
  company: "Hello Mentor",
  role: "Assistant Team Lead \u2013 Customer Experience",
  period: "Current",
  responsibilities: [
    "Customer onboarding",
    "Customer engagement",
    "Escalation handling",
    "Customer retention",
    "Process improvements",
    "Team leadership",
    "Operational excellence",
    "Customer communication",
    "Performance monitoring",
    "Cross-functional collaboration",
  ],
  achievements: [
    "Improved CSAT by 25%",
    "Reduced repeat customer queries by 30%",
    "Led a team of 10 Customer Success Executives",
    "Improved internal workflows",
  ],
};

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">
            <Briefcase className="h-3 w-3" />
            Experience
          </span>
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-description">
            A track record of driving customer success and operational
            excellence through leadership and innovation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563eb]/50 via-[#7c3aed]/30 to-transparent" />

            <div className="relative pl-6 md:pl-20 pb-4">
              <div className="absolute left-0 md:left-8 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#2563eb] border-4 border-background shadow-lg shadow-[#2563eb]/20" />

              <div className="gradient-border p-6 md:p-8 ml-2 md:ml-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-5 w-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-[#2563eb]">
                        {experience.company}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mt-1">
                      {experience.role}
                    </h3>
                  </div>
                  <Badge variant="accent">{experience.period}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                      Responsibilities
                    </h4>
                    <div className="space-y-2.5">
                      {experience.responsibilities.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-[#2563eb]/50" />
                          <span className="text-sm text-muted">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {experience.achievements.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
                        >
                          <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          </div>
                          <span className="text-sm text-emerald-300/90">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
