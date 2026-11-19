# Webflow MCP Import Prompt: Pipkin (pipkin)

Import the **Pipkin** (Small Shop & E-commerce) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/pipkin
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/pipkin-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/pipkin.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "pipkin" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "pipkin", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/pipkin-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Pipkin Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Cream` | `--color-cream` | `#FFF8EC` | `static_value` |
| `Color / Plum` | `--color-plum` | `#3B2A47` | `static_value` |
| `Color / Blush` | `--color-blush` | `#FFD6E2` | `static_value` |
| `Color / Bubblegum` | `--color-bubblegum` | `#FF9DBB` | `static_value` |
| `Color / Butter` | `--color-butter` | `#FFEBA6` | `static_value` |
| `Color / Mint` | `--color-mint` | `#CBEBDA` | `static_value` |
| `Color / Sky` | `--color-sky` | `#CDE5F8` | `static_value` |
| `Color / Lilac` | `--color-lilac` | `#E3D8F6` | `static_value` |
| `Color / Pk Muted` | `--pk-muted` | `color-mix(in srgb, var(--color-plum) 76%, var(--color-cream))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-bagel)` | Fallback: `Arial Rounded MT Bold, system-ui, sans-serif` |
| `Font / Body` | `--font-body` | `Nunito` | Google Font: `Nunito` |
| `Font / Mono` | `--font-mono` | `var(--font-sometype)` | Fallback: `ui-monospace, monospace` |
| `Font / Bagel Fat One` | `--font-bagel-fat-one` | `Bagel Fat One` | Google Font: `Bagel Fat One` |
| `Font / Sometype Mono` | `--font-sometype-mono` | `Sometype Mono` | Google Font: `Sometype Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Lift` | `--lift` | `-8px` | `static_value` |
| `Size / D` | `--d` | `calc(var(--s, 0) - var(--i, 0))` | `custom_value` |
| `Size / Lvl` | `--lvl` | `clamp(0, calc((var(--p, 0) - 0.17) / 0.16), 1)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Pipkin` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `pipkin.webp` (image/webp) — https://www.openlanding.page/gallery/pipkin.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): fixed pill bar; compresses with a blurred background after 80px, hides on scroll-down and returns on scroll-up; a nav indicator that slides between links and follows the active section; a cart pill showing the jar count; a Magnetic "Order" button; below 960px a round toggle that morphs to ✕ and opens a full-screen butter menu with a circle clip-path wipe, staggered links, scroll lock, focus trap and Esc to close.
2. **Hero** (`section-2`, mode: `native-whtml`): grid with copy left and art right. An "Order #0412 placed · Mon 9:41" pill, the h1 "Cooked [[Tuesday.]] At your door Friday.", a lede, two CTAs ("Build a box", "Follow a jar"), three facts. Art: a sky circle with three jars (lilac "No. 05", bubblegum "No. 01", butter "No. 02"), three chips ("Made Tuesday", "Real fruit, no pectin", "Batch No. 17") and sparkles. Four soft pastel blobs drift behind.
3. **Flavour band** (`section-3`, mode: `native-whtml`): a rotated bubblegum strip with a looping marquee of six flavour pills.
4. **The Trip (the signature mechanic)** (`section-4`, mode: `native-whtml`): below.
5. **The Shelf** (`section-5`, mode: `native-whtml`): six flavour cards (Strawberry & Basil, Meyer Lemon Marmalade, Pear & Vanilla Bean, Blueberry & Thyme, Plum & Lavender, Peach & Chamomile) with filter chips (All six / Fruity / Floral / Tangy), $9 each, an "Add to box" button.
6. **Build a Box** (`section-6`, mode: `native-whtml`): size toggle (3 / 6 / 12 jars), a yellow box of slots that fill with jars, a stepper per flavour, a live total (1 jar $9; $1 off from 3, $4 off from 6, $12 off at 12; shipping $6 under 6 jars, free from 6), "Place order", loading, then a success ticket. The shelf buttons and the header counter share the same box state.
7. **Batch Day** (`section-7`, mode: `native-whtml`): four count-up stats (36 jars, 2 cooks, 72 h, 1,208 notes) and a Mon–Fri week strip joined by a drawn dashed line.
8. **Doorstep Notes** (`section-8`, mode: `native-whtml`): two rows of customer-note cards drifting in opposite directions, pausing on hover.
9. **Questions** (`section-9`, mode: `native-whtml`): five-item accordion (height via `grid-template-rows`), one open at a time.
10. **The Friday List** (`section-10`, mode: `native-whtml`): a signup form (first name, email, a "which jar do you lean towards?" pill radio group). No network: validate on the client, shake invalid fields, show a loading button, then a circle wipe to a success card.
11. **Footer** (`section-11`, mode: `native-whtml`): plum slab, link columns, a giant "pipkin" wordmark that rises through a mask.
12. **Order placed** (`section-12`, mode: `native-whtml`): a phone on the counter with a notification, a ringing bell, a receipt ticket; the jar is a dashed ghost outline. Sky.
13. **Cooking** (`section-13`, mode: `native-whtml`): a lilac stockpot of bubbling jam, a stirring spoon, steam, a ladle pouring a stream; the jar fills with jam as you scroll. Butter.
14. **Packed** (`section-14`, mode: `native-whtml`): tape, tissue, stickers, a pencil and a hanging "Handle with jam" tag; the jar gets its lid and sits in an open box, the box lid beside it. Mint.
15. **Out for delivery** (`section-15`, mode: `native-whtml`): a pink pickup with a flat bed carrying the closed box, a scrolling road, houses and trees; wheels spin with scroll. Lilac.
16. **Delivered** (`section-16`, mode: `native-whtml`): a front door, windows, a mat and a plant; the box lid lifts off and lands beside it, the jar pops up and settles, sparkles twinkle, a "Delivered · 11:20" banner appears. Blush.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Pipkin Scoped Styles (Part 1/2)** (`pipkin-styles-1`, placement: `head`, 44983 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Pipkin Scoped Styles (Part 2/2)** (`pipkin-styles-2`, placement: `head`, 17809 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Pipkin Interactive Runtime Bridge** (`pipkin-runtime-1`, placement: `footer`, 343 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
