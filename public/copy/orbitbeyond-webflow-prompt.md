# Webflow MCP Import Prompt: ORBIT & BEYOND (orbitbeyond)

Import the **ORBIT & BEYOND** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/orbitbeyond
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/orbitbeyond-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/orbitbeyond.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "orbitbeyond" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "orbitbeyond", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/orbitbeyond-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ORBIT & BEYOND Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg Deep Space` | `--bg-deep-space` | `#030812` | `static_value` |
| `Color / Bg Midnight Navy` | `--bg-midnight-navy` | `#091525` | `static_value` |
| `Color / Bg Lunar Shadow` | `--bg-lunar-shadow` | `#1E2A36` | `static_value` |
| `Color / Text Regolith Silver` | `--text-regolith-silver` | `#AAB7C4` | `static_value` |
| `Color / Text Frost White` | `--text-frost-white` | `#EDF6FD` | `static_value` |
| `Color / Accent Earth Cyan` | `--accent-earth-cyan` | `#8DE9FF` | `static_value` |
| `Color / Accent Mission Blue` | `--accent-mission-blue` | `#178CFA` | `static_value` |
| `Color / Accent Habitat Warmth` | `--accent-habitat-warmth` | `#F6C98C` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Sans` | `--font-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / Serif` | `--font-serif` | `Instrument Serif` | Google Font: `Instrument Serif` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Fallback: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ORBIT & BEYOND` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `orbitbeyond.webp` (image/webp) — https://www.openlanding.page/gallery/orbitbeyond.webp (Gallery preview capture)
- `01-hero-lunar-clean.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/01-hero-lunar-clean.webp (Template media asset)
- `02-hero-lunar-loop.mp4` (video/mp4) — https://www.openlanding.page/templates/orbitbeyond/02-hero-lunar-loop.mp4 (Template media asset)
- `03-orbital-transit.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/03-orbital-transit.webp (Template media asset)
- `04-habitat-interior.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/04-habitat-interior.webp (Template media asset)
- `05-lunar-rover-excursion.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/05-lunar-rover-excursion.webp (Template media asset)
- `06-final-earthrise.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/06-final-earthrise.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/preview-1600.webp (Template media asset)
- `r1-desktop-habitat.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r1-desktop-habitat.png (Template media asset)
- `r1-desktop-hero.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r1-desktop-hero.png (Template media asset)
- `r1-desktop-mission-dialog.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r1-desktop-mission-dialog.png (Template media asset)
- `r2-desktop-footer.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r2-desktop-footer.png (Template media asset)
- `r2-desktop-habitat.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r2-desktop-habitat.png (Template media asset)
- `r2-desktop-mission-dialog.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r2-desktop-mission-dialog.png (Template media asset)
- `r2-mobile-hero.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r2-mobile-hero.png (Template media asset)
- `r3-distilled-configurator.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r3-distilled-configurator.png (Template media asset)
- `r3-distilled-departure.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r3-distilled-departure.png (Template media asset)
- `r3-distilled-hero.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r3-distilled-hero.png (Template media asset)
- `r3-distilled-itinerary.png` (image/png) — https://www.openlanding.page/templates/orbitbeyond/r3-distilled-itinerary.png (Template media asset)
- `01-hero-lunar-clean_aa0f5b13.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/aistudio/01-hero-lunar-clean_aa0f5b13.webp (Template media asset)
- `02-hero-lunar-loop_02ea134e.mp4` (video/mp4) — https://www.openlanding.page/templates/orbitbeyond/aistudio/02-hero-lunar-loop_02ea134e.mp4 (Template media asset)
- `03-orbital-transit_3879d1c7.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/aistudio/03-orbital-transit_3879d1c7.webp (Template media asset)
- `04-habitat-interior_d26fa52a.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/aistudio/04-habitat-interior_d26fa52a.webp (Template media asset)
- `05-lunar-rover-excursion_c3aea05b.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/aistudio/05-lunar-rover-excursion_c3aea05b.webp (Template media asset)
- `06-final-earthrise_1a1f1a18.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/aistudio/06-final-earthrise_1a1f1a18.webp (Template media asset)
- `01-hero-lunar-clean.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/01-hero-lunar-clean.webp (Template media asset)
- `02-hero-lunar-loop.mp4` (video/mp4) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/02-hero-lunar-loop.mp4 (Template media asset)
- `03-orbital-transit.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/03-orbital-transit.webp (Template media asset)
- `04-habitat-interior.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/04-habitat-interior.webp (Template media asset)
- `05-lunar-rover-excursion.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/05-lunar-rover-excursion.webp (Template media asset)
- `06-final-earthrise.webp` (image/webp) — https://www.openlanding.page/templates/orbitbeyond/orbit-beyond/06-final-earthrise.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ORBIT & BEYOND Scoped Styles** (`orbitbeyond-styles-1`, placement: `head`, 2433 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **ORBIT & BEYOND Interactive Runtime Bridge** (`orbitbeyond-runtime-1`, placement: `footer`, 278 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
