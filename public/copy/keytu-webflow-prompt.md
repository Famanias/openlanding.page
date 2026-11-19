# Webflow MCP Import Prompt: KEYTU (keytu)

Import the **KEYTU** (Apparel & Goods) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/keytu
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/keytu-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/keytu.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "keytu" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "keytu", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/keytu-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KEYTU Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Black` | `--color-black` | `#0B0C0E` | `static_value` |
| `Color / Navy` | `--color-navy` | `#0F1E33` | `static_value` |
| `Color / White` | `--color-white` | `#F5F6F7` | `static_value` |
| `Color / Navy 1` | `--color-navy-1` | `#16294A` | `static_value` |
| `Color / Navy 2` | `--color-navy-2` | `#2A3D5E` | `static_value` |
| `Color / Navy 3` | `--color-navy-3` | `#56657F` | `static_value` |
| `Color / Navy 4` | `--color-navy-4` | `#A5AEBD` | `static_value` |
| `Color / Navy 5` | `--color-navy-5` | `#DDE1E7` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Barlow` | Google Font: `Barlow` |
| `Font / Body` | `--font-body` | `var(--font-barlow)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-plex-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / Barlow Condensed` | `--font-barlow-condensed` | `Barlow Condensed` | Google Font: `Barlow Condensed` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `clamp(20px, 4vw, 64px)` | `custom_value` |
| `Size / Topbar` | `--topbar` | `68px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KEYTU` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `keytu.webp` (image/webp) — https://www.openlanding.page/gallery/keytu.webp (Gallery preview capture)
- `basecamp-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/basecamp-1600.avif (Template media asset)
- `basecamp-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/basecamp-1600.webp (Template media asset)
- `basecamp-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/basecamp-800.avif (Template media asset)
- `basecamp-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/basecamp-800.webp (Template media asset)
- `fabric-down-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/fabric-down-1600.avif (Template media asset)
- `fabric-down-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/fabric-down-1600.webp (Template media asset)
- `fabric-down-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/fabric-down-800.avif (Template media asset)
- `fabric-down-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/fabric-down-800.webp (Template media asset)
- `fabric-shell-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/fabric-shell-1600.avif (Template media asset)
- `fabric-shell-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/fabric-shell-1600.webp (Template media asset)
- `fabric-shell-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/fabric-shell-800.avif (Template media asset)
- `fabric-shell-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/fabric-shell-800.webp (Template media asset)
- `hero-k2-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/hero-k2-1600.avif (Template media asset)
- `hero-k2-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/hero-k2-1600.webp (Template media asset)
- `hero-k2-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/hero-k2-800.avif (Template media asset)
- `hero-k2-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/hero-k2-800.webp (Template media asset)
- `lookbook-1-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-1-1600.avif (Template media asset)
- `lookbook-1-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-1-1600.webp (Template media asset)
- `lookbook-1-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-1-800.avif (Template media asset)
- `lookbook-1-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-1-800.webp (Template media asset)
- `lookbook-2-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-2-1600.avif (Template media asset)
- `lookbook-2-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-2-1600.webp (Template media asset)
- `lookbook-2-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-2-800.avif (Template media asset)
- `lookbook-2-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-2-800.webp (Template media asset)
- `lookbook-3-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-3-1600.avif (Template media asset)
- `lookbook-3-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-3-1600.webp (Template media asset)
- `lookbook-3-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-3-800.avif (Template media asset)
- `lookbook-3-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-3-800.webp (Template media asset)
- `lookbook-4-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-4-1600.avif (Template media asset)
- `lookbook-4-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-4-1600.webp (Template media asset)
- `lookbook-4-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/lookbook-4-800.avif (Template media asset)
- `lookbook-4-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/lookbook-4-800.webp (Template media asset)
- `product-base-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-base-1600.avif (Template media asset)
- `product-base-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-base-1600.webp (Template media asset)
- `product-base-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-base-800.avif (Template media asset)
- `product-base-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-base-800.webp (Template media asset)
- `product-down-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-down-1600.avif (Template media asset)
- `product-down-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-down-1600.webp (Template media asset)
- `product-down-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-down-800.avif (Template media asset)
- `product-down-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-down-800.webp (Template media asset)
- `product-hands-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-hands-1600.avif (Template media asset)
- `product-hands-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-hands-1600.webp (Template media asset)
- `product-hands-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-hands-800.avif (Template media asset)
- `product-hands-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-hands-800.webp (Template media asset)
- `product-mid-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-mid-1600.avif (Template media asset)
- `product-mid-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-mid-1600.webp (Template media asset)
- `product-mid-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-mid-800.avif (Template media asset)
- `product-mid-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-mid-800.webp (Template media asset)
- `product-shell-black-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-black-1600.avif (Template media asset)
- `product-shell-black-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-black-1600.webp (Template media asset)
- `product-shell-black-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-black-800.avif (Template media asset)
- `product-shell-black-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-black-800.webp (Template media asset)
- `product-shell-navy-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-navy-1600.avif (Template media asset)
- `product-shell-navy-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-navy-1600.webp (Template media asset)
- `product-shell-navy-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-navy-800.avif (Template media asset)
- `product-shell-navy-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-navy-800.webp (Template media asset)
- `product-shell-white-1600.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-white-1600.avif (Template media asset)
- `product-shell-white-1600.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-white-1600.webp (Template media asset)
- `product-shell-white-800.avif` (image/avif) — https://www.openlanding.page/templates/keytu/product-shell-white-800.avif (Template media asset)
- `product-shell-white-800.webp` (image/webp) — https://www.openlanding.page/templates/keytu/product-shell-white-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Top bar** (`section-1`, mode: `native-whtml`): (fixed, 68px, solid black): logo, section links, outline "Expedition list" button.
2. **Hero** (`section-2`, mode: `native-whtml`): (100svh): K2 photo under a black gradient. Bottom-left: mono kicker, display h1 "Built above the treeline.", lead paragraph, buttons "Begin the ascent" (solid white) and "Expedition lookbook" (outline).
3. **The ascent** (`section-3`, mode: `native-whtml`): - **Desktop:** two columns. The left is a `position: sticky` stage (100svh under the bar). The right holds 7 chapters, each at least 100svh.
4. **Footer** (`section-4`, mode: `native-whtml`): ## The stage

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KEYTU Scoped Styles** (`keytu-styles-1`, placement: `head`, 23611 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KEYTU Interactive Runtime Bridge** (`keytu-runtime-1`, placement: `footer`, 422 / 45000 chars): Loads gsap, lenis, motion in page footer custom code with prefers-reduced-motion guard.
