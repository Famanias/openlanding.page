# HTML-to-Figma Plugin Design Specification

**Date:** 2026-11-23  
**Status:** Ready for Approval (Builder Check & Ponytail Audit Passed)  
**Target:** Local-first Figma plugin (`figma-plugin/`) ready for Figma Desktop development and future Figma Community publishing.

---

## 1. Intent & Why

Build our own zero-paywall, pure-TypeScript Figma plugin that converts any attached `.html` file into genuinely editable native Figma layers directly inside Figma—no external backend, no accounts, and no import quotas.

Primary use cases:
- Importing self-contained `.html` landing pages exported by `openlanding.page` (`public/downloads/*.html`) as well as general standalone `.html` files.
- Editing typography, colors, vectors, spacing, and layout natively in Figma at a `1920px` desktop viewport (with optional responsive viewports).
- Getting the plugin working reliably locally via Figma Desktop first, while keeping the architecture and manifest compliant for later Figma Community submission.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Pure TypeScript, 100% local execution:** Everything runs inside Figma's plugin UI iframe and plugin sandbox. Zero remote servers, zero API keys, zero Rust/WASM build complexity, and zero nested `package.json`/`node_modules`.
- **1920px default desktop import:** Defaults to `1920px` width, with optional quick presets (`1440px`, `390px`), custom width input, and optional multi-viewport generation.
- **Genuinely editable Figma layers:**
  - Real `TEXT` nodes with font family/weight/style mapping (including stripping Next.js 16 `<Family> Fallback` suffixes like `Geist Fallback` and hashed font names like `__Inter_a1b2c3` back to `Geist` / `Inter`), mixed inline `<span>` styling, line-height, letter-spacing, and hyperlinks.
  - Native Auto Layout frames for clean CSS Flexbox (`display: flex | inline-flex`) layouts, with `layoutPositioning = 'ABSOLUTE'` for `absolute`/`fixed` children inside flex parents, while preserving exact parent-relative `(x, y)` coordinates on `display: block` and `display: grid` containers so `margin-inline: auto` centered sections and heterogeneous vertical margins never collapse.
  - Inline `<svg>` elements converted to editable Figma vector groups via `figma.createNodeFromSvg()` with `<use>` symbol expansion and baked presentation styles.
  - Raster `<img>`, layered CSS `background-image` (`linear-gradient(...)`, `url(...)`), `<video>`, and 2D/WebGL `<canvas>` elements converted into deduplicated high-resolution Figma `IMAGE` / `GRADIENT` / `SOLID` fills on `FRAME` nodes.
  - Semantic layer naming, `display: contents` unwrapping (including `#standalone-root` in `openlanding.page` exports), and collapsing of pure pass-through wrapper `<div>`s.
- **Animation & lazy-content completeness:** Pre-scroll injection of zero-duration transition/animation CSS + scroll pass so below-the-fold scroll-reveal sections and lazy images settle immediately into their visible state.
- **Figma Community readiness path:** Structure `manifest.json`, `documentAccess: "dynamic-page"`, async style binding (`setFillStyleIdAsync`, `setTextStyleIdAsync`), error boundaries, and network declarations so publishing to Figma Community later does not require a rewrite.

### Non-Goals (v1)
- **Live URL scraping inside Figma:** Arbitrary `https://...` URL fetching/rendering is out of scope for v1 because `X-Frame-Options`/CSP blocks iframe embedding in browser contexts. (Companion Chrome extension for live tabs can be a separate v2.)
- **Interactive `:hover` / prototype variant generation:** v1 imports the settled default state only.
- **Proprietary `.h2d` archive import/export:** Not needed when converting `.html` directly.
- **Rust / WebAssembly:** Explicit decision to stay 100% TypeScript.

### Anti-Goals
- **Flattening the page into screenshots:** Never fall back to rasterizing whole DOM subtrees unless a node is inherently raster/canvas (`<img>`, `<video>`, `<canvas>`).
- **Missing below-the-fold sections:** Sections gated by scroll animations or `loading="lazy"` must not land at `opacity: 0` or empty.
- **Silently mangled fonts or broken layouts:** Never drop text when a custom font isn't installed in Figma; resolve system/Google Font equivalents and fall back deterministically while reporting substituted fonts in the summary.
- **Blocking Figma's UI or breaking root Next.js checks:** Keep `figma-plugin/` isolated from root `openlanding.page` Next.js build/lint/typecheck.

---

## 3. Architecture & File Layout

