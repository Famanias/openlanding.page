# Webflow MCP Import Prompt: AUREL (aurel)

Import the **AUREL** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/aurel
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/aurel-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/aurel.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "aurel" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "aurel", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/aurel-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AUREL Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg` | `--bg` | `#0A0B0D` | `static_value` |
| `Color / Bg Soft` | `--bg-soft` | `#111317` | `static_value` |
| `Color / Metal Dark` | `--metal-dark` | `#23272B` | `static_value` |
| `Color / Ivory` | `--ivory` | `#F0ECE5` | `static_value` |
| `Color / Silver` | `--silver` | `#C7CDD2` | `static_value` |
| `Color / Muted` | `--muted` | `#89919A` | `static_value` |
| `Color / Ice` | `--ice` | `#9DB8C9` | `static_value` |
| `Color / Rule` | `--rule` | `#374047` | `static_value` |
| `Color / Button Light` | `--button-light` | `#F1EEE9` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |
| `Font / Sans` | `--font-sans` | `Manrope` | Google Font: `Manrope` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Fallback: `monospace` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `clamp(20px, 4.6vw, 84px)` | `custom_value` |
| `Size / Max Content` | `--max-content` | `1600px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AUREL` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `aurel.webp` (image/webp) — https://www.openlanding.page/gallery/aurel.webp (Gallery preview capture)
- `aurel-atelier.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-atelier.webp (Template media asset)
- `aurel-case-side.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-case-side.webp (Template media asset)
- `aurel-caseback.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-caseback.webp (Template media asset)
- `aurel-dial-macro.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-dial-macro.webp (Template media asset)
- `aurel-hero-reference.png` (image/png) — https://www.openlanding.page/templates/aurel/aurel-hero-reference.png (Template media asset)
- `aurel-hero-watch.png` (image/png) — https://www.openlanding.page/templates/aurel/aurel-hero-watch.png (Template media asset)
- `aurel-movement-exploded.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-movement-exploded.webp (Template media asset)
- `aurel-still-life.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aurel-still-life.webp (Template media asset)
- `media_1793742670245_3c664fe8.png` (image/png) — https://www.openlanding.page/templates/aurel/media_1793742670245_3c664fe8.png (Template media asset)
- `media_1793742725310_134b550f.png` (image/png) — https://www.openlanding.page/templates/aurel/media_1793742725310_134b550f.png (Template media asset)
- `media_1793742781241_b8720c27.png` (image/png) — https://www.openlanding.page/templates/aurel/media_1793742781241_b8720c27.png (Template media asset)
- `media_1793742903182_8e1cad45.png` (image/png) — https://www.openlanding.page/templates/aurel/media_1793742903182_8e1cad45.png (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/aurel/preview-1600.webp (Template media asset)
- `r1-desktop-anatomy.png` (image/png) — https://www.openlanding.page/templates/aurel/r1-desktop-anatomy.png (Template media asset)
- `r1-desktop-gallery.png` (image/png) — https://www.openlanding.page/templates/aurel/r1-desktop-gallery.png (Template media asset)
- `r1-desktop-hero.png` (image/png) — https://www.openlanding.page/templates/aurel/r1-desktop-hero.png (Template media asset)
- `r1-mobile-hero.png` (image/png) — https://www.openlanding.page/templates/aurel/r1-mobile-hero.png (Template media asset)
- `r2-desktop-atelier.png` (image/png) — https://www.openlanding.page/templates/aurel/r2-desktop-atelier.png (Template media asset)
- `r2-desktop-hero.png` (image/png) — https://www.openlanding.page/templates/aurel/r2-desktop-hero.png (Template media asset)
- `r2-desktop-modal.png` (image/png) — https://www.openlanding.page/templates/aurel/r2-desktop-modal.png (Template media asset)
- `r2-mobile-hero.png` (image/png) — https://www.openlanding.page/templates/aurel/r2-mobile-hero.png (Template media asset)
- `aurel-atelier_117be258.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-atelier_117be258.webp (Template media asset)
- `aurel-case-side_5722c033.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-case-side_5722c033.webp (Template media asset)
- `aurel-caseback_8d5c58c4.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-caseback_8d5c58c4.webp (Template media asset)
- `aurel-dial-macro_861890a8.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-dial-macro_861890a8.webp (Template media asset)
- `aurel-hero-section_7a818242.png` (image/png) — https://www.openlanding.page/templates/aurel/aistudio/aurel-hero-section_7a818242.png (Template media asset)
- `aurel-hero-watch_8043a270.png` (image/png) — https://www.openlanding.page/templates/aurel/aistudio/aurel-hero-watch_8043a270.png (Template media asset)
- `aurel-movement-exploded_05e1b0e9.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-movement-exploded_05e1b0e9.webp (Template media asset)
- `aurel-still-life_c3a911be.webp` (image/webp) — https://www.openlanding.page/templates/aurel/aistudio/aurel-still-life_c3a911be.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AUREL Scoped Styles** (`aurel-styles-1`, placement: `head`, 2160 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AUREL Interactive Runtime Bridge** (`aurel-runtime-1`, placement: `footer`, 269 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
