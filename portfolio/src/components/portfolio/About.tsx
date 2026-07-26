"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Brain, Workflow, Bot, Palette, Route, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Heart,
    label: "Customer Success",
    desc: "5+ years of building lasting relationships and driving retention across EdTech, Real Estate, and Financial Services.",
    gradient: "from-[rgba(168,216,234,0.06)] to-[rgba(168,216,234,0.02)]",
  },
  {
    icon: Route,
    label: "Customer Journey",
    desc: "End-to-end lifecycle management — from onboarding 500+ learners to proactive check-ins and renewal management.",
    gradient: "from-[rgba(196,181,253,0.06)] to-[rgba(196,181,253,0.02)]",
  },
  {
    icon: Brain,
    label: "Leadership & Growth",
    desc: "Promoted to Assistant Team Lead within 18 months. Coaching teams, driving KPIs, and building scalable processes.",
    gradient: "from-[rgba(167,243,208,0.06)] to-[rgba(167,243,208,0.02)]",
  },
  {
    icon: Workflow,
    label: "Process Improvement",
    desc: "Created onboarding checklists and query-reduction playbooks that cut repeat contacts by 30% and saved 15+ hours weekly.",
    gradient: "from-[rgba(168,216,234,0.06)] to-[rgba(168,216,234,0.02)]",
  },
  {
    icon: Bot,
    label: "AI & Automation",
    desc: "Exploring prompt engineering and AI workflows to enhance customer experience — a personal learning journey.",
    gradient: "from-[rgba(196,181,253,0.06)] to-[rgba(196,181,253,0.02)]",
  },
  {
    icon: Palette,
    label: "Design & Creation",
    desc: "Building this portfolio, exploring Figma, and crafting premium digital experiences as personal projects.",
    gradient: "from-[rgba(167,243,208,0.06)] to-[rgba(167,243,208,0.02)]",
  },
  {
    icon: BookOpen,
    label: "Continuous Learning",
    desc: "Actively learning AI tools, CRM platforms, and customer success frameworks to stay ahead of the curve.",
    gradient: "from-[rgba(168,216,234,0.06)] to-[rgba(168,216,234,0.02)]",
  },
  {
    icon: Sparkles,
    label: "Website Building",
    desc: "Crafting premium digital experiences through personal projects in web development and design.",
    gradient: "from-[rgba(196,181,253,0.06)] to-[rgba(196,181,253,0.02)]",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label"><Sparkles className="h-3 w-3" />About</span>
          <h2 className="section-title">
            Crafting experiences,<br />
            <span className="text-gradient-ice">delivering impact.</span>
          </h2>
          <p className="section-description mb-14">
            Customer Experience Specialist with 5+ years of experience in Customer Onboarding,
            Customer Success, Client Relationship Management, and Customer Lifecycle Management
            across EdTech, Real Estate, and Financial Services. Proven expertise in onboarding
            500+ learners, enhancing Customer satisfaction through proactive engagement, and
            building long-term relationships that drive retention and business growth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.035)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-500"
              >
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="h-4 w-4 text-[#a8d8ea]" />
                </div>
                <h3 className="text-sm font-medium mb-1.5">{item.label}</h3>
                <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-white/15 mt-8 max-w-xl text-center mx-auto"
        >
          Design, AI, and website building efforts are personal learning projects and explorations.
        </motion.p>
      </div>
    </section>
  );
}
