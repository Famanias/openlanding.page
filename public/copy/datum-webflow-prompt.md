# Webflow MCP Import Prompt: DATUM (datum)

Import the **DATUM** (Developer Tools & 3D Graphics) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/datum
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/datum-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/datum.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "datum" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "datum", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/datum-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`DATUM Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#F3F4F0` | `static_value` |
| `Color / Ceramic` | `--color-ceramic` | `#FFFFFF` | `static_value` |
| `Color / Ink` | `--color-ink` | `#111418` | `static_value` |
| `Color / Slate` | `--color-slate` | `#4A525C` | `static_value` |
| `Color / Rule` | `--color-rule` | `#D3D7CF` | `static_value` |
| `Color / Emerald` | `--color-emerald` | `#007A4D` | `static_value` |
| `Color / Phosphor` | `--color-phosphor` | `#10D98E` | `static_value` |
| `Color / Amber` | `--color-amber` | `#B35000` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Syne` | Google Font: `Syne` |
| `Font / Body` | `--font-body` | `Instrument Sans` | Google Font: `Instrument Sans` |
| `Font / Mono` | `--font-mono` | `Space Mono` | Google Font: `Space Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `24px` | `static_value` |
| `Size / Dt Radius` | `--dt-radius` | `6px` | `static_value` |
| `Size / Dt Slab Radius` | `--dt-slab-radius` | `24px` | `static_value` |
| `Size / Dt Gutter` | `--dt-gutter` | `clamp(18px, 4.8vw, 68px)` | `custom_value` |
| `Size / Dt Max` | `--dt-max` | `1260px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `DATUM` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `datum.webp` (image/webp) — https://www.openlanding.page/gallery/datum.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/datum/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Fixed Instrument Header (`#dt-header`)** (`section-1`, mode: `native-whtml`): Hairline glass bar with the DATUM stacked-slab vector mark, sliding spring-animated active section pill (`Dissection`, `Budget Lab`, `Architecture`, `Access`), live GPU frame-budget badge updating dynamically from the shared state, magnetic `SDK Access` CTA, and an accessible full-screen clip-path drawer on viewports `<= 860px` (`Open menu` / `Close menu`, `Esc` and focus-trap support).
2. **Drafting-Grid Hero (`#top`)** (`section-2`, mode: `hybrid-embed`): Split composition featuring the eyebrow (`SPATIAL GPU PROFILER · WEBGL2 / WEBGPU`), word-masked `<h1>` (*"Every frame, dissected."*), concise lede, dual CTAs (`Dissect 3D Stack`, `Open Budget Lab`), and three `CountUp` telemetry stats (`5` Z-Separated Passes, `444` Draw Batches, `16.6 ms` Frame Lock Target). The right column renders a compact isometric SVG blueprint preview of the five render passes with live budget indicator and clickable pass selector pills.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
3. **02 // Z-Axis Pipeline Dissection (`#dissection`, Signature Mechanic)** (`section-3`, mode: `hybrid-embed`): Tall `220svh` asymmetric split layout pairing a sticky 3D stage (`PipelineCanvas` + always-SSR `PipelineSvg` vector fallback) and 5-step vertical rail (`01 Geometry`, `02 Normals`, `03 Shadows`, `04 Bloom/FX`, `05 Composite`) with five inspectable pass cards (`#dt-pass-geometry` through `#dt-pass-composite`). Scrolling through `#dissection` drives CSS variable `--explode` and a shared ref that separates the five 3D render-pass slabs along the Z-axis in real time. Includes interactive HUD toolbar buttons (`Explode Z-Stack` / `Collapse Z-Stack`, `Wireframe`, `Pause Loop` / `Resume Loop`, `Reset View`), drag-to-orbit camera damped with `easeOutExpo`, slab raycast clicking, and keyboard navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `e`, `w`, `r`, `Home`).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **03 // Frame Budget & Bottleneck Lab (`#budget`)** (`section-4`, mode: `hybrid-embed`): Interactive GPU simulation workbench synchronized with global pipeline state. Features individual `role="switch"` toggles for all five passes, a `Resolution scale` slider (`0.50x` to `2.00x`), target refresh buttons (`60 Hz (16.6 ms)` vs `120 Hz (8.3 ms)`), animated meter bar scaling with Emerald/Amber budget-status pill (`WITHIN ...` vs `OVER BUDGET ...`), draw-call and VRAM totals, detected bottleneck pass, and a 5-tab GLSL shader kernel disassembly inspector (`01`..`05`).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
5. **04 // Architecture & SDK (`#architecture`)** (`section-5`, mode: `hybrid-embed`): Overlapping `#111418` Graphite Ink architectural slab with `Phosphor Signal` accents. Contains a dual-track engineering telemetry marquee (pausing cleanly on hover/focus-within), four capture workflow stages with hairline draw rules, three pointer-reactive `TiltCard` pillars (`Zero-Overhead Hook`, `Deterministic Snapshots`, `WebGL2 & WebGPU`) with neighbor dimming on hover, and live `CountUp` runtime metrics.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
6. **05 // Early Access & Local Brief (`#access`)** (`section-6`, mode: `hybrid-embed`): Split layout pairing the live Pinned Pipeline Snapshot summary card with an accessible client-validated `AccessForm` (`WebGL2` / `WebGPU` / `Both` API selector, floating-label fields for `Engineer name`, `Work email`, `Target scene or bottleneck`, invalid shake + inline `grid-template-rows` error expansion). Submitting transitions through a loading morph to a local SVG stamp-drawn receipt (`DT-XXXXXX`) with explicit browser-local disclosure (*"it has not been sent"*) and a working `Download Brief (.txt)` generator.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
7. **06 // Architectural Footer** (`section-7`, mode: `native-whtml`): Dark Graphite Ink closing band with local telemetry disclaimer, section links, DATUM mark, and full-width architectural wordmark lockup.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **DATUM Scoped Styles (Part 1/2)** (`datum-styles-1`, placement: `head`, 44998 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **DATUM Scoped Styles (Part 2/2)** (`datum-styles-2`, placement: `head`, 1001 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **DATUM Interactive Runtime Bridge** (`datum-runtime-1`, placement: `footer`, 423 / 45000 chars): Loads three, lenis in page footer custom code with prefers-reduced-motion guard.
