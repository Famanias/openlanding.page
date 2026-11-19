# Webflow MCP Import Prompt: ZENO. (zeno)

Import the **ZENO.** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/zeno
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/zeno-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/zeno.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "zeno" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "zeno", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/zeno-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ZENO. Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg` | `--bg` | `#111117` | `static_value` |
| `Color / Bg Soft` | `--bg-soft` | `#17171e` | `static_value` |
| `Color / Ivory` | `--ivory` | `#F2F0EB` | `static_value` |
| `Color / Violet` | `--violet` | `#A58AFF` | `static_value` |
| `Color / Cobalt` | `--cobalt` | `#5367F9` | `static_value` |
| `Color / Lilac` | `--lilac` | `#D8CFF2` | `static_value` |
| `Color / Muted` | `--muted` | `#96939F` | `static_value` |
| `Color / Line` | `--line` | `rgba(242, 240, 235, 0.20)` | `static_value` |
| `Color / Line Strong` | `--line-strong` | `rgba(242, 240, 235, 0.38)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |
| `Font / Sans` | `--font-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Bodoni Moda` | `--font-bodoni-moda` | `Bodoni Moda` | Google Font: `Bodoni Moda` |
| `Font / Playfair Display` | `--font-playfair-display` | `Playfair Display` | Google Font: `Playfair Display` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Section Pad X` | `--section-pad-x` | `clamp(22px, 3vw, 58px)` | `custom_value` |
| `Size / Header H` | `--header-h` | `clamp(68px, 7vw, 104px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ZENO.` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `zeno.webp` (image/webp) — https://www.openlanding.page/gallery/zeno.webp (Gallery preview capture)
- `auren-world.png` (image/png) — https://www.openlanding.page/templates/zeno/auren-world.png (Template media asset)
- `auren-world.webp` (image/webp) — https://www.openlanding.page/templates/zeno/auren-world.webp (Template media asset)
- `campaign-print.png` (image/png) — https://www.openlanding.page/templates/zeno/campaign-print.png (Template media asset)
- `campaign-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/campaign-print.webp (Template media asset)
- `cta-ring.png` (image/png) — https://www.openlanding.page/templates/zeno/cta-ring.png (Template media asset)
- `cta-ring.webp` (image/webp) — https://www.openlanding.page/templates/zeno/cta-ring.webp (Template media asset)
- `digital-print.png` (image/png) — https://www.openlanding.page/templates/zeno/digital-print.png (Template media asset)
- `digital-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/digital-print.webp (Template media asset)
- `hero-collage.png` (image/png) — https://www.openlanding.page/templates/zeno/hero-collage.png (Template media asset)
- `hero-collage.webp` (image/webp) — https://www.openlanding.page/templates/zeno/hero-collage.webp (Template media asset)
- `identity-print.png` (image/png) — https://www.openlanding.page/templates/zeno/identity-print.png (Template media asset)
- `identity-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/identity-print.webp (Template media asset)
- `media_1793692736536_faa4a568.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793692736536_faa4a568.jpg (Template media asset)
- `media_1793692741870_9995cbe0.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793692741870_9995cbe0.jpg (Template media asset)
- `media_1793692744032_8dd53415.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793692744032_8dd53415.jpg (Template media asset)
- `media_1793692746817_774444fa.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793692746817_774444fa.jpg (Template media asset)
- `media_1793692806198_7bae21fb.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692806198_7bae21fb.webp (Template media asset)
- `media_1793692808207_e964e35f.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692808207_e964e35f.webp (Template media asset)
- `media_1793692808891_68a2a0b0.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692808891_68a2a0b0.webp (Template media asset)
- `media_1793692822562_3f742711.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692822562_3f742711.webp (Template media asset)
- `media_1793692842513_9f7848c9.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692842513_9f7848c9.webp (Template media asset)
- `media_1793692844916_f5a7ba41.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692844916_f5a7ba41.webp (Template media asset)
- `media_1793692847344_7e383ab8.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793692847344_7e383ab8.webp (Template media asset)
- `media_1793693681895_3781ffd2.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793693681895_3781ffd2.jpg (Template media asset)
- `media_1793693685732_e1b563bc.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793693685732_e1b563bc.jpg (Template media asset)
- `media_1793693689555_eb14afb9.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793693689555_eb14afb9.jpg (Template media asset)
- `media_1793693692882_0388506f.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793693692882_0388506f.jpg (Template media asset)
- `media_1793694070858_248d4572.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793694070858_248d4572.jpg (Template media asset)
- `media_1793694094703_caa55c5c.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793694094703_caa55c5c.jpg (Template media asset)
- `media_1793694104020_fc13c804.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793694104020_fc13c804.jpg (Template media asset)
- `media_1793696104241_41d1be5b.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696104241_41d1be5b.jpg (Template media asset)
- `media_1793696108516_7e108d14.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696108516_7e108d14.jpg (Template media asset)
- `media_1793696111923_27067d73.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696111923_27067d73.jpg (Template media asset)
- `media_1793696115266_dc0ea12e.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696115266_dc0ea12e.jpg (Template media asset)
- `media_1793696388052_64af15b7.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696388052_64af15b7.jpg (Template media asset)
- `media_1793696390115_6d3c94c1.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793696390115_6d3c94c1.jpg (Template media asset)
- `media_1793698311501_c22f0b2b.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698311501_c22f0b2b.jpg (Template media asset)
- `media_1793698314402_62528b40.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698314402_62528b40.jpg (Template media asset)
- `media_1793698317408_76d037b9.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698317408_76d037b9.jpg (Template media asset)
- `media_1793698401291_eddb893d.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698401291_eddb893d.jpg (Template media asset)
- `media_1793698403383_68c4aaa1.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698403383_68c4aaa1.jpg (Template media asset)
- `media_1793698526601_2138b5cd.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698526601_2138b5cd.jpg (Template media asset)
- `media_1793698534023_438244e2.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698534023_438244e2.jpg (Template media asset)
- `media_1793698535520_5ebd116b.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698535520_5ebd116b.jpg (Template media asset)
- `media_1793698689526_e72365b5.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698689526_e72365b5.jpg (Template media asset)
- `media_1793698694491_ee31bdfe.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793698694491_ee31bdfe.jpg (Template media asset)
- `media_1793703243518_32e2898d.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703243518_32e2898d.webp (Template media asset)
- `media_1793703243721_833a9f2e.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703243721_833a9f2e.webp (Template media asset)
- `media_1793703244232_0ad36bba.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703244232_0ad36bba.webp (Template media asset)
- `media_1793703245036_4e45632d.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703245036_4e45632d.webp (Template media asset)
- `media_1793703268938_9eb639fa.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703268938_9eb639fa.webp (Template media asset)
- `media_1793703270339_eda3d8bf.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703270339_eda3d8bf.webp (Template media asset)
- `media_1793703272785_31e28966.webp` (image/webp) — https://www.openlanding.page/templates/zeno/media_1793703272785_31e28966.webp (Template media asset)
- `media_1793703661039_514d6738.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703661039_514d6738.png (Template media asset)
- `media_1793703661475_0d679ec3.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703661475_0d679ec3.png (Template media asset)
- `media_1793703663363_270ca0ca.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703663363_270ca0ca.png (Template media asset)
- `media_1793703664169_adae0704.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703664169_adae0704.png (Template media asset)
- `media_1793703718176_072e204a.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703718176_072e204a.png (Template media asset)
- `media_1793703719364_9d98e88d.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703719364_9d98e88d.png (Template media asset)
- `media_1793703723646_628824dc.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703723646_628824dc.png (Template media asset)
- `media_1793703723861_ea74a50d.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703723861_ea74a50d.png (Template media asset)
- `media_1793703872809_df6d1da8.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703872809_df6d1da8.png (Template media asset)
- `media_1793703874706_09b384e1.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703874706_09b384e1.png (Template media asset)
- `media_1793703876385_355de175.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703876385_355de175.png (Template media asset)
- `media_1793703878367_4bad5a12.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793703878367_4bad5a12.png (Template media asset)
- `media_1793704378679_a7f4f04d.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704378679_a7f4f04d.jpg (Template media asset)
- `media_1793704380449_8e0cfe5a.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704380449_8e0cfe5a.jpg (Template media asset)
- `media_1793704383876_16714455.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704383876_16714455.jpg (Template media asset)
- `media_1793704384627_9e799453.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704384627_9e799453.jpg (Template media asset)
- `media_1793704386469_141e5465.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704386469_141e5465.jpg (Template media asset)
- `media_1793704599045_92c0fb53.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704599045_92c0fb53.jpg (Template media asset)
- `media_1793704601003_01441b8f.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704601003_01441b8f.jpg (Template media asset)
- `media_1793704602478_8b8bc6e8.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793704602478_8b8bc6e8.jpg (Template media asset)
- `media_1793705474834_ad42ee0d.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793705474834_ad42ee0d.jpg (Template media asset)
- `media_1793705544728_86f41e14.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793705544728_86f41e14.jpg (Template media asset)
- `media_1793705546892_ee8b564a.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793705546892_ee8b564a.jpg (Template media asset)
- `media_1793706316247_0193c17f.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793706316247_0193c17f.png (Template media asset)
- `media_1793706506335_be7bc52a.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793706506335_be7bc52a.png (Template media asset)
- `media_1793706594412_22afca84.png` (image/png) — https://www.openlanding.page/templates/zeno/media_1793706594412_22afca84.png (Template media asset)
- `media_1793706709598_b3482dae.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/media_1793706709598_b3482dae.jpg (Template media asset)
- `morrow-world.png` (image/png) — https://www.openlanding.page/templates/zeno/morrow-world.png (Template media asset)
- `morrow-world.webp` (image/webp) — https://www.openlanding.page/templates/zeno/morrow-world.webp (Template media asset)
- `paradox-favicon.svg` (image/svg+xml) — https://www.openlanding.page/templates/zeno/paradox-favicon.svg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/zeno/preview-1600.webp (Template media asset)
- `strategy-print.png` (image/png) — https://www.openlanding.page/templates/zeno/strategy-print.png (Template media asset)
- `strategy-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/strategy-print.webp (Template media asset)
- `image_20f3d984.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_20f3d984.png (Template media asset)
- `image_3e330ed4.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_3e330ed4.png (Template media asset)
- `image_3f56723c.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_3f56723c.png (Template media asset)
- `image_dc8eac79.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_dc8eac79.png (Template media asset)
- `image_e834aa19.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_e834aa19.png (Template media asset)
- `image_f8840bc1.png` (image/png) — https://www.openlanding.page/templates/zeno/aistudio/image_f8840bc1.png (Template media asset)
- `auren-world.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/auren-world.webp (Template media asset)
- `campaign-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/campaign-print.webp (Template media asset)
- `digital-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/digital-print.webp (Template media asset)
- `hero-collage.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/hero-collage.webp (Template media asset)
- `identity-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/identity-print.webp (Template media asset)
- `morrow-world.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/morrow-world.webp (Template media asset)
- `strategy-print.webp` (image/webp) — https://www.openlanding.page/templates/zeno/crops/strategy-print.webp (Template media asset)
- `zeno-contact-reference.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/reference/zeno-contact-reference.jpg (Template media asset)
- `zeno-expertise-reference.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/reference/zeno-expertise-reference.jpg (Template media asset)
- `zeno-hero-reference.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/reference/zeno-hero-reference.jpg (Template media asset)
- `zeno-work-reference.jpg` (image/jpeg) — https://www.openlanding.page/templates/zeno/reference/zeno-work-reference.jpg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ZENO. Scoped Styles** (`zeno-styles-1`, placement: `head`, 3715 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **ZENO. Interactive Runtime Bridge** (`zeno-runtime-1`, placement: `footer`, 269 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
