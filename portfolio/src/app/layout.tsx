import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jawahar A | Assistant Team Lead – Customer Experience",
  description:
    "Customer experience leader with 3+ years of expertise in customer success, operations, team leadership, and process excellence. Based in Bengaluru, India.",
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#111113",
                border: "1px solid #27272a",
                color: "#ffffff",
                borderRadius: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
