# Webflow MCP Import Prompt: GRANDSTAND (grandstand)

Import the **GRANDSTAND** (Theatre & live performance) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/grandstand
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/grandstand-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/grandstand.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "grandstand" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "grandstand", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/grandstand-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`GRANDSTAND Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Gs Wine` | `--color-gs-wine` | `#511C2F` | `static_value` |
| `Color / Gs Paper` | `--color-gs-paper` | `#F4E7D1` | `static_value` |
| `Color / Gs Red` | `--color-gs-red` | `#E45D3D` | `static_value` |
| `Color / Gs Teal` | `--color-gs-teal` | `#102F38` | `static_value` |
| `Color / Gs Lime` | `--color-gs-lime` | `#E7F584` | `static_value` |
| `Color / Gs Wine` | `--gs-wine` | `#511C2F` | `static_value` |
| `Color / Gs Paper` | `--gs-paper` | `#F4E7D1` | `static_value` |
| `Color / Gs Red` | `--gs-red` | `#E45D3D` | `static_value` |
| `Color / Gs Teal` | `--gs-teal` | `#102F38` | `static_value` |
| `Color / Gs Lime` | `--gs-lime` | `#E7F584` | `static_value` |
| `Color / Gs Red Paper` | `--gs-red-paper` | `color-mix(in srgb,var(--gs-red) 80%,var(--gs-paper))` | `custom_value` |
| `Color / Gs Red Ink` | `--gs-red-ink` | `color-mix(in srgb,var(--gs-red) 85%,var(--gs-wine))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Anton` | `--font-anton` | `Anton` | Google Font: `Anton` |
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `GRANDSTAND` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `grandstand.webp` (image/webp) — https://www.openlanding.page/gallery/grandstand.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a self-contained Next.js 16 / React 19 / TypeScript repertory-theatre landing page at `/templates/grandstand`. GRANDSTAND is fictional: every production, venue, date, seat, price and receipt is illustrative. No seat is reserved, no mo

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **GRANDSTAND Scoped Styles** (`grandstand-styles-1`, placement: `head`, 27297 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
