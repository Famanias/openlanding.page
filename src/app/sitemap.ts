import type { MetadataRoute } from "next";
import { PUBLIC_TEMPLATES, templateDetailUrl, templateUrl } from "../lib/seo";
import { absoluteUrl } from "../lib/site";
import { galleryCapturePath } from "./(index)/components/detail/detail-content";

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
    ...detailEntries(),
    { url: absoluteUrl("/community-terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/community-privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}

/** One indexable detail page per public template (/landing-page-templates/<slug>), with the capture it shows and the preview image. */
function detailEntries(): MetadataRoute.Sitemap {
  return PUBLIC_TEMPLATES.map(t => ({
    url: templateDetailUrl(t.slug),
    lastModified: t.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [galleryCapturePath(t.slug), ...(t.previewImage.endsWith(".svg") ? [] : [t.previewImage])].map(path => absoluteUrl(path)),
  }));
}
