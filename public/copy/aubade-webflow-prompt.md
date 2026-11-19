# Webflow MCP Import Prompt: AUBADE (aubade)

Import the **AUBADE** (Night Train) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/aubade
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/aubade-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/aubade.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "aubade" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "aubade", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/aubade-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AUBADE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Nuit` | `--color-nuit` | `#161233` | `static_value` |
| `Color / Linen` | `--color-linen` | `#F3ECDF` | `static_value` |
| `Color / Claret` | `--color-claret` | `#8E1F3A` | `static_value` |
| `Color / Dawn` | `--color-dawn` | `#F2B37A` | `static_value` |
| `Color / Sapin` | `--color-sapin` | `#1F4A3F` | `static_value` |
| `Color / Lac` | `--color-lac` | `#3E6FA8` | `static_value` |
| `Color / Au Muted` | `--au-muted` | `color-mix(in srgb, var(--color-linen) 72%, var(--color-nuit))` | `custom_value` |
| `Color / Au Hair` | `--au-hair` | `color-mix(in srgb, var(--color-linen) 16%, transparent)` | `custom_value` |
| `Color / Au Ink Muted` | `--au-ink-muted` | `color-mix(in srgb, var(--color-nuit) 72%, var(--color-linen))` | `custom_value` |
| `Color / Au Ink Hair` | `--au-ink-hair` | `color-mix(in srgb, var(--color-nuit) 18%, transparent)` | `custom_value` |
| `Color / Au Fill` | `--au-fill` | `color-mix(in srgb, var(--color-claret) 68%, var(--color-nuit))` | `custom_value` |
| `Color / Stock` | `--stock` | `color-mix(in srgb, var(--color-linen) 82%, var(--color-dawn))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Au Display` | `--font-au-display` | `Gloock` | Google Font: `Gloock` |
| `Font / Au Body` | `--font-au-body` | `Albert Sans` | Google Font: `Albert Sans` |
| `Font / Au Mono` | `--font-au-mono` | `Red Hat Mono` | Google Font: `Red Hat Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `32px` | `static_value` |
| `Size / Au Header H` | `--au-header-h` | `72px` | `static_value` |
| `Size / Au Gutter` | `--au-gutter` | `clamp(16px, 4.5vw, 72px)` | `custom_value` |
| `Size / Au Wrap` | `--au-wrap` | `1320px` | `static_value` |
| `Size / Radius Window` | `--radius-window` | `clamp(22px, 3vw, 44px)` | `custom_value` |
| `Size / Radius Card` | `--radius-card` | `18px` | `static_value` |
| `Size / Lift` | `--lift` | `-8px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AUBADE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `aubade.webp` (image/webp) — https://www.openlanding.page/gallery/aubade.webp (Gallery preview capture)
- `berth-cabine-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-cabine-1600.avif (Template media asset)
- `berth-cabine-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-cabine-1600.webp (Template media asset)
- `berth-cabine-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-cabine-800.avif (Template media asset)
- `berth-cabine-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-cabine-800.webp (Template media asset)
- `berth-couchette-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-couchette-1600.avif (Template media asset)
- `berth-couchette-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-couchette-1600.webp (Template media asset)
- `berth-couchette-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-couchette-800.avif (Template media asset)
- `berth-couchette-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-couchette-800.webp (Template media asset)
- `berth-grandlit-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-grandlit-1600.avif (Template media asset)
- `berth-grandlit-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-grandlit-1600.webp (Template media asset)
- `berth-grandlit-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/berth-grandlit-800.avif (Template media asset)
- `berth-grandlit-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/berth-grandlit-800.webp (Template media asset)
- `dining-car-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/dining-car-1600.avif (Template media asset)
- `dining-car-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/dining-car-1600.webp (Template media asset)
- `dining-car-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/dining-car-800.avif (Template media asset)
- `dining-car-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/dining-car-800.webp (Template media asset)
- `night-bell-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-bell-1600.avif (Template media asset)
- `night-bell-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-bell-1600.webp (Template media asset)
- `night-bell-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-bell-800.avif (Template media asset)
- `night-bell-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-bell-800.webp (Template media asset)
- `night-quiet-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-quiet-1600.avif (Template media asset)
- `night-quiet-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-quiet-1600.webp (Template media asset)
- `night-quiet-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-quiet-800.avif (Template media asset)
- `night-quiet-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-quiet-800.webp (Template media asset)
- `night-turndown-1600.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-turndown-1600.avif (Template media asset)
- `night-turndown-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-turndown-1600.webp (Template media asset)
- `night-turndown-800.avif` (image/avif) — https://www.openlanding.page/templates/aubade/night-turndown-800.avif (Template media asset)
- `night-turndown-800.webp` (image/webp) — https://www.openlanding.page/templates/aubade/night-turndown-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/aubade/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): (fixed): the lockup; nav links in mono (The Line, Berths, Dining car, The Night, Departures) with **one dawn indicator that glides** between links (transform `translateX` + `scaleX`) and follows hover and the active section; and a claret "Reserve a berth" button. It compacts after 80px (blurred nuit backdrop), hides on scroll-down and returns on scroll-up. A 1px rail at the bottom fills with page progress, and a small claret train rides it. On phones a toggle (☰ → ×) opens a full-screen claret panel through a `clip-path: circle()` from the toggle. Links stagger in, body scroll is locked, focus is trapped, and Escape closes the panel.
2. **Hero** (`section-2`, mode: `native-whtml`): an eyebrow ("Paris 19:12 → Venezia 09:48 · Thursdays & Sundays"); the h1 "Leave at dusk. / Wake somewhere else." with two masked lines that overlap the window; a lead; a magnetic claret CTA and a ghost "See the line" button; and a big rounded **window showing the dusk scene**, which glides on its own (layer loops of 34–220 s, the sun sinking over 14 s, paused off-screen). A **linen window blind lifts** on load. A "Next departure" plaque shows the first departure with berths left. Below are four facts: 1,128 km · 9 · 38 · 14 h 36.
3. **The Line (the mechanic)** (`section-3`, mode: `hybrid-embed`): a 560vh track with a sticky 100svh stage holding the window, an enamel plaque (leg n of 5, from → to, title), a clock and km readout, the leg's note, a **timetable rail** (8 stations, dots at their positions, a claret train that slides along, a dawn fill) and controls (prev and next buttons, plus a range input labelled "Travel the line").
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Berths** (`section-4`, mode: `native-whtml`): (linen field, blinding down over the night): three tilt cards in nuit, sapin and claret. Voiture 3 · Couchette Privée, "A berth of your own", 190 × 80 cm, €390, 12 cabins. Voiture 5 · Cabine, "Two, stacked", 2 × 190 × 80 cm, €640, 16 cabins. Voiture 7 · Grand Lit, "The double", 200 × 140 cm with a private shower, €1,180, 10 cabins. Fares are per cabin, with dinner and breakfast included. Each card has a 4:3 photo, specs, a price and "Choose this berth" (which pre-selects the form).
5. **Dining car** (`section-5`, mode: `native-whtml`): (sapin): the title, a lead, a 3:2 photo (blind wipe plus scroll parallax), count-up stats (2 seatings · 38 covers · 24 mo Comté) and a timed menu (19:40, 20:30, 21:15, 22:40, 07:10, 08:30) whose vertical rule draws in.
6. **The Night** (`section-6`, mode: `native-whtml`): three sticky full-height colour cards (claret 21:30 Turndown, nuit 00:00 The quiet hour, dawn 08:15 The bell), each with a huge Gloock time and a 4:5 photo. As the next card covers one, it scales to .94 and dims (`--cover` from one rAF loop).
7. **Departures** (`section-7`, mode: `native-whtml`): (nuit): month tabs (November 2026, December 2026, January 2027) with a gliding indicator and arrow-key support, and a departure board table (date, departs, arrives, berths, status, Reserve →). Every Thursday and Sunday is listed, with deterministic availability (open, few left, complet). 24 Dec is "Réveillon dinner on board" and 31 Dec is complet ("Arrive for Capodanno"). Rows slide in the direction of the month change, and every character **split-flaps** in (`rotateX(-90deg)` → 0, staggered).
8. **Reserve** (`section-8`, mode: `native-whtml`): (linen): a **live ticket** on the left (a claret band with the mark, 19:12 → 09:48, date, berth, Voiture · Cabine, guests, name, and a fare stub) and the form on the right: a departure select grouped by month (complet nights disabled), berth radio cards, a guests segment (two is disabled for the couchette), floating-label name and email fields with a drawn check when valid, and optional notes (280 characters max). Validation is client-side and tested. Invalid fields shake once and their messages slide down. Submit morphs to "Coupling the carriages" with a shuttling dot, then the form is replaced by a nuit success panel; the ticket tilts, is **punched twice** and **stamped "Validé"** with a spring. No network request.
9. **Footer** (`section-9`, mode: `native-whtml`): (claret): a gliding marquee of station names (it pauses off-screen, on hover and on focus), the slogan set huge, the lockup with an address, links, timetable footnotes, and "AUBADE is a fictional rail company".

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AUBADE Scoped Styles (Part 1/2)** (`aubade-styles-1`, placement: `head`, 44996 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AUBADE Scoped Styles (Part 2/2)** (`aubade-styles-2`, placement: `head`, 20999 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **AUBADE Interactive Runtime Bridge** (`aubade-runtime-1`, placement: `footer`, 343 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
