"use client";

import { projects } from "@/lib/resume-data";
import ScrollReveal from "@/components/effects/ScrollReveal";

const categoryColors: Record<string, string> = {
  AI: "text-purple-300 border-purple-500/20 bg-purple-500/10",
  Automation: "text-emerald-300 border-emerald-500/20 bg-emerald-500/10",
  Design: "text-cyan-300 border-cyan-500/20 bg-cyan-500/10",
  CX: "text-amber-300 border-amber-500/20 bg-amber-500/10",
  Development: "text-blue-300 border-blue-500/20 bg-blue-500/10",
};

export default function ProjectsChapter() {
  return (
    <section id="projects" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">05</span>
            <span>Projects</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="chapter-title mb-4">
            Side Quests,{" "}
            <span className="text-gradient-accent">Big Ideas.</span>
          </h2>
          <p className="chapter-subtitle mb-10">
            Personal projects where curiosity meets craft. Each one taught me something I couldn&apos;t learn on the job.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.05 * i}>
              <div className="glass-card p-5 h-full group">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[0.65rem] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${categoryColors[project.category] || "text-muted border-white/10 bg-white/[0.03]"}`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-pearl mb-2 group-hover:text-gradient-accent transition-all duration-300">{project.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
