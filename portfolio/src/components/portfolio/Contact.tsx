"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    await new Promise((r) => setTimeout(r, 800));

    const text = `Hi Jawahar,%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone)}%0A%0AReason: ${encodeURIComponent(form.reason)}%0A%0AMessage: ${encodeURIComponent(form.message)}`;
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", phone: "", reason: "", message: "" });

    setTimeout(() => {
      window.open(`https://wa.me/919620151434?text=${text}`, "_blank");
      setSent(false);
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><Mail className="h-3 w-3" />Contact</span>
          <h2 className="section-title">
            Let&apos;s<br />
            <span className="text-gradient-ice">connect.</span>
          </h2>
          <p className="section-description">
            Have a question or opportunity? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 space-y-3"
          >
            <div className="rounded-2xl p-5 glass-apple-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#a8d8ea]" />
                </div>
                <span className="text-sm font-medium">Email</span>
              </div>
              <a href="mailto:markjawahar17@gmail.com" className="text-sm text-white/35 hover:text-white/60 transition-colors">
                markjawahar17@gmail.com
              </a>
            </div>
            <div className="rounded-2xl p-5 glass-apple-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#a8d8ea]" />
                </div>
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-sm text-white/35">Bengaluru, Karnataka</p>
            </div>
            <div className="rounded-2xl p-5 glass-apple-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#a8d8ea]" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </div>
              <a
                href="https://wa.me/919620151434"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/35 hover:text-white/60 transition-colors"
              >
                +91 9620151434
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-7 glass-apple-card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full h-11 px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-white placeholder:text-white/12 focus:outline-none focus:border-[rgba(168,216,234,0.2)] focus:bg-[rgba(168,216,234,0.02)] transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full h-11 px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-white placeholder:text-white/12 focus:outline-none focus:border-[rgba(168,216,234,0.2)] focus:bg-[rgba(168,216,234,0.02)] transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-white placeholder:text-white/12 focus:outline-none focus:border-[rgba(168,216,234,0.2)] focus:bg-[rgba(168,216,234,0.02)] transition-all"
                />
                <select
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-white/40 focus:outline-none focus:border-[rgba(168,216,234,0.2)] focus:bg-[rgba(168,216,234,0.02)] transition-all appearance-none"
                >
                  <option value="" className="bg-[#050505]">Select Reason</option>
                  <option value="Job Opportunity" className="bg-[#050505]">Job Opportunity</option>
                  <option value="Collaboration" className="bg-[#050505]">Collaboration</option>
                  <option value="Feedback" className="bg-[#050505]">Feedback</option>
                  <option value="Other" className="bg-[#050505]">Other</option>
                </select>
              </div>
              <textarea
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-white placeholder:text-white/12 focus:outline-none focus:border-[rgba(168,216,234,0.2)] focus:bg-[rgba(168,216,234,0.02)] transition-all resize-none"
              />
              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden w-full h-11 rounded-xl bg-gradient-to-r from-[#a8d8ea] to-[#c4b5fd] text-sm font-medium text-[#050505] flex items-center justify-center gap-2 transition-all duration-300 ${
                  sent ? "shadow-[0_0_24px_rgba(167,243,208,0.3)]" : "hover:shadow-[0_0_24px_rgba(168,216,234,0.2)]"
                } disabled:opacity-40`}
              >
                {sending ? (
                  <motion.div className="h-4 w-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                ) : sent ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Message sent! Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
