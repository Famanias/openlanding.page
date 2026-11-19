# Webflow MCP Import Prompt: AERUNE (aerune)

Import the **AERUNE** (Workplace air intelligence) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/aerune
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/aerune-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/aerune.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "aerune" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "aerune", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/aerune-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AERUNE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ar Night` | `--color-ar-night` | `#101A1D` | `static_value` |
| `Color / Ar Paper` | `--color-ar-paper` | `#F3EFE5` | `static_value` |
| `Color / Ar Porcelain` | `--color-ar-porcelain` | `#FCFAF4` | `static_value` |
| `Color / Ar Mist` | `--color-ar-mist` | `#C6D8CF` | `static_value` |
| `Color / Ar Slate` | `--color-ar-slate` | `#A6B3AC` | `static_value` |
| `Color / Ar Ember` | `--color-ar-ember` | `#ED7546` | `static_value` |
| `Color / Ar Forest` | `--color-ar-forest` | `#203631` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Geist` | `--font-geist` | `Geist` | Google Font: `Geist` |
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Ar Shift` | `--ar-shift` | `28px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AERUNE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `aerune.webp` (image/webp) — https://www.openlanding.page/gallery/aerune.webp (Gallery preview capture)
- `building-at-dusk-1600.avif` (image/avif) — https://www.openlanding.page/templates/aerune/building-at-dusk-1600.avif (Template media asset)
- `building-at-dusk-1600.webp` (image/webp) — https://www.openlanding.page/templates/aerune/building-at-dusk-1600.webp (Template media asset)
- `building-at-dusk-800.avif` (image/avif) — https://www.openlanding.page/templates/aerune/building-at-dusk-800.avif (Template media asset)
- `building-at-dusk-800.webp` (image/webp) — https://www.openlanding.page/templates/aerune/building-at-dusk-800.webp (Template media asset)
- `footer-atmosphere-1600.webp` (image/webp) — https://www.openlanding.page/templates/aerune/footer-atmosphere-1600.webp (Template media asset)
- `footer-atmosphere-800.webp` (image/webp) — https://www.openlanding.page/templates/aerune/footer-atmosphere-800.webp (Template media asset)
- `hero-atmosphere-1600.avif` (image/avif) — https://www.openlanding.page/templates/aerune/hero-atmosphere-1600.avif (Template media asset)
- `hero-atmosphere-1600.webp` (image/webp) — https://www.openlanding.page/templates/aerune/hero-atmosphere-1600.webp (Template media asset)
- `hero-atmosphere-800.avif` (image/avif) — https://www.openlanding.page/templates/aerune/hero-atmosphere-800.avif (Template media asset)
- `hero-atmosphere-800.webp` (image/webp) — https://www.openlanding.page/templates/aerune/hero-atmosphere-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/aerune/preview-1600.webp (Template media asset)
- `sensor-detail-1600.avif` (image/avif) — https://www.openlanding.page/templates/aerune/sensor-detail-1600.avif (Template media asset)
- `sensor-detail-1600.webp` (image/webp) — https://www.openlanding.page/templates/aerune/sensor-detail-1600.webp (Template media asset)
- `sensor-detail-800.avif` (image/avif) — https://www.openlanding.page/templates/aerune/sensor-detail-800.avif (Template media asset)
- `sensor-detail-800.webp` (image/webp) — https://www.openlanding.page/templates/aerune/sensor-detail-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a complete, isolated Next.js 16 App Router / React 19 / TypeScript landing template for the fictional AERUNE workplace air intelligence platform. All code imports must stay within `src/app/(aerune)/` or npm packages; install `lenis` f

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AERUNE Scoped Styles** (`aerune-styles-1`, placement: `head`, 38093 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AERUNE Interactive Runtime Bridge** (`aerune-runtime-1`, placement: `footer`, 343 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
