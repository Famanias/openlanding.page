# Webflow MCP Import Prompt: nexus (nexus)

Import the **nexus** (Marketing & Creative Agency) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/nexus
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/nexus-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/nexus.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "nexus" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "nexus", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/nexus-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`nexus Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--paper` | `#F5F1E8` | `static_value` |
| `Color / Paper Light` | `--paper-light` | `#FAF8F2` | `static_value` |
| `Color / Ink` | `--ink` | `#362E26` | `static_value` |
| `Color / Ink Deep` | `--ink-deep` | `#221B15` | `static_value` |
| `Color / Ink Muted` | `--ink-muted` | `#5C5044` | `static_value` |
| `Color / Terracotta` | `--terracotta` | `#A45337` | `static_value` |
| `Color / Terracotta Deep` | `--terracotta-deep` | `#82422D` | `static_value` |
| `Color / Peach` | `--peach` | `#F9DEC7` | `static_value` |
| `Color / Peach Dark` | `--peach-dark` | `#F6D3B4` | `static_value` |
| `Color / Clay` | `--clay` | `#CE916E` | `static_value` |
| `Color / Olive` | `--olive` | `#777B45` | `static_value` |
| `Color / Sage` | `--sage` | `#4C7262` | `static_value` |
| `Color / Sage Tint` | `--sage-tint` | `#C8D3B8` | `static_value` |
| `Color / Mustard` | `--mustard` | `#EFB15C` | `static_value` |
| `Color / Stroke` | `--stroke` | `#DCCEBB` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#685F53` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#FBF8F1` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#FFFFFF` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#C85A32` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#D9824B` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#F6D6BA` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#E5A93C` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#E3DAC9` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Newsreader` | `--font-newsreader` | `Newsreader` | Google Font: `Newsreader` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `nexus` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `nexus.webp` (image/webp) — https://www.openlanding.page/gallery/nexus.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header & Navigation** (`section-1`, mode: `native-whtml`): Minimal serif navigation with active links, responsive mobile sheet with accessible drawer controls, and direct CTA.
2. **Hero Stage** (`section-2`, mode: `hybrid-embed`): Large editorial headline "Marketing that feels human" with animated hand-drawn terracotta flourish underline, tactile 3D clay cluster cutout, illustrated marketer holding a green sprout, animated ink botanical doodles, and circular spinning botanical seals ("Casual Badges" and "Clay-Made Culture").
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
3. **Philosophy / Manifesto** (`section-3`, mode: `native-whtml`): "Good ideas grow on people." Unboxed claim-to-proof metrics (+148% Brand Recall Lift, 94% Multi-Year Partnerships, 100% Hand-Crafted Studio Work), plus interactive principle tabs ("GROW WITH CARE" vs "MADE WITH FEELING") updating living studio notes.
4. **Capabilities / Services** (`section-4`, mode: `native-whtml`): Four core disciplines (Brand Strategy & Positioning, Campaign Creative & Storytelling, Social & Editorial Content, Experiences & Websites) featuring bespoke SVG motifs, tilt hover interactions, and expandable "Inspect craft notes" drawers.
5. **Process / Cultivation Cycle** (`section-5`, mode: `native-whtml`): Four sequential chapters (Listen, Imagine, Make, Grow) paired with a scroll-driven and clickable growing SVG botanical vine path with milestone indicators and smooth scroll tracking.
6. **Selected Work & Case Study Dialog** (`section-6`, mode: `native-whtml`): Filterable case study showcase (Solstice Apothecary, Loom & Meadow, Kith & Kin Roasters) across Brand World, Campaigns, and Experiences, complete with an accessible detailed modal reader.
7. **Client Love / Testimonials** (`section-7`, mode: `native-whtml`): Carousel slider with rotating founder quotes, author roles, and tabular note counters.
8. **Start a Conversation / Seed Brief** (`section-8`, mode: `native-whtml`): Interactive brief builder allowing clients to select focus areas, enter project details, run live validation, and generate ready-to-send mailto drafts with one-click clipboard copying.
9. **Organic Footer** (`section-9`, mode: `native-whtml`): Studio wordmark, copyright notices, and direct navigation links.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **nexus Scoped Styles (Part 1/2)** (`nexus-styles-1`, placement: `head`, 44998 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **nexus Scoped Styles (Part 2/2)** (`nexus-styles-2`, placement: `head`, 4788 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **nexus Interactive Runtime Bridge** (`nexus-runtime-1`, placement: `footer`, 269 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
