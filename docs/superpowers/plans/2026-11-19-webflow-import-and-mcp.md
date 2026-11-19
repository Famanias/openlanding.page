# Webflow Import Prompt & OpenLanding MCP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a build-time Webflow manifest and prompt generator, a stateless `/api/mcp` Model Context Protocol server, and a reused Copy button popover (with MCP setup modal) on gallery cards and detail pages so users and AI agents can import any openlanding.page template into Webflow.

**Architecture:** A shared pure-TypeScript manifest builder (`src/lib/webflow/manifest.ts`) extracts each template's design tokens (colors, fonts, sizes), public asset URLs, native vs. hybrid-embed section breakdowns, and <45k-character custom-code blocks into `public/copy/<slug>-webflow.json` and `public/copy/<slug>-webflow-prompt.md` during `generate-copy-bundles.ts`. A stateless Next.js Route Handler at `/api/mcp` serves the same manifest and section chunks over JSON-RPC 2.0 Streamable HTTP, while `TemplateCard` and `TemplateDetailView` expose one-click Webflow prompt copying and an MCP configuration dialog.

**Tech Stack:** TypeScript 5, Next.js 16 App Router, React 19, Vitest 5, `@phosphor-icons/react`.

**Spec:** `docs/superpowers/specs/2026-11-19-webflow-import-and-mcp-design.md`

## Global Constraints

- Zero new npm dependencies (`package.json` dependencies must remain unchanged).
- Template isolation must remain intact (`npm run check` must pass; files inside `src/app/(<slug>)/` are read-only inputs and must not be modified).
- No base64 `data:` URLs may appear in `public/copy/<slug>-webflow.json`, `public/copy/<slug>-webflow-prompt.md`, or `/api/mcp` responses.
- Every `WebflowCustomCodeBlock.code` must be `<= 45000` characters (`WEBFLOW_MAX_CUSTOM_CODE_CHARS = 45000`) to stay safely below Webflow's 50,000-character custom-code limit.
- Relative imports only inside `src/` files imported by both Next.js and Vitest/scripts.

## Review Focus

1. **Oversized CSS or embedded `data:` URLs in template stylesheets:** `extractCustomCodeBlocks` must strip `data:[^'")]+` URLs and chunk CSS/JS exceeding 45,000 characters into multiple sequential blocks (`*-part-1`, `*-part-2`) so no block exceeds 45,000 characters (tested in Task 1).
2. **Templates lacking a disk `PROMPT.md` or numbered markdown sections:** `buildWebflowManifest` must fall back to `TemplateItem.promptMarkdown` and synthesize a default `"overview"` section when no numbered headings exist (tested in Task 1).
3. **Malformed JSON, unknown JSON-RPC methods, or unknown/archived template slugs on `POST /api/mcp`:** `handleMcpRequest` must return JSON-RPC `-32700` for invalid JSON, `-32601` for unknown methods, and `{ isError: true, content: [{ type: "text", text: ... }] }` for unknown tools, archived/unknown slugs, or missing section IDs without throwing HTTP 500 (tested in Task 3).
4. **JSON-RPC notifications (requests without `id`, such as `notifications/initialized`) sent to `POST /api/mcp`:** Must return HTTP 202 with an empty body instead of an invalid JSON-RPC envelope (tested in Task 3).
5. **Fetch or clipboard failure when copying the Webflow prompt from UI components:** If fetching `/copy/<slug>-webflow-prompt.md` fails, the UI falls back to `buildFallbackWebflowPrompt(template)` and still copies; if `navigator.clipboard.writeText` rejects, an accessible `role="alert"` message is rendered (tested in Task 4 and Task 5).

---

## File Structure

