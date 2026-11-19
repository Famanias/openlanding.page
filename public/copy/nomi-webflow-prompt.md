# Webflow MCP Import Prompt: NOMI (nomi)

Import the **NOMI** (Tutoring & Education) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/nomi
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/nomi-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/nomi.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "nomi" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "nomi", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/nomi-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`NOMI Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Error` | `--color-error` | `oklch(52% 0.19 27)` | `static_value` |
| `Color / Success` | `--color-success` | `oklch(50% 0.12 150)` | `static_value` |
| `Color / Paper` | `--color-paper` | `oklch(97.6% 0.011 88)` | `static_value` |
| `Color / Paper 2` | `--color-paper-2` | `oklch(96.5% 0.02 160)` | `static_value` |
| `Color / Paper 3` | `--color-paper-3` | `oklch(93% 0.036 160)` | `static_value` |
| `Color / Ink` | `--color-ink` | `oklch(21% 0.025 170)` | `static_value` |
| `Color / Ink 2` | `--color-ink-2` | `oklch(31% 0.02 170)` | `static_value` |
| `Color / Muted` | `--color-muted` | `oklch(49% 0.024 165)` | `static_value` |
| `Color / Rule` | `--color-rule` | `oklch(86.5% 0.022 140)` | `static_value` |
| `Color / Accent` | `--color-accent` | `oklch(50% 0.13 160)` | `static_value` |
| `Color / Accent Deep` | `--color-accent-deep` | `oklch(42% 0.11 162)` | `static_value` |
| `Color / Accent Soft` | `--color-accent-soft` | `oklch(88% 0.08 160)` | `static_value` |
| `Color / Accent Ink` | `--color-accent-ink` | `oklch(99% 0.006 160)` | `static_value` |
| `Color / Focus` | `--color-focus` | `oklch(45% 0.14 160)` | `static_value` |
| `Color / P Mon` | `--p-mon` | `oklch(85% 0.052 22)` | `static_value` |
| `Color / P Tue` | `--p-tue` | `oklch(87.5% 0.058 64)` | `static_value` |
| `Color / P Wed` | `--p-wed` | `oklch(91.5% 0.064 98)` | `static_value` |
| `Color / P Thu` | `--p-thu` | `oklch(86.5% 0.075 160)` | `static_value` |
| `Color / P Fri` | `--p-fri` | `oklch(87% 0.048 210)` | `static_value` |
| `Color / P Sat` | `--p-sat` | `oklch(84% 0.045 270)` | `static_value` |
| `Color / P Sun` | `--p-sun` | `oklch(84% 0.048 322)` | `static_value` |
| `Color / Light` | `--light` | `oklch(99.4% 0.016 84)` | `static_value` |
| `Color / Glint` | `--glint` | `oklch(100% 0 0)` | `static_value` |
| `Color / Glass Surface` | `--glass-surface` | `color-mix(in oklab, var(--light) 52%, transparent)` | `custom_value` |
| `Color / Glass Surface Strong` | `--glass-surface-strong` | `color-mix(in oklab, var(--light) 75%, transparent)` | `custom_value` |
| `Color / Glass Surface Subtle` | `--glass-surface-subtle` | `color-mix(in oklab, var(--light) 30%, transparent)` | `custom_value` |
| `Color / Glass Surface Tinted` | `--glass-surface-tinted` | `color-mix(in oklab, var(--color-paper-2) 45%, transparent)` | `custom_value` |
| `Color / Glass Border` | `--glass-border` | `color-mix(in oklab, var(--glint) 80%, transparent)` | `custom_value` |
| `Color / Glass Border Subtle` | `--glass-border-subtle` | `color-mix(in oklab, var(--glint) 45%, transparent)` | `custom_value` |
| `Color / Glass Border Rule` | `--glass-border-rule` | `color-mix(in oklab, var(--color-rule) 60%, transparent)` | `custom_value` |
| `Color / Glass Glow Cyan` | `--glass-glow-cyan` | `oklch(84% 0.08 215 / 0.55)` | `static_value` |
| `Color / Glass Glow Amber` | `--glass-glow-amber` | `oklch(88% 0.09 90 / 0.60)` | `static_value` |
| `Color / Glass Glow Mint` | `--glass-glow-mint` | `oklch(84% 0.11 160 / 0.55)` | `static_value` |
| `Color / Glass Glow Lilac` | `--glass-glow-lilac` | `oklch(82% 0.08 320 / 0.55)` | `static_value` |
| `Color / Palette 1` | `--color-palette-1` | `#FAF7EF` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#E9F8EF` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#D4F0E0` | `static_value` |
| `Color / Palette 4` | `--color-palette-4` | `#0C1C16` | `static_value` |
| `Color / Palette 5` | `--color-palette-5` | `#007948` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#A9E8C6` | `static_value` |
| `Color / Palette 7` | `--color-palette-7` | `#EEE4B4` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#B1DDE6` | `static_value` |
| `Color / Palette 9` | `--color-palette-9` | `#DAC1DE` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#FFFDF1` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-nomi-display)` | Fallback: `Schibsted Grotesk, ui-sans-serif, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-nomi-body)` | Fallback: `Instrument Sans, ui-sans-serif, sans-serif` |
| `Font / Outlier` | `--font-outlier` | `var(--font-nomi-mono)` | Fallback: `DM Mono, ui-monospace, monospace` |
| `Font / DM Mono` | `--font-dm-mono` | `DM Mono` | Google Font: `DM Mono` |
| `Font / Instrument Sans` | `--font-instrument-sans` | `Instrument Sans` | Google Font: `Instrument Sans` |
| `Font / Schibsted Grotesk` | `--font-schibsted-grotesk` | `Schibsted Grotesk` | Google Font: `Schibsted Grotesk` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `24px` | `static_value` |
| `Size / Section Gap S` | `--section-gap-s` | `80px` | `static_value` |
| `Size / Section Gap` | `--section-gap` | `96px` | `static_value` |
| `Size / Section Gap L` | `--section-gap-l` | `120px` | `static_value` |
| `Size / Gap Columns` | `--gap-columns` | `16px` | `static_value` |
| `Size / Step` | `--step` | `116px` | `static_value` |
| `Size / Card H` | `--card-h` | `150px` | `static_value` |
| `Size / 3xs` | `--space-3xs` | `2px` | `static_value` |
| `Size / 2xs` | `--space-2xs` | `4px` | `static_value` |
| `Size / Xs` | `--space-xs` | `8px` | `static_value` |
| `Size / Sm` | `--space-sm` | `12px` | `static_value` |
| `Size / Md` | `--space-md` | `16px` | `static_value` |
| `Size / Lg` | `--space-lg` | `24px` | `static_value` |
| `Size / Xl` | `--space-xl` | `40px` | `static_value` |
| `Size / 2xl` | `--space-2xl` | `64px` | `static_value` |
| `Size / 3xl` | `--space-3xl` | `96px` | `static_value` |
| `Size / 4xl` | `--space-4xl` | `144px` | `static_value` |
| `Size / Text Xs` | `--text-xs` | `0.8125rem` | `static_value` |
| `Size / Text Sm` | `--text-sm` | `0.875rem` | `static_value` |
| `Size / Text Md` | `--text-md` | `1rem` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `NOMI` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `nomi.webp` (image/webp) — https://www.openlanding.page/gallery/nomi.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a light-mode landing page in Next.js 16 (App Router), React, TypeScript and Tailwind CSS v4 for fictional NOMI, a calm mobile workspace for independent tutoring studios. The one action is requesting a private walkthrough. Do not copy 
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **NOMI Scoped Styles (Part 1/2)** (`nomi-styles-1`, placement: `head`, 44901 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **NOMI Scoped Styles (Part 2/2)** (`nomi-styles-2`, placement: `head`, 11197 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
