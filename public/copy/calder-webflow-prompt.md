# Webflow MCP Import Prompt: CALDER & ROWE (calder)

Import the **CALDER & ROWE** (Law & Advisory) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/calder
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/calder-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/calder.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "calder" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "calder", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/calder-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`CALDER & ROWE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#070C17` | `static_value` |
| `Color / Midnight` | `--color-midnight` | `#0E1830` | `static_value` |
| `Color / Ivory` | `--color-ivory` | `#F5F0E4` | `static_value` |
| `Color / Gold` | `--color-gold` | `#C9A55A` | `static_value` |
| `Color / Parchment` | `--color-parchment` | `#E8DFCB` | `static_value` |
| `Color / Slate` | `--color-slate` | `#55607A` | `static_value` |
| `Color / Brass` | `--color-brass` | `#7D5F1F` | `static_value` |
| `Color / Garnet` | `--color-garnet` | `#9C3A2E` | `static_value` |
| `Color / Cr Muted Paper` | `--cr-muted-paper` | `color-mix(in srgb, var(--color-ink) 72%, transparent)` | `custom_value` |
| `Color / Cr Muted Slab` | `--cr-muted-slab` | `color-mix(in srgb, var(--color-ivory) 74%, transparent)` | `custom_value` |
| `Color / Cr Hair Paper` | `--cr-hair-paper` | `color-mix(in srgb, var(--color-ink) 14%, transparent)` | `custom_value` |
| `Color / Cr Hair Slab` | `--cr-hair-slab` | `color-mix(in srgb, var(--color-ivory) 16%, transparent)` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Fraunces` | Google Font: `Fraunces` |
| `Font / Body` | `--font-body` | `var(--font-instrument)` | Fallback: `system-ui, sans-serif` |
| `Font / Mono` | `--font-mono` | `var(--font-cutive)` | Fallback: `ui-monospace, Courier New, monospace` |
| `Font / Cutive Mono` | `--font-cutive-mono` | `Cutive Mono` | Google Font: `Cutive Mono` |
| `Font / Instrument Sans` | `--font-instrument-sans` | `Instrument Sans` | Google Font: `Instrument Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Reveal Shift` | `--reveal-shift` | `26px` | `static_value` |
| `Size / Cr Pad` | `--cr-pad` | `clamp(88px, 12vw, 168px)` | `custom_value` |
| `Size / Cr Lap` | `--cr-lap` | `clamp(28px, 4vw, 56px)` | `custom_value` |
| `Size / Cr Lap R` | `--cr-lap-r` | `clamp(28px, 4vw, 56px)` | `custom_value` |
| `Size / Cr Gutter` | `--cr-gutter` | `clamp(20px, 5vw, 72px)` | `custom_value` |
| `Size / Lift` | `--lift` | `0px` | `static_value` |
| `Size / Note` | `--note` | `clamp(0, calc((var(--p, 1) - 0.55) * 2.4), 1)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `CALDER & ROWE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `calder.webp` (image/webp) — https://www.openlanding.page/gallery/calder.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Hero** (`section-1`, mode: `native-whtml`): (midnight, min-height 100svh): gold-hairline colonnade line-art behind, eyebrow "New York — Business law · Disputes · Estates", h1 "Hard decisions, *argued well.*" (two masked lines, the second in gold italic), lead "Calder & Rowe is a New York law firm of eleven attorneys. When the matter is consequential, you work directly with the partners who argue it.", a magnetic gold pill "File a matter" and a text link "Read how we argue". On the right, a tilted ivory **memorandum sheet** (header "MEMORANDUM OF COUNSEL · No. 87-0412", "In the matter of *your decision*", two numbered clauses with ghost text lines, a gold chip "Settle before discovery.", a signature line) over a parchment back sheet, with the turning seal overlapping its corner. A four-up strip: Direct line, Offices (Manhattan · Brooklyn · Westchester), Since 1987, Reply within one business day.
2. **Matters** (`section-2`, mode: `native-whtml`): (§ I, ivory): "Four kinds of matter, *argued by partners.*" and four cards, each a count: I Business formation & contracts, II Commercial disputes, III Employment & executive matters, IV Trusts & estates. Each has a ghost Roman numeral, a summary, three typical matters with gold diamond bullets, and an "Ask about this" link that pre-selects the matter in the form.
3. **The argument** (`section-3`, mode: `hybrid-embed`): (§ II, midnight): the mechanic below. Four stages: Intake, Analysis, Position, Resolution, mapped to four clauses (Statement of facts, Questions presented, Recommended course, Disposition), each with a gold margin note ("Your call is answered by a partner.", "Usually two or three issues, rarely more.", "Fixed-fee quote included.", "A status note every Friday.").
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
4. **Counsel** (`section-4`, mode: `native-whtml`): (§ III, ivory): "The people who *answer the phone.*", two partner cards (Mara Calder, founding partner, commercial disputes; Daniel Rowe, partner, corporate & estates) with 4:5 portrait slots, a short bio and credential pills, then four count-up facts: 38 years in practice, 11 attorneys in one office, 2 partners on every matter, 1 business day to reply.
5. **Authorities** (`section-5`, mode: `native-whtml`): (§ IV, midnight): a large client quote ("Mara gave us a plan we could understand and act on. We felt *represented from the first call.*") with attribution, three anonymised matters written as citation cards (`No. 21-0388`, Founder buy-out, resolved in eleven weeks…), an advertising disclaimer, and a slow marquee of matter types.
6. **Questions** (`section-6`, mode: `native-whtml`): (§ V, ivory): five questions in an accordion (first consultation, fees, individuals vs businesses, confidentiality, where we meet) beside a sticky heading.
7. **File a matter** (`section-7`, mode: `native-whtml`): (§ VI, midnight): "Bring us the *hard one.*", the phone, email and Chambers (130 Madison Avenue, 12th Floor, New York, NY 10016), and an ivory form card: name, email, kind of matter (the four counts plus "Not sure yet"), message (10–600 characters). Pill inputs with floating labels. Client-side validation only, no network request.
8. **Footer** (`section-8`, mode: `native-whtml`): (ink): logo, one line, explore links, chambers, an oversized outlined "Calder & Rowe" wordmark in gold at 38%, and the line "Attorney advertising. Prior results do not guarantee a similar outcome."

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **CALDER & ROWE Scoped Styles (Part 1/2)** (`calder-styles-1`, placement: `head`, 44914 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **CALDER & ROWE Scoped Styles (Part 2/2)** (`calder-styles-2`, placement: `head`, 11850 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **CALDER & ROWE Interactive Runtime Bridge** (`calder-runtime-1`, placement: `footer`, 350 / 45000 chars): Loads lenis in page footer custom code with prefers-reduced-motion guard.
