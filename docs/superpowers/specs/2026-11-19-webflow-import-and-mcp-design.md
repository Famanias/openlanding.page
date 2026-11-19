# Webflow Prompt & OpenLanding MCP Design Specification

## 1. Intent & Why

Visitors to `openlanding.page` want to import the gallery's landing page templates into **Webflow** without manually rebuilding every variable, class, section, and interaction by hand. Existing template prompts (`PROMPT.md`) target Next.js 16, React 19, and Tailwind v4, which forces a Webflow user or Webflow-connected AI agent to discard half the instructions.

This design combines **Option 1 ("Copy Webflow prompt")** and **Option 2 ("openlanding MCP server")** around a single shared build-time Webflow manifest per template:

1. **Shared Build-Time Webflow Manifest (`public/copy/<slug>-webflow.json` & `public/copy/<slug>-webflow-prompt.md`):** Extracts each template's design tokens (colors, fonts, sizes), public assets, section-by-section structure, and scoped custom-code islands (for Three.js/GSAP/scrubbed stages that cannot be expressed as native Webflow elements).
2. **Option 1 — Reused Copy Button Popover on Template Cards + Detail Page Action:** Clicking the Copy button on a template card opens a compact popover menu with **Copy code prompt**, **Copy Webflow prompt**, and **Setup openlanding MCP**. The template detail page (`/landing-page-templates/<slug>`) also surfaces **Copy Webflow prompt**.
3. **Option 2 — Stateless `/api/mcp` Endpoint:** A zero-dependency Next.js App Router JSON-RPC 2.0 Streamable HTTP MCP endpoint that lets an AI agent connected to both the `openlanding` MCP and the official `webflow` MCP discover templates, fetch the structured Webflow manifest, and pull section specs and custom-code blocks one section at a time.

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Make colors, fonts, fluid sizes, images, headings, body copy, links, buttons, forms, and standard IX3 entrance reveals **first-class editable Webflow primitives** in the Webflow Designer via Webflow's official MCP tools (`data_variable_tool`, `data_fonts_tool`, `data_assets_tool`, `data_whtml_builder`, `data_element_builder`, `data_style_tool`, `data_interactions_tool`).
- Isolate WebGL/Three.js scenes, pinned scroll scrub tracks, and custom JS state into **scoped custom-code islands** (`HtmlEmbed` and `data_scripts_tool` `set_page_freeform_code`), keeping every custom-code chunk under Webflow's 50,000-character limit (capped at 45,000 characters per block).
- Ensure **Copy Webflow prompt** works both when the user has **only** the official Webflow MCP connected (by referencing the public `/copy/<slug>-webflow.json` manifest and inline token/section breakdown) and when the user has **both** the `openlanding` MCP and `webflow` MCP connected.
- Keep gallery card layout compact by reusing the existing Copy button on `TemplateCard` (Option A) to open a popover menu rather than crowding `.card-title-row` with extra buttons.

### Non-Goals
- Undocumented `@webflow/XscpData` raw clipboard generation (Option 4) or Webflow DevLink Code Components (Option 3).
- Writing directly to a user's Webflow account from `openlanding.page` servers (the user's local AI agent executes the Webflow MCP tools using their own authenticated Webflow MCP connection).

### Anti-Goals
- Embedding multi-megabyte base64 `data:` URLs from `public/downloads/<slug>.html` into `public/copy/<slug>-webflow.json` or MCP responses (which would blow up agent context windows and slow down `predev` / `prebuild`).
- Adding heavyweight external MCP SDK dependencies when standard JSON-RPC 2.0 over Next.js `NextRequest`/`NextResponse` suffices.
- Breaking existing `src/app/(<slug>)` template isolation rules (`npm run check`).

## 3. Architecture & Data Contracts

