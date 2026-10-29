# Amaoto world revision — execution record

Workspace: `E:/orca/workspaces/webflow-projects/codex-session-1028-418`.

The approved six-world implementation and verification are complete. All 54 unit tests pass. All 32 browser cases have been verified across the full run and focused regression reruns; the exact run history is retained below.

## Delivered

- `logic/`: seeded generators, the six chapter ranges and seven rests, guarded camera interpolation, atmosphere/daylight calculations, and quaternion inspection lifecycle. Narrative state is reversible and driven by one progress value.
- `scene/renderer.ts`, `textures.ts`, `rain.ts`, `canopyEffects.ts`, and `worlds/`: procedural architecture and textures, GPU particles, paper/oil shaders, lantern transmission with rib shading, rain/gust interaction, hardware bloom/cinematic passes, and a lighter software path. The original articulated umbrella and dye painter are retained.
- `scene/scroll.ts`, `ScrollDirector.tsx`, `staging.ts`, `WagasaCanvas.tsx`, and `AmaotoShell.tsx`: one continuous world canvas, virtual object slots, seven-rest navigation/snapping, Anatomy ownership and trackball/keyboard interaction, and reversible ten-step Making controls. Entering a tool pauses scrolling; Escape, Return to story, or chapter exit releases it.
- `audio/soundscape.ts` and `SoundToggle.tsx`: gesture-gated room, workshop, paper, rain and gust synthesis; sound starts off and disposes on exit.
- Sections/CSS: semantic reading fallback, native form and colourways, loading/context-loss handling, mobile part sheet, Day/Dusk themes and copy backdrops. Decorative arrows are excluded from the tool buttons' accessible names.
- `DESIGN.md`, `PROMPT.md`, and regenerated `public/copy/amaoto.md`: architecture, interaction and resource budgets match the implemented world.

## Verification

Commands were run from the workspace above. Windows uses the existing parent binaries for Vitest, TypeScript, ESLint and tsx; Playwright uses the local package to avoid a runner-version mismatch.

| Command | Result |
| --- | --- |
| `../node_modules/.bin/vitest.cmd run "src/app/(amaoto)/amaoto"` | 54 tests pass in 12 files |
| `../node_modules/.bin/tsc.cmd --noEmit` | Pass; the production build also runs TypeScript |
| `../node_modules/.bin/eslint.cmd "src/app/(amaoto)/amaoto" tests/e2e/amaoto*.ts next.config.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-isolation.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-palette.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/check-media.ts` | Pass |
| `../node_modules/.bin/tsx.cmd scripts/generate-copy-bundles.ts` | Generated |
| `node node_modules/next/dist/bin/next build` | Pass, all 141 static pages generated |
| `node node_modules/playwright/cli.js test tests/e2e/amaoto.spec.ts tests/e2e/amaoto-anatomy.spec.ts tests/e2e/amaoto-making.spec.ts tests/e2e/amaoto-hero-framing.spec.ts --workers=1 --trace=off` | 31 passed; caught the final Making resize/scrub defect before its fix |
| Same runner over Making, Anatomy and main specs with `--grep "Making holds\|Making preserves\|Anatomy cancels\|AMAOTO steps" --workers=1 --trace=off` | All 5 affected regression cases pass after the final fix; includes the formerly failing case |
| Impeccable file detector on the Amaoto source directory | No findings |

Build environment: `NODE_OPTIONS=--max-old-space-size=3072`, `RAYON_NUM_THREADS=2`. Browser temporary files live outside the source tree at `E:/orca/tmp/amaoto-418`.

The browser cases retain part actions, runner dragging, full-object framing, form validation/success, colourway keyboard operation, reduced-motion and no-JavaScript coverage. They add chapter/rest state, idle snapping, protected input keys, scrolling ownership, quaternion turns, gusts, context loss and software counts. Test fixes use valid range input values (`0.4`, not `.4`), exact action names where the focus instruction shares their words, and wait for resize metadata to be published on the next frame.

Browser verification caught application defects that are fixed: resize snapshots progress before ScrollTrigger refreshes; throttled React updates deliver a trailing final scrub value; paused tools ignore document-scroll feedback and synchronize it on exit; and immediate commands retain progress directly. Making handles native input events so the first range change immediately after resize is retained. Form labels remain stable after validation errors via `aria-labelledby`. The desktop static poster has an explicit height and belongs to the hero instead of floating over later reading sections. Day-mode copy and static light/dark surfaces use matching foregrounds/backdrops.

