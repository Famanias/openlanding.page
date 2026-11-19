# Webflow MCP Import Prompt: POSTMARK (postmark)

Import the **POSTMARK** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/postmark
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/postmark-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/postmark.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "postmark" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "postmark", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/postmark-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`POSTMARK Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Pm Paper` | `--pm-paper` | `#F7F1E8` | `static_value` |
| `Color / Pm Hero Paper` | `--pm-hero-paper` | `#F8F3EA` | `static_value` |
| `Color / Pm Ivory` | `--pm-ivory` | `#FFF9EF` | `static_value` |
| `Color / Pm Parchment` | `--pm-parchment` | `#E8DDCA` | `static_value` |
| `Color / Pm Tan` | `--pm-tan` | `#D8BD96` | `static_value` |
| `Color / Pm Ink` | `--pm-ink` | `#25292C` | `static_value` |
| `Color / Pm Ink Muted` | `--pm-ink-muted` | `#52565A` | `static_value` |
| `Color / Pm Brown` | `--pm-brown` | `#5A3528` | `static_value` |
| `Color / Pm Red` | `--pm-red` | `#D85743` | `static_value` |
| `Color / Pm Red Deep` | `--pm-red-deep` | `#AD4837` | `static_value` |
| `Color / Pm Peach` | `--pm-peach` | `#F2C7A3` | `static_value` |
| `Color / Pm Sky` | `--pm-sky` | `#8FC3E6` | `static_value` |
| `Color / Pm Butter` | `--pm-butter` | `#F4E07A` | `static_value` |
| `Color / Pm Teal` | `--pm-teal` | `#77978B` | `static_value` |
| `Color / Pm Fine Line` | `--pm-fine-line` | `rgba(90, 53, 40, 0.23)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Caveat` | `--font-caveat` | `Caveat` | Google Font: `Caveat` |
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Fraunces` | `--font-fraunces` | `Fraunces` | Google Font: `Fraunces` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Pm Soft Shadow` | `--pm-soft-shadow` | `0 18px 48px rgba(75, 52, 35, 0.12)` | `static_value` |
| `Size / Pm Card Shadow` | `--pm-card-shadow` | `0 10px 28px rgba(62, 41, 26, 0.11), 0 2px 6px rgba(62, 41, 26, 0.07)` | `static_value` |
| `Size / Pm Lifted Shadow` | `--pm-lifted-shadow` | `0 24px 52px rgba(62, 41, 26, 0.18), 0 6px 14px rgba(62, 41, 26, 0.10)` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `POSTMARK` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `postmark.webp` (image/webp) — https://www.openlanding.page/gallery/postmark.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **POSTMARK Scoped Styles** (`postmark-styles-1`, placement: `head`, 7031 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **POSTMARK Interactive Runtime Bridge** (`postmark-runtime-1`, placement: `footer`, 272 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
