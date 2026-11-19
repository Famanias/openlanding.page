# Webflow MCP Import Prompt: TOURNE (tourne)

Import the **TOURNE** (Ceramics & Pottery) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/tourne
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/tourne-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/tourne.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "tourne" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "tourne", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/tourne-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TOURNE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bone` | `--color-bone` | `#F4EEE3` | `static_value` |
| `Color / Oat` | `--color-oat` | `#E9DFCE` | `static_value` |
| `Color / Clay` | `--color-clay` | `#A8492D` | `static_value` |
| `Color / Soot` | `--color-soot` | `#1F1A17` | `static_value` |
| `Color / Umber` | `--color-umber` | `#6B5E54` | `static_value` |
| `Color / Celadon` | `--color-celadon` | `#8FB5A0` | `static_value` |
| `Color / Porcelain` | `--color-porcelain` | `#FFFDF8` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Fraunces` | Google Font: `Fraunces` |
| `Font / Body` | `--font-body` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Mono` | `--font-mono` | `DM Mono` | Google Font: `DM Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Tn Radius` | `--tn-radius` | `28px` | `static_value` |
| `Size / Tn Pill` | `--tn-pill` | `999px` | `static_value` |
| `Size / Tn Gutter` | `--tn-gutter` | `clamp(20px, 5vw, 72px)` | `custom_value` |
| `Size / Tn Max` | `--tn-max` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TOURNE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `tourne.webp` (image/webp) — https://www.openlanding.page/gallery/tourne.webp (Gallery preview capture)
- `potter-hana-1600.avif` (image/avif) — https://www.openlanding.page/templates/tourne/potter-hana-1600.avif (Template media asset)
- `potter-hana-1600.webp` (image/webp) — https://www.openlanding.page/templates/tourne/potter-hana-1600.webp (Template media asset)
- `potter-hana-800.avif` (image/avif) — https://www.openlanding.page/templates/tourne/potter-hana-800.avif (Template media asset)
- `potter-hana-800.webp` (image/webp) — https://www.openlanding.page/templates/tourne/potter-hana-800.webp (Template media asset)
- `potter-teo-1600.avif` (image/avif) — https://www.openlanding.page/templates/tourne/potter-teo-1600.avif (Template media asset)
- `potter-teo-1600.webp` (image/webp) — https://www.openlanding.page/templates/tourne/potter-teo-1600.webp (Template media asset)
- `potter-teo-800.avif` (image/avif) — https://www.openlanding.page/templates/tourne/potter-teo-800.avif (Template media asset)
- `potter-teo-800.webp` (image/webp) — https://www.openlanding.page/templates/tourne/potter-teo-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/tourne/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js 16 / React 19 / TypeScript / Tailwind v4 landing page at `/tourne` for a fictional pottery studio in Tacoma, Washington. Use `three` (WebGL) and `lenis`. Everything lives in `src/app/(tourne)/` and imports only npm
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TOURNE Scoped Styles** (`tourne-styles-1`, placement: `head`, 36699 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TOURNE Interactive Runtime Bridge** (`tourne-runtime-1`, placement: `footer`, 424 / 45000 chars): Loads three, lenis in page footer custom code with prefers-reduced-motion guard.
