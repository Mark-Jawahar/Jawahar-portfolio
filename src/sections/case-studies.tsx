"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { useModalLock } from "@/hooks/use-modal-lock";
import { EASE } from "@/lib/motion";

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

interface CaseStudyModalProps {
  study: CaseStudy;
  onClose: () => void;
}

function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useModalLock(onClose, panelRef);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-[9999] flex flex-col sm:items-center sm:justify-center bg-black/70"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
        className="relative flex flex-col w-full h-full
                   sm:h-auto sm:max-h-[90vh] sm:rounded-2xl
                   overflow-hidden glass-panel bg-black"
        style={{ maxWidth: "min(85vw, 820px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header — stays visible while content scrolls */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-xs text-graphite uppercase tracking-wider truncate">
              {study.category}
            </p>
            <p className="text-sm text-silver truncate">{study.company}</p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-graphite hover:text-white hover:bg-white/10 active:scale-90 transition-all shrink-0"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto modal-scroll">
          <div className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
            <div className="mx-auto" style={{ maxWidth: "640px" }}>
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-6 leading-snug">
                {study.title}
              </h2>

              <ModalSection title="Challenge">
                <p className="text-[15px] text-silver/85 leading-[1.9]">
                  {study.challenge}
                </p>
              </ModalSection>

              <ModalSection title="Situation">
                <p className="text-[15px] text-silver/85 leading-[1.9]">
                  {study.situation}
                </p>
              </ModalSection>

              <ModalSection title="Actions Taken">
                <ul className="space-y-2.5">
                  {study.actions.map((action, i) => (
                    <li
                      key={i}
                      className="text-[15px] text-silver/85 leading-[1.85] pl-5 relative"
                    >
                      <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-accent/60" />
                      {action}
                    </li>
                  ))}
                </ul>
              </ModalSection>

              <ModalSection title="Tools Used">
                <div className="flex flex-wrap gap-2">
                  {study.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-silver/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </ModalSection>

              <ModalSection title="Collaboration">
                <p className="text-[15px] text-silver/85 leading-[1.9]">
                  {study.collaboration}
                </p>
              </ModalSection>

              <div className="rounded-xl bg-accent/10 border border-accent/25 p-5 sm:p-6 my-6">
                <p className="text-xs font-medium text-accent-bright uppercase tracking-wider mb-2">
                  Result
                </p>
                <p className="text-[15px] text-silver/90 leading-[1.9]">
                  {study.result}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 mb-4">
                <p className="text-xs font-medium text-graphite uppercase tracking-wider mb-2">
                  Key Learnings
                </p>
                <p className="text-[15px] text-silver/80 leading-[1.9] italic">
                  {study.learnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

function ModalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <h3 className="text-[11px] font-semibold text-graphite uppercase tracking-[0.12em] mb-3">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function CaseStudies() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <section id="case-studies" className="relative py-24 sm:py-36 lg:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.72_0.06_250_/_0.04),_transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-16 sm:mb-20"
          >
            <SectionBadge label="Selected Work" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-6 leading-[1.08]">
              Selected{" "}
              <span className="text-gradient font-semibold">Case Studies</span>
            </h2>
            <p className="text-silver/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A look at how I approach customer experience — from onboarding
              scale to high-volume operations.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-4 sm:gap-6"
          >
            {caseStudies.map((study) => (
              <LiquidGlassCard
                key={study.id}
                as="button"
                variants={gridItem}
                onClick={() => setSelected(study)}
                className={
                  study.id === "crm-process-optimization"
                    ? "text-left rounded-2xl p-6 sm:p-8 md:col-span-2"
                    : "text-left rounded-2xl p-6 sm:p-8"
                }
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-graphite uppercase tracking-wider mb-2">
                        {study.company} · {study.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                        {study.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-graphite group-hover:text-accent-bright transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    />
                  </div>
                  <p className="text-sm text-silver/70 leading-relaxed mt-3 mb-5">
                    {study.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent-bright/80 group-hover:text-accent-bright transition-colors mt-auto">
                    View Case Study
                    <ArrowRight size={14} />
                  </span>
                </div>
              </LiquidGlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal study={selected} onClose={close} />
        )}
      </AnimatePresence>
    </>
  );
}