- **Create:** `src/lib/webflow/manifest.ts` — Pure types and functions that extract a `WebflowTemplateManifest` and render `buildWebflowPromptMarkdown(manifest)` and `buildFallbackWebflowPrompt(template)` for any template.
- **Create:** `src/lib/webflow/manifest.test.ts` — Unit tests for token extraction, `data:` URL stripping, 45,000-char custom code chunking, section classification, and Webflow MCP prompt formatting.
- **Modify:** `scripts/generate-copy-bundles.ts` — Extend `generateCopyBundles` to build and write `public/copy/<slug>-webflow.json` and `public/copy/<slug>-webflow-prompt.md` alongside `public/copy/<slug>-prompt.md`.
- **Create:** `scripts/generate-copy-bundles.test.ts` — Unit tests verifying incremental generation of `-prompt.md`, `-webflow.json`, and `-webflow-prompt.md`.
- **Create:** `src/lib/mcp/openlanding-mcp.ts` — Pure JSON-RPC 2.0 MCP protocol handler (`initialize`, `notifications/initialized`, `ping`, `tools/list`, `tools/call` for `list_templates`, `get_webflow_manifest`, `get_webflow_section`, `get_webflow_prompt`).
- **Create:** `src/app/api/mcp/route.ts` — Next.js App Router `GET`, `POST`, and `OPTIONS` handlers wrapping `src/lib/mcp/openlanding-mcp.ts` with CORS headers.
- **Create:** `src/app/api/mcp/route.test.ts` — Unit tests for `GET`, `POST`, `OPTIONS`, batch requests, notifications, tool calls, and error paths.
- **Modify:** `src/app/(index)/components/detail/detail-content.ts` — Add `webflowPromptPath(slug)`, `webflowManifestPath(slug)`, and a Webflow import entry in `buildTemplateFaq(t)`.
- **Modify:** `src/app/(index)/components/detail/detail-content.test.ts` — Assert the new helper paths and Webflow FAQ entry.
- **Create:** `src/app/(index)/components/McpSetupDialog.tsx` — Accessible modal dialog showing the `mcpServers` JSON config for `openlanding` and `webflow` with a one-click copy button.
- **Create:** `src/app/(index)/components/detail/CopyWebflowPromptButton.tsx` — Client button for copying the Webflow prompt on `/landing-page-templates/<slug>` with fetch + client fallback.
- **Modify:** `src/app/(index)/components/detail/TemplateDetailView.tsx` — Add `CopyWebflowPromptButton` and an "Open Webflow prompt (Markdown)" link to `.detail-actions`.
- **Modify:** `src/app/(index)/components/TemplateCard.tsx` — Convert the Copy button into a popover trigger with three actions (`Copy code prompt`, `Copy Webflow prompt`, `Setup openlanding MCP`) and render `McpSetupDialog` when opened.
- **Modify:** `src/app/(index)/components/TemplateCard.test.tsx` — Verify SSR markup, accessible popover trigger/menu labels, and Webflow prompt actions.
- **Modify:** `src/app/(index)/index.css` — Add compact styles for `.card-copy-menu-wrap`, `.card-copy-popover`, and `.card-copy-item`.

---

### Task 1: Webflow Manifest & Prompt Builder (`src/lib/webflow/manifest.ts`)

**Files:**
- Create: `src/lib/webflow/manifest.ts`
- Test: `src/lib/webflow/manifest.test.ts`

**Interfaces:**
- Consumes:
  - `TemplateItem`, `TemplateSlug`, `TEMPLATES` from `../../app/(index)/data/templates`
  - `SITE_URL` from `../site`
- Produces:
  - `WEBFLOW_MAX_CUSTOM_CODE_CHARS = 45000`
  - `WebflowColorVariable`, `WebflowFontVariable`, `WebflowSizeVariable`, `WebflowAssetEntry`, `WebflowSectionSpec`, `WebflowCustomCodeBlock`, `WebflowTemplateManifest`
  - `extractTemplateVariables(params: { slug: string; title: string; palette: string[]; cssSources: string[]; layoutSource?: string }): WebflowTemplateManifest["variables"]`
  - `extractTemplateSections(params: { promptMarkdown: string; dependencies: string[]; cssSources: string[] }): WebflowSectionSpec[]`
  - `extractCustomCodeBlocks(params: { slug: string; title: string; dependencies: string[]; cssSources: string[] }): WebflowCustomCodeBlock[]`
  - `buildWebflowManifest(params: { template: Pick<TemplateItem, "slug" | "title" | "industry" | "description" | "stack" | "hasDownload" | "promptMarkdown">; palette?: string[]; dependencies?: string[]; cssSources?: string[]; layoutSource?: string; assetPaths?: string[] }): WebflowTemplateManifest`
  - `buildWebflowPromptMarkdown(manifest: WebflowTemplateManifest): string`
  - `buildFallbackWebflowPrompt(template: Pick<TemplateItem, "slug" | "title" | "industry" | "description" | "stack" | "hasDownload" | "promptMarkdown">): string`

