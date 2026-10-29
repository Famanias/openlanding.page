# openlandingpage: SEO master plan and organic search growth strategy

Prepared 2026-10-29 against this worktree, Next.js **16.4.2**, React **19.3.0**, and the installed App Router documentation. This is an implementation plan, not a claim that its proposed changes have already shipped.

The objective is to make the existing work discoverable, understandable, fast, and useful to developers searching for reusable landing pages. The durable advantage is the combination of working previews, original visual systems, readable source, rebuild prompts, and an MIT-licensed code repository. The strategy should expose that substance rather than generate thousands of interchangeable keyword pages.

**Important inventory correction:** this checkout contains **48 registered templates: 43 active and 5 archived**, plus the gallery homepage. There are 49 source page routes including `/`, but only **44 currently eligible HTML URLs** for the initial sitemap. Implementations below derive membership from `TEMPLATES`; they will include the 49th, 50th, and subsequent active templates automatically. Do not hard-code either the requested “49+” count or today's count into production logic.

Only this document is the deliverable for this task. Preserve the pending vote-revocation and download-button work. Do not change routes, deploy, change the production domain, or submit anything to external accounts while producing the plan.

Contents: [Technical foundation](#technical-foundation) · [Rendering and CWV](#rendering-and-cwv) · [Structured data](#structured-data) · [Keywords and intent](#keywords-and-intent) · [Directory architecture](#directory-architecture) · [Roadmap and verification](#roadmap-and-verification)

<a id="technical-foundation"></a>

## 1. Quick-Win Technical Sprint — Immediate Foundation

### 1.1 What was inspected and what the evidence shows

Inspection covered `src/app/(index)`, all 48 individual route groups, `src/app/(index)/data/templates.ts`, `scripts/templates.config.ts`, `scripts/generate-copy-bundles.ts`, `scripts/template-files.ts`, `public/copy`, individual metadata/image files, the isolation checker, Next configuration, and existing test configuration. The routes are **literal groups**, such as `src/app/(orrery)/orrery/page.tsx`; there is no existing catch-all `src/app/[slug]/page.tsx`. Parentheses are organizational and do not appear in URLs.

A local production build was served on a dedicated port and all 49 page URLs were fetched with a crawler user agent. Scripts/styles were excluded from text and heading extraction. A separate JavaScript-disabled Chromium pass examined all 10 active templates in `3d-webgpu`. These are local build observations, not a Search Console, live-production, backlink, or keyword-volume audit.

| Area | Observed state | Consequence / action |
|---|---|---|
| Framework | `next.config.ts` enables `cacheComponents: true`, `partialPrefetching: true`, Turbopack CSS processing, and one build worker | Use the installed 16.4.2 documentation. Preserve those settings and static rendering. |
| Root layout architecture | No `src/app/layout.tsx`; gallery and each template have independent root layouts with `<html>` and `<body>` | Gallery metadata is not inherited by template routes. Do not introduce a global layout just to fix SEO. |
| Active pages | `/` and all 43 active template URLs returned 200, nonempty HTML text, and one rendered `h1` each | Preserve this SSR baseline. A Client Component is not automatically an empty client-only page. |
| Archived pages | `/morrow`, `/sundial`, `/lucentra`, `/spaceedu`, `/starlight` returned 404 and `noindex` | Exclude them from sitemaps, hubs, related lists, and homepage structured data. |
| Crawler files | No `src/app/sitemap.ts`, `src/app/robots.ts`, or corresponding public files | Add the two metadata routes below. |
| Canonicals | No canonical found on any of the 44 active HTML pages | Give every indexable page one absolute canonical URL. |
| `metadataBase` | Present in the gallery and some template layouts; missing in 26 active template root layouts | Normalize every active root layout. In the local production build, missing bases produced social URLs on `http://localhost:3000`; this demonstrates a configuration gap, not the production host's current response. |
| Social image files | 43 template OG files exist across active and archived groups; active `/nomi`, `/trace`, `/vector` and `/` lack OG image files | Add those four images, then explicit Twitter image coverage. Preserve existing authored cards. |
| Twitter behavior | Many existing OG files already cause Next to emit `summary_large_image`; the gallery emitted `summary`; three active templates lacked cards | Audit rendered tags, not just source keys. Configure deliberate card metadata and verify actual generated image URLs. |
| Gallery content | One `h1`, one `h2`, 43 card `h3`s; cards omit descriptions and stack details | Add a meaningful gallery `h2` and useful summary copy, without turning every card into an essay. |
| Gallery client data | `templates.ts` is approximately 280 KB of source and includes every inlined rebuild prompt | Split lightweight discovery data from server-only prompts; measure compiled transfer size before claiming a specific saving. |
| Copy assets | 96 nonempty `.md` files, one source bundle and one prompt per registered template, approximately 5.51 MB total | Source bundles are XML/CDATA documents despite the `.md` extension. Create useful HTML prompt/source landings; control raw asset indexation separately. |
| Copy sizes | `kinetic.md` about 308 KB; `cullet.md` about 222 KB; `understudy.md` about 208 KB | Do not place whole source bundles into initial HTML, React props, or JSON-LD. |
| Isolation | `scripts/check-isolation.ts` rejects template imports from outside their own group, including `@/` imports | Shared SEO logic must execute in scripts and emit local files for templates. A direct shared helper import in `(orrery)` would fail `bun run check`. |
| Existing redirects | `next.config.ts` redirects `/cairn` and descendants permanently to `/keytu` | Keep aliases out of the sitemap; preserve and test the redirect. |
| Existing CI | Vitest and Playwright exist; no `.github` workflow was found | Add SEO coverage to those systems and then wire a provider-specific pipeline. |

The active catalog by category is:

| Category ID | Count | Active slugs |
|---|---:|---|
| `3d-webgpu` | 10 | `amaoto`, `cullet`, `iridia`, `isobar`, `koji`, `lowtide`, `noctiluca`, `trace`, `vector`, `volume-zero` |
| `scroll-showcase` | 22 | `aftercart`, `alpine-reel`, `aubade`, `bathys`, `calder`, `chinagraph`, `firstday`, `fixture`, `flori`, `hiyas`, `kazeko`, `keytu`, `kinetic`, `loophouse`, `mio`, `nightline`, `nulo`, `pipkin`, `rill`, `satoyama`, `satsuma`, `understudy` |
| `conversion` | 7 | `handoff`, `nomi`, `openhouse`, `serein`, `tally`, `truecut`, `valence` |
| `editorial-magazine` | 2 | `verane`, `wowflutter` |
| `keynote-deck` | 2 | `assemblage`, `orrery` |

The 26 active root layouts that specifically need a new base are `src/app/(<slug>)/layout.tsx` for:

```text
amaoto, aubade, bathys, chinagraph, cullet, firstday, fixture,
flori, hiyas, iridia, isobar, keytu, kinetic, koji, lowtide,
nightline, noctiluca, nulo, orrery, rill, satsuma, serein,
understudy, verane, volume-zero, wowflutter
```

Normalize metadata on **all 43 active layouts**, including the other 17 that already have a base, because canonical URLs and the publisher/template positioning still need work.

### 1.2 Establish the canonical origin and environment policy first

The repository currently hard-codes `https://openlandingpage.vercel.app` in gallery metadata and several template layouts. The repository name and brand also suggest `openlanding.page`, but neither spelling establishes which host is actually the production canonical. Attempts to fetch both public hosts through the research browser were inconclusive. Confirm the production domain in Vercel and its real redirect chain before rollout.

Use the existing configured origin as the provisional default below. If the verified production domain is different, change the default and the `SITE_URL` environment value in the same change. All canonicals, sitemap entries, schema IDs, and internal absolute URLs must agree. Never derive them from `Host`, `VERCEL_URL`, an arbitrary request header, or a preview deployment hostname.

**Create `src/lib/seo/site.ts`:**

```ts
export const SITE_NAME = "openlandingpage";
export const TITLE_TEMPLATE = "%s | openlandingpage";
export const REPOSITORY_URL = "https://github.com/Famanias/openlanding.page";
export const LICENSE_URL = `${REPOSITORY_URL}/blob/master/LICENSE`;

function readSiteOrigin(value: string): string {
  const url = new URL(value);
  if (
    url.protocol !== "https:" || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash ||
    url.hostname === "localhost" || url.hostname === "127.0.0.1"
  ) {
    throw new Error("SITE_URL must be the HTTPS production origin without a path");
  }
  return url.origin;
}

export const SITE_ORIGIN = readSiteOrigin(
  process.env.SITE_URL || "https://openlandingpage.vercel.app",
);

export const INDEXABLE =
  process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL && process.env.SEO_INDEXABLE === "true");

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Expected an internal absolute path");
  }
  const url = new URL(path, SITE_ORIGIN);
  if (url.origin !== SITE_ORIGIN) throw new Error("Unexpected URL origin");
  return url.toString();
}
```

Set `SITE_URL` identically in production and preview builds. Vercel production is indexable; preview/development is not. For an intentional non-Vercel production deployment or a local production SEO test, explicitly set `SEO_INDEXABLE=true`. Protect preview deployments with authentication where available; their `noindex` headers are additional protection, not a security mechanism. These are build-time policy inputs: rebuild/regenerate after changing them.

### 1.3 Add the missing crawler entrypoints

**Create `src/app/sitemap.ts`:**

```ts
import type { MetadataRoute } from "next";
import { TEMPLATES } from "./(index)/data/templates";
import { absoluteUrl } from "../lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...TEMPLATES.map((template) => ({
      url: absoluteUrl(`/${template.slug}`),
      images: [absoluteUrl(template.previewImage)],
    })),
  ];
}
```

This is dynamically **derived from the registry at build time**, not a hand-maintained URL list and not an unnecessary request-time database query. Currently it returns 44 entries. `TEMPLATES` already excludes archived records. Do not substitute `RAW_TEMPLATES`, `scripts/templates.config.ts`'s `TEMPLATES`, or `tests/e2e/templates.ts`: those lists have different purposes and archive behavior.

No `lastModified` is emitted initially. `createdAt` is the creation/publication date, not evidence of the latest meaningful edit. Later add a reviewed `updatedAt?: "YYYY-MM-DD"` field and include `lastModified` only for records with that trustworthy value. Add an independently maintained gallery update date when its content changes significantly. Do not use every deployment timestamp or a per-request `new Date()`. A small single sitemap is sufficient; split with `generateSitemaps` only when genuine scale requires it. `priority` and `changeFrequency` are omitted because Google does not use them. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

**Create `src/app/robots.ts`:**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl, INDEXABLE } from "../lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

Keep `/_next/`, CSS, JavaScript, fonts, `/templates/` media assets, `/gallery/`, and image routes fetchable. In particular, blocking `/templates/` would block the project's existing image directory and the proposed directory hubs. Do not add an `Allow: /` rule to the nonindexable branch: it could conflict with the intended blanket block.

