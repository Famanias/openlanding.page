# Webflow MCP Import Prompt: Halo Desk (halodesk)

Import the **Halo Desk** (Productivity & Desktop Software) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/halodesk
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/halodesk-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/halodesk.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "halodesk" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "halodesk", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/halodesk-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Halo Desk Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Halo Ivory` | `--color-halo-ivory` | `#F8F5EE` | `static_value` |
| `Color / Halo Cloud` | `--color-halo-cloud` | `#FCFBF7` | `static_value` |
| `Color / Halo Ink` | `--color-halo-ink` | `#29313E` | `static_value` |
| `Color / Halo Muted` | `--color-halo-muted` | `#66717F` | `static_value` |
| `Color / Halo Powder` | `--color-halo-powder` | `#CFDFEF` | `static_value` |
| `Color / Halo Lavender` | `--color-halo-lavender` | `#DCD5F6` | `static_value` |
| `Color / Halo Peach` | `--color-halo-peach` | `#F7D9CB` | `static_value` |
| `Color / Halo Mint` | `--color-halo-mint` | `#D0EFE2` | `static_value` |
| `Color / Halo Butter` | `--color-halo-butter` | `#FFF1AE` | `static_value` |
| `Color / Halo Slate` | `--color-halo-slate` | `#6C798F` | `static_value` |
| `Color / Halo Ivory` | `--halo-ivory` | `#F8F5EE` | `static_value` |
| `Color / Halo Cloud` | `--halo-cloud` | `#FCFBF7` | `static_value` |
| `Color / Halo Ink` | `--halo-ink` | `#29313E` | `static_value` |
| `Color / Halo Muted` | `--halo-muted` | `#66717F` | `static_value` |
| `Color / Halo Powder` | `--halo-powder` | `#CFDFEF` | `static_value` |
| `Color / Halo Lavender` | `--halo-lavender` | `#DCD5F6` | `static_value` |
| `Color / Halo Peach` | `--halo-peach` | `#F7D9CB` | `static_value` |
| `Color / Halo Mint` | `--halo-mint` | `#D0EFE2` | `static_value` |
| `Color / Halo Butter` | `--halo-butter` | `#FFF1AE` | `static_value` |
| `Color / Halo Slate Button` | `--halo-slate-button` | `#6C798F` | `static_value` |
| `Color / Halo Line` | `--halo-line` | `rgba(58, 68, 83, 0.13)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Body` | `--font-body` | `var(--font-dm-sans)` | Fallback: `DM Sans, -apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Mono Tabular` | `--font-mono-tabular` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Halo Desk` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `halodesk.webp` (image/webp) — https://www.openlanding.page/gallery/halodesk.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/halodesk/preview-1600.webp (Template media asset)
- `halo-desk-reference_56496b08.png` (image/png) — https://www.openlanding.page/templates/halodesk/assets/aistudio/halo-desk-reference_56496b08.png (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Navbar** (`section-1`, mode: `native-whtml`): Refined top navigation bar with custom animated Halo logo icon, navigation anchors, and early-access download actions.
2. **Hero & Desktop in Miniature** (`section-2`, mode: `native-whtml`): Left column editorial copy with feature selector chips (Tasks, Calendar, Focus Mode, Notes); Right column interactive desktop window simulating the live Halo Desk application with task toggles, quick task creation, weekday calendar navigation, focus timer with progress circle, and realistic sticky notes.
3. **The Calm System** (`section-3`, mode: `native-whtml`): Interactive card showcase breaking down the 4 pillars of mindful productivity (Spatial Day Structuring, Timebox Alignment, Low-Cognitive Friction, Local-First Privacy).
4. **Workflow Storyboard** (`section-4`, mode: `native-whtml`): Step-by-step visual progression demonstrating how a peaceful day unfolds from morning planning to afternoon flow and evening reflection.
5. **Feature Lab** (`section-5`, mode: `native-whtml`): Hands-on sandbox letting visitors test drive the four key application modules (Tasks, Calendar, Focus, Notes) with interactive controls.
6. **Curated Templates** (`section-6`, mode: `native-whtml`): One-click rhythm presets (Deep Focus Sprint, Balanced Product Flow, Executive Alignment) that instantly reconfigure the hero simulation.
7. **Meaningful Details** (`section-7`, mode: `native-whtml`): Tactile micro-features including keyboard shortcuts, sensory feedback toggles, and notification shields.
8. **Pricing & Early Access** (`section-8`, mode: `native-whtml`): Transparent pricing tier comparison with an accessible modal supporting email validation and desktop download.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Halo Desk Scoped Styles** (`halodesk-styles-1`, placement: `head`, 7273 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Halo Desk Interactive Runtime Bridge** (`halodesk-runtime-1`, placement: `footer`, 273 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
