# Webflow MCP Import Prompt: Pitchlane (pitchlane)

Import the **Pitchlane** (AI & Presentation Design) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/pitchlane
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/pitchlane-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/pitchlane.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "pitchlane" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "pitchlane", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/pitchlane-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Pitchlane Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#F7F8FF` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#17182B` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#687085` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#F8F9FF` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#7654DF` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#E6DFFB` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#FF716C` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#61BBFA` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#7A66E9` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#DDD3FF` | `static_value` |

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
2. **Images & SVGs:** Create an asset folder named `Pitchlane` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `pitchlane.webp` (image/webp) — https://www.openlanding.page/gallery/pitchlane.webp (Gallery preview capture)
- `accent-ribbon-transparent.png` (image/png) — https://www.openlanding.page/templates/pitchlane/accent-ribbon-transparent.png (Template media asset)
- `cover-clear-structure.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/cover-clear-structure.webp (Template media asset)
- `cover-fresh-perspective.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/cover-fresh-perspective.webp (Template media asset)
- `cover-iridescent-forms.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/cover-iridescent-forms.webp (Template media asset)
- `cover-momentum.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/cover-momentum.webp (Template media asset)
- `cover-night-shift.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/cover-night-shift.webp (Template media asset)
- `Creating_presentation_platform_h…_12a47ad9_2K.jpg` (image/jpeg) — https://www.openlanding.page/templates/pitchlane/Creating_presentation_platform_h…_12a47ad9_2K.jpg (Template media asset)
- `photo-architectural-geometry.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/photo-architectural-geometry.webp (Template media asset)
- `photo-design-studio.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/photo-design-studio.webp (Template media asset)
- `photo-sculptural-product.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/photo-sculptural-product.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/pitchlane/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Hero** (`section-1`, mode: `native-whtml`): High-impact value proposition *"Present ideas that actually land"*, call-to-action buttons, and an interactive slide preview deck.
2. **Slide Deck Showcase** (`section-2`, mode: `native-whtml`): Interactive carousel of modern presentation templates (Architectural Geometry, Iridescent Forms, Clear Structure, Momentum, Fresh Perspective, Design Studio).
3. **Workflow & Features** (`section-3`, mode: `native-whtml`): Intelligent slide layout, kinetic narrative structuring, real-time styling, and team collaboration tooling.
4. **Interactive Studio Demonstration** (`section-4`, mode: `native-whtml`): Tabbed interface demonstrating prompt-to-deck transformation, slide editing, and export workflows.
5. **Social Proof & Testimonials** (`section-5`, mode: `native-whtml`): Customer stories and quantitative performance metrics.
6. **Pricing & Sign-up** (`section-6`, mode: `native-whtml`): Transparent tier comparison and newsletter/trial signup form with client-side validation.
7. **Footer** (`section-7`, mode: `native-whtml`): Comprehensive site navigation links, social handles, and copyright information.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- No external JS runtime blocks required; all layout and styling fit inside native Webflow styles.
