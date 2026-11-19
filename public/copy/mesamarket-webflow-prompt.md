# Webflow MCP Import Prompt: MESA MARKET (mesamarket)

Import the **MESA MARKET** (Produce & Grocery) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/mesamarket
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/mesamarket-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/mesamarket.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "mesamarket" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "mesamarket", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/mesamarket-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`MESA MARKET Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Mm Tomato` | `--color-mm-tomato` | `#D94C32` | `static_value` |
| `Color / Mm Leaf` | `--color-mm-leaf` | `#3F7047` | `static_value` |
| `Color / Mm Butter` | `--color-mm-butter` | `#F2C94D` | `static_value` |
| `Color / Mm Cream` | `--color-mm-cream` | `#FDF5E7` | `static_value` |
| `Color / Mm Blueberry` | `--color-mm-blueberry` | `#494D78` | `static_value` |
| `Color / Mm Ink` | `--color-mm-ink` | `#24211D` | `static_value` |
| `Color / Mm Tomato` | `--mm-tomato` | `#D94C32` | `static_value` |
| `Color / Mm Leaf` | `--mm-leaf` | `#3F7047` | `static_value` |
| `Color / Mm Butter` | `--mm-butter` | `#F2C94D` | `static_value` |
| `Color / Mm Cream` | `--mm-cream` | `#FDF5E7` | `static_value` |
| `Color / Mm Blueberry` | `--mm-blueberry` | `#494D78` | `static_value` |
| `Color / Mm Ink` | `--mm-ink` | `#24211D` | `static_value` |
| `Color / Mmf Cream` | `--mmf-cream` | `#282C25` | `static_value` |
| `Color / Mmf Green` | `--mmf-green` | `#385840` | `static_value` |
| `Color / Mmf Accent` | `--mmf-accent` | `#D85A36` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Fraunces` | Google Font: `Fraunces` |
| `Font / Serif` | `--font-serif` | `var(--font-fraunces)` | Fallback: `Georgia, serif` |
| `Font / Body` | `--font-body` | `Outfit` | Google Font: `Outfit` |
| `Font / Sans` | `--font-sans` | `var(--font-outfit)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `Space Mono` | Google Font: `Space Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Mmf Far X` | `--mmf-far-x` | `0px` | `static_value` |
| `Size / Mmf Far Y` | `--mmf-far-y` | `0px` | `static_value` |
| `Size / Mmf Mid X` | `--mmf-mid-x` | `0px` | `static_value` |
| `Size / Mmf Mid Y` | `--mmf-mid-y` | `0px` | `static_value` |
| `Size / Mmf Near X` | `--mmf-near-x` | `0px` | `static_value` |
| `Size / Mmf Near Y` | `--mmf-near-y` | `0px` | `static_value` |
| `Size / Mmf Front X` | `--mmf-front-x` | `0px` | `static_value` |
| `Size / Mmf Front Y` | `--mmf-front-y` | `0px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `MESA MARKET` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `mesamarket.webp` (image/webp) — https://www.openlanding.page/gallery/mesamarket.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Market Signage Header** (`section-1`, mode: `native-whtml`): Fixed/sticky navigation with brand mark, anchor jumps to all key sections, and a live basket summary button.
2. **Flat-Lay Market Stall Hero** (`section-2`, mode: `native-whtml`): Floating produce stickers arranged like a curated storefront window, with headline **“Good things come into season.”** wrapping through the negative spaces. Includes a left-hand harvest category rail and primary CTA **“Fill your basket”**.
3. **Interactive Produce Shelf** (`section-3`, mode: `native-whtml`): Live category filters (All / Vegetables / Fruit / Pantry) that reorder and filter eight produce products (Early Girl tomatoes, Nantes carrots, Meyer lemons, Lacinato kale, Jimmy Nardello peppers, Rosa Bianca eggplant, Sebastopol apples, Red Fife sourdough). Each card features sample price, origin details, seasonal notes, and interactive increment/decrement crate controls.
4. **Seasonal Recipe Crates** (`section-4`, mode: `native-whtml`): Three seasonal recipe meal kits that add all required ingredients to the crate atomically in a single tap, accompanied by warm editorial kitchen photography.
5. **Producer Story & Delivery Loop** (`section-5`, mode: `native-whtml`): Comic-style label strips detailing field harvest, packing shed, and electric van routes, paired with a smallholder grower portrait and an illustrated inline SVG delivery map.
6. **Sample Checkout / Grocery Receipt** (`section-6`, mode: `native-whtml`): An itemized grocery receipt reflecting the live crate items, line totals, illustrative subtotal, and demonstration notice, alongside harvest table photography.
7. **Grocery-Receipt Footer** (`section-7`, mode: `native-whtml`): Clear disclosure notice, brand credits, and quick jump back to top.
8. **Floating Basket Pill & Drawer** (`section-8`, mode: `native-whtml`): Persistent bottom-right crate counter opening a full-featured accessible drawer dialog with keyboard navigation (Esc to close), line item quantity adjustments, clear crate action, and direct jump to the receipt review.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **MESA MARKET Scoped Styles** (`mesamarket-styles-1`, placement: `head`, 14784 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **MESA MARKET Interactive Runtime Bridge** (`mesamarket-runtime-1`, placement: `footer`, 428 / 45000 chars): Loads motion, three, gsap in page footer custom code with prefers-reduced-motion guard.
