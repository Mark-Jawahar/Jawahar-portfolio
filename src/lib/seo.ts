import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  noIndex,
}: SEOProps = {}): Metadata {
  const siteName = siteConfig.name;
  const fullTitle = title ? `${title} | ${siteName}` : siteConfig.title;
  const desc = description || siteConfig.description;
  const image = ogImage || siteConfig.ogImage;
  const url = canonical || siteConfig.name;

  return {
    title: fullTitle,
    description: desc,
    keywords: keywords || siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    url: process.env.NEXT_PUBLIC_APP_URL,
    image: siteConfig.avatarUrl,
    sameAs: [
      "https://linkedin.com/in/jawahar-a-47037a240",
      "https://www.instagram.com/monsieur_heart_10",
    ],
  };
}
