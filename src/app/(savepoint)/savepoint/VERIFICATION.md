# SAVEPOINT — Milestones 1–4 verification

Stopped after Milestone 4. Milestones 5–6 have not been implemented.

- `/savepoint` runs on the existing dev server at `http://localhost:3000/savepoint`.
- Repository-wide `tsc --noEmit` and the template isolation check pass.
- Five focused Playwright tests pass: ten-game navigation and repeated round trips; drag/snap and intro cancellation; deep links and browser history; mobile reduced motion; WebGL context loss and recovery.
- All 26 approved assets match the source files byte for byte.
- Both hardware models completed the eight ordered img2threejs passes. Final silhouette IoU: console **0.867**, cartridge **0.9037**. Part coverage has zero errors or warnings. Closed mesh prototypes pass self-intersection checks; both assembly APIs explode, restore exactly and resolve part picks.
- Twenty-two insertion samples have zero lateral axis error and zero final dock error. A downward ray through the opening hits the internal contacts below the lip. Desktop and mobile framing checks found zero clipped cartridge frames across 846 samples.
- Visual captures cover 1366×768, 1920×1080 and 390×844. The final browser capture logged zero console/page/HTTP errors, one canvas and no mobile horizontal overflow.

Evidence is stored in `public/templates/savepoint/verification/`, including each pass’s comparison sheet and orbit captures, final desktop/mobile screenshots, pipeline state, geometry reports, assembly results and calibration measurements. The model specs retain review history and evidence links.

Hardware dimensions, hidden surfaces and molded grain are approximate procedural reconstructions. Self-intersection tests cover individually closed prototypes; artwork planes are excluded, and instanced geometry is tested once per shared prototype. These checks do not establish manufacturing tolerances or exact photometric reproduction.

The full Milestone 6 release suite was deliberately deferred. An earlier gallery-only run exposed the existing Stillwater prompt CRLF/LF equality assertion; the five SAVEPOINT interaction tests pass independently.
