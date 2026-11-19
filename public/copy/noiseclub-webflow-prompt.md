# Webflow MCP Import Prompt: NOISE CLUB (noiseclub)

Import the **NOISE CLUB** (Sound Culture & Portable Instruments) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/noiseclub
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/noiseclub-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/noiseclub.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "noiseclub" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "noiseclub", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/noiseclub-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`NOISE CLUB Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Nc Ink` | `--color-nc-ink` | `#111313` | `static_value` |
| `Color / Nc Paper` | `--color-nc-paper` | `#F1EEE5` | `static_value` |
| `Color / Nc Acid` | `--color-nc-acid` | `#CBFF49` | `static_value` |
| `Color / Nc Red` | `--color-nc-red` | `#FF6748` | `static_value` |
| `Color / Nc Ink Black` | `--nc-ink-black` | `#111313` | `static_value` |
| `Color / Nc Paper Bone` | `--nc-paper-bone` | `#F1EEE5` | `static_value` |
| `Color / Nc Signal Acid` | `--nc-signal-acid` | `#CBFF49` | `static_value` |
| `Color / Nc Record Red` | `--nc-record-red` | `#FF6748` | `static_value` |
| `Color / Palette 1` | `--color-palette-1` | `#050505` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#070808` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#090A0A` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#090B0B` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#0A0B0B` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#0B0C0C` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#0B0D0D` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#0C0E0E` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#0D0F0F` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#0E1010` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#121414` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#131616` | `static_value` |
| `Color / Palette 14` | `--color-palette-14` | `#141717` | `static_value` |
| `Color / Palette 15` | `--color-palette-15` | `#151818` | `static_value` |
| `Color / Palette 16` | `--color-palette-16` | `#161919` | `static_value` |
| `Color / Palette 17` | `--color-palette-17` | `#171A1A` | `static_value` |
| `Color / Palette 18` | `--color-palette-18` | `#171B1A` | `static_value` |
| `Color / Palette 19` | `--color-palette-19` | `#181B1B` | `static_value` |
| `Color / Palette 20` | `--color-palette-20` | `#181C1C` | `static_value` |
| `Color / Palette 21` | `--color-palette-21` | `#191D1D` | `static_value` |
| `Color / Palette 22` | `--color-palette-22` | `#191E16` | `static_value` |
| `Color / Palette 23` | `--color-palette-23` | `#1A1D1D` | `static_value` |
| `Color / Palette 24` | `--color-palette-24` | `#1A1E1E` | `static_value` |
| `Color / Palette 25` | `--color-palette-25` | `#1B1E1E` | `static_value` |
| `Color / Palette 26` | `--color-palette-26` | `#1B2018` | `static_value` |
| `Color / Palette 27` | `--color-palette-27` | `#1C2020` | `static_value` |
| `Color / Palette 28` | `--color-palette-28` | `#1D2020` | `static_value` |
| `Color / Palette 29` | `--color-palette-29` | `#1D2121` | `static_value` |
| `Color / Palette 30` | `--color-palette-30` | `#1E2121` | `static_value` |
| `Color / Palette 31` | `--color-palette-31` | `#1E2222` | `static_value` |
| `Color / Palette 32` | `--color-palette-32` | `#202424` | `static_value` |
| `Color / Palette 33` | `--color-palette-33` | `#232727` | `static_value` |
| `Color / Palette 34` | `--color-palette-34` | `#252A2A` | `static_value` |
| `Color / Palette 35` | `--color-palette-35` | `#262929` | `static_value` |
| `Color / Palette 36` | `--color-palette-36` | `#262A2A` | `static_value` |
| `Color / Palette 37` | `--color-palette-37` | `#262B2B` | `static_value` |
| `Color / Palette 38` | `--color-palette-38` | `#282E22` | `static_value` |
| `Color / Palette 39` | `--color-palette-39` | `#2A2E2E` | `static_value` |
| `Color / Palette 40` | `--color-palette-40` | `#2B3024` | `static_value` |
| `Color / Palette 41` | `--color-palette-41` | `#2C3030` | `static_value` |
| `Color / Palette 42` | `--color-palette-42` | `#2D3131` | `static_value` |
| `Color / Palette 43` | `--color-palette-43` | `#2E3333` | `static_value` |
| `Color / Palette 44` | `--color-palette-44` | `#2E3434` | `static_value` |
| `Color / Palette 45` | `--color-palette-45` | `#323737` | `static_value` |
| `Color / Palette 46` | `--color-palette-46` | `#3A4040` | `static_value` |
| `Color / Palette 47` | `--color-palette-47` | `#525757` | `static_value` |
| `Color / Palette 48` | `--color-palette-48` | `#8A6619` | `static_value` |
| `Color / Palette 49` | `--color-palette-49` | `#8F6B1A` | `static_value` |
| `Color / Palette 50` | `--color-palette-50` | `#B4B2A8` | `static_value` |
| `Color / Palette 51` | `--color-palette-51` | `#BDBAAD` | `static_value` |
| `Color / Palette 52` | `--color-palette-52` | `#C49A38` | `static_value` |
| `Color / Palette 53` | `--color-palette-53` | `#C79B3B` | `static_value` |
| `Color / Palette 54` | `--color-palette-54` | `#C8C6BC` | `static_value` |
| `Color / Palette 56` | `--color-palette-56` | `#D6D3C9` | `static_value` |
| `Color / Palette 57` | `--color-palette-57` | `#E6C365` | `static_value` |
| `Color / Palette 58` | `--color-palette-58` | `#F0CE73` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Anton` | Google Font: `Anton` |
| `Font / Sans` | `--font-sans` | `Public Sans` | Google Font: `Public Sans` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `NOISE CLUB` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `noiseclub.webp` (image/webp) — https://www.openlanding.page/gallery/noiseclub.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Make the physical object matter** (`section-1`, mode: `native-whtml`): The actual PO-33 must be recognizable and technically accurate.
2. **Motion expresses sound editing** (`section-2`, mode: `native-whtml`): Capture → isolate → repeat → transform → release.
3. **Every scene has a narrative purpose** (`section-3`, mode: `native-whtml`): No motion exclusively to show off an animation library.
4. **One continuous publication** (`section-4`, mode: `native-whtml`): The page should feel like exploring a single long experimental music zine, not seven unrelated backgrounds.
5. **Silent by default** (`section-5`, mode: `native-whtml`): Never autoplay audible sound or automatically request microphone access.
6. **Interactions are real** (`section-6`, mode: `native-whtml`): Tabs, effects, buttons, playback, and sequence edits must affect actual state.
7. **Desktop can be cinematic; mobile must remain usable** (`section-7`, mode: `native-whtml`): Maintain story coherence with reduced complexity.
8. **Accessible without motion** (`section-8`, mode: `native-whtml`): Information and actions remain available with reduced motion, keyboard input, touch, and without audio.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **NOISE CLUB Scoped Styles** (`noiseclub-styles-1`, placement: `head`, 3201 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **NOISE CLUB Interactive Runtime Bridge** (`noiseclub-runtime-1`, placement: `footer`, 419 / 45000 chars): Loads gsap, lenis in page footer custom code with prefers-reduced-motion guard.
