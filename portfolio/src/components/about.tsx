"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "./section-badge";
import { Users, Target, Heart, Lightbulb, TrendingUp, MessageCircle } from "lucide-react";

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
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionBadge label="About Me" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-6">
              Who <span className="text-gradient font-semibold">I Am</span>
            </h2>
            <div className="space-y-4 text-white/40 leading-relaxed text-sm sm:text-base">
              <p>
                A Customer Experience Specialist with over 5 years of experience across EdTech, Real Estate, and Financial Services. I have a proven track record of onboarding 500+ learners, enhancing customer satisfaction through proactive engagement, and delivering seamless customer experiences.
              </p>
              <p>
                My expertise lies in Customer Onboarding, Customer Success, Client Relationship Management, and Customer Lifecycle Management. I am passionate about understanding customer needs, resolving complex issues, and building long-term relationships that drive retention and business growth.
              </p>
              <p>
                Skilled in CRM tools like Zoho Suite, cross-functional collaboration, and process improvement, I bring a customer-centric approach to every interaction. I thrive on continuous learning and am dedicated to elevating every customer journey.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
