"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Calendar, ChevronDown, Send, Check, Loader2 } from "lucide-react";
import { profile } from "@/lib/resume-data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  timestamp: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  reason?: string;
  message?: string;
  honeypot?: string;
}

const contactReasons = [
  { value: "Hiring Opportunity", icon: "💼" },
  { value: "Freelance Project", icon: "⚡" },
  { value: "Collaboration", icon: "🤝" },
  { value: "General Inquiry", icon: "📋" },
  { value: "Networking", icon: "🌐" },
  { value: "Other", icon: "✨" },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = sessionStorage.getItem("contactFormData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          reason: "",
          message: "",
          timestamp: new Date().toLocaleString(),
        };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = "Your message is preparing. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitting]);

  useEffect(() => {
    sessionStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  const validateField = useCallback((name: string, value: string): string | undefined => {
    if (name === "name" && !value.trim()) return "Please enter your full name.";
    if (name === "name" && value.trim().length < 2) return "Name must be at least 2 characters.";
    if (name === "email" && !value.trim()) return "Please enter your email address.";
    if (name === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim())) return "Please enter a valid email address.";
    if (name === "phone" && !value.trim()) return "Please enter your phone number.";
    if (name === "phone" && !/^[+]?\d{1,3}[\s\-]?\d{10,}$/.test(value.trim())) return "Please enter a valid phone number with country code.";
    if (name === "reason" && !value) return "Please select a reason for contact.";
    if (name === "message" && !value.trim()) return "Message cannot be empty.";
    if (name === "message" && value.trim().length < 10) return "Message must be at least 10 characters.";

    return undefined;
  }, []);

      const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    const honeypot = (document.querySelector("#contact-honeypot") as HTMLInputElement)?.value || "";

    if (honeypot) newErrors.honeypot = "Spam detected.";

    Object.keys(formData).forEach((key) => {
      if (key === "honeypot") return;
      const fieldKey = key as keyof FormData;
      if (fieldKey === "timestamp") return;
      const error = validateField(fieldKey, formData[fieldKey]);
      if (error) (newErrors as any)[fieldKey] = error;
    });

    return newErrors;
  }, [formData, validateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const timeoutId = setTimeout(() => setIsSubmitting(false), 5000);

    const encodedMessage = encodeURIComponent(
      `👋 New Portfolio Inquiry\n\nName:\n${formData.name}\n\nEmail:\n${formData.email}\n\nPhone:\n${formData.phone}\n\nReason:\n${formData.reason}\n\nMessage:\n${formData.message}\n\nSubmitted from:\n${window.location.origin}\n\nTime:\n${formData.timestamp}`
    );

    const whatsappUrl = `https://wa.me/${profile.whatsapp.replace("https://wa.me/", "")}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowHelper(true);
      setTimeout(() => setShowHelper(false), 5000);
      setTimeout(() => setIsSubmitted(false), 3000);
      sessionStorage.removeItem("contactFormData");
    }, 1200);
  };

  return (
    <section id="contact" className="relative z-10 py-[clamp(3rem,5vw,5rem)] px-4 md:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[clamp(1.4rem,2.3vw,2rem)] font-semibold tracking-tight text-white/90 leading-[1.15]">
            Let's Build Together
          </h2>
          <p className="mt-2 text-[clamp(0.7rem,0.9vw,0.8rem)] text-white/30 max-w-[42ch] mx-auto leading-relaxed">
            Ready to collaborate? Let&apos;s discuss how we can create something remarkable together.
          </p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-panel-strong p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label htmlFor="contact-name" className="sr-only">Full Name</label>
              <div className="relative">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFieldFocus("name")}
                  onBlur={() => setFieldFocus(null)}
                  className={`w-full bg-white/[0.04] border ${errors.name ? "border-red-400/50" : fieldFocus === "name" ? "border-cyan/50" : "border-white/6" } rounded-xl px-4 py-3.5 text-sm text-pearl placeholder:text-muted/40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan/30 focus:bg-white/[0.06] ${errors.name ? "animate-shake" : ""}`}
                  placeholder="Full Name *"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40" />
              </div>
              {errors.name && (
                <p id="contact-name-error" className="text-[0.65rem] text-red-400 mt-1.5 ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="contact-email" className="sr-only">Email Address</label>
              <div className="relative">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFieldFocus("email")}
                  onBlur={() => setFieldFocus(null)}
                  className={`w-full bg-white/[0.04] border ${errors.email ? "border-red-400/50" : fieldFocus === "email" ? "border-cyan/50" : "border-white/6" } rounded-xl px-4 py-3.5 text-sm text-pearl placeholder:text-muted/40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan/30 focus:bg-white/[0.06] ${errors.email ? "animate-shake" : ""}`}
                  placeholder="Email Address *"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                <Mail size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40" />
              </div>
              {errors.email && (
                <p id="contact-email-error" className="text-[0.65rem] text-red-400 mt-1.5 ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
              <div className="relative">
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFieldFocus("phone")}
                  onBlur={() => setFieldFocus(null)}
                  className={`w-full bg-white/[0.04] border ${errors.phone ? "border-red-400/50" : fieldFocus === "phone" ? "border-cyan/50" : "border-white/6" } rounded-xl px-4 py-3.5 text-sm text-pearl placeholder:text-muted/40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan/30 focus:bg-white/[0.06] ${errors.phone ? "animate-shake" : ""}`}
                  placeholder="Phone Number *"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                />
                <Phone size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40" />
              </div>
              {errors.phone && (
                <p id="contact-phone-error" className="text-[0.65rem] text-red-400 mt-1.5 ml-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="contact-reason" className="sr-only">Reason for Contact</label>
              <div className="relative">
                <select
                  id="contact-reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  onFocus={() => setFieldFocus("reason")}
                  onBlur={() => setFieldFocus(null)}
                  className={`w-full appearance-none bg-white/[0.04] border ${errors.reason ? "border-red-400/50" : fieldFocus === "reason" ? "border-cyan/50" : "border-white/6" } rounded-xl px-4 py-3.5 pr-10 text-sm text-pearl transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan/30 focus:bg-white/[0.06] ${errors.reason ? "animate-shake" : ""}`}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? "contact-reason-error" : undefined}
                >
                  <option value="" className="bg-background">
                    Reason for Contact *
                  </option>
                  {contactReasons.map((reason) => (
                    <option key={reason.value} value={reason.value} className="bg-background">
                      {reason.value}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
              </div>
              {errors.reason && (
                <p id="contact-reason-error" className="text-[0.65rem] text-red-400 mt-1.5 ml-1">
                  {errors.reason}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 relative">
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFieldFocus("message")}
                onBlur={() => setFieldFocus(null)}
                rows={4}
                className={`w-full bg-white/[0.04] border ${errors.message ? "border-red-400/50" : fieldFocus === "message" ? "border-cyan/50" : "border-white/6" } rounded-xl px-4 py-3.5 text-sm text-pearl placeholder:text-muted/40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan/30 focus:bg-white/[0.06] resize-none ${errors.message ? "animate-shake" : ""}`}
                placeholder="Message *"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-[0.65rem] text-red-400 mt-1.5 ml-1">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 relative">
              <label htmlFor="contact-honeypot" className="sr-only">
                Leave this field empty
              </label>
              <input
                id="contact-honeypot"
                name="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />
            </div>

            <AnimatePresence>
              {showHelper && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="sm:col-span-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4"
                >
                  <p className="text-[0.7rem] text-emerald-400 text-center">
                    Your message has been prepared in WhatsApp. Simply tap Send to complete your inquiry.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted || Object.keys(errors).length > 0}
              className={`relative overflow-hidden w-full rounded-xl px-5 py-4 text-sm font-medium transition-all duration-500 disabled:cursor-not-allowed ${isSubmitting ? "scale-[0.98]" : "hover:scale-[1.02]"} ${isSubmitted ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-pearl text-background hover:bg-white"}`}
            >
              {isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={14} />
                  <span>Sending to WhatsApp...</span>
                </span>
              ) : isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Preparing WhatsApp...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  <span>Send via WhatsApp</span>
                </span>
              )}
            </button>

            <div className="sm:col-span-2 mt-3 text-center">
              <p className="text-[0.6rem] text-muted/40">
                Your information is securely processed directly to WhatsApp
              </p>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
