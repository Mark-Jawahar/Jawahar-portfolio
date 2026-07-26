"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Briefcase, GraduationCap, ChevronDown, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

function ExpandableCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const isEducation = exp.type === "education";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative pl-14 sm:pl-20"
    >
      <div
        className={cn(
          "absolute left-0 top-1 w-12 sm:w-16 h-12 sm:h-16 rounded-xl flex items-center justify-center border",
          isEducation
            ? "bg-emerald-500/10 border-emerald-400/20"
            : "bg-blue-500/10 border-blue-400/20"
        )}
      >
        {isEducation ? (
          <GraduationCap size={18} className="text-emerald-300/80" />
        ) : (
          <Briefcase size={18} className="text-blue-300/80" />
        )}
      </div>

      <div
        className={cn(
          "glass rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-pointer",
          isOpen ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-base sm:text-lg">{exp.title}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <p className="text-white/50 text-sm">{exp.company}</p>
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <MapPin size={10} className="shrink-0 text-blue-300/50" />
                {exp.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-white/30 font-mono whitespace-nowrap">
              <Calendar size={10} className="shrink-0" />
              {exp.period}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <ChevronDown size={16} className="text-white/30" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/30 leading-relaxed mt-4 mb-4 border-t border-white/5 pt-4">
                {exp.description}
              </p>
              {exp.achievements.length > 0 && (
                <ul className="space-y-2.5">
                  {exp.achievements.map((achievement, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05, duration: 0.3 }}
                      className="flex items-start gap-3 text-white/40 text-sm leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-blue-400/40 shrink-0" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.7_0.08_240_/_0.03),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Journey" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6">
            Professional <span className="text-gradient font-semibold">Path</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-blue-400/10 to-transparent" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, i) => (
              <ExpandableCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
