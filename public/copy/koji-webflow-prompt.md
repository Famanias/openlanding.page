# Webflow MCP Import Prompt: KŌJI (koji)

Import the **KŌJI** (Hospitality & Dining) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/koji
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/koji-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/koji.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "koji" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "koji", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/koji-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KŌJI Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Sumi` | `--color-sumi` | `#1A1918` | `static_value` |
| `Color / Shadow` | `--color-shadow` | `#4A4743` | `static_value` |
| `Color / Beton` | `--color-beton` | `#8E8A83` | `static_value` |
| `Color / Washi` | `--color-washi` | `#EDEAE4` | `static_value` |
| `Color / Shu` | `--color-shu` | `#C8331F` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-dela-gothic)` | Fallback: `Arial Black, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-zen-kaku)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `DM Mono` | Google Font: `DM Mono` |
| `Font / Dela Gothic One` | `--font-dela-gothic-one` | `Dela Gothic One` | Google Font: `Dela Gothic One` |
| `Font / Zen Kaku Gothic New` | `--font-zen-kaku-gothic-new` | `Zen Kaku Gothic New` | Google Font: `Zen Kaku Gothic New` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `clamp(16px, 4vw, 64px)` | `custom_value` |
| `Size / Topbar` | `--topbar` | `72px` | `static_value` |
| `Size / Rule` | `--rule` | `3px solid var(--color-sumi)` | `custom_value` |
| `Size / Board Marks` | `--board-marks` | `repeating-linear-gradient(180deg, transparent 0 58px, color-mix(in oklab, var(--color-sumi) 14%, transparent) 58px 60px),
    repeating-linear-gradient(90deg, transparent 0 3px, color-mix(in oklab, var(--color-washi) 5%, transparent) 3px 4px, transparent 4px 11px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KŌJI` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `koji.webp` (image/webp) — https://www.openlanding.page/gallery/koji.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Sticky 72px top bar** (`section-1`, mode: `native-whtml`): (sumi): the hanko plus "KŌJI 麹", and on the right a **noren curtain** nav. That's five hanging shadow-grey panels split by slits, each with kanji (厨房 献立 塔 板前 予約), an English label from 900px up, and a 4px shu hem. On hover a panel turns shu and drops 4px.
2. **Hero** (`section-2`, mode: `native-whtml`): (sumi):
3. **Kitchen** (`section-3`, mode: `native-whtml`): (béton slab): "Fermentation is the kitchen." Three pillars, each with giant kanji: 麹 Kōji, 味噌 Miso, 塩 Shio. Two photos.
4. **Omakase** (`section-4`, mode: `native-whtml`): (sumi): "Eleven courses. One counter." The **food flight** (below), then a menu card with the hanko, "Autumn menu · ¥38,000", and 11 courses in 5 groups in mono:
5. **Building** (`section-5`, mode: `native-whtml`): (washi): a tower photo, "A tower built to be rebuilt.", the Metabolist idea (a core with plug-in capsules), a facts list.
6. **Chef** (`section-6`, mode: `native-whtml`): (sumi): "Ren Ishikawa.", a pull quote with a 6px shu left rule, photo.
7. **Reserve** (`section-7`, mode: `native-whtml`): (béton): "Twelve seats. Two seatings." A washi form card with these fields:
8. **Footer** (`section-8`, mode: `native-whtml`): (sumi, shu top rule): the hanko plus wordmark, address, hours, contact.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KŌJI Scoped Styles** (`koji-styles-1`, placement: `head`, 18498 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KŌJI Interactive Runtime Bridge** (`koji-runtime-1`, placement: `footer`, 341 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
