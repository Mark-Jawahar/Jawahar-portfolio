"use client";

import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Mail, ExternalLink, MessageCircle, Download, ArrowUpRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/config/site";
import { Magnetic } from "@/components/shared/magnetic";
import { EASE } from "@/lib/motion";

const iconMap: Record<string, typeof Mail> = {
  mail: Mail,
  linkedin: ExternalLink,
  instagram: ExternalLink,
  whatsapp: MessageCircle,
};

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-36 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.06),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 sm:mb-24"
        >
          <SectionBadge label="Contact" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-6 leading-[1.08]">
            Let&apos;s{" "}
            <span className="text-gradient font-semibold">Connect</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Open to opportunities, collaborations, and conversations around customer experience and success.
          </p>
        </motion.div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
            {socialLinks
              .filter((l) => l.active)
              .map((link) => {
                const Icon = iconMap[link.icon] || ExternalLink;
                return (
                  <motion.a
                    key={link.id}
                    variants={cardItem}
                    href={link.url}
                    target={link.id !== "email" ? "_blank" : undefined}
                    rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                    className="group glass rounded-2xl p-5 sm:p-6 flex items-center gap-4 glass-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-blue-500/20 group-hover:border-blue-400/30 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon
                        size={18}
                        className="text-blue-300/80 group-hover:text-blue-200/90 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/40 tracking-wider uppercase mb-0.5 group-hover:text-white/60 transition-colors">
                        {link.label}
                      </p>
                      <p className="text-sm text-white/80 truncate">
                        {link.platform}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-white/20 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    />
                  </motion.a>
                );
              })}
          </div>

          <motion.div
            variants={cardItem}
            className="text-center"
          >
            <Magnetic strength={0.2}>
              <a
                href={siteConfig.resumeUrl}
                download
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Download
                  size={16}
                  className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform"
                />
                Download Resume
                <span className="text-white/20 group-hover:text-white/40 transition-colors">
                  PDF
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