```text
figma-plugin/
├── manifest.json            # Figma plugin manifest (local dev + Community compliant)
├── tsconfig.json            # Strict TS config for plugin + UI
├── build.mjs                # esbuild bundler -> dist/code.js + single-file dist/ui.html
├── playwright.config.ts     # Standalone Playwright config for headless DOM capture tests
├── src/
│   ├── shared/
│   │   └── types.ts         # Typed UI <-> Sandbox message protocol & SerializedNode schema
│   ├── ui/
│   │   ├── ui.html          # Plugin UI shell (dropzone, viewport/options, progress, summary)
│   │   ├── main.ts          # UI controller: file reading, iframe lifecycle, progress, postMessage
│   │   ├── inject.ts        # Safe HTML bridge-script splicer (escapes </script> & preserves $&)
│   │   ├── bridge-script.ts # Script injected into target HTML iframe (prep + DOM serialization)
│   │   ├── color.ts         # Compact CSS color parser (hex/rgb/hsl/color(srgb)/1x1 canvas fallback)
│   │   ├── styles.ts        # Multi-layer background-image (gradient + url), box-shadow & radius parsers
│   │   ├── svg-inline.ts    # <svg> <use> resolution, sanitization & computed attribute baking
│   │   └── media.ts         # Image/canvas/video byte extraction + hash deduplication
│   └── plugin/
│       ├── figma.d.ts       # Focused ambient Figma PluginAPI typings (incl. dynamic-page async methods)
│       ├── code.ts          # Figma sandbox entrypoint (figma.showUI, message dispatch, page placement)
│       ├── fonts.ts         # Next.js __Font_hash & Fallback cleanup, weight/style matching & loadFontAsync
│       ├── layout.ts        # Flex Auto Layout eligibility + padding/gap/alignment/wrap mapping
│       └── builder.ts       # SerializedNode -> Figma SceneNode recursive builder
└── tests/                   # Vitest unit tests + Playwright real-template capture tests
```

### Root Repo Isolation
- Add `"figma-plugin"` to root `tsconfig.json` `exclude`, `"figma-plugin/**"` to `eslint.config.mjs` `globalIgnores`, `figma-plugin/dist/` to `.gitignore`, and `"figma-plugin/tests/**/*.test.ts"` to root `vitest.config.mts`.
- Reuse root `esbuild`, `typescript`, `vitest`, and `@playwright/test` with a focused `figma-plugin/src/plugin/figma.d.ts` so no nested `package.json` or `node_modules` is needed.

---

## 4. End-to-End Conversion Pipeline

### Stage 1: Plugin UI & Input (`src/ui/`)
1. **Input:** Drag-and-drop or browse for `.html` / `.htm` file (plus an optional "Paste HTML" textarea toggle for quick snippets).
2. **Settings:**
   - **Width:** `1920` px default, with preset chips (`1920`, `1440`, `390`) and custom numeric input. Supports selecting one or multiple widths (multiple widths generate side-by-side root frames separated by `120px` gap).
   - **Auto Layout:** Toggle, **ON** by default.
   - **Create Local Styles:** Toggle, **OFF** by default (when ON, creates/reuses local Figma Color Styles and Text Styles).
3. **Progress & Result:** Shows live status (`Preparing page…`, `Capturing DOM…`, `Loading fonts…`, `Building layers (N/M)…`) and a post-import summary (node count, image count, and any font substitutions made).

### Stage 2: Offscreen Browser Rendering & Page Prep (`src/ui/main.ts` + `bridge-script.ts`)
Because Figma's plugin UI runs inside a sandboxed iframe, `main.ts` creates a hidden/offscreen `<iframe sandbox="allow-scripts allow-same-origin">` sized to `{width}px × 1080px` (so `100vh` and `vw` units resolve naturally at `1920×1080`).

`main.ts` uses `injectBridgeScript(html, bridgeCode)` (splicing via `lastIndexOf` so `$&` tokens inside bundled JS are never altered) before setting `iframe.srcdoc`. Communication between `main.ts` and the rendered page happens via `window.postMessage` using a per-import `runId`.

Inside the rendered document, `bridge-script.ts` performs:
1. **Pre-Scroll Animation & Transition Zeroing:**
   - Injects a `<style>` forcing `scroll-behavior: auto !important; transition-duration: 0ms !important; transition-delay: 0ms !important; animation-delay: 0ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important;` **before** scrolling so any `IntersectionObserver` reveal triggered during the scroll pass settles immediately to its visible final state (`opacity: 1`, `transform: none`).
