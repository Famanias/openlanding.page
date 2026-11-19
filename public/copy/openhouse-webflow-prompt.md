# Webflow MCP Import Prompt: OPENHOUSE (openhouse)

Import the **OPENHOUSE** (Small Business Services) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/openhouse
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/openhouse-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/openhouse.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "openhouse" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "openhouse", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/openhouse-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`OPENHOUSE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#f7f2e9` | `static_value` |
| `Color / Paper 2` | `--color-paper-2` | `#eee6d9` | `static_value` |
| `Color / Paper 3` | `--color-paper-3` | `#e6dacb` | `static_value` |
| `Color / Ink` | `--color-ink` | `#171414` | `static_value` |
| `Color / Ink 2` | `--color-ink-2` | `#2a2521` | `static_value` |
| `Color / Muted` | `--color-muted` | `#6b6359` | `static_value` |
| `Color / Rule` | `--color-rule` | `#d7cdbf` | `static_value` |
| `Color / Rule 2` | `--color-rule-2` | `#c7b9a8` | `static_value` |
| `Color / Accent` | `--color-accent` | `#d86b4a` | `static_value` |
| `Color / Accent Ink` | `--color-accent-ink` | `#171414` | `static_value` |
| `Color / Accent 2` | `--color-accent-2` | `#a9472e` | `static_value` |
| `Color / Focus` | `--color-focus` | `#a9472e` | `static_value` |
| `Color / Cotton` | `--color-cotton` | `#fff9f0` | `static_value` |
| `Color / Desk` | `--color-desk` | `#ede5da` | `static_value` |
| `Color / Print` | `--color-print` | `#1d1917` | `static_value` |
| `Color / Board` | `--color-board` | `#344a3e` | `static_value` |
| `Color / Board Type` | `--color-board-type` | `#f7f2e9` | `static_value` |
| `Color / Error` | `--color-error` | `#a9472e` | `static_value` |
| `Color / Success` | `--color-success` | `#3e7658` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-openhouse-sans)` | Fallback: `ui-sans-serif, system-ui, sans-serif` |
| `Font / Body` | `--font-body` | `var(--font-openhouse-sans)` | Fallback: `ui-sans-serif, system-ui, sans-serif` |
| `Font / Outlier` | `--font-outlier` | `var(--font-openhouse-mono)` | Fallback: `ui-monospace, monospace` |
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / Geist Mono` | `--font-geist-mono` | `Geist Mono` | Google Font: `Geist Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `24px` | `static_value` |
| `Size / Section Gap S` | `--section-gap-s` | `80px` | `static_value` |
| `Size / Section Gap` | `--section-gap` | `96px` | `static_value` |
| `Size / Section Gap L` | `--section-gap-l` | `120px` | `static_value` |
| `Size / Gap Columns` | `--gap-columns` | `16px` | `static_value` |
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

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `OPENHOUSE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `openhouse.webp` (image/webp) — https://www.openlanding.page/gallery/openhouse.webp (Gallery preview capture)
- `preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/openhouse/preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build a landing page in Next.js App Router + React + TypeScript for the fictional conversion studio OPENHOUSE. The page has one job: book a 20-minute growth call for an owner-led small business.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **OPENHOUSE Scoped Styles** (`openhouse-styles-1`, placement: `head`, 24147 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