- [ ] **Step 1: Write the failing tests in `src/lib/webflow/manifest.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import {
  WEBFLOW_MAX_CUSTOM_CODE_CHARS,
  buildWebflowManifest,
  buildWebflowPromptMarkdown,
  buildFallbackWebflowPrompt,
  extractCustomCodeBlocks,
} from "./manifest";
import { TEMPLATES } from "../../app/(index)/data/templates";

describe("webflow manifest builder", () => {
  const snoot = TEMPLATES.find((t) => t.slug === "snoot")!;

  it("extracts color, font, and size variables including color-mix and clamp custom expressions", () => {
    const css = `
      @theme static {
        --color-ink: #1F1B3A;
        --color-paper: #FFF4E4;
        --font-display: var(--font-lilita), sans-serif;
      }
      :root {
        --sn-gutter: clamp(16px, 4.6vw, 72px);
        --r-lg: 44px;
        --frank-light: color-mix(in oklab, var(--color-frank) 42%, var(--color-milk));
      }
    `;
    const layout = `import { Lilita_One, Figtree } from "next/font/google";`;
    const manifest = buildWebflowManifest({
      template: snoot,
      palette: ["#1F1B3A", "#FFF4E4", "#FF6B8B"],
      dependencies: ["lenis", "three"],
      cssSources: [css],
      layoutSource: layout,
      assetPaths: ["/snoot/frank.svg", "/gallery/snoot.webp"],
    });

    expect(manifest.variables.collectionName).toBe("Snoot Tokens");
    expect(manifest.variables.colors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ cssVar: "--color-ink", value: "#1F1B3A", isCustomExpression: false }),
        expect.objectContaining({ cssVar: "--frank-light", isCustomExpression: true }),
      ])
    );
    expect(manifest.variables.fonts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ googleFont: "Lilita One" }),
        expect.objectContaining({ googleFont: "Figtree" }),
      ])
    );
    expect(manifest.variables.sizes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ cssVar: "--sn-gutter", value: "clamp(16px, 4.6vw, 72px)", isCustomExpression: true }),
        expect.objectContaining({ cssVar: "--r-lg", value: "44px", isCustomExpression: false }),
      ])
    );
  });

  it("classifies numbered sections into native-whtml vs hybrid-embed for 3D and scrubbed sections", () => {
    const manifest = buildWebflowManifest({
      template: snoot,
      dependencies: ["lenis", "three"],
      cssSources: [".sn-hero { display: grid; } .sn-checkup { position: sticky; }"],
    });

    expect(manifest.sections.length).toBeGreaterThanOrEqual(10);
    const checkup = manifest.sections.find((s) => s.title.toLowerCase().includes("check-up"));
    const book = manifest.sections.find((s) => s.title.toLowerCase().includes("appointment"));
    const footer = manifest.sections.find((s) => s.title.toLowerCase().includes("footer"));

    expect(checkup?.deliveryMode).toBe("hybrid-embed");
    expect(book?.deliveryMode).toBe("hybrid-embed");
    expect(footer?.deliveryMode).toBe("native-whtml");
  });

  it("strips data: URLs and splits custom code blocks so no block exceeds 45,000 characters", () => {
    const hugeCss =
      `@font-face { src: url("data:font/woff2;base64,${"A".repeat(20000)}"); }\n` +
      Array.from({ length: 1200 }, (_, i) => `.sn-rule-${i} { padding: 12px 24px; color: var(--color-ink); }`).join("\n");

    const blocks = extractCustomCodeBlocks({
      slug: "snoot",
      title: "Snoot",
      dependencies: ["three"],
      cssSources: [hugeCss],
    });

    expect(blocks.length).toBeGreaterThan(1);
    for (const block of blocks) {
      expect(block.code).not.toContain("data:font/woff2");
      expect(block.code.length).toBeLessThanOrEqual(WEBFLOW_MAX_CUSTOM_CODE_CHARS);
      expect(block.charCount).toBe(block.code.length);
    }
  });

  it("falls back gracefully when a template prompt has no numbered section headings", () => {
    const minimal = buildWebflowManifest({
      template: {
        slug: "snoot",
        title: "Snoot",
        industry: "Vet Clinic",
        description: "Neighbourhood vet clinic.",
        stack: "Next.js 16",
        hasDownload: true,
        promptMarkdown: "# Simple prompt without numbered list",
      },
    });
    expect(minimal.sections).toHaveLength(1);
    expect(minimal.sections[0].id).toBe("section-1");
  });

  it("renders a Webflow MCP prompt instructing the agent to use openlanding MCP or the JSON manifest and Webflow MCP tools", () => {
    const manifest = buildWebflowManifest({ template: snoot, dependencies: ["lenis", "three"] });
    const md = buildWebflowPromptMarkdown(manifest);

    expect(md).toContain("data_variable_tool");
    expect(md).toContain("data_whtml_builder");
    expect(md).toContain("data_style_tool");
    expect(md).toContain("data_assets_tool");
    expect(md).toContain("data_interactions_tool");
    expect(md).toContain("data_scripts_tool");
    expect(md).toContain("/copy/snoot-webflow.json");
    expect(md).toContain("get_webflow_manifest");
    expect(buildFallbackWebflowPrompt(snoot)).toContain("data_variable_tool");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/webflow/manifest.test.ts`
