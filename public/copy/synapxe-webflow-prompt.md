# Webflow MCP Import Prompt: Synapxe (synapxe)

Import the **Synapxe** (Cyberpunk Techwear & Apparel) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/synapxe
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/synapxe-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/synapxe.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "synapxe" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "synapxe", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/synapxe-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Synapxe Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Knx Obsidian` | `--color-knx-obsidian` | `#090B0E` | `static_value` |
| `Color / Knx Slate` | `--color-knx-slate` | `#11161D` | `static_value` |
| `Color / Knx Tyvek` | `--color-knx-tyvek` | `#F1F5F9` | `static_value` |
| `Color / Knx Primary` | `--color-knx-primary` | `#F8FAFC` | `static_value` |
| `Color / Knx Muted` | `--color-knx-muted` | `#94A3B8` | `static_value` |
| `Color / Knx Cyan` | `--color-knx-cyan` | `#00F0FF` | `static_value` |
| `Color / Knx Magenta` | `--color-knx-magenta` | `#FF007F` | `static_value` |
| `Color / Knx Amber` | `--color-knx-amber` | `#FF7A00` | `static_value` |
| `Color / Knx Volt` | `--color-knx-volt` | `#D4FF00` | `static_value` |
| `Color / Bg Obsidian` | `--bg-obsidian` | `#090B0E` | `static_value` |
| `Color / Bg Slate` | `--bg-slate` | `#11161D` | `static_value` |
| `Color / Bg Panel` | `--bg-panel` | `rgba(17, 22, 29, 0.82)` | `static_value` |
| `Color / Tyvek White` | `--tyvek-white` | `#F1F5F9` | `static_value` |
| `Color / Text Primary` | `--text-primary` | `#F8FAFC` | `static_value` |
| `Color / Text Muted` | `--text-muted` | `#94A3B8` | `static_value` |
| `Color / Border Hairline` | `--border-hairline` | `rgba(226, 232, 240, 0.14)` | `static_value` |
| `Color / Neon Cyan` | `--neon-cyan` | `#00F0FF` | `static_value` |
| `Color / Neon Magenta` | `--neon-magenta` | `#FF007F` | `static_value` |
| `Color / Hazard Amber` | `--hazard-amber` | `#FF7A00` | `static_value` |
| `Color / Acid Volt` | `--acid-volt` | `#D4FF00` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#18222F` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#475569` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#E2E8F0` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Oswald` | Google Font: `Oswald` |
| `Font / Body` | `--font-body` | `Manrope` | Google Font: `Manrope` |
| `Font / Mono Tech` | `--font-mono-tech` | `var(--font-jetbrains)` | Fallback: `monospace` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Synapxe` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `synapxe.webp` (image/webp) — https://www.openlanding.page/gallery/synapxe.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Quick-Size Matrix** (`section-1`, mode: `native-whtml`): Selectable \`[S] [M] [L] [XL]\` buttons directly on the card. Clicking a size updates a live stock badge (e.g., \`STATUS: 2 UNITS LEFT IN SECTOR\`) and enables the \`+ ADD TO LOADOUT\` button.
2. **Colorway Swatch Pill** (`section-2`, mode: `native-whtml`): Toggle between \`STEALTH BLACK\`, \`OXIDE SLATE\`, and \`NEON NOIR\` (applies a subtle CSS hue/contrast shift to the product image and updates the variant SKU).
3. **Spec Telemetry Bars** (`section-3`, mode: `native-whtml`): 3 mini progress bars at the bottom of each card visualizing Waterproof rating, Breathability, and Weight.
4. **Layer 01 (Outer)** (`section-4`, mode: `native-whtml`): \`200D Ballistic Cordura® + DWR Fluorocarbon-Free Coating\` (Deflects external rain/wind).
5. **Layer 02 (Core)** (`section-5`, mode: `native-whtml`): \`Microporous Black ePTFE Hydrophobic Membrane\` (9 billion pores per sq inch).
6. **Layer 03 (Inner)** (`section-6`, mode: `native-whtml`): \`Tricot Micro-Grid Thermal & Moisture Wicking Backing\`.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Synapxe Scoped Styles** (`synapxe-styles-1`, placement: `head`, 7843 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Synapxe Interactive Runtime Bridge** (`synapxe-runtime-1`, placement: `footer`, 344 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
