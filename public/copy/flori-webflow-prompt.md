# Webflow MCP Import Prompt: Flori (flori)

Import the **Flori** (Flowers & Lifestyle) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/flori
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/flori-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/flori.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "flori" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "flori", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/flori-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Flori Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Flori Paper` | `--color-flori-paper` | `#FFF9F0` | `static_value` |
| `Color / Flori Ink` | `--color-flori-ink` | `#344C40` | `static_value` |
| `Color / Flori Blush` | `--color-flori-blush` | `#F1C6CF` | `static_value` |
| `Color / Flori Lilac` | `--color-flori-lilac` | `#D8D1EC` | `static_value` |
| `Color / Flori Pistachio` | `--color-flori-pistachio` | `#D9E6C8` | `static_value` |
| `Color / Flori Butter` | `--color-flori-butter` | `#F5DF9B` | `static_value` |
| `Color / Flori Apricot` | `--color-flori-apricot` | `#EDB997` | `static_value` |
| `Color / Flori Sage` | `--color-flori-sage` | `#91AAA0` | `static_value` |
| `Color / Fl Paper` | `--fl-paper` | `#FFF9F0` | `static_value` |
| `Color / Fl Ink` | `--fl-ink` | `#344C40` | `static_value` |
| `Color / Fl Blush` | `--fl-blush` | `#F1C6CF` | `static_value` |
| `Color / Fl Lilac` | `--fl-lilac` | `#D8D1EC` | `static_value` |
| `Color / Fl Pistachio` | `--fl-pistachio` | `#D9E6C8` | `static_value` |
| `Color / Fl Butter` | `--fl-butter` | `#F5DF9B` | `static_value` |
| `Color / Fl Apricot` | `--fl-apricot` | `#EDB997` | `static_value` |
| `Color / Fl Sage` | `--fl-sage` | `#91AAA0` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Lora` | `--font-lora` | `Lora` | Google Font: `Lora` |
| `Font / Outfit` | `--font-outfit` | `Outfit` | Google Font: `Outfit` |
| `Font / Caveat` | `--font-caveat` | `Caveat` | Google Font: `Caveat` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `26px` | `static_value` |
| `Size / Fl Card Width` | `--fl-card-width` | `188px` | `static_value` |
| `Size / Fl Card Gap` | `--fl-card-gap` | `18px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Flori` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `flori.webp` (image/webp) — https://www.openlanding.page/gallery/flori.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/flori/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build an isolated Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 landing page at `/flori` for a fictional seasonal flower subscription. Install `npm i next react react-dom lenis`. Read the installed Next documentation befor

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Flori Scoped Styles** (`flori-styles-1`, placement: `head`, 39459 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Flori Interactive Runtime Bridge** (`flori-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
