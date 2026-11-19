# Webflow MCP Import Prompt: CHINAGRAPH (chinagraph)

Import the **CHINAGRAPH** (Fashion & Apparel) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/chinagraph
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/chinagraph-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/chinagraph.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "chinagraph" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "chinagraph", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/chinagraph-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`CHINAGRAPH Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Film` | `--color-film` | `#0C0C0B` | `static_value` |
| `Color / Flash` | `--color-flash` | `#F4F3EF` | `static_value` |
| `Color / Grease` | `--color-grease` | `#F3C318` | `static_value` |
| `Color / Cg Muted` | `--cg-muted` | `color-mix(in srgb, var(--color-flash) 66%, var(--color-film))` | `custom_value` |
| `Color / Cg Faint` | `--cg-faint` | `color-mix(in srgb, var(--color-flash) 22%, transparent)` | `custom_value` |
| `Color / Cg Line` | `--cg-line` | `color-mix(in srgb, var(--color-flash) 16%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Big Shoulders` | Google Font: `Big Shoulders` |
| `Font / Body` | `--font-body` | `Public Sans` | Google Font: `Public Sans` |
| `Font / Mono` | `--font-mono` | `Overpass Mono` | Google Font: `Overpass Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `32px` | `static_value` |
| `Size / Cg Gutter` | `--cg-gutter` | `clamp(16px, 3.5vw, 48px)` | `custom_value` |
| `Size / Cg Container` | `--cg-container` | `1440px` | `static_value` |
| `Size / Cg Header` | `--cg-header` | `64px` | `static_value` |
| `Size / Cg R Sm` | `--cg-r-sm` | `2px` | `static_value` |
| `Size / Cg R` | `--cg-r` | `4px` | `static_value` |
| `Size / In` | `--in` | `clamp(0, calc((var(--arrive, 1) - 0.55) * 2.4), 1)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `CHINAGRAPH` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `chinagraph.webp` (image/webp) — https://www.openlanding.page/gallery/chinagraph.webp (Gallery preview capture)
- `cloth-01-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-01-1600.avif (Template media asset)
- `cloth-01-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-01-1600.webp (Template media asset)
- `cloth-01-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-01-800.avif (Template media asset)
- `cloth-01-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-01-800.webp (Template media asset)
- `cloth-02-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-02-1600.avif (Template media asset)
- `cloth-02-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-02-1600.webp (Template media asset)
- `cloth-02-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-02-800.avif (Template media asset)
- `cloth-02-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-02-800.webp (Template media asset)
- `cloth-03-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-03-1600.avif (Template media asset)
- `cloth-03-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-03-1600.webp (Template media asset)
- `cloth-03-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-03-800.avif (Template media asset)
- `cloth-03-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-03-800.webp (Template media asset)
- `cloth-04-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-04-1600.avif (Template media asset)
- `cloth-04-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-04-1600.webp (Template media asset)
- `cloth-04-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/cloth-04-800.avif (Template media asset)
- `cloth-04-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/cloth-04-800.webp (Template media asset)
- `detail-01-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-01-1600.avif (Template media asset)
- `detail-01-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-01-1600.webp (Template media asset)
- `detail-01-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-01-800.avif (Template media asset)
- `detail-01-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-01-800.webp (Template media asset)
- `detail-02-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-02-1600.avif (Template media asset)
- `detail-02-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-02-1600.webp (Template media asset)
- `detail-02-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-02-800.avif (Template media asset)
- `detail-02-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-02-800.webp (Template media asset)
- `detail-03-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-03-1600.avif (Template media asset)
- `detail-03-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-03-1600.webp (Template media asset)
- `detail-03-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-03-800.avif (Template media asset)
- `detail-03-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-03-800.webp (Template media asset)
- `detail-04-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-04-1600.avif (Template media asset)
- `detail-04-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-04-1600.webp (Template media asset)
- `detail-04-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-04-800.avif (Template media asset)
- `detail-04-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-04-800.webp (Template media asset)
- `detail-05-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-05-1600.avif (Template media asset)
- `detail-05-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-05-1600.webp (Template media asset)
- `detail-05-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-05-800.avif (Template media asset)
- `detail-05-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-05-800.webp (Template media asset)
- `detail-06-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-06-1600.avif (Template media asset)
- `detail-06-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-06-1600.webp (Template media asset)
- `detail-06-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/detail-06-800.avif (Template media asset)
- `detail-06-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/detail-06-800.webp (Template media asset)
- `flat-01-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-01-1600.avif (Template media asset)
- `flat-01-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-01-1600.webp (Template media asset)
- `flat-01-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-01-800.avif (Template media asset)
- `flat-01-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-01-800.webp (Template media asset)
- `flat-02-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-02-1600.avif (Template media asset)
- `flat-02-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-02-1600.webp (Template media asset)
- `flat-02-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-02-800.avif (Template media asset)
- `flat-02-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-02-800.webp (Template media asset)
- `flat-03-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-03-1600.avif (Template media asset)
- `flat-03-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-03-1600.webp (Template media asset)
- `flat-03-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-03-800.avif (Template media asset)
- `flat-03-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-03-800.webp (Template media asset)
- `flat-04-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-04-1600.avif (Template media asset)
- `flat-04-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-04-1600.webp (Template media asset)
- `flat-04-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-04-800.avif (Template media asset)
- `flat-04-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-04-800.webp (Template media asset)
- `flat-05-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-05-1600.avif (Template media asset)
- `flat-05-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-05-1600.webp (Template media asset)
- `flat-05-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-05-800.avif (Template media asset)
- `flat-05-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-05-800.webp (Template media asset)
- `flat-06-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-06-1600.avif (Template media asset)
- `flat-06-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-06-1600.webp (Template media asset)
- `flat-06-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/flat-06-800.avif (Template media asset)
- `flat-06-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/flat-06-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/preview-1600.webp (Template media asset)
- `roll-01-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-01-1600.avif (Template media asset)
- `roll-01-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-01-1600.webp (Template media asset)
- `roll-01-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-01-800.avif (Template media asset)
- `roll-01-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-01-800.webp (Template media asset)
- `roll-02-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-02-1600.avif (Template media asset)
- `roll-02-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-02-1600.webp (Template media asset)
- `roll-02-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-02-800.avif (Template media asset)
- `roll-02-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-02-800.webp (Template media asset)
- `roll-03-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-03-1600.avif (Template media asset)
- `roll-03-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-03-1600.webp (Template media asset)
- `roll-03-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-03-800.avif (Template media asset)
- `roll-03-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-03-800.webp (Template media asset)
- `roll-04-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-04-1600.avif (Template media asset)
- `roll-04-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-04-1600.webp (Template media asset)
- `roll-04-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-04-800.avif (Template media asset)
- `roll-04-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-04-800.webp (Template media asset)
- `roll-05-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-05-1600.avif (Template media asset)
- `roll-05-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-05-1600.webp (Template media asset)
- `roll-05-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-05-800.avif (Template media asset)
- `roll-05-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-05-800.webp (Template media asset)
- `roll-06-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-06-1600.avif (Template media asset)
- `roll-06-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-06-1600.webp (Template media asset)
- `roll-06-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-06-800.avif (Template media asset)
- `roll-06-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-06-800.webp (Template media asset)
- `roll-07-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-07-1600.avif (Template media asset)
- `roll-07-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-07-1600.webp (Template media asset)
- `roll-07-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-07-800.avif (Template media asset)
- `roll-07-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-07-800.webp (Template media asset)
- `roll-08-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-08-1600.avif (Template media asset)
- `roll-08-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-08-1600.webp (Template media asset)
- `roll-08-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-08-800.avif (Template media asset)
- `roll-08-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-08-800.webp (Template media asset)
- `roll-09-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-09-1600.avif (Template media asset)
- `roll-09-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-09-1600.webp (Template media asset)
- `roll-09-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-09-800.avif (Template media asset)
- `roll-09-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-09-800.webp (Template media asset)
- `roll-10-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-10-1600.avif (Template media asset)
- `roll-10-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-10-1600.webp (Template media asset)
- `roll-10-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-10-800.avif (Template media asset)
- `roll-10-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-10-800.webp (Template media asset)
- `roll-11-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-11-1600.avif (Template media asset)
- `roll-11-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-11-1600.webp (Template media asset)
- `roll-11-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-11-800.avif (Template media asset)
- `roll-11-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-11-800.webp (Template media asset)
- `roll-12-1600.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-12-1600.avif (Template media asset)
- `roll-12-1600.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-12-1600.webp (Template media asset)
- `roll-12-800.avif` (image/avif) — https://www.openlanding.page/templates/chinagraph/roll-12-800.avif (Template media asset)
- `roll-12-800.webp` (image/webp) — https://www.openlanding.page/templates/chinagraph/roll-12-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): logo, a live **frame counter** ("Frame 04 / 12"), nav (Sheet, Looks, Cloth, Shop, Request) with one yellow indicator that slides, and a **Bag** button with a count that pops and a popover (lines, remove, subtotal, "checkout off in this template"). Hides on scroll-down, inverts to light over the shop, yellow progress hairline. Below 1080 px a full-screen menu opening with a clip-path circle.
2. **Sheet (`#sheet`, the hero)** (`section-2`, mode: `native-whtml`): left: eyebrow, h1 "Marked / for keeps.", lead, CTAs (See the six looks, Shop the collection), counter cue. Right: the contact sheet: flash-white paper, a header row ("Chinagraph 120 · Roll 07 · 12 exp · pushed +1"), three black film strips of four square frames with mono edge print above and below, frame numbers, and a yellow `GreaseLoop` SVG (pathLength 1, tilted per frame) round each select. A loupe ring with crosshair ticks.
3. **Looks (`#looks`)** (`section-3`, mode: `native-whtml`): six full-bleed looks (Box Coat £640 navy melton, Work Jacket £420 black waxed cotton, Pleat Trouser £290 charcoal flannel, Rollneck £260 bone boiled wool, DB Suit £980 rain-grey gabardine, Car Coat £1,120 oxblood leather offcuts), each with a mini 12-square rail circling its frame, "Look 02 · Frame 04 / 12", a giant name, cloth / origin / price, a note, a "Shop the …" button and a close-crop detail card.
4. **Cloth (`#cloth`)** (`section-4`, mode: `native-whtml`): "Cut from what was left.", a counter to **1,140 m** of deadstock, a horizontal snap strip of four macros (Melton, Huddersfield 1968, 420 m; Waxed cotton, Dundee 1994, 260 m; Flannel, Biella 2011, 300 m; Gabardine, Lancashire 1979, 160 m) with drag on fine pointers and arrow buttons.
5. **Shop (`#shop`, flash-white)** (`section-5`, mode: `native-whtml`): six product cards: flat lay that wipes to the on-model roll frame (hover on fine pointers, or an "On model" toggle everywhere), native radio size chips with sold-out sizes disabled and struck, an add button that goes "Pick a size" → "Add to bag · £640" → "Adding" → "In the bag ✓". One in-memory bag store (`useSyncExternalStore` + a tested reducer).
6. **Request (`#request`)** (`section-6`, mode: `native-whtml`): "Get the sheet in the post." A form (name, email, street, city, country select, "who is it for" chips) with local validation, a one-shot shake and focus on the first error; submit → "Exposing" → a print slip ("It's on the drying line.", run number `No. 0412` from a stable hash, rows printing in, a yellow loop drawn round KEEP). No network request.
7. **Footer** (`section-7`, mode: `native-whtml`): a film-edge marquee, stockists (London studio, Antwerp, Copenhagen, Tokyo), links, small print ("fictional label, AI-generated photographs"), a giant wordmark.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **CHINAGRAPH Scoped Styles (Part 1/2)** (`chinagraph-styles-1`, placement: `head`, 44998 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **CHINAGRAPH Scoped Styles (Part 2/2)** (`chinagraph-styles-2`, placement: `head`, 4142 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **CHINAGRAPH Interactive Runtime Bridge** (`chinagraph-runtime-1`, placement: `footer`, 347 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
