# Webflow MCP Import Prompt: MIZUNOWA (mizunowa)

Import the **MIZUNOWA** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/mizunowa
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/mizunowa-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/mizunowa.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "mizunowa" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "mizunowa", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/mizunowa-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`MIZUNOWA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Mnw Pond` | `--mnw-pond` | `#112C2A` | `static_value` |
| `Color / Mnw Paper` | `--mnw-paper` | `#F4EFE2` | `static_value` |
| `Color / Mnw Moss` | `--mnw-moss` | `#203D33` | `static_value` |
| `Color / Mnw Vermilion` | `--mnw-vermilion` | `#9E3F32` | `static_value` |
| `Color / Mnw Sakura` | `--mnw-sakura` | `#C7A6A2` | `static_value` |
| `Color / Mnw Stone` | `--mnw-stone` | `#D6C7A9` | `static_value` |
| `Color / Mnw Leaf` | `--mnw-leaf` | `#526E58` | `static_value` |
| `Color / Mnw Ink` | `--mnw-ink` | `#1E2320` | `static_value` |
| `Color / Mnw Porcelain` | `--mnw-porcelain` | `#FDFBF5` | `static_value` |
| `Color / Mnw Gold` | `--mnw-gold` | `#CB9462` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |
| `Font / Newsreader` | `--font-newsreader` | `Newsreader` | Google Font: `Newsreader` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Mnw Max Width` | `--mnw-max-width` | `1600px` | `static_value` |
| `Size / Mnw Gutter` | `--mnw-gutter` | `24px` | `static_value` |
| `Size / Mnw Margin` | `--mnw-margin` | `48px` | `static_value` |
| `Size / Mnw Shore H` | `--mnw-shore-h` | `clamp(48px, 6.6vw, 96px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `MIZUNOWA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `mizunowa.webp` (image/webp) — https://www.openlanding.page/gallery/mizunowa.webp (Gallery preview capture)
- `garden-map.svg` (image/svg+xml) — https://www.openlanding.page/templates/mizunowa/garden-map.svg (Template media asset)
- `hero-pond.webp` (image/webp) — https://www.openlanding.page/templates/mizunowa/hero-pond.webp (Template media asset)
- `pond-poster.svg` (image/svg+xml) — https://www.openlanding.page/templates/mizunowa/pond-poster.svg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/mizunowa/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **MIZUNOWA Scoped Styles (Part 1/2)** (`mizunowa-styles-1`, placement: `head`, 44982 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **MIZUNOWA Scoped Styles (Part 2/2)** (`mizunowa-styles-2`, placement: `head`, 14003 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **MIZUNOWA Interactive Runtime Bridge** (`mizunowa-runtime-1`, placement: `footer`, 272 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