### 3.1 Webflow Manifest Schema (`src/lib/webflow/manifest.ts`)
- `WebflowColorVariable`: `{ name: string; cssVar: string; value: string; isCustomExpression: boolean; role?: string }`
- `WebflowFontVariable`: `{ name: string; cssVar: string; family: string; fallback: string; googleFont?: string }`
- `WebflowSizeVariable`: `{ name: string; cssVar: string; value: string; isCustomExpression: boolean }`
- `WebflowAssetEntry`: `{ fileName: string; publicPath: string; contentType: string; role: string }`
- `WebflowSectionSpec`: `{ id: string; index: number; title: string; summary: string; deliveryMode: "native-whtml" | "hybrid-embed"; cssSelectors: string[]; customCodeReason?: string }`
- `WebflowCustomCodeBlock`: `{ id: string; location: "head" | "footer" | "embed"; title: string; maxChars: 45000; charCount: number; description: string; dependencies: string[]; code: string }`
- `WebflowTemplateManifest`:
  - `slug: TemplateSlug`
  - `title: string`
  - `industry: string`
  - `description: string`
  - `stack: string`
  - `liveUrl: string`
  - `downloadUrl: string | null`
  - `manifestUrl: string`
  - `webflowPromptUrl: string`
  - `variables: { collectionName: string; colors: WebflowColorVariable[]; fonts: WebflowFontVariable[]; sizes: WebflowSizeVariable[] }`
  - `assets: WebflowAssetEntry[]`
  - `sections: WebflowSectionSpec[]`
  - `customCodeBlocks: WebflowCustomCodeBlock[]`

### 3.2 Build-Time Generation (`scripts/generate-copy-bundles.ts`)
- For every template slug in `TEMPLATES`:
  - Generates `public/copy/<slug>-prompt.md` (existing).
  - Generates `public/copy/<slug>-webflow.json` (serialized `WebflowTemplateManifest`).
  - Generates `public/copy/<slug>-webflow-prompt.md` (rendered by `buildWebflowPromptMarkdown(manifest)`).
- Only writes files to disk when content changes to preserve fast incremental `predev`/`prebuild` runs.

### 3.3 Stateless MCP Server (`src/lib/mcp/openlanding-mcp.ts` & `src/app/api/mcp/route.ts`)
- Supports JSON-RPC 2.0 over HTTP `POST /api/mcp` (including single request objects and batch arrays), `GET /api/mcp` (server info + endpoint instructions), and `OPTIONS /api/mcp` (CORS headers for browser/inspector clients).
- Methods supported:
  - `initialize` → protocolVersion `"2024-11-05"`, capabilities `{ tools: {} }`, serverInfo `{ name: "openlanding-mcp", version: "1.0.0" }`
  - `notifications/initialized` → HTTP 202 / empty JSON-RPC acknowledgment
  - `ping` → `{}`
  - `tools/list` → lists:
    1. `list_templates` (`category?: string`, `query?: string`, `limit?: number`)
    2. `get_webflow_manifest` (`slug: string`)
    3. `get_webflow_section` (`slug: string`, `sectionId: string`)
    4. `get_webflow_prompt` (`slug: string`)
  - `tools/call` → executes the requested tool, returning `{ content: [{ type: "text", text: ... }], isError?: boolean }`. Unknown slugs or section IDs return structured MCP tool errors (`isError: true`) with actionable messages.

### 3.4 Frontend UI (`TemplateCard.tsx`, `McpSetupDialog.tsx`, `TemplateDetailView.tsx`)
- **`TemplateCard` Copy Popover:**
  - Clicking the Copy button toggles a popover menu (`role="menu"`) with three items:
    1. `Copy code prompt` (`role="menuitem"`) — copies `template.promptMarkdown` immediately.
    2. `Copy Webflow prompt` (`role="menuitem"`) — fetches `/copy/${template.slug}-webflow-prompt.md` (with fallback to a client-built Webflow prompt if offline) and copies it to the clipboard.
    3. `Setup openlanding MCP` (`role="menuitem"`) — opens `McpSetupDialog`.
  - Pressing `Escape` or clicking outside closes the popover and restores focus cleanly.
- **`McpSetupDialog`:**
  - Modal dialog displaying the `mcpServers` JSON config for `openlanding` (`https://www.openlanding.page/api/mcp`) and `webflow` (`https://mcp.webflow.com/mcp`) with a `Copy MCP config` button.
- **`TemplateDetailView`:**
  - Adds `CopyWebflowPromptButton` ("Copy Webflow prompt") in `.detail-actions` alongside `CopyPromptButton` ("Copy prompt").
  - Adds a Webflow import question to `buildTemplateFaq(t)` in `detail-content.ts`.
