# SEO, AEO and GEO

What you need to do after deploying: [`seo-launch-checklist.md`](seo-launch-checklist.md).

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
- **Metadata & JSON-LD**: `generateMetadata` sets unique `"<H1> (free, MIT) | OpenLandingPage"` titles, descriptions, canonicals, and Open Graph fields. `src/lib/hub-json-ld.ts` uses `serializeJsonLd` to emit one `@graph` containing `CollectionPage`, `ItemList` (items pointing at absolute `templateDetailPath(slug)` URLs), and `BreadcrumbList`.
- **Internal links & discovery**: `src/app/(index)/components/CategoryLinks.tsx` renders a compact "Browse by category" list on the homepage between `<GalleryShell />` and `<Faq />`, `Footer.tsx` links to `catalogIndexPath()`, `src/app/sitemap.ts` includes the index (`0.7`) and category hubs (`0.6`), and `buildLlmsTxt` in `src/lib/seo.ts` adds a `## Categories` section.

## Live template info bar

Live template pages (`/templates/<slug>`) show a small, dismissible bar: "This is CALDER & ROWE, a free MIT landing page template from openlanding.page · Get the code →". "Get the code" links to the template's detail page (`templateDetailPath(slug)`), and "openlanding.page" links to the gallery. Without it a template page is a dead end, and a visitor, search engine or AI crawler that renders JavaScript can't tell it is a free template rather than a real business. It never appears on `/`, `/landing-page-templates/**` or community pages.

### Mechanism: client-side only, from one place

Template route groups are isolated (no imports from outside their folder) and each has its own root layout, so editing ~100 layouts was ruled out. Options considered:

