"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/lib/products";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TestimonialsSection() {
  return (
    <section className="section-lg bg-[var(--color-bg-secondary)]">
      <div className="container-luxury">
        <SectionHeading
          label="Testimonials"
          title="What Our Community Says"
          description="Hear from those who have experienced the HookedByPree difference."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.slice(0, 6).map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-[var(--radius-xl)] bg-[var(--color-card-bg)] border border-[var(--color-border)] p-8 lg:p-10 h-full hover:shadow-[var(--shadow-md)] transition-all duration-500">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <HiStar key={j} className="w-4 h-4 text-[var(--color-accent)]" />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed text-pretty">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-sm font-medium text-[var(--color-accent)]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
