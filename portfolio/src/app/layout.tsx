import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jawahar A | Assistant Team Lead – Customer Experience",
  description:
    "Customer experience leader with 5+ years of expertise in customer success, operations, team leadership, and process excellence. Based in Bengaluru, India.",
  keywords: [
    "Jawahar A",
    "Customer Success",
    "Customer Experience",
    "Team Leadership",
    "Operations",
    "Hello Mentor",
    "Bengaluru",
  ],
  authors: [{ name: "Jawahar A" }],
  openGraph: {
    title: "Jawahar A | Assistant Team Lead – Customer Experience",
    description:
      "Customer experience leader with 5+ years of expertise in customer success, operations, team leadership, and process excellence.",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
