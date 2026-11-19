# Webflow MCP Import Prompt: CTRL/ROOM (ctrlroom)

Import the **CTRL/ROOM** (Hardware & Productivity) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/ctrlroom
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/ctrlroom-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/ctrlroom.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "ctrlroom" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "ctrlroom", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/ctrlroom-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`CTRL/ROOM Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Cr Kernel Navy` | `--cr-kernel-navy` | `#111A31` | `static_value` |
| `Color / Cr Hyper Cobalt` | `--cr-hyper-cobalt` | `#2858FF` | `static_value` |
| `Color / Cr Monitor Frost` | `--cr-monitor-frost` | `#E8F0FF` | `static_value` |
| `Color / Cr Voltage Yellow` | `--cr-voltage-yellow` | `#E4FF58` | `static_value` |
| `Color / Cr Bubble Magenta` | `--cr-bubble-magenta` | `#FC5FA9` | `static_value` |
| `Color / Cr Registry Slate` | `--cr-registry-slate` | `#61728F` | `static_value` |
| `Color / Cr Screen Ice` | `--cr-screen-ice` | `#B6D7F7` | `static_value` |
| `Color / Palette 1` | `--color-palette-1` | `#050608` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#090E1C` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#0A1020` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#0B0D12` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#0B1121` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#0C1326` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#0D0F14` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#0D1529` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#0E1015` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#0F1420` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#131B2E` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#132247` | `static_value` |
| `Color / Palette 14` | `--color-palette-14` | `#15203D` | `static_value` |
| `Color / Palette 15` | `--color-palette-15` | `#152347` | `static_value` |
| `Color / Palette 16` | `--color-palette-16` | `#162242` | `static_value` |
| `Color / Palette 17` | `--color-palette-17` | `#162344` | `static_value` |
| `Color / Palette 18` | `--color-palette-18` | `#171A21` | `static_value` |
| `Color / Palette 19` | `--color-palette-19` | `#172342` | `static_value` |
| `Color / Palette 20` | `--color-palette-20` | `#17254A` | `static_value` |
| `Color / Palette 21` | `--color-palette-21` | `#181B22` | `static_value` |
| `Color / Palette 22` | `--color-palette-22` | `#182547` | `static_value` |
| `Color / Palette 23` | `--color-palette-23` | `#182649` | `static_value` |
| `Color / Palette 24` | `--color-palette-24` | `#192544` | `static_value` |
| `Color / Palette 25` | `--color-palette-25` | `#19284B` | `static_value` |
| `Color / Palette 26` | `--color-palette-26` | `#19284F` | `static_value` |
| `Color / Palette 27` | `--color-palette-27` | `#1A2747` | `static_value` |
| `Color / Palette 28` | `--color-palette-28` | `#1B1F3D` | `static_value` |
| `Color / Palette 29` | `--color-palette-29` | `#1B284A` | `static_value` |
| `Color / Palette 30` | `--color-palette-30` | `#1B2E5E` | `static_value` |
| `Color / Palette 31` | `--color-palette-31` | `#1E222B` | `static_value` |
| `Color / Palette 32` | `--color-palette-32` | `#1E2430` | `static_value` |
| `Color / Palette 33` | `--color-palette-33` | `#1E263B` | `static_value` |
| `Color / Palette 34` | `--color-palette-34` | `#262B36` | `static_value` |
| `Color / Palette 35` | `--color-palette-35` | `#26324D` | `static_value` |
| `Color / Palette 36` | `--color-palette-36` | `#272D3A` | `static_value` |
| `Color / Palette 38` | `--color-palette-38` | `#2B303C` | `static_value` |
| `Color / Palette 39` | `--color-palette-39` | `#2C3342` | `static_value` |
| `Color / Palette 40` | `--color-palette-40` | `#3A4252` | `static_value` |
| `Color / Palette 41` | `--color-palette-41` | `#3B4454` | `static_value` |
| `Color / Palette 42` | `--color-palette-42` | `#475166` | `static_value` |
| `Color / Palette 43` | `--color-palette-43` | `#495366` | `static_value` |
| `Color / Palette 45` | `--color-palette-45` | `#94A3B8` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Chakra Petch` | `--font-chakra-petch` | `Chakra Petch` | Google Font: `Chakra Petch` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `CTRL/ROOM` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `ctrlroom.webp` (image/webp) — https://www.openlanding.page/gallery/ctrlroom.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): > **Implemented motion update (2026-11-01):** Preserve this template's existing visual identity. Its current motion runtime uses route-scoped CSS and an event-driven `CtrlRoomMotion` controller, Motion for window presence, and native animat
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **CTRL/ROOM Scoped Styles** (`ctrlroom-styles-1`, placement: `head`, 12743 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **CTRL/ROOM Interactive Runtime Bridge** (`ctrlroom-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
