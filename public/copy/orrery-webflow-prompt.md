# Webflow MCP Import Prompt: Orrery (orrery)

Import the **Orrery** (AI & DevTools) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/orrery
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/orrery-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/orrery.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "orrery" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "orrery", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/orrery-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Orrery Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#0E0F13` | `static_value` |
| `Color / Bone` | `--color-bone` | `#F2EFE8` | `static_value` |
| `Color / Ultramarine` | `--color-ultramarine` | `#2F3BFF` | `static_value` |
| `Color / Amber` | `--color-amber` | `#FFB000` | `static_value` |
| `Color / Ink Muted` | `--ink-muted` | `color-mix(in oklab, var(--color-ink) 62%, var(--color-bone))` | `custom_value` |
| `Color / Ink Line` | `--ink-line` | `color-mix(in oklab, var(--color-ink) 16%, var(--color-bone))` | `custom_value` |
| `Color / Bone Muted` | `--bone-muted` | `color-mix(in oklab, var(--color-bone) 62%, var(--color-ink))` | `custom_value` |
| `Color / Bone Line` | `--bone-line` | `color-mix(in oklab, var(--color-bone) 18%, var(--color-ink))` | `custom_value` |
| `Color / Rail Muted` | `--rail-muted` | `color-mix(in oklab, var(--color-ink) 34%, var(--color-bone))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Instrument Serif` | Google Font: `Instrument Serif` |
| `Font / Body` | `--font-body` | `Inter Tight` | Google Font: `Inter Tight` |
| `Font / Mono` | `--font-mono` | `Geist Mono` | Google Font: `Geist Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Gutter` | `--gutter` | `clamp(20px, 5vw, 80px)` | `custom_value` |
| `Size / Topbar` | `--topbar` | `76px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Orrery` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `orrery.webp` (image/webp) — https://www.openlanding.page/gallery/orrery.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Title** (`section-1`, mode: `native-whtml`): - Mono kicker "The orchestration layer for AI agents" in ultramarine.
2. **Problem** (`section-2`, mode: `native-whtml`): a portrait photo of a lone brass sphere at left, then the h2 "One agent *isn't* a team." and three numbered failures: "It loses the thread." / "It does everything at one depth." / "Nobody checks its work."
3. **The orrery (ink)** (`section-3`, mode: `native-whtml`): - h2 "Specialists on their own orbits, *kept in time.*" with a 5-row legend: The conductor, Researchers, Builders, Shared memory, The hand-off (in amber).
4. **How it works** (`section-4`, mode: `native-whtml`): h2 "Three steps from brief *to finished work.*" Then three columns, each with a big ultramarine serif numeral, an h3 and a line of text: Describe the work / Orrery assembles the team / Review, approve, ship.
5. **Use cases** (`section-5`, mode: `native-whtml`): h2 "Where teams put *it to work.*" Three cards (a 4:3 image, an h3, text): Customer operations / Research and analysis / Software engineering.
6. **Results** (`section-6`, mode: `native-whtml`): h2 "Measured in work *that ships.*" Three huge serif figures with ultramarine units that count up when the slide is active: 4.2×, 63%, 99.6%. Short labels and a mono footnote.
7. **Customers** (`section-7`, mode: `native-whtml`): a large italic serif pull quote over a faint ink-wash circle texture, plus two smaller quotes with names and roles.
8. **Pricing** (`section-8`, mode: `native-whtml`): h2 "Priced by the team, *not the token.*" Three tiers: Starter $49, Team $390 (ink-filled, amber "Most teams" badge) and Enterprise Custom. Each has check-mark features.
9. **Security (ink)** (`section-9`, mode: `native-whtml`): h2 "Built for teams that *answer to auditors.*" A 2×3 grid of claims (SOC 2 Type II, data residency, every hand-off logged, approval gates, no training on your work, SSO and SCIM) and a guilloché-texture image column.
10. **Book a demo** (`section-10`, mode: `native-whtml`): - Display "Put your agents *in orbit.*" and a lead paragraph.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Orrery Scoped Styles** (`orrery-styles-1`, placement: `head`, 23102 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Orrery Interactive Runtime Bridge** (`orrery-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads gsap, motion in page footer custom code with prefers-reduced-motion guard.
