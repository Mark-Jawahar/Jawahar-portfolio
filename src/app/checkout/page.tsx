"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/lib/CartContext";
import { formatPrice, generateOrderId, getUPILink } from "@/lib/utils";
import Link from "next/link";
import { HiOutlineChevronLeft, HiOutlineCreditCard, HiOutlineCheckCircle } from "react-icons/hi2";

const UPI_ID = "9620151434@upi";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment">("details");
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError("");

    try {
      const token = localStorage.getItem("hbp-token");
      const payload = {
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.product.images[0] || "",
        })),
        customer: formData,
        subtotal,
      };

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      setOrderId(data.orderId);
      setStep("payment");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const handlePaymentComplete = () => {
    clearCart();
    router.push(`/order-success?id=${orderId}`);
  };

  if (items.length === 0 && step === "details") {
    return (
      <div className="page-top">
        <div className="container-luxury py-32 text-center">
          <h1 className="text-3xl font-serif">Your cart is empty</h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium border-b border-[var(--color-text-primary)] pb-0.5"
          >
            <HiOutlineChevronLeft className="w-3 h-3" />
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-top">
      <div className="container-luxury section-lg">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <HiOutlineChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif tracking-[-0.02em]">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            {step === "details" ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Delivery Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors resize-none focus-ring"
                      placeholder="Street address, building, area"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full h-12 px-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-text-primary)] transition-colors focus-ring"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-[var(--color-error)]">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full h-12 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-white text-sm font-medium hover:opacity-90 transition-all duration-300 active:scale-[0.97] shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                  >
                    {isCreating ? "Creating Order..." : "Continue to Payment"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-accent)]/12 flex items-center justify-center">
                    <HiOutlineCreditCard className="w-7 h-7 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-5 text-lg font-serif text-[var(--color-text-primary)]">
                    Complete Your Payment
                  </h3>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    Order: <span className="font-mono font-medium text-[var(--color-text-primary)]">{orderId}</span>
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Amount: <span className="font-medium text-[var(--color-text-primary)]">{formatPrice(subtotal)}</span>
                  </p>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8 text-center">
                  <div className="inline-flex p-5 rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-sm)]">
                    <QRCodeSVG
                      value={getUPILink(subtotal)}
                      size={180}
                      level="M"
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </div>
                </div>

                <div className="rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8">
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-5">
                    Payment Instructions
                  </h4>
                  <ol className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)] flex-shrink-0 mt-0.5">
                        1
                      </span>
                      Open your preferred UPI application (Google Pay, PhonePe, Paytm, BHIM)
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)] flex-shrink-0 mt-0.5">
                        2
                      </span>
                      Scan the QR Code above or enter the UPI ID manually
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)] flex-shrink-0 mt-0.5">
                        3
                      </span>
                      Enter the exact amount: <span className="font-medium text-[var(--color-text-primary)]">{formatPrice(subtotal)}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-[10px] font-medium text-[var(--color-accent)] flex-shrink-0 mt-0.5">
                        4
                      </span>
                      Complete the payment and come back here
                    </li>
                  </ol>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8">
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-4">
                    UPI ID (Manual Entry)
                  </h4>
                  <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">
                      {UPI_ID}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(UPI_ID)}
                      className="ml-auto text-xs text-[var(--color-accent)] hover:underline font-medium"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePaymentComplete}
                  className="w-full h-12 rounded-[var(--radius-lg)] bg-[var(--color-success)] text-white text-sm font-medium hover:opacity-90 transition-all duration-300 active:scale-[0.97] shadow-[var(--shadow-sm)] flex items-center justify-center gap-2"
                >
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  I&apos;ve Completed the Payment
                </button>

                <button
                  onClick={() => {
                    const text = `Hi! I've placed order ${orderId} at HookedByPree.`;
                    window.open(`https://wa.me/919620151434?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="w-full h-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Need Help? Chat on WhatsApp
                </button>

                <p className="text-xs text-center text-[var(--color-text-tertiary)]">
                  Your order will be marked as &ldquo;Pending Verification&rdquo;.
                  We will confirm your payment within 24 hours.
                </p>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 lg:p-8 sticky top-24 shadow-[var(--shadow-sm)]">
              <h3 className="text-base font-medium text-[var(--color-text-primary)] mb-6">Order Summary</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[var(--color-bg-secondary)] flex-shrink-0">
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.product.name}</p>
                      {item.size && <p className="text-[10px] text-[var(--color-text-tertiary)]">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-[var(--color-text-tertiary)]">Qty: {item.quantity}</span>
                        <span className="text-xs font-medium">{formatPrice(item.product.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--color-border)] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Shipping</span>
                  <span className="text-[var(--color-text-secondary)]">Calculated at delivery</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--color-border)] flex justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
