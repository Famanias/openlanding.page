# Webflow MCP Import Prompt: Landing X (landingx)

Import the **Landing X** (Creative Tools & AI) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/landingx
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/landingx-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/landingx.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "landingx" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "landingx", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/landingx-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Landing X Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Lx Tan` | `--lx-tan` | `#F1F0E8` | `static_value` |
| `Color / Lx Rust` | `--lx-rust` | `#B53E2B` | `static_value` |
| `Color / Lx Warm` | `--lx-warm` | `#E4E6DD` | `static_value` |
| `Color / Lx Paper` | `--lx-paper` | `#FAF9F3` | `static_value` |
| `Color / Lx Ink` | `--lx-ink` | `#222622` | `static_value` |
| `Color / Lx Earth` | `--lx-earth` | `#899385` | `static_value` |
| `Color / Lx Strong` | `--lx-strong` | `color-mix(in srgb, var(--lx-ink) 65%, black)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Barlow Condensed` | `--font-barlow-condensed` | `Barlow Condensed` | Google Font: `Barlow Condensed` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Landing X` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `landingx.webp` (image/webp) — https://www.openlanding.page/gallery/landingx.webp (Gallery preview capture)
- `footer-background-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/footer-background-1600.avif (Template media asset)
- `footer-background-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/footer-background-1600.webp (Template media asset)
- `footer-background-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/footer-background-800.avif (Template media asset)
- `footer-background-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/footer-background-800.webp (Template media asset)
- `hero-background-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/hero-background-1600.avif (Template media asset)
- `hero-background-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/hero-background-1600.webp (Template media asset)
- `hero-background-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/hero-background-800.avif (Template media asset)
- `hero-background-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/hero-background-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/preview-1600.webp (Template media asset)
- `work-avel-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-avel-1600.avif (Template media asset)
- `work-avel-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-avel-1600.webp (Template media asset)
- `work-avel-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-avel-800.avif (Template media asset)
- `work-avel-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-avel-800.webp (Template media asset)
- `work-firstday-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-firstday-1600.avif (Template media asset)
- `work-firstday-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-firstday-1600.webp (Template media asset)
- `work-firstday-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-firstday-800.avif (Template media asset)
- `work-firstday-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-firstday-800.webp (Template media asset)
- `work-hiyas-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-hiyas-1600.avif (Template media asset)
- `work-hiyas-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-hiyas-1600.webp (Template media asset)
- `work-hiyas-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-hiyas-800.avif (Template media asset)
- `work-hiyas-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-hiyas-800.webp (Template media asset)
- `work-pello-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-pello-1600.avif (Template media asset)
- `work-pello-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-pello-1600.webp (Template media asset)
- `work-pello-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-pello-800.avif (Template media asset)
- `work-pello-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-pello-800.webp (Template media asset)
- `work-rill-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-rill-1600.avif (Template media asset)
- `work-rill-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-rill-1600.webp (Template media asset)
- `work-rill-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-rill-800.avif (Template media asset)
- `work-rill-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-rill-800.webp (Template media asset)
- `work-satsuma-1600.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-satsuma-1600.avif (Template media asset)
- `work-satsuma-1600.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-satsuma-1600.webp (Template media asset)
- `work-satsuma-800.avif` (image/avif) — https://www.openlanding.page/templates/landingx/work-satsuma-800.avif (Template media asset)
- `work-satsuma-800.webp` (image/webp) — https://www.openlanding.page/templates/landingx/work-satsuma-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a complete responsive landing page for Landing X, the public-facing name of the create-landing-template agent skill. The site should showcase a diverse collection of real landing-page templates as its main attraction. Use impeccable.s
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Landing X Scoped Styles** (`landingx-styles-1`, placement: `head`, 21962 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
