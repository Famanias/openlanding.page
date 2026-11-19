# Webflow MCP Import Prompt: LOWTIDE (lowtide)

Import the **LOWTIDE** (Sleep Tech & Wearables) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/lowtide
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/lowtide-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/lowtide.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "lowtide" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "lowtide", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/lowtide-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`LOWTIDE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Lt Night` | `--color-lt-night` | `#0A0D16` | `static_value` |
| `Color / Lt Foam` | `--color-lt-foam` | `#ECEFF0` | `static_value` |
| `Color / Lt Moon` | `--color-lt-moon` | `#EBD9A6` | `static_value` |
| `Color / Lt Plankton` | `--color-lt-plankton` | `#8FD3FF` | `static_value` |
| `Color / Lt Dusk` | `--color-lt-dusk` | `#7A8494` | `static_value` |
| `Color / Lt Dawn` | `--color-lt-dawn` | `#F2B28C` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Lt Display` | `--font-lt-display` | `Imbue` | Google Font: `Imbue` |
| `Font / Lt Body` | `--font-lt-body` | `Onest` | Google Font: `Onest` |
| `Font / Lt Mono` | `--font-lt-mono` | `var(--font-lt-xanh)` | Fallback: `ui-monospace, monospace` |
| `Font / Xanh Mono` | `--font-xanh-mono` | `Xanh Mono` | Google Font: `Xanh Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Lt Shift` | `--lt-shift` | `24px` | `static_value` |
| `Size / Lt Gutter` | `--lt-gutter` | `clamp(18px, 5vw, 72px)` | `custom_value` |
| `Size / Lt Max` | `--lt-max` | `1180px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `LOWTIDE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `lowtide.webp` (image/webp) — https://www.openlanding.page/gallery/lowtide.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **23:04, high tide (hook)** (`section-1`, mode: `native-whtml`): "Let the tide go out." — quiet line "A sleep ring for people who can't put the phone down."
2. **00:40 (problem)** (`section-2`, mode: `native-whtml`): "The scroll doesn't end. The night does." Bioluminescent plankton (GPU particles, ~37k) swarm into sourced figures: **1 in 3** US adults sleep under seven hours (CDC MMWR 2016), **7h** minimum (CDC), **95%** use a screen in the hour before bed (National Sleep Foundation 2011).
3. **02:15 (how it works)** (`section-3`, mode: `native-whtml`): "Three pools, read all night." Three rock pools: heart rate (rings at 60 bpm), skin temperature (water warms/cools over 8 s), breathing (a rim swells 12×/min).
4. **03:50 (smart wake)** (`section-4`, mode: `native-whtml`): "We wake you on the outgoing tide." A post-process ink melt bleeds the frame while arriving and resolves at rest.
5. **05:25 (proof)** (`section-5`, mode: `native-whtml`): three testimonials beside footprint trails pressed in wet sand; after the low tide the water returns and washes each trail away.
6. **06:40 (signature)** (`section-6`, mode: `native-whtml`): "The moon, on your hand." The moon's reflection in the last pool ripples, bends into a ring outline, and a procedural titanium ring (lathe of a rounded-rectangle profile, `MeshPhysicalMaterial`, `RoomEnvironment`) rises out of the water. Specs and "$279 · no subscription" etched in the sand.
7. **07:00 dawn (conversion)** (`section-7`, mode: `native-whtml`): "Your night": bedtime + wake time → a glowing tide line over the water (one dip per 90-min cycle, smart-wake marker), drag/arrow keys to walk it, "Keep your night" downloads a PNG; pre-order form (email, ring size 6–13, finish Moonstone / Tidewater / Driftwood) with a tide-wash success "See you at low tide."

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **LOWTIDE Scoped Styles** (`lowtide-styles-1`, placement: `head`, 20433 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **LOWTIDE Interactive Runtime Bridge** (`lowtide-runtime-1`, placement: `footer`, 503 / 45000 chars): Loads three, gsap, lenis, tone in page footer custom code with prefers-reduced-motion guard.
