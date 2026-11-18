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

## Template detail pages

The live template at `/templates/<slug>` is a fictional brand page (e.g. "CALDER & ROWE"), so it can't rank for "law firm landing page template". Each public template also gets an indexable, server-rendered detail page at `templateDetailPath(slug)` = `/landing-page-templates/<slug>`. This is the page meant for search and answer engines.

- **Route**: `src/app/(index)/landing-page-templates/[slug]/page.tsx`, inside the gallery route group, so it uses the gallery root layout and tokens. Styles live in `template-detail.css` next to it. `generateStaticParams` returns every `PUBLIC_TEMPLATES` slug, so all pages are prerendered. `dynamicParams` isn't available with `cacheComponents`, so the page calls `notFound()` for unknown or archived slugs (and `category`) before rendering. The body is a `"use cache"` component, as on the homepage, because the shared `Footer` reads the current year.
- **Copy**: `src/app/(index)/components/detail/detail-content.ts` holds pure functions of the registry: title, H1, summary, meta description, how-to steps, FAQ and related templates. The visible page, the metadata and the JSON-LD all come from these same strings, so they can't drift apart. Tests: `detail-content.test.ts`.
  - Title: `detailTitle()` tries `<Title>: free <industry> landing page template (Next.js|HTML, MIT) | openlandingpage`. If that's over 65 characters, it drops the stack note, then the brand suffix, then swaps a long industry for the primary category label. Nearly every title ends up as `<Title>: free <industry> landing page template`, which keeps the keyword. Titles are unique across templates (tested).
  - Description: the answer-first summary (`<Title> is a free, MIT-licensed <industry> landing page template built with <stack>.`), then whole sentences only while they fit in 160 characters.
  - Related templates: up to 6 others ranked by how many categories they share, then same industry, then registry order (newest first). If fewer than 4 share a category, the list is topped up with the newest templates.
- **Metadata**: `alternates.canonical` is the detail path. `openGraph`/`twitter` use the template's `previewImage` as an absolute URL. When the preview is an SVG (social cards don't support it), they fall back to the raster gallery capture `/gallery/<slug>.webp`.
- **Page content** (all in the prerendered HTML):
  - breadcrumb (Home › Landing page templates › Title)
  - H1 `<Title> landing page template` and the summary
  - the gallery capture (1600×900 attributes, cropped 16:9 from the top like the cards) with descriptive alt text
  - a facts list: industry, stack, categories linking to `categoryHubPath(id)`, badges as "Features", created date, AI model, MIT license
  - actions: View live template, Copy prompt (a small client island whose label is server-rendered), Open prompt (Markdown) at `/copy/<slug>-prompt.md`, and Download HTML at `/downloads/<slug>.html` only when `hasDownload`. Download is a plain `download` link, so it works without JavaScript and is crawlable.
  - the numbered "How to use this template with an AI coding agent" steps
  - a 4-question FAQ
  - related templates linking to their detail pages
  - A server-rendered `DetailHeader` replaces the homepage header, whose search only works on the gallery.
- **JSON-LD** (`templateDetailJsonLd` in `src/lib/json-ld.ts`, one `@graph`). All nodes are cross-linked by `@id` under the detail URL:
  - `ItemPage` (`#webpage`)
  - `BreadcrumbList` (`#breadcrumb`)
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
