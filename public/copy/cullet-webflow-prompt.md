# Webflow MCP Import Prompt: Cullet (cullet)

Import the **Cullet** (3D & Design Tools) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/cullet
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/cullet-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/cullet.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "cullet" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "cullet", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/cullet-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Cullet Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Fc Ink` | `--color-fc-ink` | `#0F1117` | `static_value` |
| `Color / Fc Paper` | `--color-fc-paper` | `#F4F5F8` | `static_value` |
| `Color / Fc White` | `--color-fc-white` | `#FFFFFF` | `static_value` |
| `Color / Fc Slate` | `--color-fc-slate` | `#525866` | `static_value` |
| `Color / Fc Mist` | `--color-fc-mist` | `#9AA1B2` | `static_value` |
| `Color / Fc Haze` | `--color-fc-haze` | `#DCE8FF` | `static_value` |
| `Color / Fc Cobalt` | `--color-fc-cobalt` | `#2563EB` | `static_value` |
| `Color / Fc Emerald` | `--color-fc-emerald` | `#10B981` | `static_value` |
| `Color / Fc Ink` | `--fc-ink` | `#0F1117` | `static_value` |
| `Color / Fc Paper` | `--fc-paper` | `#F4F5F8` | `static_value` |
| `Color / Fc White` | `--fc-white` | `#FFFFFF` | `static_value` |
| `Color / Fc Slate` | `--fc-slate` | `#525866` | `static_value` |
| `Color / Fc Mist` | `--fc-mist` | `#9AA1B2` | `static_value` |
| `Color / Fc Haze` | `--fc-haze` | `#DCE8FF` | `static_value` |
| `Color / Fc Cobalt` | `--fc-cobalt` | `#2563EB` | `static_value` |
| `Color / Fc Emerald` | `--fc-emerald` | `#10B981` | `static_value` |
| `Color / Fc Line` | `--fc-line` | `color-mix(in oklab, var(--fc-ink) 9%, transparent)` | `custom_value` |
| `Color / Fc Line Strong` | `--fc-line-strong` | `color-mix(in oklab, var(--fc-ink) 16%, transparent)` | `custom_value` |
| `Color / Fc Glass` | `--fc-glass` | `color-mix(in oklab, var(--fc-white) 78%, transparent)` | `custom_value` |
| `Color / Fc Shade` | `--fc-shade` | `color-mix(in oklab, var(--fc-haze) 55%, var(--fc-mist))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |
| `Font / Inter` | `--font-inter` | `Inter` | Google Font: `Inter` |
| `Font / Inter Tight` | `--font-inter-tight` | `Inter Tight` | Google Font: `Inter Tight` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Fc Lift` | `--fc-lift` | `0 1px 0 color-mix(in oklab, var(--fc-white) 90%, transparent) inset, 0 18px 40px -18px color-mix(in oklab, var(--fc-ink) 22%, transparent), 0 2px 6px color-mix(in oklab, var(--fc-ink) 5%, transparent)` | `custom_value` |
| `Size / Fc Gut` | `--fc-gut` | `clamp(16px, 0.4rem + 3.6vw, 64px)` | `custom_value` |
| `Size / Fc Max` | `--fc-max` | `1240px` | `static_value` |
| `Size / U` | `--u` | `clamp(0, (var(--cleave, 0) - 0.3) * 2.2, 1)` | `custom_value` |
| `Size / F` | `--f` | `clamp(0, (var(--cleave, 0) - var(--i) * 0.035) / 0.62, 1)` | `custom_value` |
| `Size / E` | `--e` | `calc(var(--f) * var(--f) * var(--f))` | `custom_value` |
| `Size / Hand` | `--hand` | `clamp(0, (var(--p, 0) - 0.9) / 0.1, 1)` | `custom_value` |
| `Size / Cut Y` | `--cut-y` | `calc(56px + (1 - var(--enter, 1)) * 90px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Cullet` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `cullet.webp` (image/webp) — https://www.openlanding.page/gallery/cullet.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): (fixed glass bar): lockup, Terms · Studio · Materials · Pricing with a cobalt indicator that slides (transform only) to the current section, "Open studio". It arrives once the slab has cleaved, tucks away on scroll-down and returns on scroll-up, and has a page-progress hairline. On phones: a menu sheet that opens with a clip-path circle from the toggle, staggers its links, traps focus, closes on Escape and gives focus back.
2. **Terms** (`section-2`, mode: `native-whtml`): (`#terms`, Chapter 01, held for 5 × 78svh on ≥960px): a rail of five numbered terms (Iridescence, Index of refraction, Dispersion, Transmission, Roughness) with a sliding glass pill; one glass figure at a time with an SVG ray diagram (thin film, Snell, prism with a spectral fan, a frosted slab scattering, micro-shards with narrow and wide cones), a readout chip, `01 / 05`, the term and its definition. Each step wipes the figure in on a diagonal and draws its rays in order. The rail jumps to a step. Elsewhere it is five stacked cards.
3. **Studio** (`section-3`, mode: `hybrid-embed`): (`#sampler`, Chapter 02, "Turn the dials. Watch the light."): a white sheet that slides over the held terms. A 4:3 stage (WebGL near the viewport on desktop, on tap on touch) with a 10-face lathe gem in transmissive `MeshPhysicalMaterial` in front of a striped studio card, turning slowly and dragged with inertia, with a HUD ("Live · WebGL" and the measured frame time). Six preset chips; five range dials (IOR 1–2.4, dispersion 0–1, roughness 0–1, thickness 0.1–4 cm, iridescence 0–1); the Abbe number; and a glTF readout (`KHR_materials_ior/_dispersion/_transmission/_volume/_iridescence`) whose changed line flashes, with "Copy JSON". Before WebGL, an SVG poster answers every dial: the fan bends `34°·(ior−1)`, spreads `46°·d·(ior−1)`, blurs with roughness, and a film tint follows iridescence.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Workflow** (`section-4`, mode: `native-whtml`): (`#workflow`, Chapter 03, "Cut. Preview. Ship."): three steps joined by a drawn cobalt line, each with a working surface: a layer stack, three renderer tiles with ms readouts, and a code snippet.
5. **Materials** (`section-5`, mode: `native-whtml`): (`#materials`, Chapter 04, "Six cuts to start from."): a white sheet whose top edge is a cut line that levels out as it enters. Six cards (Crown silica CU-152, Dense flint CU-172, Frosted quartz CU-154, Borosilicate CU-147, Sapphire CU-177, Opal film CU-145) with palette-only CSS glass swatches, IOR / Abbe / roughness, a use line, and "Open in studio", which loads the preset into the sampler and travels there.
6. **Proof** (`section-6`, mode: `native-whtml`): (`#proof`, Chapter 05, "Glass that fits in a frame."): four count-up stats with drawn rules, a marquee of renderers that read the export, three studio notes.
7. **Pricing** (`section-7`, mode: `native-whtml`): (`#pricing`, Chapter 06, "Pay for the seat, not the render."): a monthly/yearly radio switch with a sliding pill; three cuts; prices roll in on change.
8. **Open** (`section-8`, mode: `native-whtml`): (`#open`, Chapter 07, ink): "Your first glass is ten minutes away." with a seat form: work email, a role chip group, team size. Rules in `forms/request.ts` (tested). Invalid fields shake once, messages slide down, and focus goes to the first error. Submit shows "Cutting your seat…", then the form cleaves away and a glass shard settles with an emerald tick: "Your seat is cut." with a stable seat number and a starter material. No network request.
9. **Footer** (`section-9`, mode: `native-whtml`): lockup, index, a giant wordmark with a cobalt cut through it, "© 2026 Cullet Lab · a fictional brand for a landing-page template", "Back to the slab ↑".

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Cullet Scoped Styles (Part 1/2)** (`cullet-styles-1`, placement: `head`, 44956 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Cullet Scoped Styles (Part 2/2)** (`cullet-styles-2`, placement: `head`, 22690 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Cullet Interactive Runtime Bridge** (`cullet-runtime-1`, placement: `footer`, 424 / 45000 chars): Loads three, lenis in page footer custom code with prefers-reduced-motion guard.
