# Webflow MCP Import Prompt: ALPINE REEL (alpine-reel)

Import the **ALPINE REEL** (Mountain Cinema) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/alpine-reel
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/alpine-reel-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/alpine-reel.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "alpine-reel" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "alpine-reel", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/alpine-reel-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ALPINE REEL Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Arl Abyss` | `--arl-abyss` | `#040B16` | `static_value` |
| `Color / Arl Navy` | `--arl-navy` | `#08162A` | `static_value` |
| `Color / Arl Ice` | `--arl-ice` | `#6EA8D2` | `static_value` |
| `Color / Arl Snow` | `--arl-snow` | `#FFFFFF` | `static_value` |
| `Color / Arl Ink Soft` | `--arl-ink-soft` | `color-mix(in srgb, var(--arl-snow) 78%, transparent)` | `custom_value` |
| `Color / Arl Ink Muted` | `--arl-ink-muted` | `color-mix(in srgb, var(--arl-snow) 56%, transparent)` | `custom_value` |
| `Color / Arl Ink Faint` | `--arl-ink-faint` | `color-mix(in srgb, var(--arl-snow) 24%, transparent)` | `custom_value` |
| `Color / Arl Line` | `--arl-line` | `color-mix(in srgb, var(--arl-snow) 15%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Arl Display` | `--font-arl-display` | `var(--font-playfair)` | Fallback: `Georgia, serif` |
| `Font / Arl Body` | `--font-arl-body` | `Geist` | Google Font: `Geist` |
| `Font / Arl Mono` | `--font-arl-mono` | `Geist Mono` | Google Font: `Geist Mono` |
| `Font / Outlier` | `--font-outlier` | `var(--font-geist-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / Playfair Display` | `--font-playfair-display` | `Playfair Display` | Google Font: `Playfair Display` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Arl Pad Y` | `--arl-pad-y` | `7.5dvh` | `static_value` |
| `Size / Arl Initial Transform` | `--arl-initial-transform` | `translate3d(calc(10vw - 29 * 85vw), 0, 0)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ALPINE REEL` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `alpine-reel.webp` (image/webp) — https://www.openlanding.page/gallery/alpine-reel.webp (Gallery preview capture)
- `annapurna-i-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/annapurna-i-1600.avif (Template media asset)
- `annapurna-i-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/annapurna-i-1600.webp (Template media asset)
- `annapurna-i-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/annapurna-i-800.avif (Template media asset)
- `annapurna-i-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/annapurna-i-800.webp (Template media asset)
- `broad-peak-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/broad-peak-1600.avif (Template media asset)
- `broad-peak-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/broad-peak-1600.webp (Template media asset)
- `broad-peak-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/broad-peak-800.avif (Template media asset)
- `broad-peak-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/broad-peak-800.webp (Template media asset)
- `cho-oyu-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/cho-oyu-1600.avif (Template media asset)
- `cho-oyu-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/cho-oyu-1600.webp (Template media asset)
- `cho-oyu-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/cho-oyu-800.avif (Template media asset)
- `cho-oyu-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/cho-oyu-800.webp (Template media asset)
- `dhaulagiri-i-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/dhaulagiri-i-1600.avif (Template media asset)
- `dhaulagiri-i-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/dhaulagiri-i-1600.webp (Template media asset)
- `dhaulagiri-i-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/dhaulagiri-i-800.avif (Template media asset)
- `dhaulagiri-i-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/dhaulagiri-i-800.webp (Template media asset)
- `gasherbrum-i-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-i-1600.avif (Template media asset)
- `gasherbrum-i-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-i-1600.webp (Template media asset)
- `gasherbrum-i-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-i-800.avif (Template media asset)
- `gasherbrum-i-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-i-800.webp (Template media asset)
- `gasherbrum-ii-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-ii-1600.avif (Template media asset)
- `gasherbrum-ii-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-ii-1600.webp (Template media asset)
- `gasherbrum-ii-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-ii-800.avif (Template media asset)
- `gasherbrum-ii-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/gasherbrum-ii-800.webp (Template media asset)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/alpine-reel/icon.svg (Template media asset)
- `k2-godwin-austen-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/k2-godwin-austen-1600.avif (Template media asset)
- `k2-godwin-austen-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/k2-godwin-austen-1600.webp (Template media asset)
- `k2-godwin-austen-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/k2-godwin-austen-800.avif (Template media asset)
- `k2-godwin-austen-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/k2-godwin-austen-800.webp (Template media asset)
- `kangchenjunga-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/kangchenjunga-1600.avif (Template media asset)
- `kangchenjunga-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/kangchenjunga-1600.webp (Template media asset)
- `kangchenjunga-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/kangchenjunga-800.avif (Template media asset)
- `kangchenjunga-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/kangchenjunga-800.webp (Template media asset)
- `lhotse-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/lhotse-1600.avif (Template media asset)
- `lhotse-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/lhotse-1600.webp (Template media asset)
- `lhotse-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/lhotse-800.avif (Template media asset)
- `lhotse-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/lhotse-800.webp (Template media asset)
- `makalu-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/makalu-1600.avif (Template media asset)
- `makalu-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/makalu-1600.webp (Template media asset)
- `makalu-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/makalu-800.avif (Template media asset)
- `makalu-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/makalu-800.webp (Template media asset)
- `manaslu-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/manaslu-1600.avif (Template media asset)
- `manaslu-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/manaslu-1600.webp (Template media asset)
- `manaslu-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/manaslu-800.avif (Template media asset)
- `manaslu-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/manaslu-800.webp (Template media asset)
- `mount-everest-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/mount-everest-1600.avif (Template media asset)
- `mount-everest-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/mount-everest-1600.webp (Template media asset)
- `mount-everest-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/mount-everest-800.avif (Template media asset)
- `mount-everest-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/mount-everest-800.webp (Template media asset)
- `nanga-parbat-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/nanga-parbat-1600.avif (Template media asset)
- `nanga-parbat-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/nanga-parbat-1600.webp (Template media asset)
- `nanga-parbat-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/nanga-parbat-800.avif (Template media asset)
- `nanga-parbat-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/nanga-parbat-800.webp (Template media asset)
- `preview-1600.svg` (image/svg+xml) — https://www.openlanding.page/templates/alpine-reel/preview-1600.svg (Template media asset)
- `shishapangma-1600.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/shishapangma-1600.avif (Template media asset)
- `shishapangma-1600.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/shishapangma-1600.webp (Template media asset)
- `shishapangma-800.avif` (image/avif) — https://www.openlanding.page/templates/alpine-reel/shishapangma-800.avif (Template media asset)
- `shishapangma-800.webp` (image/webp) — https://www.openlanding.page/templates/alpine-reel/shishapangma-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a Next.js 16 App Router page for the fictional editorial brand **Alpine Reel**. The page is a full viewport horizontal reel of the fourteen eight-thousanders from `slides/data.ts`. Its central idea is: the peaks are a film reel, so la

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ALPINE REEL Scoped Styles** (`alpine-reel-styles-1`, placement: `head`, 20129 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
