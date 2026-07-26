"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Mail, ExternalLink, MessageCircle, Download, ArrowUpRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/config/site";

const iconMap: Record<string, typeof Mail> = {
  mail: Mail,
  linkedin: ExternalLink,
  instagram: ExternalLink,
  whatsapp: MessageCircle,
};

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.7_0.08_240_/_0.06),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge label="Contact" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
            Let&apos;s <span className="text-gradient font-semibold">Connect</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Open to opportunities, collaborations, and conversations around customer experience and success.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {socialLinks.filter((l) => l.active).map((link, i) => {
              const Icon = iconMap[link.icon] || ExternalLink;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target={link.id !== "email" ? "_blank" : undefined}
                  rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group glass rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:bg-white/[0.08] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Icon size={18} className="text-blue-300/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 tracking-wider uppercase mb-0.5">{link.label}</p>
                    <p className="text-sm text-white/80 truncate">{link.platform}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <a
              href={siteConfig.resumeUrl}
              download
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Download size={16} className="group-hover:scale-110 transition-transform" />
              Download Resume
              <span className="text-white/20 group-hover:text-white/40 transition-colors">PDF</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
