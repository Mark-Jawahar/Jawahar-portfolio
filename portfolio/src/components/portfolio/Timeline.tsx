"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";

const timelineEvents = [
  {
    year: "Present",
    title: "Assistant Team Lead",
    company: "Hello Mentor",
    description:
      "Leading customer experience strategy and a team of 10 executives to deliver exceptional service.",
  },
  {
    year: "2023",
    title: "Customer Success Lead",
    company: "Hello Mentor",
    description:
      "Drove customer onboarding, engagement, and retention initiatives.",
  },
  {
    year: "2022",
    title: "Customer Success Executive",
    company: "Hello Mentor",
    description:
      "Built foundation in customer success operations and relationship management.",
  },
  {
    year: "2021",
    title: "Career Start",
    company: "Customer Success",
    description:
      "Began professional journey in customer success and operations.",
  },
];

export function TimelineSection() {
  return (
    <section className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">
            <Clock className="h-3 w-3" />
            Career Timeline
          </span>
          <h2 className="section-title">My Journey</h2>
          <p className="section-description">
            A visual timeline of my professional growth and career progression.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563eb]/50 via-[#7c3aed]/30 to-transparent last:hidden" />
              <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#2563eb] bg-background" />

              <div className="glass rounded-2xl p-5 md:p-6 hover:border-[#2563eb]/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full">
                    {event.year}
                  </span>
                  <ChevronRight className="h-3 w-3 text-muted" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                <p className="text-sm text-[#2563eb] mb-2">{event.company}</p>
                <p className="text-sm text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
