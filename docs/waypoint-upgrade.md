# Waypoint landing page upgrade

Implemented in the existing Next.js route at `/waypoint`. Local preview: http://localhost:3100/waypoint.

## What changed

- Retained the original sepia landscape, paper palette, headline, job-seeker positioning, and existing plan prices. Plus Jakarta Sans now carries both the interface and display typography, with JetBrains Mono for route numbers.
- Integrated the supplied ZIP artwork throughout the hero, a manually controlled four-view gallery, the four-stage editorial story, and the journal chapter. Marketing dashboards are images from the ZIP rather than reconstructed HTML. GSAP pins its flat illustration canvas on desktop screens at least 1024px wide and 720px high. Scroll reverses correctly; manual controls navigate to the corresponding chapter.
- Added a keyboard-controlled live tool selector and an all-tools view. Widget instances remain mounted so tab switches preserve manual choices.
- Added a paper-trail chapter with scroll-revealed words, a drawn timeline, the supplied journal image, and three manually selected sample opportunity notes outside the image.
- Preserved the working full pipeline with card progression and Reset in the live demo section, together with calendar note checkboxes, native kanban drag/drop, reply thread expansion, employer selection, and workspace dialogs. Preserved the existing calendar, inbound simulation, privacy toggle, pricing odometers, and FAQ.
- Replaced unsupported hero social proof with product-oriented copy. Sign-in, plan selection, and footer information links now reach dialogs instead of unresolved anchors. Native modal dialogs provide keyboard focus containment and Escape dismissal.
- Early access and workspace forms validate locally and explain that no account, email, subscription, or encryption service is connected. The original examples remain demonstrations, not production integrations.
- Added the motion and icon dependencies to the gallery's copy-bundle metadata and regenerated the Waypoint source bundle.

## Asset audit and use

All ten images were extracted directly from `D:\downloads\New folder (16)\waypoint\waypoint-images.zip`. Their original artwork and baked-in labels are preserved. The revised page uses the images instead of reconstructed marketing dashboards. The live tools remain separate and playable.

Every source is 2752 ? 1536 and opaque, including the PNG. Artwork stays flat and fully visible, without perspective, fabricated transparency, relabeling, or replacement UI. Brief captions identify concept artwork where sample hiring-side labels differ from the working job-search demos.

| Supplied asset | Placement |
| --- | --- |
| 01 ? Hero dashboard | Flagship image beneath the landscape hero. |
| 02 ? Pipeline board | Navigate stage in the scroll story. |
| 03 ? Candidate profile | ?The details, together? gallery view. |
| 04 ? Outreach workspace | Connect stage in the scroll story. |
| 05 ? Insights dashboard | Prepare stage in the scroll story. |
| 06 ? UI fragments | ?Small things, considered? gallery view and fourth story stage, on the original opaque background. |
| 07 ? Mobile screens | ?A change of scenery? gallery view. |
| 08 ? Topographic background | Ambient surface in the final invitation. |
| 09 ? Feature collage | Initial ?The bigger picture? gallery view. |
| 10 ? Journal workspace | Paper-trail chapter, with interactive opportunity notes beneath the image. |

Each image has traceable `-800.webp` and `-1600.webp` derivatives under `/templates/waypoint/`, retaining its `waypoint-01` through `waypoint-10` source name. Both size sets together total **1,388,582 bytes**, compared with the 23 MB original ZIP. Responsive `srcset`, lazy loading, explicit image dimensions, descriptive alt text, and hero loading priority are implemented. The original sepia landscape is preserved. No new imagery was generated.

## Verification

Completed on 2026-11-06 in local Chromium:

- **19 Playwright tests passed**, covering the original interactive widgets, supplied hero artwork, gallery selection and arrows, pipeline progression/reset, checklist persistence, pricing in both directions, FAQ, forms, dialogs, mobile navigation, persistent tab state, narrative selection, opportunity notes, and employer selection.
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
- Current ZIP revision: `zip-hero-desktop.png`, `zip-panorama-desktop.png`, `zip-paper-desktop.png`, `zip-mobile.png`, `zip-story-desktop.png`, `zip-full-desktop.png`

The current ZIP contact sheet is `artifacts/waypoint/zip-contact-sheet.png`. Full-page screenshots of the animated page show its state at capture time; use the chapter captures or the running page to assess pinned transitions.

## Practical limits

The downloadable `/downloads/waypoint.html` now uses the same current React components as the site. All supplied artwork, the original landscape, fonts, CSS, React runtime, and GSAP behavior are embedded in one approximately 7 MB HTML file. It opens directly from disk and needs no server, CDN, or network connection. The Waypoint copy bundle includes the updated download.

Rebuild it after changing the page:

```sh
npm run build
npm run export:waypoint
```

The exporter refuses a stale production build, preserves the current component behavior, and bundles only local assets. Test the file directly with networking disabled:

```sh
node node_modules/@playwright/test/cli.js test --config playwright.waypoint-standalone.config.ts --workers=2
```

All 19 browser tests passed against the local `file://` download with the browser offline. An additional runtime sweep found zero external network requests, script exceptions, or broken images. Desktop and mobile screenshots are saved as `download-desktop.png` and `download-mobile.png` in the QA screenshot directory.

This remains a frontend product demonstration. Forms have no backend, sample replies are simulated, the privacy switch changes presentation only, and sign-in does not authenticate. No production deployment was requested or performed. Browser testing used Chromium; other browser engines and physical touch devices were not tested.
