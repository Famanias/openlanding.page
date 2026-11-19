# Webflow MCP Import Prompt: KHORA (khora)

Import the **KHORA** (Architecture & Wellness) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/khora
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/khora-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/khora.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "khora" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "khora", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/khora-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KHORA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#0F1012` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#E8EAE3` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#F7F8F5` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#17181C` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#91959B` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#E25822` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#7FA4A6` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#D2D9D9` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#FFFFFF` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#111111` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Body` | `--font-body` | `system-ui` | System font stack |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KHORA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `khora.webp` (image/webp) — https://www.openlanding.page/gallery/khora.webp (Gallery preview capture)
- `khora-01-surface-hero.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-01-surface-hero.webp (Template media asset)
- `khora-02-chamber-basin.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-02-chamber-basin.webp (Template media asset)
- `khora-03-corridor-threshold.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-03-corridor-threshold.webp (Template media asset)
- `khora-04-silica-pool.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-04-silica-pool.webp (Template media asset)
- `khora-05-depth-atrium.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-05-depth-atrium.webp (Template media asset)
- `khora-06-architectural-model.png` (image/png) — https://www.openlanding.page/templates/khora/khora-06-architectural-model.png (Template media asset)
- `khora-07-basalt-blocks.png` (image/png) — https://www.openlanding.page/templates/khora/khora-07-basalt-blocks.png (Template media asset)
- `khora-08-mineral-specimens.png` (image/png) — https://www.openlanding.page/templates/khora/khora-08-mineral-specimens.png (Template media asset)
- `khora-09-residence-lounge.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-09-residence-lounge.webp (Template media asset)
- `khora-10-closing-contact.webp` (image/webp) — https://www.openlanding.page/templates/khora/khora-10-closing-contact.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/khora/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Paste everything below the line into your AI coding agent.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- No external JS runtime blocks required; all layout and styling fit inside native Webflow styles.
