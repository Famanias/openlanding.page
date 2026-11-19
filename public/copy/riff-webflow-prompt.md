# Webflow MCP Import Prompt: Riff (riff)

Import the **Riff** (Music & Dating) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/riff
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/riff-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/riff.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "riff" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "riff", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/riff-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Riff Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Riff Black` | `--riff-black` | `#0B0B0B` | `static_value` |
| `Color / Riff Ink` | `--riff-ink` | `#141414` | `static_value` |
| `Color / Riff Paper` | `--riff-paper` | `#F4F0E8` | `static_value` |
| `Color / Riff Crimson` | `--riff-crimson` | `#C92533` | `static_value` |
| `Color / Riff Deep Red` | `--riff-deep-red` | `#741B24` | `static_value` |
| `Color / Riff Grey` | `--riff-grey` | `#AAA8A6` | `static_value` |
| `Color / Riff Dim` | `--riff-dim` | `#777575` | `static_value` |
| `Color / Riff Rule` | `--riff-rule` | `rgba(244, 240, 232, 0.22)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Barlow Condensed` | `--font-barlow-condensed` | `Barlow Condensed` | Google Font: `Barlow Condensed` |
| `Font / Bodoni Moda` | `--font-bodoni-moda` | `Bodoni Moda` | Google Font: `Bodoni Moda` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Riff` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `riff.webp` (image/webp) — https://www.openlanding.page/gallery/riff.webp (Gallery preview capture)
- `album-kyoto.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/album-kyoto.jpg (Template media asset)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/riff/icon.svg (Template media asset)
- `match-art-1.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/match-art-1.jpg (Template media asset)
- `match-art-2.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/match-art-2.jpg (Template media asset)
- `mila-portrait.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/mila-portrait.jpg (Template media asset)
- `noise-tile.png` (image/png) — https://www.openlanding.page/templates/riff/noise-tile.png (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/riff/preview-1600.webp (Template media asset)
- `preview-800.webp` (image/webp) — https://www.openlanding.page/templates/riff/preview-800.webp (Template media asset)
- `shared-track-2.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/shared-track-2.jpg (Template media asset)
- `shared-track-3.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/shared-track-3.jpg (Template media asset)
- `zine-band-photo.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/zine-band-photo.jpg (Template media asset)
- `zine-strip-photo.jpg` (image/jpeg) — https://www.openlanding.page/templates/riff/zine-strip-photo.jpg (Template media asset)
- `riff-reference_926573aa.png` (image/png) — https://www.openlanding.page/templates/riff/aistudio/riff-reference_926573aa.png (Template media asset)
- `riff-mc-01-favorite-records.webp` (image/webp) — https://www.openlanding.page/templates/riff/chemistry/riff-mc-01-favorite-records.webp (Template media asset)
- `riff-mc-02-concert-energy.webp` (image/webp) — https://www.openlanding.page/templates/riff/chemistry/riff-mc-02-concert-energy.webp (Template media asset)
- `riff-mc-03-late-night-playlist.webp` (image/webp) — https://www.openlanding.page/templates/riff/chemistry/riff-mc-03-late-night-playlist.webp (Template media asset)
- `riff-sc-support-01-flyer-culture.webp` (image/webp) — https://www.openlanding.page/templates/riff/ephemera/riff-sc-support-01-flyer-culture.webp (Template media asset)
- `riff-sc-support-02-ticket-ephemera.webp` (image/webp) — https://www.openlanding.page/templates/riff/ephemera/riff-sc-support-02-ticket-ephemera.webp (Template media asset)
- `riff-sc-support-03-scene-photo.webp` (image/webp) — https://www.openlanding.page/templates/riff/ephemera/riff-sc-support-03-scene-photo.webp (Template media asset)
- `riff-sc-open-01-midnight-static.webp` (image/webp) — https://www.openlanding.page/templates/riff/gatefolds/riff-sc-open-01-midnight-static.webp (Template media asset)
- `riff-sc-open-02-after-the-encore.webp` (image/webp) — https://www.openlanding.page/templates/riff/gatefolds/riff-sc-open-02-after-the-encore.webp (Template media asset)
- `riff-sc-open-03-songs-to-walk-home-to.webp` (image/webp) — https://www.openlanding.page/templates/riff/gatefolds/riff-sc-open-03-songs-to-walk-home-to.webp (Template media asset)
- `riff-sc-open-04-basement-show-memories.webp` (image/webp) — https://www.openlanding.page/templates/riff/gatefolds/riff-sc-open-04-basement-show-memories.webp (Template media asset)
- `riff-hm-00-music-identity.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-hm-00-music-identity.webp (Template media asset)
- `riff-hm-01-drop-favorites.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-hm-01-drop-favorites.webp (Template media asset)
- `riff-hm-02-find-overlap.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-hm-02-find-overlap.webp (Template media asset)
- `riff-hm-03-start-conversation.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-hm-03-start-conversation.webp (Template media asset)
- `riff-tm-01-high-overlap.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-tm-01-high-overlap.webp (Template media asset)
- `riff-tm-02-medium-overlap.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-tm-02-medium-overlap.webp (Template media asset)
- `riff-tm-03-low-overlap.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-tm-03-low-overlap.webp (Template media asset)
- `riff-tm-04-conversation-focus.webp` (image/webp) — https://www.openlanding.page/templates/riff/phones/riff-tm-04-conversation-focus.webp (Template media asset)
- `riff-sc-01-midnight-static.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-01-midnight-static.webp (Template media asset)
- `riff-sc-02-after-the-encore.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-02-after-the-encore.webp (Template media asset)
- `riff-sc-03-songs-to-walk-home-to.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-03-songs-to-walk-home-to.webp (Template media asset)
- `riff-sc-04-basement-show-memories.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-04-basement-show-memories.webp (Template media asset)
- `riff-sc-05-cathode-ray-lullabies.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-05-cathode-ray-lullabies.webp (Template media asset)
- `riff-sc-06-rain-on-the-amp-case.webp` (image/webp) — https://www.openlanding.page/templates/riff/sleeves/riff-sc-06-rain-on-the-amp-case.webp (Template media asset)
- `riff-mc-01-favorite-records.webp` (image/webp) — https://www.openlanding.page/assets/riff/chemistry/riff-mc-01-favorite-records.webp (Template media asset)
- `riff-mc-02-concert-energy.webp` (image/webp) — https://www.openlanding.page/assets/riff/chemistry/riff-mc-02-concert-energy.webp (Template media asset)
- `riff-mc-03-late-night-playlist.webp` (image/webp) — https://www.openlanding.page/assets/riff/chemistry/riff-mc-03-late-night-playlist.webp (Template media asset)
- `riff-sc-support-01-flyer-culture.webp` (image/webp) — https://www.openlanding.page/assets/riff/ephemera/riff-sc-support-01-flyer-culture.webp (Template media asset)
- `riff-sc-support-02-ticket-ephemera.webp` (image/webp) — https://www.openlanding.page/assets/riff/ephemera/riff-sc-support-02-ticket-ephemera.webp (Template media asset)
- `riff-sc-support-03-scene-photo.webp` (image/webp) — https://www.openlanding.page/assets/riff/ephemera/riff-sc-support-03-scene-photo.webp (Template media asset)
- `riff-sc-open-01-midnight-static.webp` (image/webp) — https://www.openlanding.page/assets/riff/gatefolds/riff-sc-open-01-midnight-static.webp (Template media asset)
- `riff-sc-open-02-after-the-encore.webp` (image/webp) — https://www.openlanding.page/assets/riff/gatefolds/riff-sc-open-02-after-the-encore.webp (Template media asset)
- `riff-sc-open-03-songs-to-walk-home-to.webp` (image/webp) — https://www.openlanding.page/assets/riff/gatefolds/riff-sc-open-03-songs-to-walk-home-to.webp (Template media asset)
- `riff-sc-open-04-basement-show-memories.webp` (image/webp) — https://www.openlanding.page/assets/riff/gatefolds/riff-sc-open-04-basement-show-memories.webp (Template media asset)
- `riff-hm-00-music-identity.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-hm-00-music-identity.webp (Template media asset)
- `riff-hm-01-drop-favorites.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-hm-01-drop-favorites.webp (Template media asset)
- `riff-hm-02-find-overlap.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-hm-02-find-overlap.webp (Template media asset)
- `riff-hm-03-start-conversation.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-hm-03-start-conversation.webp (Template media asset)
- `riff-tm-01-high-overlap.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-tm-01-high-overlap.webp (Template media asset)
- `riff-tm-02-medium-overlap.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-tm-02-medium-overlap.webp (Template media asset)
- `riff-tm-03-low-overlap.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-tm-03-low-overlap.webp (Template media asset)
- `riff-tm-04-conversation-focus.webp` (image/webp) — https://www.openlanding.page/assets/riff/phones/riff-tm-04-conversation-focus.webp (Template media asset)
- `riff-sc-01-midnight-static.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-01-midnight-static.webp (Template media asset)
- `riff-sc-02-after-the-encore.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-02-after-the-encore.webp (Template media asset)
- `riff-sc-03-songs-to-walk-home-to.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-03-songs-to-walk-home-to.webp (Template media asset)
- `riff-sc-04-basement-show-memories.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-04-basement-show-memories.webp (Template media asset)
- `riff-sc-05-cathode-ray-lullabies.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-05-cathode-ray-lullabies.webp (Template media asset)
- `riff-sc-06-rain-on-the-amp-case.webp` (image/webp) — https://www.openlanding.page/assets/riff/sleeves/riff-sc-06-rain-on-the-amp-case.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Sticky Header** (`section-1`, mode: `native-whtml`): Custom SVG waveform logo, navigation links (`How It Works`, `Matches`, `Playlists`, `Stories`), mobile hamburger menu, and screenprint red "Join Riff" button.
2. **Hero Section (Two Phones, One Chemistry)** (`section-2`, mode: `native-whtml`): - Dual-phone mockup showcasing real profile cards (Mila, 24 and Julian, 26).
3. **Manifesto Section** (`section-3`, mode: `native-whtml`): - Wheat-pasted torn paper banners: *"THERE'S MORE TO A PERSON THAN A PHOTO"*.
4. **How It Works (Three Tracks)** (`section-4`, mode: `native-whtml`): - Interactive tape-head progress rail scrubbable across Track 01 (Drop your favorites), Track 02 (Find your overlap), and Track 03 (Start a conversation).
5. **Interactive Taste Matcher** (`section-5`, mode: `native-whtml`): - Left panel: clickable underground genres (Shoegaze, Post-Punk, Midwest Emo, Darkwave, etc.) and listening rituals (Night drives, Live gigs, Vinyl digging, Late-night headphones).
6. **Music Chemistry Case Study** (`section-6`, mode: `native-whtml`): - Segmented control toggling between Favorite Records, Concert Energy, and Late-Night Mixes.
7. **The Scene Playlist Wall** (`section-7`, mode: `native-whtml`): - Six mood-curated playlists with custom art sleeves and rotational offsets.
8. **Stories & Backstage Pass** (`section-8`, mode: `native-whtml`): - Carousel of real connection stories from East London, Glasgow, and Chicago.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Riff Scoped Styles** (`riff-styles-1`, placement: `head`, 6659 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Riff Interactive Runtime Bridge** (`riff-runtime-1`, placement: `footer`, 268 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
