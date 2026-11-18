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