Expected: FAIL with `Cannot find module './manifest'`

- [ ] **Step 3: Implement `src/lib/webflow/manifest.ts`**

Implement the exported types and functions:
- `WEBFLOW_MAX_CUSTOM_CODE_CHARS = 45000`.
- `stripDataUrls(css: string): string` removes `@font-face` blocks containing `data:` URLs and replaces any remaining `url("data:...")` / `url('data:...')` / `url(data:...)` with `url("about:blank")`.
- `extractTemplateVariables`:
  - Parses `--[\w-]+:\s*([^;]+);` from `cssSources`.
  - Variables starting with `--color-` or whose value is `#hex`, `rgb(...)`, `hsl(...)`, `oklch(...)`, or `color-mix(...)` become `WebflowColorVariable` (`isCustomExpression: true` when value contains `color-mix(` or `var(`). Any hex color in `palette` not already covered by a CSS variable is added as `--color-palette-${i + 1}`.
  - Variables starting with `--font-` and `next/font/google` imports in `layoutSource` (converting snake_case identifiers like `Lilita_One` to `"Lilita One"`) become `WebflowFontVariable`.
  - Variables with `px`, `rem`, `em`, `vw`, `vh`, `%`, or `clamp(` / `calc(` become `WebflowSizeVariable` (`isCustomExpression: true` when value contains `clamp(` or `calc(`).
- `extractTemplateSections`:
  - Matches numbered list items under `## Sections` / `### 1. Structure & Sections` / `## Page Acts` / `## Narrative chapters` (regex `/^\s*(?:0?\d+[\.\)]|- \*\*0?\d+)\s+\*\*([^*:]+?)\*\*[:.]?\s*(.+)$/gm` across `promptMarkdown`).
  - Falls back to a single default section (`id: "section-1"`, `title: "Main Landing Page"`, `summary: first 240 chars of promptMarkdown`) if no numbered items match.
  - Marks `deliveryMode: "hybrid-embed"` when the section summary or title mentions `3D`, `WebGPU`, `WebGL`, `Three.js`, `Canvas`, `shader`, `pinned`, `scrub`, `stethoscope`, `sequencer`, or `mini-game`; otherwise `"native-whtml"`.
- `extractCustomCodeBlocks`:
  - Strips `data:` URLs from `cssSources`, combines custom rules, and splits along rule/newline boundaries into chunks `<= WEBFLOW_MAX_CUSTOM_CODE_CHARS` (`id: "${slug}-styles-1"`, `location: "head"`).
  - If `dependencies` contains `"three"`, `"gsap"`, or `"lenis"`, adds a `"footer"` runtime bridge block listing the CDN ESM/script setup and mount hooks.
- `buildWebflowPromptMarkdown(manifest)` & `buildFallbackWebflowPrompt(template)`:
  - Produces a structured Markdown prompt containing:
    1. Dual-source retrieval instructions (call `openlanding` MCP `get_webflow_manifest` + `get_webflow_section` if available; otherwise fetch `${manifest.manifestUrl}` and `${manifest.downloadUrl}`).
    2. Exact `data_variable_tool` table for `manifest.variables` (Colors, Fonts, Sizes).
    3. Exact `data_fonts_tool` / Google Fonts and `data_assets_tool` asset list.
    4. Section-by-section build plan showing which sections use `data_whtml_builder` + `data_style_tool` (`native-whtml`) vs. `HtmlEmbed` + `data_scripts_tool` (`hybrid-embed`).
    5. `data_interactions_tool` IX3 guidelines (`wf:transform` opacity/xPercent/yPercent + `prefers-reduced-motion` conditional playback).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/webflow/manifest.test.ts`
Expected: PASS (5 passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/webflow/manifest.ts src/lib/webflow/manifest.test.ts
git commit -m "feat(webflow): add build-time Webflow manifest and prompt builder"
```

---

### Task 2: Generate `<slug>-webflow.json` and `<slug>-webflow-prompt.md` in `scripts/generate-copy-bundles.ts`

**Files:**
- Modify: `scripts/generate-copy-bundles.ts`
- Create: `scripts/generate-copy-bundles.test.ts`

**Interfaces:**
- Consumes:
  - `buildWebflowManifest`, `buildWebflowPromptMarkdown`, `WebflowTemplateManifest` from `../src/lib/webflow/manifest`
  - `RAW_TEMPLATES` from `../src/app/(index)/data/templates`
  - `TEMPLATES`, `TemplateSlug` from `./templates.config`
