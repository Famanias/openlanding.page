# Webflow MCP Import Prompt: AFTERCART (aftercart)

Import the **AFTERCART** (Shopify Care Services) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/aftercart
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/aftercart-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/aftercart.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "aftercart" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "aftercart", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/aftercart-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`AFTERCART Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ac Ink` | `--color-ac-ink` | `#4C4668` | `static_value` |
| `Color / Ac Paper` | `--color-ac-paper` | `#FFF7F3` | `static_value` |
| `Color / Ac Lilac` | `--color-ac-lilac` | `#DCCFF4` | `static_value` |
| `Color / Ac Mint` | `--color-ac-mint` | `#BFE7D3` | `static_value` |
| `Color / Ac Peach` | `--color-ac-peach` | `#FFCCB8` | `static_value` |
| `Color / Ac Butter` | `--color-ac-butter` | `#F5E8A7` | `static_value` |
| `Color / Ac Sky` | `--color-ac-sky` | `#BFD8F0` | `static_value` |
| `Color / Ac Rule` | `--ac-rule` | `color-mix(in srgb, var(--color-ac-ink) 22%, transparent)` | `custom_value` |
| `Color / Ac Muted` | `--ac-muted` | `color-mix(in srgb, var(--color-ac-ink) 68%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Ac Display` | `--font-ac-display` | `var(--font-aftercart-display)` | Fallback: `ui-sans-serif, system-ui, sans-serif` |
| `Font / Ac Body` | `--font-ac-body` | `var(--font-aftercart-body)` | Fallback: `ui-sans-serif, system-ui, sans-serif` |
| `Font / Ac Mono` | `--font-ac-mono` | `var(--font-aftercart-mono)` | Fallback: `ui-monospace, SFMono-Regular, monospace` |
| `Font / Inter Tight` | `--font-inter-tight` | `Inter Tight` | Google Font: `Inter Tight` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Manrope` | `--font-manrope` | `Manrope` | Google Font: `Manrope` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Ac Container` | `--ac-container` | `1320px` | `static_value` |
| `Size / Ac Gutter` | `--ac-gutter` | `clamp(20px, 4vw, 64px)` | `custom_value` |
| `Size / Ac Radius Sm` | `--ac-radius-sm` | `8px` | `static_value` |
| `Size / Ac Radius Md` | `--ac-radius-md` | `14px` | `static_value` |
| `Size / Ac Radius Lg` | `--ac-radius-lg` | `20px` | `static_value` |
| `Size / Ac Scroll Y` | `--ac-scroll-y` | `0px` | `static_value` |
| `Size / Ac Reveal Shift` | `--ac-reveal-shift` | `28px` | `static_value` |
| `Size / Ac Column Gap` | `--ac-column-gap` | `clamp(32px, 5vw, 72px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `AFTERCART` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `aftercart.webp` (image/webp) — https://www.openlanding.page/gallery/aftercart.webp (Gallery preview capture)
- `preview.svg` (image/svg+xml) — https://www.openlanding.page/templates/aftercart/preview.svg (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build an isolated Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 landing template for a fictional Shopify care partner called AFTERCART. The audience is small owner-led Shopify shops. The one conversion goal is booking a ca
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **AFTERCART Scoped Styles** (`aftercart-styles-1`, placement: `head`, 33717 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
