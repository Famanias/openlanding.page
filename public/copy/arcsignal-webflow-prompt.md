# Webflow MCP Import Prompt: Arc & Signal (arcsignal)

Import the **Arc & Signal** (Enterprise AI & Infrastructure) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/arcsignal
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/arcsignal-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/arcsignal.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "arcsignal" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "arcsignal", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/arcsignal-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Arc & Signal Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg` | `--bg` | `#0C0F1B` | `static_value` |
| `Color / Bg Abyss` | `--bg-abyss` | `#080b16` | `static_value` |
| `Color / Bg Deep` | `--bg-deep` | `#0c1020` | `static_value` |
| `Color / Bg Elevated` | `--bg-elevated` | `#10172a` | `static_value` |
| `Color / Bg Violet` | `--bg-violet` | `#8c72ff` | `static_value` |
| `Color / Bg Periwinkle` | `--bg-periwinkle` | `#5d6bff` | `static_value` |
| `Color / Bg Cyan Subtle` | `--bg-cyan-subtle` | `#7fb5d4` | `static_value` |
| `Color / Panel` | `--panel` | `#11172A` | `static_value` |
| `Color / Panel Raised` | `--panel-raised` | `#171D32` | `static_value` |
| `Color / White` | `--white` | `#F3F4FA` | `static_value` |
| `Color / Steel` | `--steel` | `#9DA7C7` | `static_value` |
| `Color / Muted` | `--muted` | `#9299B4` | `static_value` |
| `Color / Violet` | `--violet` | `#A58AFF` | `static_value` |
| `Color / Cobalt` | `--cobalt` | `#5367F9` | `static_value` |
| `Color / Line` | `--line` | `rgba(157, 167, 199, 0.18)` | `static_value` |
| `Color / Signal Core` | `--signal-core` | `#D4C9FF` | `static_value` |
| `Color / Signal Mid` | `--signal-mid` | `#977FFF` | `static_value` |
| `Color / Signal Edge` | `--signal-edge` | `#5367F9` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Outfit` | `--font-outfit` | `Outfit` | Google Font: `Outfit` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Arc & Signal` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `arcsignal.webp` (image/webp) — https://www.openlanding.page/gallery/arcsignal.webp (Gallery preview capture)
- `ambient-01-hero.png` (image/png) — https://www.openlanding.page/templates/arcsignal/ambient-01-hero.png (Template media asset)
- `ambient-02-capabilities.png` (image/png) — https://www.openlanding.page/templates/arcsignal/ambient-02-capabilities.png (Template media asset)
- `ambient-03-platform.png` (image/png) — https://www.openlanding.page/templates/arcsignal/ambient-03-platform.png (Template media asset)
- `ambient-04-reactor.png` (image/png) — https://www.openlanding.page/templates/arcsignal/ambient-04-reactor.png (Template media asset)
- `ambient-05-mobile.png` (image/png) — https://www.openlanding.page/templates/arcsignal/ambient-05-mobile.png (Template media asset)
- `arc-signal-01-hero.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/arc-signal-01-hero.jpg (Template media asset)
- `arc-signal-02-capabilities.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/arc-signal-02-capabilities.jpg (Template media asset)
- `arc-signal-03-platform.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/arc-signal-03-platform.jpg (Template media asset)
- `arc-signal-04-cta-footer.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/arc-signal-04-cta-footer.jpg (Template media asset)
- `arc-signal-mark.svg` (image/svg+xml) — https://www.openlanding.page/templates/arcsignal/arc-signal-mark.svg (Template media asset)
- `final-reactor.png` (image/png) — https://www.openlanding.page/templates/arcsignal/final-reactor.png (Template media asset)
- `final-stage06.png` (image/png) — https://www.openlanding.page/templates/arcsignal/final-stage06.png (Template media asset)
- `fresh-scene03.png` (image/png) — https://www.openlanding.page/templates/arcsignal/fresh-scene03.png (Template media asset)
- `hero-core-fallback.svg` (image/svg+xml) — https://www.openlanding.page/templates/arcsignal/hero-core-fallback.svg (Template media asset)
- `media_1793697452161_8861e84f.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793697452161_8861e84f.jpg (Template media asset)
- `media_1793697458929_6d651f3d.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793697458929_6d651f3d.jpg (Template media asset)
- `media_1793697461489_a7626cd9.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793697461489_a7626cd9.jpg (Template media asset)
- `media_1793697463057_609c7628.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793697463057_609c7628.jpg (Template media asset)
- `media_1793698354095_9f08d89d.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698354095_9f08d89d.jpg (Template media asset)
- `media_1793698357012_87c99930.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698357012_87c99930.jpg (Template media asset)
- `media_1793698360021_886c58ff.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698360021_886c58ff.jpg (Template media asset)
- `media_1793698362405_3d02b89e.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698362405_3d02b89e.jpg (Template media asset)
- `media_1793698682507_2c57eb90.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698682507_2c57eb90.jpg (Template media asset)
- `media_1793698686714_0d9a056b.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793698686714_0d9a056b.jpg (Template media asset)
- `media_1793699131498_02f49fc0.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793699131498_02f49fc0.jpg (Template media asset)
- `media_1793699131650_d859900d.png` (image/png) — https://www.openlanding.page/templates/arcsignal/media_1793699131650_d859900d.png (Template media asset)
- `media_1793699134257_86578865.png` (image/png) — https://www.openlanding.page/templates/arcsignal/media_1793699134257_86578865.png (Template media asset)
- `media_1793699135699_9314e857.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793699135699_9314e857.jpg (Template media asset)
- `media_1793699288257_c2e2f327.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793699288257_c2e2f327.jpg (Template media asset)
- `media_1793700976911_1aa43eea.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793700976911_1aa43eea.jpg (Template media asset)
- `media_1793701798243_b5fabf93.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793701798243_b5fabf93.jpg (Template media asset)
- `media_1793701842012_d3e30153.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793701842012_d3e30153.jpg (Template media asset)
- `media_1793701855503_897a7c4f.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793701855503_897a7c4f.jpg (Template media asset)
- `media_1793705776413_dc7ba697.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793705776413_dc7ba697.jpg (Template media asset)
- `media_1793705789875_4c2f5781.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793705789875_4c2f5781.jpg (Template media asset)
- `media_1793856038405_e25bf8dc.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856038405_e25bf8dc.jpg (Template media asset)
- `media_1793856043962_d5419750.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856043962_d5419750.jpg (Template media asset)
- `media_1793856044287_da1f2684.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856044287_da1f2684.jpg (Template media asset)
- `media_1793856052987_fa374fb0.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856052987_fa374fb0.jpg (Template media asset)
- `media_1793856328350_b2331c36.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856328350_b2331c36.jpg (Template media asset)
- `media_1793856328759_7d90dde4.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793856328759_7d90dde4.jpg (Template media asset)
- `media_1793856330943_01c2e0a3.png` (image/png) — https://www.openlanding.page/templates/arcsignal/media_1793856330943_01c2e0a3.png (Template media asset)
- `media_1793897704096_c924cfaa.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793897704096_c924cfaa.jpg (Template media asset)
- `media_1793897863475_c6e12855.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793897863475_c6e12855.jpg (Template media asset)
- `media_1793897864615_28380280.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793897864615_28380280.jpg (Template media asset)
- `media_1793897866265_6ec43bf4.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793897866265_6ec43bf4.jpg (Template media asset)
- `media_1793899140411_36bce402.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793899140411_36bce402.jpg (Template media asset)
- `media_1793899143621_216e09fd.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793899143621_216e09fd.jpg (Template media asset)
- `media_1793899145111_77875128.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793899145111_77875128.jpg (Template media asset)
- `media_1793899147288_e1f89eb3.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/media_1793899147288_e1f89eb3.jpg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/arcsignal/preview-1600.webp (Template media asset)
- `scene02-capabilities-desktop.png` (image/png) — https://www.openlanding.page/templates/arcsignal/scene02-capabilities-desktop.png (Template media asset)
- `scene03-platform-desktop.png` (image/png) — https://www.openlanding.page/templates/arcsignal/scene03-platform-desktop.png (Template media asset)
- `scene04-reactor-desktop.png` (image/png) — https://www.openlanding.page/templates/arcsignal/scene04-reactor-desktop.png (Template media asset)
- `signal-wave.svg` (image/svg+xml) — https://www.openlanding.page/templates/arcsignal/signal-wave.svg (Template media asset)
- `verified-platform-centered.png` (image/png) — https://www.openlanding.page/templates/arcsignal/verified-platform-centered.png (Template media asset)
- `image_4445da85.png` (image/png) — https://www.openlanding.page/templates/arcsignal/aistudio/image_4445da85.png (Template media asset)
- `image_6021a536.png` (image/png) — https://www.openlanding.page/templates/arcsignal/aistudio/image_6021a536.png (Template media asset)
- `image_7d4f43ba.png` (image/png) — https://www.openlanding.page/templates/arcsignal/aistudio/image_7d4f43ba.png (Template media asset)
- `image_d8941a19.png` (image/png) — https://www.openlanding.page/templates/arcsignal/aistudio/image_d8941a19.png (Template media asset)
- `image_e9ac556d.png` (image/png) — https://www.openlanding.page/templates/arcsignal/aistudio/image_e9ac556d.png (Template media asset)
- `arc-signal-01-hero.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/references/arc-signal-01-hero.jpg (Template media asset)
- `arc-signal-02-capabilities.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/references/arc-signal-02-capabilities.jpg (Template media asset)
- `arc-signal-03-platform.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/references/arc-signal-03-platform.jpg (Template media asset)
- `arc-signal-04-cta-footer.jpg` (image/jpeg) — https://www.openlanding.page/templates/arcsignal/references/arc-signal-04-cta-footer.jpg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Arc & Signal Scoped Styles** (`arcsignal-styles-1`, placement: `head`, 8883 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Arc & Signal Interactive Runtime Bridge** (`arcsignal-runtime-1`, placement: `footer`, 276 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