The production rules intentionally do **not** disallow `/copy/` or `/downloads/`. Those resources need to be crawlable to observe the response-level `noindex` described next. `robots.txt` governs fetching; it is not a reliable way to remove an already indexed URL. [Google noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

Both metadata files can live at `src/app/` without adding a global HTML layout. Use their default static/cached behavior. Do not add `dynamic = "force-static"`, `revalidate`, or `dynamicParams` recipes from older Next configurations to this Cache Components application. The installed references are `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` and `robots.md`.

### 1.4 Control raw source/download indexation with response headers

**Modify `next.config.ts`** by adding this `headers` method to the existing object, retaining its current redirects, Turbopack rules, and caching options. Import `INDEXABLE` from `./src/lib/seo/site` at the top.

```ts
async headers() {
  const rawAssets = ["/copy/:path*", "/downloads/:path*"];
  const rules = rawAssets.map((source) => ({
    source,
    headers: [
      { key: "X-Robots-Tag", value: "noindex" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ],
  }));
  if (!INDEXABLE) {
    rules.push({
      source: "/:path*",
      headers: [
        { key: "X-Robots-Tag", value: "noindex" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    });
  }
  return rules;
},
```

Check actual `Content-Type` values after deployment. Preserve downloads and source access; `noindex` does not mean access denied. Do not blanket-redirect source assets to HTML pages: they serve developers and copy actions. Retired raw bundles can remain accessible but should not become alternate search landings for the project. If existing raw files are already indexed, let crawlers fetch the new headers; do not block those paths first.

Leave the gallery's query UI functional. In Sprint 1 canonicalize `/?category=...`, `?model=...`, `?q=...`, `?sort=...`, and `?dir=...` to `/`, since these are client views of the gallery, not separate authored landing pages. Avoid creating server request-time metadata just to inspect query parameters in the cached homepage. Canonicals are a consolidation signal, not a crawl prohibition. In Sprint 3, expose approved clean hubs and avoid crawlable links to arbitrary filter combinations. Escalate to scoped facet crawl rules only if server logs/Search Console show an actual crawl problem and after deciding which parameter URLs must remain crawlable to see directives. [Google faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation)

### 1.5 Standardize metadata without breaking template isolation

**Create `src/lib/seo/metadata.ts`** for the gallery, proposed hubs, and build-time generation:

```ts
import type { Metadata } from "next";
import { absoluteUrl, INDEXABLE, SITE_NAME, SITE_ORIGIN } from "./site";

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function pageMetadata(input: PageMetadataInput): Metadata {
  const title = `${input.title} | ${SITE_NAME}`;
  const image = absoluteUrl(input.image || "/og/default.png");
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: title },
    description: input.description,
    alternates: { canonical: absoluteUrl(input.path) },
    robots: { index: INDEXABLE, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absoluteUrl(input.path),
      title,
      description: input.description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [{ url: image, alt: title }],
    },
  };
}
```

This function produces complete nested social objects instead of assuming a deep metadata merge. It returns absolute titles to prevent accidental double suffixes on hub pages. The root layout also establishes the requested title template for ordinary future child metadata.

**Modify `src/app/(index)/layout.tsx`**, preserving its fonts, CSS import, root markup, and icon configuration. Replace its current metadata export with:

```ts
const baseMetadata = pageMetadata({
  path: "/",
  title: "Free open-source landing page templates for AI agents",
  description:
    "Browse original Next.js landing pages with live previews, source code and rebuild prompts. Explore 3D, editorial and conversion designs under the MIT license.",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "Free landing page templates for AI agents | openlandingpage",
    template: "%s | openlandingpage",
  },
  icons: { icon: "/icon.svg" },
};
```

Add `import { pageMetadata } from "../../lib/seo/metadata"`. Character counts are editorial checks, not promises about Google's displayed title or description length. Keep the claim about code licensing distinct from third-party photo, font, and media rights.

For the individual template layouts, **generate local imports rather than importing `src/lib/seo` at runtime**. Create `scripts/generate-seo.ts` after creating the structured-data and component helpers in section 3:

```ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { TEMPLATES, CATEGORIES } from "../src/app/(index)/data/templates";
import { TEMPLATE_METADATA } from "./generate-copy-bundles";
import { TEMPLATES as TEMPLATE_CONFIG } from "./templates.config";
import { pageMetadata } from "../src/lib/seo/metadata";
import { SITE_NAME, SITE_ORIGIN } from "../src/lib/seo/site";
import { templateGraph } from "../src/lib/seo/structured-data";

const rendererSource = readFileSync("src/components/seo/JsonLd.tsx", "utf8");
const indexableExpression =
  'process.env.VERCEL_ENV === "production" || ' +
  '(!process.env.VERCEL && process.env.SEO_INDEXABLE === "true")';

function generatedOg(title: string, palette: string[]): string {
  if (palette.length < 2) throw new Error("A social card needs registered foreground/background colors");
  return `import { ImageResponse } from "next/og";
export const alt = ${JSON.stringify(`${title} — openlandingpage template`)};
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",height:"100%",padding:80,background:${JSON.stringify(palette[1])},color:${JSON.stringify(palette[0])}}}>
      <div style={{display:"flex",fontSize:64}}>{${JSON.stringify(title)}}</div>
      <div style={{display:"flex",fontSize:30,marginTop:32}}>Free open-source landing page template</div>
      <div style={{display:"flex",fontSize:24,marginTop:48}}>openlandingpage</div>
    </div>, size,
  );
}
`;
}

for (const template of TEMPLATES) {
  const root = path.join("src", "app", `(${template.slug})`);
  const category = CATEGORIES.find((item) => item.id === template.category)!;
  const input = {
    path: `/${template.slug}`,
    title: `${template.title} — ${category.label} landing page template`,
    description:
      `${template.description} Explore the live preview, MIT-licensed source and rebuild prompt.`,
  };
  const generated = pageMetadata(input);
  const literal = { ...generated, metadataBase: undefined, robots: undefined };
  const graph = templateGraph(template, TEMPLATE_METADATA[template.slug].dependencies);
  const source = `// Generated by scripts/generate-seo.ts.
import type { Metadata } from "next";
const indexable = ${indexableExpression};
export const metadata: Metadata = {
  ...${JSON.stringify(literal, null, 2)},
  metadataBase: new URL(${JSON.stringify(SITE_ORIGIN)}),
  title: { default: ${JSON.stringify(`${input.title} | ${SITE_NAME}`)}, template: "%s | openlandingpage" },
  robots: { index: indexable, follow: true },
};
export const templateJsonLd = ${JSON.stringify(graph, null, 2)};
`;
  writeFileSync(path.join(root, "seo.generated.ts"), source);
  writeFileSync(path.join(root, "SeoJsonLd.tsx"), rendererSource);

  const segment = path.join(root, template.slug);
  const hasOg = ["tsx", "ts", "js", "jsx", "png", "jpg", "jpeg", "gif"].some(
    (extension) => existsSync(path.join(segment, `opengraph-image.${extension}`)),
  );
  if (!hasOg) {
    writeFileSync(path.join(segment, "opengraph-image.tsx"), generatedOg(template.title, TEMPLATE_CONFIG[template.slug].palette));
  }
  const twitterFile = path.join(segment, "twitter-image.tsx");
  if (!existsSync(twitterFile) && existsSync(path.join(segment, "opengraph-image.tsx"))) {
    writeFileSync(twitterFile,
      'export { default, size, contentType } from "./opengraph-image";\n' +
      `export const alt = ${JSON.stringify(`${template.title} landing page template | openlandingpage`)};\n`);
  }
}
```

The generator intentionally uses only active templates and never overwrites an authored OG file. Its generated cards use registered template palette colors: `scripts/check-palette.ts` scans OG modules too, so inserting the gallery's dark palette into a NOMI/TRACE/VECTOR group would fail repository checks. Review the selected color roles and contrast before accepting each generated card. Twitter modules define their own alt text because several current OG modules do not export `alt`; blindly re-exporting that missing name would break the build. If future cards use static image files instead of a TypeScript OG module, generate the matching static Twitter file/metadata explicitly rather than creating an invalid TS re-export. Review generated titles/descriptions for repetition, excess length, and content mismatches before accepting them; an optional reviewed SEO override map should be keyed by `TemplateSlug` in the generator's inputs.

Also add an explicit `export const alt` to the existing active OG modules at `src/app/(<slug>)/<slug>/opengraph-image.tsx` for `aftercart`, `amaoto`, `assemblage`, `handoff`, `isobar`, `lowtide`, `nightline`, `openhouse`, `satoyama`, `tally`, `truecut`, and `valence`. These 12 files currently lack that export. Use the template's actual name and useful image description; for example, `export const alt = "LOWTIDE — moonlit tidal-flat landing page template";`. Preserve the authored image renderer.

Each active `src/app/(<slug>)/layout.tsx` then imports `metadata as generatedMetadata` from `./seo.generated` and replaces its old title/description/base/social export with a merge that retains its current `icons` and any legitimate route-specific metadata. Fonts, `viewport` exports, CSS, `<html lang>`, and body classes stay intact. Example for `src/app/(orrery)/layout.tsx`:

```ts
import { metadata as generatedMetadata } from "./seo.generated";

export const metadata: Metadata = generatedMetadata;
```

If a layout already has an icon override, use `export const metadata: Metadata = { ...generatedMetadata, icons: existingIcons };` after moving the actual existing icon object into `existingIcons`. Do not leave the previous metadata export alongside the new one. Do not retain fictional restaurant/product descriptions as the only search description: explain that the route is a reusable template while keeping the demonstration's visual copy intact.

**Also modify `src/app/(kinetic)/kinetic/page.tsx`:** it is the current exception with a page-level metadata export. Remove that stale title/description export so it inherits the generated template metadata, or replace it with aligned page-local metadata. A root-layout-only migration would leave KINETIC's fictional marketing description overriding the template explanation. Preserve its page subtree and viewport configuration, and remove the `Metadata` type import only if it becomes unused. Verify this route's final rendered description explicitly.

### 1.6 Create the gallery social image and a stable fallback

**Create `src/app/(index)/opengraph-image.tsx`:**

```tsx
import { ImageResponse } from "next/og";

export const alt = "openlandingpage — original landing pages your AI agent can build";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",
      width: "100%", height: "100%", padding: 80, background: "#101211", color: "#f4f1e9" }}>
      <div style={{ display: "flex", fontSize: 36, color: "#daf0bc" }}>openlandingpage</div>
      <div style={{ display: "flex", fontSize: 78, lineHeight: 1.08, marginTop: 36 }}>
        Landing pages your agent can build.
      </div>
      <div style={{ display: "flex", fontSize: 30, marginTop: 40 }}>
        Live previews. Source code. Rebuild prompts.
      </div>
    </div>,
    size,
  );
}
```

**Create `src/app/(index)/twitter-image.tsx`:**

```tsx
export { default, alt, size, contentType } from "./opengraph-image";
```

**Create `scripts/create-seo-default-image.ts`** and run it once to create and commit `public/og/default.png`:

```ts
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#101211"/>
<text x="80" y="200" fill="#daf0bc" font-family="sans-serif" font-size="48">openlandingpage</text>
<text x="80" y="310" fill="#f4f1e9" font-family="sans-serif" font-size="56">Free landing page templates</text>
<text x="80" y="400" fill="#f4f1e9" font-family="sans-serif" font-size="30">Live previews, source and rebuild prompts</text>
</svg>`;

