# Waypoint landing page upgrade

Implemented in the existing Next.js route at `/waypoint`. Local preview: http://localhost:3100/waypoint.

## What changed

- Retained the original sepia landscape, paper palette, headline, job-seeker positioning, and existing plan prices. Plus Jakarta Sans now carries both the interface and display typography, with JetBrains Mono for route numbers.
- Added a full-width product panorama built from accessible HTML, followed by a four-stage editorial story. GSAP pins its flat illustration canvas on desktop screens at least 1024px wide and 720px high. Scroll reverses correctly; manual controls navigate to the corresponding chapter.
- Added a keyboard-controlled live tool selector and an all-tools view. Widget instances remain mounted so tab switches preserve manual choices.
- Added a paper-trail chapter with scroll-revealed words, a drawn timeline, stacked paper, and three manually selected sample opportunity notes.
- Restored working hero card progression and Reset, calendar note checkboxes, native kanban drag/drop, reply thread expansion, employer selection, and workspace dialogs. Preserved the existing calendar, inbound simulation, privacy toggle, pricing odometers, and FAQ.
- Replaced unsupported hero social proof with product-oriented copy. Sign-in, plan selection, and footer information links now reach dialogs instead of unresolved anchors. Native modal dialogs provide keyboard focus containment and Escape dismissal.
- Early access and workspace forms validate locally and explain that no account, email, subscription, or encryption service is connected. The original examples remain demonstrations, not production integrations.
- Added the motion and icon dependencies to the gallery's copy-bundle metadata and regenerated the Waypoint source bundle.

## Asset audit and use

Every supplied image was inspected. All are 2752 × 1536 and opaque, including the PNG. No generated image was treated as a transparent cutout. No new images were generated and no existing image was edited.

| Supplied asset | Decision |
| --- | --- |
| 01 — Hero dashboard | Omitted: general hiring pipeline and candidate management. Replaced with genuine job-seeker HTML. |
| 02 — Pipeline board | Omitted: Add Candidate and employer hiring stages. Existing interactive board retained. |
| 03 — Candidate profile | Omitted: recruiter evaluation workflow. |
| 04 — Outreach workspace | Omitted: outreach to candidates, portfolio review, and unsupported engagement metrics. |
| 05 — Insights dashboard | Omitted: hiring analytics and unsourced candidate totals. |
| 06 — UI fragments | Omitted: opaque artboard with employer tasks, candidate cards, and Add Candidate control. |
| 07 — Mobile screens | Omitted: employer candidate detail and hiring workflow. |
| 08 — Topographic background | Used as an ambient surface for the panorama, story canvas, and final invitation. |
| 09 — Feature collage | Omitted: candidate assessment and time-to-hire claims. |
| 10 — Journal workspace | Omitted: hiring-manager candidate evaluation. Replaced with a personal opportunity journal. |

The original `/templates/waypoint/hero-bg-1920.webp` remains the hero artwork and supplies the small inline landscape detail. New optimized assets:

| Public path | Role | Dimensions | Bytes |
| --- | --- | --- | --- |
| `/templates/waypoint/topographic-800.webp` | Small story-canvas backdrop | 800 × 447 | 16,800 |
| `/templates/waypoint/topographic-1600.webp` | Wide editorial surfaces | 1600 × 893 | 58,422 |

Both are decorative CSS backgrounds. Product copy and controls are HTML. The additional raster payload is approximately 75 KB, rather than the 23 MB source pack.

## Verification

Completed on 2026-11-06 in local Chromium:

- **18 Playwright tests passed**, covering the original interactive widgets, hero progression/reset, checklist persistence, pricing in both directions, FAQ, forms, dialogs, mobile navigation, persistent tab state, narrative selection, opportunity notes, and employer selection.
- **12 existing logic tests passed** across pipeline, pricing, and parallax math.
- **TypeScript passed** and **ESLint reported no errors**. Four pre-existing unused-type-import warnings remain in the unchanged logic test files.
- **Production build passed** with all 200 pages generated, including `/waypoint`. The repository-wide build still prints font fallback, social metadata, and image-renderer warnings from existing routes.
- **Repository checks passed:** isolation, palette, and media.
- Runtime sweep found **no page exceptions, HTTP failures, broken image elements, duplicate IDs, or unresolved local anchors**.
- Scrolling the story forward through all four stages and back produced `01 → 02 → 03 → 04 → 03 → 02 → 01` in the visible canvas indicator.
- Layout checks passed at 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×667, and 320×568. No horizontal body overflow; the hero stays on two lines.
- Mobile and short screens show each illustration alongside its narrative. Reduced motion removes pinning and scrubbing and keeps all four illustrations and live controls available.

Commands:

```sh
node node_modules/@playwright/test/cli.js test tests/e2e/waypoint.spec.ts --workers=2
npx vitest run "src/app/(waypoint)/waypoint/lib"
npx tsc --noEmit
npx eslint "src/app/(waypoint)/**/*.{ts,tsx}"
npm run check
npm run build
```

The explicit local Playwright CLI avoids an `npx` runner-resolution mismatch in this Windows environment.

## Visual QA artifacts

Screenshots were captured and visually inspected. They are local working artifacts under `artifacts/waypoint/screenshots/`:

- `before-desktop.png`, `before-mobile.png`
- `after-desktop.png`, `after-mobile.png` (full-page layout captures)
- `hero-desktop.png`, `panorama-desktop.png`, `story-replies-desktop.png`, `paper-trail-desktop.png`
- `hero-mobile.png`, `lab-mobile.png`, `hero-320.png`

The ten-image contact sheet is `artifacts/waypoint/waypoint-asset-audit.png`. Full-page screenshots of the animated page show its state at capture time; use the chapter captures or the running page to assess pinned transitions.

## Practical limits

This remains a frontend product demonstration. Forms have no backend, sample replies are simulated, the privacy switch changes presentation only, and sign-in does not authenticate. No production deployment was requested or performed. Browser testing used Chromium; other browser engines and physical touch devices were not tested.