- Produces:
  - `buildTemplateWebflowArtifacts(slug: TemplateSlug): { manifest: WebflowTemplateManifest; promptMarkdown: string }` in `scripts/generate-copy-bundles.ts`
  - Updated `generateCopyBundles(outputDir?: string, slugs?: readonly TemplateSlug[]): void` writing `<slug>-prompt.md`, `<slug>-webflow.json`, and `<slug>-webflow-prompt.md`

- [ ] **Step 1: Write the failing test in `scripts/generate-copy-bundles.test.ts`**

```ts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { buildTemplateWebflowArtifacts, generateCopyBundles } from "./generate-copy-bundles";

describe("generateCopyBundles", () => {
  it("builds a complete Webflow manifest and prompt for snoot without data: URLs", () => {
    const { manifest, promptMarkdown } = buildTemplateWebflowArtifacts("snoot");
    expect(manifest.slug).toBe("snoot");
    expect(manifest.variables.colors.length).toBeGreaterThanOrEqual(8);
    expect(manifest.sections.length).toBeGreaterThanOrEqual(10);
    expect(JSON.stringify(manifest)).not.toContain("data:font/woff2");
    expect(promptMarkdown).toContain("Snoot Tokens");
    expect(promptMarkdown).toContain("data_variable_tool");
  });

  it("writes <slug>-prompt.md, <slug>-webflow.json, and <slug>-webflow-prompt.md to the target directory", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "openlanding-copy-test-"));
    try {
      generateCopyBundles(tmpDir, ["snoot", "tolvar"]);
      expect(fs.existsSync(path.join(tmpDir, "snoot-prompt.md"))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, "snoot-webflow.json"))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, "snoot-webflow-prompt.md"))).toBe(true);

      const parsed = JSON.parse(fs.readFileSync(path.join(tmpDir, "snoot-webflow.json"), "utf8"));
      expect(parsed.slug).toBe("snoot");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run scripts/generate-copy-bundles.test.ts`
Expected: FAIL with `buildTemplateWebflowArtifacts is not a function`

- [ ] **Step 3: Implement `buildTemplateWebflowArtifacts` and update `generateCopyBundles` in `scripts/generate-copy-bundles.ts`**

- Add `buildTemplateWebflowArtifacts(slug: TemplateSlug)` in `scripts/generate-copy-bundles.ts`:
  - Looks up the template metadata in `RAW_TEMPLATES`, `TEMPLATES[slug]`, and `COPY_METADATA[slug]`.
  - Reads CSS files (`fg.sync(\`src/app/\\\\(${slug}\\\\)/****/*.css\`)`), optional `layout.tsx` (`src/app/(${slug})/layout.tsx`), and public asset filenames under `public/${slug}/**` plus `/gallery/${slug}.webp`.
  - Calls `buildWebflowManifest(...)` and `buildWebflowPromptMarkdown(manifest)`.
- Update `generateCopyBundles(outputDir = path.resolve(process.cwd(), "public/copy"), slugs = Object.keys(TEMPLATES) as TemplateSlug[])`:
  - Writes `${slug}-prompt.md`, `${slug}-webflow.json`, and `${slug}-webflow-prompt.md` when changed.

- [ ] **Step 4: Run test to verify it passes and regenerate `public/copy`**

Run: `npx vitest run scripts/generate-copy-bundles.test.ts && npx tsx scripts/generate-copy-bundles.ts`
Expected: PASS and `copy bundles: generated`

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-copy-bundles.ts scripts/generate-copy-bundles.test.ts public/copy
git commit -m "feat(copy-bundles): generate per-template Webflow JSON manifests and prompts"
```

---

### Task 3: Stateless OpenLanding MCP Server (`src/lib/mcp/openlanding-mcp.ts` & `src/app/api/mcp/route.ts`)

**Files:**
- Create: `src/lib/mcp/openlanding-mcp.ts`
- Create: `src/app/api/mcp/route.ts`
- Test: `src/app/api/mcp/route.test.ts`

**Interfaces:**
- Consumes:
  - `TEMPLATES`, `findTemplate` from `../../app/(index)/data/templates` and `../../app/(index)/components/detail/detail-content`
  - `buildWebflowManifest`, `buildWebflowPromptMarkdown`, `WebflowTemplateManifest` from `../webflow/manifest`
- Produces:
  - `MCP_SERVER_INFO = { name: "openlanding-mcp", version: "1.0.0" }`
  - `MCP_TOOLS`: tool definitions for `list_templates`, `get_webflow_manifest`, `get_webflow_section`, `get_webflow_prompt`
  - `handleJsonRpcPayload(payload: unknown): Promise<{ status: number; body: unknown | null }>` in `src/lib/mcp/openlanding-mcp.ts`
  - `GET()`, `POST(request: Request)`, `OPTIONS()` in `src/app/api/mcp/route.ts`

- [ ] **Step 1: Write the failing tests in `src/app/api/mcp/route.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { GET, POST, OPTIONS } from "./route";

