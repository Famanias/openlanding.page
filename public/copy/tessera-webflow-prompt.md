# Webflow MCP Import Prompt: TESSERA (tessera)

Import the **TESSERA** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/tessera
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/tessera-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/tessera.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "tessera" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "tessera", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/tessera-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TESSERA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg Canvas` | `--bg-canvas` | `#0b0d10` | `static_value` |
| `Color / Bg Elevated` | `--bg-elevated` | `#111419` | `static_value` |
| `Color / Bg Specimen` | `--bg-specimen` | `#161a21` | `static_value` |
| `Color / Border Hairline` | `--border-hairline` | `rgba(226, 232, 240, 0.09)` | `static_value` |
| `Color / Text Primary` | `--text-primary` | `#f1f5f9` | `static_value` |
| `Color / Text Muted` | `--text-muted` | `#94a3b8` | `static_value` |
| `Color / Accent Bronze` | `--accent-bronze` | `#c89d66` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#F8FAFC` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |
| `Font / Sans` | `--font-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TESSERA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `tessera.webp` (image/webp) — https://www.openlanding.page/gallery/tessera.webp (Gallery preview capture)
- `atrium_installation_hero_1794380180899.jpg` (image/jpeg) — https://www.openlanding.page/templates/tessera/atrium_installation_hero_1794380180899.jpg (Template media asset)
- `material_atelier_craft_1794380184347.jpg` (image/jpeg) — https://www.openlanding.page/templates/tessera/material_atelier_craft_1794380184347.jpg (Template media asset)
- `oslo_chamber_project_1794380181917.jpg` (image/jpeg) — https://www.openlanding.page/templates/tessera/oslo_chamber_project_1794380181917.jpg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/tessera/preview-1600.webp (Template media asset)
- `zurich_kunsthalle_project_1794380183581.jpg` (image/jpeg) — https://www.openlanding.page/templates/tessera/zurich_kunsthalle_project_1794380183581.jpg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TESSERA Scoped Styles** (`tessera-styles-1`, placement: `head`, 2710 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TESSERA Interactive Runtime Bridge** (`tessera-runtime-1`, placement: `footer`, 271 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
