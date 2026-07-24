import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "HookedByPree | Elegance in Every Stitch",
  description:
    "Discover premium handcrafted crochet creations. Bespoke apparel and everlasting gifts, meticulously handmade with love.",
  keywords: [
    "handmade crochet",
    "premium crochet",
    "handcrafted fashion",
    "crochet tops",
    "crochet gifts",
    "slow fashion",
    "sustainable fashion",
  ],
  openGraph: {
    title: "HookedByPree | Elegance in Every Stitch",
    description:
      "Premium handcrafted crochet creations. Bespoke apparel and everlasting gifts.",
    type: "website",
    locale: "en_IN",
    siteName: "HookedByPree",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans antialiased overflow-x-hidden">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
