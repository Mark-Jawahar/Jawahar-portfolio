"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section className="section">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[var(--radius-2xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-10 lg:p-16 xl:p-20 text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium">
            Stay Connected
          </span>
          <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-serif text-[var(--color-text-primary)]">
            Join the HookedByPree Circle
          </h2>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto text-pretty">
            Be the first to discover new collections, receive exclusive offers, and
            glimpse the making of each piece.
          </p>
          {status === "success" ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-sm text-[var(--color-success)]"
            >
              Thank you for subscribing!
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-12 px-5 rounded-[var(--radius-lg)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors"
              />
              <button
                type="submit"
                className="h-12 px-8 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all duration-300 active:scale-[0.97]"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
