# Amaoto UI, navigation and responsive layout — execution

Workspace: `E:/orca/workspaces/webflow-projects/codex-session-1028-418`.

Implemented and verified: 55 unit tests, 42 browser tests, 50 captures, and static metrics at all six viewport sizes. The final desktop index colour correction also passes two focused browser checks.

## Changes

- **R-01:** `brand/Logo.tsx` separates the wordmark from the seal. Only the wordmark hides on phones; the home anchor keeps a 44px target.
- **U-01/U-02:** `scene/staging.ts` reserves inspector/index/navigation space, and `WagasaCanvas.tsx` clamps the measured index above journey navigation. Header, navigation and Making-strip CSS use shared reservations. Short landscape places the strip beneath the model, away from the Craft copy and tool entry.
- **R-02/R-03:** phone/tablet copy gets a coordinated model band and readable lower region. Short landscape uses two columns rather than collapsed stacked cards. Weather keeps a compact 2×2 swatch grid. Commission pairs Name and Email and tightens metadata/field spacing. Native overflow uses gold scrollbars; ultra-short landscape adds an explicit form-scroll cue. Cinematic copy explicitly resets the legacy tablet reading grid so its heading, paragraph and facts remain in order. In short landscape (`844×390`), Commission metadata and form fields are further compacted to reduce internal scroll distance by 61% (from 280px to 109px). On tablet portrait (`768×1024`), the Commission `<dl>` uses a 3-column row matching desktop.
- **N-01/N-02:** chapter jump buttons have title tooltips; Weather shows paired stop indicators and a second activation visits Touch the rain. Header, previous/next and tool controls have 44px targets. Mobile chapter jump buttons are expanded to 44×44px hit targets across all phones (`375×667`, `390×844`), achieving 0 small target warnings across all viewports. Header, journey and active-tool labels have an 11px floor. Desktop part labels keep ink text on their cream surface.
- **N-03/N-04:** active inspection makes journey navigation inert and dimmed, while the canvas, part index and sheet remain operable. Clicking empty scene background dismisses inspection. The sheet header says “02 / Structure” instead of repeating its material line. Static/reduced-motion/no-JavaScript reading has six native section links.
- **U-03 & Polish:** removed unused `ui/ThreadLine.tsx`, 46 obsolete CSS selectors and legacy pinned/Making/mobile-band styles. Fixed inline heading whitespace concatenation on mobile (`"Choose your canopy."`). Added compact desktop rules (`@media (min-width: 901px) and (max-height: 840px)`) to eliminate `.am-tool-sheet` overflow at `1024×768` (`sheetClipped` reduced from 73px to 0px). On tablet (`601px–900px`), `.am-sheet-parts` displays 6 part buttons in a single row across the card fold.

The existing six ranges, seven rests, fragments, model/rig, headline/domain data, fonts, palette, e2e hook and control labels are retained. Structure still opens into its default workbench, and Weather still uses the global light slider without an Explore light entry button.

## Validation

All commands run from the workspace above. Browser verification uses a temporary production server on port 3418, one worker and trace capture off. Browser temporary data lives at `E:/orca/tmp/amaoto-418`.

| Command | Result |
| --- | --- |
| `../node_modules/.bin/vitest.cmd run "src/app/(amaoto)/amaoto"` | 55 tests pass in 12 files |
| `../node_modules/.bin/tsc.cmd --noEmit` | Pass |
| `../node_modules/.bin/eslint.cmd "src/app/(amaoto)/amaoto" tests/e2e/amaoto*.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-isolation.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-palette.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-media.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/generate-copy-bundles.ts` | Generated |
| `node node_modules/next/dist/bin/next build` | Pass; 141 static pages |
| `node node_modules/playwright/cli.js test tests/e2e/amaoto.spec.ts tests/e2e/amaoto-anatomy.spec.ts tests/e2e/amaoto-making.spec.ts tests/e2e/amaoto-hero-framing.spec.ts --workers=1 --trace=off` | All 42 pass in one complete run |
| Same browser runner, `amaoto-anatomy.spec.ts --grep "by default" --workers=1 --trace=off` | 2/2 pass after the final index-colour correction |
| `node .openlanding-page/amaoto-ux-audit/capture.cjs` | 50 captures; all geometry criteria pass; six static modes checked |

The mobile-logo regression was first observed failing, then passed after the wordmark selector fix. The desktop overlay regression likewise failed before the reserved-space/clamp changes and passed afterwards. Focused compact-content, static-link/Weather-stop and background-dismissal checks passed before the complete suite.

## Capture evidence and measurement

The supplied capture script checks `375×667`, `390×844`, `844×390`, `768×1024`, `1024×768` and `1440×900`, with seven rests and engaged Anatomy, plus two static full-page views: 50 captures total. Static logo/link/overflow metrics are checked at all six sizes. Final artifacts live in `.openlanding-page/amaoto-ux-audit/shots/`; the report is also copied to `.openlanding-page/amaoto-ux-audit/report.json`. The original report is preserved as `report-before.json`.

The collision measurement excludes intentional header/logo parent-child containment and ignores inactive sections. Hidden legacy Structure copy is not a visible reading panel; its native-scrolling Anatomy sheet is measured separately. These adjustments prevent false collision/clipping reports without excluding the required independent overlay pairs.

The final check requires logo visibility and zero document horizontal overflow in cinematic and static modes, no independent overlay collisions, no clipping at rests 0 through .86, visible standard-screen form fields, and an operable native-scrolling form on the 844×390 ultra-short landscape viewport.

| Viewport | Home seal | Overlay collisions | Clipping before Commission | Horizontal overflow |
| --- | --- | ---: | ---: | ---: |
| 375×667 | Visible | 0 | 0px | 0px |
| 390×844 | Visible | 0 | 0px | 0px |
| 844×390 | Visible | 0 | 0px | 0px |
| 768×1024 | Visible | 0 | 0px | 0px |
| 1024×768 | Visible | 0 | 0px | 0px |
| 1440×900 | Visible | 0 | 0px | 0px |

Commission is unclipped at all standard portrait/tablet/desktop sizes. At 844×390 it has 109px of native panel scrolling (reduced from 280px) with a persistent “Scroll to complete the form” cue; the browser test fills every field and submits successfully there. At 1024×768, the Structure tool sheet has 0px clipping (`sheetClipped: 0`). Touch targets across all viewports have 0 small targets (<44px). All six static sizes retain the home seal, six section links and zero horizontal overflow.

Logs are `.openlanding-page/amaoto-ux-unit-final.log`, `amaoto-ux-types-final.log`, `amaoto-ux-lint-final.log`, `amaoto-ux-build.log`, `amaoto-ux-e2e-final.log`, and `amaoto-ux-colour-regression.log`. The full suite passed 42/42 in one run; the subsequent colour-only fix was checked with the two affected default-workbench cases and refreshed desktop captures. The capture summary is `.openlanding-page/amaoto-ux-audit/verification.json`.

The build retains existing gallery metadataBase, social-image z-index/symbol-font and font fallback-metric warnings; they are not reported as clean output. No Lighthouse or speed benchmark was run. No commit, push or deployment is part of this implementation request, and the temporary preview is stopped after verification.
