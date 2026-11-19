# Webflow MCP Import Prompt: KAIRO K (kairok)

Import the **KAIRO K** (Digital Experience & Technology) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/kairok
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/kairok-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/kairok.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "kairok" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "kairok", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/kairok-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`KAIRO K Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Black Carbon` | `--black-carbon` | `#121315` | `static_value` |
| `Color / Graphite` | `--graphite` | `#1d2024` | `static_value` |
| `Color / Titanium` | `--titanium` | `#7f858d` | `static_value` |
| `Color / Porcelain` | `--porcelain` | `#f2efe9` | `static_value` |
| `Color / Copper` | `--copper` | `#e68f63` | `static_value` |
| `Color / Copper Soft` | `--copper-soft` | `#b8785d` | `static_value` |
| `Color / Stone` | `--stone` | `#d2cec7` | `static_value` |
| `Color / Body Muted` | `--body-muted` | `#a8aaa9` | `static_value` |
| `Color / Panel Line` | `--panel-line` | `rgba(242, 239, 233, 0.15)` | `static_value` |
| `Color / Panel Line Dark` | `--panel-line-dark` | `rgba(18, 19, 21, 0.12)` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Display` | `--font-display` | `Bricolage Grotesque` | Fallback: `-apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Sans` | `--font-sans` | `Plus Jakarta Sans` | Fallback: `-apple-system, BlinkMacSystemFont, sans-serif` |
| `Font / Mono` | `--font-mono` | `IBM Plex Mono` | Fallback: `ui-monospace, SFMono-Regular, monospace` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `KAIRO K` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `kairok.webp` (image/webp) — https://www.openlanding.page/gallery/kairok.webp (Gallery preview capture)
- `kairo-01-hero-camera.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-01-hero-camera.webp (Template media asset)
- `kairo-02-camera-cutout-alpha.png` (image/png) — https://www.openlanding.page/templates/kairok/kairo-02-camera-cutout-alpha.png (Template media asset)
- `kairo-02-camera-cutout.png` (image/png) — https://www.openlanding.page/templates/kairok/kairo-02-camera-cutout.png (Template media asset)
- `kairo-03-lens-macro.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-03-lens-macro.webp (Template media asset)
- `kairo-04-city-environment.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-04-city-environment.webp (Template media asset)
- `kairo-05-sensor-detail.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-05-sensor-detail.webp (Template media asset)
- `kairo-06-exploded-camera.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-06-exploded-camera.webp (Template media asset)
- `kairo-07-camera-collection.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-07-camera-collection.webp (Template media asset)
- `kairo-08-sample-photo.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-08-sample-photo.webp (Template media asset)
- `kairo-09-lens-to-city-flythrough.mp4` (video/mp4) — https://www.openlanding.page/templates/kairok/kairo-09-lens-to-city-flythrough.mp4 (Template media asset)
- `kairo-video-first.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-video-first.webp (Template media asset)
- `kairo-video-last.webp` (image/webp) — https://www.openlanding.page/templates/kairok/kairo-video-last.webp (Template media asset)
- `media_1794110088749_d16f3834.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110088749_d16f3834.jpg (Template media asset)
- `media_1794110090486_c1b17abe.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110090486_c1b17abe.jpg (Template media asset)
- `media_1794110092730_d38f28bb.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110092730_d38f28bb.jpg (Template media asset)
- `media_1794110129203_34ef8152.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110129203_34ef8152.jpg (Template media asset)
- `media_1794110149178_4682f66c.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110149178_4682f66c.jpg (Template media asset)
- `media_1794110188961_058b0d0e.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110188961_058b0d0e.jpg (Template media asset)
- `media_1794110190985_69ac0a46.jpg` (image/jpeg) — https://www.openlanding.page/templates/kairok/media_1794110190985_69ac0a46.jpg (Template media asset)
- `media_1794110247512_3ce38ad0.webp` (image/webp) — https://www.openlanding.page/templates/kairok/media_1794110247512_3ce38ad0.webp (Template media asset)
- `media_1794110248103_d3e8ce50.webp` (image/webp) — https://www.openlanding.page/templates/kairok/media_1794110248103_d3e8ce50.webp (Template media asset)
- `media_1794110249023_1a0fd9cd.png` (image/png) — https://www.openlanding.page/templates/kairok/media_1794110249023_1a0fd9cd.png (Template media asset)
- `media_1794110249641_e4b39074.webp` (image/webp) — https://www.openlanding.page/templates/kairok/media_1794110249641_e4b39074.webp (Template media asset)
- `media_1794110341992_a6fcf9df.webp` (image/webp) — https://www.openlanding.page/templates/kairok/media_1794110341992_a6fcf9df.webp (Template media asset)
- `media_1794110343566_d96dcbb3.webp` (image/webp) — https://www.openlanding.page/templates/kairok/media_1794110343566_d96dcbb3.webp (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/kairok/preview-1600.webp (Template media asset)
- `r1-collection.png` (image/png) — https://www.openlanding.page/templates/kairok/r1-collection.png (Template media asset)
- `r1-field-notes.png` (image/png) — https://www.openlanding.page/templates/kairok/r1-field-notes.png (Template media asset)
- `r1-hero.png` (image/png) — https://www.openlanding.page/templates/kairok/r1-hero.png (Template media asset)
- `r1-optics.png` (image/png) — https://www.openlanding.page/templates/kairok/r1-optics.png (Template media asset)
- `r2-field-notes.png` (image/png) — https://www.openlanding.page/templates/kairok/r2-field-notes.png (Template media asset)
- `r2-hero.png` (image/png) — https://www.openlanding.page/templates/kairok/r2-hero.png (Template media asset)
- `r2-mobile-final.png` (image/png) — https://www.openlanding.page/templates/kairok/r2-mobile-final.png (Template media asset)
- `r2-mobile.png` (image/png) — https://www.openlanding.page/templates/kairok/r2-mobile.png (Template media asset)
- `r2-waitlist.png` (image/png) — https://www.openlanding.page/templates/kairok/r2-waitlist.png (Template media asset)
- `aperture.svg` (image/svg+xml) — https://www.openlanding.page/templates/kairok/icons/aperture.svg (Template media asset)
- `arrow-up-right.svg` (image/svg+xml) — https://www.openlanding.page/templates/kairok/icons/arrow-up-right.svg (Template media asset)
- `reticle.svg` (image/svg+xml) — https://www.openlanding.page/templates/kairok/icons/reticle.svg (Template media asset)
- `frame-001.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-001.webp (Template media asset)
- `frame-002.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-002.webp (Template media asset)
- `frame-003.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-003.webp (Template media asset)
- `frame-004.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-004.webp (Template media asset)
- `frame-005.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-005.webp (Template media asset)
- `frame-006.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-006.webp (Template media asset)
- `frame-007.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-007.webp (Template media asset)
- `frame-008.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-008.webp (Template media asset)
- `frame-009.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-009.webp (Template media asset)
- `frame-010.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-010.webp (Template media asset)
- `frame-011.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-011.webp (Template media asset)
- `frame-012.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-012.webp (Template media asset)
- `frame-013.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-013.webp (Template media asset)
- `frame-014.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-014.webp (Template media asset)
- `frame-015.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-015.webp (Template media asset)
- `frame-016.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-016.webp (Template media asset)
- `frame-017.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-017.webp (Template media asset)
- `frame-018.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-018.webp (Template media asset)
- `frame-019.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-019.webp (Template media asset)
- `frame-020.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-020.webp (Template media asset)
- `frame-021.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-021.webp (Template media asset)
- `frame-022.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-022.webp (Template media asset)
- `frame-023.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-023.webp (Template media asset)
- `frame-024.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-024.webp (Template media asset)
- `frame-025.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-025.webp (Template media asset)
- `frame-026.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-026.webp (Template media asset)
- `frame-027.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-027.webp (Template media asset)
- `frame-028.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-028.webp (Template media asset)
- `frame-029.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-029.webp (Template media asset)
- `frame-030.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-030.webp (Template media asset)
- `frame-031.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-031.webp (Template media asset)
- `frame-032.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-032.webp (Template media asset)
- `frame-033.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-033.webp (Template media asset)
- `frame-034.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-034.webp (Template media asset)
- `frame-035.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-035.webp (Template media asset)
- `frame-036.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-036.webp (Template media asset)
- `frame-037.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-037.webp (Template media asset)
- `frame-038.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-038.webp (Template media asset)
- `frame-039.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-039.webp (Template media asset)
- `frame-040.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-040.webp (Template media asset)
- `frame-041.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-041.webp (Template media asset)
- `frame-042.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-042.webp (Template media asset)
- `frame-043.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-043.webp (Template media asset)
- `frame-044.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-044.webp (Template media asset)
- `frame-045.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-045.webp (Template media asset)
- `frame-046.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-046.webp (Template media asset)
- `frame-047.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-047.webp (Template media asset)
- `frame-048.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-048.webp (Template media asset)
- `frame-049.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-049.webp (Template media asset)
- `frame-050.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-050.webp (Template media asset)
- `frame-051.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-051.webp (Template media asset)
- `frame-052.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-052.webp (Template media asset)
- `frame-053.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-053.webp (Template media asset)
- `frame-054.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-054.webp (Template media asset)
- `frame-055.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-055.webp (Template media asset)
- `frame-056.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-056.webp (Template media asset)
- `frame-057.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-057.webp (Template media asset)
- `frame-058.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-058.webp (Template media asset)
- `frame-059.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-059.webp (Template media asset)
- `frame-060.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-060.webp (Template media asset)
- `frame-061.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-061.webp (Template media asset)
- `frame-062.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-062.webp (Template media asset)
- `frame-063.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-063.webp (Template media asset)
- `frame-064.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-064.webp (Template media asset)
- `frame-065.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-065.webp (Template media asset)
- `frame-066.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-066.webp (Template media asset)
- `frame-067.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-067.webp (Template media asset)
- `frame-068.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-068.webp (Template media asset)
- `frame-069.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-069.webp (Template media asset)
- `frame-070.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-070.webp (Template media asset)
- `frame-071.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-071.webp (Template media asset)
- `frame-072.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-072.webp (Template media asset)
- `frame-073.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-073.webp (Template media asset)
- `frame-074.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-074.webp (Template media asset)
- `frame-075.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-075.webp (Template media asset)
- `frame-076.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-076.webp (Template media asset)
- `frame-077.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-077.webp (Template media asset)
- `frame-078.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-078.webp (Template media asset)
- `frame-079.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-079.webp (Template media asset)
- `frame-080.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-080.webp (Template media asset)
- `frame-081.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-081.webp (Template media asset)
- `frame-082.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-082.webp (Template media asset)
- `frame-083.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-083.webp (Template media asset)
- `frame-084.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-084.webp (Template media asset)
- `frame-085.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-085.webp (Template media asset)
- `frame-086.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-086.webp (Template media asset)
- `frame-087.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-087.webp (Template media asset)
- `frame-088.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-088.webp (Template media asset)
- `frame-089.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-089.webp (Template media asset)
- `frame-090.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-090.webp (Template media asset)
- `frame-091.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-091.webp (Template media asset)
- `frame-092.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-092.webp (Template media asset)
- `frame-093.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-093.webp (Template media asset)
- `frame-094.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-094.webp (Template media asset)
- `frame-095.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-095.webp (Template media asset)
- `frame-096.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-096.webp (Template media asset)
- `frame-097.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-097.webp (Template media asset)
- `frame-098.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-098.webp (Template media asset)
- `frame-099.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-099.webp (Template media asset)
- `frame-100.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-100.webp (Template media asset)
- `frame-101.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-101.webp (Template media asset)
- `frame-102.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-102.webp (Template media asset)
- `frame-103.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-103.webp (Template media asset)
- `frame-104.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-104.webp (Template media asset)
- `frame-105.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-105.webp (Template media asset)
- `frame-106.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-106.webp (Template media asset)
- `frame-107.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-107.webp (Template media asset)
- `frame-108.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-108.webp (Template media asset)
- `frame-109.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-109.webp (Template media asset)
- `frame-110.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-110.webp (Template media asset)
- `frame-111.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-111.webp (Template media asset)
- `frame-112.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-112.webp (Template media asset)
- `frame-113.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-113.webp (Template media asset)
- `frame-114.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-114.webp (Template media asset)
- `frame-115.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-115.webp (Template media asset)
- `frame-116.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-116.webp (Template media asset)
- `frame-117.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-117.webp (Template media asset)
- `frame-118.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-118.webp (Template media asset)
- `frame-119.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-119.webp (Template media asset)
- `frame-120.webp` (image/webp) — https://www.openlanding.page/templates/kairok/sequence/frame-120.webp (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `native-whtml`): See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **KAIRO K Scoped Styles** (`kairok-styles-1`, placement: `head`, 5412 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **KAIRO K Interactive Runtime Bridge** (`kairok-runtime-1`, placement: `footer`, 271 / 45000 chars): Loads motion in page footer custom code with prefers-reduced-motion guard.
