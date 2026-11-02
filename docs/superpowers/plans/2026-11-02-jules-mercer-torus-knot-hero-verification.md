# Jules Mercer hero — native execution and verification

Completed 2026-11-02. The implementation is an isolated `/mercer` route with a procedural (2,3) knot, custom cyan/lime lattice and membrane shaders, a 1,200-point budget, blueprint layout, terminal HUD, measured FPS, bounded pointer parallax, and working project/about dialogs. The route has its own root layout, fonts, metadata and favicon.

## Execution adaptations

- Executed directly in the existing checkout using its Next.js, Three.js, Vitest and Playwright dependencies. No Superpowers execution workflow or worker delegation was used.
- Read the installed Next.js 16.4.3 routing, server/client component, CSS and font guides before implementation.
- Used the repository's existing `renderToStaticMarkup` component-test approach instead of installing Testing Library and a DOM emulator. Actual mounting, WebGL and interactions are tested in Chromium.
- Added the required route-group root layout, which the plan's file list omitted.
- Used derivative-based barycentric edges because native WebGL line width is not portable. Additive double-sided materials use one rendering pass.
- Kept the deliverable to the planned hero route. Gallery registration, downloadable template packaging and deployment were outside this plan.
- All seven implementation stages were tested red before green and committed individually. The final verification commit includes the browser suite and visual/lifecycle refinements.

## Checks

| Check | Result |
| --- | --- |
| `npx vitest run 'src/app/(mercer)'` | 7 files, 15 tests passed |
| `npm test` | 219 files, 1,202 tests passed |
| `npm run check` | Isolation, palette and media checks passed |
| `npx tsc --noEmit` | Passed |
| ESLint on `src/app/(mercer)` and `tests/e2e/mercer.spec.ts` | Passed |
| `npm run build` | Passed; `/mercer` prerendered successfully |
| `node node_modules/@playwright/test/cli.js test tests/e2e/mercer.spec.ts --workers=1` | 8 browser tests passed against the production build |
| `git diff --check` | Passed |

The installed Bun-generated `npx playwright` launcher failed test discovery for both existing and new specs. Invoking the installed Playwright CLI with Node discovered and ran the same tests correctly. No dependency or runner configuration changes were needed.

Build output retains warnings from existing templates about Big Shoulders, Google Sans Code and Google Sans Flex fallback metrics, plus existing metadata-base and image-renderer z-index warnings. These do not prevent the build.

## Browser evidence

The eight tests verify:

1. Successful shader compilation with no page/console errors, actual cyan/lime rendered pixels, measured FPS, and the DPR cap.
2. Pause/resume, a stable paused frame, pointer input and matching drawing-buffer aspect ratio after resize.
3. Native project/about dialogs, Escape dismissal, focus restoration and suspension of rendering behind a modal.
4. Real `WEBGL_lose_context` loss/restoration and a visible fallback while the context is lost.
5. No WebGL mounting under reduced motion; preference changes remove the canvas and release its actual WebGL context.
6. Mobile navigation and horizontal project previews without document overflow.
7. Graceful fallback when WebGL context creation is blocked.
8. Visible headline and procedural SVG when JavaScript is disabled.

Desktop (1440 × 900), laptop (900 × 700) and phone (390 × 844) viewports were visually inspected. Screenshots are retained locally in the ignored scratch directory:

- [Desktop](../../../.openlanding-page/mercer/shots/desktop-1440.png)
- [Laptop](../../../.openlanding-page/mercer/shots/laptop-900.png)
- [Phone](../../../.openlanding-page/mercer/shots/mobile-390.png)

The result is a procedural interpretation of the supplied reference pack, rather than an exact recovered mesh. No external 3D assets or raster stand-ins are used.

## Frame pacing

The available Chromium renderer is ANGLE/Vulkan **Google SwiftShader**, a software renderer. Before adaptation, 1440 × 900 sampling measured approximately 52–54 FPS. The final implementation reduces raster resolution only after two consecutive seconds below 55 FPS, with a bounded 75% minimum scale. It does not change geometry or camera fit and never fabricates a 60 FPS badge.

A final ten-second sample recorded `55, 52, 50, 58, 60, 60, 60, 60, 60, 55 FPS`. A separate five-second sample recorded `53, 57, 56, 60, 60 FPS`. The software renderer reaches the target for sustained intervals; a constant 60 FPS on a hardware GPU was not available to verify. Hardware, browser workload and viewport resolution remain performance variables.
