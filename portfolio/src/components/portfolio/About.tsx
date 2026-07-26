"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart, Brain, Workflow, Bot, Palette, Route, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Route, label: "Customer Journey",
    desc: "End-to-end lifecycle management — onboarding 500+ learners to proactive check-ins and renewals.",
    gradient: "from-[rgba(196,181,253,0.06)] to-[rgba(196,181,253,0.02)]",
  },
  {
    icon: Brain, label: "Leadership & Growth",
    desc: "Promoted to Assistant Team Lead within 18 months. Coaching teams and building scalable processes.",
    gradient: "from-[rgba(167,243,208,0.06)] to-[rgba(167,243,208,0.02)]",
  },
  {
    icon: Workflow, label: "Process Improvement",
    desc: "Created onboarding playbooks that cut repeat contacts by 30% and saved 15+ hours weekly.",
    gradient: "from-[rgba(168,216,234,0.06)] to-[rgba(168,216,234,0.02)]",
  },
  {
    icon: Bot, label: "AI & Automation",
    desc: "Exploring prompt engineering and AI workflows to enhance customer experience.",
    gradient: "from-[rgba(196,181,253,0.06)] to-[rgba(196,181,253,0.02)]",
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
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
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl">
          {/* Photo storytelling card */}
          <motion.div
            className="lg:col-span-2 sticky lg:top-32"
            style={{ y: imgParallax }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale: imgScale }}
              className="relative group"
            >
              {/* Main portrait */}
              <div className="relative rounded-3xl overflow-hidden glass-apple-strong">
                <div className="aspect-[3/4] relative">
                  <img
                    src="/about-portrait.jpg"
                    alt="Jawahar A — Customer Experience Specialist"
                    className="w-full h-full object-cover img-apple-portrait"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.6)] via-transparent to-[rgba(5,5,5,0.15)]" />
                </div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-medium tracking-widest text-white/40 uppercase"
                  >
                    Bengaluru, Karnataka
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                    className="text-2xl font-semibold tracking-tight mt-1"
                  >
                    Jawahar A
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.16 }}
                    className="text-sm text-white/40 mt-1"
                  >
                    Assistant Team Lead @ Hello Mentor
                  </motion.p>
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-[2rem] border border-[rgba(168,216,234,0.06)] -z-10" />
              <div className="absolute -inset-6 rounded-[2.5rem] border border-[rgba(196,181,253,0.03)] -z-20" />
            </motion.div>
          </motion.div>

          {/* Highlights + description */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-white/30 leading-relaxed"
            >
              Customer Experience Specialist with 5+ years of experience in Customer Onboarding,
              Customer Success, Client Relationship Management, and Customer Lifecycle Management
              across EdTech, Real Estate, and Financial Services. Proven expertise in onboarding
              500+ learners, enhancing satisfaction through proactive engagement, and
              building long-term relationships that drive retention and business growth.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group rounded-2xl p-4 glass-premium"
                  >
                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="h-4 w-4 text-[#a8d8ea]" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">{item.label}</h3>
                    <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] text-white/15"
            >
              Design, AI, and website building efforts are personal learning projects and explorations.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
