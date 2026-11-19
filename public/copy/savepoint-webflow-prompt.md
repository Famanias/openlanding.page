# Webflow MCP Import Prompt: SAVEPOINT. (savepoint)

Import the **SAVEPOINT.** (Independent Games) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** https://www.openlanding.page/templates/savepoint
- **Structured Webflow Manifest (JSON):** https://www.openlanding.page/copy/savepoint-webflow.json
- **Standalone HTML Export (DOM & CSS source of truth):** https://www.openlanding.page/downloads/savepoint.html

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the `openlanding` MCP server is connected in your environment:**
   - Call `get_webflow_manifest({ slug: "savepoint" })` to load the structured token, asset, and section manifest.
   - As you build each section below, call `get_webflow_section({ slug: "savepoint", sectionId: "section-1" })` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official `webflow` MCP server is connected:**
   - Fetch `https://www.openlanding.page/copy/savepoint-webflow.json` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call `webflow_guide_tool` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (`data_variable_tool`)

Create or select a Variable Collection named **`SAVEPOINT. Tokens`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (`create_color_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Color / Bg` | `--bg` | `#121419` | `static_value` |
| `Color / Bg Deep` | `--bg-deep` | `#0B0D12` | `static_value` |
| `Color / Surface` | `--surface` | `#1B1F28` | `static_value` |
| `Color / Surface Elevated` | `--surface-elevated` | `#252934` | `static_value` |
| `Color / Text` | `--text` | `#F2F0E8` | `static_value` |
| `Color / Text Muted` | `--text-muted` | `#A9ADB7` | `static_value` |
| `Color / Border` | `--border` | `rgba(242,240,232,.15)` | `static_value` |
| `Color / Accent` | `--accent` | `#CDF266` | `static_value` |
| `Color / Violet` | `--violet` | `#7971B7` | `static_value` |
| `Color / Coral` | `--coral` | `#F47D62` | `static_value` |

### Font Family Variables (`create_font_family_variable`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
| `Font / Space Grotesk` | `--font-space-grotesk` | `Space Grotesk` | Google Font: `Space Grotesk` |
| `Font / IBM Plex Mono` | `--font-ibm-plex-mono` | `IBM Plex Mono` | Google Font: `IBM Plex Mono` |
| `Font / Plus Jakarta Sans` | `--font-plus-jakarta-sans` | `Plus Jakarta Sans` | Google Font: `Plus Jakarta Sans` |

### Size Variables (`create_size_variable`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |

---

## 2. Fonts & Site Assets (`data_fonts_tool` & `data_assets_tool`)

1. **Fonts:** Load the Google Fonts listed above in the page/site `<head>` (or upload custom `.woff2` files via `data_fonts_tool` > `create_font`) and bind the font family variables to your base `Body`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named `SAVEPOINT.` with `data_assets_tool` > `create_asset_folder`, upload the template's media assets via `create_asset`, and attach them to native Webflow `Image` elements so the user can double-click any image on the canvas to swap it:
- `savepoint.webp` (image/webp) — https://www.openlanding.page/gallery/savepoint.webp (Gallery preview capture)
- `cartridge-shell-front.png` (image/png) — https://www.openlanding.page/templates/savepoint/cartridge-shell-front.png (Template media asset)
- `cartridge-shell-rear.png` (image/png) — https://www.openlanding.page/templates/savepoint/cartridge-shell-rear.png (Template media asset)
- `cartridge-shell-three-quarter.png` (image/png) — https://www.openlanding.page/templates/savepoint/cartridge-shell-three-quarter.png (Template media asset)
- `deck-01-front.png` (image/png) — https://www.openlanding.page/templates/savepoint/deck-01-front.png (Template media asset)
- `deck-01-slot-detail.png` (image/png) — https://www.openlanding.page/templates/savepoint/deck-01-slot-detail.png (Template media asset)
- `deck-01-three-quarter.png` (image/png) — https://www.openlanding.page/templates/savepoint/deck-01-three-quarter.png (Template media asset)
- `footer-deck-wide.jpg` (image/jpeg) — https://www.openlanding.page/templates/savepoint/footer-deck-wide.jpg (Template media asset)
- `footer-deck-wide.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/footer-deck-wide.webp (Template media asset)
- `icon.svg` (image/svg+xml) — https://www.openlanding.page/templates/savepoint/icon.svg (Template media asset)
- `label-dead-channel.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-dead-channel.png (Template media asset)
- `label-deep-current.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-deep-current.png (Template media asset)
- `label-ghost-frequency.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-ghost-frequency.png (Template media asset)
- `label-lost-signal.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-lost-signal.png (Template media asset)
- `label-moon-relay.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-moon-relay.png (Template media asset)
- `label-mossheart.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-mossheart.png (Template media asset)
- `label-neon-ruins.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-neon-ruins.png (Template media asset)
- `label-paper-kingdom.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-paper-kingdom.png (Template media asset)
- `label-sunken-arcade.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-sunken-arcade.png (Template media asset)
- `label-turbo-saints.png` (image/png) — https://www.openlanding.page/templates/savepoint/label-turbo-saints.png (Template media asset)
- `preview-1600.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/preview-1600.webp (Template media asset)
- `world-dead-channel.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-dead-channel.webp (Template media asset)
- `world-deep-current.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-deep-current.webp (Template media asset)
- `world-ghost-frequency.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-ghost-frequency.webp (Template media asset)
- `world-lost-signal.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-lost-signal.webp (Template media asset)
- `world-moon-relay.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-moon-relay.webp (Template media asset)
- `world-mossheart.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-mossheart.webp (Template media asset)
- `world-neon-ruins.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-neon-ruins.webp (Template media asset)
- `world-paper-kingdom.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-paper-kingdom.webp (Template media asset)
- `world-sunken-arcade.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-sunken-arcade.webp (Template media asset)
- `world-turbo-saints.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/world-turbo-saints.webp (Template media asset)
- `final-archive-1366.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-archive-1366.png (Template media asset)
- `final-archive-1920.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-archive-1920.png (Template media asset)
- `final-archive-mobile.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-archive-mobile.png (Template media asset)
- `final-mobile-aligning.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-mobile-aligning.png (Template media asset)
- `final-mobile-booting.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-mobile-booting.png (Template media asset)
- `final-mobile-game-detail.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-mobile-game-detail.png (Template media asset)
- `final-mobile-screen-expanding.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/final-mobile-screen-expanding.png (Template media asset)
- `glass.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/glass.png (Template media asset)
- `polymer.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/polymer.png (Template media asset)
- `glass_albedo.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/glass/glass_albedo.png (Template media asset)
- `glass_ao.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/glass/glass_ao.png (Template media asset)
- `glass_height.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/glass/glass_height.png (Template media asset)
- `glass_normal.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/glass/glass_normal.png (Template media asset)
- `glass_roughness.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/glass/glass_roughness.png (Template media asset)
- `base_albedo.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/polymer/base_albedo.png (Template media asset)
- `base_ao.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/polymer/base_ao.png (Template media asset)
- `base_height.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/polymer/base_height.png (Template media asset)
- `base_normal.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/polymer/base_normal.png (Template media asset)
- `base_roughness.png` (image/png) — https://www.openlanding.page/templates/savepoint/pbr/polymer/base_roughness.png (Template media asset)
- `hardware-slot-guide.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hardware-slot-guide.webp (Template media asset)
- `hardware-wireframe.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hardware-wireframe.webp (Template media asset)
- `hero-1024.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hero-1024.webp (Template media asset)
- `hero-1366.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hero-1366.webp (Template media asset)
- `hero-1920.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hero-1920.webp (Template media asset)
- `hero-390.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hero-390.webp (Template media asset)
- `hero-768.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/hero-768.webp (Template media asset)
- `index-1024.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/index-1024.webp (Template media asset)
- `index-1366.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/index-1366.webp (Template media asset)
- `index-1920.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/index-1920.webp (Template media asset)
- `index-390.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/index-390.webp (Template media asset)
- `index-768.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/index-768.webp (Template media asset)
- `manifest-1024.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/manifest-1024.webp (Template media asset)
- `manifest-1366.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/manifest-1366.webp (Template media asset)
- `manifest-1920.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/manifest-1920.webp (Template media asset)
- `manifest-390.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/manifest-390.webp (Template media asset)
- `manifest-768.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/manifest-768.webp (Template media asset)
- `site-footer-1024.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/site-footer-1024.webp (Template media asset)
- `site-footer-1366.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/site-footer-1366.webp (Template media asset)
- `site-footer-1920.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/site-footer-1920.webp (Template media asset)
- `site-footer-390.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/site-footer-390.webp (Template media asset)
- `site-footer-768.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/site-footer-768.webp (Template media asset)
- `the-deck-1024.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/the-deck-1024.webp (Template media asset)
- `the-deck-1366.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/the-deck-1366.webp (Template media asset)
- `the-deck-1920.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/the-deck-1920.webp (Template media asset)
- `the-deck-390.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/the-deck-390.webp (Template media asset)
- `the-deck-768.webp` (image/webp) — https://www.openlanding.page/templates/savepoint/verification/milestone-6/the-deck-768.webp (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/blockout/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/form-refinement/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/interaction-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/lighting-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/material-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/optimization-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/structural-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/cartridge/surface-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/blockout/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/form-refinement/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/interaction-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/lighting-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/material-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/optimization-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/structural-pass/small-35.png (Template media asset)
- `0.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/0.png (Template media asset)
- `180.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/180.png (Template media asset)
- `270.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/270.png (Template media asset)
- `35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/35.png (Template media asset)
- `90.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/90.png (Template media asset)
- `comparison.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/comparison.png (Template media asset)
- `small-35.png` (image/png) — https://www.openlanding.page/templates/savepoint/verification/deck/surface-pass/small-35.png (Template media asset)

---

## 3. Section-by-Section Build Plan (`data_whtml_builder`, `data_element_builder`, `data_style_tool`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via `data_style_tool` (including `main`, `medium`, `small`, and `tiny` breakpoints plus `hover` and `focus-visible` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped `HtmlEmbed` islands (`hybrid-embed`).

1. **Main Landing Page** (`section-1`, mode: `hybrid-embed`): Build a complete, isolated fictional game archive at `/savepoint` in Next.js App Router, React, TypeScript and Tailwind v4. Use imperative Three.js, GSAP with ScrollTrigger and Zustand. Read the installed Next.js documentation before using 
   - *Custom-code island note:* Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.

---

## 4. Native Webflow IX3 Interactions (`data_interactions_tool`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with `data_interactions_tool` > `create_interaction`.
- Always animate opacity under `wf:transform` (e.g. `{"wf:transform": {"opacity": ["0%", "100%"]}}`), never `wf:style`.
- Include `conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (`data_scripts_tool` & `HtmlEmbed`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at 45000 chars in the manifest). Apply head styles and footer runtime bridges via `data_scripts_tool` > `set_page_freeform_code`:

- **SAVEPOINT. Scoped Styles** (`savepoint-styles-1`, placement: `head`, 19827 / 45000 chars): Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.
- **SAVEPOINT. Interactive Runtime Bridge** (`savepoint-runtime-1`, placement: `footer`, 419 / 45000 chars): Loads three, gsap in page footer custom code with prefers-reduced-motion guard.
