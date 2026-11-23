# HTML-to-Figma Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-paywall, pure-TypeScript Figma plugin (`figma-plugin/`) that converts any dropped `.html` file at `1920px` default width into editable Figma frames, Auto Layout containers, text nodes, SVG vectors, and high-res image fills directly inside Figma Desktop.

**Architecture:** The plugin runs 100% locally in two Figma contexts: `src/ui/` runs in Figma's browser iframe, loads the user's `.html` into an offscreen `1920px` `srcdoc` iframe with an injected `bridge-script.ts` that disables transition/animation durations, scrolls to trigger reveal observers, and serializes live computed DOM styles/geometry/media into a deduplicated JSON payload; `src/plugin/` runs in Figma's sandbox (`code.ts`), resolves/loads fonts, applies Auto Layout to flex containers (with exact parent-relative coordinate layout for block/grid/overlapping containers), creates deduplicated images, and builds native Figma nodes and optional local styles.

**Tech Stack:** TypeScript 5, esbuild 0.28, Vitest 5, Playwright (reusing root `node_modules` with a self-contained `figma-plugin/src/plugin/figma.d.ts` and `figma-plugin/playwright.config.ts`).

**Spec:** `docs/superpowers/specs/2026-11-23-html-to-figma-plugin-design.md`

## Global Constraints

- Pure TypeScript only; zero Rust/WASM, zero external conversion backend, and zero nested `figma-plugin/package.json` or `figma-plugin/node_modules`.
- Default viewport width is `1920` px (`DEFAULT_VIEWPORT_WIDTH = 1920`), with optional `1440` and `390` presets, custom width input, and multi-viewport import.
- `figma-plugin/` must be excluded from root `tsconfig.json` and `eslint.config.mjs`, `figma-plugin/dist/` must be ignored in `.gitignore`, and `"figma-plugin/tests/**/*.test.ts"` must be added to `vitest.config.mts`.
- `manifest.json` must target Figma Community compliance: `"api": "1.0.0"`, `"editorType": ["figma"]`, `"documentAccess": "dynamic-page"`, `"networkAccess": { "allowedDomains": ["*"], "reasoning": "..." }`.
- All Figma sandbox calls must use async dynamic-page-compatible APIs (`await figma.loadFontAsync`, `await figma.getLocalPaintStylesAsync`, `await figma.getLocalTextStylesAsync`, `await node.setFillStyleIdAsync`, `await textNode.setTextStyleIdAsync`).

## Review Focus

1. **Safe script injection into arbitrary HTML containing `</script>`, `$&` replacement patterns, or missing `<head>`/`<body>`:** `injectBridgeScript` and `build.mjs` must escape closing `</script>` tags and splice via `lastIndexOf` or function replacement (`() => ...`) so `$&` in minified JS bundles never corrupts output (tested in Task 5).
2. **Next.js 16 `<Family> Fallback` names (`Geist Fallback`) and hashed font names (`__Plus_Jakarta_Sans_8f2a10`):** Font resolution must strip ` Fallback` suffixes and `__Name_hex` hashes directly from computed `font-family` strings without touching cross-origin `document.styleSheets`, map numeric weights (`100..900`) + `italic` to closest available Figma font styles, and fall back to `Inter`/`Roboto` (tested in Task 6).
3. **CORS-blocked external images, `color-mix()` `color(srgb ...)` values, and layered `background-image: linear-gradient(...), url(...)`:** `parseCssColor` must handle `color(srgb ...)` and delegate exotic color spaces to a 1×1 `<canvas>` in browser runtime; `IMAGE` must be a fill variant (`SerializedPaint`) on `FRAME` so containers like `<footer class="ar-footer">` keep both stacked `[SOLID, IMAGE, GRADIENT_LINEAR]` fills and child nodes (tested in Task 2, Task 3, & Task 7).
4. **`display: contents` roots (`#standalone-root`), `overflow: clip` tracks (`alpine-reel.html`), and pre-scroll zero-duration CSS:** `serializeDocumentFromRoot` must unwrap `display: contents` elements so `#standalone-root` in `public/downloads/*.html` never gets a `0×0` box, treat `overflowX`/`overflowY` `clip | hidden | scroll | auto` as clipping boundaries, and inject zero-duration transition/animation CSS *before* scrolling (tested in Task 4).
5. **Auto Layout only on flex containers and `dynamic-page`-safe `ABSOLUTE` positioning:** `computeAutoLayoutConfig` must only convert `display: flex | inline-flex` containers (leaving `display: block | grid` in `layoutMode = "NONE"` so `margin-inline: auto` sections stay centered), and `builder.ts` must set `primaryAxisSizingMode = "FIXED"`, convert page-space coordinates to parent-relative `(child.x - parent.x, child.y - parent.y)`, and only set `layoutPositioning = "ABSOLUTE"` when the parent frame has `layoutMode !== "NONE"` (tested in Task 6 & Task 7).

---

## File Structure

