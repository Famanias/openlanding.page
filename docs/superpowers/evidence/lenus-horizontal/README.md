# LENUS continuous horizontal experience

Primary specification: [master prompt](../../plans/LENUS_HORIZONTAL_EXPERIENCE_MASTER_PROMPT.md). Implemented directly in the existing `/lenus` route, preserving the original hero copy, logo, fonts, palette, procedural optical assembly, material recipes and functional controls. The model factory and geometry/material files have no changes from the preceding parts-menu removal commit, `68f9be9`.

## Architecture and implementation sequence

- **Phase A:** inspected the route, current renderer/controller and material/rig ownership; captured the original hero and open optical engine before changes.
- **Phase B:** moved the existing canvas into a persistent scene layer outside the translated DOM track. `useHorizontalStory.ts` owns one measured GSAP pin/tween, chapter navigation/history and breakpoint recovery. Native vertical scrolling remains the input; no wheel interception or added smoothing library.
- **Phase C:** added absolute seven-chapter camera, framing, deployment, separation, component and lighting targets in `chapterPoseMap.ts`, applied by the existing controller/render loop. Held manual gestures take priority. Laboratory edits blend spatially into the next chapter; released gestures outside it blend back over approximately .7 seconds. Hero controls and clock are saved/restored on return.
- **Phase D:** completed kinetic Manifesto typography, a locally draggable three-study depth gallery, projected capability disclosures, real part/socket hotspots and laboratory controls, quieter Studio, reassembled Contact and a normal footer. Existing contact form validation/local brief download is reused in a native dialog. Studies are explicitly identified as concepts.
- **Phase E:** exercised production Chromium with native D3D11 WebGL, reverse scrubbing, held controls, gallery gestures, keyboard, dialogs, context recovery, breakpoint/preference changes, native mobile touch scrolling and fallback content. Refined clipping, text clearance, input hit testing and resize/menu handoffs.

## Ownership and guarantees

`LenusApp.tsx` owns page composition and low-frequency chapter state. `story/useHorizontalStory.ts` sends a single normalized sample to the DOM and engine. `scene/LenusSceneController.ts` owns camera/model/light application and the WebGL loop. `story/projectedAnchors.ts` maps the annotations to existing semantic nodes/sockets; actual camera projection drives both labels and connector endpoints. `WorkGallery.tsx` owns local gallery drag and selection; it does not capture page scrolling or model gestures.

The canvas survives every chapter, footer re-entry, resize and runtime reduced-motion change. Initial reduced motion never creates WebGL. Later reduced motion suspends the existing context. Context loss rebuilds GPU resources through the existing controller rather than introducing another viewer. The original transformation/separation/focus sliders, pause/play, reset, C interior toggle, keyboard orbit and mesh picking remain. No parts dropdown is present.

Below 1024px the same story uses native vertical flow with a smaller persistent live model and a controls drawer. Reduced motion and no-JavaScript retain semantic chapter content and the existing SVG preview. No model images, replacement assets or runtime dependencies were added.

## Native scene probe

[scene-probe.json](scene-probe.json) records 48 forward and 48 reverse samples through the initialized native renderer:

- Same renderer and model objects throughout; 42 semantic parts.
- 65 geometries, 14 shared materials and 186,992 model triangles.
- Maximum part world-matrix difference at matching forward/reverse positions: **0**.
- 109 PBR render calls including transmission; selected-part outline: **110**.
- Contact deployment: **0**, fully reassembled.

The renderer reports 297,392 rendered triangles including its transmission passes; the model geometry budget remains 186,992. These are geometry/draw measurements, not a frame-rate claim.

## Checks and reproduction

- `npm test -- --maxWorkers=2`: 244 files, **1,298 tests passed**.
- `npm run build`: production build passed.
- `npx tsc --noEmit`: passed.
- `npx eslint 'src/app/(lenus)' tests/e2e/lenus.spec.ts tests/e2e/lenus-horizontal.spec.ts`: passed.
- `npm run check`: isolation, palette and media passed.
- Production native Chromium browser suite: **27/27 tests passed** (1.7 minutes), including the original optical functionality and the new horizontal experience.
- Final tablet spacing adjustment: production rebuild and targeted resize/reduced-motion browser check passed; the updated 900px capture confirms the index clears the hero text.
- `npx tsx scripts/generate-copy-bundles.ts`: generated the complete updated LENUS copy bundle, including story modules/styles and excluding tests.

