# Webflow MCP Import Prompt: KINFIELD (kinfield)

Import the **KINFIELD** (Movement & wellbeing) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/kinfield
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/kinfield-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/kinfield.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "kinfield" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "kinfield", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/kinfield-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KINFIELD Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Kf Bone` | `--kf-bone` | `#F4EEE6` | `static_value` |
| `Color / Kf Olive` | `--kf-olive` | `#777F5E` | `static_value` |
| `Color / Kf Aubergine` | `--kf-aubergine` | `#554352` | `static_value` |
| `Color / Kf Melon` | `--kf-melon` | `#EFAE97` | `static_value` |
| `Color / Kf Cocoa` | `--kf-cocoa` | `#352C2C` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Body` | `--font-body` | `system-ui` | System font stack |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Kf Radius Xl` | `--kf-radius-xl` | `32px` | `static_value` |
| `Size / Kf Radius Lg` | `--kf-radius-lg` | `24px` | `static_value` |
| `Size / Kf Radius Md` | `--kf-radius-md` | `16px` | `static_value` |
| `Size / Kf Radius Sm` | `--kf-radius-sm` | `12px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KINFIELD` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `kinfield.webp` (image/webp) — https://www.openlanding.page/gallery/kinfield.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js and React landing page for KINFIELD, a fictional movement and recovery studio, using the supplied portrait sequence, instructor photographs and studio interior. The page should feel like a tactile contemporary danc
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KINFIELD Scoped Styles** (`kinfield-styles-1`, placement: `head`, 29204 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KINFIELD Interactive Runtime Bridge** (`kinfield-runtime-1`, placement: `footer`, 344 / 45000 chars): Loads gsap, motion in page footer custom code with prefers-reduced-motion guard.