describe("/api/mcp route", () => {
  it("returns server metadata and CORS headers on GET and OPTIONS", async () => {
    const optRes = await OPTIONS();
    expect(optRes.status).toBe(204);
    expect(optRes.headers.get("access-control-allow-origin")).toBe("*");

    const getRes = await GET();
    expect(getRes.status).toBe(200);
    const info = await getRes.json();
    expect(info.name).toBe("openlanding-mcp");
    expect(info.tools).toEqual(
      expect.arrayContaining(["list_templates", "get_webflow_manifest", "get_webflow_section", "get_webflow_prompt"])
    );
  });

  it("handles initialize and tools/list JSON-RPC requests", async () => {
    const initRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} }),
      })
    );
    expect(initRes.status).toBe(200);
    const initJson = await initRes.json();
    expect(initJson.result.serverInfo.name).toBe("openlanding-mcp");

    const listRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
      })
    );
    const listJson = await listRes.json();
    expect(listJson.result.tools).toHaveLength(4);
  });

  it("returns HTTP 202 with empty body for JSON-RPC notifications without an id", async () => {
    const res = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
      })
    );
    expect(res.status).toBe(202);
    expect(await res.text()).toBe("");
  });

  it("executes list_templates, get_webflow_manifest, get_webflow_section, and get_webflow_prompt", async () => {
    const callTool = async (name: string, args: Record<string, unknown>) => {
      const res = await POST(
        new Request("http://localhost/api/mcp", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: 10, method: "tools/call", params: { name, arguments: args } }),
        })
      );
      return res.json();
    };

    const listOut = await callTool("list_templates", { query: "snoot", limit: 5 });
    expect(listOut.result.isError).toBeFalsy();
    expect(JSON.parse(listOut.result.content[0].text)).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug: "snoot" })])
    );

    const manifestOut = await callTool("get_webflow_manifest", { slug: "snoot" });
    const manifest = JSON.parse(manifestOut.result.content[0].text);
    expect(manifest.slug).toBe("snoot");
    expect(manifest.sections.length).toBeGreaterThan(0);

    const sectionOut = await callTool("get_webflow_section", {
      slug: "snoot",
      sectionId: manifest.sections[0].id,
    });
    expect(sectionOut.result.isError).toBeFalsy();
    expect(JSON.parse(sectionOut.result.content[0].text).section.id).toBe(manifest.sections[0].id);

    const promptOut = await callTool("get_webflow_prompt", { slug: "snoot" });
    expect(promptOut.result.content[0].text).toContain("data_variable_tool");
  });

  it("returns structured JSON-RPC and tool errors for invalid JSON, unknown methods, and unknown slugs", async () => {
    const badJsonRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        body: "{bad-json",
      })
    );
    expect(badJsonRes.status).toBe(400);
    expect((await badJsonRes.json()).error.code).toBe(-32700);

    const badMethodRes = await POST(
      new Request("http://localhost/mcp", {
        method: "POST",
        body: JSON.stringify({ jsonrpc: "2.0", id: 3, method: "unknown/method" }),
      })
    );
    expect((await badMethodRes.json()).error.code).toBe(-32601);

    const badSlugRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 4,
          method: "tools/call",
          params: { name: "get_webflow_manifest", arguments: { slug: "nonexistent-slug" } },
        }),
      })
    );
    const badSlugJson = await badSlugRes.json();
    expect(badSlugJson.result.isError).toBe(true);
    expect(badSlugJson.result.content[0].text).toContain("Unknown template slug");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/api/mcp/route.test.ts`
Expected: FAIL with `Cannot find module './route'`

- [ ] **Step 3: Implement `src/lib/mcp/openlanding-mcp.ts` and `src/app/api/mcp/route.ts`**

- In `src/lib/mcp/openlanding-mcp.ts`:
  - Implement `loadOrBuildWebflowManifest(slug: string): WebflowTemplateManifest | null` which checks `findTemplate(TEMPLATES, slug)` first (so unknown or archived templates return `null`), reads `public/copy/${slug}-webflow.json` if present on disk, and falls back to `buildWebflowManifest({ template })`.
  - Implement the four tools (`list_templates`, `get_webflow_manifest`, `get_webflow_section`, `get_webflow_prompt`) and JSON-RPC 2.0 dispatch (`initialize`, `notifications/initialized`, `ping`, `tools/list`, `tools/call`).
- In `src/app/api/mcp/route.ts`:
  - Export `GET`, `POST`, and `OPTIONS` with `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, POST, OPTIONS`, and `Access-Control-Allow-Headers: Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/api/mcp/route.test.ts`
Expected: PASS (5 passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/mcp/openlanding-mcp.ts src/app/api/mcp/route.ts src/app/api/mcp/route.test.ts
git commit -m "feat(mcp): add stateless /api/mcp endpoint for Webflow template imports"
```

