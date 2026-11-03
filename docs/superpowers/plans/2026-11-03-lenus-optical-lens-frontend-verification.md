# Lenus frontend integration — verified 2026-11-03

Implemented `/lenus` and registered it in the template gallery. The completed 3D asset is route-local, with compatibility exports for the existing capture tooling. All five model modules are byte-for-byte unchanged from base commit `9be3b8f`.

## Verification

| Check | Result |
|---|---|
| Production build | Passed; /lenus, favicon and Open Graph routes prerendered |
| Unit suite | 1,230 tests across 232 files passed |
| Production browser suite | 13 tests passed |
| Contact follow-up | Passed after tightening malformed-email validation |
| TypeScript | Passed |
| Scoped ESLint | Passed |
| Isolation / palette / media | All passed |
| Mobile Lighthouse | 92 performance / 100 accessibility / 100 best practices |
| Mobile LCP / TBT | 3.1 s / 150 ms |

Browser coverage includes physical-glass color rendering, explosion and focus controls, keyboard and part inspection, frozen pause, responsive aspect fit, native dialogs and focus restoration, local brief download, context loss/recovery, runtime reduced-motion disposal, mobile navigation, blocked WebGL/no-JS, state replay on reconstruction, and commands queued before the scene import completes.

The fresh review found settings lost during initialization, inactive geometry controls while paused, and test files accidentally copied into runtime exports. Each has a regression that was observed failing before the fix. Browser checks also caught the OrbitControls angle normalization that flipped reset to the rear view; reset now returns to the initial front three-quarter frame.

## Implementation decisions

- Ruling: The supplied reference and detailed frontend plan are the approved visual design and test seams — no new brand board or intake is needed; cost if wrong: later visual revision.
- Ruling: This is frontend integration of the user's completed model; the old img2threejs sculpt loop is not resumed. Cost if wrong: no additional sculpt review.
- Ruling: Contact success prepares a local project brief and explicitly states it has not been sent, since no delivery backend is in scope. Cost if wrong: a backend connection is a later integration.
- Ruling: Use the installed Superpowers skill from the Claude plugin cache because it is absent from the session skill catalog. Windows commands use direct Node test entrypoints as the plan requires.
- Task 1: Ruling: the finished asset actually contains 19 named parts, not the plan's 16. Preserve all 19 and test the real authored assembly — deleting parts to match the stale count would violate model ownership. Cost if wrong: telemetry count differs from the plan text.
- Task 7: Ruling: process-images.ts already derives validSlugs from central TEMPLATES; adding the central lenus entry registers it automatically, so no redundant slug literal was added. Cost if wrong: image CLI would reject lenus (checked via central registry).
- Task 7: Ruling: repo stack metadata is a string, so preserve that schema; model tag is GPT-6.1 Sol. Imported JSON is included in copy bundles via an opt-in source-reader flag, tested RED→GREEN; source guards keep their existing scope.
- Final: Ruling: authored sculpt/material quality is outside frontend scope as the user explicitly completed it. Cost if wrong: later sculpt changes are a separate task.
- Final: Ruling: mobile Lighthouse measured performance 40, LCP 13.8s, TBT 9.5s from eager WebGL startup. Keep SVG on coarse/narrow viewports until explicit activation, and start desktop rendering at idle. Cost if wrong: mobile visitors need a tap for live 3D, with complete content visible beforehand.

The image CLI obtains Lenus from the central registry automatically. The finished model has **19** parts, so the plan's stale count of 16 was corrected in integration tests and documentation. Mobile starts with the complete SVG and activates 3D on tap, Enter or STEP INSIDE. The contact form prepares a local downloadable brief; delivery requires a future backend connection. No model sculpt or material changes were made.

## Deferred minor

Dialog and form-success entrances retain the 800ms reveal token. A shorter UI entrance is optional polish.

## Evidence and handoff

- Desktop, compact-laptop and mobile captures: `.openlanding-page/lenus/shots/`.
- Full logs and model preservation hashes: `.openlanding-page/lenus/scratch/`.
- Mobile report: `.openlanding-page/lenus/lighthouse/mobile-final.json`.
- Gallery images: `public/templates/lenus/preview-1600.webp` and `public/gallery/lenus.webp`.
- Local production preview: http://127.0.0.1:3100/lenus.
- Commits stay on the existing `Famanias/brittlestar` branch and worktree.

Build warnings about repository font metrics, metadataBase and unsupported social-image z-index were non-blocking. No publish or deployment was requested.

## Follow-up: compact controls and looping lens

- The desktop HUD now measures 720 × 108px at 1920px, 1440px and 900px viewports. It fits within a 390px phone viewport, where controls stack without horizontal overflow.
- The complete lens turns around its optical axis in a seamless 24-second cycle, with harmonic tilt, an oscillating inner collar and counter-orbiting shards. Dragging holds the loop for inspection. Pause, visibility suspension, dialogs and reduced motion retain their previous behavior.
- Loop phase and adaptive resolution survive preference-driven renderer reconstruction. User-controlled explosion and focus remain independent of the loop.
- The updated production build, 1,237 unit tests, TypeScript, scoped lint and repository guards pass. Production browser checks cover automatic movement, frozen Pause, resumed playback, settings restoration, context recovery, mobile and reduced motion. Reflected colors are checked across representative animation poses rather than one arbitrary frozen phase.
- Template and gallery previews were refreshed from the rendered production hero. The authored model geometry and materials remain unchanged.
