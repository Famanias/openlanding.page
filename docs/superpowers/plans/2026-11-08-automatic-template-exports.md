# Automatic Template Export Discovery

User-approved change: remove the separate export allowlist so newly registered templates can use the existing exporter immediately. Work inline in the existing feature worktree; no commit or deployment.

- [x] Add failing discovery tests using synthetic future registrations/routes, group selectors, invalid slugs, missing entries and escaping junctions.
- [x] Discover component entry files from the authoritative gallery registry; validate paths both in selection and the export entry point. Support page.tsx/ts/jsx/js. Derive --all/--3d/--remaining dynamically and add --list. Imported route-only HTML stays managed directly.
- [x] Keep publication separate from export capability in registration/download tests. Preserve known renderer-specific verification probes without using them to gate export support.
- [x] Exercise the real CLI with KAIRO K and TOURNE into staging, verify offline assets/interactions, and fix generic adapter gaps if found. Do not alter gallery flags or existing public artifacts.
- [x] Run focused/full unit, type/lint/build/project checks as appropriate; obtain a fresh independent review and update export documentation.

## Verification and decisions

- Discovery has no per-template export list. Registered component routes are discovered at selection time; direct exporter calls also validate registration, slug syntax and real source containment. Imported HTML-only routes are not regenerated.
- `--list` lists without writing. `--remaining` follows current gallery download flags; `--3d` follows gallery categories. Renderer-specific verification probes remain separate from eligibility.
- Tests reproduced/fixed page.js JSX loading, JavaScript layout metadata collection and KAIRO K's computed frame family. All 120 sequence frame bytes are checked against local source files. Synthetic future registrations exercise the real CLI across all four supported page extensions without any asset directory or exporter edits.
- Real KAIRO K and TOURNE exports generated in ignored staging; 14 offline interaction/mobile/reduced-motion/no-JavaScript checks pass. KAIRO K has 134 embedded assets, including all sequence frames. No gallery flags/public HTML/copy bundles changed.
- Full unit run: 278 files / 1,548 tests passed with one worker. The first concurrent run had one existing large copy-bundle test exceed its 15-second budget; isolated resource scheduling resolved it without altering the test or generator. Final focused export/discovery/assets run: 38 tests passed after the JavaScript-layout regression fix.
- TypeScript, targeted ESLint, isolation/palette/media checks and source whitespace checks pass. No Next page implementation changed, so validation used the existing fresh production build and actual exports rather than rebuilding unrelated pages.
- Independent review: JSX loader gap and metadata-filter test coverage corrected; follow-up found no important issues. Computed filename discovery deliberately requires a recognizable static media extension; arbitrary runtime/remote dependencies can still need adapters.
- PowerShell npm.ps1 consumed forwarded flags during verification; npm.cmd forwards them correctly. Documented that runner behavior and verified `npm.cmd run export:templates -- --list --remaining`.
- No commit or deployment.
