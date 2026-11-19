# Webflow MCP Import Prompt: Satsuma (satsuma)

Import the **Satsuma** (Creator Marketplace) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/satsuma
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/satsuma-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/satsuma.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "satsuma" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "satsuma", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/satsuma-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Satsuma Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#FFF6EA` | `static_value` |
| `Color / Ink` | `--color-ink` | `#1F1520` | `static_value` |
| `Color / Aubergine` | `--color-aubergine` | `#3A1D4A` | `static_value` |
| `Color / Satsuma` | `--color-satsuma` | `#FF7A2F` | `static_value` |
| `Color / Apricot` | `--color-apricot` | `#FFD9B0` | `static_value` |
| `Color / Leaf` | `--color-leaf` | `#2F5D3A` | `static_value` |
| `Color / Sa Muted` | `--sa-muted` | `color-mix(in srgb, var(--color-ink) 68%, var(--color-paper))` | `custom_value` |
| `Color / Sa Hair` | `--sa-hair` | `color-mix(in srgb, var(--color-ink) 14%, transparent)` | `custom_value` |
| `Color / Sa Card` | `--sa-card` | `color-mix(in srgb, var(--color-paper) 55%, white)` | `custom_value` |
| `Color / Sa Tint` | `--sa-tint` | `color-mix(in srgb, var(--color-apricot) 38%, var(--color-paper))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Sa Display` | `--font-sa-display` | `var(--font-bricolage)` | Fallback: `ui-sans-serif, system-ui, sans-serif` |
| `Font / Sa Body` | `--font-sa-body` | `Inter` | Google Font: `Inter` |
| `Font / Bricolage Grotesque` | `--font-bricolage-grotesque` | `Bricolage Grotesque` | Google Font: `Bricolage Grotesque` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / U` | `--u` | `min(calc(100vw / 1440), calc(100svh / 1080))` | `custom_value` |
| `Size / Sa Gutter` | `--sa-gutter` | `clamp(20px, 5vw, 72px)` | `custom_value` |
| `Size / Lift` | `--lift` | `-2px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Satsuma` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `satsuma.webp` (image/webp) — https://www.openlanding.page/gallery/satsuma.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **A band** (`section-1`, mode: `hybrid-embed`): (aubergine, rounded top) that **slides over the pinned hero**: the hero is `position: sticky` and scales to 0.95 and dims as the band covers it (one rAF writes `--sa-out`). It holds a marquee of product categories (Sneakers · Skincare · Coffee · Houseplants · Headphones · Florals · Ceramics · Serums · Candles · Cookware) that pauses on hover, focus and off-screen.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
2. **How it works** (`section-2`, mode: `native-whtml`): (`#how`): headline "Brief it. Match it. Peel off your reels." (the last words highlighted with a satsuma swash). Three apricot cards: 01 Send a brief (60 sec), 02 Meet your maker (24 h), 03 Peel off your reels (5 days). Each figure counts up (final value in a visually hidden span). Hand-drawn connector arrows between the cards draw as they reveal.
3. **Makers** (`section-3`, mode: `native-whtml`): (`#makers`): six tilt cards in a 3-column grid. Each has a looping scene (or a `Picture` once `maker-<id>` images exist), a "from $90 / reel" tag, a name, a craft and a city, a one-line style note, three stats (rating, reels shipped, turnaround) and a "Brief {first name}" link that pre-fills the form. Makers: Imani Okafor (sneakers, Lagos), Tove Lindqvist (skincare, Malmö), Mateo Ruiz (coffee, Valencia), Hana Sato (ceramics, Kyoto), Priya Nair (florals, Pune), Jonas Weber (audio gear, Leipzig).
4. **Packs** (`section-4`, mode: `native-whtml`): (`#packs`): "Buy reels by the segment." Three cards, each with a satsuma cut into as many wedges as it has reels (`segmentWedges()`, pure and tested): Quarter · 6 reels · $480 ($80 a reel, first reels in 5 days); **Half · 12 reels · $840 ($70 a reel, 7 days; the aubergine "Most picked" card)**; Whole · 24 reels · $1,440 ($60 a reel, 12 days). The wedges pop in one by one.
5. **Brief** (`section-5`, mode: `native-whtml`): (`#brief`, aubergine): "Tell us what to peel." with facts (24 h to a match, 9:16 vertical, $0 to brief) beside a paper form card: floating-label Brand name and Work email, a "What do you sell?" select, a radio row of the three packs, and an optional note (280 characters). Rules live in `forms/brief.ts` and are unit-tested: brand ≥ 2 characters, a valid email, a listed category and pack, note ≤ 280. Invalid fields shake once and their messages slide down; focus goes to the first error. Submit morphs to bouncing dots, then the form is replaced by a confirmation whose satsuma fills wedge by wedge, with a stable reference like `SA-H3K9`. **Never send a network request.**
6. **Footer** (`section-6`, mode: `native-whtml`): (ink): the lockup, a line of copy, an email, two link columns and "A fictional brand for a landing-page template".

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Satsuma Scoped Styles (Part 1/2)** (`satsuma-styles-1`, placement: `head`, 44944 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Satsuma Scoped Styles (Part 2/2)** (`satsuma-styles-2`, placement: `head`, 4760 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Satsuma Interactive Runtime Bridge** (`satsuma-runtime-1`, placement: `footer`, 344 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
