# Webflow MCP Import Prompt: WOWFLUTTER (wowflutter)

Import the **WOWFLUTTER** (Music & Records) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/wowflutter
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/wowflutter-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/wowflutter.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "wowflutter" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "wowflutter", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/wowflutter-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`WOWFLUTTER Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Tape` | `--color-tape` | `#14110F` | `static_value` |
| `Color / Stock` | `--color-stock` | `#EFE6D4` | `static_value` |
| `Color / Riso` | `--color-riso` | `#FF3D8B` | `static_value` |
| `Color / Worn` | `--color-worn` | `#DCCFB8` | `static_value` |
| `Color / Faded` | `--color-faded` | `#5E564D` | `static_value` |
| `Color / Ink Soft` | `--ink-soft` | `color-mix(in srgb, var(--color-tape) 16%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Young Serif` | Google Font: `Young Serif` |
| `Font / Body` | `--font-body` | `Newsreader` | Google Font: `Newsreader` |
| `Font / Mono` | `--font-mono` | `Courier Prime` | Google Font: `Courier Prime` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Topbar` | `--topbar` | `64px` | `static_value` |
| `Size / Bar` | `--bar` | `72px` | `static_value` |
| `Size / Gutter` | `--gutter` | `clamp(16px, 4vw, 56px)` | `custom_value` |
| `Size / U` | `--u` | `max(1cqi, 4.4px)` | `custom_value` |
| `Size / T Label` | `--t-label` | `max(11px, calc(var(--u) * 2.3))` | `custom_value` |
| `Size / T Small` | `--t-small` | `max(13px, calc(var(--u) * 3))` | `custom_value` |
| `Size / T Body` | `--t-body` | `max(14.5px, calc(var(--u) * 3.6))` | `custom_value` |
| `Size / T H2` | `--t-h2` | `calc(var(--u) * 9.5)` | `custom_value` |
| `Size / T H2xl` | `--t-h2xl` | `calc(var(--u) * 11.5)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `WOWFLUTTER` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `wowflutter.webp` (image/webp) — https://www.openlanding.page/gallery/wowflutter.webp (Gallery preview capture)
- `artist-dunmore-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-dunmore-1600.avif (Template media asset)
- `artist-dunmore-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-dunmore-1600.webp (Template media asset)
- `artist-dunmore-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-dunmore-800.avif (Template media asset)
- `artist-dunmore-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-dunmore-800.webp (Template media asset)
- `artist-ines-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-ines-1600.avif (Template media asset)
- `artist-ines-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-ines-1600.webp (Template media asset)
- `artist-ines-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-ines-800.avif (Template media asset)
- `artist-ines-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-ines-800.webp (Template media asset)
- `artist-marl-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-marl-1600.avif (Template media asset)
- `artist-marl-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-marl-1600.webp (Template media asset)
- `artist-marl-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/artist-marl-800.avif (Template media asset)
- `artist-marl-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/artist-marl-800.webp (Template media asset)
- `cover-portrait-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/cover-portrait-1600.avif (Template media asset)
- `cover-portrait-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/cover-portrait-1600.webp (Template media asset)
- `cover-portrait-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/cover-portrait-800.avif (Template media asset)
- `cover-portrait-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/cover-portrait-800.webp (Template media asset)
- `feature-baths-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/feature-baths-1600.avif (Template media asset)
- `feature-baths-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/feature-baths-1600.webp (Template media asset)
- `feature-baths-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/feature-baths-800.avif (Template media asset)
- `feature-baths-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/feature-baths-800.webp (Template media asset)
- `feature-stairwell-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/feature-stairwell-1600.avif (Template media asset)
- `feature-stairwell-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/feature-stairwell-1600.webp (Template media asset)
- `feature-stairwell-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/feature-stairwell-800.avif (Template media asset)
- `feature-stairwell-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/feature-stairwell-800.webp (Template media asset)
- `press-room-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/press-room-1600.avif (Template media asset)
- `press-room-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/press-room-1600.webp (Template media asset)
- `press-room-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/press-room-800.avif (Template media asset)
- `press-room-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/press-room-800.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/preview-1600.webp (Template media asset)
- `sleeve-stack-1600.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/sleeve-stack-1600.avif (Template media asset)
- `sleeve-stack-1600.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/sleeve-stack-1600.webp (Template media asset)
- `sleeve-stack-800.avif` (image/avif) — https://www.openlanding.page/templates/wowflutter/sleeve-stack-800.avif (Template media asset)
- `sleeve-stack-800.webp` (image/webp) — https://www.openlanding.page/templates/wowflutter/sleeve-stack-800.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Cover (stock)** (`section-1`, mode: `native-whtml`): mono row "Issue 07 · Autumn 2026" / "WF-007"; a giant "07" in Young Serif with a pink off-register copy behind it; the **only h1**, "The Sound of Rooms"; a plate (`cover-portrait`, priority/LCP); the mark and "32 pages · Edition of 500".
2. **Editor's letter (worn)** (`section-2`, mode: `native-whtml`): "A note on rooms", two short paragraphs with a pink drop cap, the signature "Dee Okafor-Lind, editor", a masthead (Editor, Design, Print, Stitching).
3. **Contents (stock)** (`section-3`, mode: `native-whtml`): five rows, each a link: page number on a pink square, title, italic note. Stairwell sessions 04, The roster 07, The catalogue 10, The pressing plant 12, Get the next issue 13.
4. **Feature opener (a black page)** (`section-4`, mode: `native-whtml`): a plate (`feature-stairwell`), label "Feature · Low Ceilings, WF-007", the title "The stairwell sessions", an italic dek. Give this page an inset hairline so it reads against the black desk.
5. **Liner notes, part one** (`section-5`, mode: `native-whtml`): a drop-cap story about finding a closed Victorian baths in March, plus a plate (`feature-baths`).
6. **Liner notes, part two (a pink page)** (`section-6`, mode: `native-whtml`): the pull quote "A room is the fifth member of the quartet, and the only one who never misses a rehearsal." (Ife Okoro, cello) and spec rows: Room Stairwell B, Eastgate Baths; Reverb RT60 2.8 s; Mics 4, plus 1 on the roof; Takes 11, heating off.
7. **Roster · Marl Quartet** (`section-7`, mode: `native-whtml`): (string quartet, Leeds), 8. **Ines Haverford** (piano and voice, Glasgow), 9. **Dunmore & Ash** (guitar and harmonium, Whitby): a plate that fills the free space, name, mono meta line, one italic question and a short answer, and a link "On WF-00X →" to the catalogue.
8. **Catalogue, Side A (worn)** (`section-8`, mode: `native-whtml`): and 11. **Side B (stock):** WF-001 to WF-008, each with artist, italic title, year, edition and a status chip (Sold out / In stock / At the plant, the last one pink). Include Marl Quartet, *Low Ceilings* as WF-007 and Penny Lowe Trio, *Night Bus Lullabies* as WF-008 (at the plant). Page 10 ends with a wide plate band (`sleeve-stack`); page 11 with "WF-008 reaches subscribers first. Get the next issue →".
9. **The pressing plant (worn)** (`section-9`, mode: `native-whtml`): "Where Thursdays go", a plate (`press-room`), and colophon rows: 500 copies on 180 g black vinyl; 32 pages stitched by hand; half-speed mastering; "14 of the 32 pages" on screen.
10. **Get the next issue (stock)** (`section-10`, mode: `native-whtml`): "Issue 08 is at the plant." An email field and a radio fieldset ("How should it reach you?": Side A, the zine in the post; Side B, email only; the chosen one fills pink). Validate in the browser with these errors: "Enter a valid email" / "Pick Side A or Side B". On success show "You're on the list." with a line about how issue 08 will arrive. **Never send a network request.**
11. **Back cover (a pink page)** (`section-11`, mode: `native-whtml`): the motto "Slightly off-centre, on purpose.", the mark and wordmark, "Records & zines · Leeds · Est. 2019", a CSS barcode, and a "Back to the cover" link.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **WOWFLUTTER Scoped Styles** (`wowflutter-styles-1`, placement: `head`, 23146 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
