"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
    await new Promise((r) => setTimeout(r, 1000));

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
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-ice/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-white-muted mb-4 block">
            Chapter 08
          </span>
        </FadeReveal>

        <FadeReveal delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">Let's Build</span>{" "}
            <span className="text-gradient-accent">Together</span>
          </h2>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <p className="text-white-muted max-w-xl mb-12">
            Have a project, opportunity, or just want to connect? Reach out and let's create something meaningful.
          </p>
        </FadeReveal>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: personalInfo.location },
              { icon: MessageCircle, label: "WhatsApp", value: personalInfo.whatsapp, href: `https://wa.me/${personalInfo.whatsapp.replace(/[+\s]/g, "")}` },
            ].map((item, i) => (
              <GlassCard key={i} delay={0.3 + i * 0.1} hover={false}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <item.icon size={16} className="text-accent-ice" />
                    <div>
                      <p className="text-xs text-white-subtle">{item.label}</p>
                      <p className="text-sm text-white-soft">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-accent-ice" />
                    <div>
                      <p className="text-xs text-white-subtle">{item.label}</p>
                      <p className="text-sm text-white-soft">{item.value}</p>
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          <div className="md:col-span-3">
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-white-soft placeholder-white-subtle focus:outline-none focus:border-accent-ice/50 transition-colors"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-white-soft placeholder-white-subtle focus:outline-none focus:border-accent-ice/50 transition-colors"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-white-soft placeholder-white-subtle focus:outline-none focus:border-accent-ice/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Reason"
                    value={form.reason}
                    onChange={(e) => updateField("reason", e.target.value)}
                    className="w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-white-soft placeholder-white-subtle focus:outline-none focus:border-accent-ice/50 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    placeholder="Message *"
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-white-soft placeholder-white-subtle focus:outline-none focus:border-accent-ice/50 transition-colors resize-none"
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className="glass rounded-xl px-6 py-3 text-sm text-white-soft hover:glass-hover transition-all duration-300 flex items-center gap-2 disabled:opacity-80 w-full justify-center"
                >
                  {state === "idle" && (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                  {state === "sending" && (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  )}
                  {state === "success" && (
                    <>
                      <Check size={16} className="text-accent-cyan" />
                      Message Sent!
                    </>
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
