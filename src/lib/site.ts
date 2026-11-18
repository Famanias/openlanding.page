/** Canonical production origin. Every absolute URL (metadata, sitemap, robots, JSON-LD, llms.txt) derives from this. */
export const SITE_URL = "https://www.openlanding.page";

export const SITE_NAME = "openlandingpage";

/** Absolute URL on the canonical origin for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
