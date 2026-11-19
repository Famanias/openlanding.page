# Webflow MCP Import Prompt: IRIDIA (iridia)

Import the **IRIDIA** (Kinetic Light & Optics) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/iridia
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/iridia-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/iridia.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "iridia" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "iridia", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/iridia-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`IRIDIA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Obsidian` | `--color-obsidian` | `#0A0B10` | `static_value` |
| `Color / Prism` | `--color-prism` | `#F5F3EF` | `static_value` |
| `Color / Hyperion` | `--color-hyperion` | `#00F0FF` | `static_value` |
| `Color / Chroma` | `--color-chroma` | `#FF3366` | `static_value` |
| `Color / Starlight` | `--color-starlight` | `#FFE600` | `static_value` |
| `Color / Glass` | `--color-glass` | `#141724` | `static_value` |
| `Color / Specular` | `--color-specular` | `#8D93A8` | `static_value` |
| `Color / Flare` | `--color-flare` | `#FF4D00` | `static_value` |
| `Color / Ir Bg` | `--ir-bg` | `#0A0B10` | `static_value` |
| `Color / Ir Fg` | `--ir-fg` | `#F5F3EF` | `static_value` |
| `Color / Ir Accent` | `--ir-accent` | `#00F0FF` | `static_value` |
| `Color / Ir Secondary` | `--ir-secondary` | `#FF3366` | `static_value` |
| `Color / Ir Starlight` | `--ir-starlight` | `#FFE600` | `static_value` |
| `Color / Ir Glass` | `--ir-glass` | `#141724` | `static_value` |
| `Color / Ir Specular` | `--ir-specular` | `#8D93A8` | `static_value` |
| `Color / Ir Flare` | `--ir-flare` | `#FF4D00` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Space Grotesk` | Google Font: `Space Grotesk` |
| `Font / Body` | `--font-body` | `var(--font-plus-jakarta)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `IRIDIA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `iridia.webp` (image/webp) — https://www.openlanding.page/gallery/iridia.webp (Gallery preview capture)
- `chamber-dispersion-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-dispersion-1600.avif (Template media asset)
- `chamber-dispersion-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-dispersion-1600.webp (Template media asset)
- `chamber-dispersion-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-dispersion-800.avif (Template media asset)
- `chamber-dispersion-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-dispersion-800.webp (Template media asset)
- `chamber-interference-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-interference-1600.avif (Template media asset)
- `chamber-interference-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-interference-1600.webp (Template media asset)
- `chamber-interference-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-interference-800.avif (Template media asset)
- `chamber-interference-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-interference-800.webp (Template media asset)
- `chamber-refraction-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-refraction-1600.avif (Template media asset)
- `chamber-refraction-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-refraction-1600.webp (Template media asset)
- `chamber-refraction-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/chamber-refraction-800.avif (Template media asset)
- `chamber-refraction-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/chamber-refraction-800.webp (Template media asset)
- `hero-prism-monolith-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/hero-prism-monolith-1600.avif (Template media asset)
- `hero-prism-monolith-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/hero-prism-monolith-1600.webp (Template media asset)
- `hero-prism-monolith-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/hero-prism-monolith-800.avif (Template media asset)
- `hero-prism-monolith-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/hero-prism-monolith-800.webp (Template media asset)
- `installation-basel-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-basel-1600.avif (Template media asset)
- `installation-basel-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-basel-1600.webp (Template media asset)
- `installation-basel-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-basel-800.avif (Template media asset)
- `installation-basel-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-basel-800.webp (Template media asset)
- `installation-kyoto-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-kyoto-1600.avif (Template media asset)
- `installation-kyoto-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-kyoto-1600.webp (Template media asset)
- `installation-kyoto-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-kyoto-800.avif (Template media asset)
- `installation-kyoto-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-kyoto-800.webp (Template media asset)
- `installation-reykjavik-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-reykjavik-1600.avif (Template media asset)
- `installation-reykjavik-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-reykjavik-1600.webp (Template media asset)
- `installation-reykjavik-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/installation-reykjavik-800.avif (Template media asset)
- `installation-reykjavik-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/installation-reykjavik-800.webp (Template media asset)
- `layer-substrate-1600.avif` (image/avif) — https://www.openlanding.page/templates/iridia/layer-substrate-1600.avif (Template media asset)
- `layer-substrate-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/layer-substrate-1600.webp (Template media asset)
- `layer-substrate-800.avif` (image/avif) — https://www.openlanding.page/templates/iridia/layer-substrate-800.avif (Template media asset)
- `layer-substrate-800.webp` (image/webp) — https://www.openlanding.page/templates/iridia/layer-substrate-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/iridia/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **DOM in CSS 3D** (`section-1`, mode: `hybrid-embed`): - Perspective container (`perspective: 1200px`) holding the sections as faceted 3D planes at calibrated Z-depths and subtle rotation angles.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
2. **WebGL2 Live Gradient Canvas** (`section-2`, mode: `hybrid-embed`): - Fixed background shader calculating Navier-Stokes curl noise fluid advection, Cauchy chromatic dispersion ($n(\lambda) = A + B/\lambda^2$), mouse velocity ripples, and film grain dither.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
3. **Spatial Navigation Bar** (`section-3`, mode: `native-whtml`): Fixed frosted glass pill with brand mark, coordinates (`47.3769° N · 8.5417° E`), live wavelength ticker, section anchors, and "Synthesize" CTA.
4. **The Prism Pavilion (Hero)** (`section-4`, mode: `native-whtml`): - Eyebrow: `OPTICAL FOUNDRY · ZURICH & KYOTO · ARCHITECTURAL SCALE`
5. **The Spectral Chambers (Zones)** (`section-5`, mode: `native-whtml`): - Four distinct architectural zones: Phase 01 Refraction, Phase 02 Dispersion, Phase 03 Interference, Phase 04 Luminescence.
6. **Exploded 3D Optics Dissection** (`section-6`, mode: `hybrid-embed`): - Interactive 3D layer separation: Substrate ($+120\text{px}$), Nematic Lattice ($+40\text{px}$), Diffraction Grating ($-40\text{px}$), Quantum Dot Film ($-120\text{px}$).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
7. **The Spectral Synthesizer (Signature Mechanic)** (`section-7`, mode: `native-whtml`): - Live interactive gradient workbench with sliders for Dispersion, Turbulence, Fluid Speed, and Chromatic Spread.
8. **Architectural Installations** (`section-8`, mode: `native-whtml`): - Basel Spiral Refractor (12m dichroic glass fins), Kyoto Spectral Solarium (reflecting pool + micro-lenses), Reykjavik Chromatic Monolith (subarctic geodesic dome).
9. **Commission Intake Form** (`section-9`, mode: `native-whtml`): - Client-side validated consultation request (name, email, installation scale, architectural space, target wavelength) with accessible error feedback and instant success confirmation without network calls.
10. **Colophon Footer** (`section-10`, mode: `native-whtml`): Technical coordinates, copyright, legal disclaimer, and legal entity registry.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **IRIDIA Scoped Styles** (`iridia-styles-1`, placement: `head`, 6065 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
