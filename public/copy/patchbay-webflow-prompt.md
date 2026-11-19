# Webflow MCP Import Prompt: PATCHBAY (patchbay)

Import the **PATCHBAY** (Developer Portfolio & Software Engineering) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/patchbay
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/patchbay-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/patchbay.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "patchbay" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "patchbay", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/patchbay-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`PATCHBAY Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#15161A` | `static_value` |
| `Color / Panel` | `--color-panel` | `#1E2024` | `static_value` |
| `Color / Seam` | `--color-seam` | `#34373D` | `static_value` |
| `Color / Bone` | `--color-bone` | `#ECE8DF` | `static_value` |
| `Color / Steel` | `--color-steel` | `#9A9CA3` | `static_value` |
| `Color / Amber` | `--color-amber` | `#F2A93B` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-familjen)` | Fallback: `Helvetica Neue, Arial, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-hanken)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-plex-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / Familjen Grotesk` | `--font-familjen-grotesk` | `Familjen Grotesk` | Google Font: `Familjen Grotesk` |
| `Font / Hanken Grotesk` | `--font-hanken-grotesk` | `Hanken Grotesk` | Google Font: `Hanken Grotesk` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Plug Y` | `--plug-y` | `84px` | `static_value` |
| `Size / Lift` | `--lift` | `-6px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `PATCHBAY` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `patchbay.webp` (image/webp) — https://www.openlanding.page/gallery/patchbay.webp (Gallery preview capture)
- `case-fieldnote-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-fieldnote-1600.avif (Template media asset)
- `case-fieldnote-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-fieldnote-1600.webp (Template media asset)
- `case-fieldnote-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-fieldnote-800.avif (Template media asset)
- `case-fieldnote-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-fieldnote-800.webp (Template media asset)
- `case-ledgerline-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-ledgerline-1600.avif (Template media asset)
- `case-ledgerline-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-ledgerline-1600.webp (Template media asset)
- `case-ledgerline-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-ledgerline-800.avif (Template media asset)
- `case-ledgerline-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-ledgerline-800.webp (Template media asset)
- `case-marginalia-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-marginalia-1600.avif (Template media asset)
- `case-marginalia-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-marginalia-1600.webp (Template media asset)
- `case-marginalia-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-marginalia-800.avif (Template media asset)
- `case-marginalia-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-marginalia-800.webp (Template media asset)
- `case-tidegrid-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-tidegrid-1600.avif (Template media asset)
- `case-tidegrid-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-tidegrid-1600.webp (Template media asset)
- `case-tidegrid-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/case-tidegrid-800.avif (Template media asset)
- `case-tidegrid-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/case-tidegrid-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/preview-1600.webp (Template media asset)
- `project-driftwatch-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-driftwatch-1600.avif (Template media asset)
- `project-driftwatch-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-driftwatch-1600.webp (Template media asset)
- `project-driftwatch-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-driftwatch-800.avif (Template media asset)
- `project-driftwatch-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-driftwatch-800.webp (Template media asset)
- `project-fieldnote-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-fieldnote-1600.avif (Template media asset)
- `project-fieldnote-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-fieldnote-1600.webp (Template media asset)
- `project-fieldnote-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-fieldnote-800.avif (Template media asset)
- `project-fieldnote-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-fieldnote-800.webp (Template media asset)
- `project-kerbside-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-kerbside-1600.avif (Template media asset)
- `project-kerbside-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-kerbside-1600.webp (Template media asset)
- `project-kerbside-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-kerbside-800.avif (Template media asset)
- `project-kerbside-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-kerbside-800.webp (Template media asset)
- `project-ledgerline-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-ledgerline-1600.avif (Template media asset)
- `project-ledgerline-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-ledgerline-1600.webp (Template media asset)
- `project-ledgerline-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-ledgerline-800.avif (Template media asset)
- `project-ledgerline-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-ledgerline-800.webp (Template media asset)
- `project-marginalia-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-marginalia-1600.avif (Template media asset)
- `project-marginalia-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-marginalia-1600.webp (Template media asset)
- `project-marginalia-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-marginalia-800.avif (Template media asset)
- `project-marginalia-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-marginalia-800.webp (Template media asset)
- `project-paperplane-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-paperplane-1600.avif (Template media asset)
- `project-paperplane-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-paperplane-1600.webp (Template media asset)
- `project-paperplane-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-paperplane-800.avif (Template media asset)
- `project-paperplane-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-paperplane-800.webp (Template media asset)
- `project-quillbase-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-quillbase-1600.avif (Template media asset)
- `project-quillbase-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-quillbase-1600.webp (Template media asset)
- `project-quillbase-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-quillbase-800.avif (Template media asset)
- `project-quillbase-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-quillbase-800.webp (Template media asset)
- `project-tidegrid-1600.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-tidegrid-1600.avif (Template media asset)
- `project-tidegrid-1600.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-tidegrid-1600.webp (Template media asset)
- `project-tidegrid-800.avif` (image/avif) — https://www.openlanding.page/templates/patchbay/project-tidegrid-800.avif (Template media asset)
- `project-tidegrid-800.webp` (image/webp) — https://www.openlanding.page/templates/patchbay/project-tidegrid-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Fixed Header** (`section-1`, mode: `native-whtml`): Brand lockup with SVG jack mark, desktop navigation with animated sliding pill indicator, role switcher chips, and mobile drawer with circular clip-path reveal. Blurs and compresses on scroll down.
2. **Hero** (`section-2`, mode: `native-whtml`): Mask-revealed headline with height reservation to prevent layout shift during role switches, magnetic CTA buttons, the interactive Patch Bay, live count-up metrics, and an availability marquee.
3. **Selected Work** (`section-3`, mode: `hybrid-embed`): Responsive grid of project cards with 3D cursor tilt (±5°), radial spotlight illumination, media scaling, sibling card dimming, technology tags, and animated relevance fit meters.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Signal Flow (Stack)** (`section-4`, mode: `native-whtml`): Three-stage pipeline (Signal In, Patched Through, Signal Out) connected by horizontal signal wires with travelling pulse particles.
5. **Process** (`section-5`, mode: `native-whtml`): Four-stage execution roadmap with numbered badges and expanding amber rules.
6. **Case Study** (`section-6`, mode: `native-whtml`): Split technical deep dive displaying project visual, problem statement, architectural approach, and key result counters.
7. **About & Timeline** (`section-7`, mode: `native-whtml`): Career trajectory and philosophy with year markers and verified external links.
8. **Contact Brief Generator** (`section-8`, mode: `native-whtml`): Accessible form with floating labels and client-side validation. On submission, generates a formatted local brief file with a deterministic hashed ticket reference (`PB-XXXXXX`) for the visitor to download. No mock backend network calls.
9. **Footer** (`section-9`, mode: `native-whtml`): Monospaced technical attribution and copyright.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **PATCHBAY Scoped Styles** (`patchbay-styles-1`, placement: `head`, 32378 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **PATCHBAY Interactive Runtime Bridge** (`patchbay-runtime-1`, placement: `footer`, 345 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
