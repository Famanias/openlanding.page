# Webflow MCP Import Prompt: Poppy Patch (poppypatch)

Import the **Poppy Patch** (Food & Agriculture) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/poppypatch
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/poppypatch-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/poppypatch.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "poppypatch" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "poppypatch", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/poppypatch-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Poppy Patch Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg Vanilla` | `--bg-vanilla` | `#F7ECD6` | `static_value` |
| `Color / Bg Vanilla Soft` | `--bg-vanilla-soft` | `#FAF3E3` | `static_value` |
| `Color / Bg Card Cream` | `--bg-card-cream` | `#FBF6EA` | `static_value` |
| `Color / Coral Primary` | `--coral-primary` | `#E58267` | `static_value` |
| `Color / Coral Deep` | `--coral-deep` | `#D96E52` | `static_value` |
| `Color / Coral Tint` | `--coral-tint` | `#F7D4C8` | `static_value` |
| `Color / Pistachio` | `--pistachio` | `#A8B96C` | `static_value` |
| `Color / Pistachio Tint` | `--pistachio-tint` | `#E2EAC7` | `static_value` |
| `Color / Lilac` | `--lilac` | `#E3B6E0` | `static_value` |
| `Color / Lilac Tint` | `--lilac-tint` | `#F3E2F2` | `static_value` |
| `Color / Cocoa Ink` | `--cocoa-ink` | `#4A2E25` | `static_value` |
| `Color / Cocoa Muted` | `--cocoa-muted` | `#735449` | `static_value` |
| `Color / Warm Shadow` | `--warm-shadow` | `#C3A58E` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Fraunces` | `--font-fraunces` | `Fraunces` | Google Font: `Fraunces` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / Caveat` | `--font-caveat` | `Caveat` | Google Font: `Caveat` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Poppy Patch` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `poppypatch.webp` (image/webp) — https://www.openlanding.page/gallery/poppypatch.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a playful, tactile landing page for Poppy Patch, an at-home mushroom growing kit brand. Use a warm vanilla and terracotta palette (#F7ECD6, #FAF3E3, #FBF6EA, #E58267, #D96E52, #F7D4C8, #A8B96C, #E3B6E0, #4A2E25, #735449), Fraunces ser

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Poppy Patch Scoped Styles** (`poppypatch-styles-1`, placement: `head`, 5534 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Poppy Patch Interactive Runtime Bridge** (`poppypatch-runtime-1`, placement: `footer`, 275 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
