"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/apparel", label: "Apparel" },
  { href: "/gifts", label: "Gifts" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-16 lg:hidden"
    >
      <nav className="flex flex-col px-6 pt-8 gap-2">
        {links.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="block py-4 text-2xl font-serif text-[var(--color-text-primary)] border-b border-[var(--color-border)]"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
