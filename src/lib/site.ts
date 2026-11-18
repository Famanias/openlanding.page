/** Canonical production origin. Every absolute URL (metadata, sitemap, robots, JSON-LD, llms.txt) derives from this. */
export const SITE_URL = "https://www.openlanding.page";

/** Display name used in titles, structured data and llms.txt. The header wordmark stays lowercase by design. */
export const SITE_NAME = "OpenLandingPage";

/** The spaced, generic-looking form people also search for. */
export const SITE_NAME_SPACED = "Open Landing Page";

/**
 * Other spellings of the name, declared once in WebSite/Organization `alternateName` and on the About page.
 * Google uses the homepage WebSite name + alternateName to understand and display the site name.
 */
export const SITE_ALTERNATE_NAMES = [SITE_NAME_SPACED, "openlandingpage", "OpenLanding.page", "openlanding page"] as const;

/** Absolute URL on the canonical origin for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
