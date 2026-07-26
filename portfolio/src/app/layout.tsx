import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jawahar A | Customer Experience Specialist",
  description:
    "Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, and Client Relationship Management across EdTech, Real Estate, and Financial Services.",
  keywords: [
    "Customer Experience",
    "Customer Success",
    "Customer Onboarding",
    "Client Relationship Management",
    "Jawahar A",
    "Bengaluru",
  ],
  authors: [{ name: "Jawahar A" }],
  openGraph: {
    title: "Jawahar A | Customer Experience Specialist",
    description:
      "Customer Experience Specialist with 5+ years of experience delivering seamless customer experiences across EdTech, Real Estate, and Financial Services.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
