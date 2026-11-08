# Standalone HTML Exports Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task by task. The user approved the shared-exporter approach in this conversation. Work in the existing isolated feature worktree; do not commit or deploy.

**Goal:** Generate and verify faithful offline HTML downloads for the 20 straightforward templates, then enable their gallery downloads.

**Architecture:** Render the existing page components and bundle their browser runtime with esbuild. A shared JSX adapter embeds DOM asset references and makes same-template navigation file-compatible. Production HTML supplies the compiled CSS, font variables, document attributes, authored initialization scripts, and no-JavaScript fallbacks. Template configuration selects the supported pages; source components remain unchanged.

**Tech stack:** TypeScript, esbuild, React SSR/hydration, Next production CSS, Playwright, Vitest.

**Spec:** The approved approach in this conversation and `.openlanding-page/standalone-export-review/assessment.md`.

## Constraints and review focus

- All 20 outputs open via file:// with networking disabled and preserve current UI, motion, local form behavior, and intentional media placeholders.
- Do not include Next runtime scripts, CDN dependencies, base URLs, or unresolved site-origin assets.
- Preserve layout initialization scripts, fonts, provider composition and no-JavaScript styles.
- Reject missing assets, stale production CSS, unapproved slugs and paths escaping public/.next, including symlinks.
- Cover runtime-selected images, srcset, SVG images, CSS URLs, and current-file navigation.
- Keep existing downloads unchanged. Enable each new gallery flag only after offline verification.

## Tasks

1. **Shared asset and document processing**
   - [x] Add failing tests for path containment, missing assets, CSS font/background embedding, document metadata/fallback extraction, srcset and navigation adaptation.
   - [x] Implement focused modules in `scripts/standalone/`; run the tests to green.
2. **Exporter and pilots**
   - [x] Add configuration for 20 supported slugs and `scripts/export-templates.ts` with a package command.
   - [x] Reuse original page exports, production CSS and layout shell, and a shared JSX runtime adapter for both SSR and browser builds.
   - [x] Generate AFTERCART, Pello and CHINAGRAPH in a staging directory. Verify offline assets, hydration, representative interactions and screenshot parity before publishing.
3. **Remaining templates**
   - [x] Generate the remaining 17 with the same pipeline, preserving providers and layout fallbacks.
   - [x] Add reusable offline browser coverage plus template-specific control/form checks for every output; verify mobile and reduced/no-JavaScript states.
4. **Gallery and handoff**
   - [x] Publish verified outputs to public/downloads, enable the 20 flags, include their HTML in copy bundles, and document regeneration.
   - [x] Final production build, public-file offline run and all gallery download-button tests passed. Unit, type, lint and isolation/palette/media checks passed; evidence recorded below.

Progress and QA artifacts are recorded under `.openlanding-page/standalone-exports/`.

## Final verification

- 20 generated public HTML files match the verified staged files; 39 of 78 gallery templates now have downloads enabled.
- 1,406 unit tests passed; 171 offline browser checks passed with zero skipped or flaky tests.
- All 20 gallery buttons downloaded the expected HTML contents.
- Production build, TypeScript, scoped ESLint, isolation, palette, media and diff checks passed.
- 40 desktop/phone screenshot pairs compared; maximum mean color difference 0.58%, principally image encoding differences.
- Independent implementation review and follow-up review reported no important findings.
- Browser verification used Chromium. No commit or deployment was performed.
