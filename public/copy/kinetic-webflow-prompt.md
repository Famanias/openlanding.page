# Webflow MCP Import Prompt: KINETIC (kinetic)

Import the **KINETIC** (Freight & Autonomous Logistics) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/kinetic
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/kinetic-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/kinetic.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "kinetic" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "kinetic", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/kinetic-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KINETIC Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#FAF7F2` | `static_value` |
| `Color / Ink` | `--color-ink` | `#1B1522` | `static_value` |
| `Color / Accent` | `--color-accent` | `#FF6B2B` | `static_value` |
| `Color / Apricot` | `--color-apricot` | `#FFE6D2` | `static_value` |
| `Color / Mint` | `--color-mint` | `#00D4B2` | `static_value` |
| `Color / Carbon` | `--color-carbon` | `#2A1E30` | `static_value` |
| `Color / Steel` | `--color-steel` | `#8E8294` | `static_value` |
| `Color / Canvas` | `--canvas` | `#FAF7F2` | `static_value` |
| `Color / Surface` | `--surface` | `#FAF7F2` | `static_value` |
| `Color / Surface Alt` | `--surface-alt` | `#FFE6D2` | `static_value` |
| `Color / Surface Nested` | `--surface-nested` | `color-mix(in srgb, #FAF7F2 90%, #1B1522)` | `custom_value` |
| `Color / Text` | `--text` | `#1B1522` | `static_value` |
| `Color / Text Secondary` | `--text-secondary` | `color-mix(in srgb, #1B1522 75%, transparent)` | `custom_value` |
| `Color / Text Muted` | `--text-muted` | `#8E8294` | `static_value` |
| `Color / Text Faint` | `--text-faint` | `color-mix(in srgb, #8E8294 65%, transparent)` | `custom_value` |
| `Color / Text On Brand` | `--text-on-brand` | `#FAF7F2` | `static_value` |
| `Color / Text On Deep` | `--text-on-deep` | `#FAF7F2` | `static_value` |
| `Color / Text On Accent` | `--text-on-accent` | `#FAF7F2` | `static_value` |
| `Color / Border` | `--border` | `color-mix(in srgb, #8E8294 25%, transparent)` | `custom_value` |
| `Color / Border Strong` | `--border-strong` | `color-mix(in srgb, #8E8294 45%, transparent)` | `custom_value` |
| `Color / Divider` | `--divider` | `color-mix(in srgb, #8E8294 15%, transparent)` | `custom_value` |
| `Color / Brand Deep` | `--brand-deep` | `#1B1522` | `static_value` |
| `Color / Brand Route` | `--brand-route` | `#FF6B2B` | `static_value` |
| `Color / Brand Route Hover` | `--brand-route-hover` | `color-mix(in srgb, #FF6B2B 85%, #1B1522)` | `custom_value` |
| `Color / Brand Route Pressed` | `--brand-route-pressed` | `color-mix(in srgb, #FF6B2B 70%, #1B1522)` | `custom_value` |
| `Color / Brand Route Soft` | `--brand-route-soft` | `#FFE6D2` | `static_value` |
| `Color / Accent` | `--accent` | `#FF6B2B` | `static_value` |
| `Color / Accent Hover` | `--accent-hover` | `color-mix(in srgb, #FF6B2B 85%, #1B1522)` | `custom_value` |
| `Color / Accent Pressed` | `--accent-pressed` | `color-mix(in srgb, #FF6B2B 70%, #1B1522)` | `custom_value` |
| `Color / Accent Soft` | `--accent-soft` | `#FFE6D2` | `static_value` |
| `Color / Brand Cyan` | `--brand-cyan` | `#00D4B2` | `static_value` |
| `Color / Brand Cyan Soft` | `--brand-cyan-soft` | `color-mix(in srgb, #00D4B2 15%, #FAF7F2)` | `custom_value` |
| `Color / Success` | `--success` | `#00D4B2` | `static_value` |
| `Color / Success Soft` | `--success-soft` | `color-mix(in srgb, #00D4B2 15%, #FAF7F2)` | `custom_value` |
| `Color / Success Border` | `--success-border` | `color-mix(in srgb, #00D4B2 35%, transparent)` | `custom_value` |
| `Color / Warning` | `--warning` | `#FF6B2B` | `static_value` |
| `Color / Warning Highlight` | `--warning-highlight` | `#FF6B2B` | `static_value` |
| `Color / Warning Soft` | `--warning-soft` | `#FFE6D2` | `static_value` |
| `Color / Warning Border` | `--warning-border` | `color-mix(in srgb, #FF6B2B 35%, transparent)` | `custom_value` |
| `Color / Danger` | `--danger` | `#FF6B2B` | `static_value` |
| `Color / Danger Soft` | `--danger-soft` | `#FFE6D2` | `static_value` |
| `Color / Danger Border` | `--danger-border` | `color-mix(in srgb, #FF6B2B 35%, transparent)` | `custom_value` |
| `Color / Neutral Status` | `--neutral-status` | `#8E8294` | `static_value` |
| `Color / Neutral Status Soft` | `--neutral-status-soft` | `color-mix(in srgb, #8E8294 15%, #FAF7F2)` | `custom_value` |
| `Color / Neutral Status Border` | `--neutral-status-border` | `color-mix(in srgb, #8E8294 30%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-bricolage)` | Fallback: `system-ui, -apple-system, sans-serif` |
| `Font / Body` | `--font-body` | `Inter` | Google Font: `Inter` |
| `Font / Mono` | `--font-mono` | `var(--font-jetbrains)` | Fallback: `ui-monospace, monospace` |
| `Font / Roboto Mono` | `--font-roboto-mono` | `var(--font-jetbrains)` | Fallback: `ui-monospace, monospace` |
| `Font / Ui` | `--font-ui` | `var(--font-inter)` | Fallback: `system-ui, -apple-system, sans-serif` |
| `Font / Bricolage Grotesque` | `--font-bricolage-grotesque` | `Bricolage Grotesque` | Google Font: `Bricolage Grotesque` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Shadow Low` | `--shadow-low` | `0 1px 3px rgba(27, 21, 34, 0.06)` | `static_value` |
| `Size / Shadow Panel` | `--shadow-panel` | `0 6px 18px -12px rgba(27, 21, 34, 0.22)` | `static_value` |
| `Size / Nav H` | `--nav-h` | `72px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KINETIC` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `kinetic.webp` (image/webp) — https://www.openlanding.page/gallery/kinetic.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **01 Ingestion (Hero)** (`section-1`, mode: `native-whtml`): Origin DC yard. Headline *"From One Click to Your Hands in 24 Minutes."*, live market ticker, and primary pill CTA *"DISPATCH ORDER #KX-9042"*.
2. **02 Sortation** (`section-2`, mode: `native-whtml`): Optical induction scanning archway. Interactive item routing demo and live weight verification.
3. **03 Transit** (`section-3`, mode: `native-whtml`): Arterial highway bridge at twilight. Live speedometer, battery level, route elevation grade, and countdown telemetry.
4. **04 Megamarket Deals** (`section-4`, mode: `native-whtml`): Metropolitan distribution corridor. Flash-drop marketplace cards (Audio, Apparel, Battery) with live SVG connector curves linking items directly to the traveling truck.
5. **05 Doorstep Arrival** (`section-5`, mode: `native-whtml`): Destination dock bay. Interactive tamper-seal unboxing demo verifying delivery handoff, plus client-side VIP Express instant dispatch form.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KINETIC Scoped Styles** (`kinetic-styles-1`, placement: `head`, 42059 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KINETIC Interactive Runtime Bridge** (`kinetic-runtime-1`, placement: `footer`, 425 / 45000 chars): Loads three, lenis in page footer custom code with prefers-reduced-motion guard.