Run locally with `npm run dev -- --port 4323`, then open `/lenus`. For production, run `npm run build` and `npm start -- --port 4322`. Browser verification against that server:

```powershell
$env:LENUS_NATIVE_GPU='1'
$env:PLAYWRIGHT_PORT='4322'
node node_modules/@playwright/test/cli.js test tests/e2e/lenus.spec.ts tests/e2e/lenus-horizontal.spec.ts --workers=1
```

Omit `LENUS_NATIVE_GPU` for portable software-rendered CI. The native flag selects Chromium's Windows D3D11 path; it is not part of the website runtime.

## Acceptance checklist

- [x] Existing hero branding, real model, material recipes and functional controls preserved.
- [x] Same live engine and single canvas/renderer owner across all seven chapters.
- [x] Native wheel scrolling drives the measured pinned horizontal track.
- [x] Camera, deployment, separation, placement and lights share normalized progress.
- [x] Reversible chapter poses, continuous interpolation and no accumulated part-matrix drift.
- [x] STEP INSIDE, header links, chapter progress, history and refreshed chapter hashes work.
- [x] Gallery arrows/drag/dialog function independently of model/page gestures.
- [x] Expertise labels/lines project actual part/socket coordinates; keyboard disclosures work.
- [x] Laboratory sliders, real picking and hotspots retain manual input priority.
- [x] Held slider remains in control while scrolling; release recovers smoothly.
- [x] Contact fully reassembles; CTA validates and downloads an honestly labeled local brief.
- [x] Horizontal pin releases to a normal footer; footer navigation and return work.
- [x] Desktop, laptop, tablet and phone viewport layouts reviewed; no document overflow.
- [x] Native phone touch pan, responsive controls drawer and mobile menu navigation work.
- [x] Keyboard, Escape, focus trapping/restoration and initial/runtime reduced motion work.
- [x] Pause/resume, reset, transformation reversal and context-loss recovery work.
- [x] No-JavaScript and blocked-WebGL retain semantic content and the SVG preview.
- [x] Production build, types, lint, repository checks and browser console-error assertions pass.

The browser suite includes fast Work-to-Laboratory/reverse jumps, manual lab edits followed by scrolling away, gallery drag with the model present, and resize/preference changes within the pin. The direct native scene probe complements these interactions with exact matrix and draw-budget checks.

## Visual proof

The accompanying `viewport-report.json` records chapter positions, canvas counts, overflow and console errors at 1440x900, 1366x768, 1920x1080, 900x700, 390x844 and reduced-motion 1440x900. Captures are actual production-browser renders, stored as WebP for repository size.

- Before: [original hero](hero-before.webp), [original interior](engine-open-before.webp).
- Desktop: [Hero](1440-hero.webp), [mid-transition](1440-hero-manifesto-midpoint.webp), [Manifesto](1440-manifesto.webp), [Work](1440-work.webp), [Expertise](1440-expertise.webp), [Laboratory](1440-technology.webp), [active part inspection](1440-technology-inspection.webp), [Studio](1440-studio.webp), [Contact](1440-contact.webp), [native footer](1440-footer.webp).
- Responsive: [compact laptop](1366-hero.webp), [wide desktop](1920-hero.webp), [tablet](900-hero.webp), [phone](390-hero.webp), [phone laboratory](390-technology.webp), [reduced motion](1440-reduced.webp).

## Scope and limitations

Work contains three honest conceptual explorations because no commissioned case studies were supplied. Contact prepares a local downloadable brief and explicitly says it has not been sent; no backend/email service was invented. Mobile verification uses Chromium phone/touch emulation, not physical iOS/Android hardware. Browser-engine coverage is Chromium; Safari/Firefox and physical low-end GPU performance have not been measured. No cross-device FPS guarantee is claimed.