- **Modify:** `.gitignore` — Ignore `figma-plugin/dist/` and `figma-plugin/node_modules/`.
- **Modify:** `tsconfig.json` — Exclude `"figma-plugin"` from root Next.js typechecking.
- **Modify:** `eslint.config.mjs` — Add `"figma-plugin/**"` to `globalIgnores`.
- **Modify:** `vitest.config.mts` — Add `"figma-plugin/tests/**/*.test.ts"` to `test.include`.
- **Create:** `figma-plugin/tsconfig.json` — Strict TypeScript configuration for the plugin.
- **Create:** `figma-plugin/manifest.json` — Figma Desktop & Community-ready manifest (`dist/code.js`, `dist/ui.html`, `dynamic-page`, `networkAccess`).
- **Create:** `figma-plugin/build.mjs` — esbuild pipeline producing `dist/code.js`, inlined bridge script string, and self-contained `dist/ui.html`.
- **Create:** `figma-plugin/playwright.config.ts` — Standalone Playwright config (`testDir: "./tests"`, `webServer: undefined`) for headless DOM capture tests.
- **Create:** `figma-plugin/src/plugin/figma.d.ts` — Focused ambient typings for the Figma Plugin API used by `src/plugin/`.
- **Create:** `figma-plugin/src/shared/types.ts` — Shared `SerializedDocument`, `SerializedNode` (`FRAME | TEXT | SVG`), `SerializedPaint` (`SOLID | GRADIENT_LINEAR | GRADIENT_RADIAL | IMAGE`), `ImportSettings`, and `UiToPluginMessage` / `PluginToUiMessage` contracts.
- **Create:** `figma-plugin/src/ui/color.ts` — Compact CSS color parser (`hex`, `rgb/rgba`, `hsl/hsla`, `color(srgb ...)`, `transparent`, plus 1×1 `<canvas>` browser fallback and lightweight `oklch`/`display-p3` fallback) to `{ r, g, b, a }`.
- **Create:** `figma-plugin/src/ui/styles.ts` — Parsers for multi-layer `background-image` (`linear-gradient`, `radial-gradient`, `url(...)`), `box-shadow`, per-side borders, and per-corner radii.
- **Create:** `figma-plugin/src/ui/svg-inline.ts` — `<svg>` `<use>` symbol expansion, sanitization, and computed style baking.
- **Create:** `figma-plugin/src/ui/media.ts` — `data:` / `blob:` / `https://` / `<canvas>` / `<video>` byte extraction and content-hash deduplication.
- **Create:** `figma-plugin/src/ui/bridge-script.ts` — Offscreen page preparation (zero-duration animation CSS, image/font settle, scroll pass) and DOM-to-JSON tree serializer (`display: contents` unwrapping, `overflow: clip` culling, wrapper collapsing).
- **Create:** `figma-plugin/src/ui/inject.ts` — Pure helper `injectBridgeScript(html, bridgeCode)` safe against `</script>` and `$&` replacement patterns.
- **Create:** `figma-plugin/src/ui/ui.html` — Figma-themed plugin UI markup (dropzone, paste HTML toggle, `1920`px default width chips, Auto Layout & Local Styles toggles, progress & summary).
- **Create:** `figma-plugin/src/ui/main.ts` — UI controller managing file loading, bridge injection, offscreen `<iframe>` lifecycle, and `postMessage` handoff.
- **Create:** `figma-plugin/src/plugin/fonts.ts` — Next.js font un-hashing and ` Fallback` stripping, weight/style matching against `figma.listAvailableFontsAsync()`, and preloading.
- **Create:** `figma-plugin/src/plugin/layout.ts` — Auto Layout eligibility detection for `flex`/`inline-flex` containers and padding/gap/alignment/wrap mapping.
- **Create:** `figma-plugin/src/plugin/builder.ts` — Recursive Figma node construction, parent-relative positioning, stacked fills (solid + image + gradient), range typography, and async local Paint/Text style binding.
- **Create:** `figma-plugin/src/plugin/code.ts` — Sandbox entrypoint (`figma.showUI`, message handling, multi-viewport frame placement).
- **Create:** `figma-plugin/tests/*.test.ts` & `figma-plugin/tests/e2e-capture.spec.ts` — Unit and Playwright integration test suites covering every module.

---

### Task 1: Plugin Scaffold, Build Pipeline, Manifest & Shared Types

**Files:**
- Modify: `.gitignore`
- Modify: `tsconfig.json:33`
- Modify: `eslint.config.mjs:9-19`
- Modify: `vitest.config.mts:4-6`
- Create: `figma-plugin/tsconfig.json`
- Create: `figma-plugin/manifest.json`
- Create: `figma-plugin/build.mjs`
- Create: `figma-plugin/src/plugin/figma.d.ts`
- Create: `figma-plugin/src/shared/types.ts`
- Test: `figma-plugin/tests/build-and-manifest.test.ts`

**Interfaces:**
- Produces: `figma-plugin/src/shared/types.ts` exporting `DEFAULT_VIEWPORT_WIDTH = 1920`, `RgbaColor`, `SerializedEffect`, `SerializedSolidPaint`, `SerializedGradientPaint`, `SerializedImagePaint`, `SerializedPaint`, `SerializedTextRange`, `SerializedLayoutMeta`, `SerializedFrameNode`, `SerializedTextNode`, `SerializedSvgNode`, `SerializedNode` (`FRAME | TEXT | SVG`), `SerializedImageAsset`, `SerializedDocument`, `ImportSettings`, `ImportSummary`, `UiToPluginMessage`, `PluginToUiMessage`.
- Produces: `figma-plugin/build.mjs` runnable via `node figma-plugin/build.mjs` (and `--watch`) emitting `figma-plugin/dist/code.js` and `figma-plugin/dist/ui.html`.

- [ ] **Step 1: Update root `.gitignore`, `tsconfig.json`, `eslint.config.mjs`, and `vitest.config.mts`, and create `figma-plugin/tsconfig.json` + `figma-plugin/src/plugin/figma.d.ts`**

1. Append `figma-plugin/dist/` and `figma-plugin/node_modules/` to `.gitignore`.
2. Add `"figma-plugin"` to `exclude` in `tsconfig.json` and `"figma-plugin/**"` to `globalIgnores` in `eslint.config.mjs`.
3. Add `"figma-plugin/tests/**/*.test.ts"` to `test.include` in `vitest.config.mts`.
4. Create `figma-plugin/tsconfig.json` and `figma-plugin/src/plugin/figma.d.ts` (declaring `PluginAPI`, `FrameNode`, `TextNode`, `SceneNode`, `FontName`, `Font`, `Paint`, `PaintStyle`, `TextStyle`, `Effect`, `figma`, and `__html__`, including `setFillStyleIdAsync` and `setTextStyleIdAsync`).

- [ ] **Step 2: Write the failing build & manifest verification test**

```ts
// figma-plugin/tests/build-and-manifest.test.ts
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const pluginRoot = path.resolve(import.meta.dirname, "..");

describe("plugin manifest and build output", () => {
  it("builds self-contained dist/code.js and dist/ui.html matching manifest.json", () => {
    execFileSync("node", ["build.mjs"], { cwd: pluginRoot, stdio: "pipe" });

    const manifest = JSON.parse(fs.readFileSync(path.join(pluginRoot, "manifest.json"), "utf8"));
    expect(manifest.api).toBe("1.0.0");
    expect(manifest.editorType).toEqual(["figma"]);
    expect(manifest.documentAccess).toBe("dynamic-page");
    expect(manifest.networkAccess.allowedDomains).toEqual(["*"]);
    expect(typeof manifest.networkAccess.reasoning).toBe("string");

    const codeJs = fs.readFileSync(path.join(pluginRoot, manifest.main), "utf8");
    const uiHtml = fs.readFileSync(path.join(pluginRoot, manifest.ui), "utf8");
    expect(codeJs.length).toBeGreaterThan(50);
    expect(uiHtml).toContain("<script>");
    expect(uiHtml).not.toMatch(/<script\b[^>]*\bsrc=/i);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/build-and-manifest.test.ts`
