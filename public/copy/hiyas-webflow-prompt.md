# Webflow MCP Import Prompt: HIYAS (hiyas)

Import the **HIYAS** (High-Altitude Expeditions) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/hiyas
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/hiyas-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/hiyas.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "hiyas" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "hiyas", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/hiyas-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`HIYAS Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Hy Black` | `--color-hy-black` | `#05070A` | `static_value` |
| `Color / Hy Blue` | `--color-hy-blue` | `#0B2A4A` | `static_value` |
| `Color / Hy White` | `--color-hy-white` | `#FFFFFF` | `static_value` |
| `Color / Hy Black` | `--hy-black` | `#05070A` | `static_value` |
| `Color / Hy Blue` | `--hy-blue` | `#0B2A4A` | `static_value` |
| `Color / Hy White` | `--hy-white` | `#FFFFFF` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Hy Display` | `--font-hy-display` | `Oswald` | Google Font: `Oswald` |
| `Font / Hy Body` | `--font-hy-body` | `Outfit` | Google Font: `Outfit` |
| `Font / Hy Mono` | `--font-hy-mono` | `Roboto Mono` | Google Font: `Roboto Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Hy Gutter` | `--hy-gutter` | `clamp(20px, 5vw, 80px)` | `custom_value` |
| `Size / Hy Container` | `--hy-container` | `1320px` | `static_value` |
| `Size / Hy Radius` | `--hy-radius` | `0px` | `static_value` |
| `Size / Hy Lift` | `--hy-lift` | `-6px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `HIYAS` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `hiyas.webp` (image/webp) — https://www.openlanding.page/gallery/hiyas.webp (Gallery preview capture)
- `camp-night-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/camp-night-1600.avif (Template media asset)
- `camp-night-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/camp-night-1600.webp (Template media asset)
- `camp-night-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/camp-night-800.avif (Template media asset)
- `camp-night-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/camp-night-800.webp (Template media asset)
- `field-note-01-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-01-1600.avif (Template media asset)
- `field-note-01-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-01-1600.webp (Template media asset)
- `field-note-01-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-01-800.avif (Template media asset)
- `field-note-01-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-01-800.webp (Template media asset)
- `field-note-02-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-02-1600.avif (Template media asset)
- `field-note-02-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-02-1600.webp (Template media asset)
- `field-note-02-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-02-800.avif (Template media asset)
- `field-note-02-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-02-800.webp (Template media asset)
- `field-note-03-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-03-1600.avif (Template media asset)
- `field-note-03-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-03-1600.webp (Template media asset)
- `field-note-03-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/field-note-03-800.avif (Template media asset)
- `field-note-03-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/field-note-03-800.webp (Template media asset)
- `footer-mountain-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/footer-mountain-1600.avif (Template media asset)
- `footer-mountain-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/footer-mountain-1600.webp (Template media asset)
- `footer-mountain-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/footer-mountain-800.avif (Template media asset)
- `footer-mountain-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/footer-mountain-800.webp (Template media asset)
- `hero-route-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/hero-route-1600.avif (Template media asset)
- `hero-route-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/hero-route-1600.webp (Template media asset)
- `hero-route-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/hero-route-800.avif (Template media asset)
- `hero-route-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/hero-route-800.webp (Template media asset)
- `peak-everest-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/peak-everest-1600.avif (Template media asset)
- `peak-everest-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/peak-everest-1600.webp (Template media asset)
- `peak-everest-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/peak-everest-800.avif (Template media asset)
- `peak-everest-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/peak-everest-800.webp (Template media asset)
- `peak-k2-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/peak-k2-1600.avif (Template media asset)
- `peak-k2-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/peak-k2-1600.webp (Template media asset)
- `peak-k2-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/peak-k2-800.avif (Template media asset)
- `peak-k2-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/peak-k2-800.webp (Template media asset)
- `planner-profile-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/planner-profile-1600.avif (Template media asset)
- `planner-profile-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/planner-profile-1600.webp (Template media asset)
- `planner-profile-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/planner-profile-800.avif (Template media asset)
- `planner-profile-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/planner-profile-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/preview-1600.webp (Template media asset)
- `support-rope-1600.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/support-rope-1600.avif (Template media asset)
- `support-rope-1600.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/support-rope-1600.webp (Template media asset)
- `support-rope-800.avif` (image/avif) — https://www.openlanding.page/templates/hiyas/support-rope-800.avif (Template media asset)
- `support-rope-800.webp` (image/webp) — https://www.openlanding.page/templates/hiyas/support-rope-800.webp (Template media asset)
- `camp-wind-m.mp4` (video/mp4) — https://www.openlanding.page/templates/hiyas/clips/camp-wind-m.mp4 (Template media asset)
- `camp-wind.mp4` (video/mp4) — https://www.openlanding.page/templates/hiyas/clips/camp-wind.mp4 (Template media asset)
- `route-dawn-m.mp4` (video/mp4) — https://www.openlanding.page/templates/hiyas/clips/route-dawn-m.mp4 (Template media asset)
- `route-dawn.mp4` (video/mp4) — https://www.openlanding.page/templates/hiyas/clips/route-dawn.mp4 (Template media asset)
- `annapurna.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/annapurna.svg (Template media asset)
- `broad-peak.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/broad-peak.svg (Template media asset)
- `cho-oyu.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/cho-oyu.svg (Template media asset)
- `dhaulagiri.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/dhaulagiri.svg (Template media asset)
- `everest.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/everest.svg (Template media asset)
- `gasherbrum-i.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/gasherbrum-i.svg (Template media asset)
- `gasherbrum-ii.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/gasherbrum-ii.svg (Template media asset)
- `k2.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/k2.svg (Template media asset)
- `kangchenjunga.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/kangchenjunga.svg (Template media asset)
- `lhotse.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/lhotse.svg (Template media asset)
- `makalu.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/makalu.svg (Template media asset)
- `manaslu.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/manaslu.svg (Template media asset)
- `nanga-parbat.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/nanga-parbat.svg (Template media asset)
- `shishapangma.svg` (image/svg+xml) — https://www.openlanding.page/templates/hiyas/mountains/shishapangma.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional mountaineering company called **HIYAS**. It plans and guides expeditions for climbers attempting one of the fourteen 8,000 m peaks, with

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **HIYAS Scoped Styles** (`hiyas-styles-1`, placement: `head`, 32834 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
