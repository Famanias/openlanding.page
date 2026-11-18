import { templateDetailPath } from "./catalog-routes";

/**
 * Live template info bar ("This is X, a free MIT landing page template from openlanding.page").
 * Kept free of the template registry so `src/instrumentation-client.ts` (shipped to every page) stays tiny.
 * See docs/seo.md, "Live template info bar".
 */

/** Served by `src/app/olp-template-bar.js/route.ts`; React templates load it from instrumentation, static ones via a tag. */
export const TEMPLATE_BAR_SCRIPT_PATH = "/olp-template-bar.js";

/** Custom element name of the bar's shadow host. It also carries `data-olp-chrome`. */
export const TEMPLATE_BAR_HOST_TAG = "olp-template-bar";

/** localStorage key; "1" once the visitor dismisses the bar (applies to every template in that browser). */
export const TEMPLATE_BAR_STORAGE_KEY = "olp:template-bar:dismissed";

/** Public template URL `/templates/<slug>` or any path below it; group 1 is the slug. */
export const TEMPLATE_PAGE_PATTERN = "^/templates/([a-z0-9][a-z0-9-]*)(?:/|$)";

const templatePagePattern = new RegExp(TEMPLATE_PAGE_PATTERN);

/** Slug of the live template page at `pathname`, or null for gallery, catalog, community and other pages. */
export function templateSlugFromPath(pathname: string): string | null {
  return templatePagePattern.exec(pathname)?.[1] ?? null;
}

export function isTemplatePagePath(pathname: string): boolean {
  return templateSlugFromPath(pathname) !== null;
}

/** `templateDetailPath` with a placeholder the browser runtime fills in, so the URL contract stays in catalog-routes. */
export const TEMPLATE_BAR_DETAIL_PATH = templateDetailPath(":slug");

export const TEMPLATE_BAR_GALLERY_PATH = "/";
