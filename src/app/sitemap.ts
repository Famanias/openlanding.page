import type { MetadataRoute } from "next";
import { getCategoryHubSummaries } from "../app/(index)/data/category-copy";
import { catalogIndexPath, categoryHubPath } from "../lib/catalog-routes";
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
    ...hubEntries(latest),
  ];
}

function hubEntries(latest?: string): MetadataRoute.Sitemap {
  const hubs = getCategoryHubSummaries(PUBLIC_TEMPLATES).map(hub => ({
    url: absoluteUrl(categoryHubPath(hub.id)),
    lastModified: hub.latestCreatedAt ?? latest,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [
    { url: absoluteUrl(catalogIndexPath()), lastModified: latest, changeFrequency: "weekly", priority: 0.7 },
    ...hubs,
  ];
}
