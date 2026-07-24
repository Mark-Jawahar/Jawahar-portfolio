"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/lib/products";

export default function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="max-w-xl">
          <span className="label-premium block">Testimonials</span>
          <h2 className="mt-3 heading-lg text-[var(--color-text-primary)] text-balance">
            What Our Community Says
          </h2>
          <p className="mt-4 text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty">
            Hear from those who have experienced the HookedByPree difference.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-lg)] p-6 lg:p-8 bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-500"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <HiStar key={j} className="w-4 h-4 text-[var(--color-star)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-xs font-medium text-[var(--color-accent)]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
