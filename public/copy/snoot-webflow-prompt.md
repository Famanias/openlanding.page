# Webflow MCP Import Prompt: Snoot (snoot)

Import the **Snoot** (Veterinary Care) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/snoot
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/snoot-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/snoot.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "snoot" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "snoot", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/snoot-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`Snoot Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Ink` | `--color-ink` | `#1F1B3A` | `static_value` |
| `Color / Paper` | `--color-paper` | `#FFF4E4` | `static_value` |
| `Color / Milk` | `--color-milk` | `#FFFCF6` | `static_value` |
| `Color / Pink` | `--color-pink` | `#FF6B8B` | `static_value` |
| `Color / Blue` | `--color-blue` | `#3550F0` | `static_value` |
| `Color / Yolk` | `--color-yolk` | `#FFC23D` | `static_value` |
| `Color / Mint` | `--color-mint` | `#6FD3B0` | `static_value` |
| `Color / Frank` | `--color-frank` | `#C9773F` | `static_value` |
| `Color / Frank Light` | `--frank-light` | `color-mix(in oklab, var(--color-frank) 42%, var(--color-milk))` | `custom_value` |
| `Color / Frank Dark` | `--frank-dark` | `color-mix(in oklab, var(--color-frank) 60%, var(--color-ink))` | `custom_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `var(--font-lilita)` | Fallback: `Arial Rounded MT Bold, Trebuchet MS, system-ui, sans-serif` |
| `Font / Body` | `--font-body` | `Figtree` | Google Font: `Figtree` |
| `Font / Chart` | `--font-chart` | `Ubuntu Sans Mono` | Google Font: `Ubuntu Sans Mono` |
| `Font / Lilita One` | `--font-lilita-one` | `Lilita One` | Google Font: `Lilita One` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Frank H` | `--frank-h` | `clamp(200px, 40svh, 420px)` | `custom_value` |
| `Size / Lift` | `--lift` | `0px` | `static_value` |
| `Size / Reveal Shift` | `--reveal-shift` | `30px` | `static_value` |
| `Size / Sn Gutter` | `--sn-gutter` | `clamp(16px, 4.6vw, 72px)` | `custom_value` |
| `Size / Sn Max` | `--sn-max` | `1280px` | `static_value` |
| `Size / Sm` | `--r-sm` | `14px` | `static_value` |
| `Size / R` | `--r` | `26px` | `static_value` |
| `Size / Lg` | `--r-lg` | `44px` | `static_value` |
| `Size / Sn Border` | `--sn-border` | `3px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `Snoot` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `snoot.webp` (image/webp) — https://www.openlanding.page/gallery/snoot.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): floating milk pill (logo, nav Check-up / Patients / Plans / Team / Your visit, phone in mono, pink "Book" button). Compresses after 80 px, hides on scroll-down, returns on scroll-up; the active section gets one sliding yolk pill (clip-path); phones get a pink full-screen menu that opens as a clip-path circle from the toggle, with staggered mask-rise links, scroll lock and a focus trap.
2. **Hero** (`section-2`, mode: `native-whtml`): eyebrow "Neighbourhood vet · Easton · open seven days"; h1 "Every check-up, / nose to tail." with a pink squiggle drawn under "nose"; sub-copy; CTAs "Fetch an appointment" (pink, magnetic) and "See the check-up" (milk); three count-up stats (40 min bloods, 1,860 owners rate us 4.9, 2 theatres). Right: a breathing blue blob with a yolk sun, drifting bone/ball/heart props, a tilted patient-chart card ("Frank · 7 y · dachshund · 7.4 kg · ✓ Very good boy"), and **Frank's head** (the same SVG cropped to `viewBox="20 70 520 420"`, body continuing off-frame). His nose is a real `<button aria-label="Boop me: Frank's nose">`: each press squishes the nose, squeezes the eyes, flops the ear, pops a speech bubble ("Boop!", "Hehe.", "Again?", "Snrrk.") and rolls a "1,284 boops today" counter; every fifth boop he sneezes (head jolt + sparks, "Achoo!").
3. **Waiting-room ticker** (`section-3`, mode: `native-whtml`): a yolk band tilted −1.6°, marquee of milk patient pills ("Biscuit · 4 · spaniel · ♥ jabs done"), paused off-screen and on hover, with a screen-reader list beside it.
4. **The check-up (the mechanic)** (`section-4`, mode: `hybrid-embed`): blue slab. Heading "Nose to tail, in six stops.", a `01/06` counter, a six-step rail with a sliding yolk pill (links jump to chapters), a chapter card that swaps per chapter, a dark readout pill with a polite live region, Frank on a sliding track, the chest-piece (disc + long ink/pink tube), the ECG and the stamp. Chapters (x, y in Frank's 2600 × 640 viewBox):
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
5. **Who we see** (`section-5`, mode: `native-whtml`): tabs Dogs / Cats / Rabbits / Small & scaly (sliding pink pill, arrow/Home/End keys). Each panel: a 2.5D stage (coloured blob, flat SVG pet in Frank's outline style, a polaroid patient photo) whose layers shift by depth toward the pointer, a headline, copy, a count-up "seen this year" and visit chips. Panels slide in the direction of travel.
6. **Snoot plans** (`section-6`, mode: `hybrid-embed`): pink slab. A monthly/yearly switch (sliding knob, "2 months free") and a 1–4 pets stepper. Three collar tags hanging from rings: Pup & Kit £16, Grown-up £21 (yolk, "Most picked"), Golden Years £29; each extra pet 15 % off; yearly = 10 months. Prices roll on change, tags swing on hover, "What's in it" flips a tag in 3D to its list.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
7. **The team** (`section-7`, mode: `native-whtml`): four tilt cards (photo, "with Pudding, retired greyhound" sticker, name, role, one line): Dr Adaeze Okafor (clinical director), Dr Ruth Lindgren (surgeon), Dr Kenji Arai (exotics), Sol Medina RVN (head nurse). Tilt + yolk spotlight, lift, photo scale, sibling dimming.
8. **Your visit** (`section-8`, mode: `native-whtml`): yolk slab, four steps with wiping photos and numbered pink tags (two doors, treats before needles, the check on their level, out with a plan), a dotted paw trail drawn on scroll, and promise chips.
9. **After hours** (`section-9`, mode: `native-whtml`): ink slab, "Something wrong at 3 a.m.? Ring the night vet.", a live open/closed sign computed from the visitor's clock (Mon–Fri 08–20, Sat 09–17, Sun 10–14; "Closing soon" inside 45 minutes; "Doors open 08:00 tomorrow"), a pink emergency-call card with a rolling number, and an hours table.
10. **Fetch an appointment** (`section-10`, mode: `hybrid-embed`): blue slab. Form: pet's name (floating label), species chips, reason select, the next five open days as chips (computed after mount, Sundays skipped), owner name, email or phone. Validation on blur and submit; invalid fields shake and their message slides open; filled fields draw a check. Submit morphs to "Fetching…" with bouncing dots, then the form folds away and a mint dog tag drops in on a wag curve with the summary ("Biscuit · Check-up · Thu 19 Nov") and a pink "Booked" stamp; focus moves to it. No network request. Beside it, **a real-time 3D tennis ball**: `WebGPURenderer` (WebGL2 fallback), `MeshPhysicalNodeMaterial` with sheen, a procedural TSL seam `1 − smoothstep(0.045, 0.07, |n.z − 0.75(n.x² − n.y²)|)` mixing yolk and milk, a fading contact shadow; it bobs, spins on drag with inertia, and on booking success is thrown away and bounces back in. Loaded on idle when near on desktop, on tap on touch screens, never under reduced motion; an SVG poster is the default.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.
11. **Footer** (`section-11`, mode: `native-whtml`): ink slab, big logo, motto in yolk, link columns, address, night line, fictional-clinic note, paw prints walking across the bottom.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **Snoot Scoped Styles (Part 1/2)** (`snoot-styles-1`, placement: `head`, 44947 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Snoot Scoped Styles (Part 2/2)** (`snoot-styles-2`, placement: `head`, 29385 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **Snoot Interactive Runtime Bridge** (`snoot-runtime-1`, placement: `footer`, 423 / 45000 chars): Loads lenis, three in page footer custom code with prefers-reduced-motion guard.
