# Webflow MCP Import Prompt: Studio Kazeko (kazeko)

Import the **Studio Kazeko** (Animation & Film) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/kazeko
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/kazeko-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/kazeko.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "kazeko" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "kazeko", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/kazeko-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Studio Kazeko Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#F8F5E9` | `static_value` |
| `Color / Ink` | `--color-ink` | `#243C35` | `static_value` |
| `Color / Meadow` | `--color-meadow` | `#64856A` | `static_value` |
| `Color / Leaf` | `--color-leaf` | `#C7D6A7` | `static_value` |
| `Color / Sky` | `--color-sky` | `#D6E7EB` | `static_value` |
| `Color / Butter` | `--color-butter` | `#EED998` | `static_value` |
| `Color / Clay` | `--color-clay` | `#B96C51` | `static_value` |
| `Color / Muted` | `--color-muted` | `#596C63` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-kazeko-mincho)` | Fallback: `Georgia, serif` |
| `Font / Body` | `--font-body` | `var(--font-kazeko-dm)` | Fallback: `Arial, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-kazeko-plex)` | Fallback: `monospace` |
| `Font / DM Sans` | `--font-dm-sans` | `DM Sans` | Google Font: `DM Sans` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Shippori Mincho` | `--font-shippori-mincho` | `Shippori Mincho` | Google Font: `Shippori Mincho` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `24px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Studio Kazeko` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `kazeko.webp` (image/webp) — https://www.openlanding.page/gallery/kazeko.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/kazeko/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): Build an isolated `/kazeko` landing page in Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4 for a fictional independent Japanese-inspired animation studio. Its motto is "A little wonder. A world of feeling." The central idea

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Studio Kazeko Scoped Styles** (`kazeko-styles-1`, placement: `head`, 31892 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Studio Kazeko Interactive Runtime Bridge** (`kazeko-runtime-1`, placement: `footer`, 350 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
