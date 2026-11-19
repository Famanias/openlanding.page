# Webflow MCP Import Prompt: Noctiluca (noctiluca)

Import the **Noctiluca** (Light Museum) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/noctiluca
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/noctiluca-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/noctiluca.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "noctiluca" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "noctiluca", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/noctiluca-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Noctiluca Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#07060B` | `static_value` |
| `Color / Lumen` | `--color-lumen` | `#F3F0EA` | `static_value` |
| `Color / Glow` | `--color-glow` | `#C9B8FF` | `static_value` |
| `Color / Dusk` | `--color-dusk` | `#8E889B` | `static_value` |
| `Color / Glass` | `--color-glass` | `#16131F` | `static_value` |
| `Color / Ember` | `--color-ember` | `#FFA38F` | `static_value` |
| `Color / Nl Line` | `--nl-line` | `color-mix(in srgb, var(--color-lumen) 14%, transparent)` | `custom_value` |
| `Color / Nl Glass` | `--nl-glass` | `color-mix(in srgb, var(--color-glass) 88%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Nl Display` | `--font-nl-display` | `Syne` | Google Font: `Syne` |
| `Font / Nl Body` | `--font-nl-body` | `var(--font-schibsted)` | Fallback: `Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif` |
| `Font / Nl Mono` | `--font-nl-mono` | `var(--font-fragment)` | Fallback: `Fragment Mono, ui-monospace, Menlo, monospace` |
| `Font / Fragment Mono` | `--font-fragment-mono` | `Fragment Mono` | Google Font: `Fragment Mono` |
| `Font / Schibsted Grotesk` | `--font-schibsted-grotesk` | `Schibsted Grotesk` | Google Font: `Schibsted Grotesk` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Nl Gutter` | `--nl-gutter` | `clamp(16px, 4vw, 56px)` | `custom_value` |
| `Size / Nl P` | `--nl-p` | `96.05vh` | `static_value` |
| `Size / Nl Depth` | `--nl-depth` | `calc(var(--nl-p) * 2.6)` | `custom_value` |
| `Size / Nl Hw` | `--nl-hw` | `min(36vw, 66vh)` | `custom_value` |
| `Size / Nl Ceil` | `--nl-ceil` | `-40vh` | `static_value` |
| `Size / Nl Floor` | `--nl-floor` | `33vh` | `static_value` |
| `Size / Nl T` | `--nl-t` | `9vh` | `static_value` |
| `Size / Nl Z` | `--nl-z` | `calc(var(--i) * var(--nl-depth) * -1)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Noctiluca` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `noctiluca.webp` (image/webp) — https://www.openlanding.page/gallery/noctiluca.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Foyer** (`section-1`, mode: `native-whtml`): (`#nl-foyer`):
2. **I · Blue Hour** (`section-2`, mode: `native-whtml`): "The twenty minutes after the sun." Label: Civil twilight, sun 0° to −6°, ≈ 460 nm, Lisbon June 21:05–21:38.
3. **II · Aurora** (`section-3`, mode: `native-whtml`): "Curtains that answer the solar wind." Label: green line 557.7 nm, red line 630.0 nm, trace Tromsø 10 May 2024.
4. **III · Noctiluca** (`section-4`, mode: `native-whtml`): "The sea, lit from inside." The only room that reacts to the pointer. Label: Noctiluca scintillans, ≈ 474 nm, 0.1 s flashes.
5. **IV · Alpenglow** (`section-5`, mode: `native-whtml`): "The mountain keeps the sun after you lose it." Label: ≈ 610 nm, ≈ 400 km of atmosphere.
6. **V · The Score Room** (`section-6`, mode: `native-whtml`): "Compose the next room."
7. **VI · Visit** (`section-7`, mode: `native-whtml`): "Come in from the street."
8. **Exit** (`section-8`, mode: `native-whtml`): logo with tagline, "The light keeps moving after you leave.", footer nav, address, ©.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Noctiluca Scoped Styles** (`noctiluca-styles-1`, placement: `head`, 34653 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
