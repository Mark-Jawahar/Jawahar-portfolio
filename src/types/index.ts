export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  category: string;
  url?: string;
  github?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  type: "work" | "education";
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  credentialId?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  resumeUrl: string;
  avatarUrl: string;
  ogImage: string;
  keywords: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}