await mkdir("public/og", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("public/og/default.png");
```

Fallback policy: metadata helpers point to this real, checked-in PNG when no authored image is configured. File-based OG/Twitter metadata takes precedence when present; a configured fallback is **not** an automatic rescue for a broken file-based route. CI must fetch and decode every emitted social image and fail the rollout if one is broken. Prefer local fonts or built-in Latin text in image generators; avoid network font downloads and glyphs unsupported by the chosen font. Keep existing template art, including `src/app/(cullet)/cullet/opengraph-image.tsx` and `src/app/(orrery)/orrery/opengraph-image.tsx`.

Do not guess URLs such as `/orrery/opengraph-image`: the current production build emits hashed filenames such as `/orrery/opengraph-image-1m0dso?...`. Let Next's file conventions emit the URLs and test those exact rendered values. [Next social-image conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

### 1.7 Build integration and exact file manifest

Add `seo:generate: "tsx scripts/generate-seo.ts"` to `package.json`. Make both `predev` and `prebuild` run `tsx scripts/generate-seo.ts && tsx scripts/generate-copy-bundles.ts`, in that order. Generate SEO before running tests in a clean checkout. Commit deterministic generated files after review; they contain the stable production origin, while their `indexable` expression evaluates the deployment environment without producing different source text for preview builds. Add a generator drift check after generation.

The local Next docs explain that `title.template` applies to child segments, requires a default, and does not rewrite a title in the same segment. `metadata` and `generateMetadata` stay in Server Components. Nested metadata is shallowly replaced. Prefer static local metadata; do not fetch votes, read cookies, or introduce `headers()` into otherwise static title generation. [Next metadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

| Action | Exact location |
|---|---|
| Create crawler routes | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Create shared source-of-truth helpers | `src/lib/seo/site.ts`, `src/lib/seo/metadata.ts`, `src/lib/seo/structured-data.ts` |
| Create reusable serializer/component | `src/components/seo/JsonLd.tsx` |
| Create generator/build asset script | `scripts/generate-seo.ts`, `scripts/create-seo-default-image.ts` |
| Create fallback image | `public/og/default.png` |
| Modify gallery metadata | `src/app/(index)/layout.tsx` |
| Create gallery cards | `src/app/(index)/opengraph-image.tsx`, `src/app/(index)/twitter-image.tsx` |
| Modify active template layouts | Every active `src/app/(<slug>)/layout.tsx`, as enumerated in the category inventory above |
| Resolve the child metadata override | `src/app/(kinetic)/kinetic/page.tsx` |
| Generate group-local SEO files | Every active `src/app/(<slug>)/seo.generated.ts` and `src/app/(<slug>)/SeoJsonLd.tsx` |
| Fill the three active missing OG cards | `src/app/(nomi)/nomi/opengraph-image.tsx`, `src/app/(trace)/trace/opengraph-image.tsx`, `src/app/(vector)/vector/opengraph-image.tsx` |
| Create Twitter image modules | Every active `src/app/(<slug>)/<slug>/twitter-image.tsx`, while preserving any future authored files |
| Add missing authored OG alt exports | The 12 active OG files listed in section 1.5 |
| Modify headers / orchestration | `next.config.ts`, `package.json` |
| Fix source-export metadata leakage | `scripts/generate-copy-bundles.ts`, described in section 3 |

<a id="rendering-and-cwv"></a>

## 2. Technical SEO & Core Web Vitals — Next.js 16 App Router

### 2.1 Preserve the existing SSR fallback, then verify the failure modes separately

The local HTTP audit found meaningful template text in all 43 active responses, excluding scripts. All active routes rendered one `h1`. The separate no-JavaScript pass inspected all 10 `3d-webgpu` pages and found their headings and section text present. ISOBAR's heading began at opacity zero during its CSS intro and reached opacity one after two seconds; its `<noscript>` reveal override worked. Do not misreport an initial animation frame as permanently missing content.

| Template / surface | Current architecture evidence | Specific improvement / protection |
|---|---|---|
| `/lowtide` | `lowtide/page.tsx` renders `TideTable` and `Experience`; `tidetable/TideTable.tsx` contains complete server text. `experience/Experience.tsx` imports `../engine/World` only after capability/idle decisions and preserves the table on error/context loss. | Use this as the reference pattern. Keep the copy visible when 3D fails, retain all meaningful links and source attribution, and test both boot failure and later context loss. |
| `/trace` | `TraceExperience.tsx` is a Client Component with DOM copy, but imports `three` at module top level. | Extract a server-rendered `TraceContent` and a separately loaded `TraceScene`; retain the current headline, sections, and controls. |
| `/vector` | `VectorExperience.tsx` likewise includes readable DOM and a top-level Three.js import. | Split narrative and renderer; avoid requiring canvas initialization to expose the main content. |
| `/koji` | Server page composes semantic sections; hero uses `<Wordmark as="h1">` and `HeroDish` receives a real poster. | Preserve the poster, responsive asset sizes, heading semantics, and existing Japanese-font preload decisions. |
| `/cullet`, `/amaoto`, `/volume-zero`, `/isobar`, `/iridia`, `/noctiluca` | No-JS responses contained headings and section text. Some visuals and headline treatments are elaborate. | Verify computed visibility, accessible text, fallback posters, runtime errors, and context loss rather than adding redundant hidden keyword text. |
| `/orrery` | Server page renders `OrreryDeck`, a Client Component with server-rendered deck content. | Keep inactive slide content available without wheel input, preserve mobile/reduced-motion reading order, and add a crawlable template-details link outside slide-only controls. |
| `/understudy` | `dock/Dock.tsx` lazily imports menu/start/ask sheets with `ssr: false`. | This does not prove the page lacks SSR: the laziness is scoped to interactive sheets. Keep primary copy and navigation outside those sheets. |

A crawler can index DOM text without WebGL, but a canvas's pixels are not a substitute for readable HTML. Use the same content model for the visual and textual experience; never serve search bots a separate keyword-expanded page. SSR supports non-JavaScript crawlers and avoids making discovery depend on Google's rendering queue. [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Test four distinct conditions: ordinary browser; JavaScript disabled; JavaScript enabled with WebGL/WebGPU unavailable; reduced motion. Separately use Search Console URL Inspection on deployed representative pages. Do not treat no-JS testing as proof that a WebGL exception preserves the page, or as proof of production indexing.

### 2.2 Lazy-load only the expensive visual layer

Create `src/app/(trace)/trace/TraceEnhancement.tsx` after extracting the existing renderer into `TraceScene.tsx` with a named `TraceScene` export. The extraction must preserve current scene behavior and cleanup; this wrapper is a complete integration example, not a replacement design:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./TraceScene").then((module) => module.TraceScene), {
  ssr: false,
  loading: () => <p role="status">Loading the interactive scene…</p>,
});

export function TraceEnhancement() {
  const slot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const element = slot.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = setTimeout(() => setEnabled(true), 300);
    }, { rootMargin: "100px" });
    observer.observe(element);
    return () => { observer.disconnect(); if (timer) clearTimeout(timer); };
  }, []);

  return (
    <div ref={slot} className="trace-scene-slot">
      {enabled ? <Scene /> : (
        <>
          <img src="/templates/trace/trace-preview.svg" width={1600} height={1000}
            alt="TRACE spatial dashboard preview" />
          <button type="button" onClick={() => setEnabled(true)}>Load interactive 3D</button>
        </>
      )}
    </div>
  );
}
```

The poster path and 1600 × 1000 viewBox match the inspected TRACE SVG. Reserve the scene slot's size in the group's CSS. The server `page.tsx` should render the extracted `TraceContent` independently of this enhancement. Add an error boundary or renderer-owned failure signal that returns the poster if boot fails; a dynamic import's loading fallback is not an error boundary. Adapt the same structure to VECTOR only after measuring its own scene and layout.

`ssr: false` belongs inside a Client Component. Placing it in a Server Component is unsupported. A dynamic import without delayed mounting can still download immediately, and moving an already eager scene behind CSS does not save its JavaScript. [Next lazy-loading guide](https://nextjs.org/docs/app/guides/lazy-loading)

### 2.3 Core Web Vitals and performance worklist

Field success means **p75 LCP ≤2.5 seconds, INP ≤200 ms, and CLS ≤0.1**, considered by device and page group. Establish Search Console/CrUX/RUM baselines before setting improvement claims. Low-traffic routes may not have URL-level field data; do not invent it or confuse origin aggregates with route-specific evidence. Lighthouse is a repeatable lab diagnostic, not field INP. [web.dev thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

| Priority | Files / subsystem | Action | Verification |
|---|---|---|---|
| P0 | `src/app/(index)/data/templates.ts`, `TemplateCard.tsx`, `GalleryShell.tsx` | Split discovery records from the inlined prompt constants. Fetch the chosen `/copy/<slug>-prompt.md` on copy, with a cache and existing pending/error feedback. Keep source bundles out of client props. | Compare gzip/brotli route payloads, hydration work, and click feedback before/after; preserve no-JS template links. |
| P0 | `TemplateCard.tsx`, generated gallery media manifest | Resolve whether `/gallery/<slug>.webp` exists at build time instead of paying a missing-image request followed by fallback. Preserve the current hydration-safe fallback as defense. | No avoidable gallery image 404s; intrinsic size/aspect ratio present; first useful image gets deliberate priority. |
| P1 | All template scene/engine entrypoints, starting TRACE and VECTOR | Delay large renderer/library imports; cap device pixel ratio; pause loops offscreen/when hidden; dispose resources on unmount/context loss. | Bundle diff and recorded main-thread/GPU behavior on a low-end mobile profile. |
| P1 | Root and template font declarations | Retain `next/font` self-hosting. Preload only critical families/weights. Keep KOJI's Japanese display/body families `preload: false`; its layout documents roughly 3 MB of slices if indiscriminately preloaded. LOWTIDE utility font already disables preload. | Inspect font requests and text swaps; check stable metrics and supported glyphs. |
| P1 | Hero images and `assets.tsx`/`Picture` helpers | Keep responsive AVIF/WebP, correct `sizes`, real width/height, meaningful alt text. Prefer the current asset pipeline where appropriate; migration to `next/image` is selective, not mandatory. | No layout jump; useful sharpness at mobile/desktop; LCP element request discovered early. |
| P1 | Gallery video lifecycle | Keep `preload="none"`, muted previews, offscreen pausing, reduced-motion behavior, and meaningful poster images. Delay network requests for offscreen clips if current `src` assignment fetches unnecessary data. | Existing gallery autoplay/motion tests remain green; network waterfall shrinks without losing preview behavior. |
| P1 | `Header.tsx`, filters, votes | Preserve input responsiveness; defer expensive filtering where needed, keep vote counts client-fetched, and avoid rerendering every scene on scroll. | Interaction traces for typing, category changes, vote/revoke, and select controls. |
| P2 | Motion/GSAP/Lenis integration | Use one measured scroll coordinator per template where already designed; avoid layout reads/writes in alternating loops; honor native touch and reduced motion. | No long-task spikes or hidden text after animation failure. |
| P2 | Caching and build pipeline | Keep cached homepage/local metadata static; do not introduce Redis/cookie calls into its render or JSON-LD. Cache generated images and immutable media through normal Next/Vercel behavior. | Build output still identifies static gallery/templates and dynamic votes separately. |

Next 16 deprecates the `next/image` `priority` prop in favor of `preload`. Choose `preload` for a known critical LCP image, or the documented eager/fetch-priority strategy when appropriate; do not stack `preload`, `loading`, and `fetchPriority` indiscriminately. Native `<img>` uses its native attributes rather than a nonexistent native `preload` prop. [Next Image reference](https://nextjs.org/docs/app/api-reference/components/image)

Set initial lab budgets only after measuring the baseline: no >10% regression in compressed route JavaScript, no new long task caused by an SEO component, and no CLS from added publisher navigation or thumbnails. These are proposed engineering gates, not measured current failures. Add RUM with an approved analytics implementation; never send search strings, visitor cookies, raw IPs, or vote identifiers as analytics dimensions.

### 2.4 Semantic HTML and heading hierarchy

- Keep one meaningful page-level `h1` on the gallery and each preview; the rendered audit already meets this baseline. `src/app/(koji)/koji/sections/Hero.tsx` uses `Wordmark as="h1"`, and CALDER's hero uses `Lines as="h1"`; a source-code regex incorrectly reports both as missing headings.
- Add a real `h2` such as “Explore landing page templates” to `src/app/(index)/components/GalleryShell.tsx`, using `aria-labelledby="gallery-title"`. The current card titles are `h3` without a gallery section heading before them. Preserve the Contribute section's own `h2`.
- Give major template sections descriptive `h2`s and subordinate items `h3`s. Do not change every visual large label into a heading. Preserve the existing heading text/content models.
- Audit decorative duplicate headline text in `src/app/(volume-zero)/volume-zero/sections/Hero.tsx`, FIXTURE and CHINAGRAPH hero components. Raw text extraction includes both split animated and accessible copies; confirm duplicate visual spans are `aria-hidden` and the accessible name is spoken once.
- Keep section IDs stable for native anchors, skip links, breadcrumbs, and source citations. Avoid button-only navigation for destinations that should be linked.
- Preserve actual language declarations (`en`, `en-GB`) and mark inline Japanese text where appropriate. Do not add `hreflang` for isolated Japanese words or a Japanese-inspired fictional brand; it requires real alternate-language pages.
- Preserve readable copy in default CSS, native disclosures, or accessible fallbacks. Do not add offscreen keyword blocks purely to manipulate rankings. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

<a id="structured-data"></a>

## 3. Structured Data & Rich Snippets — Schema.org / JSON-LD

### 3.1 Model the publisher, collection, and source code truthfully

The gallery is a `WebSite` with a `CollectionPage` and its actual `ItemList`. An optional `SoftwareApplication` node can describe the working browser/filter application. Template code is well represented by `SoftwareSourceCode`, a subtype of `CreativeWork`; a preview's fictional restaurant, law firm, sleep ring, reviews, addresses, or sales figures are not real business facts about openlandingpage.

Use stable IDs such as `/#website`, `/#gallery`, `/orrery#source-code`, and `/orrery#preview`. Include real publication dates from `createdAt`, code licensing, repository links, actual stack, prompt URL, live preview URL, source bundle, and dependencies. Add `dateModified` only with reviewed update data. Do not put a full prompt or source bundle into structured data.

Semantic validity does not guarantee a Google rich result. Google-supported software-app rich results have requirements including a genuine rating/review; the current thumbs-up/down feedback is not a supported five-star average. Do not synthesize `AggregateRating`, product reviews, offers for fictional businesses, or a real `LocalBusiness` from demo content. Omit unavailable fields. [SoftwareSourceCode vocabulary](https://schema.org/SoftwareSourceCode), [Google software-app eligibility](https://developers.google.com/search/docs/appearance/structured-data/software-app), [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### 3.2 Reusable graph generator

**Create `src/lib/seo/structured-data.ts`:**

```ts
import type { TemplateItem } from "../../app/(index)/data/templates";
import { absoluteUrl, LICENSE_URL, REPOSITORY_URL, SITE_NAME } from "./site";

export type JsonLdNode = Record<string, unknown>;

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: "Original open-source landing pages with working previews and rebuild prompts.",
  };
}

export function collectionGraph(
  templates: TemplateItem[],
  path = "/",
  name = "Free open-source landing page templates",
): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#gallery`,
        url,
        name,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: templates.length,
          itemListElement: templates.map((template, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareSourceCode",
              "@id": absoluteUrl(`/${template.slug}#source-code`),
              name: `${template.title} landing page template`,
              url: absoluteUrl(`/${template.slug}`),
            },
          })),
        },
      },
    ],
  };
}

