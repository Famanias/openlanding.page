# Webflow MCP Import Prompt: PERIGEE (perigee)

Import the **PERIGEE** (Astrophysics & Deep Space Telemetry) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/perigee
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/perigee-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/perigee.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "perigee" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "perigee", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/perigee-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`PERIGEE Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Void` | `--color-void` | `#000000` | `static_value` |
| `Color / Starlight` | `--color-starlight` | `#f6f1ea` | `static_value` |
| `Color / Amber` | `--color-amber` | `#ffb36b` | `static_value` |
| `Color / Doppler Blue` | `--color-doppler-blue` | `#e6f0ff` | `static_value` |
| `Color / Doppler Red` | `--color-doppler-red` | `#ff8a3d` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Sans` | `--font-sans` | `var(--font-sans` | Fallback: `Inter Tight, -apple-system, BlinkMacSystemFont, sans-serif)` |
| `Font / Serif` | `--font-serif` | `var(--font-serif` | Fallback: `Cormorant Garamond, Georgia, serif)` |
| `Font / Mono` | `--font-mono` | `var(--font-mono` | Fallback: `JetBrains Mono, monospace)` |
| `Font / Cormorant Garamond` | `--font-cormorant-garamond` | `Cormorant Garamond` | Google Font: `Cormorant Garamond` |
| `Font / Inter Tight` | `--font-inter-tight` | `Inter Tight` | Google Font: `Inter Tight` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `PERIGEE` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `perigee.webp` (image/webp) — https://www.openlanding.page/gallery/perigee.webp (Gallery preview capture)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **THE SHADOW (`r = 38.0 → 24.0 Rs`)** (`section-1`, mode: `native-whtml`): Wide orbital establisher in deep space. The black hole sits slightly off-center with a rolled horizon (`roll = -0.15`), bending background starlight around the Einstein ring. Headline `"PERIGEE"` and `"Light does not travel in straight lines."`
2. **ACCRETION PLANE (`r = 24.0 → 9.0 Rs`)** (`section-2`, mode: `native-whtml`): The camera levels roll and descends above the equatorial plane of the accretion disk (`pitch → 0.03`). Keplerian differential rotation shears past the lens. Copy: `"Matter in terminal orbit. Superheated plasma shearing at forty percent the speed of light."`
3. **DOPPLER LIMB (`r = 9.0 → 4.8 Rs`)** (`section-3`, mode: `native-whtml`): The camera banks sharply (`roll → -0.32`) into the approaching left wing. Relativistic Doppler beaming shifts plasma to blue-white brilliance while the receding wing fades to infrared. Copy: `"Relativistic beaming. What approaches blinds; what recedes fades into infrared."`
4. **THE PHOTON SPHERE (`r = 4.8 → 1.65 Rs`, Signature Interactive Moment)** (`section-4`, mode: `native-whtml`): Camera hovers at the razor-thin glowing Photon Ring (`r = 1.5 Rs`). The user can drag in space to launch test-photon geodesics into the gravity well—watching them spiral across the horizon, execute a 180° hairpin gravitational slingshot, or deflect into deep space. Copy: `"The photon sphere. Where gravity traps light in a closed circular mirror."`
5. **INNERMOST STABLE ORBIT (`r = 1.65 → 1.18 Rs`)** (`section-5`, mode: `native-whtml`): Camera skims above the Event Horizon shadow (`r = 1.0 Rs`). Extreme gravitational time dilation. Four crisp architectural callout labels pin around the anatomy of the hole: `"Event Horizon (1.0 Rs)"`, `"Photon Sphere (1.5 Rs)"`, `"ISCO Boundary (3.0 Rs)"`, and `"Secondary Lensed Image"`.
6. **POLAR ESCAPE (`r = 1.18 → 18.0 Rs` North Polar Ascent)** (`section-6`, mode: `native-whtml`): Camera arcs over the north pole looking down into the spinning vortex as a collimated Relativistic Polar Jet ignites upward. Displays a `"Request Observation Window / Telemetry Feed"` console with client-side validation and animated ephemeris lock.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **PERIGEE Scoped Styles** (`perigee-styles-1`, placement: `head`, 1361 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **PERIGEE Interactive Runtime Bridge** (`perigee-runtime-1`, placement: `footer`, 497 / 45000 chars): Loads three, gsap, lenis in page footer custom code with prefers-reduced-motion guard.
