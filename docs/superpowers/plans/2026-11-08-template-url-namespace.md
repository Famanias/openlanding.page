# Template URL Namespace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve templates at `https://www.openlanding.page/templates/<template-name>` and preserve existing links through permanent redirects.

**Architecture:** Retain existing isolated route groups and generate per-template redirects plus `afterFiles` rewrites from the gallery registry. Update first-party navigation and LUMEN's/Pello's browser-history URLs, while preserving static asset/download paths and standalone export discovery.

**Tech Stack:** Next.js 16.4.3 App Router, React 19.3.0, TypeScript, Bun 1.3.11, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-08-template-url-namespace-design.md` (user request and proposed supporting decisions; review with this plan).

## Global Constraints

- Every registered, available template opens directly at `/templates/<template-name>` with HTTP 200.
- Existing `/<template-name>` links permanently redirect with HTTP 308 to `/templates/<template-name>`, preserving queries, fragments in browser navigation, and nested route suffixes.
- Unknown template URLs return 404. Unavailable or archived templates retain their existing availability; the migration does not enable them.
- Imported HTML live routes continue serving exactly the corresponding downloadable HTML bytes.
- No new dependencies, template redesign, source-directory migration, `/templates` listing page, domain migration, or new SEO subsystem.
- Read the relevant installed guides in `node_modules/next/dist/docs/` before implementation, as required by `AGENTS.md`.
- Do not change template slugs, asset/download locations, source folder paths, or standalone production-artifact lookup paths.
- Deploy all tasks together; intermediate commits are review boundaries, not independent releases.

## Review Focus

- Media shares the `/templates/` prefix: existing files must win over suffix rewrites; pin with an exact asset-byte comparison in Task 1.
- Old aliases, suffixes, queries, and browser fragments must reach the final URL without a migration redirect chain or loop; pin in Task 1.
- Imported HTML and unavailable paths must not acquire gallery HTML or an unintended success response; pin HTML equality and unknown-path 404s in Task 1, with archive policy checked by unit tests.
- LUMEN's history and Pello's planner changes must retain the namespace through interactions and reload (plus LUMEN Back/Forward); pin in Task 3.
- Offline exports must normalize new self-links without consuming asset paths, another template's links, or external URLs; pin in Task 3.

---

## File structure and ownership

| Files | Responsibility |
| --- | --- |
| `src/lib/template-routing.ts` (new) | Public template paths and pure redirect/rewrite generation; no gallery import or filesystem access. |
| `next.config.ts` | Supply registered slugs to the routing policy and mount rules after static files. |
| `scripts/__tests__/template-routing.test.ts` (new), `tests/e2e/template-routing.spec.ts` (new) | Policy/config contracts and real production routing. |
| `src/app/(index)/components/TemplateCard.tsx` and its test | Both gallery live links. |
| `scripts/capture-gallery-previews.ts`, `scripts/import-aistudio-template.ts`, `scripts/archive-templates.ts` and existing importer/archive tests | Public-path consumers and future template registrations. |
| `tests/e2e/templates.ts`, `index.spec.ts`, `gallery-votes-sort.spec.ts`, `standalone-downloads.spec.ts`, `imported-html-templates.spec.ts`, `stillwater.spec.ts` | Shared canonical route coverage and gallery href assertions/selectors. Paths here are beneath `tests/e2e/`. |
| `src/app/(lumen)/lumen/App.tsx`, `tests/e2e/template-url-state.spec.ts` (new) | LUMEN studio URL state and live-only browser regression coverage. Existing `lumen.spec.ts` remains the interaction suite reused for offline exports. |
| `src/app/(pello)/pello/allocator/model.ts` and `model.test.ts` | Pello signup URLs, also consumed by `setPlan` in `usePlan.ts` for browser history. Keep that interface unchanged. |
| `scripts/standalone/runtime.ts`, `assets.test.ts`, `next-adapters.test.ts`, `navigation.test.ts` | Offline history/anchor normalization; test paths here are beneath `scripts/standalone/`. |
| `tests/standalone/open.ts` | Resolve both URL forms to the same downloaded file in offline browser suites. |
| `public/downloads/lumen.html`, `public/downloads/pello.html`, `public/copy/lumen.md`, `public/copy/pello.md`, `public/copy/lumen-prompt.md`, `public/copy/pello-prompt.md` | Regenerated LUMEN/Pello delivery artifacts; only retain files with an actual generated diff. |
| `README.md`, `docs/import-aistudio-templates.md` | Explain public URL versus unchanged source directory and asset paths. |

No route group moves. No changes to `scripts/template-files.ts`, `scripts/standalone/config.ts`, `scripts/standalone/export.ts`, or `scripts/export-waypoint.ts` are needed: their filesystem contracts remain intact.

### Task 1: Mount the public namespace and preserve legacy URLs

**Files:** Create the routing module and two routing test files above; modify `next.config.ts`.

**Interfaces:**
- Consumes: `RAW_TEMPLATES` from `src/app/(index)/data/templates.ts`, including archived registrations; availability remains owned by each underlying route.
- Produces: `templatePath(slug: string): string` in `src/lib/template-routing.ts`.
- Produces: `createTemplateRouting(slugs: readonly string[]): { redirects: Array<{ source: string; destination: string; permanent: true }>; rewrites: Array<{ source: string; destination: string }> }` in that module.
- `nextConfig.redirects()` returns generated redirects. `nextConfig.rewrites()` returns `{ beforeFiles: [], afterFiles: generated.rewrites, fallback: [] }`.

- [ ] **Step 1: Write the failing unit contracts** in `scripts/__tests__/template-routing.test.ts`. Import both public functions, the default config, and `RAW_TEMPLATES`. Use these assertions in named cases:

```ts
// "constructs the public path"
expect(templatePath("volume-zero")).toBe("/templates/volume-zero");
// "maps registered routes and future registrations"
const rules = createTemplateRouting(["orrery", "future-widget"]);
expect(rules.redirects).toContainEqual({ source: "/orrery/:path*", destination: "/templates/orrery/:path*", permanent: true });
expect(rules.rewrites).toContainEqual({ source: "/templates/future-widget/:path*", destination: "/future-widget/:path*" });
// "retains unavailable registrations without enabling their content"
expect(createTemplateRouting(["retired-template"]).rewrites).toContainEqual({ source: "/templates/retired-template/:path*", destination: "/retired-template/:path*" });
```

Add `"config derives rules from every raw registration after public files"`: compare actual config rules to `createTemplateRouting(RAW_TEMPLATES.map(t => t.slug))`, asserting empty `beforeFiles`/`fallback` arrays. Add table-driven assertions for `/kinetix/:path*`, `/cyberpunk/:path*`, `/cairn/:path*` and their `/templates/` forms, pointing directly to `/templates/synapxe/:path*` or `/templates/keytu/:path*` with `permanent: true`. Assert there is no `/:slug` or `/:path*` catch-all.

- [ ] **Step 2: Run the unit test red.** Run `bunx vitest run scripts/__tests__/template-routing.test.ts`. Expected: failure because the new routing module does not exist.

- [ ] **Step 3: Implement the two functions and config integration.** Return `/${slug}/:path*` → `/templates/${slug}/:path*` redirects and reverse internal rewrites, one per distinct supplied slug. Include the six alias redirects described above, but never rewrite aliases to old routes. Replace the existing rename redirects to avoid two-hop redirects. Keep all unrelated config settings.

- [ ] **Step 4: Run the unit test green.** Run the same command. Expected: all policy and config assertions pass.

- [ ] **Step 5: Write production HTTP/browser tests** in `tests/e2e/template-routing.spec.ts`. Enumerate active `TEMPLATES`, request both paths with `{ maxRedirects: 0 }`, and assert:

```ts
expect(newResponse.status()).toBe(200);
expect(newResponse.headers().location).toBeUndefined();
expect(oldResponse.status()).toBe(308);
expect(new URL(oldResponse.headers().location, oldResponse.url()).pathname)
  .toBe(`/templates/${template.slug}`);
