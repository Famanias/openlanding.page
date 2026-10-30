# Repo wiring

## Slug and prefix

- **Slug:** lowercase letters only. It's the URL, the route-group name and the asset folder.
- **CSS class prefix:** 2–3 letters, unique across templates. Grep the existing `src/app/(*)/*/*.css` files before choosing.

## Folder layout (the copy unit)

```
src/app/(<slug>)/
  layout.tsx                   root layout: <html lang>, next/font variables, metadata, imports ./<slug>/<slug>.css
  <slug>/
    page.tsx                   composes the sections; server component; "use client" only in leaves that need it
    <slug>.css                 @import "tailwindcss"; @theme tokens (palette, fonts, easings), then prefixed classes
    DESIGN.md  PROMPT.md
    icon.svg                   favicon (file convention), palette colours only
    opengraph-image.tsx        next/og, 1200×630
    assets.tsx                 Picture + assetSrc (below)
    assets.generated.ts        start as: export const ASSETS: Record<string, { w: number; h: number }> = {};
    brand/                     Logo.tsx and other marks
    sections/ | slides/ | chapters/
    motion/                    the motion primitives (motion-system.md §8): useReducedMotion, useInView, Reveal, SplitText, Magnetic, TiltCard, Marquee, CountUp, useScrollProgress, SmoothScroll, plus math.ts with math.test.ts
    <mechanic>/                pure logic in *.ts with a *.test.ts beside it, plus its components
    forms/                     validation in *.ts (tested) plus the form component; success state, no network
public/templates/<slug>/       processed images (npm run images) and clips/
assets/incoming/<slug>/        raw images and clips; add a .gitkeep
docs/image-video-prompts/<slug>.md   the media prompts (media.md)
tests/e2e/<slug>.spec.ts
```

## Code patterns

**`layout.tsx`** gives the fonts distinct variable names, and sets `preload: false` for large (e.g. CJK) families:

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./<slug>/<slug>.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const body = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = { title: "<Brand> — <positioning>", description: "<one sentence>" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="<px>-body">{children}</body>
    </html>
  );
}
```

**`<slug>.css` tokens:**

```css
@import "tailwindcss";
@theme {
  --color-ink: #……;  /* role: text, dark slabs */
  --color-paper: #……;  /* role: background */
  --color-accent: #……;  /* role: the only accent */
  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-inter-tight), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
  /* motion tokens: the full set (easings, durations, reveal shift, stagger) is in motion-system.md §2 */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 800ms;
  --dur-hero: 1200ms;
  --reveal-shift: 28px;
  --stagger: 70ms;
}
```

Reveal states, load keyframes and hover rules go in the same file under `@media (prefers-reduced-motion: no-preference)`, and pointer effects under `@media (hover: hover) and (pointer: fine)`. Add `<noscript><style>[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}</style></noscript>` to the layout.

**`assets.tsx`** renders a responsive `<picture>`, or a labelled placeholder until the image exists:

```tsx
import { ASSETS } from "./assets.generated";

const BASE = "/templates/<slug>";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`<px>-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="<px>-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
```

**`opengraph-image.tsx`:** `export const size = { width: 1200, height: 630 }`, `contentType = "image/png"`, and a default export returning `new ImageResponse(<div style={{ display: "flex", … }}>…</div>)` drawn in palette colours only (inline styles, flexbox).

**Mechanic techniques:**
- **Deck:** a pure `deckReducer(state, action)` with `next`, `prev` and `goto` plus clamping (tested); slides switch on `data-state` with CSS clip-path transitions; hash deep links; a flow (scroll) mode on short screens and under reduced motion.
- **Scroll story:** compute progress from the sections' real offsets (a pure function, tested) rather than raw scroll percentage; pin the stage with CSS `position: sticky`.
- **3D:** procedural geometry with `three/webgpu` and TSL, a WebGL2 fallback, and a poster image. Start it when the browser is idle on desktop and on tap on touch screens. It never mounts under reduced motion.

## Build order

