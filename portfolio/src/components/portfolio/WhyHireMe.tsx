"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  TrendingUp,
  GitBranch,
  BarChart3,
  HeartHandshake,
} from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Team Leadership",
    desc: "Led a team of 10 Customer Success Executives, driving performance and growth.",
    metric: "10",
    unit: "members",
  },
  {
    icon: Target,
    title: "Customer Success",
    desc: "Improved CSAT by 25% through strategic process improvements and team empowerment.",
    metric: "25%",
    unit: "CSAT growth",
  },
  {
    icon: TrendingUp,
    title: "Operations",
    desc: "Reduced repeat customer queries by 30% with smarter workflows and automation.",
    metric: "30%",
    unit: "reduction",
  },
  {
    icon: GitBranch,
    title: "Process Optimization",
    desc: "Improved onboarding time by 20%, getting customers to value faster.",
    metric: "20%",
    unit: "faster onboarding",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    desc: "Using metrics and insights to guide strategy, improve outcomes, and predict trends.",
    metric: "3+",
    unit: "years of data",
  },
  {
    icon: HeartHandshake,
    title: "Cross-Functional",
    desc: "Collaborated across Product, Sales, and Marketing to align on customer experience.",
    metric: "3",
    unit: "departments",
  },
];

export function WhyHireMe() {
  return (
    <section id="why-me" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><Target className="h-3 w-3" />Why Hire Me</span>
          <h2 className="section-title">
            What I<br />
            <span className="text-gradient-ice">bring.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl p-6 glass-premium"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-9 w-9 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center group-hover:bg-[rgba(168,216,234,0.1)] transition-colors">
                    <Icon className="h-4.5 w-4.5 text-[#a8d8ea]" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gradient-ice">{item.metric}</div>
                    <div className="text-[10px] text-white/20">{item.unit}</div>
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