export function templateGraph(template: TemplateItem, dependencies: string[]): JsonLdNode {
  const url = absoluteUrl(`/${template.slug}`);
  const sourceUrl = absoluteUrl(`/copy/${template.slug}.md`);
  const promptUrl = absoluteUrl(`/copy/${template.slug}-prompt.md`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#source-code`,
        url,
        name: `${template.title} landing page template`,
        description: template.description,
        datePublished: template.createdAt,
        license: LICENSE_URL,
        isAccessibleForFree: true,
        codeRepository: REPOSITORY_URL,
        codeSampleType: "Full landing page template",
        programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
        runtimePlatform: template.stack,
        keywords: [template.category, template.industry, ...template.badges].join(", "),
        image: absoluteUrl(template.previewImage),
        targetProduct: {
          "@type": "SoftwareApplication",
          "@id": `${url}#preview`,
          name: `${template.title} interactive template preview`,
          url,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web browser",
          softwareRequirements: dependencies.length
            ? dependencies.join(", ")
            : "The repository's Next.js, React and build-tool dependencies",
        },
        associatedMedia: [
          { "@type": "MediaObject", name: "Source bundle", contentUrl: sourceUrl,
            encodingFormat: "text/plain" },
          { "@type": "MediaObject", name: "Rebuild prompt", contentUrl: promptUrl,
            encodingFormat: "text/plain" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `${template.title} — live landing page template preview`,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": `${url}#source-code` },
      },
    ],
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
```

`softwareRequirements` belongs on the `SoftwareApplication` target rather than being invented as an unsupported source-code dependency property. The dependency list comes from `TEMPLATE_METADATA`, not the complete monorepo's package list. During the metadata audit, verify each list against actual imports; catalog stack strings are authored descriptions and should not be treated as a perfect package manifest. If a template does not actually use one of the three listed programming languages, emit its reviewed language list instead of the generic default.

For the optional homepage application node, add this object to the homepage graph only if the visible page describes its working browser/filter functionality:

```ts
const browserApplication = {
  "@type": "SoftwareApplication",
  "@id": absoluteUrl("/#template-browser"),
  name: "openlandingpage template browser",
  url: absoluteUrl("/"),
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web browser",
  isAccessibleForFree: true,
};
```

Keep the homepage `WebSite` name and IDs stable. A `SearchAction` is not necessary to describe the current client search and will not recover Google's retired Sitelinks Search Box feature. [Google site-name guidance](https://developers.google.com/search/docs/appearance/site-names), [search-box retirement](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)

### 3.3 Reusable safe server-rendered component and integration

**Create `src/components/seo/JsonLd.tsx`:**

```tsx
export function JsonLd({ data, id }: { data: unknown; id?: string }) {
  if (data === null || data === undefined) return null;
  const serialized = JSON.stringify(data);
  if (!serialized) return null;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized.replace(/</g, "\\u003c") }}
    />
  );
}
```

It intentionally has no cross-module imports, allowing the generator to copy it into each template group. Escaping `<` prevents content such as `</script>` from breaking out of the JSON script. Use a native server-rendered script, not `next/script` with delayed execution. [Next JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld)

**Modify `src/app/(index)/page.tsx`:** import `JsonLd` from `../../components/seo/JsonLd`, `collectionGraph` from `../../lib/seo/structured-data`, and `TEMPLATES` from `./data/templates`. Render `<JsonLd id="gallery-jsonld" data={collectionGraph(TEMPLATES)} />` once inside the existing page wrapper. Keep `"use cache"`. The graph describes the default SSR catalog order; do not mutate the server graph when client-only vote sorting changes.

**Modify each active preview page** to import its local generated graph and renderer. For example, `src/app/(orrery)/orrery/page.tsx` becomes:

```tsx
import { OrreryDeck } from "./OrreryDeck";
import { templateJsonLd } from "../seo.generated";
import { JsonLd } from "../SeoJsonLd";

