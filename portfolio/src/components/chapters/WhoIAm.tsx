"use client";

import { Route, Brain, Workflow, Bot } from "lucide-react";
import { ScrollReveal, FadeIn } from "@/components/effects/ScrollReveal";
import { profile } from "@/lib/resume-data";

const highlights = [
  {
    icon: Route,
    title: "Customer Journey",
    desc: "End-to-end lifecycle management — onboarding 500+ learners to proactive check-ins and renewals.",
  },
  {
    icon: Brain,
    title: "Leadership & Growth",
    desc: "Promoted to Assistant Team Lead within 18 months. Coaching teams and building scalable processes.",
  },
  {
    icon: Workflow,
    title: "Process Improvement",
    desc: "Created onboarding playbooks that cut repeat contacts by 30% and saved 15+ hours weekly.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "Exploring prompt engineering and AI workflows to enhance customer experience.",
  },
];

export function WhoIAm() {
  return (
    <section id="profile" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">02</span>
            Who I Am
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 mt-8">
          {/* Portrait card */}
          <ScrollReveal className="md:col-span-2" delay={0.15}>
            <div className="glass-panel-strong p-5 sm:p-6 md:p-8 text-center">
              <div className="relative w-[120px] h-[120px] mx-auto mb-5">
                <div className="portrait-frame w-full h-full">
                  <div className="portrait-glow" />
                  <img
                    src="/profile-pic.png"
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        "brightness(1.02) contrast(0.92) saturate(1.04)",
                    }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#f5f5f7]">
                {profile.name}
              </h3>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.1}>
              <h2 className="chapter-title">Who I Am</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="chapter-subtitle mt-6">{profile.about}</p>
            </ScrollReveal>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 mt-8">
              {highlights.map((h, i) => (
                <FadeIn key={h.title} delay={0.3 + i * 0.1}>
                  <div className="glass-card p-5">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center mb-3">
                      <h.icon className="w-4 h-4 text-[#a8d8ea]" aria-hidden="true" />
                    </div>
                    <h4 className="text-sm font-medium text-[#f5f5f7] mb-2">
                      {h.title}
                    </h4>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