2. **Image & Font Readiness:**
   - Flips `img[loading="lazy"]` to `eager` and awaits pending `img.decode()` / load events (bounded per-image timeout of `4000ms` so broken external URLs never hang the import).
   - Awaits `document.fonts.ready`.
3. **Scroll-Through Pass & Web Animation Fast-Forward:**
   - Steps `window.scrollTo(0, y)` down the full `scrollHeight` in increments of `Math.max(300, innerHeight * 0.4)`, yielding `requestAnimationFrame` + short settle (`40ms`) at each step so `IntersectionObserver` / scroll triggers mount and reveal below-the-fold sections.
   - Scrolls back to `(0, 0)` and seeks finite `document.getAnimations()` to `endTime`.

### Stage 3: DOM-to-JSON Extraction (`bridge-script.ts`)
Recursively traverses `document.body` (descending into open `shadowRoot`s and same-origin `<iframe>`s):

1. **`display: contents` Unwrapping & Culling:**
   - When an element has `display: contents` (such as `<div id="standalone-root" style="display:contents">` in `public/downloads/*.html`), bypasses creating a box for the wrapper and flattens its serialized children directly into the parent frame.
   - Skips `<script>`, `<style>`, `<noscript>`, `<template>`, `display: none`, `visibility: hidden`, `opacity: 0`, zero-area nodes, and elements outside ancestor axes where `overflowX` or `overflowY` is `"hidden" | "clip" | "scroll" | "auto"`.
2. **Geometry:**
   - Reads `getBoundingClientRect()` at scroll offset `(0, 0)` for page-space `{ x, y, width, height }`.
3. **Node Classification (`FRAME | TEXT | SVG`):**
   - **`SVG`:** For `<svg>`, resolves `<use href="#...">` references inline, strips `<script>` and `<foreignObject>`, bakes computed `fill`, `stroke`, `stroke-width`, `opacity`, `color`, `width`, `height`, and `viewBox`, and serializes clean SVG XML for `figma.createNodeFromSvg()`.
   - **`TEXT`:** Collects contiguous inline text runs (`Text` nodes and inline formatting tags like `<span>`, `<strong>`, `<em>`, `<a>`, `<br>`) into a `TEXT` node with `ranges` when inline styles vary. Reads `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecorationLine`, `color`, and nearest ancestor `<a href>`.
   - **`FRAME` (including media & layered backgrounds):** Containers (`div`, `section`, `header`, `nav`, `main`, `footer`, `button`, `a`, `input`, etc.) and media elements (`<img>`, `<video>`, `<canvas>`) emit `FRAME` nodes whose `fills` array stacks:
     - Solid `backgroundColor` (parsed via `parseCssColor`, including `color(srgb ...)` from `color-mix()` and a 1×1 `<canvas>` browser fallback for `oklch`/`oklab`/`display-p3`/named colors).
     - Multi-layer CSS `background-image` (`parseCssBackgroundLayers` splitting top-level comma layers of `linear-gradient(...)`, `radial-gradient(...)`, and `url(...)` ordered bottom-to-top).
     - Raster media fill (`{ type: "IMAGE", assetId, scaleMode }`) for `<img>`, `<canvas>`, and `<video>`, with identical image byte buffers deduplicated by content hash in `document.assets`.
   - **Pseudo-elements (`::before`, `::after`):** If `content !== 'none' && content !== 'normal'` and computed box or text is non-empty, emits a child node.
4. **Tree Cleanup & Naming:**
   - Collapses wrapper `FRAME`s that have no visual styling (no fills, strokes, shadows, radius, clipping, blur, opacity < 1), are not flex containers with gap/padding, and have a single child—hoisting the child up while preserving page coordinates.
   - Generates readable layer names (`Header`, `Nav`, `Button · Get Started`, truncated text for `TEXT` nodes, or meaningful class/id/tag instead of raw `div`).

### Stage 4: Figma Scene Graph Builder (`src/plugin/`)
1. **Asset Registration:**
   - Registers each unique image in `document.assets` via `figma.createImage(bytes)` once and caches `imageHash` by `assetId`.