Expected: FAIL (`build.mjs` / `manifest.json` missing).

- [ ] **Step 4: Create `manifest.json`, `src/shared/types.ts`, placeholder entrypoints (`src/plugin/code.ts`, `src/ui/main.ts`, `src/ui/bridge-script.ts`, `src/ui/ui.html`), and `build.mjs`**

In `build.mjs`:
1. Bundle `src/ui/bridge-script.ts` with `esbuild` (`bundle: true`, `format: "iife"`, `target: "es2020"`, `write: false`) into a JS string.
2. Bundle `src/ui/main.ts` with `esbuild` (`bundle: true`, `format: "iife"`, `target: "es2020"`, `define: { __BRIDGE_SCRIPT__: JSON.stringify(bridgeCode) }`, `write: false`), and inline the compiled JS into `src/ui/ui.html` using a function replacer `() => ...` (or `lastIndexOf("</body>")`) while escaping any literal `</script` as `<\/script` so `$&` patterns inside bundled code are never expanded.
3. Bundle `src/plugin/code.ts` with `esbuild` (`bundle: true`, `format: "iife"`, `target: "es2017"`, `outfile: "dist/code.js"`).

- [ ] **Step 5: Run test to verify it passes**

Run: `bunx vitest run figma-plugin/tests/build-and-manifest.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .gitignore tsconfig.json eslint.config.mjs vitest.config.mts figma-plugin/
git commit -m "chore(figma-plugin): scaffold manifest, shared types, and esbuild pipeline"
```

---

### Task 2: Compact CSS Color, Multi-Layer Background, Box-Shadow & Radius Parsers

**Files:**
- Create: `figma-plugin/src/ui/color.ts`
- Create: `figma-plugin/src/ui/styles.ts`
- Test: `figma-plugin/tests/color-and-styles.test.ts`

**Interfaces:**
- Consumes: `RgbaColor`, `SerializedEffect`, `SerializedGradientPaint` from `../shared/types`.
- Produces:
  - `parseCssColor(input: string, fallbackResolver?: (css: string) => RgbaColor | null): RgbaColor | null`
  - `splitTopLevelComma(input: string): string[]`
  - `parseCssGradient(gradientCss: string, resolveColor?: (css: string) => RgbaColor | null): SerializedGradientPaint | null`
  - `parseCssBackgroundLayers(backgroundImage: string, resolveColor?: (css: string) => RgbaColor | null): Array<{ kind: "gradient"; paint: SerializedGradientPaint } | { kind: "url"; url: string }>`
  - `parseCssBoxShadows(boxShadow: string, resolveColor?: (css: string) => RgbaColor | null): SerializedEffect[]`
  - `parseCornerRadii(style: Pick<CSSStyleDeclaration, "borderTopLeftRadius" | "borderTopRightRadius" | "borderBottomRightRadius" | "borderBottomLeftRadius">, boxWidth: number, boxHeight: number): [number, number, number, number]`

- [ ] **Step 1: Write failing tests for color (including `color(srgb ...)`), multi-layer background-image (`linear-gradient` + `url()`), shadow, and corner-radius parsing**

```ts
// figma-plugin/tests/color-and-styles.test.ts
import { describe, it, expect } from "vitest";
import { parseCssColor } from "../src/ui/color";
import { parseCssGradient, parseCssBackgroundLayers, parseCssBoxShadows, parseCornerRadii } from "../src/ui/styles";

describe("parseCssColor", () => {
  it("parses hex, rgb/rgba, hsl/hsla, color(srgb ...), and transparent", () => {
    expect(parseCssColor("#ff8800")).toEqual({ r: 1, g: 136 / 255, b: 0, a: 1 });
    expect(parseCssColor("#0f88")).toEqual({ r: 0, g: 1, b: 136 / 255, a: 136 / 255 });
    expect(parseCssColor("rgb(255 0 128 / 50%)")?.a).toBeCloseTo(0.5, 3);
    expect(parseCssColor("hsl(120, 100%, 50%)")?.g).toBeCloseTo(1, 3);
    expect(parseCssColor("color(srgb 0.0627 0.102 0.1137 / 0.9)")).toEqual({
      r: 0.0627,
      g: 0.102,
      b: 0.1137,
      a: 0.9,
    });
    expect(parseCssColor("transparent")).toEqual({ r: 0, g: 0, b: 0, a: 0 });
  });

  it("converts oklch and display-p3 colors into clamped sRGB", () => {
    const white = parseCssColor("oklch(1 0 0)");
    expect(white?.r).toBeCloseTo(1, 2);
    expect(white?.g).toBeCloseTo(1, 2);
    expect(white?.b).toBeCloseTo(1, 2);

    const p3 = parseCssColor("color(display-p3 1 0.5 0 / 0.8)");
    expect(p3?.a).toBeCloseTo(0.8, 3);
    expect(p3?.r).toBeGreaterThan(0.9);
  });
});

describe("parseCssGradient, parseCssBackgroundLayers, and parseCssBoxShadows", () => {
  it("parses multi-stop linear-gradient angles and layered gradient + url backgrounds", () => {
    const grad = parseCssGradient("linear-gradient(90deg, #ff0000 0%, #0000ff 100%)");
    expect(grad?.type).toBe("GRADIENT_LINEAR");
    expect(grad?.stops).toHaveLength(2);
    expect(grad?.stops[0].position).toBe(0);
    expect(grad?.stops[1].position).toBe(1);

    const layers = parseCssBackgroundLayers(
      'linear-gradient(color(srgb 0.06 0.1 0.11 / 0.68), color(srgb 0.06 0.1 0.11 / 0.76)), url("data:image/webp;base64,UklGRg==")'
    );
    expect(layers).toHaveLength(2);
    expect(layers[0].kind).toBe("gradient");
    expect(layers[1]).toEqual({ kind: "url", url: "data:image/webp;base64,UklGRg==" });
  });

  it("parses multiple drop and inset box-shadows", () => {
    const effects = parseCssBoxShadows("0px 4px 12px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.1)");
    expect(effects).toHaveLength(2);
    expect(effects[0]).toMatchObject({ type: "DROP_SHADOW", offsetX: 0, offsetY: 4, radius: 12, spread: 0 });
    expect(effects[1]).toMatchObject({ type: "INNER_SHADOW", offsetY: 1, radius: 0 });
  });

  it("parses percentage and pixel border-radii clamped to half box dimensions", () => {
    expect(
      parseCornerRadii(
        { borderTopLeftRadius: "50%", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", borderBottomLeftRadius: "50%" },
        100,
        80
      )
    ).toEqual([40, 12, 12, 40]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/color-and-styles.test.ts`