```

Add named cases with these exact checks:

- `"preserves alias queries and nested endpoints"`: old aliases and namespaced aliases return 308 with final destination paths; `/kinetix?campaign=launch` keeps `campaign=launch`. Render `/templates/keytu` and read its actual `link[rel="icon"]` URL. Extract the suffix after `/keytu/` or `/templates/keytu/` and request `/cairn/<suffix>` with that icon's query. Assert one 308 directly to `/templates/keytu/<suffix>` with the query preserved; the target returns 200 without another redirect. Do not assume `icon.svg` or hardcode the metadata hash (the current build uses `icon-1p4jm8.svg`).
- `"preserves browser fragments"`: visiting `/keytu?campaign=launch#c3` ends at `/templates/keytu?campaign=launch#c3`.
- `"serves public media before rewrites"`: `/templates/orrery/og-base-800.webp` returns 200, image content type, no Location, and a response buffer equal to `public/templates/orrery/og-base-800.webp`.
- `"retains imported HTML bytes"`: `/templates/stillwater` and `/templates/cirro` match their corresponding `public/downloads/<slug>.html` files byte for byte, including `text/html` content type.
- `"does not capture unrelated routes"`: `/`, `/community-terms`, `/community-privacy` return 200; under the Playwright config's memory-vote environment, `/api/votes` returns 200 JSON with keys matching the active template slugs and no Location header; `/templates/not-a-registered-template`, `/not-a-registered-template`, and `/templates/orrery/not-a-real-page` return 404 without redirect.
- `"keeps metadata endpoints reachable"`: render `/templates/orrery`, collect its icon and `og:image` URLs, and request their pathname/query on the test origin (existing metadata origins are out of scope); each resolves to 200 with an image content type.

