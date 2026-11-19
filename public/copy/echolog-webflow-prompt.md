# Webflow MCP Import Prompt: ECHOLOG (echolog)

Import the **ECHOLOG** (Audio & Sonic Archive) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/echolog
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/echolog-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/echolog.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "echolog" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "echolog", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/echolog-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ECHOLOG Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#0E0C0C` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#100D0E` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#2D1518` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#DB705D` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#E9715E` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#F2C5AE` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#F5ECE5` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#B99F97` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Body` | `--font-body` | `system-ui` | System font stack |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ECHOLOG` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `echolog.webp` (image/webp) — https://www.openlanding.page/gallery/echolog.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Recreate the supplied ECHOLOG experience as one complete, self-contained HTML document at /echolog. The canonical source is public/downloads/echolog.html, imported from ECHOLOG_threejs_revised.html. Preserve its copy, responsive layouts, em
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ECHOLOG Interactive Runtime Bridge** (`echolog-runtime-1`, placement: `footer`, 344 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
