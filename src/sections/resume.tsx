"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Download, MapPin, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";

const categories = Array.from(new Set(skills.map((s) => s.category)));

export function Resume() {
  const timeline = experiences.map((e) => ({
    period: e.period,
    role: e.title,
    company: e.company,
  }));

  return (
    <section id="resume" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.7_0.08_240_/_0.04),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Resume" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6">
            Executive <span className="text-gradient font-semibold">Profile</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-3xl p-6 sm:p-8 h-full flex flex-col">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 mb-6">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <h3 className="text-xl font-medium text-white mb-1">{siteConfig.name}</h3>
              <p className="text-sm text-white/50 mb-4">{siteConfig.role}</p>

              <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
                <MapPin size={12} className="shrink-0 text-blue-300/60" />
                {siteConfig.location}
              </div>

              <p className="text-sm text-white/40 leading-relaxed mb-6">
                Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, and Client Relationship Management across EdTech, Real Estate, and Financial Services.
              </p>

              <div className="mt-auto">
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300/90 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300"
                >
                  <Download size={15} className="group-hover:scale-110 transition-transform" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                Experience Timeline
              </h3>
              <div className="space-y-4 mb-8">
                {timeline.map((item) => (
                  <div
                    key={`${item.company}-${item.period}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                      <ChevronRight size={14} className="text-blue-300/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 truncate">{item.role}</p>
                      <p className="text-xs text-white/40 truncate">{item.company}</p>
                    </div>
                    <span className="text-[11px] text-white/30 font-mono shrink-0">{item.period}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                Skills & Expertise
              </h3>
              <div className="space-y-5">
                {categories.map((category) => (
                  <div key={category}>
                    <p className="text-xs text-white/40 mb-2.5">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter((s) => s.category === category)
                        .map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 transition-colors"
                          >
                            {skill.name}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