- [ ] **Step 6: Verify the production routing.** Run `bunx playwright test tests/e2e/template-routing.spec.ts`. The configured server runs prebuild, a Turbopack production build, and `next start`. Expected: every new path is direct 200, every migration redirect is 308, and all named regressions pass. Use a fresh `PLAYWRIGHT_PORT` if an existing server would reuse stale config. Do not infer HTTP success from config unit tests.

- [ ] **Step 7: Commit Task 1.** Stage only its four files and commit as `feat: serve template URLs under templates namespace`.

### Task 2: Update gallery navigation and template workflows

**Files:** Modify `TemplateCard.tsx` and its test; the three scripts and importer/archive tests; the six gallery/shared E2E files listed in the structure table; `README.md` and the import guide.

**Interfaces:**
- Consumes: `templatePath(slug: string): string` from Task 1 in the gallery and scripts.
- Preserves: `updateGalleryRegistrations(meta: ParsedMeta, slug: string, category: string, repoRoot: string): void` and `updateE2eTemplatesList(filePath: string, slug: string, archive: boolean): { changed: boolean }`.
- Produces: `TEMPLATE_PATHS: string[]` containing `/templates/<slug>` literals; newly imported template suites navigate to the same paths.

- [ ] **Step 1: Write failing consumer tests.** In `TemplateCard.test.tsx`, render every active card and assert exactly two `href="/templates/<slug>"` occurrences, no `href="/<slug>"`, and the existing `/gallery/<slug>.webp` image. In the existing importer test's temporary gamma fixture assert:

```ts
expect(updatedE2e).toContain('"/templates/gamma"');
expect(fs.readFileSync(path.join(e2eDir, "gamma.spec.ts"), "utf8"))
  .toContain('page.goto("/templates/gamma")');
```

Update the archive/restore fixture to `["/templates/orrery", "/templates/keytu"]`: archiving removes only Orrery, restoring re-adds it, and repeated operations remain idempotent. Keep the underlying source-page archive assertions intact.

- [ ] **Step 2: Run consumer tests red.** Run `bunx vitest run "src/app/(index)/components/TemplateCard.test.tsx" scripts/__tests__/import-template.test.ts scripts/__tests__/archive-templates.test.ts`. Expected: failures showing old gallery links and old generated/test-list routes.

- [ ] **Step 3: Update public-path consumers.** Use `templatePath` for both gallery anchors, preview capture navigation, importer registration paths, and archive/restore test-list entries. The importer generates literal new paths in its three `page.goto` calls and reports new hosted/local preview URLs; source destinations remain `src/app/(<slug>)/<slug>/`. Keep the archive helper's existing acceptance of a leading slash on its slug argument. Update archive/restore console URLs as well.

- [ ] **Step 4: Update browser expectations.** Replace shared `TEMPLATE_PATHS` literals and old gallery href expectations/selectors in `index.spec.ts`, `gallery-votes-sort.spec.ts`, `standalone-downloads.spec.ts`, `imported-html-templates.spec.ts`, and `stillwater.spec.ts`. In the imported HTML suite, directly request/navigate to `/templates/<slug>` and require that exact pathname for popups. Retain existing template-specific legacy `page.goto('/<slug>')` interaction tests: they exercise backward compatibility; Task 1 and shared suites explicitly cover direct new paths. Do not replace asset prefixes or download URLs.

- [ ] **Step 5: Document the URL contract.** In `README.md` and the import guide, show `/templates/orrery` as the live URL and `src/app/(orrery)/orrery/` as the source path; explain legacy 308s, unchanged media/download URLs, and automatic routing for registered templates. Keep historical plans/specs and source-path instructions in template rebuild prompts intact.

