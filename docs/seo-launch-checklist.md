# SEO launch checklist

What a human has to do, in order, for the SEO / GEO / AEO work on this branch to take effect. Everything else (sitemap, robots, llms.txt, JSON-LD, canonicals, detail and category pages, the live template bar, the download watermark) works automatically once the branch is deployed. Background and details: [`seo.md`](seo.md).

## 1. Before merging

- [ ] **Review and merge the PR.** Nothing is live until it is deployed to production.
- [ ] **Optional: decide on the live template bar on phones.** On phone-width screens the bar covers the hero buttons until it is dismissed. It works as is; ask for a slimmer mobile version or "show after first scroll" if you prefer.

## 2. Vercel settings (one-time)

- [ ] **Make `www.openlanding.page` the primary domain.** In Vercel → Project → Settings → Domains, set `www.openlanding.page` as primary and make `openlanding.page` **redirect (308) to `www`**. Every canonical URL, the sitemap and the IndexNow host use `https://www.openlanding.page`, so the apex domain must not serve its own copy.
- [ ] **Redirect or retire `openlandingpage.vercel.app`.** All references to it were removed from the code, but if the old domain still serves the site, search engines see duplicate content. Redirect it to `https://www.openlanding.page` (Domains → edit → redirect) or remove it from the project.
- [ ] **Optional: add search-console verification variables** (Settings → Environment Variables, Production), only if you verify with the HTML-tag method below:
  - `GOOGLE_SITE_VERIFICATION` = the `content` value Google gives you
  - `BING_SITE_VERIFICATION` = the `content` value Bing gives you (`msvalidate.01`)

  These are read at build time, so **redeploy** after adding them. Unset variables produce no tags.

## 3. After the production deploy

- [ ] **Smoke-check the new endpoints** (each should return content, not a 404):
  ```bash
  curl -fsS https://www.openlanding.page/robots.txt
  curl -fsS https://www.openlanding.page/sitemap.xml | head
  curl -fsS https://www.openlanding.page/llms.txt | head
  curl -fsS https://www.openlanding.page/manifest.webmanifest
  curl -fsS https://www.openlanding.page/e48297be6111ba712e37419eeaae877d.txt   # must print exactly the key
  curl -sI  https://www.openlanding.page/templates/orrery | grep -i 'rel="canonical"'
  curl -sI  https://openlanding.page/ | grep -i location                          # should point to https://www.openlanding.page/
  ```
- [ ] **Open a few new pages in a browser:** `/landing-page-templates`, `/landing-page-templates/category/3d`, `/landing-page-templates/calder`, and a live template such as `/templates/calder` (the info bar appears at the bottom after load).
- [ ] **Validate structured data** with Google's [Rich Results Test](https://search.google.com/test/rich-results) on `https://www.openlanding.page/` and on one detail page (e.g. `/landing-page-templates/calder`). Expect Organization, WebSite, ItemList, FAQPage, BreadcrumbList (and HowTo on detail pages) with no errors.
- [ ] **Check the social card** by pasting `https://www.openlanding.page/` into a link-preview tool (e.g. the X/LinkedIn post composer or opengraph.xyz).

## 4. Search engines (one-time)

- [ ] **Google Search Console:** add a **Domain** property for `openlanding.page` (DNS TXT verification, preferred) or a URL-prefix property for `https://www.openlanding.page` verified with `GOOGLE_SITE_VERIFICATION`. Then **Sitemaps → submit `https://www.openlanding.page/sitemap.xml`**, and use **URL Inspection → Request indexing** on `/` and `/landing-page-templates`.
- [ ] **Bing Webmaster Tools** (also feeds ChatGPT search and Copilot): **import the site from Google Search Console** (easiest), or verify with `BING_SITE_VERIFICATION`. Then submit the same sitemap.
- [ ] **Ping IndexNow once** from your machine, after the deploy is live (Bing, Yandex and other IndexNow engines pick up all 236 URLs at once):
  ```bash
  bun run indexnow --dry-run   # preview, no network
  bun run indexnow             # submit
  ```

## 5. Ongoing

- [ ] **After deploys that add or change pages, run `bun run indexnow` again.** It always submits the current sitemap. To automate it, use the GitHub Actions example in [`seo.md`](seo.md#submitting-urls-via-indexnow) (not committed as a workflow).
- [ ] **When adding a template:** give its layout a unique `title`/`description` (never the gallery's), and after `bun run build` run `bun run export:templates -- <slug>` as usual. The export watermarks the download automatically; `bun run watermark:downloads -- --check` confirms every download is watermarked. Detail page, sitemap, llms.txt, category pages and the live bar pick up new templates automatically.
- [ ] **Keep the README's "100+" count and the hex colours** in `src/app/(index)/opengraph-image.tsx` and `src/app/manifest.ts` in step with reality and `tokens.css`.

## 6. Brand-name searches ("openlandingpage", "open landing page")

The site declares every spelling of its name (see "Brand name and About page" in [`seo.md`](seo.md)), but rankings for a brand query mostly come from other sites using that name and linking to you:

- [ ] **GitHub repo "About" box:** set the website to `https://www.openlanding.page`, start the description with "Open Landing Page (OpenLandingPage): free, MIT-licensed landing page templates…", and add topics such as `landing-page`, `landing-page-template`, `nextjs`, `tailwindcss`, `templates`.
- [ ] **Launch posts that use the name as link text:** Show HN, Product Hunt, Reddit (r/webdev, r/nextjs, r/SideProject), dev.to or Hashnode write-ups, and relevant "awesome" lists. Link to `https://www.openlanding.page` (or `/about`) with "Open Landing Page" or "OpenLandingPage" as the link text.
- [ ] **Public profiles (X, Product Hunt, etc.):** when you create any, add their URLs to `sameAs` in `organizationJsonLd()` (`src/lib/json-ld.ts`) so Google connects them to the site.
- [ ] **Optional: register `openlandingpage.com`** and redirect it (308) to `https://www.openlanding.page`. A matching domain barely helps rankings, but it catches people who type the one-word name and stops anyone else taking it.
- [ ] **Search Console → Performance:** after a few weeks, check impressions and position for "openlandingpage" and "open landing page". Brand queries for a new domain usually settle within weeks to a couple of months.

## Known issues not caused by this branch (optional follow-ups)

- **Next.js security notice:** `bun run build` compiles and prerenders everything, then exits 1 with `SecurityFatalError: Your version of Next.js is affected by a known security vulnerability`. Next recommends upgrading (`next upgrade --agent=security`). Production deploys may hit the same stop, so handle this before or with the merge if Vercel builds fail.
- **`bun run verify:exports`:** 57 of 933 standalone-download checks fail identically on `master` (stale downloads for halodesk, razorline, riff, poppypatch, savepoint, nicopark, mesamarket and others; Google Fonts requests; mobile overflow; ambiguous selectors). Regenerating those downloads with `bun run export:templates -- <slug>` and updating their specs is separate work.
- **`bun run lint`:** 24 pre-existing errors in template files not touched by this branch.
- **Live template bar in e2e tests:** the bar overlays the bottom of live template pages. Its own spec and the affected static-template specs pass. If an existing template e2e test clicks near the bottom of the viewport and starts failing, set `localStorage["olp:template-bar:dismissed"] = "1"` with `page.addInitScript` before the test (see "Live template info bar" in [`seo.md`](seo.md)).
