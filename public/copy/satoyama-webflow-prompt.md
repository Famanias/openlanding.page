# Webflow MCP Import Prompt: 里山日和 — Satoyama (satoyama)

Import the **里山日和 — Satoyama** (Culture & Rural Life) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/satoyama
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/satoyama-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/satoyama.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "satoyama" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "satoyama", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/satoyama-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`里山日和 — Satoyama Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / St Paper` | `--color-st-paper` | `#F6F3E8` | `static_value` |
| `Color / St Sage` | `--color-st-sage` | `#ADC3A1` | `static_value` |
| `Color / St Rose` | `--color-st-rose` | `#D7AAA0` | `static_value` |
| `Color / St Ink` | `--color-st-ink` | `#2F4438` | `static_value` |
| `Color / St Paper` | `--st-paper` | `#F6F3E8` | `static_value` |
| `Color / St Sage` | `--st-sage` | `#ADC3A1` | `static_value` |
| `Color / St Rose` | `--st-rose` | `#D7AAA0` | `static_value` |
| `Color / St Ink` | `--st-ink` | `#2F4438` | `static_value` |
| `Color / St Muted` | `--st-muted` | `color-mix(in srgb, var(--st-ink) 78%, var(--st-paper))` | `custom_value` |
| `Color / St Border` | `--st-border` | `color-mix(in srgb, var(--st-ink) 18%, var(--st-paper))` | `custom_value` |
| `Color / St Sky` | `--st-sky` | `color-mix(in srgb, var(--st-sage) 25%, var(--st-paper))` | `custom_value` |
| `Color / St Mountain Far` | `--st-mountain-far` | `color-mix(in srgb, var(--st-sage) 39%, var(--st-paper))` | `custom_value` |
| `Color / St Mountain` | `--st-mountain` | `color-mix(in srgb, var(--st-sage) 68%, var(--st-paper))` | `custom_value` |
| `Color / St Hill` | `--st-hill` | `color-mix(in srgb, var(--st-sage) 87%, var(--st-ink))` | `custom_value` |
| `Color / St Leaf` | `--st-leaf` | `color-mix(in srgb, var(--st-sage) 85%, var(--st-paper))` | `custom_value` |
| `Color / St Forest` | `--st-forest` | `color-mix(in srgb, var(--st-sage) 41%, var(--st-ink))` | `custom_value` |
| `Color / St Midgreen` | `--st-midgreen` | `color-mix(in srgb, var(--st-sage) 73%, var(--st-ink))` | `custom_value` |
| `Color / St Field` | `--st-field` | `color-mix(in srgb, var(--st-sage) 64%, var(--st-paper))` | `custom_value` |
| `Color / St Water` | `--st-water` | `color-mix(in srgb, var(--st-sage) 36%, var(--st-paper))` | `custom_value` |
| `Color / St Path` | `--st-path` | `color-mix(in srgb, var(--st-rose) 25%, var(--st-paper))` | `custom_value` |
| `Color / St Wall` | `--st-wall` | `color-mix(in srgb, var(--st-rose) 18%, var(--st-paper))` | `custom_value` |
| `Color / St Wallshade` | `--st-wallshade` | `color-mix(in srgb, var(--st-rose) 42%, var(--st-paper))` | `custom_value` |
| `Color / St Timber` | `--st-timber` | `color-mix(in srgb, var(--st-ink) 64%, var(--st-rose))` | `custom_value` |
| `Color / St Window` | `--st-window` | `color-mix(in srgb, var(--st-ink) 77%, var(--st-sage))` | `custom_value` |
| `Color / St Roof` | `--st-roof` | `color-mix(in srgb, var(--st-ink) 78%, var(--st-sage))` | `custom_value` |
| `Color / St Roofshade` | `--st-roofshade` | `color-mix(in srgb, var(--st-ink) 86%, var(--st-sage))` | `custom_value` |
| `Color / St Roof Rose` | `--st-roof-rose` | `color-mix(in srgb, var(--st-rose) 76%, var(--st-ink))` | `custom_value` |
| `Color / St Blue` | `--st-blue` | `#9CC4D6` | `static_value` |
| `Color / St Sun` | `--st-sun` | `#F1D9A2` | `static_value` |
| `Color / St Ember` | `--st-ember` | `#C8714F` | `static_value` |
| `Color / St Sky Top` | `--st-sky-top` | `color-mix(in srgb, var(--st-blue) 78%, var(--st-paper))` | `custom_value` |
| `Color / St Sky Mid` | `--st-sky-mid` | `color-mix(in srgb, var(--st-blue) 42%, var(--st-paper))` | `custom_value` |
| `Color / St Sky Low` | `--st-sky-low` | `color-mix(in srgb, var(--st-sun) 38%, var(--st-paper))` | `custom_value` |
| `Color / St Sky Warm` | `--st-sky-warm` | `color-mix(in srgb, var(--st-sun) 55%, var(--st-paper))` | `custom_value` |
| `Color / St Cloud` | `--st-cloud` | `color-mix(in srgb, white 55%, var(--st-paper))` | `custom_value` |
| `Color / St Cloud Lit` | `--st-cloud-lit` | `color-mix(in srgb, var(--st-sun) 14%, white)` | `custom_value` |
| `Color / St Cloud Shade` | `--st-cloud-shade` | `color-mix(in srgb, var(--st-rose) 26%, color-mix(in srgb, var(--st-blue) 60%, var(--st-paper)))` | `custom_value` |
| `Color / St Mtn Far` | `--st-mtn-far` | `color-mix(in srgb, var(--st-blue) 52%, var(--st-sage))` | `custom_value` |
| `Color / St Mtn Mid` | `--st-mtn-mid` | `color-mix(in srgb, var(--st-sage) 62%, var(--st-blue))` | `custom_value` |
| `Color / St Mtn Haze` | `--st-mtn-haze` | `color-mix(in srgb, var(--st-paper) 58%, var(--st-mtn-far))` | `custom_value` |
| `Color / St Meadow Lit` | `--st-meadow-lit` | `color-mix(in srgb, var(--st-sun) 30%, var(--st-leaf))` | `custom_value` |
| `Color / St Meadow` | `--st-meadow` | `color-mix(in srgb, var(--st-sage) 66%, var(--st-ink))` | `custom_value` |
| `Color / St Tree Lit` | `--st-tree-lit` | `color-mix(in srgb, var(--st-sun) 24%, var(--st-leaf))` | `custom_value` |
| `Color / St Bank` | `--st-bank` | `color-mix(in srgb, var(--st-timber) 70%, var(--st-sage))` | `custom_value` |
| `Color / St Water Deep` | `--st-water-deep` | `color-mix(in srgb, var(--st-blue) 50%, var(--st-sage))` | `custom_value` |
| `Color / St Water Canal` | `--st-water-canal` | `color-mix(in srgb, var(--st-blue) 66%, var(--st-sage))` | `custom_value` |
| `Color / St Stone` | `--st-stone` | `color-mix(in srgb, var(--st-ink) 28%, var(--st-paper))` | `custom_value` |
| `Color / St Bamboo` | `--st-bamboo` | `color-mix(in srgb, var(--st-sage) 70%, var(--st-ink))` | `custom_value` |
| `Color / St Bamboo Lit` | `--st-bamboo-lit` | `color-mix(in srgb, var(--st-sun) 30%, var(--st-leaf))` | `custom_value` |
| `Color / St Bamboo Far` | `--st-bamboo-far` | `color-mix(in srgb, var(--st-sage) 50%, var(--st-paper))` | `custom_value` |
| `Color / St Forest Sky` | `--st-forest-sky` | `color-mix(in srgb, var(--st-sage) 35%, var(--st-paper))` | `custom_value` |
| `Color / St Persimmon Dark` | `--st-persimmon-dark` | `color-mix(in srgb, var(--st-rose) 20%, var(--st-forest))` | `custom_value` |
| `Color / St Persimmon` | `--st-persimmon` | `color-mix(in srgb, var(--st-rose) 35%, var(--st-midgreen))` | `custom_value` |
| `Color / St Persimmon Lit` | `--st-persimmon-lit` | `color-mix(in srgb, var(--st-sun) 45%, var(--st-leaf))` | `custom_value` |
| `Color / St Persimmon Fruit` | `--st-persimmon-fruit` | `color-mix(in srgb, var(--st-ember) 70%, var(--st-sun))` | `custom_value` |
| `Color / St Snow` | `--st-snow` | `color-mix(in srgb, var(--st-blue) 10%, white)` | `custom_value` |
| `Color / St Snow Shade` | `--st-snow-shade` | `color-mix(in srgb, var(--st-blue) 35%, var(--st-paper))` | `custom_value` |
| `Color / St Blossom Dark` | `--st-blossom-dark` | `color-mix(in srgb, var(--st-rose) 70%, var(--st-paper))` | `custom_value` |
| `Color / St Blossom Mid` | `--st-blossom-mid` | `color-mix(in srgb, var(--st-rose) 40%, var(--st-paper))` | `custom_value` |
| `Color / St Blossom Lit` | `--st-blossom-lit` | `color-mix(in srgb, var(--st-rose) 22%, white)` | `custom_value` |
| `Color / St Maple Dark` | `--st-maple-dark` | `color-mix(in srgb, var(--st-ember) 62%, var(--st-ink))` | `custom_value` |
| `Color / St Maple Mid` | `--st-maple-mid` | `color-mix(in srgb, var(--st-ember) 88%, var(--st-sun))` | `custom_value` |
| `Color / St Maple Lit` | `--st-maple-lit` | `color-mix(in srgb, var(--st-sun) 62%, var(--st-ember))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / St Display` | `--font-st-display` | `var(--font-sato-mincho)` | Fallback: `Georgia, serif` |
| `Font / St Body` | `--font-st-body` | `var(--font-sato-sans)` | Fallback: `var(--font-sato-japanese), sans-serif` |
| `Font / Sato Japanese` | `--font-sato-japanese` | `var(--font-sato-mincho)` | Fallback: `system-ui, sans-serif` |
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Shippori Mincho` | `--font-shippori-mincho` | `Shippori Mincho` | Google Font: `Shippori Mincho` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / St Gap` | `--st-gap` | `25px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `里山日和 — Satoyama` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `satoyama.webp` (image/webp) — https://www.openlanding.page/gallery/satoyama.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build an original illustrated rural-Japan presentation in Next.js 16 App Router, React 19 and TypeScript. Brand: 里山日和 / Satoyama Biyori. It is a six-page picture book, with persistent chapter navigation, page dots, a counter, and previous/n

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **里山日和 — Satoyama Scoped Styles** (`satoyama-styles-1`, placement: `head`, 44510 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
