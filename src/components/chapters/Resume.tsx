"use client";

import { useState } from "react";
import { Download, FileText, Check, Loader2 } from "lucide-react";
import { profile, skills, education } from "@/lib/resume-data";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function ResumeChapter() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
      const link = document.createElement("a");
      link.href = profile.resumeUrl;
      link.download = "Jawahar_A_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <section id="resume" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">06</span>
            <span>Resume</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <ScrollReveal delay={0.1}>
              <h2 className="chapter-title mb-3">
                Tools of the{" "}
                <span className="text-gradient-accent">Trade.</span>
              </h2>
              <p className="chapter-subtitle mb-8">
                A curated set of capabilities I bring to every customer experience challenge.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <ScrollReveal key={skill.category} delay={0.05 * i}>
                  <div className="glass-card p-4">
                    <h3 className="text-[0.65rem] font-semibold uppercase tracking-wider text-ice/70 mb-2.5">{skill.category}</h3>
                    <ul className="space-y-1.5">
                      {skill.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <span className="mt-[3px] w-1 h-1 rounded-full bg-cyan/30 flex-shrink-0" />
                          <span className="text-[0.68rem] text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:pt-16">
            <ScrollReveal delay={0.2} direction="right">
              <div className="glass-panel-strong p-6 mb-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted/60 mb-4">Education</h3>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                    <FileText size={14} className="text-cyan/60" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pearl">{education.degree}</p>
                    <p className="text-[0.7rem] text-muted mt-0.5">{education.college} &middot; {education.year} &middot; {education.location}</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-strong p-6">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted/60 mb-4">Updated {profile.resumeLastUpdated}</h3>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full btn-primary justify-center text-sm relative overflow-hidden"
                >
                  {downloading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Preparing...
                    </>
                  ) : downloaded ? (
                    <>
                      <Check size={14} />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Download Resume
                    </>
                  )}
                </button>
                <p className="text-[0.6rem] text-muted/60 text-center mt-2">PDF format &middot; Instant download</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
