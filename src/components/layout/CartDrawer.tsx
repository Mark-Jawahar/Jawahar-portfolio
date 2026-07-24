"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineXMark, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-elevated)] border-l border-[var(--color-border)] z-50 flex flex-col shadow-[var(--shadow-xl)]"
          >
            <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-lg font-serif">Cart</h2>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 tracking-[0.08em] uppercase">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-overlay)] transition-colors"
                aria-label="Close cart"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-overlay)] flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[var(--color-text-tertiary)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-5 text-sm font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative w-20 h-24 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                        {item.size && (
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-xs text-[var(--color-text-tertiary)]">Color: {item.color}</p>
                        )}
                        <p className="text-sm font-medium mt-1.5">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-3 mt-3">
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
                                <HiOutlineTrash className="w-3 h-3" />
                              ) : (
                                <HiOutlineMinus className="w-3 h-3" />
                              )}
                            </button>
                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-overlay)] rounded-full transition-colors"
                            >
                              <HiOutlinePlus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 lg:px-8 py-5 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-5">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center h-12 flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-white text-sm font-medium hover:opacity-90 transition-all duration-300 active:scale-[0.97] shadow-[var(--shadow-sm)]"
                >
                  Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center h-10 mt-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