export default function OrreryPage() {
  return (
    <>
      <JsonLd id="template-jsonld" data={templateJsonLd} />
      <OrreryDeck />
    </>
  );
}
```

Apply the same imports/wrapper to the actual existing subtree of every active template page; do not duplicate its `main`, `h1`, root layout, or markup. The generated files remain inside the group's isolation boundary. Do not inject an active source-code graph into archived `notFound()` routes.

### 3.4 Keep publisher SEO out of reusable exports

Generated local metadata solves isolation, but copying its publisher canonical into a user's deployed clone would be harmful. **Modify `scripts/generate-copy-bundles.ts`** so generated publisher metadata is replaced by portable metadata when building the download/source bundle. Keep every referenced local module present; simply excluding `seo.generated.ts` would create a dangling import.

Add this exported helper and call it on `readTemplateFiles(slug)` immediately before `formatRepomixBundle`:

```ts
export function portableCopyFiles(
  slug: TemplateSlug,
  files: { path: string; source: string }[],
): { path: string; source: string }[] {
  const meta = TEMPLATE_METADATA[slug];
  return files.map((file) => {
    if (!file.path.endsWith("/seo.generated.ts")) return file;
    return {
      ...file,
      source: `import type { Metadata } from "next";
export const metadata: Metadata = {
  title: ${JSON.stringify(meta.name)},
  description: ${JSON.stringify(`${meta.name} landing page template`)},
};
export const templateJsonLd = null;
`,
    };
  });
}
```

This strips the publisher canonical, robots policy, and hosted graph from reusable source while preserving local imports and compilation. The local renderer returns nothing for `null`. Add an analogous no-op export for any later generated publisher-only navigation component that is referenced by template code. Standalone `public/downloads/<slug>.html` files should likewise avoid canonicals or JSON-LD that misidentify a user's clone as the hosted original.

Validate graph syntax with Schema Markup Validator and Google-supported features with Rich Results Test. Ensure every public attribute is backed by visible page content or a working linked asset. Neither validator promises that Google will display an enhanced result.

<a id="keywords-and-intent"></a>

## 4. Target Keyword Universe & Search Intent

### 4.1 Positioning and keyword research method

The main audience is developers, designers who work with coding agents, and founders choosing a reusable page. Their useful conversion is opening a preview, using a rebuild prompt, obtaining source, or downloading an available standalone file. Searches for a fictional restaurant reservation or imaginary sleep ring purchase are not the acquisition objective.

No Search Console, paid keyword data, backlink index, or current SERP ranking data was available for this plan. The keyword sets below are **intent hypotheses**, not measured volumes or difficulty scores. Prioritize them by relevance to working assets and then validate with Search Console queries, country/device data, and manual SERP review. Search Console average position should be segmented by query/page/device; it is not a universal rank.

Before publishing a page, record: primary intent, target query family, assigned canonical URL, existing competing page, the catalog evidence it uses, a meaningful developer action, and a planned evaluation date. Maintain this mapping in a reviewed `docs/seo-keywords.csv` or equivalent planning table. One page can serve a closely related cluster; do not create a new URL for every synonym, model spelling, or word order.

### 4.2 Tiered keyword-to-page mapping

URLs in this table are proposed unless already identified as existing previews. Publish only the approved hubs/content described in sections 5 and 6.

| Tier | Query cluster / examples | Search intent | Assigned page | Required evidence and conversion |
|---|---|---|---|---|
| 1: core catalog | **AI agent landing page templates**, landing pages for coding agents, AI-ready landing page templates | Find source an agent can actually rebuild | `/` | Real previews, code/prompt links, licensing statement, useful category choices; open preview or copy prompt. |
| 1: core catalog | **open source landing pages**, free open-source landing page templates, MIT landing page templates | Obtain reusable code with clear terms | `/` | MIT code license, repository, working download/source paths; avoid a second nearly identical “free templates” landing. |
| 1: framework | **Next.js 16 landing page templates**, Next.js App Router landing pages | Find compatible starter code | `/templates/stack/nextjs-16` after unique framework guidance is authored | Actual package version, route-group installation steps, known limitations, source exports. This hub would otherwise overlap most of `/`. |
| 1: graphics | **free Three.js website templates**, Three.js landing page templates, interactive 3D website source code | Reuse a renderer-backed design | `/templates/stack/threejs` | Reviewed actual Three.js dependencies and runnable examples; do not label every WebGL/CSS-3D template Three.js. |
| 1: format | keynote website template, presentation landing page template, slide-based landing page | Find a presentation interaction | `/templates/category/keynote-deck` | Orrery/Assemblage comparison, keyboard and mobile behavior; open the appropriate preview. |
| 1: conversion | free conversion landing page template, service business landing page source | Find a practical acquisition page | `/templates/category/conversion` | Seven current examples, honest local-form/demo limitations, CTA patterns; copy a matching brief. |
| 2: design discovery | **Next.js 16 landing page inspiration**, animated landing page examples | Compare working visual references | `/templates` and relevant category hubs, with `/templates` owning broad inspiration intent | Screenshots plus accessible previews, editorial selection notes, not an image-only wall. |
| 2: scroll motion | scroll storytelling website template, GSAP landing page source, cinematic scroll website examples | Study or reuse a motion pattern | `/templates/category/scroll-showcase` and `/templates/stack/gsap`, when distinct | Separate behavior-led and library-led selection; explain reduced-motion alternatives and actual dependencies. |
| 2: editorial | editorial magazine website template, CSS page-turn website example | Reuse an editorial format | `/templates/category/editorial-magazine` | Two strong examples can support a useful curated comparison; do not pretend the category has dozens of results. |
| 2: graphics API | WebGPU landing page template, TSL shader website example, WebGL2 website source | Find a specific rendering stack | `/templates/stack/webgpu` or a targeted guide | Verify API use in code; explain support/fallback distinctions and avoid merging WebGL2 and WebGPU into an inaccurate promise. |
| 2: industry | restaurant landing page template Next.js, food delivery landing page source | Find a matching business pattern | `/templates/industry/food-and-dining` after review | KOJI/Pipkin and any other genuinely matching records; fictional demo disclosure and installation instructions. |
| 2: industry | developer tools landing page template, AI SaaS landing page example | Choose a product presentation pattern | `/templates/industry/developer-tools` after review | Orrery/VECTOR and reviewed matching inventory; source and prompt actions. |
| 2: model family | Claude landing page examples, OpenAI coding-agent website templates, Gemini landing page prompts | Compare authored outputs by recorded model family | `/templates/model/claude`, `/templates/model/openai`, `/templates/model/gemini`, only with useful comparisons | Treat model labels as recorded provenance, not verified provider release claims, quality rankings, or endorsements. |
| 3: named source | Orrery landing page template source, KOJI website template code | Obtain a specific example | `/templates/orrery`, `/templates/koji` in Sprint 4 | A source/detail page with install steps, preview, package list, prompt, constraints and license. |
| 3: prompts | **landing page prompt for AI coding agent**, Next.js landing page rebuild prompt, Three.js website generation prompt | Learn a reproducible prompting method | `/guides/landing-page-prompts` plus approved `/prompts/<slug>` pages | Complete selected prompts, annotations, required assets, observed limitations, working result links; copy the prompt. |
| 3: component patterns | animated chapter rail React example, accessible keynote navigation Next.js, reduced-motion WebGL fallback | Solve a concrete implementation problem | `/guides/accessible-keynote-navigation`, `/guides/webgl-fallbacks`, selected source detail sections | Explain actual local modules and show a bounded code excerpt; do not claim a polished component package exists. |
| 3: copy patterns | service landing page CTA examples, hospitality landing page headline examples, editorial hero copy inspiration | Study copy that fits a layout | A substantive copy guide and selected `/templates/<slug>` sections | Label all example brands/claims fictional, explain decisions, link to the functioning design. |
| 3: palettes | dark glass UI color palette, open-source landing page color palettes, KOJI color palette | Reuse a coherent design system | `/palettes` and approved `/palettes/<slug>` pages | Palette values from `scripts/templates.config.ts`, roles/contrast notes, screenshots and actual token examples. |
| 4: education | migrate a landing page to Next.js App Router, make a WebGL landing page accessible, export a readable HTML landing page | Learn a workflow and discover the catalog | `/guides` articles tied to existing code and exports | Working examples, tested instructions, explicit prerequisites; link to a small useful set of templates. |

Do not target “HTML template download” on every template until its standalone file exists. At inspection only Alpine Reel has `public/downloads/alpine-reel.html`; other visible controls correctly indicate that the export is coming soon. Source bundles and React previews are different deliverables. Titles, schema, CTAs, and guide claims must preserve that distinction.

### 4.3 Convert existing assets into useful indexable content

**Template detail pages:** `/templates/<slug>` should be a publisher-owned explanation separate from `/<slug>`'s visual demo. Use a direct heading such as “Orrery AI landing page template,” a representative screenshot, real stack/dependencies, the signature interaction, accessibility/fallback behavior, setup commands, what can be customized, licensing/media caveats, preview/source/prompt actions, and three related examples. The preview retains a self-canonical because a running fictional-brand page and a source explanation are different documents; do not canonicalize every preview to its detail page by default.

**Prompt pages:** select prompts with a distinct useful teaching angle. Render the human-readable Markdown in server HTML, with safe formatting and a real “Copy prompt” action. Explain which constraints drove the design, which assets/dependencies are needed, and where a developer should edit the prompt. Prefer controlled structured content or a Markdown renderer with raw HTML disabled; do not use an unsanitized Markdown-to-HTML pipeline. Avoid brittle regular-expression stripping of Markdown. The `.md` asset stays downloadable and `noindex`; its HTML explanation is the search landing.

**Source bundles:** `public/copy/<slug>.md` contains `<template>`, `<dependencies>`, `<files>`, and CDATA source. Present a readable package summary and selected file excerpts, then link to the complete asset. Do not pretend that dumping XML into an HTML `<pre>` creates a helpful source guide. Any excerpt must retain relevant license notices and link to the complete source.

**Palette pages:** reuse authoritative color arrays from `scripts/templates.config.ts`, but add semantic roles from each template's CSS/DESIGN.md and actual contrast tests. Raw hex values are not enough to infer a role. Describe the relationship between background, text, accent, and motion; provide code tokens and a working preview. Avoid dozens of pages that differ only in a palette name.

**Pattern guides:** use existing modules as evidence: LOWTIDE's `TideTable`/`Experience` split for graphics fallback, ORRERY's deck for keyboard navigation, KOJI's poster/font decisions for art-led performance, and the gallery's filters/votes for progressive enhancement. Benchmark and verify any performance claims before publishing them.

### 4.4 Editorial and distribution plan

For the first eight weeks after technical approval, use a sustainable editorial cadence: one substantial guide or comparison each week, plus two carefully reviewed template/prompt detail pages. This is a capacity assumption to adjust to the team, not a ranking formula or a requirement to hit a word count. Start with the strongest working examples and update the same pages when their source changes.

Each piece should have an accountable reviewer, a genuine worked example, its own search intent, accurate code/setup steps, meaningful images with alt text, links to source/preview, and a measured conversion event. Record publication and significant-update dates. Do not stamp every article “updated today” on each deployment.

Potential distribution assets are an improved repository README directory, project-specific release notes, a public change log, a carefully prepared comparison of accessible 3D patterns, and authored demos for relevant developer communities. Seek relevant editorial references through useful original work; avoid paid link schemes, automated directory spam, reciprocal-link farms, or scaled generic guest posts. Any outreach is future work requiring its own explicit authorization; this plan sends no messages.

Use Search Console data every two weeks to identify useful clusters with impressions but weak matching pages. Improve titles/descriptions where the SERP proposition is unclear, expand genuinely missing explanations, and consolidate overlapping pages. CTR evaluation must account for position, query intent, branded traffic, device, and SERP features. Traffic growth without source/prompt/preview engagement is not the sole success measure.

Programmatic generation should organize real assets and reviewed editorial value. Bulk generation primarily intended to manipulate rankings is a policy risk regardless of whether the text is AI-written. [Google scaled-content policy](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)

<a id="directory-architecture"></a>

## 5. Programmatic Directory & Hub Architecture

### 5.1 URL architecture and indexation gates

Keep the existing preview URLs stable. Add publisher-owned pages under the gallery root group so they inherit its design, metadata policy, and lightweight rendering without altering standalone template brands.

| Public URL | Proposed source path | Purpose / launch gate |
|---|---|---|
| `/templates` | `src/app/(index)/templates/page.tsx` | Browse approved categories and directories; broad inspiration intent. |
| `/templates/category/<value>` | `src/app/(index)/templates/category/[value]/page.tsx` | Five useful current categories, with original selection guidance. |
| `/templates/industry/<value>` | `src/app/(index)/templates/industry/[value]/page.tsx` | Reviewed normalized industry clusters; publish after sufficient relevant examples and editorial context exist. |
| `/templates/stack/<value>` | `src/app/(index)/templates/stack/[value]/page.tsx` | Verified technology/interaction requirements; avoid generic duplicate React/Next/Tailwind pages with the same list and copy. |
| `/templates/model/<value>` | `src/app/(index)/templates/model/[value]/page.tsx` | Recorded model-family provenance with useful comparison notes. |
| `/templates/<slug>` | `src/app/(index)/templates/[slug]/page.tsx` | In Sprint 4, a detailed publisher-owned source explanation. |
| `/prompts/<slug>` | `src/app/(index)/prompts/[slug]/page.tsx` | Approved, annotated rebuild prompts. |
| `/palettes` and `/palettes/<slug>` | `src/app/(index)/palettes/page.tsx`, `palettes/[slug]/page.tsx` | Approved palette guides, not automated hex-only pages. |
| `/guides/<slug>` | `src/app/(index)/guides/[slug]/page.tsx` | Authored education and pattern comparisons. |

The existing `public/templates/<slug>/...` directory contains assets. Fixed paths such as `/templates/category/<value>` avoid making a broad two-parameter route compete with `/templates/orrery/title-orbits-1600.webp`. Reserve `category`, `industry`, `stack`, and `model` from future template slugs and test that all existing asset URLs still return their original media. The single-segment detail route is distinct from those asset filenames, but must still reject unknown/archived slugs.

A route is indexable only when its canonical is stable, it returns 200, its subset is accurate, its introduction offers a real selection rationale, its items/actions work, and its intent does not merely duplicate another page. Three or more examples is a reasonable editorial default for a new broad hub, not a Google rule. The two-item keynote and editorial categories are valid exceptions when they provide a substantive comparison. Consolidate narrow industry terms instead of publishing empty or one-item boilerplate hubs.

Draft facets should remain unpublished until approved, rather than making every generated URL publicly crawlable and hoping `noindex` will solve thin content. Do not generate category × industry × stack × model × sort × search combinations. Pagination becomes necessary only when there is a real catalog need; use bounded crawlable page URLs, self-canonicals for distinct paginated content, and a real next-page link. Do not canonicalize all substantial later pages to page one or hide discovery behind infinite scrolling.

### 5.2 Generate bounded hub membership from the catalog

**Create `src/app/(index)/data/seo-hubs.ts`:** the following initial registry derives all memberships from current records and separates proposed facets from approved publication.

```ts
import { CATEGORIES, TEMPLATES, type TemplateItem } from "./templates";
import { modelFamily } from "./filters";

