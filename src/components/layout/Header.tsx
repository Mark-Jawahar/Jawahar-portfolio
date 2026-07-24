"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { useCart } from "@/lib/CartContext";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/apparel", label: "Apparel" },
  { href: "/gifts", label: "Gifts" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-[var(--color-glass)] backdrop-blur-xl border-b border-[var(--color-border)] shadow-[var(--shadow-glass)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--color-overlay)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileNavOpen ? (
                <HiOutlineXMark className="w-5 h-5" />
              ) : (
                <HiOutlineBars3 className="w-5 h-5" />
              )}
            </button>

            <Link
              href="/"
              className="font-serif text-xl lg:text-2xl tracking-wide text-[var(--color-text-primary)]"
            >
              HookedByPree
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors duration-300 group ${
                    pathname === link.href
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[var(--color-accent)] transition-all duration-500 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={openCart}
                className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-[var(--color-overlay)] transition-colors"
                aria-label="Open cart"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[var(--color-accent)] text-white text-[10px] font-medium flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileNavOpen && <MobileNav onClose={() => setIsMobileNavOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
