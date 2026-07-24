"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="pt-20 lg:pt-[88px]">
      <div className="container-site section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
          >
            &larr; Back to Home
          </Link>
          <h1 className="heading-md text-[var(--color-text-primary)]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Last updated: January 2024</p>

          <div className="mt-8 space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-2">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including your name, email address, phone number,
                shipping address, and payment details when you place an order or contact us.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-2">How We Use Your Information</h2>
              <p>
                We use your information to process orders, communicate with you about your purchases, improve our
                products and services, and send marketing communications if you have opted in.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-2">Data Protection</h2>
              <p>
                We implement appropriate security measures to protect your personal information. Your payment data
                is processed securely and is not stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-2">Third-Party Sharing</h2>
              <p>
                We do not sell, trade, or share your personal information with third parties except as necessary
                to fulfill your orders (e.g., shipping carriers) or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-text-primary)] mb-2">Contact</h2>
              <p>
                For questions about this privacy policy, please contact us at hello@hookedbypree.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
