# Template URL namespace

## Request

Move the public template URLs from `https://www.openlanding.page/<template-name>` to `https://www.openlanding.page/templates/<template-name>`.

## Proposed behavior

These supporting decisions are implementation recommendations for review, rather than additional requirements supplied by the user.

- Every registered, available template opens directly at `/templates/<template-name>` with HTTP 200.
- Existing `/<template-name>` links permanently redirect with HTTP 308 to `/templates/<template-name>`, preserving queries, fragments in browser navigation, and nested route suffixes.
- Existing aliases redirect directly to the final URL: `/kinetix` and `/cyberpunk` to `/templates/synapxe`; `/cairn` to `/templates/keytu`. Apply the same alias policy beneath `/templates/` and preserve suffixes.
- Gallery preview/title links, gallery preview capture, newly generated template tests, and displayed local preview URLs use the new paths.
- Interactive templates retain the new pathname when changing URL state. LUMEN opens its studio at `/templates/lumen?studio=1` and closes it at `/templates/lumen`. Pello's plan selection, contribution slider, and signup links retain `/templates/pello` with their existing query/hash state.
- Existing `/templates/<slug>/<asset>` media, `/downloads/<slug>.html`, `/gallery/<slug>.webp`, `/copy/`, `/_next/`, `/api/`, `/community-terms`, `/community-privacy`, and `/` retain their behavior.
- Unknown template URLs return 404. Unavailable or archived templates retain their existing availability; the migration does not enable them.
- Imported HTML live routes continue serving exactly the corresponding downloadable HTML bytes.
- No new dependencies, template redesign, source-directory migration, `/templates` listing page, domain migration, or new SEO subsystem.

## Architecture decision

Keep `src/app/(<slug>)/<slug>/` and the separate template root layouts. Generate explicit redirects and `afterFiles` rewrites from `RAW_TEMPLATES` in `next.config.ts`. The new public paths rewrite internally to the existing routes; the browser keeps `/templates/<slug>`.

This is a URL migration, not a filesystem reorganization. Moving the template folders would also require changing isolation checks, palette exemptions, source discovery, importer output, copy bundles, standalone entry resolution, build artifact lookup, and many local imports. Rewrites meet the request while preserving those interfaces.

Routing order is essential: existing public media under `/templates/` must be served before template rewrites. Use per-template rules, not a catch-all that can capture unrelated paths. Redirects run before rewrites; production HTTP tests must demonstrate that rewriting to the original internal route does not cause a redirect loop.

Centralize public path construction and route-rule generation in `src/lib/template-routing.ts`. Consume the gallery registry only from the config, avoiding a second hand-maintained template list. Keep template-local runtime code isolated: LUMEN and Pello use their literal new pathnames rather than importing a shared application helper.

The standalone exporter continues reading the existing `.next/server/app/<slug>.html` artifacts. Extend offline URL normalization to accept both public path forms so exported interactions and the shared browser-test transport still work. Other template-root anchors remain unchanged and bypass asset resolution; genuine media URLs still resolve through the asset registry. Regenerate LUMEN's and Pello's HTML and copy bundles because their runtime sources change; do not regenerate unrelated downloads.

## Metadata and release boundaries

There is currently no app sitemap/robots implementation or explicit template canonical URL to migrate. Existing metadata bases include an older Vercel origin; changing those origins is a separate issue. Generated icon/Open Graph endpoints remain reachable through suffix rewrites and old endpoint redirects. Verify that at least one rendered template's icon and Open Graph URLs still resolve after migration. Discover actual metadata filenames from rendered markup: route groups add hash suffixes, so tests must not assume `icon.svg` or hardcode a generated hash.

Ship config, generated route rules, links, and runtime URL fixes together. Deployment is outside this planning request. Keep legacy redirects after release; a rollback must account for clients that have already cached permanent redirects.

## Acceptance evidence

Production HTTP checks cover all active templates at both path forms, aliases, preserved queries, an asset under the shared `/templates/` prefix, generated metadata endpoints, imported HTML equality, unknown paths, and unaffected non-template routes. Browser checks cover gallery destinations, legacy hash navigation, LUMEN studio navigation/reload/history, and Pello planner selection/slider/signup/reload. Unit checks cover future registrations, offline normalization, cross-template anchor preservation, importer output, and archive/restore updates to browser-test paths.
