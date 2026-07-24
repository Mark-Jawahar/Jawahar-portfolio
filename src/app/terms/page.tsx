"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="page-top">
      <div className="container-luxury section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif text-[var(--color-text-primary)]">Terms of Service</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Last updated: January 2024</p>

          <div className="mt-8 space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Orders & Payment</h2>
              <p>
                By placing an order with HookedByPree, you agree to provide accurate information and pay the
                total amount specified. All payments are processed via UPI. Orders are confirmed only after
                payment verification.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Shipping & Delivery</h2>
              <p>
                We ship within India only. Delivery times are estimates and may vary. Each item is made to order,
                so please allow 2-3 business days for crafting before dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Returns & Exchanges</h2>
              <p>
                We accept returns within 7 days of delivery for unused items in their original condition.
                Customized and personalized items are final sale and cannot be returned. Please contact us to
                initiate a return.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Custom Orders</h2>
              <p>
                Custom orders are non-refundable once production has begun. We will communicate the timeline
                and details before starting any custom piece.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Intellectual Property</h2>
              <p>
                All designs, patterns, and products created by HookedByPree are the intellectual property of
                HookedByPree and may not be reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-3">Contact</h2>
              <p>
                For questions about these terms, please contact us at hello@hookedbypree.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
