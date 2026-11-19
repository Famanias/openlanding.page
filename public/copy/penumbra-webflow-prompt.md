# Webflow MCP Import Prompt: PENUMBRA (penumbra)

Import the **PENUMBRA** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/penumbra
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/penumbra-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/penumbra.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "penumbra" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "penumbra", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/penumbra-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`PENUMBRA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--ink` | `#111318` | `static_value` |
| `Color / Slate` | `--slate` | `#1c2027` | `static_value` |
| `Color / Slate Raised` | `--slate-raised` | `#232832` | `static_value` |
| `Color / Ivory` | `--ivory` | `#F2EBE2` | `static_value` |
| `Color / Amber` | `--amber` | `#D7A779` | `static_value` |
| `Color / Amber Bright` | `--amber-bright` | `#E9BB86` | `static_value` |
| `Color / Steel` | `--steel` | `#7E91A8` | `static_value` |
| `Color / Stone` | `--stone` | `#A6A29F` | `static_value` |
| `Color / Line` | `--line` | `rgba(242, 235, 226, 0.10)` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#20252D` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Serif` | `--font-serif` | `Instrument Serif` | Google Font: `Instrument Serif` |
| `Font / Sans` | `--font-sans` | `Manrope` | Google Font: `Manrope` |
| `Font / Mono` | `--font-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Cormorant Garamond` | `--font-cormorant-garamond` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Spot R` | `--spot-r` | `260px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `PENUMBRA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `penumbra.webp` (image/webp) — https://www.openlanding.page/gallery/penumbra.webp (Gallery preview capture)
- `architecture-base.webp` (image/webp) — https://www.openlanding.page/templates/penumbra/architecture-base.webp (Template media asset)
- `architecture-illuminated.webp` (image/webp) — https://www.openlanding.page/templates/penumbra/architecture-illuminated.webp (Template media asset)
- `media_1793712887880_2079312c.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793712887880_2079312c.jpg (Template media asset)
- `media_1793712891049_9b3ee09d.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793712891049_9b3ee09d.jpg (Template media asset)
- `media_1793712895877_5c2db63b.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793712895877_5c2db63b.jpg (Template media asset)
- `media_1793712998087_6e90a1f5.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793712998087_6e90a1f5.jpg (Template media asset)
- `media_1793713001160_45215e56.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793713001160_45215e56.jpg (Template media asset)
- `media_1793713005948_825ebe4b.jpg` (image/jpeg) — https://www.openlanding.page/templates/penumbra/media_1793713005948_825ebe4b.jpg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/penumbra/preview-1600.webp (Template media asset)
- `architecture-base_a79a3e0f.webp` (image/webp) — https://www.openlanding.page/templates/penumbra/aistudio/architecture-base_a79a3e0f.webp (Template media asset)
- `architecture-illuminated_3b7655d4.webp` (image/webp) — https://www.openlanding.page/templates/penumbra/aistudio/architecture-illuminated_3b7655d4.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **PENUMBRA Scoped Styles** (`penumbra-styles-1`, placement: `head`, 4228 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **PENUMBRA Interactive Runtime Bridge** (`penumbra-runtime-1`, placement: `footer`, 272 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
