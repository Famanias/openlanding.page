# Webflow MCP Import Prompt: SERRAFORM (serraform)

Import the **SERRAFORM** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/serraform
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/serraform-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/serraform.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "serraform" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "serraform", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/serraform-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`SERRAFORM Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Srf Rose` | `--color-srf-rose` | `#F3E8E4` | `static_value` |
| `Color / Srf Oxblood` | `--color-srf-oxblood` | `#4B202A` | `static_value` |
| `Color / Srf Clay` | `--color-srf-clay` | `#9A463D` | `static_value` |
| `Color / Srf Mauve` | `--color-srf-mauve` | `#735B60` | `static_value` |
| `Color / Srf Flax` | `--color-srf-flax` | `#D8C4A7` | `static_value` |
| `Color / Srf Sage` | `--color-srf-sage` | `#A6B3A0` | `static_value` |
| `Color / Srf Porcelain` | `--color-srf-porcelain` | `#FFFCF8` | `static_value` |
| `Color / Srf Rose` | `--srf-rose` | `#F3E8E4` | `static_value` |
| `Color / Srf Oxblood` | `--srf-oxblood` | `#4B202A` | `static_value` |
| `Color / Srf Clay` | `--srf-clay` | `#9A463D` | `static_value` |
| `Color / Srf Mauve` | `--srf-mauve` | `#735B60` | `static_value` |
| `Color / Srf Flax` | `--srf-flax` | `#D8C4A7` | `static_value` |
| `Color / Srf Sage` | `--srf-sage` | `#A6B3A0` | `static_value` |
| `Color / Srf Porcelain` | `--srf-porcelain` | `#FFFCF8` | `static_value` |
| `Color / Srf Hairline` | `--srf-hairline` | `color-mix(in srgb, #4B202A 18%, #F3E8E4)` | `custom_value` |
| `Color / Srf Hairline Strong` | `--srf-hairline-strong` | `color-mix(in srgb, #4B202A 32%, #F3E8E4)` | `custom_value` |
| `Color / Srf Hairline Dark` | `--srf-hairline-dark` | `color-mix(in srgb, #FFFCF8 22%, #4B202A)` | `custom_value` |
| `Color / Srf Surface Soft` | `--srf-surface-soft` | `color-mix(in srgb, #FFFCF8 58%, #F3E8E4)` | `custom_value` |
| `Color / Srf Shadow` | `--srf-shadow` | `color-mix(in srgb, #4B202A 12%, transparent)` | `custom_value` |
| `Color / Room Wall Base` | `--room-wall-base` | `#F4EAE4` | `static_value` |
| `Color / Room Wall Highlight` | `--room-wall-highlight` | `#FAF4F0` | `static_value` |
| `Color / Room Wall Shadow` | `--room-wall-shadow` | `#E4CFC7` | `static_value` |
| `Color / Room Floor Base` | `--room-floor-base` | `#DEC6BC` | `static_value` |
| `Color / Room Floor Far` | `--room-floor-far` | `#EBD8D0` | `static_value` |
| `Color / Room Floor Detail` | `--room-floor-detail` | `#C5A89D` | `static_value` |
| `Color / Room Rug` | `--room-rug` | `#FAF3EE` | `static_value` |
| `Color / Room Rug Trim` | `--room-rug-trim` | `#7B4A4D` | `static_value` |
| `Color / Room Textile Primary` | `--room-textile-primary` | `#ECE0DA` | `static_value` |
| `Color / Room Textile Secondary` | `--room-textile-secondary` | `#E3D3CC` | `static_value` |
| `Color / Room Furniture` | `--room-furniture` | `#D8C4A7` | `static_value` |
| `Color / Room Furniture Leg` | `--room-furniture-leg` | `#7C5B53` | `static_value` |
| `Color / Room Decor Primary` | `--room-decor-primary` | `#7B4A4D` | `static_value` |
| `Color / Room Decor Accent` | `--room-decor-accent` | `#9A463D` | `static_value` |
| `Color / Room Trim` | `--room-trim` | `#9A463D` | `static_value` |
| `Color / Room Foliage` | `--room-foliage` | `#7F8E77` | `static_value` |
| `Color / Room Light Tint` | `--room-light-tint` | `#FFF8F0` | `static_value` |
| `Color / Room Ambient Tint` | `--room-ambient-tint` | `#EBD8D0` | `static_value` |
| `Color / Room Shadow Tint` | `--room-shadow-tint` | `#4B202A` | `static_value` |
| `Color / Room Quiet Bg` | `--room-quiet-bg` | `#F8F0EC` | `static_value` |
| `Color / Room Ui Accent` | `--room-ui-accent` | `#9A463D` | `static_value` |
| `Color / Room Ui Accent Hover` | `--room-ui-accent-hover` | `#7D362E` | `static_value` |
| `Color / Room Ui Accent Text` | `--room-ui-accent-text` | `#FFFCF8` | `static_value` |
| `Color / Room Ui Outline` | `--room-ui-outline` | `#4B202A` | `static_value` |
| `Color / Room Text Primary` | `--room-text-primary` | `#4B202A` | `static_value` |
| `Color / Room Text Secondary` | `--room-text-secondary` | `#6A5156` | `static_value` |
| `Color / Room Wall` | `--room-wall` | `#F4EAE4` | `static_value` |
| `Color / Room Wall Upper` | `--room-wall-upper` | `#FAF4F0` | `static_value` |
| `Color / Room Wall Alcove` | `--room-wall-alcove` | `#E4CFC7` | `static_value` |
| `Color / Room Floor` | `--room-floor` | `#DEC6BC` | `static_value` |
| `Color / Room Decor Secondary` | `--room-decor-secondary` | `#D8C4A7` | `static_value` |
| `Color / Room Light Warm` | `--room-light-warm` | `#FFF8F0` | `static_value` |
| `Color / Room Shadow` | `--room-shadow` | `#4B202A` | `static_value` |
| `Color / Room Mote` | `--room-mote` | `color-mix(in srgb, var(--room-trim) 58%, var(--room-light-tint))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Anybody` | Google Font: `Anybody` |
| `Font / Body` | `--font-body` | `Commissioner` | Google Font: `Commissioner` |
| `Font / Mono` | `--font-mono` | `Victor Mono` | Google Font: `Victor Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `24px` | `static_value` |
| `Size / Room Horizon Lift` | `--room-horizon-lift` | `0px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `SERRAFORM` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `serraform.webp` (image/webp) — https://www.openlanding.page/gallery/serraform.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **SERRAFORM Scoped Styles** (`serraform-styles-1`, placement: `head`, 37346 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **SERRAFORM Interactive Runtime Bridge** (`serraform-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
