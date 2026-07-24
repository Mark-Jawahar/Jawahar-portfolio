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
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-16 lg:hidden"
    >
      <nav className="flex flex-col container-luxury pt-10 gap-0">
        {links.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="block py-4 text-[28px] font-serif text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
