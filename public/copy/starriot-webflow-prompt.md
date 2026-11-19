# Webflow MCP Import Prompt: STAR RIOT (starriot)

Import the **STAR RIOT** (Nightlife & Music) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/starriot
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/starriot-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/starriot.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "starriot" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "starriot", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/starriot-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`STAR RIOT Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Sr Night 0` | `--color-sr-night-0` | `#12041B` | `static_value` |
| `Color / Sr Night 1` | `--color-sr-night-1` | `#1E092B` | `static_value` |
| `Color / Sr Night 2` | `--color-sr-night-2` | `#2C103B` | `static_value` |
| `Color / Sr Mint` | `--color-sr-mint` | `#30F0CC` | `static_value` |
| `Color / Sr Pink` | `--color-sr-pink` | `#FC3CCC` | `static_value` |
| `Color / Sr Lime` | `--color-sr-lime` | `#FCF03C` | `static_value` |
| `Color / Sr Purple` | `--color-sr-purple` | `#9451FF` | `static_value` |
| `Color / Sr Coral` | `--color-sr-coral` | `#FF9BB0` | `static_value` |
| `Color / Sr White` | `--color-sr-white` | `#FFFDF8` | `static_value` |
| `Color / Sr Lilac` | `--color-sr-lilac` | `#CAB9D4` | `static_value` |
| `Color / Night 0` | `--night-0` | `#12041B` | `static_value` |
| `Color / Night 1` | `--night-1` | `#1E092B` | `static_value` |
| `Color / Night 2` | `--night-2` | `#2C103B` | `static_value` |
| `Color / Electric Mint` | `--electric-mint` | `#30F0CC` | `static_value` |
| `Color / Hot Pink` | `--hot-pink` | `#FC3CCC` | `static_value` |
| `Color / Acid Lime` | `--acid-lime` | `#FCF03C` | `static_value` |
| `Color / Electric Purple` | `--electric-purple` | `#9451FF` | `static_value` |
| `Color / Warm Coral` | `--warm-coral` | `#FF9BB0` | `static_value` |
| `Color / Paper White` | `--paper-white` | `#FFFDF8` | `static_value` |
| `Color / Muted Lilac` | `--muted-lilac` | `#CAB9D4` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Sr Display` | `--font-sr-display` | `Anton` | Google Font: `Anton` |
| `Font / Sr Sans` | `--font-sr-sans` | `Public Sans` | Google Font: `Public Sans` |
| `Font / Sr Mono` | `--font-sr-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Display` | `--font-display` | `Impact` | Fallback: `Haettenschweiler, Anton, Franklin Gothic Heavy, Arial Narrow, Arial Black, sans-serif` |
| `Font / Sans` | `--font-sans` | `-apple-system` | Fallback: `BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif` |
| `Font / Mono` | `--font-mono` | `SFMono-Regular` | Fallback: `Consolas, Liberation Mono, Menlo, monospace` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Container Max` | `--container-max` | `1440px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `STAR RIOT` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `starriot.webp` (image/webp) — https://www.openlanding.page/gallery/starriot.webp (Gallery preview capture)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/starriot/icon.svg (Template media asset)
- `image_1a599d24.png` (image/png) — https://www.openlanding.page/templates/starriot/image_1a599d24.png (Template media asset)
- `image_aa852dd2.png` (image/png) — https://www.openlanding.page/templates/starriot/image_aa852dd2.png (Template media asset)
- `media_1793581394941_95a17594.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581394941_95a17594.png (Template media asset)
- `media_1793581394941_a7d7971c.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581394941_a7d7971c.png (Template media asset)
- `media_1793581400714_0d652aa3.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581400714_0d652aa3.png (Template media asset)
- `media_1793581401401_ff039a04.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581401401_ff039a04.png (Template media asset)
- `media_1793581744578_582de51c.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581744578_582de51c.png (Template media asset)
- `media_1793581749202_7fdf949a.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581749202_7fdf949a.png (Template media asset)
- `media_1793581751624_c7ef1b81.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793581751624_c7ef1b81.png (Template media asset)
- `media_1793582239485_a0ba9cdb.png` (image/png) — https://www.openlanding.page/templates/starriot/media_1793582239485_a0ba9cdb.png (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/starriot/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header & Brand Navigation** (`section-1`, mode: `native-whtml`): Custom split neon star glyph, primary links (`NIGHTS`, `THE SPACE`, `THE SOUND`, `FAQ`), mobile drawer.
2. **Hero Section (The Ignition)** (`section-2`, mode: `native-whtml`): Giant display type `TONIGHT, WE GO SUPERNOVA.`, live DJ lineup deck with BPM selector, interactive equalizer bars with transport controls, tonight set slots, colossal neon star portal, and vector disco dancers.
3. **Manifesto Section** (`section-3`, mode: `native-whtml`): `ORDINARY NIGHTS? NOT HERE.`, 3 core club pillars, spinning vinyl record, and animated ticker marquee.
4. **Nights Section (Pick Your Frequency)** (`section-4`, mode: `hybrid-embed`): Frequency filter tabs (`All`, `House & Edits`, `Classic Disco`, `Soul & Boogie`), 3 poster cards with 3D pointer tilt, accessible event detail dialog modal with lineup breakdown.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
5. **Sound Stage Section (The Sound Takes Over)** (`section-5`, mode: `native-whtml`): Scroll-controlled 3-stage progression (`01. WARM UP` → `02. TURN UP` → `03. ALL OUT`) with expanding bass rings, erupting supernova star, and live telemetry readout.
6. **Space Section (The Space)** (`section-6`, mode: `native-whtml`): 4-zone architectural collage featuring sunken sprung floor with real-time under-floor lighting matrix switcher, triple mirror-ball orbit, 360° floor-level booth, and hospitality crew.
7. **Movement Section (Voices From The 3 AM Floor)** (`section-7`, mode: `native-whtml`): Sticker photo-wall snap carousel with interactive peel note flips, plus FAQ accordion.
8. **Guestlist Conversion Section** (`section-8`, mode: `native-whtml`): Priority floor access form with real-time validation, deterministic demo pass code generation (`SR-XXXX-YYY`), barcode graphic, and live RSVP counter.
9. **Site Footer** (`section-9`, mode: `native-whtml`): Brand sign-off, quick links, fictional concept disclaimer, back-to-top control.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **STAR RIOT Scoped Styles (Part 1/2)** (`starriot-styles-1`, placement: `head`, 44972 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **STAR RIOT Scoped Styles (Part 2/2)** (`starriot-styles-2`, placement: `head`, 17964 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **STAR RIOT Interactive Runtime Bridge** (`starriot-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