1. **Palette in config.** Add the slug and palette to `scripts/templates.config.ts`. From then on `npm run check` guards both the colours and the folder isolation.
2. **Base.** Write `layout.tsx` with its fonts and metadata, then `<slug>.css` with the tokens.
3. **Brand.** `brand/Logo.tsx`, `icon.svg` and `opengraph-image.tsx`, matching the approved board.
4. **Assets.** `assets.tsx` and an empty `assets.generated.ts`, so every image renders as a labelled placeholder until the real images exist.
5. **Motion foundation.** The `motion/` primitives the motion map needs, with `math.ts` tested first, and the motion tokens and reveal CSS from `motion-system.md` §2–§3. Build this before any section so each section is born animated.
6. **The mechanic's logic, test first.** Then its components.
7. **Sections, top to bottom,** each implementing its row of the motion map (reveals, scroll behaviour, hover/press states). Then the header and menu, the hero load sequence, and the forms with their loading and success transitions.
8. **Motion pass and reduced motion.** Section handoffs, ambient life, the signature moment, then the reduced-motion and no-JS states, then the phone layout at 375px.
9. **Registration** (below), the e2e spec, and PROMPT.md. List `gsap`, `lenis` and `motion` in `dependencies` only if the template actually imports them.

## The six registration points

1. **`scripts/templates.config.ts`:** add the slug to the `TemplateSlug` union, plus a `TEMPLATES` entry with the `palette` (and `paletteExempt` only for content colours).
2. **`scripts/process-images.ts`:** add the slug to the allowed slug list in the CLI block. Add a colour treatment such as the existing `applyTritone` only if the brand calls for one.
3. **`scripts/generate-copy-bundles.ts`:** add a `TEMPLATE_METADATA` entry with `name` (the display name) and `dependencies` (the npm packages the template imports).
4. **`src/app/(index)/data/templates.ts`:**
   - add the slug to `TemplateSlug`;
   - add a `<SLUG>_PROMPT` constant holding PROMPT.md's text;
   - add a `RAW_TEMPLATES` entry: `title`, `description`, `category` (an existing `CategoryId`, or add a new one to `CategoryId` and `CATEGORIES`), `industry`, `stack`, `badges`, `previewImage`, `promptMarkdown`, and `model` (`TEMPLATES` reverses `RAW_TEMPLATES` so newly created templates automatically appear at the beginning of the gallery);
   - set `model` to the model actually building it, in the same style as the existing tags.
5. **`src/app/(index)/data/templates.test.ts`:** update the expected slug list (which starts with the newest template) and count, and the model-tag assertion.
6. **`tests/e2e/templates.ts`:** append `"/<slug>"` to `TEMPLATE_PATHS`.

## Preview image before the real images exist

The gallery test requires `previewImage` to exist in `public/`. Capture the built hero:

```bash
npm run build && npm run start -- -p 3100        # in a background terminal
node scripts/screenshots.mjs /<slug> .openlanding-page/<slug>/shots
node -e "require('sharp')('.openlanding-page/<slug>/shots/desktop-top.png').resize(1600).webp({quality:82}).toFile('public/templates/<slug>/preview-1600.webp')"
```

Point `previewImage` at `/templates/<slug>/preview-1600.webp`. Once the real images are processed, switch it to the hero image.

## Commands

| Purpose | Command |
|---|---|
| Colour and isolation guards | `npm run check` |
| Unit tests | `npm test` |
| Types | `npx tsc --noEmit` |
| End-to-end tests (builds and serves on :3100) | `npx playwright test` (single file: `npx playwright test tests/e2e/<slug>.spec.ts`) |
| Images | `npm run images -- <slug>` (reads `assets/incoming/<slug>/`) |
| Lighthouse (mobile) | `CHROME_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())") npx lighthouse@12 http://localhost:3100/<slug> --only-categories=performance,accessibility,best-practices --output=json --output-path=.openlanding-page/<slug>/lighthouse/mobile.json` |

## Standalone download contract

New templates ship a readable vanilla `public/downloads/<slug>.html` with inline CSS and JavaScript and a meaningful h1. Match the template?s content, visual identity and interactions. Load fonts and images from remote URLs or inline small assets; pin library CDN versions. All content must work from `file://` without a site origin or Next.js chunks. Register `createdAt: "YYYY-MM-DD"` as the creation date and `hasDownload: true` in the appended `RAW_TEMPLATES` entry. The scripts derive those fields from gallery registration. Verify `bun run check` and `bun run test:e2e tests/e2e/downloads.spec.ts` before marking registration complete.
