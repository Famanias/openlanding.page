# Webflow MCP Import Prompt: PARALLEL (parallel)

Import the **PARALLEL** (AI & Simulation) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/parallel
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/parallel-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/parallel.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "parallel" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "parallel", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/parallel-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`PARALLEL Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#0B0C0E` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#101315` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#12141A` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#14171C` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#171A1C` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#181B20` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#24282B` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#2B303A` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#2D8A61` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#38BDF8` | `static_value` |
| `Color / Palette 11` | `--color-palette-11` | `#666D70` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#6E6E6E` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#808080` | `static_value` |
| `Color / Palette 14` | `--color-palette-14` | `#9CA3AF` | `static_value` |
| `Color / Palette 15` | `--color-palette-15` | `#D44D27` | `static_value` |
| `Color / Palette 16` | `--color-palette-16` | `#D94E3E` | `static_value` |
| `Color / Palette 17` | `--color-palette-17` | `#D99B26` | `static_value` |
| `Color / Palette 18` | `--color-palette-18` | `#D9C39E` | `static_value` |
| `Color / Palette 19` | `--color-palette-19` | `#E05A47` | `static_value` |
| `Color / Palette 20` | `--color-palette-20` | `#E85D36` | `static_value` |
| `Color / Palette 21` | `--color-palette-21` | `#E8E8E3` | `static_value` |
| `Color / Palette 22` | `--color-palette-22` | `#EFECE6` | `static_value` |
| `Color / Palette 23` | `--color-palette-23` | `#F4F1EA` | `static_value` |
| `Color / Palette 24` | `--color-palette-24` | `#F6F5F1` | `static_value` |
| `Color / Palette 25` | `--color-palette-25` | `#FF5522` | `static_value` |
| `Color / Palette 26` | `--color-palette-26` | `#FF6B42` | `static_value` |
| `Color / Palette 27` | `--color-palette-27` | `#FFE4B5` | `static_value` |
| `Color / Palette 28` | `--color-palette-28` | `#259A6C` | `static_value` |
| `Color / Palette 29` | `--color-palette-29` | `#454C4F` | `static_value` |
| `Color / Palette 30` | `--color-palette-30` | `#777D7D` | `static_value` |
| `Color / Palette 31` | `--color-palette-31` | `#7A8B90` | `static_value` |
| `Color / Palette 32` | `--color-palette-32` | `#9DA3A2` | `static_value` |
| `Color / Palette 33` | `--color-palette-33` | `#B3B9B7` | `static_value` |
| `Color / Palette 34` | `--color-palette-34` | `#B4B8B5` | `static_value` |
| `Color / Palette 35` | `--color-palette-35` | `#B6C3C7` | `static_value` |
| `Color / Palette 36` | `--color-palette-36` | `#BCC1BF` | `static_value` |
| `Color / Palette 37` | `--color-palette-37` | `#BEC2BF` | `static_value` |
| `Color / Palette 38` | `--color-palette-38` | `#BFC4C2` | `static_value` |
| `Color / Palette 39` | `--color-palette-39` | `#C1CCCF` | `static_value` |
| `Color / Palette 40` | `--color-palette-40` | `#C5C8C5` | `static_value` |
| `Color / Palette 41` | `--color-palette-41` | `#C5CAC7` | `static_value` |
| `Color / Palette 42` | `--color-palette-42` | `#C6C8C4` | `static_value` |
| `Color / Palette 43` | `--color-palette-43` | `#CFD1CD` | `static_value` |
| `Color / Palette 44` | `--color-palette-44` | `#CFD7D9` | `static_value` |
| `Color / Palette 45` | `--color-palette-45` | `#D4D6D2` | `static_value` |
| `Color / Palette 46` | `--color-palette-46` | `#D5DDD9` | `static_value` |
| `Color / Palette 47` | `--color-palette-47` | `#DCDFD9` | `static_value` |
| `Color / Palette 48` | `--color-palette-48` | `#DCEEE6` | `static_value` |
| `Color / Palette 49` | `--color-palette-49` | `#DFEFE8` | `static_value` |
| `Color / Palette 50` | `--color-palette-50` | `#E0DFDA` | `static_value` |
| `Color / Palette 51` | `--color-palette-51` | `#E2E6E4` | `static_value` |
| `Color / Palette 52` | `--color-palette-52` | `#E4E5E0` | `static_value` |
| `Color / Palette 53` | `--color-palette-53` | `#E4ECE8` | `static_value` |
| `Color / Palette 54` | `--color-palette-54` | `#E5E4DF` | `static_value` |
| `Color / Palette 55` | `--color-palette-55` | `#F0E3DC` | `static_value` |
| `Color / Palette 56` | `--color-palette-56` | `#F2DFD8` | `static_value` |
| `Color / Palette 57` | `--color-palette-57` | `#F3DBD5` | `static_value` |
| `Color / Palette 58` | `--color-palette-58` | `#F5E4DD` | `static_value` |
| `Color / Palette 59` | `--color-palette-59` | `#FAF9F6` | `static_value` |
| `Color / Palette 60` | `--color-palette-60` | `#FFFFFF` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-display` | Fallback: `Outfit, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Sans` | `--font-sans` | `var(--font-sans` | Fallback: `Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Mono` | `--font-mono` | `var(--font-mono` | Fallback: `IBM Plex Mono, monospace)` |
| `Font / Outfit` | `--font-outfit` | `Outfit` | Google Font: `Outfit` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `PARALLEL` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `parallel.webp` (image/webp) — https://www.openlanding.page/gallery/parallel.webp (Gallery preview capture)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/parallel/icon.svg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/parallel/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header & Telemetry HUD** (`section-1`, mode: `native-whtml`): Minimal sticky navigation with PARALLEL wordmark, system status indicator, mode shortcuts, anchor navigation, and primary "Request Simulation" CTA.
2. **Hero Simulation Stage (The 3D Digital Twin)** (`section-2`, mode: `hybrid-embed`): Full-bleed procedural Three.js architectural model with 6 operational chapters:
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
3. **Interactive 2.5D Workflow Twin Canvas** (`section-3`, mode: `hybrid-embed`): Synchronized stage demonstrating automated graph re-weighting, dynamic corridor diversion, and real-time impedance optimization.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Side-by-Side Reality Comparison** (`section-4`, mode: `native-whtml`): Build the upstream 2.5D SVG city exhibit with six districts, three bridges, and paired baseline/intervention views. Share a deterministic 07:00–10:00 timeline with a 07:30 Central Bridge closure, defaulting to 08:45. Include play/pause, timeline scrubbing, time checkpoints, Dynamic Rerouting, Transit Capacity Surge, Freight Window Slotting, split/merge, split replay, crossing focus, reset, paired entity inspection, and mobile stacked/Future A/Future B views. Keep Future A invariant when interventions change; close the Central Bridge in both futures after 07:30. Show the synthetic-data disclosure. Render this exhibit with SVG and reuse cached simulation states. Cap replay at 24 fps, pause offscreen or when the page is hidden, and show the completed replay immediately for reduced motion.
5. **Causal Reasoning & Explainability Ledger** (`section-5`, mode: `native-whtml`): Step-through inspection cards detailing why decisions are recommended, with confidence intervals and graph path evidence.
6. **Proof of Impact & Performance Metrics** (`section-6`, mode: `native-whtml`): Quantitative benchmarks (reduction in congestion spillovers, cross-river flow preservation, delivery time savings).
7. **Simulation Intake Form** (`section-7`, mode: `native-whtml`): Interactive client-side validated intake module with scenario parameter selection and submission confirmation.
8. **Footer & Technical Specs** (`section-8`, mode: `native-whtml`): Architecture specifications, platform requirements, model versioning telemetry, and full sitemap links.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **PARALLEL Scoped Styles** (`parallel-styles-1`, placement: `head`, 1800 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **PARALLEL Interactive Runtime Bridge** (`parallel-runtime-1`, placement: `footer`, 498 / 45000 chars): Loads three, gsap, lenis in page footer custom code with prefers-reduced-motion guard.
