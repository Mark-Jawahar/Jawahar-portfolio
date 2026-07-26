"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Check,
  Loader2,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { profile } from "@/lib/resume-data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const reasons = [
  "Job Opportunity",
  "Collaboration",
  "Feedback",
  "Other",
];

export function ConnectChapter() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setState("sending");
      await new Promise((r) => setTimeout(r, 1200));

      const whatsappMessage = encodeURIComponent(
        `*New Inquiry from ${profile.name}'s Portfolio*%0A%0A` +
          `*Name:* ${form.name}%0A` +
          `*Email:* ${form.email}%0A` +
          `${form.phone ? `*Phone:* ${form.phone}%0A` : ""}` +
          `${form.reason ? `*Reason:* ${form.reason}%0A` : ""}` +
          `*Message:* ${form.message}`
      );

      setState("success");
      setTimeout(() => {
        window.open(
          `https://wa.me/919620151434?text=${whatsappMessage}`,
          "_blank"
        );
        setState("idle");
        setForm({ name: "", email: "", phone: "", reason: "", message: "" });
      }, 1500);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form]
  );

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder:text-[#8e8e93] focus:outline-none focus:border-[rgba(168,216,234,0.3)] focus:bg-[rgba(168,216,234,0.03)] transition-all duration-300";

  return (
    <section id="connect" className="chapter-section">
      <div className="chapter-container">
        <ScrollReveal>
          <div className="chapter-label">
            <span className="chapter-number">07</span>
            Connect
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 mt-8">
          {/* Info */}
          <ScrollReveal className="md:col-span-2" delay={0.1}>
            <h2 className="chapter-title">Let&apos;s build together</h2>
            <p className="chapter-subtitle mt-4">
              Whether you have a project in mind, a role to discuss, or just
              want to connect — I&apos;d love to hear from you.
            </p>

            <div className="space-y-4 mt-8">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-[#8e8e93] hover:text-[#f5f5f7] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#a8d8ea]" />
                </div>
                <span>{profile.email}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-[#8e8e93]">
                <div className="w-9 h-9 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#a8d8ea]" />
                </div>
                <span>{profile.location}</span>
              </div>

              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-sm text-[#8e8e93] hover:text-[#f5f5f7] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[rgba(168,216,234,0.06)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#a8d8ea]" />
                </div>
                <span>{profile.phone}</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal className="md:col-span-3" delay={0.2}>
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  className="glass-panel-strong p-10 md:p-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[rgba(168,216,234,0.1)] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-[#a8d8ea]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[#8e8e93]">
                    Redirecting to WhatsApp...
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-panel-strong p-5 sm:p-6 md:p-8 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`${inputClass} ${errors.name ? "border-red-400/30" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400/70 mt-1 ml-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`${inputClass} ${errors.email ? "border-red-400/30" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400/70 mt-1 ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClass}
                    />
                    <select
                      value={form.reason}
                      onChange={(e) => updateField("reason", e.target.value)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select Reason
                      </option>
                      {reasons.map((r) => (
                        <option key={r} value={r} className="bg-[#090909]">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Your Message *"
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={`${inputClass} resize-none ${errors.message ? "border-red-400/30" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400/70 mt-1 ml-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="btn-primary w-full justify-center relative overflow-hidden"
                    onClick={handleRipple}
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send via WhatsApp
                      </>
                    )}
                    {ripples.map((r) => (
                      <span
                        key={r.id}
                        className="btn-ripple"
                        style={{ left: r.x, top: r.y, width: 10, height: 10 }}
                      />
                    ))}
                  </button>

                  <p className="text-[0.65rem] text-[#8e8e93] text-center">
                    Your details will be shared via WhatsApp. No data is stored.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
