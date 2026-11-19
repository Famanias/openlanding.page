# Webflow MCP Import Prompt: Maison Vérane (verane)

Import the **Maison Vérane** (Haute Parfumerie) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/verane
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/verane-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/verane.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "verane" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "verane", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/verane-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Maison Vérane Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Oud` | `--color-oud` | `#2A1E22` | `static_value` |
| `Color / Calcaire` | `--color-calcaire` | `#E3DFD8` | `static_value` |
| `Color / Orris` | `--color-orris` | `#655A7E` | `static_value` |
| `Color / Gilt` | `--color-gilt` | `#B59A6A` | `static_value` |
| `Color / Veil` | `--color-veil` | `#CFC9C0` | `static_value` |
| `Color / Ash` | `--color-ash` | `#5F5753` | `static_value` |
| `Color / Rule Color` | `--rule-color` | `color-mix(in srgb, var(--color-ash) 35%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Bodoni Moda` | Google Font: `Bodoni Moda` |
| `Font / Body` | `--font-body` | `Hanken Grotesk` | Google Font: `Hanken Grotesk` |
| `Font / Mono` | `--font-mono` | `var(--font-spline-mono)` | Fallback: `ui-monospace, Menlo, monospace` |
| `Font / Spline Sans Mono` | `--font-spline-sans-mono` | `Spline Sans Mono` | Google Font: `Spline Sans Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Topbar H` | `--topbar-h` | `68px` | `static_value` |
| `Size / Gutter` | `--gutter` | `clamp(20px, 4.5vw, 72px)` | `custom_value` |
| `Size / Wrap Max` | `--wrap-max` | `1320px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Maison Vérane` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `verane.webp` (image/webp) — https://www.openlanding.page/gallery/verane.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): sticky Calcaire bar, dynamic draining mark, nav anchors, live readout "H 03:20", appointment CTA.
2. **Hero** (`section-2`, mode: `native-whtml`): 16:9 full-bleed photo (`hero-flacon`), Oud shadow scrim, display headline with italic turn.
3. **The Dry-Down** (`section-3`, mode: `hybrid-embed`): pinned laboratory stage (flacon + note pyramid + scrubber + fragrance switcher).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **The Hours** (`section-4`, mode: `native-whtml`): four annual editions (Nº 1 Première Heure, Nº 2 Iris Calcaire, Nº 3 Fumée Lente, Nº 4 Nuit d'Oratoire) with individual notes, maceration records, and dry-down strips.
5. **The Organ** (`section-5`, mode: `native-whtml`): interactive three-tier raw material composer with instant formula derivation.
6. **The Atelier** (`section-6`, mode: `native-whtml`): four key numbers (312 raw materials, 18 mo. maceration, 400 flacons, 4 editions), three botanical plates, the Maceration Ledger table, and the Iris fields banner.
7. **Appointments** (`section-7`, mode: `native-whtml`): dark Oud chapter with salon protocol details, location info, and client-side validated booking form with accessible success feedback.
8. **Footer** (`section-8`, mode: `native-whtml`): brand colophon, anchors, Grasse legal registry.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Maison Vérane Scoped Styles** (`verane-styles-1`, placement: `head`, 10819 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
