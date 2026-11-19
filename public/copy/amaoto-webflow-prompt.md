# Webflow MCP Import Prompt: AMAOTO (amaoto)

Import the **AMAOTO** (Wagasa Atelier) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/amaoto
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/amaoto-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/amaoto.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "amaoto" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "amaoto", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/amaoto-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AMAOTO Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Sumi` | `--color-sumi` | `#1a1613` | `static_value` |
| `Color / Paper` | `--color-paper` | `#f4ecdd` | `static_value` |
| `Color / Sakura` | `--color-sakura` | `#f2b8c6` | `static_value` |
| `Color / Deep Sakura` | `--color-deep-sakura` | `#d9748f` | `static_value` |
| `Color / Vermilion` | `--color-vermilion` | `#c8412b` | `static_value` |
| `Color / Gold` | `--color-gold` | `#b8923a` | `static_value` |
| `Color / Indigo` | `--color-indigo` | `#2b3a55` | `static_value` |
| `Color / Am Section Background` | `--am-section-background` | `color-mix(
    in srgb,
    var(--am-paper) 84%,
    var(--am-sakura)
  )` | `custom_value` |
| `Color / Am Paper` | `--am-paper` | `#f4ecdd` | `static_value` |
| `Color / Am Ink` | `--am-ink` | `#1a1613` | `static_value` |
| `Color / Am Red` | `--am-red` | `#c8412b` | `static_value` |
| `Color / Am Indigo` | `--am-indigo` | `#2b3a55` | `static_value` |
| `Color / Am Gold` | `--am-gold` | `#b8923a` | `static_value` |
| `Color / Am Sakura` | `--am-sakura` | `#f2b8c6` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-shippori)` | Fallback: `serif` |
| `Font / Body` | `--font-body` | `var(--font-zen)` | Fallback: `sans-serif` |
| `Font / Mono` | `--font-mono` | `DM Mono` | Google Font: `DM Mono` |
| `Font / Shippori Mincho` | `--font-shippori-mincho` | `Shippori Mincho` | Google Font: `Shippori Mincho` |
| `Font / Zen Kaku Gothic New` | `--font-zen-kaku-gothic-new` | `Zen Kaku Gothic New` | Google Font: `Zen Kaku Gothic New` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Am Gutter` | `--am-gutter` | `clamp(22px, 5vw, 82px)` | `custom_value` |
| `Size / Am Header H` | `--am-header-h` | `76px` | `static_value` |
| `Size / Am Journey Nav H` | `--am-journey-nav-h` | `76px` | `static_value` |
| `Size / Am Making Strip H` | `--am-making-strip-h` | `76px` | `static_value` |
| `Size / Am Nav Bottom` | `--am-nav-bottom` | `20px` | `static_value` |
| `Size / Am Ui Gap` | `--am-ui-gap` | `12px` | `static_value` |
| `Size / Am Stage H` | `--am-stage-h` | `36svh` | `static_value` |
| `Size / Am Copy Top` | `--am-copy-top` | `calc(
    var(--am-header-h) + 8px + var(--am-stage-h) + var(--am-ui-gap)
  )` | `custom_value` |
| `Size / Am Nav Clearance` | `--am-nav-clearance` | `calc(
    var(--am-journey-nav-h) + var(--am-nav-bottom) + var(--am-ui-gap)
  )` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AMAOTO` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `amaoto.webp` (image/webp) — https://www.openlanding.page/gallery/amaoto.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js App Router template at `/amaoto` for the fictional wagasa atelier AMAOTO in Kurokawa, Nagano. Read the installed Next.js documentation before framework changes. Retain the copy, six part definitions, ten Making ste
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AMAOTO Scoped Styles (Part 1/2)** (`amaoto-styles-1`, placement: `head`, 44981 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AMAOTO Scoped Styles (Part 2/2)** (`amaoto-styles-2`, placement: `head`, 18119 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AMAOTO Interactive Runtime Bridge** (`amaoto-runtime-1`, placement: `footer`, 496 / 45000 chars): Loads three, gsap, lenis in page footer custom code with prefers-reduced-motion guard.