---

### Task 4: Detail Page Helpers, FAQ & `CopyWebflowPromptButton`

**Files:**
- Modify: `src/app/(index)/components/detail/detail-content.ts`
- Modify: `src/app/(index)/components/detail/detail-content.test.ts`
- Create: `src/app/(index)/components/detail/CopyWebflowPromptButton.tsx`
- Modify: `src/app/(index)/components/detail/TemplateDetailView.tsx`
- Modify: `src/app/(index)/landing-page-templates/[slug]/page.test.tsx`

**Interfaces:**
- Consumes:
  - `buildFallbackWebflowPrompt` from `../../../../lib/webflow/manifest`
- Produces:
  - `webflowPromptPath(slug: string): string` → `"/copy/${slug}-webflow-prompt.md"`
  - `webflowManifestPath(slug: string): string` → `"/copy/${slug}-webflow.json"`
  - `fetchOrBuildWebflowPrompt(template: Pick<TemplateItem, "slug" | "title" | "industry" | "description" | "stack" | "hasDownload" | "promptMarkdown">): Promise<string>` in `CopyWebflowPromptButton.tsx`
  - `CopyWebflowPromptButton` component

- [ ] **Step 1: Write the failing assertions in `src/app/(index)/components/detail/detail-content.test.ts` and `src/app/(index)/landing-page-templates/[slug]/page.test.tsx`**

