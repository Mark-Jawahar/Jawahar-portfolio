"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
    setTimeout(() => setSent(false), 3000);
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
          <h2 className="section-title">Let&apos;s<br /><span className="text-gradient-ice">connect.</span></h2>
          <p className="section-description">Have a question or opportunity? I&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 space-y-3"
          >
            <div className="rounded-2xl p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
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
            <div className="rounded-2xl p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-[rgba(168,216,234,0.06)] flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#a8d8ea]" />
                </div>
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-sm text-white/35">Bengaluru, India</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-7 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] space-y-4">
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
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full h-11 rounded-xl bg-gradient-to-r from-[#a8d8ea] to-[#c4b5fd] text-sm font-medium text-[#050505] flex items-center justify-center gap-2 disabled:opacity-40 transition-shadow hover:shadow-[0_0_24px_rgba(168,216,234,0.2)]"
              >
                {submitting ? (
                  <motion.div className="h-4 w-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                ) : sent ? (
                  "Message sent!"
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="h-4 w-4" />
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
