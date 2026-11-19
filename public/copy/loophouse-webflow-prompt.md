# Webflow MCP Import Prompt: LOOPHOUSE (loophouse)

Import the **LOOPHOUSE** (Workshop & Tool Library) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/loophouse
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/loophouse-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/loophouse.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "loophouse" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "loophouse", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/loophouse-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`LOOPHOUSE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#111618` | `static_value` |
| `Color / Paper` | `--color-paper` | `#F4EFE6` | `static_value` |
| `Color / Accent` | `--color-accent` | `#1E51EB` | `static_value` |
| `Color / Steel` | `--color-steel` | `#7E8A90` | `static_value` |
| `Color / Pine` | `--color-pine` | `#DED7C5` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Chivo` | Google Font: `Chivo` |
| `Font / Body` | `--font-body` | `var(--font-jakarta)` | Fallback: `-apple-system, system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `Chivo Mono` | Google Font: `Chivo Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `LOOPHOUSE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `loophouse.webp` (image/webp) — https://www.openlanding.page/gallery/loophouse.webp (Gallery preview capture)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/loophouse/icon.svg (Template media asset)
- `loophouse-preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/loophouse/loophouse-preview.svg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/loophouse/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Machined Top Bar** (`section-1`, mode: `native-whtml`): Floating bar with brand lockup, live inventory telemetry (`428 tools in circulation · 98.4% return rate`), anchor navigation, and "Reserve a Kit" CTA.
2. **Hero** (`section-2`, mode: `native-whtml`): Perforated pegboard ground, split-line mask headline *"The neighborhood workshop on your block."*, lead copy, live status badge, and dual actions.
3. **The Pegboard Station (Mechanic)** (`section-3`, mode: `native-whtml`): Modular tool wall with category tabs, magnetic tool unlatching, caliper spec inspection, and active requisition tray.
4. **Circulation Route** (`section-4`, mode: `native-whtml`): Four-station workflow with drawn connector hairlines and stamped brass numbers (01 Requisition & Hold, 02 Locker or Bench Pickup, 03 Make & Maintain, 04 Calibrated Restock).
5. **Curated Project Kits** (`section-5`, mode: `native-whtml`): 4 heavy-duty packages (Cabinetmaker Joinery Pack, Timber Framing Rig, Electrician Diagnostics Caddy, Landscape Restoration Kit) with exploded tool manifests and loan duration pills.
6. **Workshop Ledger & Shelf Hosts** (`section-6`, mode: `native-whtml`): Operational metrics, host depot locations, member testimonials with badge numbers, and maintenance records.
7. **Requisition Intake & Bench Reservation Form** (`section-7`, mode: `native-whtml`): Client-side validated form (trade category, member email, loan days slider, workshop safety check) with instantaneous confirmation panel. Never send a network request.
8. **Colophon & Footer** (`section-8`, mode: `native-whtml`): Stamped iron mark, library regulations, copyright.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **LOOPHOUSE Scoped Styles** (`loophouse-styles-1`, placement: `head`, 37747 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
