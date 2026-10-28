# Template Gallery Architecture & Ordering

This document describes the structure, ordering rules, and registration lifecycle of templates in the openlandingpage gallery.

## Template Ordering: Reverse Chronological Order

The gallery displays templates in reverse chronological order: **the most recently created templates appear at the beginning of the gallery grid**, while earlier templates appear towards the end.

### Implementation

Every gallery item requires a literal `createdAt: "YYYY-MM-DD"`. Existing values were backfilled once from the first Git commit adding each route group by `scripts/backfill-template-dates.ts`; builds never query Git. `RAW_TEMPLATES` is append-only. Registration order is derived from its index, breaking ties on the same day with the later appended item first.

`TEMPLATES` excludes archived entries and orders by date descending, then registration order descending. There are no pinned templates. The gallery supports Latest added (default), Oldest, Most liked and Least liked through `sort=date|likes` and `dir=desc|asc` URL parameters. Default values are omitted from URLs. Equal like counts use latest-added order. Likes sort uses latest-added order while counts load. Reset filters leaves sorting intact.

## Standalone HTML downloads

Download HTML appears only when `hasDownload: true` and `public/downloads/<slug>.html` exists. Alpine Reel is the first batch; older templates can gain faithful readable vanilla ports in later batches. New templates ship their standalone file with registration.

Each file has inline CSS and JavaScript and meaningful HTML with an h1. Fonts and images may use remote URLs; library CDNs must pin versions. Relative site assets, Next.js chunks, live-page scraping, base URLs and HTML clipboard side effects are excluded. The file must open directly under `file://` with its main heading and interactions working. `scripts/check-media.ts` checks availability and basic content; `tests/e2e/downloads.spec.ts` opens every shipped file from disk and checks page errors and forbidden requests.

The gallery registration is the source of truth for dates and download availability. `scripts/templates.config.ts` derives these fields, and `scripts/generate-copy-bundles.ts` exposes them in `TEMPLATE_METADATA` as `createdAt` and `downloadPath`.

## Anonymous votes

Both counts appear on every card. Each browser can cast one permanent like or dislike per template. See [voting setup and storage](gallery-votes.md) for production environment variables and the limits of anonymous uniqueness.

## Registration Points for New Templates

When registering a newly built template, ensure the following steps are performed:

1. **`scripts/templates.config.ts`**: Register the slug in `TemplateSlug` and configure its palette tokens.
2. **`scripts/process-images.ts`**: Add the slug to the CLI allowed slugs list.
3. **`scripts/generate-copy-bundles.ts`**: Register metadata for prompt bundle generation.
4. **`src/app/(index)/data/templates.ts`**:
   - Add the slug to `TemplateSlug`.
   - Add `<SLUG>_PROMPT` containing PROMPT.md text.
   - Append the template item to `RAW_TEMPLATES` with its creation date and `hasDownload: true`.
   - Ship `public/downloads/<slug>.html` and run the standalone download smoke test.
5. **`src/app/(index)/data/templates.test.ts`**:
   - Update the expected slug list (with the newest template at index 0) and total count.
6. **`tests/e2e/templates.ts`**: Append `"/<slug>"` to `TEMPLATE_PATHS`.
