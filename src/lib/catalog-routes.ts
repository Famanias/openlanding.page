/**
 * Indexable catalog URLs, owned by the gallery (src/app/(index)/landing-page-templates/).
 * Kept apart from /templates/<slug>, which is rewritten to each isolated template route group.
 */
export const CATALOG_BASE = "/landing-page-templates";

/** Catalog index: every public template plus links to each category hub. */
export function catalogIndexPath(): string {
  return CATALOG_BASE;
}

/** Detail page describing one template (what it is, stack, prompt, download, how to use with AI). */
export function templateDetailPath(slug: string): string {
  return `${CATALOG_BASE}/${slug}`;
}

/** Hub page for one gallery category id (e.g. "3d", "threejs"); never "all". */
export function categoryHubPath(categoryId: string): string {
  return `${CATALOG_BASE}/category/${categoryId}`;
}

/** Path segments under CATALOG_BASE that are not template slugs. */
export const RESERVED_CATALOG_SEGMENTS = ["category"] as const;
