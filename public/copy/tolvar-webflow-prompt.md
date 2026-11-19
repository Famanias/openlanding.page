# Webflow MCP Import Prompt: TOLVAR EARTHWORKS (tolvar)

Import the **TOLVAR EARTHWORKS** (Excavation & Site Work) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/tolvar
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/tolvar-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/tolvar.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "tolvar" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "tolvar", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/tolvar-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TOLVAR EARTHWORKS Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Diesel` | `--color-diesel` | `#1B1A17` | `static_value` |
| `Color / Limestone` | `--color-limestone` | `#ECE7DC` | `static_value` |
| `Color / Chalk` | `--color-chalk` | `#F8F5EE` | `static_value` |
| `Color / Blade` | `--color-blade` | `#F2B31B` | `static_value` |
| `Color / Topsoil` | `--color-topsoil` | `#2F261E` | `static_value` |
| `Color / Clay` | `--color-clay` | `#9A4A2B` | `static_value` |
| `Color / Gravel` | `--color-gravel` | `#6A645A` | `static_value` |
| `Color / Locate` | `--color-locate` | `#1F5FA8` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Plate` | `--font-plate` | `var(--font-sofia-condensed)` | Fallback: `Arial Narrow, Impact, sans-serif` |
| `Font / Work` | `--font-work` | `Work Sans` | Google Font: `Work Sans` |
| `Font / Gauge` | `--font-gauge` | `B612 Mono` | Google Font: `B612 Mono` |
| `Font / Sofia Sans Extra Condensed` | `--font-sofia-sans-extra-condensed` | `Sofia Sans Extra Condensed` | Google Font: `Sofia Sans Extra Condensed` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `22px` | `static_value` |
| `Size / Tv Gutter` | `--tv-gutter` | `clamp(18px, 4.6vw, 72px)` | `custom_value` |
| `Size / Tv Max` | `--tv-max` | `1360px` | `static_value` |
| `Size / Tv Radius` | `--tv-radius` | `2px` | `static_value` |
| `Size / Tv Level H` | `--tv-level-h` | `10px` | `static_value` |
| `Size / Tv Bar H` | `--tv-bar-h` | `64px` | `static_value` |
| `Size / Tv Head` | `--tv-head` | `calc(var(--tv-level-h) + var(--tv-bar-h))` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TOLVAR EARTHWORKS` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `tolvar.webp` (image/webp) — https://www.openlanding.page/gallery/tolvar.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): level bar, logo, nav (The work, Job log, The yard, About, Crew), phone chip `(218) 555-0142`, "Free estimate" button. Hides on scroll down, returns on scroll up. One marker slides to the section being read. Full-screen phone menu with a focus trap and scroll lock.
2. **Hero** (`section-2`, mode: `native-whtml`): diesel slab, two-line headline, lede, two buttons, two tickets ("Free estimates", "Licensed & insured"), a photo in the right half with a yellow job tag, a yellow grade line across the bottom.
3. **Ticker** (`section-3`, mode: `native-whtml`): a yellow band of all 20 service names, drifting.
4. **The work** (`section-4`, mode: `native-whtml`): "Dirt only moves four ways." Four tabs with a sliding yellow marker; each panel has a photo, a verb headline ("Dig it out.", "Build it up.", "Lay it in.", "Truck it."), a blurb, its services with one line each, and a "Get ___ work quoted" button that pre-selects that kind in the form. Services: Cut (Basements, Footers, Piers, Ponds & Waterfalls, Demolition, Clearing), Fill (Building Pads, Terraces, Yard Grades, Top Soil, Rock Walls, Excavating & Grading), Pipe (Water Lines, Storm Drains, Underground Utilities, Drainage Improvements), Haul (Hauling, Trucking Services, Dirt Work, Concrete).
5. **Job log** (`section-5`, mode: `native-whtml`): topsoil slab, filter chips (All, Cut, Fill, Pipe, Haul, Built on it) with counts, a multi-column grid of 22 photo tickets (job number, kind, title), and a native `<dialog>` viewer with previous, next, close and arrow keys.
6. **The yard** (`section-6`, mode: `native-whtml`): "We own the iron." Three photos and a fleet table (quantity, unit, size, what it does), ten units.
7. **About** (`section-7`, mode: `native-whtml`): owner photo and story, three tickets, four count-up stats (25 years in the seat, 20 kinds of work, 10 machines, 3 counties).
8. **Crew** (`section-8`, mode: `native-whtml`): diesel slab, "Three seats open." Accordion of Laborer, Operator, Foreman with requirements; terms; mailto button.
9. **Estimate** (`section-9`, mode: `native-whtml`): phones, email, address (4410 Tamarack Pit Road, Aitkin, MN 56431), hours, counties, an 811 note; a form with kind-of-work chips, first name, last name, email, mobile phone (all required), company and comments. Local validation, a short "writing the ticket" state, then a ticket confirmation. No network request.
10. **Footer** (`section-10`, mode: `native-whtml`): hatch strip, oversized "Move it once.", nav, contacts, a line saying the company is fictional.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TOLVAR EARTHWORKS Scoped Styles (Part 1/2)** (`tolvar-styles-1`, placement: `head`, 44947 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TOLVAR EARTHWORKS Scoped Styles (Part 2/2)** (`tolvar-styles-2`, placement: `head`, 1816 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TOLVAR EARTHWORKS Interactive Runtime Bridge** (`tolvar-runtime-1`, placement: `footer`, 354 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
