import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-xl tracking-wide text-[var(--color-text-primary)]">
              HookedByPree
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
              Elegance in Every Stitch.
              <br />
              Artistry in Every Thread.
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Premium handcrafted crochet creations,
              <br />
              made with love in India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)] mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/apparel", label: "Apparel Collection" },
                { href: "/gifts", label: "Gifting Collection" },
                { href: "/shop", label: "All Products" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)] mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)] mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <li>
                <a
                  href="https://instagram.com/hookedbypree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919620151434"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@hookedbypree.com"
                  className="hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  hello@hookedbypree.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} HookedByPree. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Crafted with care in India
          </p>
        </div>
      </div>
    </footer>
  );
}
