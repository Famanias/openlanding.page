# Webflow MCP Import Prompt: ELSEWHERE (elsewhere)

Import the **ELSEWHERE** (Cabin Retreat & Hospitality) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/elsewhere
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/elsewhere-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/elsewhere.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "elsewhere" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "elsewhere", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/elsewhere-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`ELSEWHERE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Mist` | `--color-mist` | `#E4E7E1` | `static_value` |
| `Color / Fog` | `--color-fog` | `#F4F5F1` | `static_value` |
| `Color / Char` | `--color-char` | `#191B18` | `static_value` |
| `Color / Fir` | `--color-fir` | `#1F2D27` | `static_value` |
| `Color / Stone` | `--color-stone` | `#525C54` | `static_value` |
| `Color / Glow` | `--color-glow` | `#F0A64A` | `static_value` |
| `Color / Pine` | `--color-pine` | `#E9D6B4` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Sign` | `--font-sign` | `National Park` | Google Font: `National Park` |
| `Font / Book` | `--font-book` | `Spectral` | Google Font: `Spectral` |
| `Font / Post` | `--font-post` | `Reddit Mono` | Google Font: `Reddit Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `26px` | `static_value` |
| `Size / Ew Gutter` | `--ew-gutter` | `clamp(20px, 4.6vw, 76px)` | `custom_value` |
| `Size / Ew Max` | `--ew-max` | `1320px` | `static_value` |
| `Size / Ew Radius` | `--ew-radius` | `4px` | `static_value` |
| `Size / Ew Hero H` | `--ew-hero-h` | `max(100svh, 620px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `ELSEWHERE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `elsewhere.webp` (image/webp) — https://www.openlanding.page/gallery/elsewhere.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): fixed fog plank: gable-and-lit-door mark with the wordmark, four links (The walk in, The room, Three seasons, Stay) with one amber indicator that slides and scales between them, the signal readout, "Hold the cabin", and a 2 px page-progress line on its bottom edge. It lifts and gains a shadow after 80 px, stays up for the whole walk, and hides on scroll-down only once past the door. Below 960 px the links become a full-screen fir menu that opens as a clip-path circle from the toggle, with staggered links, a focus trap and Escape to close.
2. **Overlook (hero)** (`section-2`, mode: `native-whtml`): `overlook` full-bleed in a CSS cover box (`width: max(100%, heroHeight × 1.7917)`), so a tag ("The cabin · 1,900 m", a leader line, a pinging dot) sits on the door in plate percentages. `boughs-soft` is the layer nearest the lens. Headline "Past the last bar / of signal.", a lede ending "Scroll to walk in.", a magnetic amber "Start walking" button and a "Hold the cabin" link, and three facts (1,900 m on foot, 35 min, 0 bars at the door). The hero is sticky, so the next section slides over it. On portrait screens the copy moves up under the header and the tag's label is dropped.
3. **The walk in** (`section-3`, mode: `hybrid-embed`): (fir): headline "It takes thirty-five minutes to stop checking." A pinned `trail` photograph (a sticky band at the top on phones) zooms toward the door, a dotted amber line reveals up the steps and a "Walked 880 m" readout counts. Beside it, five posts on a rail whose amber fill grows: Road's end 0 m, The cedar gate 420 m, The plank bridge 880 m, The stone steps 1,340 m, The door 1,900 m, each with elevation, minutes in, the signal at that point, a note and a detail. Posts ahead are unlit until reached.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Threshold** (`section-4`, mode: `native-whtml`): (the signature moment): a section 400svh tall with a sticky 100svh stage. `cabin-green` dollies into its own door while `interior` fades in and grows inside the doorway, clipped to it, until it fills the stage; `boughs` scales up and slides off to the left in front. Three caption planks cross-fade: "The light is already on." (h2), "Leave the day outside.", "Now sit down."
5. **The room** (`section-5`, mode: `hybrid-embed`): (pine): `room-detail` pinned beside "One of everything." and a numbered inventory of eight things (stove, window, sofa, stool, blanket, two mugs, forty logs, a logbook); four count-up figures (23 m², 1 window, 40 logs, 2 people); "Not in the room" (a router, a television, a clock, a doorbell, a mirror bigger than your face), each struck through by a drawn line; and a drifting band: No road, No router, No clock, One window, One stove, One trail in.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
6. **Three seasons** (`section-6`, mode: `native-whtml`): (fir): "The valley keeps three seasons." One frame stacks the three exterior plates. A panel has three season radio buttons (Green April to August, Amber September to November, White December to March), a 12-month range input styled as a ruler with a blaze thumb, and for the chosen month: daylight, low and high, time on the trail, wood per day, nightly rate, what the valley is doing and what to bring. Crossing a season boundary wipes the next plate over the last, from the right going forward in the year and from the left going back.
7. **The logbook** (`section-7`, mode: `native-whtml`): (mist): "Write the weather down." Three dated, signed entries as slightly tilted pages that straighten, lift and catch pointer-following lamplight on hover. Labelled as illustrative.
8. **Stay** (`section-8`, mode: `native-whtml`): (fog): "Hold the cabin." A pine panel (month select tied to the ruler, a nights stepper from 2 to 7, a one or two guests control, quote lines and a total that ticks) beside a floating-label form (name, email, optional note up to 280 characters). A bad submit shakes the fields once and focuses the first invalid one; a good one shows a 900 ms loading bar, then the form lifts away and a key tag drops in with a hashed reference like `EW-7K2M9Q` and a "Held" stamp. No request is made, and the tag says nothing was sent, stored or charged.
9. **Footer** (`section-9`, mode: `native-whtml`): (char): the mark, "The light is on.", links, three practical notes, a giant SVG wordmark and the fiction disclaimer.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **ELSEWHERE Scoped Styles (Part 1/2)** (`elsewhere-styles-1`, placement: `head`, 44766 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **ELSEWHERE Scoped Styles (Part 2/2)** (`elsewhere-styles-2`, placement: `head`, 20085 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **ELSEWHERE Interactive Runtime Bridge** (`elsewhere-runtime-1`, placement: `footer`, 346 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
