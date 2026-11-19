# Webflow MCP Import Prompt: RADIUS (radius)

Import the **RADIUS** (Urban Mobility & Cycling) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/radius
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/radius-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/radius.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "radius" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "radius", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/radius-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`RADIUS Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Rd Ink` | `--color-rd-ink` | `#272B32` | `static_value` |
| `Color / Rd Paper` | `--color-rd-paper` | `#F3F0E8` | `static_value` |
| `Color / Rd Orange` | `--color-rd-orange` | `#F26836` | `static_value` |
| `Color / Rd Blue` | `--color-rd-blue` | `#244BA8` | `static_value` |
| `Color / Rd Mint` | `--color-rd-mint` | `#B8E9DD` | `static_value` |
| `Color / Rd Ink` | `--rd-ink` | `#272B32` | `static_value` |
| `Color / Rd Paper` | `--rd-paper` | `#F3F0E8` | `static_value` |
| `Color / Rd Orange` | `--rd-orange` | `#F26836` | `static_value` |
| `Color / Rd Blue` | `--rd-blue` | `#244BA8` | `static_value` |
| `Color / Rd Mint` | `--rd-mint` | `#B8E9DD` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Exo 2` | `--font-exo-2` | `Exo 2` | Google Font: `Exo 2` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Space Grotesk` | `--font-space-grotesk` | `Space Grotesk` | Google Font: `Space Grotesk` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `RADIUS` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `radius.webp` (image/webp) — https://www.openlanding.page/gallery/radius.webp (Gallery preview capture)
- `01-bike-hero-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/01-bike-hero-1600.avif (Template media asset)
- `01-bike-hero-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/01-bike-hero-1600.webp (Template media asset)
- `01-bike-hero-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/01-bike-hero-800.avif (Template media asset)
- `01-bike-hero-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/01-bike-hero-800.webp (Template media asset)
- `02-bike-side-graphite-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/02-bike-side-graphite-alpha-1600.avif (Template media asset)
- `02-bike-side-graphite-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/02-bike-side-graphite-alpha-1600.webp (Template media asset)
- `02-bike-side-graphite-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/02-bike-side-graphite-alpha-800.avif (Template media asset)
- `02-bike-side-graphite-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/02-bike-side-graphite-alpha-800.webp (Template media asset)
- `03-bike-side-tangerine-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/03-bike-side-tangerine-alpha-1600.avif (Template media asset)
- `03-bike-side-tangerine-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/03-bike-side-tangerine-alpha-1600.webp (Template media asset)
- `03-bike-side-tangerine-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/03-bike-side-tangerine-alpha-800.avif (Template media asset)
- `03-bike-side-tangerine-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/03-bike-side-tangerine-alpha-800.webp (Template media asset)
- `04-bike-side-cream-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/04-bike-side-cream-alpha-1600.avif (Template media asset)
- `04-bike-side-cream-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/04-bike-side-cream-alpha-1600.webp (Template media asset)
- `04-bike-side-cream-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/04-bike-side-cream-alpha-800.avif (Template media asset)
- `04-bike-side-cream-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/04-bike-side-cream-alpha-800.webp (Template media asset)
- `05-rack-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/05-rack-alpha-1600.avif (Template media asset)
- `05-rack-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/05-rack-alpha-1600.webp (Template media asset)
- `05-rack-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/05-rack-alpha-800.avif (Template media asset)
- `05-rack-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/05-rack-alpha-800.webp (Template media asset)
- `06-basket-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/06-basket-alpha-1600.avif (Template media asset)
- `06-basket-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/06-basket-alpha-1600.webp (Template media asset)
- `06-basket-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/06-basket-alpha-800.avif (Template media asset)
- `06-basket-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/06-basket-alpha-800.webp (Template media asset)
- `07-lights-alpha-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/07-lights-alpha-1600.avif (Template media asset)
- `07-lights-alpha-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/07-lights-alpha-1600.webp (Template media asset)
- `07-lights-alpha-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/07-lights-alpha-800.avif (Template media asset)
- `07-lights-alpha-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/07-lights-alpha-800.webp (Template media asset)
- `08-street-rider-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/08-street-rider-1600.avif (Template media asset)
- `08-street-rider-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/08-street-rider-1600.webp (Template media asset)
- `08-street-rider-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/08-street-rider-800.avif (Template media asset)
- `08-street-rider-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/08-street-rider-800.webp (Template media asset)
- `09-frame-macro-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/09-frame-macro-1600.avif (Template media asset)
- `09-frame-macro-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/09-frame-macro-1600.webp (Template media asset)
- `09-frame-macro-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/09-frame-macro-800.avif (Template media asset)
- `09-frame-macro-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/09-frame-macro-800.webp (Template media asset)
- `10-tire-detail-1600.avif` (image/avif) — https://www.openlanding.page/templates/radius/10-tire-detail-1600.avif (Template media asset)
- `10-tire-detail-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/10-tire-detail-1600.webp (Template media asset)
- `10-tire-detail-800.avif` (image/avif) — https://www.openlanding.page/templates/radius/10-tire-detail-800.avif (Template media asset)
- `10-tire-detail-800.webp` (image/webp) — https://www.openlanding.page/templates/radius/10-tire-detail-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/radius/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js 16 / React 19 / TypeScript landing-page template for RADIUS, an electric urban bicycle. The public gallery path is `/templates/radius`; keep template code within `src/app/(radius)/`, use relative imports, and prefi
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **RADIUS Scoped Styles (Part 1/2)** (`radius-styles-1`, placement: `head`, 44971 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **RADIUS Scoped Styles (Part 2/2)** (`radius-styles-2`, placement: `head`, 9326 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
