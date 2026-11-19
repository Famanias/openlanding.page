# Webflow MCP Import Prompt: STRATA (strata)

Import the **STRATA** (Ceramics & Contemporary Objects) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/strata
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/strata-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/strata.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "strata" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "strata", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/strata-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`STRATA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#24221F` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#292620` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#E9E1D6` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#EFE9DF` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#BDA78F` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#AF765D` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#B89C81` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#1F1D19` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#C58E6A` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#F2E8DC` | `static_value` |

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
2. **Images & SVGs:** Create an asset folder named `STRATA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `strata.webp` (image/webp) — https://www.openlanding.page/gallery/strata.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/strata/preview-1600.webp (Template media asset)
- `strata-01-hero-vessel.png` (image/png) — https://www.openlanding.page/templates/strata/strata-01-hero-vessel.png (Template media asset)
- `strata-01-hero-vessel.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-01-hero-vessel.webp (Template media asset)
- `strata-02-ceramic-macro.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-02-ceramic-macro.webp (Template media asset)
- `strata-03-vessel-reference.png` (image/png) — https://www.openlanding.page/templates/strata/strata-03-vessel-reference.png (Template media asset)
- `strata-04-craft-process.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-04-craft-process.webp (Template media asset)
- `strata-05-interior.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-05-interior.webp (Template media asset)
- `strata-06-material-variants.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-06-material-variants.webp (Template media asset)
- `strata-07-closing-still-life.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-07-closing-still-life.webp (Template media asset)
- `strata-finish-01.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-finish-01.webp (Template media asset)
- `strata-finish-02.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-finish-02.webp (Template media asset)
- `strata-finish-03.webp` (image/webp) — https://www.openlanding.page/templates/strata/strata-finish-03.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Hero (Centered Gallery Composition)** (`section-1`, mode: `native-whtml`): Distinct vertical hierarchy featuring collection identifier `CONTEMPORARY CERAMICS / COLLECTION 001`, fully readable headline `FORMED BY EARTH.` in upper 17–28%, centered ceramic vessel (55–65svh) with warm spotlight bloom and atmospheric concentric rings, and lower italic subtitle *Defined by time.* Breathing scroll indicator and collection metadata.
2. **Manifesto** (`section-2`, mode: `native-whtml`): Editorial statement on architectural permanence and considered living.
3. **Macro Immersion** (`section-3`, mode: `native-whtml`): Scroll-driven circular zoom into raw clay mineral grain and surface texture.
4. **Object Anatomy** (`section-4`, mode: `native-whtml`): Dimensional specifications, batch numbers, firing temperatures, and silhouette study.
5. **Craft Journey** (`section-5`, mode: `native-whtml`): Step-by-step kiln, wheel, and hand-finishing processes with atmospheric background imagery.
6. **Interior Living** (`section-6`, mode: `native-whtml`): Architectural placement and interior scale exploration.
7. **Collection Switcher** (`section-7`, mode: `native-whtml`): Interactive finish selector (Limestone, Volcanic, Terracotta) updating vessel imagery, background tint, and technical notes in real time.
8. **Consultation Dialog** (`section-8`, mode: `native-whtml`): Accessible modal dialog for private commissions with client-side form validation.
9. **Colophon Footer** (`section-9`, mode: `native-whtml`): Massive sculptural wordmark, studio directory links, and legal colophon.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- No external JS runtime blocks required; all layout and styling fit inside native Webflow styles.
