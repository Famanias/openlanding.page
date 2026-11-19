# Webflow MCP Import Prompt: LENUS (lenus)

Import the **LENUS** (Creative Studio & Immersive Experiences) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/lenus
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/lenus-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/lenus.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "lenus" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "lenus", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/lenus-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`LENUS Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ln Midnight` | `--color-ln-midnight` | `#08090D` | `static_value` |
| `Color / Ln Cosmos` | `--color-ln-cosmos` | `#10131C` | `static_value` |
| `Color / Ln Glass` | `--color-ln-glass` | `#161924` | `static_value` |
| `Color / Ln White` | `--color-ln-white` | `#F8FAFC` | `static_value` |
| `Color / Ln Muted` | `--color-ln-muted` | `#9499A6` | `static_value` |
| `Color / Ln Lime` | `--color-ln-lime` | `#D2F802` | `static_value` |
| `Color / Ln Violet` | `--color-ln-violet` | `#A855F7` | `static_value` |
| `Color / Ln Emerald` | `--color-ln-emerald` | `#00E599` | `static_value` |
| `Color / Ln Button Ink` | `--color-ln-button-ink` | `#0A0B0E` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Ln Heading` | `--font-ln-heading` | `var(--font-ln-display)` | Fallback: `sans-serif` |
| `Font / Ln Body` | `--font-ln-body` | `var(--font-ln-sans)` | Fallback: `system-ui, sans-serif` |
| `Font / Ln Data` | `--font-ln-data` | `var(--font-ln-mono)` | Fallback: `monospace` |
| `Font / Archivo` | `--font-archivo` | `Archivo` | Google Font: `Archivo` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `LENUS` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `lenus.webp` (image/webp) — https://www.openlanding.page/gallery/lenus.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js 16 / React 19 / TypeScript / Tailwind CSS creative-studio hero at `/lenus`. Use `three` and `lucide-react`. All imports must remain inside `src/app/(lenus)/` or npm packages. No external 3D assets or HDR downloads.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **LENUS Scoped Styles** (`lenus-styles-1`, placement: `head`, 41341 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **LENUS Interactive Runtime Bridge** (`lenus-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