Expected: FAIL (`Cannot find module '../src/ui/color'`).

- [ ] **Step 3: Implement `figma-plugin/src/ui/color.ts` and `figma-plugin/src/ui/styles.ts`**

- In `color.ts`: parse `transparent`, `hex` (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb/rgba`, `hsl/hsla`, and `color(srgb | srgb-linear | display-p3 ...)` directly in ~45 lines; in browser runtime (`typeof document !== "undefined"`), fall back to a shared 1×1 2D `<canvas>` (`ctx.fillStyle` / `ctx.getImageData(0, 0, 1, 1)`) for any remaining CSS color syntax (`oklch`, `oklab`, `lab`, `lch`, `color-mix`, named colors), with a compact `oklab`/`oklch` helper when running in Node tests.
- In `styles.ts`: implement `splitTopLevelComma`, `parseCssGradient` (`linear-gradient` / `radial-gradient` with 2×3 Figma `gradientTransform`), `parseCssBackgroundLayers` (extracting ordered gradient and `url(...)` layers from `background-image`), `parseCssBoxShadows`, and `parseCornerRadii` (clamping radii to `Math.min(boxWidth, boxHeight) / 2`).

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run figma-plugin/tests/color-and-styles.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/ui/color.ts figma-plugin/src/ui/styles.ts figma-plugin/tests/color-and-styles.test.ts
git commit -m "feat(figma-plugin): add compact CSS color, multi-layer background, shadow, and radius parsers"
```

---

### Task 3: SVG Inliner & Media Asset Extractor

**Files:**
- Create: `figma-plugin/src/ui/svg-inline.ts`
- Create: `figma-plugin/src/ui/media.ts`
- Test: `figma-plugin/tests/svg-and-media.test.ts`

**Interfaces:**
- Produces in `svg-inline.ts`:
  - `sanitizeSvgMarkup(markup: string): string`
  - `inlineSvgElement(svg: SVGSVGElement, getStyle?: (el: Element) => CSSStyleDeclaration): string`
- Produces in `media.ts`:
  - `decodeDataUrl(dataUrl: string): { bytes: Uint8Array; mime: string } | null`
  - `hashBytes(bytes: Uint8Array): string`
  - `extractImageBytes(url: string, options?: { fetchTimeoutMs?: number; imgEl?: HTMLImageElement }): Promise<{ bytes: Uint8Array; mime: string } | null>`
  - `captureCanvasBytes(canvas: HTMLCanvasElement): Promise<{ bytes: Uint8Array; mime: string } | null>`
  - `captureVideoPosterBytes(video: HTMLVideoElement, maxDim?: number): Promise<{ bytes: Uint8Array; mime: string } | null>`

- [ ] **Step 1: Write failing tests for SVG sanitization, `data:` URL decoding, hash deduplication, and CORS fetch fallback**

```ts
// figma-plugin/tests/svg-and-media.test.ts
import { describe, it, expect } from "vitest";
import { decodeDataUrl, hashBytes, extractImageBytes } from "../src/ui/media";
import { sanitizeSvgMarkup } from "../src/ui/svg-inline";

describe("media helpers", () => {
  it("decodes base64 and UTF-8 data URLs and deduplicates identical bytes by hash", () => {
    const a = decodeDataUrl("data:image/png;base64,iVBORw0KGgo=");
    const b = decodeDataUrl("data:image/png;base64,iVBORw0KGgo=");
    expect(a?.mime).toBe("image/png");
    expect(Array.from(a!.bytes)).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(hashBytes(a!.bytes)).toBe(hashBytes(b!.bytes));

    const svg = decodeDataUrl("data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E");
    expect(new TextDecoder().decode(svg!.bytes)).toBe("<svg></svg>");
  });

  it("returns null gracefully when remote fetch fails or times out", async () => {
    const res = await extractImageBytes("https://invalid.example.invalid/missing.png", { fetchTimeoutMs: 50 });
    expect(res).toBeNull();
  });
});

describe("svg sanitization", () => {
  it("strips script and foreignObject tags from serialized SVG markup", () => {
    const cleaned = sanitizeSvgMarkup('<svg viewBox="0 0 10 10"><script>alert(1)</script><foreignObject><div>x</div></foreignObject><path d="M0 0h10v10H0z"/></svg>');
    expect(cleaned).not.toContain("<script");
    expect(cleaned).not.toContain("<foreignObject");
    expect(cleaned).toContain("<path");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/svg-and-media.test.ts`
Expected: FAIL (`Cannot find module '../src/ui/media'`).

- [ ] **Step 3: Implement `svg-inline.ts` and `media.ts`**

- In `svg-inline.ts`: implement `inlineSvgElement(svg, getStyle)` (expands `<use href="#...">`, sets explicit `width`/`height`/`viewBox`, bakes computed `fill`/`stroke`/`stroke-width`/`opacity`/`color` attributes, removes `<script>`/`<foreignObject>`) and pure string helper `sanitizeSvgMarkup(markup)`.
- In `media.ts`: implement `decodeDataUrl`, `hashBytes` (64-bit FNV-1a hex), `extractImageBytes` (supports `data:`, `blob:`, and `https:` via `fetch` with `AbortController` timeout + offscreen `<canvas>` readback fallback on `imgEl`), `captureCanvasBytes` (checks for non-empty PNG via `toDataURL`, retrying once after `requestAnimationFrame` for WebGL), and `captureVideoPosterBytes`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run figma-plugin/tests/svg-and-media.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/ui/svg-inline.ts figma-plugin/src/ui/media.ts figma-plugin/tests/svg-and-media.test.ts
git commit -m "feat(figma-plugin): add SVG inlining and deduplicated media byte extraction"
```

---

### Task 4: Offscreen Page Prep & DOM-to-JSON Bridge Serializer

**Files:**
- Create: `figma-plugin/src/ui/bridge-script.ts`
- Create: `figma-plugin/playwright.config.ts`
- Test: `figma-plugin/tests/serializer.test.ts`
- Test: `figma-plugin/tests/e2e-capture.spec.ts`

**Interfaces:**
- Consumes: `SerializedDocument`, `SerializedNode`, `SerializedFrameNode`, `SerializedTextNode`, `SerializedSvgNode`, `SerializedImageAsset` from `../shared/types`; helpers from `./color`, `./styles`, `./svg-inline`, `./media`.
- Produces (exported pure helpers for unit tests + auto-wired `window.addEventListener("message", ...)` when running inside `srcdoc`):
  - `isClippingOverflow(overflowX: string, overflowY: string): { clipsX: boolean; clipsY: boolean; clipsContent: boolean }`
  - `collapseRedundantWrappers(node: SerializedNode): SerializedNode`
  - `deriveNodeName(meta: { tag: string; id?: string; classList: string[]; ariaLabel?: string; textPreview?: string; role?: string }): string`
  - `serializeDocumentFromRoot(root: HTMLElement, options: { viewportWidth: number; runId: string }): Promise<SerializedDocument>`

- [ ] **Step 1: Write failing unit tests for wrapper collapsing, `overflow: clip` detection, and semantic naming, plus `figma-plugin/playwright.config.ts` and `figma-plugin/tests/e2e-capture.spec.ts`**

```ts
// figma-plugin/tests/serializer.test.ts
import { describe, it, expect } from "vitest";
import { collapseRedundantWrappers, deriveNodeName, isClippingOverflow } from "../src/ui/bridge-script";
import type { SerializedFrameNode } from "../src/shared/types";

describe("DOM serializer pure transforms", () => {
  it("derives readable semantic names instead of raw div", () => {
    expect(deriveNodeName({ tag: "header", classList: ["site-header"] })).toBe("Header");
    expect(deriveNodeName({ tag: "button", classList: ["cta-btn"], textPreview: "Get Started" })).toBe("Button · Get Started");
    expect(deriveNodeName({ tag: "div", id: "hero-section", classList: [] })).toBe("hero-section");
  });

  it("detects overflow: clip and per-axis overflow-x: clip as clipping boundaries", () => {
    expect(isClippingOverflow("clip", "visible")).toEqual({ clipsX: true, clipsY: false, clipsContent: true });
    expect(isClippingOverflow("visible", "visible")).toEqual({ clipsX: false, clipsY: false, clipsContent: false });
  });

  it("collapses unstyled single-child pass-through wrapper frames", () => {
    const innerText = {
      id: "t1", type: "TEXT" as const, name: "Title", x: 20, y: 40, width: 200, height: 32, opacity: 1,
      characters: "Hello", fontFamily: "Inter", fontSize: 24, fontWeight: 700, fontStyle: "normal" as const,
      lineHeightPx: 30, letterSpacingPx: 0, textAlign: "LEFT" as const,
      fills: [{ type: "SOLID" as const, color: { r: 0, g: 0, b: 0, a: 1 } }], ranges: [],
    };
    const wrapper: SerializedFrameNode = {
      id: "f1", type: "FRAME", name: "div", x: 20, y: 40, width: 200, height: 32, opacity: 1,
      fills: [], strokes: [], cornerRadius: [0, 0, 0, 0], effects: [], clipsContent: false,
      children: [innerText],
    };
    expect(collapseRedundantWrappers(wrapper)).toEqual(innerText);
  });
});
```

Create `figma-plugin/playwright.config.ts` with `testDir: "./tests"`, `testMatch: "e2e-capture.spec.ts"`, and `webServer: undefined`. Create `figma-plugin/tests/e2e-capture.spec.ts` that loads `public/downloads/alpine-reel.html` and `public/downloads/aerune.html` at `1920×1080`, runs `serializeDocumentFromRoot(document.body, { viewportWidth: 1920, runId: "test" })`, and asserts:
- `root.width === 1920` and `root.children.length > 0` (`#standalone-root` with `display: contents` in `aerune.html` is unwrapped rather than dropped).
- Text nodes and image assets are captured on both templates.
- `alpine-reel.html` culls offscreen cards outside the `1920px` clipped reel instead of serializing all 42 peak cards.

- [ ] **Step 2: Run unit test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/serializer.test.ts`
Expected: FAIL (`Cannot find module '../src/ui/bridge-script'`).

- [ ] **Step 3: Implement `figma-plugin/src/ui/bridge-script.ts`**

Implement:
- `prepareDocument()`:
  1. **First**, inject temporary `<style>` forcing `scroll-behavior: auto !important; transition-duration: 0ms !important; transition-delay: 0ms !important; animation-delay: 0ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important;` so any `IntersectionObserver` reveal triggered during scrolling snaps immediately to its settled end state (`opacity: 1`, `transform: none`).
  2. Flip lazy images (`loading="lazy"` → `"eager"`) and wait up to `4000ms` for images + `document.fonts.ready`.
  3. Scroll `0 → scrollHeight` in `Math.max(300, innerHeight * 0.4)` steps (`requestAnimationFrame` + `40ms` per step) and scroll back to `(0, 0)`.
  4. Seek finite `document.getAnimations()` to `endTime`. (Do not access `document.styleSheets[i].cssRules`.)
- `serializeDocumentFromRoot()`:
  1. When `getComputedStyle(el).display === "contents"`, recursively serialize `el`'s children and splice them directly into the parent frame's `children` array without creating a frame for `el` or checking `el.getBoundingClientRect()`.
  2. Use `isClippingOverflow(style.overflowX, style.overflowY)` (`"hidden" | "clip" | "scroll" | "auto"`) to set `clipsContent` and intersect ancestor clip bounds along clipped axes so offscreen reel cards in `alpine-reel.html` are culled.
  3. Emit `FRAME` (with stacked `[SOLID, ...IMAGE/GRADIENT]` fills from `backgroundColor`, `parseCssBackgroundLayers`, and `<img>`/`<canvas>`/`<video>` media bytes), `TEXT`, and `SVG` nodes + `::before` / `::after` pseudo-elements.
  4. Run `collapseRedundantWrappers` and post `{ type: "h2f:serialized", runId, document }` to `window.parent` on `"h2f:capture"`.

- [ ] **Step 4: Run unit test and Playwright capture test to verify both pass**

Run: `bunx vitest run figma-plugin/tests/serializer.test.ts && node figma-plugin/build.mjs && bunx playwright test -c figma-plugin/playwright.config.ts`
Expected: PASS on both.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/ui/bridge-script.ts figma-plugin/playwright.config.ts figma-plugin/tests/serializer.test.ts figma-plugin/tests/e2e-capture.spec.ts
git commit -m "feat(figma-plugin): add offscreen page prep and DOM serializer bridge"
```

---

### Task 5: Plugin UI Markup & Controller (`ui.html`, `inject.ts`, `main.ts`)

**Files:**
- Create: `figma-plugin/src/ui/inject.ts`
- Create: `figma-plugin/src/ui/ui.html`
- Create: `figma-plugin/src/ui/main.ts`
- Test: `figma-plugin/tests/ui-injection.test.ts`

**Interfaces:**
- Consumes: `DEFAULT_VIEWPORT_WIDTH`, `ImportSettings`, `UiToPluginMessage`, `PluginToUiMessage` from `../shared/types`.
- Produces in `inject.ts`: `injectBridgeScript(html: string, bridgeCode: string): string`.

- [ ] **Step 1: Write failing tests for HTML bridge script injection (including `</script>` and `$&` safety)**

```ts
// figma-plugin/tests/ui-injection.test.ts
import { describe, it, expect } from "vitest";
import { injectBridgeScript } from "../src/ui/inject";

describe("injectBridgeScript", () => {
  it("injects before the last </body> and preserves $& and escaped </script> literals", () => {
    const html = "<!DOCTYPE html><html><head><title>T</title></head><body><h1>Hi</h1></body></html>";
    const out = injectBridgeScript(html, 'const r = "$&"; console.log("</script>");');
    expect(out).toContain('<script>const r = "$&"; console.log("<\\/script>");</script></body>');
  });

  it("handles bare HTML fragments without <html> or <body>", () => {
    const out = injectBridgeScript("<div>Hello</div>", "window.__ok = true;");
    expect(out).toContain("<div>Hello</div>");
    expect(out).toContain("window.__ok = true;");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/ui-injection.test.ts`
Expected: FAIL (`Cannot find module '../src/ui/inject'`).

- [ ] **Step 3: Implement `inject.ts`, `ui.html`, and `main.ts`**

- `inject.ts`: escape `</script` as `<\/script` and splice `<script>${escaped}</script>` before the last closing `</body>` (or `</html>`, or append at end for bare fragments) using string slicing (`lastIndexOf`) rather than regex `.replace()` string templates.
- `ui.html`: clean Figma-native UI using `--figma-color-bg`, `--figma-color-text`, `--figma-color-bg-brand`, drag-and-drop `.html`/`.htm` file dropzone, "Or paste HTML" toggle, width chips (`1920` active by default, `1440`, `390`, plus custom width input, supporting multi-select), **Auto Layout** checkbox (`checked` by default), **Create Local Styles** checkbox (unchecked by default), Convert button, live progress bar + status text, and completion/error banner.
- `main.ts`: iterates over selected viewport widths sequentially, mounts an offscreen `<iframe sandbox="allow-scripts allow-same-origin">` sized to `{width}px × 1080px`, sets `iframe.srcdoc = injectBridgeScript(...)`, waits for `h2f:ready` (with `8000ms` safety timeout), sends `h2f:capture`, collects `SerializedDocument`, tears down the iframe, and posts `{ type: "import-documents", documents, settings }` to `parent.postMessage({ pluginMessage }, "*")`.

- [ ] **Step 4: Run test + build to verify they pass**

Run: `bunx vitest run figma-plugin/tests/ui-injection.test.ts && node figma-plugin/build.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/ui/inject.ts figma-plugin/src/ui/ui.html figma-plugin/src/ui/main.ts figma-plugin/tests/ui-injection.test.ts
git commit -m "feat(figma-plugin): add plugin UI with 1920px default, dropzone, and safe iframe injector"
```

---

### Task 6: Font Resolver & Flex-Only Auto Layout Engine (`src/plugin/fonts.ts`, `src/plugin/layout.ts`)

**Files:**
- Create: `figma-plugin/src/plugin/fonts.ts`
- Create: `figma-plugin/src/plugin/layout.ts`
- Test: `figma-plugin/tests/fonts-and-layout.test.ts`

**Interfaces:**
- Consumes: `SerializedNode`, `SerializedLayoutMeta` from `../shared/types`.
- Produces in `fonts.ts`:
  - `cleanFontFamilyName(raw: string): string`
  - `matchFigmaFont(candidates: string[], weight: number, italic: boolean, available: Font[]): { font: FontName; substitutedFrom?: string }`
  - `preloadDocumentFonts(nodes: SerializedNode[], figmaApi: Pick<PluginAPI, "listAvailableFontsAsync" | "loadFontAsync">): Promise<{ resolved: Map<string, FontName>; substitutions: string[] }>`
- Produces in `layout.ts`:
  - `hasOverlappingInFlowSiblings(children: Array<{ x: number; y: number; width: number; height: number; position?: string }>): boolean`
  - `computeAutoLayoutConfig(meta: SerializedLayoutMeta, children: Array<{ x: number; y: number; width: number; height: number; position?: string }>): AutoLayoutConfig | null`

- [ ] **Step 1: Write failing tests for Next.js hashed & ` Fallback` font cleanup, weight/italic matching, and flex-only Auto Layout eligibility**

```ts
// figma-plugin/tests/fonts-and-layout.test.ts
import { describe, it, expect } from "vitest";
import { cleanFontFamilyName, matchFigmaFont } from "../src/plugin/fonts";
import { computeAutoLayoutConfig } from "../src/plugin/layout";

const available: Font[] = [
  { fontName: { family: "Inter", style: "Regular" } },
  { fontName: { family: "Inter", style: "Semi Bold" } },
  { fontName: { family: "Inter", style: "Bold" } },
  { fontName: { family: "Inter", style: "Bold Italic" } },
  { fontName: { family: "Geist", style: "Regular" } },
  { fontName: { family: "Roboto", style: "Regular" } },
];

describe("font resolution", () => {
  it("strips Next.js hashed font names and Next.js 16 Fallback suffixes and matches closest Figma style", () => {
    expect(cleanFontFamilyName('__Plus_Jakarta_Sans_8f2a10, "Plus Jakarta Sans", sans-serif')).toBe("Plus Jakarta Sans");
    expect(cleanFontFamilyName("__Inter_d65c78")).toBe("Inter");
    expect(cleanFontFamilyName("Geist Fallback")).toBe("Geist");

    expect(matchFigmaFont(["Geist Fallback", "sans-serif"], 400, false, available).font).toEqual({
      family: "Geist",
      style: "Regular",
    });
    expect(matchFigmaFont(["__Inter_d65c78", "sans-serif"], 600, false, available).font).toEqual({
      family: "Inter",
      style: "Semi Bold",
    });
    expect(matchFigmaFont(["UnknownDisplayFont"], 700, true, available)).toEqual({
      font: { family: "Inter", style: "Bold Italic" },
      substitutedFrom: "UnknownDisplayFont",
    });
  });
});

describe("Auto Layout eligibility", () => {
  it("maps horizontal flex containers with gap and padding", () => {
    const cfg = computeAutoLayoutConfig(
      { display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", rowGap: 0, columnGap: 24, paddingTop: 16, paddingRight: 32, paddingBottom: 16, paddingLeft: 32 },
      [
        { x: 32, y: 16, width: 100, height: 40 },
        { x: 200, y: 16, width: 120, height: 40 },
      ]
    );
    expect(cfg).toMatchObject({
      layoutMode: "HORIZONTAL",
      itemSpacing: 24,
      paddingTop: 16,
      paddingLeft: 32,
      primaryAxisAlignItems: "SPACE_BETWEEN",
      counterAxisAlignItems: "CENTER",
    });
  });

  it("returns null for display: block or grid containers and when in-flow siblings overlap", () => {
    expect(
      computeAutoLayoutConfig(
        { display: "block", flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "stretch", rowGap: 0, columnGap: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
        [
          { x: 300, y: 0, width: 1320, height: 400 },
          { x: 300, y: 500, width: 1320, height: 400 },
        ]
      )
    ).toBeNull();

    expect(
      computeAutoLayoutConfig(
        { display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "stretch", rowGap: 0, columnGap: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
        [
          { x: 0, y: 0, width: 100, height: 100 },
          { x: 50, y: 10, width: 100, height: 100 },
        ]
      )
    ).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/fonts-and-layout.test.ts`
Expected: FAIL (`Cannot find module '../src/plugin/fonts'`).

- [ ] **Step 3: Implement `figma-plugin/src/plugin/fonts.ts` and `figma-plugin/src/plugin/layout.ts`**

- `fonts.ts`: strip Next.js `__Name_hex` prefixes/hashes and `/ Fallback$/i` suffixes, map weights `100..900` to Figma style names with nearest-weight distance matching, load unique fonts via `figmaApi.loadFontAsync()` with safe `Inter Regular` / `Roboto Regular` fallback, and collect substitution summary.
- `layout.ts`: only convert `display === "flex" || display === "inline-flex"` containers with at least one in-flow child and no overlapping in-flow siblings (ignoring `position: "absolute" | "fixed"` children during overlap checks); return `null` for `display: block`, `grid`, etc. so centered `margin: auto` sections keep their exact parent-relative `(x, y)` coordinates.

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run figma-plugin/tests/fonts-and-layout.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/plugin/fonts.ts figma-plugin/src/plugin/layout.ts figma-plugin/tests/fonts-and-layout.test.ts
git commit -m "feat(figma-plugin): add Next.js font mapper and flex Auto Layout inference engine"
```

---

### Task 7: Figma Scene Builder, Dynamic-Page Local Styles & Sandbox Entrypoint

**Files:**
- Create: `figma-plugin/src/plugin/builder.ts`
- Create: `figma-plugin/src/plugin/code.ts`
- Test: `figma-plugin/tests/builder.test.ts`

**Interfaces:**
- Consumes: `SerializedDocument`, `SerializedNode`, `ImportSettings`, `ImportSummary` from `../shared/types`; `preloadDocumentFonts` from `./fonts`; `computeAutoLayoutConfig` from `./layout`.
- Produces in `builder.ts`:
  - `buildFigmaPage(doc: SerializedDocument, settings: ImportSettings, originX: number, figmaApi?: PluginAPI): Promise<ImportSummary>`

- [ ] **Step 1: Write failing tests for parent-relative coordinates, image deduplication, `ABSOLUTE` positioning inside Auto Layout vs non-Auto-Layout parents, malformed SVG fallback, and async `setFillStyleIdAsync` binding**

```ts
// figma-plugin/tests/builder.test.ts
import { describe, it, expect, vi } from "vitest";
import { buildFigmaPage } from "../src/plugin/builder";
import type { SerializedDocument } from "../src/shared/types";

describe("buildFigmaPage", () => {
  it("converts page-space to parent-relative coordinates, deduplicates images, sets ABSOLUTE only inside Auto Layout parents, binds styles via async APIs, and skips bad SVGs", async () => {
    const createdImages: Uint8Array[] = [];
    const setFillStyleCalls: string[] = [];
    const mockFrame = () => ({
      name: "", x: 0, y: 0, width: 0, height: 0,
      resize(w: number, h: number) { this.width = w; this.height = h; },
      fills: [] as unknown[], strokes: [] as unknown[], strokeWeight: 0,
      topLeftRadius: 0, topRightRadius: 0, bottomRightRadius: 0, bottomLeftRadius: 0,
      effects: [] as unknown[], opacity: 1, clipsContent: false,
      layoutMode: "NONE" as "NONE" | "HORIZONTAL" | "VERTICAL",
      primaryAxisSizingMode: "AUTO" as "AUTO" | "FIXED",
      counterAxisSizingMode: "AUTO" as "AUTO" | "FIXED",
      primaryAxisAlignItems: "MIN", counterAxisAlignItems: "MIN",
      layoutWrap: "NO_WRAP", itemSpacing: 0,
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
       _layoutPositioning: "AUTO" as "AUTO" | "ABSOLUTE",
      parent: null as { layoutMode?: string } | null,
      get layoutPositioning() { return this._layoutPositioning; },
      set layoutPositioning(val: "AUTO" | "ABSOLUTE") {
        if (val === "ABSOLUTE" && (!this.parent || this.parent.layoutMode === "NONE")) {
          throw new Error("layoutPositioning ABSOLUTE requires an Auto Layout parent");
        }
        this._layoutPositioning = val;
      },
      setFillStyleIdAsync: vi.fn(async (id: string) => { setFillStyleCalls.push(id); }),
      children: [] as Array<Record<string, unknown>>,
      appendChild(c: Record<string, unknown>) { c.parent = this; this.children.push(c); },
    });
    const mockFigma = {
      currentPage: { children: [], appendChild: vi.fn() },
      listAvailableFontsAsync: async () => [{ fontName: { family: "Inter", style: "Regular" } }],
      loadFontAsync: async () => {},
      createFrame: () => mockFrame(),
      createText: () => ({
        ...mockFrame(), characters: "", fontName: null, fontSize: 16, textAutoResize: "NONE",
        setTextStyleIdAsync: vi.fn(async () => {}),
        setRangeFontName: vi.fn(), setRangeFontSize: vi.fn(), setRangeFills: vi.fn(), setRangeHyperlink: vi.fn(),
      }),
      createImage: (bytes: Uint8Array) => { createdImages.push(bytes); return { hash: `img-${createdImages.length}` }; },
      createNodeFromSvg: (svg: string) => { if (svg.includes("BAD")) throw new Error("bad svg"); return mockFrame(); },
      getLocalPaintStylesAsync: async () => [],
      getLocalTextStylesAsync: async () => [],
      createPaintStyle: () => ({ name: "", paints: [], id: "ps-1" }),
      createTextStyle: () => ({ name: "", fontName: null, fontSize: 16, id: "ts-1" }),
    } as unknown as PluginAPI;

    const doc: SerializedDocument = {
      runId: "r1",
      title: "Test Page",
      viewportWidth: 1920,
      assets: { a1: { mime: "image/png", bytes: new Uint8Array([1, 2, 3]) } },
      root: {
        id: "root", type: "FRAME", name: "Page", x: 0, y: 0, width: 1920, height: 1080, opacity: 1,
        fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1, a: 1 } }], strokes: [], cornerRadius: [0, 0, 0, 0], effects: [], clipsContent: true,
        children: [
          {
            id: "nav", type: "FRAME", name: "Header", x: 100, y: 40, width: 1720, height: 80, opacity: 1,
            fills: [], strokes: [], cornerRadius: [0, 0, 0, 0], effects: [], clipsContent: false,
            layout: { display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", rowGap: 0, columnGap: 24, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
            children: [
              { id: "i1", type: "FRAME", name: "Logo", x: 100, y: 50, width: 120, height: 60, opacity: 1, fills: [{ type: "IMAGE", assetId: "a1", scaleMode: "FILL" }], strokes: [], cornerRadius: [0, 0, 0, 0], effects: [], clipsContent: false, children: [] },
              { id: "i2", type: "FRAME", name: "Badge", x: 1700, y: 45, width: 80, height: 30, opacity: 1, fills: [{ type: "IMAGE", assetId: "a1", scaleMode: "FILL" }], strokes: [], cornerRadius: [0, 0, 0, 0], effects: [], clipsContent: false, position: "absolute", children: [] },
            ],
          },
          { id: "s1", type: "SVG", name: "BrokenIcon", x: 50, y: 200, width: 24, height: 24, opacity: 1, svg: "BAD" },
        ],
      },
    };

    const summary = await buildFigmaPage(doc, { widths: [1920], useAutoLayout: true, createStyles: true }, 0, mockFigma);
    expect(createdImages).toHaveLength(1);
    expect(setFillStyleCalls).toContain("ps-1");
    expect(summary.nodeCount).toBeGreaterThanOrEqual(3);
    expect(summary.warnings).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run figma-plugin/tests/builder.test.ts`
Expected: FAIL (`Cannot find module '../src/plugin/builder'`).

- [ ] **Step 3: Implement `figma-plugin/src/plugin/builder.ts` and `figma-plugin/src/plugin/code.ts`**

- `builder.ts`:
  1. Register each asset once via `figmaApi.createImage` and preload fonts via `preloadDocumentFonts`.
  2. Recursively construct `FRAME`, `TEXT` (with mixed ranges + hyperlinks), and `SVG` (`try { createNodeFromSvg } catch` → record warning and continue).
  3. Set every child's coordinates relative to its parent (`childNode.x = child.x - parent.x`, `childNode.y = child.y - parent.y`).
  4. When `settings.useAutoLayout` is true and `computeAutoLayoutConfig(node.layout, node.children)` returns a config, set `frame.layoutMode`, set `frame.primaryAxisSizingMode = "FIXED"` and `frame.counterAxisSizingMode = "FIXED"`, call `frame.resize(node.width, node.height)`, and **then** for any direct child with `position === "absolute" || position === "fixed"`, set `childFrame.layoutPositioning = "ABSOLUTE"` and re-apply `childFrame.x = child.x - node.x`, `childFrame.y = child.y - node.y`. Never set `layoutPositioning = "ABSOLUTE"` if the parent's `layoutMode === "NONE"`.
  5. When `settings.createStyles` is true, create/reuse local `PaintStyle` and `TextStyle` entries and bind them with `await node.setFillStyleIdAsync(style.id)` and `await textNode.setTextStyleIdAsync(style.id)`.
  6. Yield every ~40 nodes (`await new Promise((r) => setTimeout(r, 0))`).
- `code.ts`: open `figma.showUI(__html__, { width: 380, height: 540, themeColors: true })`, handle `"import-documents"` by computing non-overlapping `originX` on `figma.currentPage`, building each viewport frame sequentially, posting progress updates back to UI, and calling `figma.viewport.scrollAndZoomIntoView(rootFrames)`.

- [ ] **Step 4: Run all plugin unit tests, Playwright integration test, build, and root repo checks**

Run: `bunx vitest run figma-plugin/tests && node figma-plugin/build.mjs && bunx playwright test -c figma-plugin/playwright.config.ts && bunx tsc -p figma-plugin/tsconfig.json --noEmit && bunx tsc --noEmit`
Expected: All unit and Playwright integration tests pass, `dist/code.js` and `dist/ui.html` build cleanly, and both plugin and root TypeScript checks pass with zero errors.

- [ ] **Step 5: Commit**

```bash
git add figma-plugin/src/plugin/builder.ts figma-plugin/src/plugin/code.ts figma-plugin/tests/builder.test.ts
git commit -m "feat(figma-plugin): implement Figma node builder, dynamic-page styles, and sandbox entrypoint"
```

---

## Self-Review & Verification Checklist

- All 7 tasks map directly to `docs/superpowers/specs/2026-11-23-html-to-figma-plugin-design.md` and incorporate all 15 audit findings.
- Every Review Focus failure mode has a dedicated automated test in the task that owns it.
- After Task 7 passes automated checks, load `figma-plugin/manifest.json` in Figma Desktop via *Plugins → Development → Import plugin from manifest...*, test importing `public/downloads/aerune.html` and `public/downloads/alpine-reel.html` at `1920px`, and confirm editable frames, text, SVGs, and stacked background/image fills.
