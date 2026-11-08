# Template URL namespace verification

Implemented on `feat-template-directory`, based on `bb820ac`, on 2026-11-08.
No deployment, push, or merge was performed.

## Result

Templates open directly at `/templates/<slug>`. Old `/<slug>` URLs and legacy
rename aliases permanently redirect to the final URL. Source folders, canonical
media URLs, download filenames, and standalone discovery remain in place.
Gallery links, preview capture, importer output, archive/restore test paths,
LUMEN studio history, and Pello planner/signup history use the new namespace.
LUMEN and Pello HTML downloads and copy bundles were regenerated.

## Verified checks

| Check | Result |
| --- | --- |
| Routing unit tests | 7 passed; missing-module failure observed before implementation. |
| Routing production HTTP/browser suite | 96 passed, including every active template, one-hop aliases, queries/fragments, static media precedence, metadata endpoints, unknown-path 404s, and imported HTML byte equality. |
| Gallery/importer/archive unit tests | 28 passed after observing old-path failures. |
| Gallery shell unit tests | 5 passed after correcting an additional old-link expectation found by the full suite. |
| Production gallery/imported HTML/download suites | 121 passed, including all published standalone download checks. |
| Standalone URL adapter unit tests | 19 passed after observing new-namespace failures. |
| Pello model unit tests | 4 passed; old signup URL failure observed first. |
| Live LUMEN/Pello URL-state regressions | Both passed after both reproduced their old-path history bug. Covers interaction, reload, signup, and LUMEN Back/Forward. |
| Regenerated offline LUMEN/Pello exports | 25 passed, including original interactions, graphics, media, phone layouts, and no-JavaScript content. |
| Turbopack production build | Passed. |
| `tsc --noEmit` | Passed. |
| Changed-file ESLint | Passed. |
| Isolation, palette, and media checks | All passed. |

## Repository-wide limitations

### Unit suite

Final quiet run: `bun run test -- --maxWorkers=2 --testTimeout=30000`:
**1,557 passed, 2 failed**, across 279 files.

Both failures were present before implementation in
`scripts/standalone/registration.test.ts`:

- Tourne: its existing copy bundle omits the HTML download required by its registration.
- Kairok: its existing copy metadata does not enable including the published HTML download.

Concurrent browser/unit workloads initially also timed out importer and copy
generation tests. An isolated rerun passed all six tests; the final full run
with reduced worker count and a 30-second default deadline had only the two
baseline failures. The copy-generation test retained its own explicit deadline.
No assertions were disabled or relaxed.

### Broader browser suite

The final combined production run (routing, URL state, existing LUMEN/Pello
interactions, shared mobile overflow, shared reduced motion) produced
**269 passed, 12 failed**. All routing and URL-state checks passed.

The remaining cases were:

- Mobile overflow at 375px: Synapxe (380px), Morta (376px), Nicopark (406px), Poppypatch (471px).
- Shared reduced-motion heading visibility/stability: Khora, Strata, Savepoint,
  Perigee, Xibalba, Orova, Nema, Velora.

All 12 also failed when the same unchanged template HTML was served at the
original `/<slug>` browser pathname, bypassing only the migration redirect with
Playwright request interception. The original pathname was asserted in each
comparison. This isolates the browser-path change; it is not a separate build
of the baseline commit. No source or layout changes were made to these
templates. These existing layout/test issues were left outside the migration.

### Global lint

Repository-wide ESLint reported **31 errors and 180 warnings** in unchanged
files: existing artifact helpers and Parallel, Perigee, Razorline, Riff, Rill,
Savepoint, Starriot, Synapxe, Valence, and Waypoint sources/tests. Changed-file
lint passed, including the final gallery assertion correction and runtime files.

## Execution decisions

- Used the existing user-selected feature branch and PowerShell-native
  ledger/log operations; no additional checkout was created.
- Kept template source groups and production artifact lookup paths unchanged.
- Compared generated metadata query parameters semantically: Next serializes
  a bare query flag with a trailing `=`, preserving the same key/value.
- Used lower unit-test concurrency and a longer default test deadline for
  process/filesystem-heavy tests; preserved all assertions.
- Committed the independently verified offline adapter while gallery browser
  enumeration was still running, then committed each remaining milestone.
- Added the missing gallery-shell assertion update after the full suite exposed it.
- Retained the explicit namespaced Cairn alias policy: 60 old media URLs gain
  one 308 to byte-identical Keytu files. Current canonical media stays direct.
- Left verified unrelated registration, global-lint, and visual-suite defects
  outside this URL change. Existing metadata origin cleanup and production
  deployment checks remain separate work.

The compatibility cost of the alias decision is an extra redirect for legacy
Cairn media. The other retained risks are the repository-wide failures listed
above and the fact that production deployment has not been exercised.

## Milestone commits

- `fca5a0e`: reviewed plan and design.
- `430ff21`: namespaced routes and redirects.
- `498e7dc`: standalone URL normalization.
- `2da28bb`: gallery and template workflows.
- `a293f0e`: gallery-shell namespace assertions.
- `b5790ae`: live URL state and regenerated exports.

## Independent review

A fresh reviewer inspected the complete source changes through `b5790ae`,
the regenerated artifacts, the added gallery-shell assertion changes, and the
verification evidence. Verdict: ready to merge, with no critical, important,
or minor findings. The reviewer explicitly excluded the established baseline
registration, layout/test, and lint issues, existing metadata origins, and
unperformed deployment checks from this migration's scope. The reviewed Cairn
media redirect exception is recorded above. No push or merge was requested.
