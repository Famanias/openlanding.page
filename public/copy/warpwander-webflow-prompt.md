# Webflow MCP Import Prompt: WARP & WANDER (warpwander)

Import the **WARP & WANDER** (Gaming & Hardware) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/warpwander
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/warpwander-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/warpwander.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "warpwander" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "warpwander", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/warpwander-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`WARP & WANDER Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ww Indigo` | `--color-ww-indigo` | `#23244F` | `static_value` |
| `Color / Ww Forest` | `--color-ww-forest` | `#2F644F` | `static_value` |
| `Color / Ww Nectar` | `--color-ww-nectar` | `#FFD06A` | `static_value` |
| `Color / Ww Coral` | `--color-ww-coral` | `#FF907A` | `static_value` |
| `Color / Ww Cream` | `--color-ww-cream` | `#FFF1D3` | `static_value` |
| `Color / Ww Lagoon` | `--color-ww-lagoon` | `#6DDCC5` | `static_value` |
| `Color / Ww Mulberry` | `--color-ww-mulberry` | `#604A79` | `static_value` |
| `Color / Twilight Indigo` | `--twilight-indigo` | `#23244F` | `static_value` |
| `Color / Fern Forest` | `--fern-forest` | `#2F644F` | `static_value` |
| `Color / Golden Nectar` | `--golden-nectar` | `#FFD06A` | `static_value` |
| `Color / Coral Bloom` | `--coral-bloom` | `#FF907A` | `static_value` |
| `Color / Daylight Cream` | `--daylight-cream` | `#FFF1D3` | `static_value` |
| `Color / Lagoon Mist` | `--lagoon-mist` | `#6DDCC5` | `static_value` |
| `Color / Mulberry Shadow` | `--mulberry-shadow` | `#604A79` | `static_value` |
| `Color / Ww Twilight Indigo` | `--ww-twilight-indigo` | `#23244F` | `static_value` |
| `Color / Ww Fern Forest` | `--ww-fern-forest` | `#2F644F` | `static_value` |
| `Color / Ww Golden Nectar` | `--ww-golden-nectar` | `#FFD06A` | `static_value` |
| `Color / Ww Coral Bloom` | `--ww-coral-bloom` | `#FF907A` | `static_value` |
| `Color / Ww Daylight Cream` | `--ww-daylight-cream` | `#FFF1D3` | `static_value` |
| `Color / Ww Lagoon Mist` | `--ww-lagoon-mist` | `#6DDCC5` | `static_value` |
| `Color / Ww Mulberry Shadow` | `--ww-mulberry-shadow` | `#604A79` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#151633` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#171838` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#191A3B` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Ww Display` | `--font-ww-display` | `var(--font-pixelify` | Fallback: `Pixelify Sans, monospace)` |
| `Font / Ww Body` | `--font-ww-body` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Ww Hud` | `--font-ww-hud` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Display` | `--font-display` | `var(--font-pixelify` | Fallback: `Pixelify Sans, monospace)` |
| `Font / Body` | `--font-body` | `var(--font-dm-sans` | Fallback: `DM Sans, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Hud` | `--font-hud` | `var(--font-jetbrains-mono` | Fallback: `JetBrains Mono, monospace)` |
| `Font / Pixelify Sans` | `--font-pixelify-sans` | `Pixelify Sans` | Google Font: `Pixelify Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `WARP & WANDER` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `warpwander.webp` (image/webp) — https://www.openlanding.page/gallery/warpwander.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/warpwander/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): > **Project:** Original 2D pixel-art, side-scrolling product landing page
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **WARP & WANDER Scoped Styles** (`warpwander-styles-1`, placement: `head`, 3910 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **WARP & WANDER Interactive Runtime Bridge** (`warpwander-runtime-1`, placement: `footer`, 341 / 45000 chars): Loads gsap in page footer custom code with prefers-reduced-motion guard.