export type HubFacet = "category" | "industry" | "stack" | "model";
export type SeoHub = {
  facet: HubFacet;
  value: string;
  title: string;
  description: string;
  intro: string;
  templates: TemplateItem[];
};

const categoryIntros: Record<string, string> = {
  "keynote-deck": "Compare slide-led pages for pitches and product explanations. Start with how each design handles keyboard navigation, chapter order and a readable mobile fallback.",
  "scroll-showcase": "Explore pages whose story unfolds while scrolling. Compare the central interaction, media requirements and reduced-motion reading experience before choosing source to reuse.",
  "3d-webgpu": "Compare 3D and graphics-led pages by their actual renderer and fallback. This collection includes different technologies; check each template's stack rather than assuming every scene uses Three.js or WebGPU.",
  "editorial-magazine": "Study editorial layouts with distinct reading rhythms and typography. Compare the magazine and fragrance narratives, then inspect their source and interaction constraints.",
  conversion: "Choose a service or product landing page by its offer, CTA and form behavior. These are working fictional-brand demonstrations; inspect what runs locally before connecting a real backend.",
};

const categories: SeoHub[] = CATEGORIES.filter((category) => category.id !== "all").map(
  (category) => ({
    facet: "category",
    value: category.id,
    title: `${category.label} landing page templates`,
    description: `Explore original ${category.label.toLowerCase()} landing pages with live previews, source and rebuild prompts.`,
    intro: categoryIntros[category.id],
    templates: TEMPLATES.filter((template) => template.category === category.id),
  }),
);

const stackDefinitions = [
  { value: "threejs", label: "Three.js", matches: /Three\.js/i },
  { value: "webgpu", label: "WebGPU and TSL", matches: /WebGPU|\bTSL\b/i },
  { value: "gsap", label: "GSAP", matches: /\bGSAP\b/i },
  { value: "lenis", label: "Lenis", matches: /\bLenis\b/i },
];

const stacks: SeoHub[] = stackDefinitions.map((definition) => ({
  facet: "stack",
  value: definition.value,
  title: `${definition.label} landing page templates`,
  description: `Browse templates whose recorded stack includes ${definition.label}.`,
  intro: `Inspect the ${definition.label} integration, dependencies and fallback in each linked example.`,
  templates: TEMPLATES.filter((template) => definition.matches.test(template.stack)),
}));

const modelDefinitions = [
  { value: "claude", label: "Claude" },
  { value: "openai", label: "OpenAI" },
  { value: "gemini", label: "Gemini" },
] as const;

const models: SeoHub[] = modelDefinitions.map((definition) => ({
  facet: "model",
  value: definition.value,
  title: `Landing pages recorded as made with ${definition.label}`,
  description: `Inspect original templates with ${definition.label}-family provenance in the catalog.`,
  intro: "Model labels describe recorded provenance. Compare the actual source, interaction and accessibility behavior rather than assuming a label establishes quality.",
  templates: TEMPLATES.filter((template) => modelFamily(template.model) === definition.value),
}));

const industryDefinitions = [
  { value: "food-and-dining", label: "Food and dining", matches: /Hospitality|Dining|Food|Meal/i },
  { value: "developer-tools", label: "Developer tools", matches: /DevTools|Developer Tools/i },
  { value: "creative-services", label: "Creative services", matches: /Illustration|Design|Creative|Art Direction/i },
];

const industries: SeoHub[] = industryDefinitions.map((definition) => ({
  facet: "industry",
  value: definition.value,
  title: `${definition.label} landing page templates`,
  description: `Explore reusable fictional-brand landing pages for ${definition.label.toLowerCase()}.`,
  intro: "Review the audience, offer and assets in each example before adapting its source to a real business.",
  templates: TEMPLATES.filter((template) => definition.matches.test(template.industry)),
}));

export const ALL_HUBS = [...categories, ...industries, ...stacks, ...models].filter(
  (hub) => hub.templates.length > 0,
);

// Expand only after reviewing membership, original copy and distinct search intent.
const approvedHubIds = new Set(categories.map((hub) => `${hub.facet}/${hub.value}`));

export const PUBLISHED_HUBS = ALL_HUBS.filter(
  (hub) => approvedHubIds.has(`${hub.facet}/${hub.value}`),
);

export function hubPath(hub: Pick<SeoHub, "facet" | "value">): string {
  return `/templates/${hub.facet}/${hub.value}`;
}

export function publishedHub(facet: HubFacet, value: string): SeoHub | undefined {
  return PUBLISHED_HUBS.find((hub) => hub.facet === facet && hub.value === value);
}
```

The regexes are a bootstrap against the existing free-text fields, not permanent ontology. Before approving stack/industry pages, replace ambiguous matches with reviewed normalized fields such as `technologies: TechnologyId[]` and `industries: IndustryId[]`, and verify them against imports and content. Do not equate `modelFamily` with a version-specific provider capability claim. Keep future exact model names separate from the stable family URL.

### 5.3 Server-render the approved directory routes

**Create `src/app/(index)/components/SeoHubPage.tsx`:**

```tsx
import { notFound } from "next/navigation";
import { JsonLd } from "../../../components/seo/JsonLd";
import { pageMetadata } from "../../../lib/seo/metadata";
import { breadcrumbGraph, collectionGraph } from "../../../lib/seo/structured-data";
import { hubPath, publishedHub, PUBLISHED_HUBS, type HubFacet } from "../data/seo-hubs";
import { Footer } from "./Footer";

export function hubParams(facet: HubFacet) {
  return PUBLISHED_HUBS.filter((hub) => hub.facet === facet).map((hub) => ({ value: hub.value }));
}

export function hubMetadata(facet: HubFacet, value: string) {
  const hub = publishedHub(facet, value);
  if (!hub) notFound();
  return pageMetadata({ path: hubPath(hub), title: hub.title, description: hub.description });
}

export async function renderHub(facet: HubFacet, value: string) {
  "use cache";
  const hub = publishedHub(facet, value);
  if (!hub) notFound();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: hub.title, path: hubPath(hub) },
  ];
  return (
    <div className="site-shell">
      <header className="page-container"><a href="/">openlandingpage</a></header>
      <main className="page-container" id="main-content">
        <nav aria-label="Breadcrumb"><ol>{breadcrumbs.map((item, index) => (
          <li key={item.path}>{index === breadcrumbs.length - 1
            ? <span aria-current="page">{item.name}</span>
            : <a href={item.path}>{item.name}</a>}</li>
        ))}</ol></nav>
        <h1>{hub.title}</h1>
        <p>{hub.intro}</p>
        <p>{hub.templates.length} matching templates</p>
        <ul>{hub.templates.map((template) => (
          <li key={template.slug}>
            <article>
              <h2><a href={`/${template.slug}`}>{template.title}</a></h2>
              <p>{template.description}</p>
              <p>{template.stack}</p>
              <a href={`/copy/${template.slug}-prompt.md`}>Read the rebuild prompt</a>
            </article>
          </li>
        ))}</ul>
        <JsonLd data={collectionGraph(hub.templates, hubPath(hub), hub.title)} />
        <JsonLd data={breadcrumbGraph(breadcrumbs)} />
      </main>
      <Footer />
    </div>
  );
}
```

Style the directory with the existing gallery tokens and a reviewed responsive server-rendered card layout. This example intentionally does not reuse the current `Header` search form: it writes filters onto the **current pathname**, so unmodified reuse on a directory would create a misleading search. Either add a deliberate “Search all templates” link to `/`, or adapt `Header.tsx` so searching outside the homepage navigates to the root gallery. Do not silently ship a search control that only changes a directory URL's query without filtering its content.

Create these four explicit route modules. They keep `params` asynchronous and reject unknown/unpublished values through `publishedHub`; do not add `dynamicParams = false` under Cache Components.

**`src/app/(index)/templates/category/[value]/page.tsx`:**

```tsx
import { hubMetadata, hubParams, renderHub } from "../../../components/SeoHubPage";
type Props = { params: Promise<{ value: string }> };
export function generateStaticParams() { return hubParams("category"); }
export async function generateMetadata({ params }: Props) {
  return hubMetadata("category", (await params).value);
}
export default async function Page({ params }: Props) {
  return renderHub("category", (await params).value);
}
```

**`src/app/(index)/templates/industry/[value]/page.tsx`:**

```tsx
import { hubMetadata, hubParams, renderHub } from "../../../components/SeoHubPage";
type Props = { params: Promise<{ value: string }> };
export function generateStaticParams() { return hubParams("industry"); }
export async function generateMetadata({ params }: Props) {
  return hubMetadata("industry", (await params).value);
}
export default async function Page({ params }: Props) {
  return renderHub("industry", (await params).value);
}
```

**`src/app/(index)/templates/stack/[value]/page.tsx`:**

```tsx
import { hubMetadata, hubParams, renderHub } from "../../../components/SeoHubPage";
type Props = { params: Promise<{ value: string }> };
export function generateStaticParams() { return hubParams("stack"); }
export async function generateMetadata({ params }: Props) {
  return hubMetadata("stack", (await params).value);
}
export default async function Page({ params }: Props) {
  return renderHub("stack", (await params).value);
}
```

**`src/app/(index)/templates/model/[value]/page.tsx`:**

```tsx
import { hubMetadata, hubParams, renderHub } from "../../../components/SeoHubPage";
type Props = { params: Promise<{ value: string }> };
export function generateStaticParams() { return hubParams("model"); }
export async function generateMetadata({ params }: Props) {
  return hubMetadata("model", (await params).value);
}
export default async function Page({ params }: Props) {
  return renderHub("model", (await params).value);
}
```

Only add the industry/stack/model route modules when at least one corresponding hub is approved. Until then, leave those modules absent. This avoids an empty prerender inventory and keeps drafts out of the public route surface. Do not add `ensureStatic` or empty-route workarounds without checking the installed 16.4.2 `generateStaticParams` guidance and a real production build.

**Create `src/app/(index)/templates/page.tsx`:**

```tsx
import { pageMetadata } from "../../../lib/seo/metadata";
import { hubPath, PUBLISHED_HUBS } from "../data/seo-hubs";
import { Footer } from "../components/Footer";

export const metadata = pageMetadata({
  path: "/templates",
  title: "Landing page inspiration and template directory",
  description: "Choose a landing page by format, then inspect working previews, source and rebuild prompts.",
});

