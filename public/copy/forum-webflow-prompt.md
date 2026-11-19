# Webflow MCP Import Prompt: FORUM (forum)

Import the **FORUM** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/forum
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/forum-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/forum.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "forum" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "forum", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/forum-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`FORUM Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Forum Ink` | `--forum-ink` | `#171814` | `static_value` |
| `Color / Forum Black` | `--forum-black` | `#0E100C` | `static_value` |
| `Color / Forum Khaki` | `--forum-khaki` | `#B9B28A` | `static_value` |
| `Color / Forum Khaki Dark` | `--forum-khaki-dark` | `#8C876B` | `static_value` |
| `Color / Forum Ivory` | `--forum-ivory` | `#F6F3EA` | `static_value` |
| `Color / Forum Pale` | `--forum-pale` | `#D7D1B8` | `static_value` |
| `Color / Forum Line` | `--forum-line` | `rgba(185, 178, 138, 0.38)` | `static_value` |
| `Color / Forum Line Subtle` | `--forum-line-subtle` | `rgba(185, 178, 138, 0.18)` | `static_value` |
| `Color / Forum Ink Line` | `--forum-ink-line` | `rgba(23, 24, 20, 0.24)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Doto` | `--font-doto` | `Doto` | Google Font: `Doto` |
| `Font / Mono` | `--font-mono` | `var(--font-forum-mono)` | Fallback: `IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| `Font / Sans` | `--font-sans` | `var(--font-forum-sans)` | Fallback: `var(--font-plus-jakarta-sans), Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `FORUM` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `forum.webp` (image/webp) — https://www.openlanding.page/gallery/forum.webp (Gallery preview capture)
- `01-hero-forum-approved.webp` (image/webp) — https://www.openlanding.page/templates/forum/01-hero-forum-approved.webp (Template media asset)
- `02-hero-monolith-clean.webp` (image/webp) — https://www.openlanding.page/templates/forum/02-hero-monolith-clean.webp (Template media asset)
- `03-card-signal-observatory.webp` (image/webp) — https://www.openlanding.page/templates/forum/03-card-signal-observatory.webp (Template media asset)
- `04-card-network-field.webp` (image/webp) — https://www.openlanding.page/templates/forum/04-card-network-field.webp (Template media asset)
- `05-card-command-interface.webp` (image/webp) — https://www.openlanding.page/templates/forum/05-card-command-interface.webp (Template media asset)
- `06-card-orbital-archive.webp` (image/webp) — https://www.openlanding.page/templates/forum/06-card-orbital-archive.webp (Template media asset)
- `07-card-alignment-engine.webp` (image/webp) — https://www.openlanding.page/templates/forum/07-card-alignment-engine.webp (Template media asset)
- `08-divider-wide.webp` (image/webp) — https://www.openlanding.page/templates/forum/08-divider-wide.webp (Template media asset)
- `09-footer-mockup.webp` (image/webp) — https://www.openlanding.page/templates/forum/09-footer-mockup.webp (Template media asset)
- `media_1794230477731_7388dd6d.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230477731_7388dd6d.jpg (Template media asset)
- `media_1794230480445_ee49869f.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230480445_ee49869f.jpg (Template media asset)
- `media_1794230483564_5fc646f5.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230483564_5fc646f5.jpg (Template media asset)
- `media_1794230485819_0b74e975.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230485819_0b74e975.jpg (Template media asset)
- `media_1794230488708_7ad31867.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230488708_7ad31867.jpg (Template media asset)
- `media_1794230509291_1494f4f2.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230509291_1494f4f2.jpg (Template media asset)
- `media_1794230509535_3b0853c9.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230509535_3b0853c9.jpg (Template media asset)
- `media_1794230511256_f3458b8f.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230511256_f3458b8f.jpg (Template media asset)
- `media_1794230513477_90dc9d29.jpg` (image/jpeg) — https://www.openlanding.page/templates/forum/media_1794230513477_90dc9d29.jpg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/forum/preview-1600.webp (Template media asset)
- `r1-demo-filtered.png` (image/png) — https://www.openlanding.page/templates/forum/r1-demo-filtered.png (Template media asset)
- `r1-desktop-hero.png` (image/png) — https://www.openlanding.page/templates/forum/r1-desktop-hero.png (Template media asset)
- `r1-finale-footer.png` (image/png) — https://www.openlanding.page/templates/forum/r1-finale-footer.png (Template media asset)
- `r1-mobile-hero.png` (image/png) — https://www.openlanding.page/templates/forum/r1-mobile-hero.png (Template media asset)
- `r2-finale-footer.png` (image/png) — https://www.openlanding.page/templates/forum/r2-finale-footer.png (Template media asset)
- `r2-intelligence-engine.png` (image/png) — https://www.openlanding.page/templates/forum/r2-intelligence-engine.png (Template media asset)
- `r2-mobile-hero.png` (image/png) — https://www.openlanding.page/templates/forum/r2-mobile-hero.png (Template media asset)
- `r2-signal-board.png` (image/png) — https://www.openlanding.page/templates/forum/r2-signal-board.png (Template media asset)
- `01-hero-forum-approved.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/01-hero-forum-approved.webp (Template media asset)
- `02-hero-monolith-clean.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/02-hero-monolith-clean.webp (Template media asset)
- `03-card-signal-observatory.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/03-card-signal-observatory.webp (Template media asset)
- `04-card-network-field.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/04-card-network-field.webp (Template media asset)
- `05-card-command-interface.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/05-card-command-interface.webp (Template media asset)
- `06-card-orbital-archive.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/06-card-orbital-archive.webp (Template media asset)
- `07-card-alignment-engine.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/07-card-alignment-engine.webp (Template media asset)
- `08-divider-wide.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/08-divider-wide.webp (Template media asset)
- `09-footer-mockup.webp` (image/webp) — https://www.openlanding.page/templates/forum/forum/09-footer-mockup.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **FORUM Scoped Styles** (`forum-styles-1`, placement: `head`, 2831 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **FORUM Interactive Runtime Bridge** (`forum-runtime-1`, placement: `footer`, 350 / 45000 chars): Loads motion, three in page footer custom code with prefers-reduced-motion guard.