Read `src/app/(index)/components/detail/detail-content.test.ts` and `src/app/(index)/landing-page-templates/[slug]/page.test.tsx`, then add tests asserting:
- `webflowPromptPath("snoot")` returns `"/copy/snoot-webflow-prompt.md"`
- `webflowManifestPath("snoot")` returns `"/copy/snoot-webflow.json"`
- `buildTemplateFaq(snoot)` includes a question `"Can I import Snoot into Webflow?"` mentioning `"Copy Webflow prompt"` and `"/api/mcp"`
- `TemplateDetailView` renders `"Copy Webflow prompt"` and `href="/copy/snoot-webflow-prompt.md"`

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/app/(index)/components/detail/detail-content.test.ts "src/app/(index)/landing-page-templates/[slug]/page.test.tsx"`
Expected: FAIL with missing `webflowPromptPath` / missing `"Copy Webflow prompt"`

- [ ] **Step 3: Implement detail helpers, `CopyWebflowPromptButton.tsx`, and update `TemplateDetailView.tsx`**

- In `src/app/(index)/components/detail/detail-content.ts`:
  - Export `webflowPromptPath(slug: string)` returning `"/copy/${slug}-webflow-prompt.md"` and `webflowManifestPath(slug: string)` returning `"/copy/${slug}-webflow.json"`.
  - Add the FAQ item `{ question: \`Can I import \${t.title} into Webflow?\`, answer: \`Yes. Use Copy Webflow prompt on this page or connect the OpenLanding MCP (/api/mcp) alongside the official Webflow MCP in ${AI_AGENTS} to build native Webflow variables, styles, sections and custom-code embeds.\` }` to `buildTemplateFaq`.
- Create `src/app/(index)/components/detail/CopyWebflowPromptButton.tsx`:
  - Exports `fetchOrBuildWebflowPrompt(template)` which fetches `webflowPromptPath(template.slug)` and falls back to `buildFallbackWebflowPrompt(template)` if fetch fails or returns non-OK.
  - Renders `<button type="button" onClick={copy} data-copied={state === "copied"} className={className}>` with label `"Copy Webflow prompt"` / `"Copied Webflow prompt"` and error alert `"Couldn't copy. Open the Webflow Markdown prompt instead."`.
- In `src/app/(index)/components/detail/TemplateDetailView.tsx`:
  - Render `<CopyWebflowPromptButton template={t} className="detail-action" />` and `<a href={webflowPromptPath(t.slug)} className="detail-action"><FileText size={18} aria-hidden="true" /><span>Open Webflow prompt</span></a>` inside `.detail-actions`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/app/(index)/components/detail/detail-content.test.ts "src/app/(index)/landing-page-templates/[slug]/page.test.tsx"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/(index)/components/detail/detail-content.ts src/app/(index)/components/detail/detail-content.test.ts src/app/(index)/components/detail/CopyWebflowPromptButton.tsx src/app/(index)/components/detail/TemplateDetailView.tsx "src/app/(index)/landing-page-templates/[slug]/page.test.tsx"
git commit -m "feat(detail): add Copy Webflow prompt action and Webflow FAQ on detail pages"
```

---

### Task 5: Option A Card Copy Popover & `McpSetupDialog` (`TemplateCard.tsx` & `McpSetupDialog.tsx`)

**Files:**
- Create: `src/app/(index)/components/McpSetupDialog.tsx`
- Modify: `src/app/(index)/components/TemplateCard.tsx`
- Modify: `src/app/(index)/components/TemplateCard.test.tsx`
- Modify: `src/app/(index)/index.css`

**Interfaces:**
- Consumes:
  - `fetchOrBuildWebflowPrompt` from `./detail/CopyWebflowPromptButton`
- Produces:
  - `OPENLANDING_MCP_CONFIG_JSON` and `McpSetupDialog({ open, onClose }: { open: boolean; onClose: () => void })` in `src/app/(index)/components/McpSetupDialog.tsx`
  - Updated `TemplateCard` with Option A popover menu (`Copy code prompt`, `Copy Webflow prompt`, `Setup openlanding MCP`)

- [ ] **Step 1: Write the failing tests in `src/app/(index)/components/TemplateCard.test.tsx`**

Add tests in `src/app/(index)/components/TemplateCard.test.tsx` and check `McpSetupDialog`:
- `TemplateCard` renders the Copy prompt button with `aria-haspopup="menu"` and `aria-label="Copy prompt"`.
- `McpSetupDialog` renders when `open={true}` with `"https://www.openlanding.page/api/mcp"`, `"https://mcp.webflow.com/mcp"`, and `"Copy MCP config"`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/components/TemplateCard.test.tsx`
Expected: FAIL with missing `aria-haspopup="menu"` / `McpSetupDialog`

- [ ] **Step 3: Implement `McpSetupDialog.tsx`, update `TemplateCard.tsx`, and add popover styles in `src/app/(index)/index.css`**

- In `src/app/(index)/components/McpSetupDialog.tsx`:
  - Render an accessible dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="mcp-setup-title"`) using `.community-dialog-backdrop` and `.community-dialog` classes.
  - Display the JSON snippet for `mcpServers` (`openlanding` at `https://www.openlanding.page/api/mcp` and `webflow` at `https://mcp.webflow.com/mcp`), a `Copy MCP config` button, and a `Close` button. Close on `Escape` and backdrop click.
- In `src/app/(index)/components/TemplateCard.tsx`:
  - Keep the existing Copy button in `.card-title-row` with `aria-label={copiedAction === "prompt" ? "Copied prompt" : copiedAction === "webflow" ? "Copied Webflow prompt" : "Copy prompt"}`, `title="Copy prompt"`, `aria-haspopup="menu"`, `aria-expanded={menuOpen}`.
  - Clicking the Copy button toggles `menuOpen`. When `menuOpen` is true, render `.card-copy-popover` (`role="menu"`, `aria-label={`Copy prompt options for ${template.title}`}`) with:
    1. `<button type="button" role="menuitem" className="card-copy-item" onClick={handleCopyPrompt}><span>Copy code prompt</span><small>Next.js</small></button>`
    2. `<button type="button" role="menuitem" className="card-copy-item" onClick={handleCopyWebflowPrompt}><span>Copy Webflow prompt</span><small>Webflow MCP</small></button>`
    3. `<button type="button" role="menuitem" className="card-copy-item card-copy-item-mcp" onClick={() => { setMenuOpen(false); setMcpDialogOpen(true); }}><span>Setup openlanding MCP</span><small>JSON</small></button>`
  - Close the popover on `Escape` or outside click. Render `<McpSetupDialog open={mcpDialogOpen} onClose={() => setMcpDialogOpen(false)} />` when `mcpDialogOpen` is true.
- In `src/app/(index)/index.css`:
  - Add `.card-copy-menu-wrap { position: relative; display: inline-flex; }`, `.card-copy-popover` (positioned right-aligned below the button with `background: var(--color-paper-2)`, `border: 1px solid var(--color-rule-2)`, `border-radius: 8px`, `z-index: 20`, `min-width: 210px`, `padding: 4px`), and `.card-copy-item` styles.

- [ ] **Step 4: Run the full unit test suite and project checks**

Run: `npx vitest run && npm run check`
Expected: All unit tests and isolation/palette/media checks PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/(index)/components/McpSetupDialog.tsx src/app/(index)/components/TemplateCard.tsx src/app/(index)/components/TemplateCard.test.tsx src/app/(index)/index.css
git commit -m "feat(gallery): add Webflow prompt popover and MCP setup dialog to template cards"
```
