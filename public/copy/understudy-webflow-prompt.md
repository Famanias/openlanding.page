# Webflow MCP Import Prompt: Understudy (understudy)

Import the **Understudy** (Careers & Education) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/understudy
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/understudy-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/understudy.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "understudy" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "understudy", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/understudy-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Understudy Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Us House` | `--color-us-house` | `#F4F4F1` | `static_value` |
| `Color / Us White` | `--color-us-white` | `#FFFFFF` | `static_value` |
| `Color / Us Ink` | `--color-us-ink` | `#0D0D10` | `static_value` |
| `Color / Us Night` | `--color-us-night` | `#1A1A1F` | `static_value` |
| `Color / Us Graphite` | `--color-us-graphite` | `#66666E` | `static_value` |
| `Color / Us Cue` | `--color-us-cue` | `#5B3CF0` | `static_value` |
| `Color / Us Cue Light` | `--color-us-cue-light` | `#AE9CFF` | `static_value` |
| `Color / Us Tape` | `--color-us-tape` | `#FFC547` | `static_value` |
| `Color / Us House` | `--us-house` | `#F4F4F1` | `static_value` |
| `Color / Us White` | `--us-white` | `#FFFFFF` | `static_value` |
| `Color / Us Ink` | `--us-ink` | `#0D0D10` | `static_value` |
| `Color / Us Night` | `--us-night` | `#1A1A1F` | `static_value` |
| `Color / Us Graphite` | `--us-graphite` | `#66666E` | `static_value` |
| `Color / Us Cue` | `--us-cue` | `#5B3CF0` | `static_value` |
| `Color / Us Cue Light` | `--us-cue-light` | `#AE9CFF` | `static_value` |
| `Color / Us Tape` | `--us-tape` | `#FFC547` | `static_value` |
| `Color / Us Line` | `--us-line` | `color-mix(in oklab, var(--us-ink) 9%, transparent)` | `custom_value` |
| `Color / Us Wave Dim` | `--us-wave-dim` | `color-mix(in oklab, var(--us-ink) 20%, var(--us-house))` | `custom_value` |
| `Color / Bg` | `--bg` | `#0D0D10` | `static_value` |
| `Color / Ink` | `--ink` | `color-mix(in oklab, #FFFFFF 92%, #AE9CFF)` | `custom_value` |
| `Color / Muted` | `--muted` | `color-mix(in oklab, #FFFFFF 65%, #66666E)` | `custom_value` |
| `Color / Violet` | `--violet` | `#AE9CFF` | `static_value` |
| `Color / Violet Bright` | `--violet-bright` | `color-mix(in oklab, #FFFFFF 30%, #AE9CFF)` | `custom_value` |
| `Color / Line` | `--line` | `color-mix(in oklab, #AE9CFF 20%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Google Sans Code` | `--font-google-sans-code` | `Google Sans Code` | Google Font: `Google Sans Code` |
| `Font / Google Sans Flex` | `--font-google-sans-flex` | `Google Sans Flex` | Google Font: `Google Sans Flex` |
| `Font / Literata` | `--font-literata` | `Literata` | Google Font: `Literata` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Us Gut` | `--us-gut` | `clamp(16px, 0.2rem + 3.4vw, 56px)` | `custom_value` |
| `Size / Us Max` | `--us-max` | `1240px` | `static_value` |
| `Size / Aw` | `--aw` | `clamp(76px, 7.2vw, 112px)` | `custom_value` |
| `Size / Ah` | `--ah` | `calc(var(--aw) * 1.1667)` | `custom_value` |
| `Size / Ay` | `--ay` | `calc(50% + clamp(84px, 12svh, 130px))` | `custom_value` |
| `Size / Lift` | `--lift` | `clamp(0, var(--p, 0) / 0.2, 1)` | `custom_value` |
| `Size / Push` | `--push` | `clamp(0, (var(--p, 0) - 0.04) / 0.48, 1)` | `custom_value` |
| `Size / Open` | `--open` | `clamp(0, (var(--p, 0) - 0.08) / 0.32, 1)` | `custom_value` |
| `Size / Bend` | `--bend` | `clamp(0, (var(--p, 0) - 0.56) / 0.26, 1)` | `custom_value` |
| `Size / Card H` | `--card-h` | `clamp(290px, 41svh, 400px)` | `custom_value` |
| `Size / Card W` | `--card-w` | `calc(var(--card-h) * 4 / 5.3)` | `custom_value` |
| `Size / W` | `--w` | `calc(var(--wp, 1) * (var(--n) + 10) - 5)` | `custom_value` |
| `Size / D` | `--d` | `calc(var(--w) - var(--i))` | `custom_value` |
| `Size / Hot` | `--hot` | `clamp(0, 1 - max(var(--d), -1 * var(--d)) / 3.5, 1)` | `custom_value` |
| `Size / Lit` | `--lit` | `clamp(0, var(--d) / 2.5, 1)` | `custom_value` |
| `Size / Pop` | `--pop` | `clamp(0, (var(--w) - var(--n)) / 2.5, 1)` | `custom_value` |
| `Size / Deal` | `--deal` | `clamp(0, (var(--wp) - 0.56) / 0.12, 1)` | `custom_value` |
| `Size / Sign` | `--sign` | `clamp(0, (var(--wp) - 0.86) / 0.14, 1)` | `custom_value` |
| `Size / Seal` | `--seal` | `clamp(0, (var(--p, 0) - 0.57) / 0.06, 1)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Understudy` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `understudy.webp` (image/webp) — https://www.openlanding.page/gallery/understudy.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Top bar** (`section-1`, mode: `native-whtml`): (fixed): lockup left, live readout right. Ink flips to house over dark scenes.
2. **Hero** (`section-2`, mode: `native-whtml`): (`#top`, held for 340svh, sticky stage): the pale floor under a mist; eyebrow "The rehearsal studio for first jobs"; the headline "Your first job, / rehearsed." plus a cue dot; the arch under it (width `clamp(76px, 7.2vw, 112px)`, height ×1.1667, centred at `50% + clamp(84px, 12svh, 130px)`), its curtain breathing, rings of cue leaving its foot, and a "Scroll to enter" nudge. Inside the same stage, the **dark house** is a full-screen ink layer whose `clip-path` is the arch: curtains (night with fold stripes), a light slit, then "3,400+ / companies casting from our studio." over two rows of companies.
3. **Parts** (`section-3`, mode: `native-whtml`): (`#parts`, ink, one screen): "We cast you in the parts companies are hiring for." with chips (Popular, Product, Engineering, Data, Design, Growth, Operations; a pill glides between them as a `clip-path`, and ←/→ move it) and an **endless ring** of ten tall cards that drifts right to left (−36 px/s) in a gentle arc and loops with no seam: `loopX(i, n, slot, offset) = wrap(i·slot + offset + slot, n·slot) − slot`; short filtered sets repeat (`repsFor`) with the repeats hidden from readers; each card lifts and turns as it comes round the edges (`y = 34·d²`, `rotate = 5°·d`, `scale = 1 − 0.05·d²`, radius never under 560px). The page scroll pulls the ring along (0.32 px per px); drag it 1:1 and fling it (eased back with a frame-rate-independent `coast`); hover glides it to a stop; pause, keyboard focus or an open card brake it hard; previous / next (and ←/→ on the region) glide one card; a focused card glides fully into view; a drag never opens a card. One rAF loop writes the transforms and sleeps when still or off screen. Under reduced motion (and without JS) it's a plain row that scrolls natively. Each card shows: tag (Hot / Rising / New), "{weeks}-week run · {company}", title, tools, and a "Brief →" key. The card turns over (rotateY, inert faces) to the brief, three things you ship, and "Rehearse this part", which opens Start with that part chosen. Parts: AI Engineer (Quillo), Product Analyst (Parcelpost), Product Manager (fernway), Product Designer (Brightloop), Growth Marketer (sundry), Data Scientist (Tidewell), Frontend Engineer (LUMEN GAMES), Content Designer (Halcyon Bank), Operations Analyst (Saltbox), Customer Success Lead (Ledgerly).
4. **Rehearsal** (`section-4`, mode: `native-whtml`): (`#rehearsal`): a dark bowl (the parts' black ends in an ellipse) that flattens with the scroll; the held line "Learn the part by playing it." (sticky, behind a house fade); four scenes strung on one thread: a lead-in path from the line to a rail on the left, a node beside each scene. Scenes: "Join a company that runs like a *real one.*" (a lot of eight company buildings and a brief card: "31% of carts stall at the address step. Find out why."), "Run lines with your *cast.*" (a team chat whose messages arrive one by one and a standup checklist), "Get notes from your *director.*" (a readout with highlighted findings, three margin notes in Literata, "Approved"), "Walk out with a *reel.*" (Maya Ortiz, Product Analyst · Level 7, −18% drop-off, 4 fixes, 9 notes counting up). Each window has a three-light bar and a mono title.
5. **Casting** (`section-5`, mode: `native-whtml`): (`#casting`, held for 280svh): "You rehearse. We *cast.*", the reel in the middle of a 1200×600 stage, ten companies placed five each side; for each, a curve draws from the reel and then the company pops in; a "Callbacks" odometer rolls 00 → 10; a halo rings the reel when all ten are in.
6. **Contract** (`section-6`, mode: `native-whtml`): (`#pricing`, held for 250svh): "Built to get you [contract] *cast.*": a cue wave runs through the letters, a small two-sheet contract scales out of the gap, a signature draws on it, a cue seal stamps; then "Opening night is free. Then $89 a month.", the CTA "Book your first call time" (magnetic) and "Ask a question first", and three facts (10 h a week · 5–8 weeks to a reel · 62% got a callback).
7. **Finale** (`section-7`, mode: `native-whtml`): (the footer, held for 200svh): the floor pale, then the lit floor revealed by a `clip-path: circle()` growing from the ghost light; "House lights up. *Take the stage.*"; a glass ring whose text "START · TAKE THE STAGE ·" turns on a `textPath` around an ink core with the mark: the whole ring is the Start key. Legal links and "a fictional brand for a landing-page template".
8. **Dock** (`section-8`, mode: `native-whtml`): (fixed, bottom centre, glass that turns dark over dark scenes): Start (ink, cue on dark, sheen on hover, a halo pulse), menu (two bars morph to ×), "?" (Ask). A hairline across it fills with page progress. Any `[data-us-start]`, `[data-us-ask]` or `[data-us-go]` elsewhere opens the matching sheet or scrolls. Sheets open out of the dock with a `clip-path`, hold the page still (Lenis stops), trap focus, close on Escape or the scrim, and give focus back.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Understudy Scoped Styles (Part 1/3)** (`understudy-styles-1`, placement: `head`, 44961 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Understudy Scoped Styles (Part 2/3)** (`understudy-styles-2`, placement: `head`, 44992 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Understudy Scoped Styles (Part 3/3)** (`understudy-styles-3`, placement: `head`, 33192 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Understudy Interactive Runtime Bridge** (`understudy-runtime-1`, placement: `footer`, 347 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