- [ ] **Step 6: Verify consumers green.** Re-run Step 2, then run `bunx playwright test tests/e2e/index.spec.ts tests/e2e/gallery-votes-sort.spec.ts tests/e2e/standalone-downloads.spec.ts tests/e2e/imported-html-templates.spec.ts tests/e2e/stillwater.spec.ts`. Expected: correct direct gallery destinations, original download filenames/content, and passing importer/archive assertions.

- [ ] **Step 7: Commit Task 2.** Stage only the files listed for this task and commit as `refactor: use namespaced template URLs in gallery workflows`.

### Task 3: Preserve interactive URL state and standalone exports

**Files:** Modify LUMEN's `App.tsx` and Pello's `allocator/model.ts`/`model.test.ts`; create `tests/e2e/template-url-state.spec.ts`; modify `scripts/standalone/runtime.ts`, `assets.test.ts`, `next-adapters.test.ts`, `navigation.test.ts`, and `tests/standalone/open.ts`; regenerate the LUMEN/Pello artifacts listed above.

**Interfaces:**
- Consumes: the public URL contract from Tasks 1–2; template source directories and build-artifact paths remain unchanged.
- Preserves: `normalizeNavigation<T extends string | URL | null | undefined>(url: T, slug: string): T | string`, `adaptProps(type: unknown, props: Record<string, unknown> | null, config: ExportConfig): Record<string, unknown> | null`, and `openStandalone(page: Page, href: string, options?: Parameters<Page["goto"]>[1])`.
- Preserves: Pello's `signupHref(id: string, goal: number): string`, used by `setPlan(plan: PlanId, goal: number): void` and signup/journal links.
- Produces: same-template root links in either URL form normalize to `#top`, `?query`, or `#fragment`; other URLs remain unchanged.

- [ ] **Step 1: Write failing offline normalization tests.** Extend `assets.test.ts` with:

```ts
expect(normalizeNavigation("/templates/lumen", "lumen")).toBe("#top");
expect(normalizeNavigation("/templates/lumen?studio=1#controls", "lumen")).toBe("?studio=1#controls");
expect(normalizeNavigation("/lumen?studio=1", "lumen")).toBe("?studio=1");
for (const href of ["/templates/lumen/art.webp", "/templates/lumen-extra", "/templates/pello", "https://example.com/templates/lumen"]) {
  expect(normalizeNavigation(href, "lumen")).toBe(href);
}
```

Add `adaptProps` anchor assertions and a `next-adapters.test.ts` Link assertion for `/templates/example?plan=annual#signup` yielding `href="?plan=annual#signup"`. Pin other template-root anchors and actual assets independently:

```ts
const lumenConfig = { slug: "lumen", assets: { "/templates/lumen/art.webp": "data:image/webp;base64,YXJ0" } };
for (const href of ["/templates/pello", "/templates/pello?plan=steady#begin"]) {
  expect(adaptProps("a", { href }, lumenConfig)?.href).toBe(href);
}
expect(adaptProps("img", { src: "/templates/lumen/art.webp" }, lumenConfig)?.src)
  .toBe("data:image/webp;base64,YXJ0");
expect(() => adaptProps("img", { src: "/templates/lumen/missing.webp" }, lumenConfig)).toThrow(/missing/i);
```

In `navigation.test.ts`, extend the existing temporary-file browser fixture to open both `/wowflutter#p5` and `/templates/wowflutter?mode=read#p5`; assert the same `.html` filename and retained query/hash, resetting through `about:blank`. Keep unknown-slug rejection.

- [ ] **Step 2: Run offline tests red.** Run `bunx vitest run scripts/standalone/assets.test.ts scripts/standalone/next-adapters.test.ts scripts/standalone/navigation.test.ts`. Expected: new-path normalization and namespaced offline navigation fail.

- [ ] **Step 3: Extend the offline adapters.** Recognize only the exact `/<slug>` or `/templates/<slug>` root followed by end-of-string, `?`, or `#`. Apply that normalization to same-template anchors in `adaptProps`. Other anchors matching a namespaced template root (`/templates/<lowercase-hyphenated-slug>`, optionally followed by query/hash) must bypass asset resolution unchanged. URLs with deeper asset paths continue through asset resolution, including missing-asset errors. In `openStandalone`, strip an optional exact leading `/templates/` before existing slug validation, preserving query/hash and path validation. Do not normalize cross-template or external URLs.

- [ ] **Step 4: Run offline tests green.** Run the Step 2 command. Expected: both URL forms work, negative cases stay unchanged, and existing asset traversal protections pass.

