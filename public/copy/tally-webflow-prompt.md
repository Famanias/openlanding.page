# Webflow MCP Import Prompt: TALLY (tally)

Import the **TALLY** (Shopify & Service Commerce) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/tally
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/tally-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/tally.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "tally" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "tally", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/tally-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`TALLY Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#FAF4E8` | `static_value` |
| `Color / Mint` | `--color-mint` | `#C8E6D0` | `static_value` |
| `Color / Blush` | `--color-blush` | `#F7C8B6` | `static_value` |
| `Color / Lilac` | `--color-lilac` | `#CFD6F6` | `static_value` |
| `Color / Ink` | `--color-ink` | `#231F2B` | `static_value` |
| `Color / Tl Paper` | `--tl-paper` | `#FAF4E8` | `static_value` |
| `Color / Tl Mint` | `--tl-mint` | `#C8E6D0` | `static_value` |
| `Color / Tl Blush` | `--tl-blush` | `#F7C8B6` | `static_value` |
| `Color / Tl Lilac` | `--tl-lilac` | `#CFD6F6` | `static_value` |
| `Color / Tl Ink` | `--tl-ink` | `#231F2B` | `static_value` |
| `Color / Tl Paper Warm` | `--tl-paper-warm` | `color-mix(in srgb, #FAF4E8 88%, #F7C8B6)` | `custom_value` |
| `Color / Tl Paper Mint` | `--tl-paper-mint` | `color-mix(in srgb, #FAF4E8 76%, #C8E6D0)` | `custom_value` |
| `Color / Tl Paper Lilac` | `--tl-paper-lilac` | `color-mix(in srgb, #FAF4E8 78%, #CFD6F6)` | `custom_value` |
| `Color / Tl Ink Muted` | `--tl-ink-muted` | `color-mix(in srgb, #231F2B 74%, #FAF4E8)` | `custom_value` |
| `Color / Tl Ink Soft` | `--tl-ink-soft` | `color-mix(in srgb, #231F2B 58%, #FAF4E8)` | `custom_value` |
| `Color / Tl Rule` | `--tl-rule` | `color-mix(in srgb, #231F2B 18%, #FAF4E8)` | `custom_value` |
| `Color / Tl Rule Strong` | `--tl-rule-strong` | `#231F2B` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Besley` | Google Font: `Besley` |
| `Font / Body` | `--font-body` | `Public Sans` | Google Font: `Public Sans` |
| `Font / Mono` | `--font-mono` | `Overpass Mono` | Google Font: `Overpass Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `26px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `TALLY` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `tally.webp` (image/webp) — https://www.openlanding.page/gallery/tally.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/tally/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Counter Top Bar (`Header.tsx`)** (`section-1`, mode: `native-whtml`): Sticky bar with the perforated Tally ticket mark, 5-item desktop nav with a sliding pastel mint pill indicator, live queue badge (`04 ON BENCH`), accessible motion pause/resume toggle, *"Issue a Ticket"* CTA, and a native `<dialog>` mobile drawer with Escape close and focus restoration.
2. **The Shop Counter (`Hero.tsx`)** (`section-2`, mode: `native-whtml`): Split editorial hero with masked headline *"Sell your hours / like your goods."*, merchant archetype quick-switcher, magnetic primary CTA, and an interactive **Front Counter Mat** featuring a clickable SVG brass counter bell (`CounterBellSvg`) that rings and stamps a two-part hero claim stub, followed by a 4-column ink ledger strip.
3. **The Perforated Ticket Runway (`CounterStage.tsx` — Signature Mechanic)** (`section-3`, mode: `hybrid-embed`): - Pinned scroll-and-click stage tracking a service order across four stops: `01 Booked at Checkout`, `02 Checked In at Counter`, `03 On the Workbench`, `04 Ready for Pickup`.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Four Ways to Sell Time (`ServiceModes.tsx`)** (`section-4`, mode: `native-whtml`): 2×2 bento comparing *1-on-1 Fittings & Consultations*, *Drop-Off & Mail-In Repairs*, *Bespoke Product Add-Ons*, and *Small-Group Bench Classes*. Each card toggles live between **Online Cart Line** and **Shopify POS Bench** views.
5. **The Merchant Bench (`MerchantStories.tsx`)** (`section-5`, mode: `native-whtml`): Pauseable service-category ticker band, followed by three illustrated small-business dossiers with `CountUp` metrics and an inspectable **Receipt Stub `<dialog>` modal** (`#TLY-26-1050`, `#TLY-26-2150`, `#TLY-26-3325`).
6. **Rate & Deposit Recovery Ledger (`RevenueCalculator.tsx`)** (`section-6`, mode: `native-whtml`): Interactive range sliders (weekly bookings, average ticket value, checkout deposit %) that compute monthly recovered no-show revenue and highlight the recommended flat-rate plan (*Counter $19/mo*, *Workshop $49/mo*, *Guild $99/mo*).
7. **Counter Questions (`FaqSection.tsx`)** (`section-7`, mode: `native-whtml`): Sticky header + 5-question accordion animating height via `grid-template-rows: 0fr → 1fr`.
8. **Open Your Counter (`IntakeSection.tsx` & `CounterForm.tsx`)** (`section-8`, mode: `native-whtml`): Client-validated onboarding form (store name, email, archetype, plan, service workflow note). Invalid fields shake once and focus the first invalid control. Valid submission never sends a network request; it stamps and detaches a personalized **Merchant Trial Pass (`TLY-26-XXXX`)** with one-click clipboard copy.
9. **Footer (`Footer.tsx`)** (`section-9`, mode: `native-whtml`): Full-width original SVG neighborhood street scene (`FooterShopfrontScene`) with a gently swaying hanging shop sign, section links, and motion pause control.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **TALLY Scoped Styles (Part 1/2)** (`tally-styles-1`, placement: `head`, 45000 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TALLY Scoped Styles (Part 2/2)** (`tally-styles-2`, placement: `head`, 7859 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **TALLY Interactive Runtime Bridge** (`tally-runtime-1`, placement: `footer`, 342 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
