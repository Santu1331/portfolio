import type { MetadataRoute } from "next";
import projectsData from "../../data/projects.json";

const BASE = "https://santoshsangnod.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projectsData.map((p) => ({
    url: `${BASE}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...projectRoutes,
  ];
}