| Option | Verdict |
| --- | --- |
| Server-render it in each template layout | Rejected. It breaks isolation, and server-rendered markup would end up in prerendered HTML, which the standalone exporter reads. |
| `proxy.ts` (Next 16's middleware) | Rejected. Proxy can rewrite, redirect, set headers or respond directly, but it can't edit a rendered page's HTML body. The only way would be to fetch the page and splice the HTML on every request, which defeats prerendering and partial prefetching. |
| Rewrites or headers | Can't add visible UI. |
| **`src/instrumentation-client.ts` loading one shared script** | **Chosen.** |

How it works:

1. `src/instrumentation-client.ts` runs on every App Router page. When `location.pathname` matches `/templates/<slug>` (`templateSlugFromPath` in `src/lib/template-bar.ts`), it waits for `load` (so hydration is done) and appends `<script src="/olp-template-bar.js" async data-olp-chrome>`. On any other page it does nothing, and it ships no template data: just a regex and a few lines.
2. `src/app/olp-template-bar.js/route.ts` serves that script. It is prerendered at build, like `llms.txt`. It contains a slug→title map of `PUBLIC_TEMPLATES` (about 2 KB; prompts and descriptions are never shipped) plus the runtime `runTemplateBar` from `src/lib/template-bar-runtime.ts`, serialised with `Function.prototype.toString`. The runtime must therefore stay self-contained, with no imports or module-level bindings. A unit test runs the serialised copy to enforce this.
3. The runtime checks the slug against the map and checks the dismissal flag, then mounts once (idempotent; `window.__olpTemplateBar()` re-runs it).

Nothing is server-rendered into template pages, so this is unaffected by `cacheComponents` and `partialPrefetching`: prerendered template HTML, PPR shells and prefetch payloads are byte-identical with or without the bar. No `onRouterTransitionStart` hook is needed, because moving between the gallery and a template, or between templates, crosses root layouts and is always a full page load (so instrumentation runs again). Soft navigation inside one template keeps the mounted bar.

### Never in downloads

- `scripts/standalone/export.ts` re-renders each page from source and copies only styles, metadata and inline `document.documentElement` initialisation scripts from the prerendered HTML. Next `<script src>` chunks, instrumentation included, are not copied. The bar exists only in the live browser DOM, so exports cannot contain it.
- The bar's host element and the injected `<script>` both carry `data-olp-chrome`, so the exporter's `[data-olp-chrome]` stripping (Task C) is a second line of defence.
- Verified by exporting `orrery` after a build and grepping `public/downloads/orrery.html` for `olp-template-bar` and `data-olp-chrome` (no matches). The regenerated file was then restored with `git checkout`.

### Static-HTML templates

auven, cirro, echolog, khora, nema, orova, pitchlane, rooted, stillwater, strata, velora and vyra are `route.ts` handlers that return `public/downloads/<slug>.html` as-is, so Next's client instrumentation never runs there. Each handler now inserts `<script src="/olp-template-bar.js" defer data-olp-chrome></script>` before `</body>` in the response. That's a string constant, so isolation holds (no imports). The file on disk, which is also the download, is never modified, and the same shared script renders the bar. A new static template should copy those three lines.

### Behaviour and robustness

- **Placement:** a floating pill fixed at the bottom centre (full width minus 12px gutters on phones, with the close button beside the text and the CTA below it). It is an overlay, so it causes no layout shift, and it slides in after `load`. The host has `pointer-events: none`; only the pill takes clicks.
- **Stacking:** `z-index: 48`. That is above typical template content and fixed decoration (mostly ≤ 45), and below the template modal/overlay layers (mostly 50 to 1000). Native `<dialog>` modals use the top layer and always sit above it.
- **Isolation:** the host is a `<olp-template-bar>` custom element with an open shadow root. Its inline `all: initial !important` plus fixed positioning beat any template stylesheet and stop inherited fonts and colours. All styles live in the shadow root (system font stack, own colours), so the bar doesn't need the gallery CSS and can't restyle the template.
- **Accessibility:** `role="region"` with `aria-label="About this template"`; a real `<button>` labelled "Dismiss template info"; Escape inside the bar also dismisses. Text is #f5f5f2 on #111214 (about 17:1) with visible focus rings. Under `prefers-reduced-motion` there is no slide or fade, and the bar is hidden when printing.
- **Dismissal:** stored in `localStorage["olp:template-bar:dismissed"] = "1"` for all templates in that browser, wrapped in try/catch. When storage is blocked, the bar shows by default and dismisses for that page view only.

Tests: `src/lib/template-bar.test.ts` (path matching, title map, runtime against a fake DOM, serialised script, `<` escaping) and `tests/e2e/template-bar.spec.ts` (calder and orrery as React templates, rooted as a static one; the bar shows, links, dismisses, stays dismissed on reload, dismisses with Escape, is absent from raw template HTML and from `/` and catalog pages; desktop and phone screenshots go to `.openlanding-page/template-bar/`).

Existing template e2e suites now see the bar after `load`. It is a small pill at the bottom of the viewport, so a test that clicks something underneath it can set `localStorage["olp:template-bar:dismissed"] = "1"` with `page.addInitScript` first.

The static templates' "live route equals download" e2e checks (rooted, echolog, stillwater, `imported-html-templates`, `template-routing`) now expect `withTemplateBar(download)` from `tests/e2e/template-bar.helpers.ts` for `/templates/<slug>`, and still require `/downloads/<slug>.html` to be byte-identical.

## Template detail pages

The live template at `/templates/<slug>` is a fictional brand page (e.g. "CALDER & ROWE"), so it can't rank for "law firm landing page template". Each public template also gets an indexable, server-rendered detail page at `templateDetailPath(slug)` = `/landing-page-templates/<slug>`. This is the page meant for search and answer engines.

- **Route**: `src/app/(index)/landing-page-templates/[slug]/page.tsx`, inside the gallery route group, so it uses the gallery root layout and tokens. It renders inside the shared `CatalogChrome` (header, breadcrumb nav, footer; `catalog.css`) from the catalog and category hubs, plus its own `template-detail.css`. `generateStaticParams` returns every `PUBLIC_TEMPLATES` slug, so all pages are prerendered. `dynamicParams` isn't available with `cacheComponents`, so the page calls `notFound()` for unknown or archived slugs (and `category`) before rendering. Nothing in the page reads request data or the clock, so it needs no `"use cache"`. It avoids the gallery `Footer`, whose `new Date()` blocks prerendering.
- **Copy**: `src/app/(index)/components/detail/detail-content.ts` holds pure functions of the registry: title, H1, summary, meta description, how-to steps, FAQ and related templates. The visible page, the metadata and the JSON-LD all come from these same strings, so they can't drift apart. Tests: `detail-content.test.ts`.
  - Title: `detailTitle()` tries `<Title>: free <industry> landing page template (Next.js|HTML, MIT) | OpenLandingPage`. If that's over 65 characters, it drops the stack note, then the brand suffix, then swaps a long industry for the primary category label. Nearly every title ends up as `<Title>: free <industry> landing page template`, which keeps the keyword. Titles are unique across templates (tested).
  - Description: the answer-first summary (`<Title> is a free, MIT-licensed <industry> landing page template built with <stack>.`), then whole sentences only while they fit in 160 characters.
  - Related templates: up to 6 others ranked by how many categories they share, then same industry, then registry order (newest first). If fewer than 4 share a category, the list is topped up with the newest templates.
- **Metadata**: `alternates.canonical` is the detail path. `openGraph`/`twitter` use the template's `previewImage` as an absolute URL. When the preview is an SVG (social cards don't support it), they fall back to the raster gallery capture `/gallery/<slug>.webp`.
- **Page content** (all in the prerendered HTML):
  - breadcrumb (Home › Landing page templates › Title), rendered by `CatalogChrome`
  - H1 `<Title> landing page template` and the summary
  - the gallery capture (1600×900 attributes, cropped 16:9 from the top like the cards) with descriptive alt text
  - a facts list: industry, stack, categories linking to `categoryHubPath(id)`, badges as "Features", created date, AI model, MIT license
  - actions: View live template, Copy prompt (a small client island whose label is server-rendered), Open prompt (Markdown) at `/copy/<slug>-prompt.md`, and Download HTML at `/downloads/<slug>.html` only when `hasDownload`. Download is a plain `download` link, so it works without JavaScript and is crawlable.
  - the numbered "How to use this template with an AI coding agent" steps
  - a 4-question FAQ
  - related templates linking to their detail pages
