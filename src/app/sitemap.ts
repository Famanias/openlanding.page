import type { MetadataRoute } from "next";
import { PUBLIC_TEMPLATES, templateUrl } from "../lib/seo";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = PUBLIC_TEMPLATES.map(t => t.createdAt).sort().at(-1);
  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "daily", priority: 1 },
    ...PUBLIC_TEMPLATES.map(t => ({
      url: templateUrl(t.slug),
      lastModified: t.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: t.previewImage.endsWith(".svg") ? undefined : [absoluteUrl(t.previewImage)],
    })),
    { url: absoluteUrl("/community-terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/community-privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
