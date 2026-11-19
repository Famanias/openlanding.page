# Webflow MCP Import Prompt: FIXTURE (fixture)

Import the **FIXTURE** (E-commerce Services) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/fixture
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/fixture-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/fixture.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "fixture" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "fixture", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/fixture-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`FIXTURE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#121316` | `static_value` |
| `Color / Paper` | `--color-paper` | `#F3F2EE` | `static_value` |
| `Color / White` | `--color-white` | `#FFFFFF` | `static_value` |
| `Color / Crimson` | `--color-crimson` | `#CF1F35` | `static_value` |
| `Color / Graphite` | `--color-graphite` | `#5E6168` | `static_value` |
| `Color / Hairline` | `--color-hairline` | `#D9D7D0` | `static_value` |
| `Color / Till` | `--color-till` | `#1E7A4C` | `static_value` |
| `Color / Fx Line` | `--fx-line` | `color-mix(in srgb, var(--color-hairline) 100%, transparent)` | `custom_value` |
| `Color / Fx Line Soft` | `--fx-line-soft` | `color-mix(in srgb, var(--color-hairline) 55%, transparent)` | `custom_value` |
| `Color / Fx Shadow Ink` | `--fx-shadow-ink` | `color-mix(in srgb, var(--color-ink) 14%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-familjen)` | Fallback: `Helvetica Neue, Arial, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-rethink)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-martian)` | Fallback: `ui-monospace, monospace` |
| `Font / Familjen Grotesk` | `--font-familjen-grotesk` | `Familjen Grotesk` | Google Font: `Familjen Grotesk` |
| `Font / Martian Mono` | `--font-martian-mono` | `Martian Mono` | Google Font: `Martian Mono` |
| `Font / Rethink Sans` | `--font-rethink-sans` | `Rethink Sans` | Google Font: `Rethink Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `24px` | `static_value` |
| `Size / Fx Gutter` | `--fx-gutter` | `clamp(16px, 4vw, 56px)` | `custom_value` |
| `Size / Fx Container` | `--fx-container` | `1360px` | `static_value` |
| `Size / Fx Header` | `--fx-header` | `64px` | `static_value` |
| `Size / Fx R Sm` | `--fx-r-sm` | `4px` | `static_value` |
| `Size / Fx R` | `--fx-r` | `8px` | `static_value` |
| `Size / Tab H` | `--tab-h` | `96px` | `static_value` |
| `Size / Label W` | `--label-w` | `clamp(120px, 16vw, 220px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `FIXTURE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `fixture.webp` (image/webp) — https://www.openlanding.page/gallery/fixture.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): logo, nav (Fit-out, Price list, Work, Care plans, FAQ) with one crimson indicator that slides between links, a live studio-hours chip ("Open · closes 18:00", computed for Europe/Amsterdam, Mon–Fri 09–18), and the crimson CTA. Becomes translucent after 24 px, hides on scroll-down, returns on scroll-up; a crimson progress hairline along its bottom. Below 1080 px: a toggle that opens a full-screen menu with a clip-path circle, focus trap and Escape.
2. **Scene (hero + fit-out, `#fit-out`)** (`section-2`, mode: `native-whtml`): left column holds the hero (eyebrow, h1 "Your shop, / fitted out / properly." split into masked lines, lead, two CTAs, three facts: 64 shops fitted, 4 wks door to door, €1,800 setup) stacked in the same grid cell as the **fit-out sheet** (five rows: 01 Shell · Store setup · Week 1; 02 Fixtures · Theme build · Weeks 2–3; 03 Wiring · App wiring · Week 3; 04 Signage · Speed + conversion · Week 4; 05 Open · Launch + care · Launch day; each with one line and four check chips). Right column: the **storefront** of the demo merchant Fennel & Clay (stoneware, Utrecht), drawn in DOM and inline SVG: browser bar with URL, "Payments live" chip, shipping bar, store nav with cart count, dark banner with coded vases and a headline, four product tiles (Tide mug €34, Low bowl €42, Dune vase €78, Pour jug €56), four app chips around the window (Reviews, Subscribe & save, Bookings, Email flows) with SVG connector paths, three order slips (`No. 1042 · Tide mug ×2 · €68.00 · Utrecht`…), and a hanging CLOSED/OPEN sign. Under it a readout: load time, conversion, orders, fitted count.
3. **Price list (`#prices`)** (`section-3`, mode: `native-whtml`): six services as shelf tags hanging from two drawn shelf rails: FX-01 Store setup €1,800 flat; FX-02 Theme build from €6,500; FX-03 App wiring €450 per app; FX-04 Speed audit €750 flat; FX-05 Conversion pass €1,200 flat; FX-06 Care plan €240 / month. Each tag has a punched hole and string, its stage, a lead time and an **Add to brief** toggle that preselects that need in the booking form (custom events both ways).
4. **Work (`#work`)** (`section-4`, mode: `native-whtml`): a full-width ink slab. Vertical tabs for three merchants (Fennel & Clay, Ritual Roast, Spokesmith) with arrow/Home/End keys; the panel shows what was fitted, a quote, a Before/After segmented toggle and three metrics that count between values with comparison bars.
5. **Schedule (`#schedule`)** (`section-5`, mode: `native-whtml`): a five-column Gantt (Week 1–4, Launch) whose bars draw in, plus a crimson "Today" marker that sweeps the weeks with the section's scroll progress.
6. **Care plans (`#plans`)** (`section-6`, mode: `native-whtml`): Counter €240, Shopfloor €420 (featured, ink card, "Most fitted"), Flagship €780 per month, with a Monthly/Annual toggle (annual = two months free: €200 / €350 / €650) and a rolling price.
7. **FAQ (`#faq`)** (`section-7`, mode: `native-whtml`): sticky heading; six questions in a one-open-at-a-time accordion (grid-rows animation).
8. **Book (`#book`)** (`section-8`, mode: `native-whtml`): three steps, and a form: name, email, store address (https:// prefix appears on focus), "What needs fitting?" chips (Setup, Theme, Apps, Speed + conversion, Care plan), budget radio chips, optional note. Client validation with specific messages, a one-shot shake and focus on the first invalid field; submit shows "Checking the shelves" for 900 ms, then the form wipes into a **fit-out slip** with a deterministic reference (`FX-1234-AB`), store host, chosen stages with prices, budget, rows printing one by one and a crimson BOOKED stamp. No network request.
9. **Footer (ink)** (`section-9`, mode: `native-whtml`): a marquee of the stage names, four columns (studio, hours with the live chip, links, small print), a giant FIXTURE wordmark with the mark.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **FIXTURE Scoped Styles (Part 1/2)** (`fixture-styles-1`, placement: `head`, 44916 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **FIXTURE Scoped Styles (Part 2/2)** (`fixture-styles-2`, placement: `head`, 32191 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **FIXTURE Interactive Runtime Bridge** (`fixture-runtime-1`, placement: `footer`, 344 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
