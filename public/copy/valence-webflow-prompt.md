# Webflow MCP Import Prompt: VALENCE (valence)

Import the **VALENCE** (B2B Lead Generation & Funnel Intelligence) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/valence
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/valence-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/valence.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "valence" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "valence", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/valence-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`VALENCE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Paper` | `--color-paper` | `#FBF9F5` | `static_value` |
| `Color / Ink` | `--color-ink` | `#1E1B2E` | `static_value` |
| `Color / Lavender` | `--color-lavender` | `#E8E0F8` | `static_value` |
| `Color / Mint` | `--color-mint` | `#D9F2E6` | `static_value` |
| `Color / Peach` | `--color-peach` | `#FCE2D5` | `static_value` |
| `Color / Accent` | `--color-accent` | `#5B46E8` | `static_value` |
| `Color / Mauve` | `--color-mauve` | `#645D7A` | `static_value` |
| `Color / Rose` | `--color-rose` | `#D9385A` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Urbanist` | Google Font: `Urbanist` |
| `Font / Body` | `--font-body` | `var(--font-jakarta)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-jetbrains)` | Fallback: `ui-monospace, monospace` |
| `Font / Weight Medium` | `--font-weight-medium` | `500` | Fallback: `system-ui, sans-serif` |
| `Font / Weight Semibold` | `--font-weight-semibold` | `600` | Fallback: `system-ui, sans-serif` |
| `Font / Weight Bold` | `--font-weight-bold` | `700` | Fallback: `system-ui, sans-serif` |
| `Font / Weight Extrabold` | `--font-weight-extrabold` | `800` | Fallback: `system-ui, sans-serif` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `28px` | `static_value` |
| `Size / Spacing` | `--spacing` | `0.25rem` | `static_value` |
| `Size / Container Md` | `--container-md` | `28rem` | `static_value` |
| `Size / Container 2xl` | `--container-2xl` | `42rem` | `static_value` |
| `Size / Text Xs` | `--text-xs` | `0.75rem` | `static_value` |
| `Size / Text Sm` | `--text-sm` | `0.875rem` | `static_value` |
| `Size / Text Base` | `--text-base` | `1rem` | `static_value` |
| `Size / Text Lg` | `--text-lg` | `1.125rem` | `static_value` |
| `Size / Text Xl` | `--text-xl` | `1.25rem` | `static_value` |
| `Size / Text 2xl` | `--text-2xl` | `1.5rem` | `static_value` |
| `Size / Text 3xl` | `--text-3xl` | `1.875rem` | `static_value` |
| `Size / Text 4xl` | `--text-4xl` | `2.25rem` | `static_value` |
| `Size / Text 5xl` | `--text-5xl` | `3rem` | `static_value` |
| `Size / Tracking Tight` | `--tracking-tight` | `-0.025em` | `static_value` |
| `Size / Lift` | `--lift` | `-6px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `VALENCE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `valence.webp` (image/webp) — https://www.openlanding.page/gallery/valence.webp (Gallery preview capture)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/valence/preview-1600.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Splash Page** (`section-1`, mode: `native-whtml`): Intermediary gatekeeping & launch announcement threshold (regional/industry cohort selection + single `"Enter the 2026 Briefing"` button).
2. **Squeeze Page** (`section-2`, mode: `native-whtml`): Minimalist single-field email capture (one bold headline, two sentences of copy, and a single pill email input field) trading an address for the *14-Page Executive Digest* and waitlist pass.
3. **Lead Capture (Lead Gen) Page** (`section-3`, mode: `native-whtml`): Comprehensive B2B multi-field qualification suite (`Full Name`, `Work Email`, `Company`, `Company Size`, `Role`) paired with verified enterprise social proof, benefit bullets, and a live interactive preview of the gated asset (*68-Page Funnel Architecture Monograph & Custom Benchmark Audit*).
4. **Floating Pill Header (`Header.tsx`)** (`section-4`, mode: `native-whtml`): Brand lockup, live 3-format pill switcher (`01 Splash Gate`, `02 Squeeze Page`, `03 Lead Capture`), live unlocked depth badge (`15% → 40% → 70% → 100%`), primary `"Unseal Dossier"` pill CTA, and mobile modal dialog menu.
5. **Stage 01 — The Splash Gate (`SplashGateSection.tsx`)** (`section-5`, mode: `hybrid-embed`): High-impact announcement hero & intermediary cohort selector (`North America · B2B SaaS`, `EMEA & UK · Consent-First`, `APAC · High-Velocity PLG`) with a single `"Enter the 2026 Briefing"` button beside the interactive 3D Pastel Capsule Monolith (`CapsuleCanvas.tsx`).
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
6. **The 3-Format Value-Exchange Matrix (`CaptureMatrixSection.tsx`)** (`section-6`, mode: `native-whtml`): Scroll- and click-linked comparison stage contrasting Splash, Squeeze, and Lead Capture pages across median CVR, field friction, structural anatomy, and use cases.
7. **Stage 02 — The Squeeze Fast-Lane (`SqueezeSection.tsx`)** (`section-7`, mode: `native-whtml`): Minimalist single-field email capture on a Pistachio Mint slab. Validating the single email input mints a deterministic `SQ-26-XXXX` pass code, unlocks Chapter 02 in the Gated Asset Preview, and carries the email forward into Stage 03.
8. **Live Gated Asset Preview (`AssetPreviewSection.tsx`)** (`section-8`, mode: `native-whtml`): Interactive 4-chapter reader for the *2026 Funnel Architecture Monograph*. Visitors filter live SVG benchmark charts by `Company Size` and `Role` and watch locked chapters unseal as gates are completed.
9. **Stage 03 — The B2B Lead-Capture Dossier (`LeadCaptureSection.tsx`)** (`section-9`, mode: `hybrid-embed`): Multi-field B2B qualification form (`Full Name`, `Work Email`, `Company`, `Company Size`, `Role`) paired with benefit bullets, count-up benchmark stats (`418` funnels, `3.4×` pipeline lift, `94%` routing signal), and verified peer social proof cards. Valid submission mints deterministic Dossier Key `VL-2026-XXXX` and unseals the 3D capsule to `100%`.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
10. **Funnel Governance FAQ & Colophon (`FaqFooterSection.tsx`)** (`section-10`, mode: `native-whtml`): Benchmark marquee ticker, smooth `grid-template-rows` FAQ accordion, ambient motion pause/resume button, and Plum Ink colophon.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **VALENCE Scoped Styles** (`valence-styles-1`, placement: `head`, 33491 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **VALENCE Interactive Runtime Bridge** (`valence-runtime-1`, placement: `footer`, 425 / 45000 chars): Loads three, lenis in page footer custom code with prefers-reduced-motion guard.
