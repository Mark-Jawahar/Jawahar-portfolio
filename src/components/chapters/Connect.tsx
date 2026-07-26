"use client";

import { useState } from "react";
import { Send, Check, ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { profile } from "@/lib/resume-data";
import ScrollReveal from "@/components/effects/ScrollReveal";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4l-10 7L2 4" />
  </svg>
);

export default function Connect() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      const text = `Hi Jawahar!%0A%0A${form.message}%0A%0ABest,%0A${form.name} (${form.email})`;
      window.open(`https://wa.me/919620151434?text=${text}`, "_blank");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 2000);
    }, 1000);
  };

  return (
    <section id="connect" className="chapter-section relative z-10">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label mb-6">
            <span className="chapter-number">07</span>
            <span>Connect</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <ScrollReveal delay={0.1}>
              <h2 className="chapter-title mb-3">
                Let&apos;s Build{" "}
                <span className="text-gradient-accent">Together.</span>
              </h2>
              <p className="chapter-subtitle mb-6">
                Whether you have a project in mind, a role to discuss, or just want to connect —
                I&apos;d love to hear from you.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 glass-card p-3.5 group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                    <MailIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.65rem] font-medium text-muted">Email</p>
                    <p className="text-xs text-pearl truncate">{profile.email}</p>
                  </div>
                  <ArrowRight size={12} className="text-muted/40 group-hover:text-cyan/60 transition-colors" />
                </a>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-card p-3.5 group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                    <MessageCircle size={14} className="text-emerald-400/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.65rem] font-medium text-muted">WhatsApp</p>
                    <p className="text-xs text-pearl truncate">{profile.phone}</p>
                  </div>
                  <ArrowRight size={12} className="text-muted/40 group-hover:text-emerald-400/60 transition-colors" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-card p-3.5 group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                    <LinkedinIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.65rem] font-medium text-muted">LinkedIn</p>
                    <p className="text-xs text-pearl truncate">{profile.linkedinDisplay}</p>
                  </div>
                  <ArrowRight size={12} className="text-muted/40 group-hover:text-blue-400/60 transition-colors" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-3">
            <ScrollReveal delay={0.2} direction="right">
              <div className="glass-panel-strong p-6 md:p-8">
                <h3 className="text-sm font-semibold text-pearl mb-1">Send a Message</h3>
                <p className="text-[0.7rem] text-muted mb-6">
                  I&apos;ll respond within 24 hours.
                </p>

                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Check size={24} className="text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-pearl">Message sent!</p>
                    <p className="text-[0.7rem] text-muted mt-1">You&apos;ll be redirected to WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-[0.65rem] font-medium text-muted block mb-1.5">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-xs text-pearl placeholder:text-muted/40 focus:outline-none focus:border-cyan/30 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-[0.65rem] font-medium text-muted block mb-1.5">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-xs text-pearl placeholder:text-muted/40 focus:outline-none focus:border-cyan/30 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="text-[0.65rem] font-medium text-muted block mb-1.5">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-xs text-pearl placeholder:text-muted/40 focus:outline-none focus:border-cyan/30 transition-colors resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full btn-primary justify-center text-sm relative overflow-hidden"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send via WhatsApp
                        </>
                      )}
                    </button>
                    <p className="text-[0.55rem] text-muted/40 text-center">
                      Your message will be sent through WhatsApp. No data is stored.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
