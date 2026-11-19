# Webflow MCP Import Prompt: XIBALBA (xibalba)

Import the **XIBALBA** (Botanical Reserve & Ceremony) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/xibalba
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/xibalba-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/xibalba.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "xibalba" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "xibalba", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/xibalba-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`XIBALBA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Night` | `--night` | `#040A0E` | `static_value` |
| `Color / Obsidian` | `--obsidian` | `#071218` | `static_value` |
| `Color / Ink` | `--ink` | `#EEFAF6` | `static_value` |
| `Color / Soft` | `--soft` | `rgba(218, 242, 234, 0.78)` | `static_value` |
| `Color / Ember` | `--ember` | `#FFA33E` | `static_value` |
| `Color / Jade` | `--jade` | `#5FF2C8` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Oswald` | `--font-oswald` | `Oswald` | Google Font: `Oswald` |
| `Font / Inter` | `--font-inter` | `Inter` | Google Font: `Inter` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / ArtH` | `--artH` | `calc(100vw * 1520 / 2688)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `XIBALBA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `xibalba.webp` (image/webp) — https://www.openlanding.page/gallery/xibalba.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/preview-1600.webp (Template media asset)
- `preview-800.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/preview-800.webp (Template media asset)
- `scene-sprites-keyed.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/scene-sprites-keyed.webp (Template media asset)
- `scene-sprites.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene-sprites.png (Template media asset)
- `scene1.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene1.png (Template media asset)
- `scene2.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene2.png (Template media asset)
- `scene3.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene3.png (Template media asset)
- `scene4.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene4.png (Template media asset)
- `scene5.png` (image/png) — https://www.openlanding.page/templates/xibalba/scene5.png (Template media asset)
- `seam1-keyed.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/seam1-keyed.webp (Template media asset)
- `seam1.jpg` (image/jpeg) — https://www.openlanding.page/templates/xibalba/seam1.jpg (Template media asset)
- `seam1.png` (image/png) — https://www.openlanding.page/templates/xibalba/seam1.png (Template media asset)
- `seam2-keyed.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/seam2-keyed.webp (Template media asset)
- `seam2.jpg` (image/jpeg) — https://www.openlanding.page/templates/xibalba/seam2.jpg (Template media asset)
- `seam2.png` (image/png) — https://www.openlanding.page/templates/xibalba/seam2.png (Template media asset)
- `seam3-keyed.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/seam3-keyed.webp (Template media asset)
- `seam3.jpg` (image/jpeg) — https://www.openlanding.page/templates/xibalba/seam3.jpg (Template media asset)
- `seam3.png` (image/png) — https://www.openlanding.page/templates/xibalba/seam3.png (Template media asset)
- `seam4-keyed.webp` (image/webp) — https://www.openlanding.page/templates/xibalba/seam4-keyed.webp (Template media asset)
- `seam4.jpg` (image/jpeg) — https://www.openlanding.page/templates/xibalba/seam4.jpg (Template media asset)
- `seam4.png` (image/png) — https://www.openlanding.page/templates/xibalba/seam4.png (Template media asset)
- `scene-sprites_7a44e2a0.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene-sprites_7a44e2a0.png (Template media asset)
- `scene1_e2655e65.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene1_e2655e65.png (Template media asset)
- `scene2_82fd9e0a.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene2_82fd9e0a.png (Template media asset)
- `scene3_afea158f.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene3_afea158f.png (Template media asset)
- `scene4_76e2e55f.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene4_76e2e55f.png (Template media asset)
- `scene5_bdedce0b.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/scene5_bdedce0b.png (Template media asset)
- `seam1_e4123f92.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/seam1_e4123f92.png (Template media asset)
- `seam2_8be26b4e.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/seam2_8be26b4e.png (Template media asset)
- `seam3_67b3e1e1.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/seam3_67b3e1e1.png (Template media asset)
- `seam4_2b82c001.png` (image/png) — https://www.openlanding.page/templates/xibalba/assets/aistudio/seam4_2b82c001.png (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Copy and paste everything below into your AI coding agent. Every coordinate in this specification has been pixel-calibrated directly to your 10 generated artwork files (`scene1.png`–`scene5.png`, `seam1.jpg`–`seam4.jpg`, and `scene-sprites.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **XIBALBA Scoped Styles** (`xibalba-styles-1`, placement: `head`, 22261 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
