# Webflow MCP Import Prompt: LOAM (loam)

Import the **LOAM** (Biomaterials & Sustainable Packaging) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/loam
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/loam-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/loam.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "loam" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "loam", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/loam-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`LOAM Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Loam` | `--color-loam` | `#080604` | `static_value` |
| `Color / Spore` | `--color-spore` | `#f0e8d8` | `static_value` |
| `Color / Cap` | `--color-cap` | `#7a5c43` | `static_value` |
| `Color / Foxfire` | `--color-foxfire` | `#c8e64c` | `static_value` |
| `Color / Page Bg` | `--page-bg` | `#080604` | `static_value` |
| `Color / Sky Ambient` | `--sky-ambient` | `rgba(247, 231, 206, 0.153)` | `static_value` |
| `Color / Text Contrast` | `--text-contrast` | `#f6efe3` | `static_value` |
| `Color / Sun Accent` | `--sun-accent` | `#f7e7ce` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#18120C` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#1C1712` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#2C251D` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#33261B` | `static_value` |
| `Color / Palette 11` | `--color-palette-11` | `#3A4F22` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#3B4F04` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#42382C` | `static_value` |
| `Color / Palette 14` | `--color-palette-14` | `#4A4035` | `static_value` |
| `Color / Palette 15` | `--color-palette-15` | `#4E3522` | `static_value` |
| `Color / Palette 16` | `--color-palette-16` | `#5B7809` | `static_value` |
| `Color / Palette 17` | `--color-palette-17` | `#5C3314` | `static_value` |
| `Color / Palette 18` | `--color-palette-18` | `#63452D` | `static_value` |
| `Color / Palette 19` | `--color-palette-19` | `#6E8F11` | `static_value` |
| `Color / Palette 20` | `--color-palette-20` | `#73533A` | `static_value` |
| `Color / Palette 21` | `--color-palette-21` | `#7A5B42` | `static_value` |
| `Color / Palette 22` | `--color-palette-22` | `#84AB14` | `static_value` |
| `Color / Palette 23` | `--color-palette-23` | `#8A5229` | `static_value` |
| `Color / Palette 24` | `--color-palette-24` | `#D2C3AE` | `static_value` |
| `Color / Palette 25` | `--color-palette-25` | `#D8CBB8` | `static_value` |
| `Color / Palette 26` | `--color-palette-26` | `#E2D6C3` | `static_value` |
| `Color / Palette 27` | `--color-palette-27` | `#E4F882` | `static_value` |
| `Color / Palette 28` | `--color-palette-28` | `#E5886E` | `static_value` |
| `Color / Palette 29` | `--color-palette-29` | `#F4F8FB` | `static_value` |
| `Color / Palette 30` | `--color-palette-30` | `#FF9B54` | `static_value` |
| `Color / Palette 31` | `--color-palette-31` | `#FFFFFF` | `static_value` |
| `Color / Palette 32` | `--color-palette-32` | `#FF8A3D` | `static_value` |
| `Color / Palette 33` | `--color-palette-33` | `#FFA751` | `static_value` |
| `Color / Palette 34` | `--color-palette-34` | `#060507` | `static_value` |
| `Color / Palette 35` | `--color-palette-35` | `#0C0805` | `static_value` |
| `Color / Palette 36` | `--color-palette-36` | `#161B14` | `static_value` |
| `Color / Palette 37` | `--color-palette-37` | `#8EB2E6` | `static_value` |
| `Color / Palette 38` | `--color-palette-38` | `#FFBE6B` | `static_value` |
| `Color / Palette 39` | `--color-palette-39` | `#F7FAF5` | `static_value` |
| `Color / Palette 40` | `--color-palette-40` | `#131B28` | `static_value` |
| `Color / Palette 41` | `--color-palette-41` | `#2A1F13` | `static_value` |
| `Color / Palette 42` | `--color-palette-42` | `#3E4B37` | `static_value` |
| `Color / Palette 43` | `--color-palette-43` | `#4A361D` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Serif` | `--font-serif` | `var(--font-serif` | Fallback: `EB Garamond, Georgia, serif)` |
| `Font / Sans` | `--font-sans` | `var(--font-sans` | Fallback: `Host Grotesk, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Mono` | `--font-mono` | `var(--font-mono` | Fallback: `Sono, ui-monospace, SFMono-Regular, monospace)` |
| `Font / EB Garamond` | `--font-eb-garamond` | `EB Garamond` | Google Font: `EB Garamond` |
| `Font / Host Grotesk` | `--font-host-grotesk` | `Host Grotesk` | Google Font: `Host Grotesk` |
| `Font / Sono` | `--font-sono` | `Sono` | Google Font: `Sono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `LOAM` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `loam.webp` (image/webp) — https://www.openlanding.page/gallery/loam.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/loam/preview-1600.webp (Template media asset)
- `material-top.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/material-top.webp (Template media asset)
- `material-underside-and-cut-edge.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/material-underside-and-cut-edge.webp (Template media asset)
- `mushroom-from-above.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mushroom-from-above.webp (Template media asset)
- `mushroom-from-below.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mushroom-from-below.webp (Template media asset)
- `mushroom-front.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mushroom-front.webp (Template media asset)
- `mushroom-side.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mushroom-side.webp (Template media asset)
- `mycelium-clump-back.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mycelium-clump-back.webp (Template media asset)
- `mycelium-clump-front.webp` (image/webp) — https://www.openlanding.page/templates/loam/references/mycelium-clump-front.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **The fruit (hook)** (`section-1`, mode: `native-whtml`): One parasol mushroom (*Macrolepiota procera*) on dark, mossy forest floor in macro framing with drifting spore motes. "What you see is the smallest part." (Inspectable: mushroom).
2. **Under the cap (insight)** (`section-2`, mode: `native-whtml`): Camera tilts up beneath the gills; spores fall past the lens. "A mushroom is only the fruit. The organism lives underground."
3. **Breaking ground (transition)** (`section-3`, mode: `native-whtml`): Ant-farm soil cross-section descent through leaf litter, humus, topsoil with thick tree roots, into subsoil clay.
4. **The network (signature)** (`section-4`, mode: `native-whtml`): - **4a (close clump):** Close on a fist-sized mycelium clump binding soil and bark. (Inspectable: clump).
5. **The material (product)** (`section-5`, mode: `native-whtml`): Subterranean threads converge and resolve into LOAM's molded packaging tray. Studio lighting lifts; supporting product forms slide into view; 3-step lifecycle strip ("Grown in 7 days", "Protects in transit", "Composts back to soil"). (Inspectable: tray with broken corner).
6. **Return (conversion)** (`section-6`, mode: `native-whtml`): Camera ascends back through the soil to the surface; a ring of newly fruited mushrooms surrounds the first. Request a sample kit form with local validation and animated sprouting mushroom success.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **LOAM Scoped Styles** (`loam-styles-1`, placement: `head`, 3674 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **LOAM Interactive Runtime Bridge** (`loam-runtime-1`, placement: `footer`, 494 / 45000 chars): Loads three, gsap, lenis in page footer custom code with prefers-reduced-motion guard.
