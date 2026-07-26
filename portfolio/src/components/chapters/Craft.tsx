"use client";

import {
  Users,
  BarChart3,
  Wrench,
  Globe,
  Brain,
  GraduationCap,
} from "lucide-react";
import { ScrollReveal, FadeIn } from "@/components/effects/ScrollReveal";
import { skills, projects } from "@/lib/resume-data";

const iconMap: Record<string, React.ElementType> = {
  Users,
  BarChart3,
  Wrench,
  Globe,
  Brain,
  GraduationCap,
};

export function Craft() {
  return (
    <section id="craft" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">05</span>
            Craft
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mt-8">Skills &amp; explorations</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="chapter-subtitle mt-4">
            A comprehensive toolkit built over 5+ years of delivering customer
            success, plus personal projects in design, AI, and product thinking.
          </p>
        </ScrollReveal>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || Users;
            return (
              <FadeIn key={skill.category} delay={0.15 + i * 0.06}>
                <div className="glass-card p-5 h-full">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#a8d8ea]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#f5f5f7]">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="tag-pill text-[0.65rem]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Projects */}
        <ScrollReveal delay={0.3}>
          <h3 className="text-lg font-semibold text-[#f5f5f7] mt-14 mb-1">
            Personal Projects
          </h3>
          <p className="text-sm text-[#8e8e93] mb-8">
            Design, AI, and website building efforts are personal learning
            projects and explorations.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={0.2 + i * 0.08}>
              <div className="glass-card p-5 h-full flex flex-col">
                <h4 className="text-sm font-medium text-[#f5f5f7] mb-2">
                  {project.title}
                </h4>
                <p className="text-xs text-[#8e8e93] leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill text-[0.6rem]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
