import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jawahar A | Customer Experience Specialist",
  description:
    "Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, and Client Relationship Management across EdTech, Real Estate, and Financial Services.",
  openGraph: {
    title: "Jawahar A | Customer Experience Specialist",
    description:
      "Customer Experience Specialist with 5+ years of experience delivering seamless customer experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-primary text-white-soft`}
      >
        {children}
      </body>
    </html>
  );
}
