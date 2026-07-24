"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi2";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-20 lg:pt-[88px]">
        <div className="container-site py-32 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[var(--color-text-secondary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-serif text-[var(--color-text-primary)]">Your cart is empty</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-8 h-12 px-8 rounded-[var(--radius-button)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-[88px]">
      <div className="container-site section-padding">
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif text-[var(--color-text-primary)]">Shopping Cart</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-5 rounded-[var(--radius-card-sm)] border border-[var(--color-border)]"
              >
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative w-24 h-28 rounded-[var(--radius-image)] overflow-hidden bg-[var(--color-bg-secondary)] flex-shrink-0"
                >
                  <Image
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-sm font-medium text-[var(--color-text-primary)] hover:opacity-70 transition-opacity"
                      >
                        {item.product.name}
                      </Link>
                      {item.size && (
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-xs text-[var(--color-text-secondary)]">Color: {item.color}</p>
                      )}
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[var(--color-border)] rounded-full">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            removeItem(item.product.id, item.size, item.color);
                          } else {
                            updateQuantity(item.product.id, item.quantity - 1, item.size, item.color);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-overlay)] rounded-full transition-colors"
                      >
                        {item.quantity <= 1 ? (
                          <HiOutlineTrash className="w-3.5 h-3.5" />
                        ) : (
                          <HiOutlineMinus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-overlay)] rounded-full transition-colors"
                      >
                        <HiOutlinePlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 lg:p-8 sticky top-28">
              <h3 className="text-base font-medium text-[var(--color-text-primary)]">Order Summary</h3>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="text-[var(--color-text-primary)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Shipping</span>
                  <span className="text-[var(--color-text-secondary)]">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--color-border)] flex justify-between">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">Total</span>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center mt-6 h-12 flex items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all duration-300 active:scale-[0.97]"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="block w-full text-center mt-3 h-10 flex items-center justify-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