export default async function TemplatesDirectory() {
  "use cache";
  return <div className="site-shell">
    <header className="page-container"><a href="/">openlandingpage</a></header>
    <main className="page-container" id="main-content">
      <h1>Find a landing page worth building on</h1>
      <p>Start with the interaction and reading format that fit your project.</p>
      <ul>{PUBLISHED_HUBS.map((hub) => <li key={hubPath(hub)}>
        <h2><a href={hubPath(hub)}>{hub.title}</a></h2>
        <p>{hub.intro}</p>
        <p>{hub.templates.length} templates</p>
      </li>)}</ul>
    </main>
    <Footer />
  </div>;
}
```

At the same time, extend `src/app/sitemap.ts` to include `/templates` and `PUBLISHED_HUBS.map(hubPath)` in addition to the existing homepage and active previews. Use the same publication registry for the sitemap, footer, route params and structured data. When detail/prompt/palette/guide pages ship, add only their published records to that registry; an unimplemented proposed URL must never enter the sitemap.

The explicit cache boundaries in `renderHub` and `TemplatesDirectory` preserve static rendering while accommodating the existing `Footer.tsx` copyright-year read. The current homepage already provides such a boundary with `"use cache"`. Do not copy the new directory examples into an uncached render tree and assume synchronous `new Date()` is permitted under Cache Components. This approach preserves the current synchronous Footer component and its existing static-markup tests.

### 5.4 Internal links, breadcrumbs, related templates, and lifecycle

**Gallery footer:** expand `src/app/(index)/components/Footer.tsx` with a native-anchor directory. Link to `/templates`, the five approved categories, and the active template detail pages as they become available. At the current size, a compact list of all active preview links is reasonable. Generate it from `TEMPLATES`, keep anchor text understandable, and expose it in HTML without requiring a JavaScript accordion. Do not emit archive links or every filter permutation.

**Template previews:** preserve the fictional brand presentation. Add a modest, accessible publisher link such as “Template details and source” to `/templates/<slug>` when that page exists, or “Back to template gallery” before then. For isolated templates, generate the local navigation component through the build script; do not import the gallery footer across group boundaries. In full-screen/keynote experiences, a permanent native link is more reliable than an unreachable footer below a locked viewport. Exclude publisher-only navigation from reusable source exports using a compiling local no-op module, as described in section 3.4.

**Breadcrumbs:** render the visible trail and `BreadcrumbList` from the same array. Example detail trail: Home → Templates → Keynote & Deck → Orrery. Category hubs use Home → Templates → Category. Do not include route-group parentheses or non-clickable invented ancestors such as a `/templates/category` index that has not been created.

**Tags:** link only normalized, approved industry/stack/model tags to real hubs. Keep a badge that has no useful published hub as plain text. Do not convert arbitrary catalog strings or freeform query terms into routes.

**Related Templates:** implement a deterministic server-side selector in `src/app/(index)/data/related-templates.ts` for detail pages. Exclude the current slug and archives; rank same category first, then overlapping reviewed industries/technologies, then comparable interactions/badges; use creation date and registration order for stable ties. Show three to four genuinely useful results with a short reason such as “Another keyboard-driven presentation.” Do not call arbitrary latest items “similar” or rank the whole rail by model family. If nothing is meaningfully related, label the list “More templates.”

**Lifecycle:** append new template records with dates, metadata inputs, sources and working assets; generate crawler/schema updates automatically. For an archived template, remove it from discovery immediately and retain the real 404 unless there is a genuinely equivalent replacement deserving a permanent redirect. Do not redirect every retired page to `/`, which creates an irrelevant destination and possible soft-404 behavior. Keep the specific `/cairn` → `/keytu` equivalence.

<a id="roadmap-and-verification"></a>

## 6. Phased Implementation Roadmap & CI Verification

### 6.1 Four-sprint rollout with explicit exit criteria

The schedule assumes one implementation owner plus an editorial/design reviewer, roughly one week per sprint. Adjust staffing rather than sacrificing content review or production checks. Search indexing and field-CWV movement can take longer than engineering delivery; do not promise traffic by a sprint deadline.

| Sprint | Work and dependencies | Implementation owner / reviewer | Exit criteria |
|---|---|---|---|
| **1 — Quick-win crawlers and canonical foundation** | Confirm production origin; baseline Search Console/analytics; create `site.ts`, crawler metadata routes, raw asset headers, and canonical metadata helper; normalize root/template bases and canonicals; add the first SEO tests. | Framework owner; deployment owner verifies domain and environment settings. | Sitemap lists exactly approved live URLs, all absolute and 200; archives/aliases/assets excluded; robots fetchable; no localhost/preview metadata; raw assets remain usable with `noindex`; gallery stays static. |
| **2 — Rich metadata, social coverage, JSON-LD** | Generate local metadata/graphs/renderers; fill four missing OG images; explicit Twitter coverage; validate licensing/dependencies; strip publisher metadata from copy exports; improve gallery heading/summary. | Framework owner; template authors review facts/cards and exported source. | Every active route has one canonical/title/description and valid social images; graphs parse and match content; no invented ratings; isolation checks and portable source bundles pass. |
| **3 — Programmatic directory hubs and internal links** | Ship `/templates` and five reviewed categories; publish selected stack/industry/model hubs only after review; add breadcrumbs, footer directory, scoped publisher links and related rails; extend sitemap from publication registry. | Catalog/editorial owner; frontend/accessibility reviewer. | Every published hub has distinct intent and useful copy; all values allowlisted; drafts/unknowns return 404; images still serve at `/templates/<slug>/...`; no orphaned published pages or indexable filter explosion. |
| **4 — Long-tail copy, prompt and source indexation** | Start selected `/templates/<slug>`, `/prompts/<slug>`, guides and palette pages; render safe HTML explanations; add approved pages to the registry; begin editorial cadence and measure conversions. | Developer educator/editorial owner; code reviewer verifies examples and media rights. | Published pages provide usable source/setup guidance; raw files stay downloadable/noindex; no thin mass generation; related links and facts are accurate; performance budgets remain intact. |

Within Sprint 1, prioritize origin/environment policy and canonical correctness before submitting a sitemap. Within Sprint 2, establish portable export sanitization before regenerating copy bundles. Within Sprint 3, approve content before exposing route paths. Within Sprint 4, publish a small strong batch and evaluate it before expanding.

### 6.2 Test placement and runner boundaries

The current Vitest configuration only discovers `scripts/**/*.test.ts`, `src/**/*.test.ts`, and `src/**/*.test.tsx`. To place both requested SEO test types under `tests/e2e` without double-running them:

- Add `tests/e2e/seo-helpers.test.tsx` to Vitest's include globs, preferably as `tests/e2e/**/*.test.tsx`.
- Add `testIgnore: "**/*.test.tsx"` to `playwright.config.ts`.
- Put browser/integration tests in `tests/e2e/seo.spec.ts` and graphics fallback tests in `tests/e2e/seo-rendering.spec.ts`.
- Keep existing vote, discovery, download, archive and motion tests enabled; SEO work must not undo them.

This explicit runner separation matters because Playwright otherwise also discovers `.test.tsx` files. An alternative repository convention is to place Vitest tests beside `src/lib/seo`; choose one convention and configure it intentionally.

### 6.3 Vitest specifications

**Create `tests/e2e/seo-helpers.test.tsx`** for the Sprint 1/2 foundation:

```tsx
import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import sitemap from "../../src/app/sitemap";
import { TEMPLATES, ARCHIVED_TEMPLATES } from "../../src/app/(index)/data/templates";
import { JsonLd } from "../../src/components/seo/JsonLd";
import { absoluteUrl, SITE_ORIGIN } from "../../src/lib/seo/site";
import { collectionGraph, templateGraph } from "../../src/lib/seo/structured-data";

describe("SEO foundation", () => {
  it("derives a unique sitemap from the active catalog", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(TEMPLATES.length + 1);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(absoluteUrl("/"));
    for (const template of TEMPLATES) expect(urls).toContain(absoluteUrl(`/${template.slug}`));
    for (const template of ARCHIVED_TEMPLATES) expect(urls).not.toContain(absoluteUrl(`/${template.slug}`));
    for (const url of urls) {
      expect(new URL(url).origin).toBe(SITE_ORIGIN);
      expect(new URL(url).search).toBe("");
    }
  });

  it("rejects off-site URL construction", () => {
    expect(() => absoluteUrl("//attacker.example/path")).toThrow();
    expect(() => absoluteUrl("https://attacker.example/path")).toThrow();
  });

  it("uses real catalog publication dates and dependencies without fake ratings", () => {
    const template = TEMPLATES.find((item) => item.slug === "orrery")!;
    const graph = templateGraph(template, ["gsap", "motion"]);
    const text = JSON.stringify(graph);
    expect(text).toContain(template.createdAt);
    expect(text).toContain("gsap, motion");
    expect(text).toContain("SoftwareSourceCode");
    expect(text).not.toContain("aggregateRating");
    expect(text).not.toContain("ratingValue");
    expect(text).not.toContain("LocalBusiness");
  });

  it("serializes valid JSON without allowing a closing-script injection", () => {
    const attack = "</script><img src=x onerror=alert(1)>";
    const html = renderToStaticMarkup(<JsonLd data={{ name: attack }} />);
    expect(html).not.toContain("<img");
    expect(html).toContain("\\u003c/script>");
    const payload = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</script>"));
    expect(JSON.parse(payload)).toEqual({ name: attack });
  });

  it("describes only the collection supplied to it", () => {
    const subset = TEMPLATES.slice(0, 2);
    const graph = collectionGraph(subset);
    const nodes = graph["@graph"] as Record<string, unknown>[];
    const collection = nodes.find((node) => node["@type"] === "CollectionPage")!;
    const list = collection.mainEntity as { numberOfItems: number; itemListElement: unknown[] };
    expect(list.numberOfItems).toBe(2);
    expect(list.itemListElement).toHaveLength(2);
  });
});
```

When Sprint 3 expands the sitemap, replace the foundation length expectation with `TEMPLATES.length + 2 + PUBLISHED_HUBS.length`, covering `/`, `/templates`, all approved hubs and previews. When Sprint 4 adds editorial records, derive the expected additions from that publication registry. Do not update a magic number every time the catalog grows.

Add focused tests for `robots()` in production and preview using module reset/environment stubs, metadata suffixing exactly once, invalid `SITE_URL` values, generator determinism, local-only imports, known social-file exports, `portableCopyFiles` removing hosted canonicals/graphs, and normalized hub membership. Test that arbitrary strings cannot become published hubs and related-template results are unique, exclude archives/current slug, and use stable ties. These should exercise behavior and policy, not merely compare a snapshot to the implementation's own serialization.

### 6.4 Playwright sitemap, metadata, status, and image specifications

**Create `tests/e2e/seo.spec.ts`:** run this against a fresh production build configured as indexable for the test, not `next dev` and not another session's server.

```ts
import { test, expect } from "@playwright/test";
import sharp from "sharp";
import { TEMPLATES, ARCHIVED_TEMPLATES } from "../../src/app/(index)/data/templates";
import { absoluteUrl, SITE_ORIGIN } from "../../src/lib/seo/site";

test.use({ javaScriptEnabled: false });

