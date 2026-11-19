# Webflow MCP Import Prompt: ASSEMBLAGE (assemblage)

Import the **ASSEMBLAGE** (Brand Direction & Creative Strategy) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/assemblage
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/assemblage-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/assemblage.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "assemblage" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "assemblage", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/assemblage-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ASSEMBLAGE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / As Paper` | `--color-as-paper` | `#F6F0E8` | `static_value` |
| `Color / As Ink` | `--color-as-ink` | `#1E1D1B` | `static_value` |
| `Color / As Sand` | `--color-as-sand` | `#E2D8C9` | `static_value` |
| `Color / As Vermilion` | `--color-as-vermilion` | `#D95F3F` | `static_value` |
| `Color / As Teal` | `--color-as-teal` | `#1D6C63` | `static_value` |
| `Color / As Ochre` | `--color-as-ochre` | `#E7C65A` | `static_value` |
| `Color / As Plum` | `--color-as-plum` | `#8F4E70` | `static_value` |
| `Color / As Line` | `--as-line` | `rgba(30,29,27,.18)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / As Body` | `--font-as-body` | `var(--font-assemblage-body)` | Fallback: `system-ui, sans-serif` |
| `Font / As Mono` | `--font-as-mono` | `var(--font-assemblage-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / As Gutter` | `--as-gutter` | `clamp(20px, 5vw, 80px)` | `custom_value` |
| `Size / As Max` | `--as-max` | `1280px` | `static_value` |
| `Size / As Offset` | `--as-offset` | `0px` | `static_value` |
| `Size / As Canvas Bleed` | `--as-canvas-bleed` | `224px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ASSEMBLAGE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `assemblage.webp` (image/webp) — https://www.openlanding.page/gallery/assemblage.webp (Gallery preview capture)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/assemblage/icon.svg (Template media asset)
- `preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/assemblage/preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build the Assemblage landing page in Next.js 16 App Router, React 19 and TypeScript. It is a mixed media material study for independent brands. The primary action is **Request a material study**.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ASSEMBLAGE Scoped Styles** (`assemblage-styles-1`, placement: `head`, 31528 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **ASSEMBLAGE Interactive Runtime Bridge** (`assemblage-runtime-1`, placement: `footer`, 347 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
