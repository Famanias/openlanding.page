# Webflow MCP Import Prompt: Avel (avel)

Import the **Avel** (Artificial Intelligence) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/avel
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/avel-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/avel.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "avel" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "avel", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/avel-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Avel Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Avl Clay` | `--color-avl-clay` | `#CDB3A3` | `static_value` |
| `Color / Avl Paper` | `--color-avl-paper` | `#F8F5EF` | `static_value` |
| `Color / Avl Ink` | `--color-avl-ink` | `#243A32` | `static_value` |
| `Color / Avl White` | `--color-avl-white` | `#FFFFFF` | `static_value` |
| `Color / Avl Sand` | `--color-avl-sand` | `#E8DDD2` | `static_value` |
| `Color / Avl Muted` | `--color-avl-muted` | `#5A6A60` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Newsreader` | `--font-newsreader` | `Newsreader` | Google Font: `Newsreader` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |
| `Font / DM Mono` | `--font-dm-mono` | `DM Mono` | Google Font: `DM Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Avel` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `avel.webp` (image/webp) — https://www.openlanding.page/gallery/avel.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Create an isolated, responsive landing page for Avel, a fictional AI company with several models. Use a wide, original coastal hero photograph with soft pastel brown sky, quiet limestone cliffs and deep pine water. Layer a polished AI produ
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Avel Scoped Styles** (`avel-styles-1`, placement: `head`, 27809 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
