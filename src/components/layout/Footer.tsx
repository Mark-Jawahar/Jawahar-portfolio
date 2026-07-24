import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
      <div className="container-luxury section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="font-serif text-xl tracking-wide text-[var(--color-text-primary)]">
              HookedByPree
            </Link>
            <p className="mt-5 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs text-pretty">
              Elegance in Every Stitch. Artistry in Every Thread. Premium handcrafted crochet creations, made with love in India.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/apparel", label: "Apparel" },
                { href: "/gifts", label: "Gifts" },
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

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
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

          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-tertiary)] mb-6">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <li>
                <a href="https://instagram.com/hookedbypree" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/919620151434" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hello@hookedbypree.com" className="hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  hello@hookedbypree.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--color-text-tertiary)] tracking-wider uppercase">
            &copy; {new Date().getFullYear()} HookedByPree
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] tracking-wider uppercase transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-[11px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] tracking-wider uppercase transition-colors duration-300">
              Terms
            </Link>
            <span className="text-[11px] text-[var(--color-text-tertiary)] tracking-wider uppercase">
              Crafted in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
