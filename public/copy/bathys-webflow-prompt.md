# Webflow MCP Import Prompt: BATHYS (bathys)

Import the **BATHYS** (Oceanography & Robotics) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/bathys
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/bathys-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/bathys.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "bathys" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "bathys", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/bathys-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`BATHYS Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Trench` | `--color-trench` | `#03070D` | `static_value` |
| `Color / Navy` | `--color-navy` | `#0A1526` | `static_value` |
| `Color / Titanium` | `--color-titanium` | `#EDF5FA` | `static_value` |
| `Color / Cyan` | `--color-cyan` | `#00E5FF` | `static_value` |
| `Color / Amber` | `--color-amber` | `#FF9E1B` | `static_value` |
| `Color / Glass` | `--color-glass` | `#122338` | `static_value` |
| `Color / Slate` | `--color-slate` | `#546E8A` | `static_value` |
| `Color / Mist` | `--color-mist` | `#8DA8C2` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-chakra)` | Fallback: `-apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Body` | `--font-body` | `Sora` | Google Font: `Sora` |
| `Font / Mono` | `--font-mono` | `var(--font-share-mono)` | Fallback: `ui-monospace, Menlo, monospace` |
| `Font / Chakra Petch` | `--font-chakra-petch` | `Chakra Petch` | Google Font: `Chakra Petch` |
| `Font / Share Tech Mono` | `--font-share-tech-mono` | `Share Tech Mono` | Google Font: `Share Tech Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `24px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `BATHYS` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `bathys.webp` (image/webp) — https://www.openlanding.page/gallery/bathys.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Fixed Telemetry Header HUD** (`section-1`, mode: `native-whtml`): Brand mark lockup, live depth and bar pressure readout pills, coordinate status, navigation anchors, and "Commission Payload" CTA.
2. **Hero Section** (`section-2`, mode: `native-whtml`): - Coordinates: `11°22.4' N · 142°35.5' E · MARIANA TRENCH`.
3. **The Hadal Descent Stage (Signature Mechanic)** (`section-3`, mode: `hybrid-embed`): - Pinned 320vh stage (0 to 10,928 m) with dual-column telemetry and right-hand bathymetric rail.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Procedural Sonar Radar** (`section-4`, mode: `hybrid-embed`): - Real-time HTML5 Canvas polar sweep radar with concentric range circles (2km, 5km, 10km) and rotating sector beam.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
5. **Vehicle Architecture** (`section-5`, mode: `native-whtml`): - Exploded vector blueprint schematic highlighting the Titanium Pressure Sphere, Syntactic Foam Buoyancy Core, Magnetic Thruster Pods, and Dielectric Lithium-Sulfur Battery Tray.
6. **Sensor Suite** (`section-6`, mode: `hybrid-embed`): - 3D perspective cards with hover tilt and pointer spotlights featuring Synthetic Aperture Sonar, Ultra-Deep CTD Probe, Laser Raman Spectrometer, and Isobaric Benthic Corer.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
7. **Field Operations Dossiers** (`section-7`, mode: `native-whtml`): - Operational mission logs from the Challenger Deep (10,928m), Puerto Rico Trench (8,376m), and Kermadec Trench (10,047m).
8. **Charter & Payload Intake Form** (`section-8`, mode: `native-whtml`): - Client-side validated form (principal investigator name, institutional email, agency, target trench, payload mass kg, requirements) with zero network calls and accessible status feedback.
9. **Colophon & Hydrographic Registry Footer** (`section-9`, mode: `native-whtml`): - Brest and Monterey foundry coordinates, IMO Subsea Category H-11 certification, and smooth "Return to Surface" scroll action.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **BATHYS Scoped Styles** (`bathys-styles-1`, placement: `head`, 10230 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
