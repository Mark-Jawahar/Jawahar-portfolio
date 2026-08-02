import type { SiteSettings, SocialLink } from "@/types";

const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";
export const siteUrl = (
  configuredUrl && !/^https?:\/\/localhost/.test(configuredUrl)
    ? configuredUrl
    : "https://portfolio-v2-mocha-mu.vercel.app"
).replace(/\/$/, "");

export const siteConfig: SiteSettings = {
  name: "Jawahar A",
  title: "Jawahar A | Customer Experience Specialist",
  description:
    "Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, and Client Relationship Management across EdTech, Real Estate, and Financial Services.",
  email: "markjawahar17@gmail.com",
  phone: "+91 9620151434",
  location: "Bengaluru, Karnataka",
  role: "Customer Experience Specialist",
  resumeUrl: "/resume/Jawahar_A_Resume.pdf",
  avatarUrl: "/images/profile.jpg",
  ogImage: "/og/default.jpg",
  keywords: [
    "Customer Experience",
    "Customer Success",
    "Customer Onboarding",
    "Client Relationship Management",
    "Jawahar A",
    "Bengaluru",
    "Portfolio",
  ],
};

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/jawahar-a-47037a240",
    icon: "linkedin",
    label: "Connect on LinkedIn",
    active: true,
  },
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://www.instagram.com/monsieur_heart_10",
    icon: "instagram",
    label: "Follow on Instagram",
    active: true,
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    url: "https://wa.me/919620151434",
    icon: "whatsapp",
    label: "Chat on WhatsApp",
    active: true,
  },
  {
    id: "email",
    platform: "Email",
    url: "mailto:markjawahar17@gmail.com",
    icon: "mail",
    label: "Send an Email",
    active: true,
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Impact", href: "/#impact" },
  { label: "Journey", href: "/#journey" },
  { label: "Resume", href: "/#resume" },
  { label: "Contact", href: "/#contact" },
] as const;
