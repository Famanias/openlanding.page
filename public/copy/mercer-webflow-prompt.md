# Webflow MCP Import Prompt: Jules Mercer (mercer)

Import the **Jules Mercer** (Creative Development & 3D Web) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/mercer
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/mercer-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/mercer.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "mercer" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "mercer", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/mercer-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Jules Mercer Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Jm Ink` | `--color-jm-ink` | `#0a0d10` | `static_value` |
| `Color / Jm Paper` | `--color-jm-paper` | `#e8ecef` | `static_value` |
| `Color / Jm Lime` | `--color-jm-lime` | `#ccff00` | `static_value` |
| `Color / Jm Cyan` | `--color-jm-cyan` | `#00e5ff` | `static_value` |
| `Color / Jm Muted` | `--jm-muted` | `color-mix(in srgb, #e8ecef 58%, #0a0d10)` | `custom_value` |
| `Color / Jm Line` | `--jm-line` | `color-mix(in srgb, #e8ecef 17%, #0a0d10)` | `custom_value` |
| `Color / Jm Bg` | `--jm-bg` | `#090d10` | `static_value` |
| `Color / Jm Panel` | `--jm-panel` | `#0c1114` | `static_value` |
| `Color / Jm Panel2` | `--jm-panel2` | `#101619` | `static_value` |
| `Color / Jm Lime` | `--jm-lime` | `#d5ff37` | `static_value` |
| `Color / Jm Blue` | `--jm-blue` | `#6f85ff` | `static_value` |
| `Color / Jm Text` | `--jm-text` | `#f0f1eb` | `static_value` |
| `Color / Jm Sub` | `--jm-sub` | `#a9b0ad` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#1E88E5` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#D2FF00` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Geist` | `--font-geist` | `Geist` | Google Font: `Geist` |
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Jm Ry` | `--jm-ry` | `52px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Jules Mercer` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `mercer.webp` (image/webp) — https://www.openlanding.page/gallery/mercer.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/mercer/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js portfolio hero at `/mercer`: a slate `#0A0D10` blueprint grid, Geist headline reading “I BUILD / WHAT YOU / IMAGINE.”, chartreuse `#CCFF00` final line and CTA, off-white `#E8ECEF` copy, Geist Mono navigation and te
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Jules Mercer Scoped Styles (Part 1/2)** (`mercer-styles-1`, placement: `head`, 43789 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Jules Mercer Scoped Styles (Part 2/2)** (`mercer-styles-2`, placement: `head`, 3751 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Jules Mercer Interactive Runtime Bridge** (`mercer-runtime-1`, placement: `footer`, 349 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
