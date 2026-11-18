# SEO, AEO and GEO

How openlandingpage is made discoverable by search engines (SEO), answer engines (AEO) and generative/LLM engines (GEO).

## Canonical origin

- The only canonical origin is `https://www.openlanding.page`, exported as `SITE_URL` from `src/lib/site.ts` (with `absoluteUrl()`).
- Gallery code, `robots.ts`, `sitemap.ts`, JSON-LD and `next.config.ts` import it.
- Template route groups (`src/app/(<slug>)/`) must stay isolated (`scripts/check-isolation.ts` forbids `@/` imports), so their `metadataBase` uses the literal `https://www.openlanding.page`. Never reintroduce `openlandingpage.vercel.app`; `git grep vercel.app` should be empty.

## Crawl and discovery surfaces

All generated from `TEMPLATES` (non-archived entries of `RAW_TEMPLATES`) via `src/lib/seo.ts`, so a new template appears everywhere automatically. Tests: `src/lib/seo.test.ts`.

| URL | Source | Notes |
| --- | --- | --- |
| `/robots.txt` | `src/app/robots.ts` | Allows everyone, names AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot) explicitly, disallows `/api/`, references the sitemap. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Home, every `/templates/<slug>` (with preview image, `lastModified` = `createdAt`), community terms/privacy. |
| `/llms.txt` | `src/app/llms.txt/route.ts` | [llms.txt](https://llmstxt.org) index: one line per template with description, industry, stack and its `/copy/<slug>-prompt.md` link. |
| `/llms-full.txt` | `src/app/llms-full.txt/route.ts` | Same index with every rebuild prompt inlined. |

These live at the top of `src/app/` outside any route group. Metadata routes and route handlers need no root layout, so they work alongside the per-template root layouts, and under `cacheComponents` they are prerendered at build because they use no request-time APIs.

New files under `src/app/` and `src/lib/seo.ts` use relative imports: `next.config.ts` imports `src/lib/seo.ts` and Vitest has no `@/` alias.

## Canonical URLs

- Gallery: `alternates.canonical` on `src/app/(index)/page.tsx` (`/`) and on the community terms/privacy pages. Not set in the `(index)` layout, which would make every child page canonicalise to `/`.
- Templates: each template has its own isolated root layout, so the canonical is sent as an HTTP header instead, `Link: <https://www.openlanding.page/templates/<slug>>; rel="canonical"`, from `headers()` in `next.config.ts` (`templateCanonicalHeaders`). Legacy `/<slug>` URLs already 308 to `/templates/<slug>`.

## Structured data (JSON-LD)

`src/lib/json-ld.ts` builds the nodes. `src/app/(index)/page.tsx` renders them as one `@graph` in a `<script type="application/ld+json">`, following the Next.js JSON-LD guide (`<` is escaped as `\u003c`).

- `Organization` (`/#organization`): name, logo `/icon.svg`, `sameAs` the GitHub repo.
- `WebSite` (`/#website`): with a `SearchAction` on `/?q={search_term_string}`, the gallery's real search parameter.
- `CollectionPage` (`/#gallery`) whose `mainEntity` is an `ItemList` of every public template. Each item is a `SoftwareSourceCode` + `CreativeWork` with an MIT `license`, `isAccessibleForFree`, `codeRepository`, preview `image`, `dateCreated`, keywords, and `subjectOf` pointing at its Markdown rebuild prompt.
- `FAQPage` (`/#faq`): built from the same `buildFaq()` data that renders the visible FAQ, so the markup always matches the copy.

Template pages have no per-page JSON-LD. Their layouts are isolated and exported standalone, so the entities are described from the gallery's `ItemList` and linked by URL. Tests: `src/lib/json-ld.test.ts` and `src/app/(index)/page.test.tsx`.

## Answer-first FAQ (AEO)

`src/app/(index)/data/faq.ts` holds the questions. Each answer opens with a direct one-sentence reply, then gives detail, so answer engines can quote the first sentence on its own. `components/Faq.tsx` is a server component using `<details>`/`<summary>`: all answers are in the initial HTML, and it works without JavaScript. The template count in the first answer comes from the registry.

## Per-template titles and descriptions

Every template already ships a unique `<title>` and meta description. Some come from its route-group layout (`metadata`), and the static-HTML templates (auven, cirro, echolog, khora, nema, orova, pitchlane, rooted, stillwater, strata, velora, vyra) carry them inside `public/downloads/<slug>.html`. When adding a template, give its layout a distinctive `title` and `description`, and never the gallery's title.

## Server-rendered content

The hero, gallery cards (title, description, stack), FAQ and footer are all in the prerendered `/` HTML. The gallery components are client components but render on the server first, and the page is cached with `"use cache"`.

## Social cards and manifest

- `src/app/(index)/opengraph-image.tsx`: a 1200×630 PNG made with `next/og`, using the gallery's palette and the live template count. `twitter-image.tsx` re-exports it. They apply to `/` and the community pages. Templates keep their own `opengraph-image` files.
- The `(index)` layout metadata sets `twitter.card = "summary_large_image"`, `openGraph.siteName` and `openGraph.url`.
- `src/app/manifest.ts` serves `/manifest.webmanifest` (name, description, `/icon.svg`, gallery theme colour). It sits at the `app/` root, so Next links it from every root layout, templates included. That's harmless: they're pages on the same site.
- Colours are duplicated as hex in these two files because neither can read CSS variables. Keep them in step with `tokens.css`.

## README

The README opens with a keyword-bearing H1, the live link, and a one-sentence bold definition that answer engines can quote. Below that are a screenshot grid (from `public/gallery/*.webp`) linking to live template pages, and instructions for using a template and the `llms.txt` index. Keep the "100+" count roughly current.

## Search engine submission and IndexNow

Ownership verification tags are injected into `src/app/(index)/layout.tsx` at build time when `GOOGLE_SITE_VERIFICATION` and/or `BING_SITE_VERIFICATION` are set (see `docs/community-env.example`). When unset, no empty verification `<meta>` tags are emitted.

### Google Search Console checklist

1. Add a **Domain** property for `openlanding.page` (or verify ownership by setting `GOOGLE_SITE_VERIFICATION` in the production environment, redeploying so `<meta name="google-site-verification" content="...">` is rendered on `/`, and choosing the HTML tag verification method).
2. Confirm `https://www.openlanding.page` is the canonical host (non-`www` redirects to `www`, and `SITE_URL` / canonicals / sitemap all point to `https://www.openlanding.page`).
3. Open **Sitemaps** and submit `https://www.openlanding.page/sitemap.xml`.
4. Use **URL Inspection** on `https://www.openlanding.page/` and click **Request indexing** after major releases.

### Bing Webmaster Tools checklist

1. Either import the verified property directly from Google Search Console, or set `BING_SITE_VERIFICATION` in the production environment, redeploy so `<meta name="msvalidate.01" content="...">` is rendered on `/`, and verify via HTML meta tag.
2. Open **Sitemaps** and submit `https://www.openlanding.page/sitemap.xml`.
3. IndexNow verification requires no extra account setup once `public/e48297be6111ba712e37419eeaae877d.txt` is live at `https://www.openlanding.page/e48297be6111ba712e37419eeaae877d.txt` (`src/lib/indexnow.ts` exports `INDEXNOW_KEY` and `INDEXNOW_KEY_URL`).

### Submitting URLs via IndexNow

`scripts/indexnow.ts` (`bun run indexnow`) reads every URL from `src/app/sitemap.ts`, verifies all URLs are on `SITE_URL`, batches them into chunks of up to 10,000, and POSTs them to `https://api.indexnow.org/indexnow` (which notifies Bing/ChatGPT search/Copilot, Yandex, and participating engines).

- **Preview payload without network requests**: `bun run indexnow --dry-run`
- **Submit after a production deploy** (never run during `next build` or before the deploy is live, so IndexNow can immediately fetch `/e48297be6111ba712e37419eeaae877d.txt` and the updated pages): `bun run indexnow`

Optional post-deploy GitHub Actions workflow example (documentation only; not committed as a workflow file):

```yaml
# .github/workflows/indexnow.yml
# name: Notify IndexNow
# on:
#   deployment_status:
# jobs:
#   indexnow:
#     if: github.event.deployment_status.state == 'success' && github.event.deployment.environment == 'Production'
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - uses: oven-sh/setup-bun@v2
#       - run: bun install --frozen-lockfile
#       - run: bun run indexnow
```

### Verify after deploy

- `curl -fsS https://www.openlanding.page/robots.txt`
- `curl -fsS https://www.openlanding.page/sitemap.xml`
- `curl -fsS https://www.openlanding.page/llms.txt`
- `curl -fsS https://www.openlanding.page/e48297be6111ba712e37419eeaae877d.txt` (must return `e48297be6111ba712e37419eeaae877d` verbatim)
- Run Google's Rich Results Test against `https://www.openlanding.page/` to confirm `Organization`, `WebSite`, `CollectionPage`/`ItemList`, and `FAQPage` JSON-LD parse cleanly.
- Check the HTTP canonical header on a template route: `curl -I https://www.openlanding.page/templates/orrery` (expect `Link: <https://www.openlanding.page/templates/orrery>; rel="canonical"`).

## Catalog and category hubs

- **Catalog index (`/landing-page-templates`)**: `src/app/(index)/landing-page-templates/page.tsx` renders an indexable directory of all `PUBLIC_TEMPLATES` (`catalogIndexPath()`), with an answer-first intro citing the live count, MIT license, and AI rebuild prompts, a grid of category hub cards, and a full template directory linking to `templateDetailPath(slug)`.
- **Category hubs (`/landing-page-templates/category/[id]`)**: `src/app/(index)/landing-page-templates/category/[id]/page.tsx` statically generates (`generateStaticParams`) one hub page for every category in `CATEGORIES` (except `"all"`) that has at least one public template via `getTemplateCategories`, calling `notFound()` for unknown ids.
- **Category copy (`src/app/(index)/data/category-copy.ts`)**: Hand-authored SEO H1, one-line blurb, 2–3 sentence answer-first intro, and meta description per category id, validated by `category-copy.test.ts`.
- **Metadata & JSON-LD**: `generateMetadata` sets unique `"<H1> (free, MIT) | openlandingpage"` titles, descriptions, canonicals, and Open Graph fields. `src/lib/hub-json-ld.ts` uses `serializeJsonLd` to emit one `@graph` containing `CollectionPage`, `ItemList` (items pointing at absolute `templateDetailPath(slug)` URLs), and `BreadcrumbList`.
- **Internal links & discovery**: `src/app/(index)/components/CategoryLinks.tsx` renders a compact "Browse by category" list on the homepage between `<GalleryShell />` and `<Faq />`, `Footer.tsx` links to `catalogIndexPath()`, `src/app/sitemap.ts` includes the index (`0.7`) and category hubs (`0.6`), and `buildLlmsTxt` in `src/lib/seo.ts` adds a `## Categories` section.