2. **Font Pre-Loading (`src/plugin/fonts.ts`):**
   - Cleans Next.js 16 `<Family> Fallback` names (`Geist Fallback` → `Geist`) and hashed font family names (`__Plus_Jakarta_Sans_8f2a10` → `Plus Jakarta Sans`).
   - Maps CSS numeric weights (`100..900`) and `italic` to Figma font styles, queries `figma.listAvailableFontsAsync()` once per import, preloads all required fonts via `await figma.loadFontAsync()`, and records any substitutions.
3. **Node Construction (`src/plugin/builder.ts`):**
   - Creates a top-level `FrameNode` placed cleanly to the right of existing page content without overlapping.
   - Converts every child's page-space `{ x, y }` to parent-relative `{ x: child.x - parent.x, y: child.y - parent.y }`.
   - Applies stacked fills (`SOLID`, `GRADIENT_LINEAR`, `GRADIENT_RADIAL`, `IMAGE`), strokes, per-corner radii, effects, opacity, and `clipsContent`.
4. **Auto Layout Application (`src/plugin/layout.ts`, when enabled):**
   - Eligible only when the container is `display: flex` or `inline-flex` without overlapping in-flow siblings (`display: block` and `display: grid` stay in `layoutMode = 'NONE'` so `margin-inline: auto` centered sections and heterogeneous vertical margins stay exact).
   - Sets `layoutMode` (`HORIZONTAL` / `VERTICAL`), `primaryAxisSizingMode = 'FIXED'`, `counterAxisSizingMode = 'FIXED'`, `frame.resize(node.width, node.height)`, `layoutWrap`, `itemSpacing`, `padding*`, `primaryAxisAlignItems`, and `counterAxisAlignItems`.
   - Only after `frame.layoutMode` is set to `'HORIZONTAL'` or `'VERTICAL'`, marks direct children that have `position: 'absolute' | 'fixed'` with `layoutPositioning = 'ABSOLUTE'` and re-applies their parent-relative `x` and `y`.
5. **Optional Local Styles (Dynamic-Page Async API):**
   - When enabled, deduplicates unique solid colors and text style tuples, creates/reuses Figma `PaintStyle` / `TextStyle` entries via `await figma.getLocalPaintStylesAsync()` / `await figma.getLocalTextStylesAsync()`, and binds them via `await node.setFillStyleIdAsync(style.id)` and `await textNode.setTextStyleIdAsync(style.id)`.

### Stage 5: Figma Community Readiness
- **`manifest.json`:** `"api": "1.0.0"`, `"main": "dist/code.js"`, `"ui": "dist/ui.html"`, `"editorType": ["figma"]`, `"documentAccess": "dynamic-page"`, `"networkAccess": { "allowedDomains": ["*"], "reasoning": "..." }`.
- **Dynamic Page API compliance:** All style lookups and style ID bindings use async methods (`getLocalPaintStylesAsync`, `setFillStyleIdAsync`, `setTextStyleIdAsync`).
- **Chunked execution:** Yields every ~40 nodes (`setTimeout(..., 0)`) so Figma's UI stays responsive.

---

## 5. Verification Plan

1. **Unit tests (`bunx vitest run figma-plugin/tests`):**
   - Build & manifest verification (`build-and-manifest.test.ts`).
   - CSS color (`hex`, `rgb`, `hsl`, `color(srgb ...)`, `oklch`, `display-p3`, `transparent`), multi-layer `background-image` (`linear-gradient` + `url`), `box-shadow`, and corner radius parsers (`color-and-styles.test.ts`).
   - SVG sanitization/inlining and deduplicated media byte extraction (`svg-and-media.test.ts`).
   - Wrapper collapsing, `overflow: clip` detection, semantic naming, and safe script injection (`serializer.test.ts`, `ui-injection.test.ts`).
   - Next.js hashed & ` Fallback` font cleanup and flex-only Auto Layout eligibility (`fonts-and-layout.test.ts`).
   - Scene builder parent-relative coordinates, image deduplication, `ABSOLUTE` positioning guard, and async style binding (`builder.test.ts`).
2. **Headless browser integration test (`bunx playwright test -c figma-plugin/playwright.config.ts`):**
   - Load real exported HTML files (`public/downloads/alpine-reel.html` and `public/downloads/aerune.html`) at `1920px` width and verify `#standalone-root` (`display: contents`) unwrapping, offscreen card culling on `overflow: clip`, non-empty text/image extraction, and zero trapped `opacity: 0` sections.
3. **Manual Figma Desktop verification:**
   - Load `figma-plugin/manifest.json` in Figma Desktop and verify `public/downloads/aerune.html` and `public/downloads/alpine-reel.html` at `1920px`.
