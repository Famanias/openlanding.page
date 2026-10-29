# Amaoto responsive staging

Implemented on 28 October 2026 in `E:/orca/workspaces/webflow-projects/codex-session-1028-418`.

Phones retain the pinned upper model band. Portrait tablets (601–900px) receive a larger, normally 50svh stage, wider reading measures and paired controls where appropriate. Anatomy and pinned Making reserve additional room for their controls and ten-step list. Compact laptops (901–1180px) retain two columns with adjusted gutters and typography. Desktop Light reserves the left column for its overhead umbrella and the right for copy and controls.

Chapter handoffs fade out in the outgoing slot and fade in in the incoming slot, switching rectangles only while invisible. They never interpolate through the middle of the page. Actual visible copy/control bounds suppress the stage when a reserved slot would intersect them, with a short clearance fade. The mapping remains scroll-scrubbed and reversible. Reduced motion uses the current chapter slot immediately without travel. Touch retains native scrolling.

`scene/staging.ts` contains the pure breakpoint, band geometry, overlap and handoff functions, covered by six Vitest tests. The whole-umbrella camera fitting and its tests remain intact. Brand, copy, model geometry and chapter keyframes were preserved. DESIGN.md and the Amaoto e2e specification were updated.

## Visual verification

Both supplied scripts were copied into this worktree root and run against the local preview. Final tag: `responsive-final-1028`.

| Viewport | Scroll screenshots | Edge samples | Horizontal overflow |
| --- | ---: | ---: | ---: |
| 390×844 | 25 | 81 | 0 |
| 600×960 | 25 | 81 | 0 |
| 768×1024 | 25 | 81 | 0 |
| 820×1180 | 25 | 81 | 0 |
| 1024×768 | 25 | 81 | 0 |
| 1024×700 | 25 | 81 | 0 |
| 1280×800 | 25 | 81 | 0 |
| 1440×900 | 25 | 81 | 0 |

Reviewed all eight final screenshot boards, individual full-resolution chapter/handoff frames, and detector flags. No umbrella cut-offs were found. The raw detector is not empty: 30 frames were flagged. Nineteen show the known rain rings at Commission canvas edges; three show those rings during the Making release into Commission; eight occur at hidden-model handoffs, where animated text/background changes between the shown/hidden captures trigger the pixel comparison. None shows a clipped umbrella.

Artifacts are retained under `E:/orca/workspaces/webflow-projects/.openlanding-page/amaoto-shots/`: `responsive-final-1028/` contains the 200 screenshots and eight contact sheets; `edges-responsive-final-1028/report.json` contains all 648 edge samples and its sibling PNGs show flagged frames.

## Automated verification

- Amaoto Vitest suites: 34 tests across six files passed.
- TypeScript and targeted ESLint passed.
- Isolation, palette and media checks passed.
- Impeccable detector returned no findings.
- All 11 Amaoto browser tests passed across the full run and a focused rerun. The initial full run passed 10 tests, including the new forward/reverse handoff overlap checks at all four desktop/compact viewports. The runner test exposed a test synchronization race: it filled the input before the Anatomy chapter-entry reset completed. Waiting for the active Anatomy UI resolved it; the entire unfurl/control scenario passed on rerun. No runtime behavior was changed for this test correction.

The first browser-run attempt could not start its server: the full-site build exhausted memory during type checking. The existing local preview was restarted and the specification rerun against it. No dependency changes, commit or deployment were made.

Representative final captures are also copied into this worktree at `.openlanding-page/amaoto-responsive-review/tablet-colourways.png` and `.openlanding-page/amaoto-responsive-review/compact-light.png`. The temporary root copies of the supplied verification scripts were removed; their originals and all output artifacts remain available.
