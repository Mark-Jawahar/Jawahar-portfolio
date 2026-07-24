"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineArrowLeft } from "react-icons/hi2";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "HBP-XXXX-XXXX";

  return (
    <div className="page-top">
      <div className="container-luxury section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
            <HiOutlineCheckCircle className="w-10 h-10 text-[var(--color-success)]" />
          </div>
          <h1 className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] font-serif text-[var(--color-text-primary)]">
            Order Placed!
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)] text-pretty">
            Thank you for your order. We&apos;re already preparing your handcrafted pieces with care.
          </p>

          <div className="mt-10 p-6 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-[0.15em]">
              Order Number
            </p>
            <p className="mt-1 text-lg font-mono font-medium text-[var(--color-text-primary)]">
              {orderId}
            </p>
          </div>

          <div className="mt-6 p-6 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-left">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
              What happens next?
            </h3>
            <ol className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] font-medium">1.</span>
                Payment verification (within 24 hours)
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] font-medium">2.</span>
                Handcrafting begins (2-3 days)
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] font-medium">3.</span>
                Quality check & premium packaging
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] font-medium">4.</span>
                Dispatch & tracking details shared
              </li>
            </ol>
          </div>

          <p className="mt-6 text-xs text-[var(--color-text-tertiary)]">
            Your order status: <span className="font-medium text-[var(--color-accent)]">Pending Verification</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="page-top">
          <div className="container-luxury py-32 text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-text-primary)] animate-spin" />
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
