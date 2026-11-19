# Webflow MCP Import Prompt: LUMEN (lumen)

Import the **LUMEN** (AI & Productivity) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/lumen
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/lumen-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/lumen.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "lumen" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "lumen", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/lumen-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`LUMEN Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg Primary` | `--bg-primary` | `#F8F9FC` | `static_value` |
| `Color / Bg Secondary` | `--bg-secondary` | `#F0F3FA` | `static_value` |
| `Color / Text Primary` | `--text-primary` | `#1E2432` | `static_value` |
| `Color / Text Secondary` | `--text-secondary` | `#657187` | `static_value` |
| `Color / Glass Border` | `--glass-border` | `rgba(255, 255, 255, 0.78)` | `static_value` |
| `Color / Glass Border Strong` | `--glass-border-strong` | `rgba(255, 255, 255, 0.94)` | `static_value` |
| `Color / Glass Tint` | `--glass-tint` | `rgba(235, 240, 255, 0.45)` | `static_value` |
| `Color / Glass Surface` | `--glass-surface` | `rgba(255, 255, 255, 0.62)` | `static_value` |
| `Color / Glass Surface Elevated` | `--glass-surface-elevated` | `rgba(255, 255, 255, 0.78)` | `static_value` |
| `Color / Accent Lavender` | `--accent-lavender` | `#D8D0F7` | `static_value` |
| `Color / Accent Ice` | `--accent-ice` | `#C9DAFA` | `static_value` |
| `Color / Accent Peach` | `--accent-peach` | `#F6DCCA` | `static_value` |
| `Color / Btn Primary` | `--btn-primary` | `#252C43` | `static_value` |
| `Color / Accent Positive` | `--accent-positive` | `#5BA59A` | `static_value` |
| `Color / Palette 3` | `--color-palette-3` | `#5B8DEF` | `static_value` |
| `Color / Palette 6` | `--color-palette-6` | `#8E7CE8` | `static_value` |
| `Color / Palette 8` | `--color-palette-8` | `#CBD5E1` | `static_value` |
| `Color / Palette 10` | `--color-palette-10` | `#DDE3EE` | `static_value` |
| `Color / Palette 11` | `--color-palette-11` | `#E6ECF8` | `static_value` |
| `Color / Palette 12` | `--color-palette-12` | `#ECF0F9` | `static_value` |
| `Color / Palette 13` | `--color-palette-13` | `#EDF1FA` | `static_value` |
| `Color / Palette 14` | `--color-palette-14` | `#EFF3FA` | `static_value` |
| `Color / Palette 16` | `--color-palette-16` | `#F2F5FC` | `static_value` |
| `Color / Palette 19` | `--color-palette-19` | `#F9FAFD` | `static_value` |
| `Color / Palette 20` | `--color-palette-20` | `#FFFFFF` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |
| `Font / JetBrains Mono` | `--font-jetbrains-mono` | `JetBrains Mono` | Google Font: `JetBrains Mono` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Glass Blur` | `--glass-blur` | `16px` | `static_value` |
| `Size / Glass Shadow` | `--glass-shadow` | `0 20px 50px -12px rgba(30, 36, 50, 0.08), 0 4px 16px -2px rgba(30, 36, 50, 0.04)` | `static_value` |
| `Size / Glass Shadow Elevated` | `--glass-shadow-elevated` | `0 28px 64px -12px rgba(30, 36, 50, 0.14), 0 8px 24px -4px rgba(30, 36, 50, 0.06)` | `static_value` |
| `Size / Glass Edge Highlight` | `--glass-edge-highlight` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.45)` | `static_value` |
| `Size / Lm Gutter` | `--lm-gutter` | `clamp(24px, 5vw, 80px)` | `custom_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `LUMEN` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `lumen.webp` (image/webp) — https://www.openlanding.page/gallery/lumen.webp (Gallery preview capture)
- `footer-glass-cutout.webp` (image/webp) — https://www.openlanding.page/templates/lumen/footer-glass-cutout.webp (Template media asset)
- `footer-glass-mesh.glb` (model/gltf-binary) — https://www.openlanding.page/templates/lumen/footer-glass-mesh.glb (Template media asset)
- `footer-glass.webp` (image/webp) — https://www.openlanding.page/templates/lumen/footer-glass.webp (Template media asset)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/lumen/icon.svg (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/lumen/preview-1600.webp (Template media asset)
- `ai-workflow-playbook-cover_2149baf2.png` (image/png) — https://www.openlanding.page/templates/lumen/aistudio/ai-workflow-playbook-cover_2149baf2.png (Template media asset)
- `ai-workflow-playbook-cover_dcc4c416.svg` (image/svg+xml) — https://www.openlanding.page/templates/lumen/aistudio/ai-workflow-playbook-cover_dcc4c416.svg (Template media asset)
- `glass-workspace-art_25aec004.svg` (image/svg+xml) — https://www.openlanding.page/templates/lumen/aistudio/glass-workspace-art_25aec004.svg (Template media asset)
- `glass-workspace-art_d86f62af.png` (image/png) — https://www.openlanding.page/templates/lumen/aistudio/glass-workspace-art_d86f62af.png (Template media asset)
- `caustic-window.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/caustic-window.png (Template media asset)
- `frosted-fold.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/frosted-fold.png (Template media asset)
- `glass-strata.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/glass-strata.png (Template media asset)
- `liquid-lens.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/liquid-lens.png (Template media asset)
- `opal-ribbon.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/opal-ribbon.png (Template media asset)
- `refractive-halo.png` (image/png) — https://www.openlanding.page/templates/lumen/glass/refractive-halo.png (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Header** (`section-1`, mode: `native-whtml`): Minimal sticky bar with LUMEN tracking mark, anchor navigation (Workspace, Playbook Preview, How It Works, FAQ, Glass Studio), and primary CTA.
2. **Hero (The Glass AI Workspace)** (`section-2`, mode: `native-whtml`): Value proposition, email capture form with validation and cooldown protection, unboxed metadata badges, optical scene switcher, and interactive 2.5D perspective workspace stage with stepped demonstration.
3. **Trusted By** (`section-3`, mode: `native-whtml`): Clean monochrome marks of forward-thinking teams using structured workflows.
4. **The Problem** (`section-4`, mode: `native-whtml`): 4 tangible pain points (email triage, meeting synthesis, unstructured document processing, fragmentation) with interactive impact details.
5. **Benefits** (`section-5`, mode: `native-whtml`): 3 core pillars (Practical Frameworks, Real Worked Examples, Reusable Prompts) with interactive scenario drilldowns.
6. **Inside the Playbook** (`section-6`, mode: `native-whtml`): Interactive 3-card 2.5D document stack previewing sample pages with tabbed navigation and 16-page outline modal.
7. **How It Works** (`section-7`, mode: `native-whtml`): 3-step operational progression (Identify Tasks, Design Workflow with Human Review Gates, Run & Refine).
8. **Practical Credibility** (`section-8`, mode: `native-whtml`): Framework comparison table and methodology pillars highlighting reliability, security, and human-in-the-loop validation.
9. **FAQ** (`section-9`, mode: `native-whtml`): Accordion covering formats, prerequisites, privacy, team rollout, and updates.
10. **Final Download CTA** (`section-10`, mode: `native-whtml`): High-conversion conversion card with secondary email capture.
11. **Footer** (`section-11`, mode: `hybrid-embed`): Animate an image-derived 3D glass relief mesh made from the AI-generated artwork, layered over the continuous page atmosphere with drifting light particles and glassy water drops. Particles and drops react to pointer movement; tapping or clicking the artwork releases a brief droplet burst and ripple. The mesh has estimated depth, the original image texture, and scroll-responsive drift; show the transparent image for reduced motion or unavailable WebGL. Include a closing playbook link, section navigation, studio link, and oversized LUMEN wordmark.
   - *Custom-code island note:* Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **LUMEN Scoped Styles (Part 1/2)** (`lumen-styles-1`, placement: `head`, 44914 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **LUMEN Scoped Styles (Part 2/2)** (`lumen-styles-2`, placement: `head`, 6403 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **LUMEN Interactive Runtime Bridge** (`lumen-runtime-1`, placement: `footer`, 503 / 45000 chars): Loads three, gsap, motion, lenis in page footer custom code with prefers-reduced-motion guard.