Final browser logs: `.openlanding-page/amaoto-world-e2e-complete.log` (the complete 32-case run), `.openlanding-page/amaoto-scrub-regression.log` (isolated red-to-green confirmation), and `.openlanding-page/amaoto-world-e2e-regression.log` (5/5 related flows). This is not a claim that the earlier complete run was green before the last fix.

The earlier traced run was interrupted by the user's computer crash. The subsequent complete run uses one browser worker and `--trace=off`, retaining assertions and explicit screenshots while avoiding continuous WebGL screenshot readback. No crash cause is inferred from the application log.

## Visual evidence

Earlier milestone captures in `.openlanding-page/amaoto-world-milestones/` cover each world's rest and adjoining seams, scrubbed forward and backward, plus hardware/software renderer paths. Final authored frames in `.openlanding-page/amaoto-world-final/` cover the seven rests, Dusk/Day, desktop Anatomy and Making, the phone part sheet, and the full static page. The capture's `states.json` records actual progress, quality, resource counts and renderer counters. The final full capture recorded no page/shader errors; Chromium emitted screenshot ReadPixels stall warnings.

The closing `day-confirm.png`, `static-confirm.png`, and `confirm.json` confirm the corrected copy backdrops and static theme. The Light tool held document scroll and Escape released it. All six static surfaces compute to paper text on indigo at Dusk and ink text on paper at Day. This closing check also recorded no page/shader errors.

The final headless browser selected software rendering. Its rest frames recorded 16–79 draw calls and approximately 37,956–72,134 triangles; these are state observations, not a performance claim. The full hardware path retains the bloom/cinematic/output stack and higher construction counts.

## Construction budgets

| System | Hardware | Software |
| --- | ---: | ---: |
| Rain streaks | 6,000 | 1,200 |
| Merged paper strands | 1,500 | 300, concentrated around the camera |
| Workshop shavings | 320 | 64 |
| Bamboo stock | 64 | 16 |
| Street lanterns | 12 | 12 |
| Ripple quads | 48 | 12 |
| Rib-tip drips | 40 | 12 |
| Threshold/workshop/bench motes | 180 each | 36 each |
| Street/genkan motes | 120 / 150 | 24 / 20 |
| Paper foreground sprites | 36 | 12 |

## Build failure and resolution

Initial full builds exhausted native memory; a worker-thread experiment also crashed on Windows. Updating Node alone did not fix the unbounded memory use. Restricting the Tailwind loader's supported `base` option to `src` removed scans of generated copy and QA content. The production build subsequently passed with the normal installed Node runtime and default child-process backend; the experimental worker-thread setting was removed. `turbopack.root` stays scoped to this checkout, and generated directories are ignored. No runtime dependency was added.

The successful gallery build still reports existing metadataBase, social-image `z-index`/dynamic-symbol-font, and three font fallback-metric warnings. These do not fail the build; they are not reported as clean output.

## Deliberate limits

Transmission, oil, droplets, depth blur and reflections are procedural artistic approximations, not a physical path tracer. Software GL omits post-processing and shadows and uses fewer elements; reduced motion and unavailable/lost WebGL use the complete static story. Original rig allocations were retained rather than rewriting the mechanism. Audio activation/state is checked, but no subjective loudness or device-speaker calibration is claimed.

No Lighthouse, speed or responsive audit was run. Viewport changes are functional framing/tool checks required by the brief. No deployment was performed. At the original implementation handoff, the revision had not yet been committed or pushed.

## Git publication

The user subsequently requested a commit and branch publication. The session's missing Git link was restored in place from the published `ba46004` checkpoint, reconnecting `Famanias/codex-session-1028-418`. Original ignore rules and missing tracked tool-state files were restored; unrelated LOAM changes in the parent checkout were left untouched. Generated dependencies, build output and QA artifacts stay ignored. The publication commit is recorded in this branch's Git history.

Preview URL: `http://localhost:3100/amaoto` (`next start`, port 3100). The preview was stopped at the user's request.
