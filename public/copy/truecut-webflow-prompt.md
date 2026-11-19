# Webflow MCP Import Prompt: TRUECUT Works (truecut)

Import the **TRUECUT Works** (Field Engineering & Commissioning) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/truecut
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/truecut-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/truecut.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "truecut" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "truecut", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/truecut-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TRUECUT Works Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Tc Asphalt` | `--color-tc-asphalt` | `#172026` | `static_value` |
| `Color / Tc Paper` | `--color-tc-paper` | `#F5F0E5` | `static_value` |
| `Color / Tc Accent` | `--color-tc-accent` | `#E8F146` | `static_value` |
| `Color / Tc Steel` | `--color-tc-steel` | `#B4C3C1` | `static_value` |
| `Color / Tc Oxide` | `--color-tc-oxide` | `#4B6A72` | `static_value` |
| `Color / Tc Rust` | `--color-tc-rust` | `#C96B45` | `static_value` |
| `Color / Tc Asphalt` | `--tc-asphalt` | `#172026` | `static_value` |
| `Color / Tc Paper` | `--tc-paper` | `#F5F0E5` | `static_value` |
| `Color / Tc Accent` | `--tc-accent` | `#E8F146` | `static_value` |
| `Color / Tc Steel` | `--tc-steel` | `#B4C3C1` | `static_value` |
| `Color / Tc Oxide` | `--tc-oxide` | `#4B6A72` | `static_value` |
| `Color / Tc Rust` | `--tc-rust` | `#C96B45` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Tc Display` | `--font-tc-display` | `var(--font-truecut-display)` | Fallback: `Impact, sans-serif` |
| `Font / Tc Body` | `--font-tc-body` | `var(--font-truecut-body)` | Fallback: `ui-sans-serif, sans-serif` |
| `Font / Tc Mono` | `--font-tc-mono` | `var(--font-truecut-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / Archivo Black` | `--font-archivo-black` | `Archivo Black` | Google Font: `Archivo Black` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Tc Container` | `--tc-container` | `1260px` | `static_value` |
| `Size / Tc Gutter` | `--tc-gutter` | `clamp(20px, 5vw, 76px)` | `custom_value` |
| `Size / Tc Section Gap` | `--tc-section-gap` | `clamp(88px, 12vw, 180px)` | `custom_value` |
| `Size / Tc Radius` | `--tc-radius` | `2px` | `static_value` |
| `Size / Tc Reveal Shift` | `--tc-reveal-shift` | `28px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TRUECUT Works` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `truecut.webp` (image/webp) — https://www.openlanding.page/gallery/truecut.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Hero / site walk** (`section-1`, mode: `native-whtml`): full-bleed `hero-site-reel.mp4` with `hero-site-walk` poster, headline “See the work. Book the next step.”, one primary CTA, one proof link, and three numbered field-log cues.
2. **Capabilities** (`section-2`, mode: `native-whtml`): four image cards (`capability-testing`, `capability-controls`, `capability-retrofit`, `capability-design`). Selecting a card marks the scope and syncs the booking form’s service radio.
3. **Field reel** (`section-3`, mode: `hybrid-embed`): pinned stage with `process-proof.mp4`, three measured notes (site, proof, handoff), and a survey marker that updates as notes enter the viewport.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Projects** (`section-4`, mode: `native-whtml`): three full-bleed proof cards (`project-switchyard`, `project-control-room`, `project-panel-detail`) with project IDs and handoff notes.
5. **Working method** (`section-5`, mode: `native-whtml`): dark section with `safety-hands` and `handoff-drawing`, plus three steps: read the site, make the proof, leave the handoff.
6. **Booking** (`section-6`, mode: `native-whtml`): `credential-grid` and panel detail images beside a local form for name, work email, and service. Submit transitions idle → loading → success and replaces the form with a ticket containing `SITE VISIT REQUESTED` and a stable code.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TRUECUT Works Scoped Styles** (`truecut-styles-1`, placement: `head`, 31294 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
