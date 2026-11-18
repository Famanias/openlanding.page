import type { TemplateItem } from "../app/(index)/data/templates";
import { templateDetailPath } from "./catalog-routes";
import { serializeJsonLd } from "./json-ld";
import { absoluteUrl, SITE_URL } from "./site";

const MIT_LICENSE = "https://opensource.org/licenses/MIT";
const SITE_ID = `${SITE_URL}/#website`;

export interface HubBreadcrumbItem {
  name: string;
  path: string;
}

export function hubBreadcrumbJsonLd(
  items: readonly HubBreadcrumbItem[],
  pagePath: string,
): Record<string, unknown> {
  const pageUrl = absoluteUrl(pagePath);
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function hubCollectionPageJsonLd(options: {
  path: string;
  name: string;
  description: string;
  templates: readonly TemplateItem[];
}): Record<string, unknown> {
  const pageUrl = absoluteUrl(options.path);
  return {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": SITE_ID },
    license: MIT_LICENSE,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: options.templates.length,
      itemListElement: options.templates.map((t, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t.title,
        url: absoluteUrl(templateDetailPath(t.slug)),
      })),
    },
  };
}

export function buildHubJsonLd(options: {
  path: string;
  name: string;
  description: string;
  templates: readonly TemplateItem[];
  breadcrumbs: readonly HubBreadcrumbItem[];
}): string {
  return serializeJsonLd([
    hubCollectionPageJsonLd({
      path: options.path,
      name: options.name,
      description: options.description,
      templates: options.templates,
    }),
    hubBreadcrumbJsonLd(options.breadcrumbs, options.path),
  ]);
}
