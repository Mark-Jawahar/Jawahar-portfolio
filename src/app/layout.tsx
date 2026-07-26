import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/resume-data";
import ScrollReset from "@/components/ScrollReset";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.headline,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    type: "profile",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
