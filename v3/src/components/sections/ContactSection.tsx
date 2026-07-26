"use client";

import { useState } from "react";
import { Send, Check, Loader2, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { FadeReveal } from "@/components/effects/FadeReveal";
import { GlassCard } from "@/components/effects/GlassCard";
import { personalInfo } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    await new Promise((r) => setTimeout(r, 1200));

    const whatsappMsg = encodeURIComponent(
      `Hi Jawahar,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nReason: ${form.reason}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}?text=${whatsappMsg}`, "_blank");

    setState("idle");
    setForm(initialForm);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="aurora-bg relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-soft-cyan/15 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-soft-lavender/15 rounded-full blur-[120px]" />

      <div className="section-container">
        <FadeReveal>
          <span className="chapter-label mb-5 block">Chapter 08</span>
        </FadeReveal>

        <FadeReveal delay={0.15}>
          <h2 className="section-heading mb-4">
            <span className="text-gradient">Let&apos;s Build</span>{" "}
            <span className="text-gradient-accent">Together</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <p className="section-description mb-10">
            Have a project, opportunity, or just want to connect? Reach out and let&apos;s create something meaningful.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-5 gap-5 lg:gap-6 max-w-5xl mx-auto">
          <div className="md:col-span-2 space-y-3">
            {[
              { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: personalInfo.location },
              { icon: MessageCircle, label: "WhatsApp", value: personalInfo.whatsapp, href: `https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}` },
            ].map((item, i) => (
              <GlassCard key={i} delay={0.2 + i * 0.08} hover={false} padding="md">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 group">
                    <div className="w-9 h-9 rounded-full glass flex items-center justify-center shrink-0 group-hover:glass-hover transition-all duration-400">
                      <item.icon size={14} className="text-accent-pearl/70" />
                    </div>
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-wider text-white-subtle/60">{item.label}</p>
                      <p className="text-sm text-white-soft/80 mt-0.5">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full glass flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-accent-pearl/70" />
                    </div>
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-wider text-white-subtle/60">{item.label}</p>
                      <p className="text-sm text-white-soft/80 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          <div className="md:col-span-3">
            <GlassCard hover={false} padding="lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="input-base"
                    />
                    {errors.name && <p className="text-xs text-error mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="input-base"
                    />
                    {errors.email && <p className="text-xs text-error mt-1.5 ml-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="input-base"
                  />
                  <input
                    type="text"
                    placeholder="Reason"
                    value={form.reason}
                    onChange={(e) => updateField("reason", e.target.value)}
                    className="input-base"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    placeholder="Message *"
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="input-base resize-none min-h-[100px]"
                  />
                  {errors.message && <p className="text-xs text-error mt-1.5 ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className="btn-primary rounded-xl px-8 py-3 text-sm flex items-center gap-2.5 w-full justify-center disabled:cursor-not-allowed"
                >
                  {state === "idle" && (
                    <span className="flex items-center gap-2.5">
                      <Send size={14} />
                      Send Message
                    </span>
                  )}
                  {state === "sending" && (
                    <span className="flex items-center gap-2.5">
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </span>
                  )}
                  {state === "success" && (
                    <span className="flex items-center gap-2.5">
                      <Check size={14} className="text-accent-pearl" />
                      Message Sent!
                    </span>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
