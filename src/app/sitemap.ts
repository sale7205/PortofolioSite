import type { MetadataRoute } from "next"
import { projects } from "@/features/projects"

const BASE_URL = "https://salehaldhafeeri.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url:              `${BASE_URL}/projects/${project.slug}`,
    lastModified:     new Date(),
    changeFrequency:  "yearly",
    priority:         0.7,
  }))

  return [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        1,
    },
    {
      url:             `${BASE_URL}/resume`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    ...projectEntries,
  ]
}
