# 3D Standalone Exports Implementation Plan

> Execute the user-approved rollout in the existing isolated worktree using executing-plans. Supporting independent adapter, graphics-verification and media-audit work is delegated through the parallel-agent workflow. Do not commit or deploy.

**Goal:** Publish verified single-file offline HTML downloads for all 22 templates currently tagged 3D.

**Architecture:** Extend the existing component-based exporter with a shared embedded-asset registry and build-time adapters for JavaScript asset consumers. Keep original renderers, shaders, camera controls, state, motion and media. Add small Next-only adapters and graphics verification that distinguishes actual rendering from a fallback poster.

**Tech stack:** Existing TypeScript/esbuild/React SSR and hydration pipeline, Three.js/WebGL/WebGPU, native canvas/audio/video, Vitest and Playwright.

**Spec:** The approved approach in the preceding conversation: procedural pilots VECTOR/90 and TRACE, then VOLUME ZERO graphics fallbacks and LUMEN model loading, followed by all remaining category entries.

## Constraints

- Preserve source components and original behavior. No static screenshot substitutions for live scenes.
- Embed required textures, models, fonts and clips; no Next runtime, CDN or automatic HTTP asset requests.
- Preserve usable no-JavaScript, reduced-motion and unavailable-graphics alternatives.
- Reject escaping/missing asset paths and unsupported exports. Keep existing 39 downloads unchanged.
- Enable a new gallery download only after its actual public artifact has passed offline asset/interaction/graphics checks.
- Record rulings and evidence under `.openlanding-page/3d-exports/`.

## Tasks

1. [x] Add failing tests, then extend the asset registry and source-consumer adapters for texture/model loaders, Image/video src, fetch and in-world fonts.
2. [x] Integrate tested next/link, next/image and next/dynamic adapters without introducing Next's runtime into the export.
3. [x] Add 22 category slugs and explicit dynamic-media sets. Generate staged procedural, GPU and model pilots; prove actual rendering offline.
4. [x] Generate and verify the remaining 18 templates, including dynamic texture loading, media playback, fonts, controls, mobile/reduced/no-JS states and renderer fallback/recovery.
5. [x] Publish only verified files, enable the 22 gallery flags and copy bundles, and add registration/gallery tests.
6. [x] Run relevant offline/browser suites, full unit/type/lint/isolation/palette/media/build checks, visual comparisons and independent review. Document commands, evidence and practical limits.

## Completion evidence ? 2026-11-08

- All 22 staged exports passed native graphics/model/video verification (22/22) and offline/mobile/reduced/no-JavaScript verification (44/44), with no skipped or flaky cases. Published bytes match those artifacts.
- All 22 gallery flags and copy bundles are enabled. Gallery total: 61/78 downloads; 17 remain. Existing 39 HTML downloads are byte-for-byte unchanged.
- Full unit suite: 266 files, 1,453 tests passed. Production build, TypeScript, targeted ESLint and isolation/palette/media checks passed.
- Targeted source regressions: four responsive/fallback cases; Orrery's 18 deck/form/keyboard/no-JavaScript/graphics cases; Cullet's 13 interaction cases with the software-renderer budget. Independent exporter review found no remaining important product/security issues; its LOWTIDE Blob-gating test finding was reproduced and fixed.
- Gallery integration: all 42 exporter-supported downloads pass streaming SHA-256 comparison; six index and five gallery motion cases pass. Updated stale gallery count/category/preview expectations to current metadata and behavior.
- Added native browser streaming for large downloads and streaming SHA-256 verification to avoid loading full 90 MB documents into app/test strings.
- Practical limits: up to about 90 MB per media-heavy HTML file; Chromium software WebGL/Canvas verified, hardware-native WebGPU not certified. The broad legacy interaction sweep was stopped to isolate software-GPU timing failures and is not reported as passing.
- No commit or deployment performed.
