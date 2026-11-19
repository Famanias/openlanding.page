# Webflow MCP Import Prompt: TRACE (trace)

Import the **TRACE** (Urban Systems) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/trace
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/trace-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/trace.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "trace" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "trace", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/trace-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TRACE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Trace Ink` | `--color-trace-ink` | `#081115` | `static_value` |
| `Color / Trace Paper` | `--color-trace-paper` | `#e7ece7` | `static_value` |
| `Color / Trace Accent` | `--color-trace-accent` | `#c9f458` | `static_value` |
| `Color / Trace Muted` | `--color-trace-muted` | `#849694` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Trace Display` | `--font-trace-display` | `var(--font-trace-sans)` | Fallback: `system-ui, sans-serif` |
| `Font / Trace Mono` | `--font-trace-mono` | `var(--font-trace-mono-source)` | Fallback: `ui-monospace, monospace` |
| `Font / DM Mono` | `--font-dm-mono` | `DM Mono` | Google Font: `DM Mono` |
| `Font / Space Grotesk` | `--font-space-grotesk` | `Space Grotesk` | Google Font: `Space Grotesk` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Trace Gutter` | `--trace-gutter` | `clamp(20px, 5vw, 84px)` | `custom_value` |
| `Size / Trace Topbar` | `--trace-topbar` | `76px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TRACE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `trace.webp` (image/webp) — https://www.openlanding.page/gallery/trace.webp (Gallery preview capture)
- `trace-preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/trace/trace-preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a one-page landing site in Next.js App Router + React + TypeScript + Tailwind CSS v4 for TRACE, a spatial-intelligence studio that helps teams read what a city is becoming.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TRACE Scoped Styles** (`trace-styles-1`, placement: `head`, 13304 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TRACE Interactive Runtime Bridge** (`trace-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