- [ ] **Step 5: Write failing live URL-state regressions.** Add `"studio retains the namespaced URL through navigation and history"` to `tests/e2e/template-url-state.spec.ts`: open `/templates/lumen`, click the `Glass Studio` header button, assert pathname `/templates/lumen` and `studio=1`; reload and confirm the studio's `Back to LUMEN Page` button is visible; close and assert the namespaced pathname without `studio`; go Back then Forward and assert studio/main state and URL agree. Compare URL pathname/search separately to avoid regexes that accidentally accept `/lumen`.

Add `"planner retains the namespaced URL through selection, slider, and signup"` to that suite: open `/templates/pello`; select the `A softer landing` radio and assert pathname `/templates/pello` with `plan=steady` and `goal=240`; focus the `Weekend contribution` slider and press End, then assert `goal=1200` and the same pathname. Assert the `Make this my starting point` link has href `/templates/pello?plan=steady&goal=1200#begin`; click it, reload, and verify the same pathname/query/hash and `.pel-signup-plan` contains `A softer landing`. In `allocator/model.test.ts`, change the `signupHref("steady", 24000)` expectation to `/templates/pello?plan=steady&goal=240#begin`. Keep live pathname contracts in the new suite: offline verification continues selecting the existing `lumen.spec.ts` and `pello.spec.ts` interaction suites.

- [ ] **Step 6: Run the URL-state regressions red.** Run `bunx vitest run "src/app/(pello)/pello/allocator/model.test.ts"` and `bunx playwright test tests/e2e/template-url-state.spec.ts`. Expected: failures because `signupHref` returns `/pello?...` and `openGlassStudio` writes `/lumen?studio=1`.

- [ ] **Step 7: Update template URL builders.** In LUMEN's existing local `openGlassStudio` and `closeGlassStudio` handlers, use `/templates/lumen?studio=1` and `/templates/lumen` respectively. In Pello's `signupHref(id: string, goal: number): string`, change only the pathname prefix to `/templates/pello`; existing callers, including `setPlan`, inherit it. Preserve query values, hash behavior, popstate behavior, and isolated-template import boundaries.

- [ ] **Step 8: Run the URL-state regressions green.** Repeat both Step 6 commands. Expected: Pello unit assertions and all LUMEN/Pello browser-state assertions pass.

- [ ] **Step 9: Regenerate the changed downloadable runtimes.** Run `bun run build`, then `bun run export:templates -- lumen pello`, then `bunx tsx scripts/generate-copy-bundles.ts`. The last script regenerates all bundles: inspect the diff and retain only justified changes; never overwrite unrelated user changes. Expected: LUMEN/Pello download/copy artifacts reflect the new history paths and updated offline adapter.

- [ ] **Step 10: Verify the delivery and integration.** Run `bun run verify:exports -- lumen pello`, `bun run test`, `bunx tsc --noEmit`, `bun run lint`, and `bun run check`. Run `bunx playwright test tests/e2e/template-routing.spec.ts tests/e2e/template-url-state.spec.ts tests/e2e/lumen.spec.ts tests/e2e/pello.spec.ts tests/e2e/overflow.spec.ts tests/e2e/reduced-motion.spec.ts`. Expected: offline LUMEN/Pello interactions pass, direct new URLs work across the shared template set, no asset/isolation regression, and all checks exit 0. The successful Step 9 production build is the build evidence; rebuild only if later source changes require it.

- [ ] **Step 11: Review the final diff and commit.** Confirm no template directories moved, no broad namespace substitution touched assets/downloads, and no unrelated generated files changed. Stage Task 3 files and commit as `fix: preserve namespaced template state in live and offline views`.

## Release handoff

Deploy only after all tasks pass together, using the project's normal release process when authorized. After deployment, smoke-check `/templates/orrery`, `/orrery` (308), `/templates/cirro`, `/templates/lumen?studio=1`, `/templates/orrery/og-base-800.webp`, and `/downloads/lumen.html` on `https://www.openlanding.page`. No deployment is part of this planning task.

## Pre-implementation review

A fresh agent reviewed this plan against the repository and installed Next.js behavior on 2026-11-08. Its three findings were verified and incorporated: Pello's URL builder and export artifacts are included in Task 3; metadata endpoint tests discover generated filenames in Task 1; Task 3 explicitly preserves cross-template anchors before asset resolution and tests that branch. The reviewer found the rewrite architecture sound, with production routing verification still required during implementation. This review changed planning documents only; no implementation tests have run yet.