- **JSON-LD** (`templateDetailJsonLd` in `src/lib/json-ld.ts`, one `@graph`). All nodes are cross-linked by `@id` under the detail URL:
  - `ItemPage` (`#webpage`)
  - `BreadcrumbList` (`#breadcrumb`, built with the hubs' `hubBreadcrumbJsonLd` from the same items as the visible breadcrumb)
  - the template entity (`#template`)
  - `FAQPage` (`#faq`, built from the visible FAQ)
  - `HowTo` (`#howto`, built from the visible steps, each step with `url` `#step-N`). Google no longer shows HowTo rich results, but the markup is valid schema.org and answer engines can use it.
- **Template entity decision**: `templateJsonLd(t)` now uses the detail page as its home. `@id` is `<detail>#template`, `url` is the detail URL, and `mainEntityOfPage` is the detail `ItemPage`. The live `/templates/<slug>` page becomes `workExample` (a `WebPage` named "<Title> live demo"): it's a rendered instance of the source code, not the description of it.
- **Homepage ItemList**: `galleryJsonLd` items now point their `ListItem.url` at the detail pages, because those describe the template. The live page is still reachable from each item through `workExample`.
- **Internal links**: each `TemplateCard` has a small, crawlable "Details" link (`<a href="/landing-page-templates/<slug>">`, same tab) next to the title. The title and preview still open the live template in a new tab.
- **Discovery**:
  - `sitemap.ts` adds one `...detailEntries()` line (helper at the bottom): priority 0.7, `lastModified` = `createdAt`, and as images the gallery capture shown on the page plus the preview when it isn't an SVG.
  - `buildLlmsTxt` appends `Details: <detail URL>` to each template line.
  - `buildLlmsFullTxt` adds a `- Details:` line to each section.
  - The llms header explains the `/landing-page-templates/<slug>` pages.
- **Tests**: `[slug]/page.test.tsx` covers params, 404s, metadata, the rendered HTML and JSON-LD matching the visible copy, plus updates to `src/lib/json-ld.test.ts`, `src/lib/seo.test.ts` and `TemplateCard.test.tsx`.

## Download watermark and attribution

Standalone HTML files in `public/downloads/<slug>.html` are automatically watermarked by `scripts/standalone/watermark.ts` (`watermarkHtml`), invoked both during export (`scripts/standalone/export.ts`, `scripts/export-waypoint.ts`) and across all committed downloads via `bun run watermark:downloads` (`scripts/watermark-downloads.ts`):

- **MIT license header:** Inserted immediately after `<!DOCTYPE html>` (above any existing generator comment) with the template title from `TEMPLATES` (falling back to `<title>`), canonical template URL (`https://www.openlanding.page/templates/<slug>`), `Copyright (c) 2026 Famanias`, and the full MIT permission text from `LICENSE`.
- **Generator meta:** Ensures `<head>` contains exactly one `<meta name="generator" content="openlanding.page">`.
- **Optional footer attribution:** Injects a small, centred, font- and color-inheriting `<p data-olp-credit>` right before `</body>` linking plainly (no `rel="nofollow"`) to `/templates/<slug>` and `https://www.openlanding.page/`, preceded by an HTML comment noting that attribution is optional under MIT and may be removed. The visible text is generic ("Built from a free landing page template on openlanding.page"); the template's name is only in the link's `title`, so the credit never duplicates a template's own link names or copy (that broke strict selectors such as synapxe's and warpwander's brand-link checks in `bun run verify:exports`).
- **Gallery chrome stripping:** `stripOlpChrome` removes any element carrying `data-olp-chrome` (and its nested contents) while ignoring occurrences inside comments, `<script>`, `<style>`, or unrelated attributes, so live-page gallery bars never ship in downloaded HTML.
- **Idempotency & download paths:** Markers (`openlanding.page:license`, `name="generator"`, `data-olp-credit`) update in place so running twice produces identical output. Gallery downloads in `src/app/(index)/lib/download.ts` stream `/downloads/<slug>.html` directly without producing zip or source bundles.


## Brand name and About page

The site ranked for "openlanding page" (its domain) but not for "openlandingpage" or "open landing page". The name was spelled four different ways and the spaced form never appeared on the site.

- **One display name:** `SITE_NAME = "OpenLandingPage"` (`src/lib/site.ts`) is used in titles (`| OpenLandingPage`), `og:site_name`, the manifest, `llms.txt` and structured data. The lowercase header wordmark is the logo and stays as it is.
- **Spelling variants, declared once:** `SITE_ALTERNATE_NAMES` (`Open Landing Page`, `openlandingpage`, `OpenLanding.page`, `openlanding page`) is the `alternateName` on both the homepage `WebSite` and the `Organization`. Google uses the homepage `WebSite` `name`/`alternateName` to understand the site name. The same list appears in `llms.txt` ("Also written as").
- **Visible spaced name:** the homepage title is `Open Landing Page (OpenLandingPage): Free Landing Page Templates`. The meta description, the first FAQ answer ("What is Open Landing Page?") and the catalog footer state the name plainly. There are no per-spelling pages and no hidden or repeated keyword text, which would be treated as doorway pages or keyword stuffing.
- **About page** (`src/app/(index)/about/`, `/about`): a server-rendered page that defines the brand. It covers what the project is (answer first), what you get, how templates are made, where to start, and a short "The name" section listing the variants. Facts such as template and download counts, model families and the first publish month come from the registry (`about-facts.ts`). JSON-LD: `AboutPage` whose `mainEntity` is the `Organization`, plus a `BreadcrumbList`. It uses the shared `CatalogChrome` (an "About" nav item with `currentNav="about"`) and is linked from both footers, the sitemap and `llms.txt`. Tests: `about/page.test.tsx`, `src/lib/json-ld.test.ts`, `src/lib/seo.test.ts`.
- **Off-site signals** (GitHub "About" box, launch posts, `sameAs` profiles) matter most for brand queries and need a human. See section 6 of [`seo-launch-checklist.md`](seo-launch-checklist.md).
