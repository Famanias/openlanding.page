# Webflow MCP Import Prompt: SEREIN Bureau (serein)

Import the **SEREIN Bureau** (Weather & Publishing) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/serein
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/serein-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/serein.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "serein" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "serein", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/serein-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`SEREIN Bureau Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Sr Ink` | `--sr-ink` | `#24343A` | `static_value` |
| `Color / Sr Ink 2` | `--sr-ink-2` | `color-mix(in srgb, var(--sr-ink) 70%, var(--sr-paper))` | `custom_value` |
| `Color / Sr Paper` | `--sr-paper` | `#F6F0E5` | `static_value` |
| `Color / Sr Paper 2` | `--sr-paper-2` | `color-mix(in srgb, var(--sr-paper) 86%, var(--sr-ink))` | `custom_value` |
| `Color / Sr Paper 3` | `--sr-paper-3` | `color-mix(in srgb, var(--sr-paper) 78%, var(--sr-ink))` | `custom_value` |
| `Color / Sr Rule` | `--sr-rule` | `color-mix(in srgb, var(--sr-ink) 42%, var(--sr-paper))` | `custom_value` |
| `Color / Sr Rule Soft` | `--sr-rule-soft` | `color-mix(in srgb, var(--sr-ink) 22%, var(--sr-paper))` | `custom_value` |
| `Color / Sr Seafoam` | `--sr-seafoam` | `#A8D6CC` | `static_value` |
| `Color / Sr Seafoam Deep` | `--sr-seafoam-deep` | `color-mix(in srgb, var(--sr-seafoam) 65%, var(--sr-ink))` | `custom_value` |
| `Color / Sr Lavender` | `--sr-lavender` | `#C7BCE6` | `static_value` |
| `Color / Sr Lavender Deep` | `--sr-lavender-deep` | `color-mix(in srgb, var(--sr-lavender) 60%, var(--sr-ink))` | `custom_value` |
| `Color / Sr Error` | `--sr-error` | `color-mix(in srgb, var(--sr-lavender) 70%, var(--sr-ink))` | `custom_value` |
| `Color / Paper` | `--color-paper` | `var(--sr-paper)` | `custom_value` |
| `Color / Paper 2` | `--color-paper-2` | `var(--sr-paper-2)` | `custom_value` |
| `Color / Paper 3` | `--color-paper-3` | `var(--sr-paper-3)` | `custom_value` |
| `Color / Ink` | `--color-ink` | `var(--sr-ink)` | `custom_value` |
| `Color / Ink 2` | `--color-ink-2` | `var(--sr-ink-2)` | `custom_value` |
| `Color / Muted` | `--color-muted` | `var(--sr-ink-2)` | `custom_value` |
| `Color / Rule` | `--color-rule` | `var(--sr-rule)` | `custom_value` |
| `Color / Accent` | `--color-accent` | `var(--sr-seafoam)` | `custom_value` |
| `Color / Accent Ink` | `--color-accent-ink` | `var(--sr-ink)` | `custom_value` |
| `Color / Focus` | `--color-focus` | `var(--sr-lavender-deep)` | `custom_value` |
| `Color / Error` | `--color-error` | `var(--sr-error)` | `custom_value` |
| `Color / Success` | `--color-success` | `var(--sr-seafoam-deep)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Lora` | Google Font: `Lora` |
| `Font / Body` | `--font-body` | `Public Sans` | Google Font: `Public Sans` |
| `Font / Outlier` | `--font-outlier` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `28px` | `static_value` |
| `Size / Gap Columns` | `--gap-columns` | `24px` | `static_value` |
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
| `Size / Text Lg` | `--text-lg` | `1.25rem` | `static_value` |
| `Size / Text Xl` | `--text-xl` | `1.5625rem` | `static_value` |
| `Size / Text 2xl` | `--text-2xl` | `1.953rem` | `static_value` |
| `Size / Text 3xl` | `--text-3xl` | `2.441rem` | `static_value` |
| `Size / Text Display S` | `--text-display-s` | `clamp(2.5rem, 4vw + 0.5rem, 4.5rem)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `SEREIN Bureau` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `serein.webp` (image/webp) — https://www.openlanding.page/gallery/serein.webp (Gallery preview capture)
- `preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/serein/preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build an isolated landing page in Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4 for a fictional atmospheric desk called SEREIN Bureau. The tagline is "Small weather, closely observed." SEREIN publishes precise, human weath

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **SEREIN Bureau Scoped Styles** (`serein-styles-1`, placement: `head`, 33582 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
