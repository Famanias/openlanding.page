# Webflow MCP Import Prompt: VOLUME ZERO (volume-zero)

Import the **VOLUME ZERO** (Acoustic Architecture) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/volume-zero
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/volume-zero-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/volume-zero.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "volume-zero" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "volume-zero", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/volume-zero-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`VOLUME ZERO Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#171B20` | `static_value` |
| `Color / Paper` | `--color-paper` | `#F1EEE5` | `static_value` |
| `Color / Accent` | `--color-accent` | `#2B9BAA` | `static_value` |
| `Color / Vz Line` | `--vz-line` | `color-mix(in srgb, var(--color-ink) 18%, transparent)` | `custom_value` |
| `Color / Vz Line Light` | `--vz-line-light` | `color-mix(in srgb, var(--color-paper) 20%, transparent)` | `custom_value` |
| `Color / Vz Muted` | `--vz-muted` | `color-mix(in srgb, var(--color-ink) 62%, var(--color-paper))` | `custom_value` |
| `Color / Vz Dark Muted` | `--vz-dark-muted` | `color-mix(in srgb, var(--color-paper) 62%, var(--color-ink))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Oxanium` | Google Font: `Oxanium` |
| `Font / Body` | `--font-body` | `Manrope` | Google Font: `Manrope` |
| `Font / Mono` | `--font-mono` | `Azeret Mono` | Google Font: `Azeret Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Vz Header H` | `--vz-header-h` | `78px` | `static_value` |
| `Size / Vz Gutter` | `--vz-gutter` | `clamp(18px, 5vw, 76px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `VOLUME ZERO` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `volume-zero.webp` (image/webp) — https://www.openlanding.page/gallery/volume-zero.webp (Gallery preview capture)
- `preview-1600.svg` (image/svg+xml) — https://www.openlanding.page/templates/volume-zero/preview-1600.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a premium landing page in **Next.js 16.4 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Three.js** for a fictional Rotterdam acoustic-architecture studio called **VOLUME ZERO**. The studio maps rooms for museums, theatres an
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **VOLUME ZERO Scoped Styles** (`volume-zero-styles-1`, placement: `head`, 30562 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **VOLUME ZERO Interactive Runtime Bridge** (`volume-zero-runtime-1`, placement: `footer`, 348 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
