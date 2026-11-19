# Webflow MCP Import Prompt: Waypoint (waypoint)

Import the **Waypoint** (Career & Recruiting) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/waypoint
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/waypoint-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/waypoint.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "waypoint" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "waypoint", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/waypoint-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Waypoint Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Wyp Canvas` | `--color-wyp-canvas` | `#ede6df` | `static_value` |
| `Color / Wyp Hero` | `--color-wyp-hero` | `#f5efeb` | `static_value` |
| `Color / Wyp Surface Tint` | `--color-wyp-surface-tint` | `#e5ddd4` | `static_value` |
| `Color / Wyp Card` | `--color-wyp-card` | `#ffffff` | `static_value` |
| `Color / Wyp Card Subtle` | `--color-wyp-card-subtle` | `#faf8f5` | `static_value` |
| `Color / Wyp Obsidian` | `--color-wyp-obsidian` | `#121417` | `static_value` |
| `Color / Wyp Charcoal` | `--color-wyp-charcoal` | `#2b2f38` | `static_value` |
| `Color / Wyp Slate` | `--color-wyp-slate` | `#666e7d` | `static_value` |
| `Color / Wyp Sage` | `--color-wyp-sage` | `#d8eadf` | `static_value` |
| `Color / Wyp Sky` | `--color-wyp-sky` | `#dbe8fa` | `static_value` |
| `Color / Wyp Apricot` | `--color-wyp-apricot` | `#fce8dc` | `static_value` |
| `Color / Wyp Lavender` | `--color-wyp-lavender` | `#ece6f6` | `static_value` |
| `Color / Wyp Colophon` | `--color-wyp-colophon` | `#16181d` | `static_value` |
| `Color / Wyp Paper` | `--wyp-paper` | `#f5efeb` | `static_value` |
| `Color / Wyp Line` | `--wyp-line` | `#d8d0c5` | `static_value` |
| `Color / Wyp Muted` | `--wyp-muted` | `#666e7d` | `static_value` |
| `Color / Wyp Ink` | `--wyp-ink` | `#121417` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-jakarta)` | Fallback: `system-ui, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-jakarta)` | Fallback: `system-ui, sans-serif` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Waypoint` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `waypoint.webp` (image/webp) — https://www.openlanding.page/gallery/waypoint.webp (Gallery preview capture)
- `hero-bg-1920.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/hero-bg-1920.webp (Template media asset)
- `hero-bg.jpg` (image/jpeg) — https://www.openlanding.page/templates/waypoint/hero-bg.jpg (Template media asset)
- `hero-bg.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/hero-bg.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/preview-1600.webp (Template media asset)
- `topographic-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/topographic-1600.webp (Template media asset)
- `topographic-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/topographic-800.webp (Template media asset)
- `waypoint-01-hero-dashboard-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-01-hero-dashboard-1600.webp (Template media asset)
- `waypoint-01-hero-dashboard-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-01-hero-dashboard-800.webp (Template media asset)
- `waypoint-02-pipeline-board-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-02-pipeline-board-1600.webp (Template media asset)
- `waypoint-02-pipeline-board-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-02-pipeline-board-800.webp (Template media asset)
- `waypoint-03-candidate-profile-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-03-candidate-profile-1600.webp (Template media asset)
- `waypoint-03-candidate-profile-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-03-candidate-profile-800.webp (Template media asset)
- `waypoint-04-outreach-workspace-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-04-outreach-workspace-1600.webp (Template media asset)
- `waypoint-04-outreach-workspace-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-04-outreach-workspace-800.webp (Template media asset)
- `waypoint-05-insights-dashboard-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-05-insights-dashboard-1600.webp (Template media asset)
- `waypoint-05-insights-dashboard-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-05-insights-dashboard-800.webp (Template media asset)
- `waypoint-06-ui-fragments-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-06-ui-fragments-1600.webp (Template media asset)
- `waypoint-06-ui-fragments-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-06-ui-fragments-800.webp (Template media asset)
- `waypoint-07-mobile-screens-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-07-mobile-screens-1600.webp (Template media asset)
- `waypoint-07-mobile-screens-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-07-mobile-screens-800.webp (Template media asset)
- `waypoint-08-topographic-background-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-08-topographic-background-1600.webp (Template media asset)
- `waypoint-08-topographic-background-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-08-topographic-background-800.webp (Template media asset)
- `waypoint-09-feature-collage-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-09-feature-collage-1600.webp (Template media asset)
- `waypoint-09-feature-collage-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-09-feature-collage-800.webp (Template media asset)
- `waypoint-10-journal-workspace-1600.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-10-journal-workspace-1600.webp (Template media asset)
- `waypoint-10-journal-workspace-800.webp` (image/webp) — https://www.openlanding.page/templates/waypoint/waypoint-10-journal-workspace-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Brand Identity** (`section-1`, mode: `native-whtml`): Waypoint ("Pitch with intention. Land the offer."). The calm, systematic direct-outreach pipeline for senior engineers and product designers.
2. **Color Palette** (`section-2`, mode: `hybrid-embed`): - Background Canvas: Light Pastel Brown (`#EDE6DF` / `#F5EFEB`).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
3. **Sections** (`section-3`, mode: `native-whtml`): - Floating glass header with brand lockup, section navigation, and sign-in controls.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Waypoint Scoped Styles (Part 1/2)** (`waypoint-styles-1`, placement: `head`, 44970 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Waypoint Scoped Styles (Part 2/2)** (`waypoint-styles-2`, placement: `head`, 6463 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Waypoint Interactive Runtime Bridge** (`waypoint-runtime-1`, placement: `footer`, 336 / 45000 chars): Loads gsap in page footer custom code with prefers-reduced-motion guard.