test("sitemap and robots expose only approved canonical pages", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/xml/);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toContain(absoluteUrl("/"));
  for (const template of TEMPLATES) expect(urls).toContain(absoluteUrl(`/${template.slug}`));
  for (const template of ARCHIVED_TEMPLATES) expect(urls).not.toContain(absoluteUrl(`/${template.slug}`));
  for (const url of urls) {
    const canonical = new URL(url);
    expect(canonical.origin).toBe(SITE_ORIGIN);
    expect(canonical.search).toBe("");
    const pageResponse = await request.get(canonical.pathname, { maxRedirects: 0 });
    expect(pageResponse.status()).toBe(200);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  expect(rules).toContain(`Sitemap: ${absoluteUrl("/sitemap.xml")}`);
  expect(rules).toContain("Disallow: /api/");
  expect(rules).not.toContain("Disallow: /_next/");
  expect(rules).not.toContain("Disallow: /templates/");
});

for (const route of ["/", ...TEMPLATES.map((template) => `/${template.slug}`)]) {
  test(`${route} serves canonical metadata and semantic HTML without JavaScript`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(/\S/);
    await expect(page).toHaveTitle(/\| openlandingpage$/);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length).toBeGreaterThan(30);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", absoluteUrl(route));
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absoluteUrl(route));
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).not.toContain("noindex");

    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const imageUrl = new URL((await page.locator(selector).first().getAttribute("content"))!);
      expect(imageUrl.origin).toBe(SITE_ORIGIN);
      const image = await page.request.get(imageUrl.pathname + imageUrl.search);
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toMatch(/image\/(png|jpeg|webp)/);
      const dimensions = await sharp(await image.body()).metadata();
      expect(dimensions.width).toBe(1200);
      expect(dimensions.height).toBe(630);
    }

    const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(graphs.length).toBeGreaterThan(0);
    for (const graph of graphs) expect(() => JSON.parse(graph)).not.toThrow();
  });
}

test("sort/search views consolidate to the gallery canonical", async ({ page }) => {
  await page.goto("/?category=conversion&model=openai&q=handoff&sort=likes&dir=asc");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl("/"));
});

test("archive, unknown route, and alias status policy is correct", async ({ request }) => {
  for (const template of ARCHIVED_TEMPLATES) {
    expect((await request.get(`/${template.slug}`, { maxRedirects: 0 })).status()).toBe(404);
  }
  expect((await request.get("/not-a-real-template-xyz", { maxRedirects: 0 })).status()).toBe(404);
  const redirect = await request.get("/cairn", { maxRedirects: 0 });
  expect([301, 308]).toContain(redirect.status());
  expect(new URL(redirect.headers().location, "https://local.test").pathname).toBe("/keytu");
});

test("raw copy and standalone files stay downloadable but are not search landings", async ({ request }) => {
  for (const path of ["/copy/orrery.md", "/copy/orrery-prompt.md", "/downloads/alpine-reel.html"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
});
```

The XML regex here is intentionally scoped to this generated, trusted sitemap with simple absolute URLs, not a general parser for arbitrary uploaded XML. Extend the metadata loop to all published directory/editorial URLs as they launch. Add browser assertions that every preview remains discoverable from crawlable directory anchors and that `/templates/<slug>/...` media still works after adding dynamic detail routes.

### 6.5 Graphics/crawler rendering and environment tests

**Create `tests/e2e/seo-rendering.spec.ts`:**

```ts
import { test, expect } from "@playwright/test";
import { TEMPLATES } from "../../src/app/(index)/data/templates";

const graphics = TEMPLATES.filter((template) => template.category === "3d-webgpu");

for (const template of graphics) {
  test(`${template.slug} remains readable without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(`${baseURL}/${template.slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(/\S/);
    await expect.poll(() => page.locator("h1").evaluate((element) =>
      Number(getComputedStyle(element).opacity))).toBe(1);
    expect(await page.locator("h2").count()).toBeGreaterThan(0);
    await context.close();
  });
}

test("LOWTIDE preserves narrative when graphics APIs are unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith("webgl")) return null;
      return Reflect.apply(original, this, args);
    } as typeof original;
    Object.defineProperty(navigator, "gpu", { configurable: true, value: undefined });
  });
  await page.goto("/lowtide", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#lt-table h1")).toHaveText("Let the tide go out.");
  await expect(page.locator("#lt-table")).toBeVisible();
});
```

`opacity: 1` checks the heading itself; add ancestor clipping/visibility assertions for the relevant templates rather than assuming that one style proves every paragraph is readable. Add settled-state checks for essential fallback sections, runtime context loss, reduced motion, keyboard navigation, and unknown directory values. Keep the existing template-specific tests as the more detailed interaction specification.

Create a separate nonindexable production-build smoke run: `SEO_INDEXABLE=false`, unset `VERCEL_ENV`, rebuild/regenerate, and verify `X-Robots-Tag: noindex` plus the nonindexable robots branch. Do not run that test against the same already-built indexable server and assume changing the test process's environment changes metadata baked into the build.

### 6.6 CI execution and release verification

Update `playwright.config.ts` so CI cannot reuse an unrelated server: set `reuseExistingServer: !process.env.CI`. Keep a dedicated test port; never stop the shared servers on 3100 or 3102. Allow an already-built mode so CI does not build the entire catalog twice:

```ts
command: process.env.PLAYWRIGHT_USE_BUILT === "1"
  ? `node node_modules/next/dist/bin/next start --port ${port}`
  : `npm run prebuild && npx next build && npx next start --port ${port}`,
```

Retain the existing `VOTES_ALLOW_MEMORY=1` test-only server setting; Vercel deployment continues to require its actual Redis setup. Use a fresh build from this checkout, never a dev server, for release-grade SEO assertions. The local inspection in this document did not modify or validate production environment settings.

The CI pipeline, whether implemented in `.github/workflows/seo.yml` or another provider, should perform these ordered jobs:

1. Check out the exact revision; install Bun 1.3.11 and the project's supported Node version; run `bun install --frozen-lockfile` and install the Playwright Chromium browser/dependencies.
2. Set `SITE_URL` to the verified production origin and `SEO_INDEXABLE=true` for the local production test; leave `VERCEL`/`VERCEL_ENV` unset for this mode. Set `PLAYWRIGHT_PORT=3121` or another dedicated free port.
3. Run `bun run seo:generate`, then the unit suite and repository checks. Verify generated tracked files have no unexpected drift after generation using `git diff --exit-code -- src/app`.
4. Run TypeScript and lint, then `bun run build`. Avoid running multiple memory-heavy builds concurrently; retain `experimental.cpus: 1` unless measurements justify changing it.
5. Set `PLAYWRIGHT_USE_BUILT=1` and run the SEO specs plus existing index/discovery/motion/vote/download suites. Upload failed traces and rendered metadata/sitemap outputs as private build artifacts.
6. In a separate job/build, exercise preview `noindex` policy. Add a nightly/full-catalog run if PR coverage is later reduced for duration; do not silently stop testing most templates.
7. Review production headers, sitemap content, generated image URLs and representative pages after an authorized deployment. Submit the canonical sitemap to Search Console, request inspection of a few important pages, and monitor coverage rather than bulk-requesting every parameter URL.

Useful local PowerShell verification commands after the implementation files exist:

```powershell
$env:BUN_INSTALL_CACHE_DIR = 'E:/bun-cache'
$env:SITE_URL = 'https://openlandingpage.vercel.app'
$env:SEO_INDEXABLE = 'true'
$env:PLAYWRIGHT_PORT = '3121'
$env:PLAYWRIGHT_USE_BUILT = '1'
bun install --frozen-lockfile
bun run seo:generate
bun run check
bun run test
npx tsc --noEmit
bun run lint
bun run build
bun run test:e2e tests/e2e/seo.spec.ts tests/e2e/seo-rendering.spec.ts
```

Use the verified origin in place of the provisional value before rollout. Each command's nonzero exit code must stop CI. Existing full-repository lint issues previously observed in untouched RILL/VALENCE code should be rebaselined and resolved or explicitly tracked before making a new required job; do not suppress new SEO errors to obtain a green pipeline.

Release acceptance checklist:

- Canonical production host, redirect policy, and environment variables are confirmed; no localhost/preview URLs leak into metadata, schema, or sitemap.
- Every sitemap URL returns 200 without a redirect, is intended for indexing, and is internally discoverable. Archive/alias/API/raw-source URLs are absent.
- Every indexable HTML page has one canonical, an appropriate title/description, and a working social image/card with useful alt text.
- Active templates retain their content without JavaScript and their fallback when graphics fail; no SEO changes hide existing copy or break motion/accessibility behavior.
- Structured data is parseable, truthful, consistent with visible content, and free of fabricated ratings or fictional-business claims.
- Template isolation passes, source exports remain self-contained, and hosted publisher canonicals do not leak into reusable clones.
- Indexable hubs/editorial pages have reviewed content and a unique assigned search intent; arbitrary faceted combinations are not published as search landings.
- Local lab budgets show no material regression; field CWV and conversion monitoring are configured where authorized and feasible.

### 6.7 Organic growth measurement, operating cadence, and rollback

| Cadence | Evidence | Decision |
|---|---|---|
| Before rollout | Search Console property/domain ownership, sitemap status, indexed/excluded counts, current query/page exports, analytics event definitions | Establish a real baseline and resolve production-origin ambiguity. Do not assume the local crawl establishes live indexation. |
| Weekly | Unexpected status/redirect changes; sitemap and image checks; crawl errors; raw copy/download indexation | Fix technical regressions before publishing more pages. |
| Every two weeks | Nonbranded impressions/clicks and query families by page, device, country; preview/source/prompt engagement | Improve a page's intent match or explanation; identify overlap and consolidate weak duplicates. |
| Monthly | Published-versus-indexed cohorts, discovered-but-not-indexed patterns, field CWV by route family/device, qualified conversions | Decide whether to expand hubs/prompt batches or strengthen the current set. |
| Quarterly | Backlink/referral relevance, durable guide performance, stale model/stack labels, archive policy, content maintenance cost | Refresh core assets and retire low-value taxonomy branches rather than accumulating permanent thin URLs. |

Track first-party events with allowlisted template slugs and hub IDs: `preview_open`, `prompt_copy`, `source_download`, and `html_download` only when the corresponding action succeeds. Distinguish available HTML files from pending exports. Do not transmit raw search terms, visitor IDs, IP addresses, or form data. Report conversion rates and downstream usefulness alongside traffic; optional new analytics services require separate setup/authorization.

After a four-to-eight-week observation window, evaluate cohorts against the prelaunch baseline. Targets should be baseline-relative and capacity-aware: coverage of intended URLs, growth in relevant nonbranded impressions/clicks, and more successful source/prompt/preview actions. Do not promise a fixed percentage of traffic growth without data. Use a 28-day field window when interpreting CWV/CrUX reports, and recognize that low-volume pages may remain unreported. [Search Console Core Web Vitals report](https://support.google.com/webmasters/answer/9205520)

Rollback triggers include widespread canonical-host errors, accidental production `noindex`, sitemap contamination with 404s/drafts, broken social images, loss of SSR copy, failed reusable exports, or material performance/accessibility regressions. Revert the responsible SEO change through normal version control, preserve existing template URLs, remove unpublished/draft additions from the registry, and redeploy only through the authorized release process. Correct the root cause before resubmitting a sitemap or expanding content volume.

The sequence is deliberate: reliable crawling and identity first, truthful metadata and schemas second, useful discovery hubs third, and high-value long-tail explanations fourth. The ongoing growth engine is a better catalog and better documentation of real working examples.
