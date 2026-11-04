# SAVEPOINT — Milestones 1–6 verification

All six milestones are complete. The production route is available at `http://localhost:3100/savepoint` in the existing `savepoint/milestones-1-4` worktree. Dependencies are installed locally in this checkout; the earlier dependency junction was replaced because Turbopack excludes packages outside its workspace root.

## Release checks

- `npm run check`: isolation, palette and media checks pass.
- `npx tsx scripts/generate-copy-bundles.ts`: complete source and prompt bundles generated, including the Three.js type dependency. The gallery prompt matches PROMPT.md after normalizing Windows line endings.
- Production `next build`: exit code 0, TypeScript passes, all 194 pages generated and `/savepoint` prerendered. The build used the installed Node CLI with a 4096 MB heap cap.
- `npm run test`: **232 files, 1,260 tests pass**. The existing Stillwater prompt assertion now normalizes CRLF before comparing the actual content.
- SAVEPOINT Playwright suite: **12 pass, 0 fail, 0 skipped**, against the production server. Coverage includes all ten cartridges, three physical boot/eject cycles, keyboard focus wrapping/restoration, drag/snap, early Escape, deep links, Back/Forward, WebGL recovery and fallback history, catalog filters and artwork, catalog-triggered physical insertion, inspection presets and wireframe, anchors and footer focus, responsive media, native touch taps, horizontal touch swiping, and all ten complete detail worlds.

The exact browser invocation on this Windows machine was:

```powershell
$env:PLAYWRIGHT_CHROMIUM_CHANNEL = 'msedge'
npx playwright test tests/e2e/savepoint.spec.ts --workers=1 --trace=off
```

The optional channel setting leaves the repository's default browser unchanged. Bundled Chromium trace capture stalled WebGL frames on this machine; installed Edge completed the suite. Raw CDP swipes run in their own touch context because this Edge build suppresses later synthesized compatibility clicks, reproduced on a minimal page without SAVEPOINT code. Native catalog taps and raw swipes both pass independently.

## Visual and content evidence

The final capture pass covers **1920×1080, 1366×768, 1024×768, 768×1024 and 390×844**, including the hero, hardware studio, manifesto, catalog and footer. It records **zero console/page errors, zero HTTP failures and zero horizontal overflow**. Desktop and phone captures were inspected directly. Additional captures show the physical slot guide and diagnostic wireframe. Reduced-motion captures show the settled compositions; normal-motion E2E checks verify every physical boot phase and scrolling interactions.

`public/templates/savepoint/verification/milestone-6/` contains viewport reports, screenshots, the content audit and check summary. The audit hashes all **26 approved originals** against the supplied source and validates all **ten unique, complete game records**, two world notes per game, bespoke archive telemetry and correctly paired label/world files. No game record or implementation file uses unfinished content.

The inspector uses the same DECK/01 factory as the hero, four actual camera presets, a downward slot guide and a real material wireframe toggle. It owns cloned polymer maps and its own renderer/environment, pauses offscreen via IntersectionObserver and renders on demand. The primary scene also skips archive rendering offscreen. The footer is a document landmark outside main, and background controls become inert during the cinematic dialog.

## Preserved Milestones 1–4 evidence

Both models completed all eight img2threejs passes. Console silhouette IoU is **0.867**; cartridge IoU is **0.9037**. Part coverage has zero errors or warnings. Closed prototypes pass self-intersection checks; both assembly APIs explode, restore and resolve part picks. The original model factories and approved assets remain unchanged.

Twenty-two insertion samples have zero lateral axis error and zero final dock error. A downward ray through the aperture hits internal contacts below the lip. Desktop/mobile framing checks found zero clipped cartridge frames across 846 samples. Original comparison sheets, orbit captures, geometry reports, assembly results and screen-projection calibration remain under `public/templates/savepoint/verification/`.

Hardware dimensions, hidden surfaces and molded grain remain procedural approximations. Self-intersection checks evaluate closed prototypes, exclude artwork planes and test each shared instanced prototype once. These are visual reconstructions, not manufacturing measurements.

The full repository build emits existing messages from other templates about font fallback metrics, metadataBase, unsupported OG-image z-index and a nonfatal decorative-glyph font download. Its exit code is 0; SAVEPOINT's production browser checks have no errors or hydration warnings.
