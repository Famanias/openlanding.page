# Webflow MCP Import Prompt: RAZORLINE (razorline)

Import the **RAZORLINE** (Performance Footwear & Athletics) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/razorline
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/razorline-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/razorline.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "razorline" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "razorline", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/razorline-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`RAZORLINE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Carbon` | `--carbon` | `#0B0B0A` | `static_value` |
| `Color / Chalk` | `--chalk` | `#F1F0E9` | `static_value` |
| `Color / Lime` | `--lime` | `#D3FF35` | `static_value` |
| `Color / Cobalt` | `--cobalt` | `#375CFF` | `static_value` |
| `Color / Steel` | `--steel` | `#777A7A` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#1C1C1A` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#262624` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-display` | Fallback: `Barlow Condensed, Impact, Arial Narrow, sans-serif)` |
| `Font / Sans` | `--font-sans` | `var(--font-sans` | Fallback: `Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Mono` | `--font-mono` | `var(--font-mono` | Fallback: `JetBrains Mono, monospace)` |
| `Font / Barlow Condensed` | `--font-barlow-condensed` | `Barlow Condensed` | Google Font: `Barlow Condensed` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `RAZORLINE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `razorline.webp` (image/webp) — https://www.openlanding.page/gallery/razorline.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Act as a Principal Design Technologist and Senior Frontend Architect. Build a complete, responsive, interaction-rich performance athletics DTC storefront for **RAZORLINE** featuring the **RL-01 Performance Footwear** series.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **RAZORLINE Scoped Styles** (`razorline-styles-1`, placement: `head`, 3773 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **RAZORLINE Interactive Runtime Bridge** (`razorline-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
