import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jawahar A | Assistant Team Lead \u2013 Customer Experience",
  description:
    "Customer experience leader with 3+ years of expertise in customer success, operations, team leadership, and process excellence. Based in Bengaluru, India.",
  keywords: [
    "Jawahar A", "Customer Success", "Customer Experience",
    "Team Leadership", "Operations", "Hello Mentor", "Bengaluru",
  ],
  authors: [{ name: "Jawahar A" }],
  openGraph: {
    title: "Jawahar A | Assistant Team Lead \u2013 Customer Experience",
    description:
      "Customer experience leader with 3+ years of expertise in customer success, operations, team leadership, and process excellence.",
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
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(7,7,10,0.8)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#ffffff",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
