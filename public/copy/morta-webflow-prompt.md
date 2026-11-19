# Webflow MCP Import Prompt: MORTA (morta)

Import the **MORTA** (Jewellery & Craft) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/morta
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/morta-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/morta.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "morta" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "morta", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/morta-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`MORTA Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Palette 1` | `--color-palette-1` | `#000000` | `static_value` |
| `Color / Palette 2` | `--color-palette-2` | `#FFFFFF` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Cormorant Garamond` | Fallback: `Times New Roman, Georgia, serif` |
| `Font / Sans` | `--font-sans` | `DM Sans` | Fallback: `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif` |
| `Font / Mono` | `--font-mono` | `DM Mono` | Fallback: `ui-monospace, SFMono-Regular, Menlo, monospace` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `MORTA` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `morta.webp` (image/webp) — https://www.openlanding.page/gallery/morta.webp (Gallery preview capture)
- `morta-bespoke.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-bespoke.webp (Template media asset)
- `morta-craft.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-craft.webp (Template media asset)
- `morta-footer-cathedral.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-footer-cathedral.webp (Template media asset)
- `morta-hero.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-hero.webp (Template media asset)
- `morta-reliquary-ring.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-reliquary-ring.webp (Template media asset)
- `morta-thorn-pendant.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-thorn-pendant.webp (Template media asset)
- `morta-vigil-earrings.webp` (image/webp) — https://www.openlanding.page/templates/morta/morta-vigil-earrings.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/morta/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **The Oath / hero** (`section-1`, mode: `native-whtml`): An elegant header with the mark, Collection, House, Craft and Commissions anchors and a prominent commission link. Use `morta-hero` as a cinematic image with a dark text-safe region. Headline: “Wear what remains.” Supporting copy: “Sculptural silver for the stories we carry.” Primary CTA: “Discover the collection.” Add a restrained object label and a scroll cue.
2. **The House** (`section-2`, mode: `native-whtml`): Introduce MORTA: “Objects of devotion, made to endure.” Describe sculptural silver, attentive finishing and pieces intended to gather their own history. Pair an oversized editorial statement with the first separated ring contours and fine graphic linework.
3. **The Collection** (`section-3`, mode: `native-whtml`): Present the three supplied product images as distinct, large editorial product cards, numbered 01–03: Reliquary / signet ring; Thorn / pendant; Vigil / drop earrings. Show product names and concise descriptive copy. Cards can reveal more detail on interaction, but names and essential information must remain visible on touch and keyboard. If purchase links have no destination, use in-page exploration rather than dead links.
4. **The Craft** (`section-4`, mode: `hybrid-embed`): Pair `morta-craft` with copy about shaping, casting and finishing silver. This section hosts the signature assembly: a pinned or otherwise scroll-linked graphic progressively gathers fragments into a complete ring. The finished image frames a statement such as “Formed slowly. Worn for years.” The graphic is an original SVG/CSS drawing, not a replacement for the real product photography.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
5. **Bespoke commissions** (`section-5`, mode: `native-whtml`): Pair `morta-bespoke` with an invitation to create a personal piece. Provide a usable enquiry form with name, email and a short description. Include labels, helpful validation, keyboard access and a clear success state. If no backend is specified, implement a transparent demonstration-only success state and do not claim that an enquiry was sent.
6. **Footer** (`section-6`, mode: `native-whtml`): Reprise the mark and phrase “Made to outlast the moment.” Include working in-page navigation, a short brand line and contact/enquiry access. Avoid fabricated addresses, social profiles or contact information.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **MORTA Scoped Styles** (`morta-styles-1`, placement: `head`, 4214 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **MORTA Interactive Runtime Bridge** (`morta-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads three in page footer custom code with prefers-reduced-motion guard.
