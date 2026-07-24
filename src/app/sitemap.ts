import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hookedbypree.com";

  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/shop", priority: 0.9 },
    { path: "/apparel", priority: 0.8 },
    { path: "/gifts", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.path === "/" ? "daily" : "weekly" as const,
    priority: route.priority,
  }));
}
