# Webflow MCP Import Prompt: AFTERWALK (afterwalk)

Import the **AFTERWALK** (Community & outdoors) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/afterwalk
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/afterwalk-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/afterwalk.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "afterwalk" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "afterwalk", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/afterwalk-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AFTERWALK Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Aw Ink` | `--aw-ink` | `#1E3529` | `static_value` |
| `Color / Aw Paper` | `--aw-paper` | `#F7F5EB` | `static_value` |
| `Color / Aw White` | `--aw-white` | `#FBFAF3` | `static_value` |
| `Color / Aw Lime` | `--aw-lime` | `#DAE870` | `static_value` |
| `Color / Aw Sage` | `--aw-sage` | `#ABC6A2` | `static_value` |
| `Color / Aw Peach` | `--aw-peach` | `#E9BA9F` | `static_value` |
| `Color / Aw Butter` | `--aw-butter` | `#F3E7B6` | `static_value` |
| `Color / Aw Muted` | `--aw-muted` | `#607168` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Fraunces` | `--font-fraunces` | `Fraunces` | Google Font: `Fraunces` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AFTERWALK` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `afterwalk.webp` (image/webp) — https://www.openlanding.page/gallery/afterwalk.webp (Gallery preview capture)
- `hero-1600.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/hero-1600.avif (Template media asset)
- `hero-1600.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/hero-1600.webp (Template media asset)
- `hero-800.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/hero-800.avif (Template media asset)
- `hero-800.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/hero-800.webp (Template media asset)
- `together-1600.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/together-1600.avif (Template media asset)
- `together-1600.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/together-1600.webp (Template media asset)
- `together-800.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/together-800.avif (Template media asset)
- `together-800.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/together-800.webp (Template media asset)
- `walk-park-1600.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-park-1600.avif (Template media asset)
- `walk-park-1600.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-park-1600.webp (Template media asset)
- `walk-park-800.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-park-800.avif (Template media asset)
- `walk-park-800.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-park-800.webp (Template media asset)
- `walk-river-1600.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-river-1600.avif (Template media asset)
- `walk-river-1600.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-river-1600.webp (Template media asset)
- `walk-river-800.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-river-800.avif (Template media asset)
- `walk-river-800.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-river-800.webp (Template media asset)
- `walk-sunset-1600.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-sunset-1600.avif (Template media asset)
- `walk-sunset-1600.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-sunset-1600.webp (Template media asset)
- `walk-sunset-800.avif` (image/avif) — https://www.openlanding.page/templates/afterwalk/walk-sunset-800.avif (Template media asset)
- `walk-sunset-800.webp` (image/webp) — https://www.openlanding.page/templates/afterwalk/walk-sunset-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js 16 / React 19 / TypeScript landing page for a fictional neighborhood walking club. Use Motion for React (`motion/react`) and no 3D. The central idea is that a good walk is a line between small discoveries: use orig
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AFTERWALK Scoped Styles** (`afterwalk-styles-1`, placement: `head`, 31496 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AFTERWALK Interactive Runtime Bridge** (`afterwalk-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
