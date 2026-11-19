# Webflow MCP Import Prompt: RILL (rill)

Import the **RILL** (Climate Agriculture) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/rill
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/rill-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/rill.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "rill" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "rill", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/rill-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`RILL Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Basalt` | `--color-basalt` | `#14231E` | `static_value` |
| `Color / Limestone` | `--color-limestone` | `#F0E9DB` | `static_value` |
| `Color / Oxide` | `--color-oxide` | `#B85C43` | `static_value` |
| `Color / Riverstone` | `--color-riverstone` | `#5B8174` | `static_value` |
| `Color / Lichen` | `--color-lichen` | `#87956C` | `static_value` |
| `Color / Silt` | `--color-silt` | `#C9B79E` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-cormorant)` | Fallback: `Georgia, serif` |
| `Font / Body` | `--font-body` | `Fira Sans` | Google Font: `Fira Sans` |
| `Font / Mono` | `--font-mono` | `Fira Mono` | Google Font: `Fira Mono` |
| `Font / Cormorant Garamond` | `--font-cormorant-garamond` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Rl Gutter` | `--rl-gutter` | `clamp(20px, 5vw, 80px)` | `custom_value` |
| `Size / Rl Container` | `--rl-container` | `1320px` | `static_value` |
| `Size / Rl Header Height` | `--rl-header-height` | `64px` | `static_value` |
| `Size / Rl Radius Card` | `--rl-radius-card` | `8px` | `static_value` |
| `Size / Rl Radius Media` | `--rl-radius-media` | `6px` | `static_value` |
| `Size / Rl Radius Pill` | `--rl-radius-pill` | `999px` | `static_value` |
| `Size / Rl Shadow Lift` | `--rl-shadow-lift` | `0 18px 40px color-mix(in srgb, var(--color-basalt) 14%, transparent)` | `custom_value` |
| `Size / Rl Lift` | `--rl-lift` | `-8px` | `static_value` |
| `Size / Rl Note Lift` | `--rl-note-lift` | `-6px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `RILL` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `rill.webp` (image/webp) — https://www.openlanding.page/gallery/rill.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional field-hydrology studio called **RILL**. RILL helps dryland farms hold water in the soil through contour planning, low-pressure irrigatio

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **RILL Scoped Styles** (`rill-styles-1`, placement: `head`, 40517 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
