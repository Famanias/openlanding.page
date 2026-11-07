# Remaining Standalone Exports Implementation Plan

> Execute inline using executing-plans in the existing isolated worktree. One fresh exporter review at the end. No commit or deployment.

**Goal:** Create faithful offline single-file HTML downloads for the remaining 17 gallery templates and enable their gallery downloads.

**Architecture:** Reuse the approved SSR/hydration exporter and embedded asset registry. Generalize authored media discovery beyond the gallery 3D tag, preserving original renderers, audio synthesis, game logic, forms and navigation. Stage artifacts and verify before publication.

**Tech Stack:** TypeScript, esbuild, React, Three.js/native WebGL/Canvas, Web Audio, Vitest and Playwright.

**Spec:** User request to proceed with all remaining 17, continuing the previously approved single-file export approach. Slugs: aurel, ctrlroom, noiseclub, warpwander, assemblage, nightline, understudy, pipkin, valence, tally, hiyas, kinetic, satsuma, aubade, wowflutter, loophouse, keytu.

## Global Constraints

- Preserve the authored visual design and interactions; embed required local fonts, artwork and video. Procedural audio remains procedural.
- No CDN, Next runtime or automatic network asset requests. Maintain file URL query/hash navigation.
- Keep all existing 61 public HTML downloads byte-for-byte unchanged.
- Verify staged output before setting download flags and regenerating copy bundles. Do not commit or deploy.
- Keep export evidence and rulings under `.openlanding-page/remaining-exports/`.

## Review Focus

- Dynamically constructed video sources and canvas texture loads must resolve to embedded assets.
- Browser-only imports must initialize after hydration without mismatches.
- Forms, page turns, games and audio controls must retain actual behavior offline.
- Reduced motion, no JavaScript and mobile layouts must remain usable.
- Source changes needed for actual failures must also be verified against the original production page.

## Task 1: Complete export support

Files: `scripts/standalone/config.ts`, `scripts/standalone/export.ts`, new `scripts/standalone/collect-assets.ts` and tests as needed.
Interfaces: `collectAssets(slug, root, assets)` consumes original route files and AssetStore; `selectSlugs` exposes all 59 supported templates and `--remaining` for this rollout.

- [x] Inspect authored asset/media boundaries and existing browser suites.
- [x] Add a regression that proves constructed clip basenames are collected outside the 3D gallery category; run it failing.
- [x] Generalize collection without changing old assets or weakening containment; run exporter unit checks passing.
- [x] Stage all 17 HTML documents from a fresh production build.

## Task 2: Offline behavior and fallback verification

Files: `scripts/verify-exports.ts`, `scripts/standalone/verification-source.ts`, `tests/standalone/graphics.ts`, template-specific regressions only when needed.
Interfaces: existing `openStandalone`, native draw probe, and test-source adaptations preserve original behavior assertions while removing server-only transport assumptions.

- [x] Run the 34 shared offline/image/mobile/no-JavaScript checks.
- [x] Run existing template-specific interaction suites on real file URLs, including audio/game/page-turn controls and real visible GPU/Canvas draws.
- [x] Diagnose failures against the source page; use regression tests for functional fixes. Record transport-only adaptations separately.
- [x] Repeat only affected suites and final exact-artifact checks after fixes.

## Task 3: Publish verified artifacts

Files: `public/downloads/*.html`, gallery `data/templates.ts`, `scripts/generate-copy-bundles.ts`, `public/copy/*.md`.
Interfaces: `hasDownload` and `includeDownload` are enabled only for verified files.

- [x] Copy verified staged artifacts to public downloads and compare SHA-256 hashes.
- [x] Enable the 17 flags, regenerate copy bundles, and verify 78/78 coverage with all old 61 hashes unchanged.
- [x] Run native gallery downloads and compare streamed byte hashes for the new 17; run gallery regressions.

## Task 4: Final verification and review

Files: `docs/standalone-exports.md`, this plan and local ledger.

- [x] Run full unit tests, TypeScript, targeted ESLint, project guards and production build.
- [x] Obtain one fresh independent exporter review, fix important findings with regression evidence.
- [x] Record tested scope, commands, results and practical limitations; deliver without committing or deploying.

## Completion evidence

- Published 17 staged documents (170,597,313 bytes total), verified against staged SHA-256. All 78 gallery downloads enabled; previous 61 HTML hashes unchanged.
- Final browser coverage: 188 passing cases and one explicit server-redirect skip for the other 16 templates. ASSEMBLAGE's ten source interaction cases passed in isolated runs, plus its two offline/fallback and one native graphics check. Initial software-GPU failures and one intermittent workshop startup failure remain recorded; the exact workshop test passed independently and on the final root rerun without changing its assertions.
- Actual gallery downloads: 17/17 streamed SHA-256 matches; gallery index/motion: 11/11 passed.
- Full unit suite: 268 files, 1,475 tests passed. Initial unit run hit insufficient space on the system temporary volume; reran with TEMP/TMP under the workspace volume and all tests passed. TypeScript, targeted ESLint, isolation/palette/media guards, production build and scoped source whitespace checks passed.
- Independent review: font preload omission fixed with a failing-then-passing unit regression and real CTRL/ROOM CLS measurement (0.1875 -> 0). Follow-up review found no important remaining issues.
- Desktop previews for all 17 were captured and inspected. Browser verification uses Chromium; hardware-specific WebGPU/other engines/physical devices are not certified. Largest new export: HIYAS, 89.84 MB.
- No commit or deployment performed.
