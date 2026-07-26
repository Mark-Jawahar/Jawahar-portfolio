"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Users, Target, MessageCircle, Lightbulb, TrendingUp, Heart } from "lucide-react";

const focusAreas = [
  { icon: Users, label: "Customer Experience" },
  { icon: Target, label: "Customer Success" },
  { icon: MessageCircle, label: "Communication" },
  { icon: Lightbulb, label: "Problem Solving" },
  { icon: TrendingUp, label: "Continuous Learning" },
  { icon: Heart, label: "Professional Growth" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.7_0.08_240_/_0.05),_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionBadge label="About Me" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-6">
              Who <span className="text-gradient font-semibold">I Am</span>
            </h2>
            <div className="space-y-4 text-white/40 leading-relaxed text-sm sm:text-base">
              <p>
                I am a Customer Experience Specialist based in Bengaluru with over 5 years of experience
                helping people navigate complex service journeys across EdTech, Real Estate, and Financial Services.
                My work sits at the intersection of empathy and process — understanding what customers need and
                building the systems to deliver it consistently.
              </p>
              <p>
                From onboarding 500+ learners onto an EdTech platform to managing 80+ concurrent property transactions
                in a high-velocity real estate marketplace, I have learned that great customer experience is not a
                department — it is a mindset. I take pride in being the person customers can rely on, whether they
                are signing up for a course, buying a home, or securing a loan.
              </p>
              <p>
                I believe in progress through process. By creating standardized onboarding workflows, maintaining
                meticulous CRM records, and collaborating across teams, I have helped turn fragmented customer journeys
                into seamless experiences. Every template I write, every escalation I resolve, and every insight I share
                is driven by one goal: making the customer feel seen, heard, and valued.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-3xl p-8 sm:p-10">
              <h3 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-8">
                Core Focus Areas
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {focusAreas.map((area, i) => (
                  <motion.div
                    key={area.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="flex flex-col items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                      <area.icon size={18} className="text-blue-300/80" />
                    </div>
                    <span className="text-sm text-white/70">{area.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
