# Webflow MCP Import Prompt: KAIRO K (kairok)

Import the **KAIRO K** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/kairok
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/kairok-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/kairok.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "kairok" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "kairok", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/kairok-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KAIRO K Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Black Carbon` | `--black-carbon` | `#121315` | `static_value` |
| `Color / Graphite` | `--graphite` | `#1d2024` | `static_value` |
| `Color / Titanium` | `--titanium` | `#7f858d` | `static_value` |
| `Color / Porcelain` | `--porcelain` | `#f2efe9` | `static_value` |
| `Color / Copper` | `--copper` | `#e68f63` | `static_value` |
| `Color / Copper Soft` | `--copper-soft` | `#b8785d` | `static_value` |
| `Color / Stone` | `--stone` | `#d2cec7` | `static_value` |
| `Color / Body Muted` | `--body-muted` | `#a8aaa9` | `static_value` |
| `Color / Panel Line` | `--panel-line` | `rgba(242, 239, 233, 0.15)` | `static_value` |
| `Color / Panel Line Dark` | `--panel-line-dark` | `rgba(18, 19, 21, 0.12)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Bricolage Grotesque` | Fallback: `-apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Sans` | `--font-sans` | `Plus Jakarta Sans` | Fallback: `-apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Fallback: `ui-monospace, SFMono-Regular, monospace` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KAIRO K` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `kairok.webp` (image/webp) — https://www.openlanding.page/gallery/kairok.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KAIRO K Scoped Styles** (`kairok-styles-1`, placement: `head`, 5412 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KAIRO K Interactive Runtime Bridge** (`kairok-runtime-1`, placement: `footer`, 271 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
