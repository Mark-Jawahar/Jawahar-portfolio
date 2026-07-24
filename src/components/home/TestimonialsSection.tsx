"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/lib/products";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionHeading
          label="Testimonials"
          title="What Our Community Says"
          description="Hear from those who have experienced the HookedByPree difference."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlassCard className="p-6 lg:p-8 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <HiStar key={j} className="w-4 h-4 text-[var(--color-star)]" />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs font-medium text-[var(--color-text-primary)]">
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
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
