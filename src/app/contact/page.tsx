"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      alert("Failed to send. Please email us directly at hello@hookedbypree.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-top">
      <div className="container-luxury section-lg">
        <SectionHeading
          label="Get in Touch"
          title="We&apos;d Love to Hear From You"
          description="Have a question, a custom order request, or just want to say hello?"
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-5">
              {[
                {
                  icon: HiOutlineEnvelope,
                  label: "Email",
                  value: "hello@hookedbypree.com",
                  href: "mailto:hello@hookedbypree.com",
                },
                {
                  icon: HiOutlineDevicePhoneMobile,
                  label: "WhatsApp",
                  value: "+91 9620151434",
                  href: "https://wa.me/919620151434",
                },
                {
                  icon: ({ className }: { className?: string }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                  label: "Instagram",
                  value: "@hookedbypree",
                  href: "https://instagram.com/hookedbypree",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] hover:bg-[var(--color-overlay)] transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/12 flex items-center justify-center group-hover:bg-[var(--color-accent)]/25 transition-colors">
                    <item.icon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-tertiary)]">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] h-48 bg-[var(--color-bg-secondary)] flex items-center justify-center">
              <p className="text-xs text-[var(--color-text-tertiary)]">India</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-serif text-[var(--color-text-primary)]">
                  Thank You!
                </h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Subject
                  </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                      placeholder="How can we help?"
                    />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors resize-none focus-ring"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-white text-sm font-medium hover:opacity-90 transition-all duration-300 active:scale-[0.97] shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
