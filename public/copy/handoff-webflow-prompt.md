# Webflow MCP Import Prompt: HANDOFF (handoff)

Import the **HANDOFF** (Outsourcing & Operations) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/handoff
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/handoff-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/handoff.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "handoff" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "handoff", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/handoff-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`HANDOFF Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Hf Paper` | `--hf-paper` | `#F7F6F1` | `static_value` |
| `Color / Hf Paper 2` | `--hf-paper-2` | `#EEEDE7` | `static_value` |
| `Color / Hf Ink` | `--hf-ink` | `#171817` | `static_value` |
| `Color / Hf Ink 2` | `--hf-ink-2` | `#202320` | `static_value` |
| `Color / Hf Orange` | `--hf-orange` | `#F35B2A` | `static_value` |
| `Color / Hf Blue` | `--hf-blue` | `#9BC9D8` | `static_value` |
| `Color / Hf Green` | `--hf-green` | `#9CB99C` | `static_value` |
| `Color / Hf Line` | `--hf-line` | `#D9D7CF` | `static_value` |
| `Color / Hf Muted` | `--hf-muted` | `#6C6D67` | `static_value` |
| `Color / Hf White` | `--hf-white` | `#FFFFFF` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / DM Serif Display` | `--font-dm-serif-display` | `DM Serif Display` | Google Font: `DM Serif Display` |
| `Font / Geist` | `--font-geist` | `Geist` | Google Font: `Geist` |
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Hf Container` | `--hf-container` | `1320px` | `static_value` |
| `Size / Hf Gutter` | `--hf-gutter` | `clamp(20px,4vw,64px)` | `custom_value` |
| `Size / Hf Radius` | `--hf-radius` | `6px` | `static_value` |
| `Size / Hf Pill` | `--hf-pill` | `999px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `HANDOFF` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `handoff.webp` (image/webp) — https://www.openlanding.page/gallery/handoff.webp (Gallery preview capture)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/handoff/icon.svg (Template media asset)
- `preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/handoff/preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a Next.js 16 App Router + React + TypeScript + Tailwind CSS v4 conversion landing page for a fictional outsourcing company called HANDOFF. Its positioning is “Good work, routed well.” It helps small businesses qualify, match and manag
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **HANDOFF Scoped Styles** (`handoff-styles-1`, placement: `head`, 24389 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
