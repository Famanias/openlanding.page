# SDD ledger — plan: docs/superpowers/plans/2026-11-03-lenus-optical-lens-interior.md

Baseline: b04e8c7; existing linked workspace Famanias/brittlestar. Original reconstruction complete and preserved. Baseline npm test -- --maxWorkers=2: 233 files / 1237 tests pass.

Pre-flight shared interfaces:
- Tasks 1→2–8: combined sculpt spec and pass gates govern new/affected IDs; original evidence remains intact.
- Tasks 2→3: LensLayout owns rest transforms and sockets; factory consumes them exactly once.
- Tasks 3→5→7: one pose application path consumes deterministic transformation plus inspection offset/focus; control methods cannot overwrite shared transforms.
- Tasks 4→5: closed revolved optical and panel geometry; form review stays open through Task 5.
- Tasks 5→7→8: production sampler drives capture adapters and controller, phase-based visibility/picking and tests.
- Tasks 6→7: materials accepted before animation integration; preserve approved per-material validation.
- Tasks 7→8: inspection snapshot includes hero phase/camera and manual preferences; full-cycle bounds include all panels.

Ruling: use the existing installed canonical img2threejs checkout via C:/Users/PC/.claude/skills/img2threejs rather than hardcoding the old release directory — follows the skill router's shared-checkout contract; cost if wrong: version/schema drift, checked before strict validation.

Task 1: in progress — reference admission and combined interior/rig spec.

Task 1 verification: all seven references admitted; glass/titanium extraction confidence .86; normal and strict validation pass. An out-of-order multi-step state update was rejected and then corrected using ordered single-step updates before geometry work. The original state/spec remain untouched.

Ruling: seed the combined spec from the accepted exterior spec rather than a generic starter — preserves original geometry/material evidence and schema depth; strict validation checks all added components. Cost if wrong: inherited stale fields, removed completed reviews and reset only the new run's pipeline.

Task 2: in progress — test-first axial layout and coarse model augmentation.

Task 2 RED→GREEN: missing optics/core placement/rear offsets (3 failures → pass); added zero-area support-strip regression (failed → positive bevel/face-normal fix → pass); cylindrical panel-envelope regression (failed → closed coarse sector proxies → pass). Registry now has all 41 semantic nodes, original IDs retained. Full suite: 234 files / 1243 tests pass; tsc --noEmit passes.

Task 2 evidence: 129232 model triangles / 74 calls; closed-reference Tier1 IoU .9316; closed/deployed turntables and sampled self-intersection checks. Capture aspect initially differed from references, corrected to 1376×768; previous framing and support reports retained. Deployed viewport fit at 1440×900, 900×700, 390×844 passes conservative projected bounds. Zero applicable generic attachment anchors are NOT proof of moving-cell contacts; those are Task 3's measured runtime contract.

Ruling: rear-frame rest position is -.30-1.15=-1.45 and rear-fins world position is -1.55 — replace the draft test's incorrect -1.58 expectation with the actual baseline coordinates plus the planned offset. Cost if wrong: rear-module positioning regression, covered by world-coordinate assertions.

Ruling: restrict review targets to the stages that construct them (core appearance from materials, attachment from structure, closed deployed shells from form) — a clay blockout cannot prove green transmission or motion. Final quality thresholds remain unchanged. Cost if wrong: premature phase acceptance, prevented by later mandatory feature reviews and final full-cycle evidence.

Material evidence: the generic finish classifier called the glass crop worn-composite despite visually clear curved transmitting glass. Reject that automated recipe; keep the accepted transmission/IOR/roughness scalars. Extracted reference maps remain offline evidence only, never painted onto the runtime asset.

Task 3 RED→GREEN: missing rail sockets/front carriage/linkage rig → constructed; endpoint/rail-contact measurements and tamper witness pass; repeated shared geometry disposal failed then passed with idempotent cleanup. Six supported optical carriers, 24 rail sockets, eight articulated two-arm supports, independent front-carriage and collar-unlock pivots. Full suite before final zero-transform wrapper: 235 files / 1247 tests pass. Typecheck passes.

Task 3 structure review accepted: 152736 triangles / 84 calls, both turntables and sampled self-intersection gates pass. Maximum link endpoint residual 6.04e-8; actual bearing/track radial gap .001; minimum axial bearing overlap .08 across automatic deployment. Front meniscus rides the translating rod; remaining cells stay engaged with the stationary tube. Material/glass curvature and front-occluder opening are still unaccepted until form/look development.

Ruling: keep the rear train seated during automatic opening and move the three front cells by .65/.24/.12 units — preserves the existing rear hardware and keeps every automatic carriage engaged with its guide. Manual inspection separation still spreads all seven groups as coherent cells. Cost if wrong: less rear optical travel than the generated keyframes suggest; full interior visibility and final motion review remain required.

Execution tooling: Git Bash resolves an incompatible npm/node shim, so task-done uses the installed C:/Program Files/nodejs/node.exe with Vitest's CLI. The actual full npm suite also runs natively in PowerShell; no dependency or package script changed.

Task 4 RED→GREEN: perimeter thickness, meniscus concavity, true plano back face, glass/holder overlap and invalid profile rejection all failed against proxies and now pass. Additional primary-biconvex depth/diameter regression failed (.051) then passed (.102) after reference-driven sag refinement. Relocated trim picking failed when buried inside carrier, then passed with trim mounted at local z=.255. Closed boundary, face winding, finite normal/tangent and pole weld checks pass for glass and stepped cell profiles.

Task 4 geometry diagnostics: 23 new/affected glass/cell meshes, 2301 sampled vertices, zero inside/undecided points with the unmodified self-intersection gate. Initial sharp/flat-bevel corner reports were retained. A discriminating Three.js full ray-parity probe and 2D profile containment showed the corner probes were outside; rounded inner seat fillets with analytic normals now also pass the original gate without changing its thresholds or exclusions. Form remains open for Task 5; no materials pass unlocked.

Ruling: increase optical sag against reference 4 and adjust centers to +.16/-.25/-.44 — the initial .10-thick primary clear element still read as a wafer in profile. Preserve .03 minimum air gaps and the 2.1-unit body envelope. Cost if wrong: stronger curvature than the original draft, checked against the newer reference and real profile clearances.

Task 5 RED→GREEN: missing runtime pose/inspection controls and coarse panel curvature failed then passed; rear-flange collision regression failed then passed with outboard shells. Continuous-glass clearance, assembled max radius, 193 phase samples of optical gaps/physical guide engagement/link endpoints, geometry inventory and exact 0/24 restoration pass. Browser capture APIs were tested missing before implementation; fifteen actual phase captures report minimum .03 optical gap and stable 41 parts. Full suite 238 files / 1266 tests passes; TypeScript passes.

Task 5 form review accepted: full-frame reference/render sheets, closed/deployed Tier1 and turntables, unmodified sampled self-intersection checks (closed: 8934 sampled, 21 undecided original/retained points), 188480 triangles / 86 calls. Materials now unlocked; gray form acceptance does not accept final green visibility or motion scheduling.

Ruling: repack original metal collars as functional retainers — front support gets a clear bore, middle collar follows the front meniscus cell, inner collar follows the recessed core. This preserves IDs/glass dimensions and avoids moving opaque collars through optics. Cost if wrong: changed inner-collar depth in the assembled appearance; reviewed against the preserved exterior identity and new references.

Ruling: place housing outside the existing 2.12-radius rear flange (2.17/2.23 inner/outer radii) with rear anchor posts and fixed .32 links — inboard proxy panels collided with the preserved flange. The complete assembled mesh remains within radius 2.49. Cost if wrong: a broader closed housing than the initial proxy, which also better matches reference 1.

Task 6 RED→GREEN: missing thickness variants and repeated map disposal failed, then passed. Five glass variants retain the original transmission/roughness/IOR/dispersion and derive thickness from accepted profiles. Independent roughness/normal maps remain1024px. Scattering backing is contained inside the original emerald ellipsoid, reuses a clone of its procedural density field in linear color space, and owns/disposes that clone separately; original emerald material/map are unchanged.

Task 6 visibility/spec refinement: initial core footprints were zero. Ray probes identified full metal cell walls occluding the reference view. One recorded material-pass refine-spec review (total1/6) changed only the five new cell retainers to four permanent closed 15-degree clips each, following references3/4. Original review history and failed/candidate reports remain; all geometry/material gates reran on the revised current artifact. A direct reference-view sightline regression failed before this correction and passed afterward.

Task 6 look development accepted sequentially: material, surface, then lighting. Lighting material scores: glass.8890, titanium.9679, emerald.8949, prism.7762; all gates pass. Core green footprints6408/7141/1376 pixels for closed/opening/deployed exceed unchanged projected-area thresholds. Current model185808 triangles; PBR153 calls includes transmission and must be reduced to110 in Task8. Full suite239 files/1272 tests and TypeScript pass.

Ruling: use open retaining clips instead of full annular walls for the five new optical cells — the references show open-sided support and the annuli blocked the core. IDs, sockets, glass geometry and material scalars remain; repeat all geometry/material gates in the current refined artifact. Cost if wrong: less circumferential metal than the first form version, balanced by faithful visibility and four physical supports per cell.

Task 7 upcoming correctness check: inspect separation at its maximum; constrain the second/third front carriages to the fixed tube's reach while preserving growing optical gaps. Keep all mode/clock/camera snapshots independent from user Pause.
Task 1: complete (commits b04e8c7..b04e8c7, tests: python C:/Users/PC/.claude/skills/img2threejs/forge/stage2_spec/validate_sculpt_spec.py .img2threejs/interior/interior-sculpt-spec.json --strict-quality → PASS)
Task 2: complete (commits b04e8c7..95bd338, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run --maxWorkers=2 →              at least ~15.22s faster with isolate: false — reuses workers across files instead of one per file)
Task 3: complete (commits 95bd338..7654e91, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run --maxWorkers=2 →              at least ~16.59s faster with isolate: false — reuses workers across files instead of one per file)
Task 4: complete (commits 7654e91..2daaf4f, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run src/app/(lenus)/lenus/model --maxWorkers=2 →    Duration  1.57s (tests 82%, import 14%, transform 3%, worker 2%))
Task 5: complete (commits 2daaf4f..dbd60cd, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run src/app/(lenus)/lenus/model --maxWorkers=2 →              at least ~275ms faster with isolate: false — reuses workers across files instead of one per file)
Task 6: complete (commits dbd60cd..297f448, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run src/app/(lenus)/lenus/model --maxWorkers=2 →              at least ~360ms faster with isolate: false — reuses workers across files instead of one per file)

Task 7 verified: 16 files /68 tests, TypeScript and ESLint pass. Native 24-second recording, 12 real-controller phase interruption/recovery tests, context snapshot preservation, measured193-sample rig clearance and static fallback/keyboard controls pass. Initial browser run13/14; legacy arbitrary-phase Reset expectation corrected to phase0, two affected tests reran2/2. Desktop HUD720x108, phone342x245 without overflow/overlap. Full geometry gates pass; optimization remains pending.


Task 7 visual review initially withheld: optical/core feature scores below.8. Recorded refine-code (total2/6), increased contained backing depth from.2401 to.3822 and shifted production inspection60->50 degrees; independent60-degree reference retained. New green footprints6460/7344/3607 production and1438 reference pass; corrected full-cycle recording, phase recovery, complete geometry gates and69 tests pass. The earlier f2db655 checkpoint was implementation only; acceptance follows this correction.
Ruling: production inspection uses50 degrees instead of the initial60-degree preset to expose the recessed core; reference comparisons retain60 degrees. Cost if wrong: less side projection, covered by separate orthographic side views and visibility captures.

Task 7: complete (commits 297f448..235d8dc, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run src/app/(lenus) --maxWorkers=2 →              learn more: https://vitest.dev/guide/improving-performance#test-isolation)

Task 8 accepted:185808 triangles unchanged,107 measured total PBR calls vs153,295024 total rendered triangles. Per-part geometry invariance, full motion/contact/bounds tests pass; closed selfcheck293 solids,28361 samples,0 inside/61 undecided. Four material/core gates pass. Native RTX2060/D3D11 cycle92-181FPS; software SwiftShader1-2FPS retained as a limitation. Full suite241 files/1285 tests passes at unchanged timeout after stopping competing jobs; production native browser15/15, build/types/lint/check pass. Copy bundle and two gallery previews refreshed; scoped reconstruction complete.
Ruling: batch only rigid opaque solids within semantic pivots, and export every merged vertex as its actual closed-solid source range for review. Cost if wrong: rigid-only assumption could detach hardware; before/after triangle-weighted bounds/centroids and contact tests cover opening/closing and maximum separation.
Ruling: native Windows browser checks use optional LENUS_NATIVE_GPU=1 (Chromium D3D11); default portable software CI remains. Cost if wrong: hardware-specific coverage; software fallback/no-JS/reduced-motion and generic raster captures also remain.
Ruling: the plugin runner hardcodes workspace/.img2threejs/state.json, so feed it a faithful scoped action-ready snapshot in an isolated adapter workspace. Cost if wrong: stale adapter evidence; snapshot taken after action-ready/emission and unmodified generic runner returns no contributed plugins.

Task 8: complete (commits 235d8dc..bbe7d7f, tests: 'C:/Program Files/nodejs/node.exe' node_modules/vitest/vitest.mjs run --maxWorkers=2 →              at least ~15.28s faster with isolate: false — reuses workers across files instead of one per file)

Final review: fresh read-only reviewer, range b04e8c7..bbe7d7f. Critical0, Important3, Minor0; declined to judge: None. All Important grades stand.
Final: fixed stale dynamic linkage bounds - exact deployed full-model raycast RED->GREEN; moving arm/crown spheres refreshed; suite1286/1286.
Final: fixed C-toggle during an active pointer drag - physical mouse/keyboard regression RED->GREEN; gesture retained until release; native browser18/18.
Final: fixed reconstruction losing parallax/current orbit - both paused parallax and physical active-drag reconstruction regressions RED->GREEN; actual initialized camera matrices/model rotations preserved within1e-10; suite1286/1286 and native browser18/18.
Final: no minor (deferred) findings; no declined-to-judge rulings. Full build/types/lint/isolation/palette/media checks pass. Latest native RTX2060/D3D11 profile171-180FPS at900x700;107 total PBR calls and185808 model triangles remain unchanged.
Final: branch and Orca-managed workspace retained for the user's native implementation request; no integration, push or publication performed. Execution ledger and final logs archived. Automatic approval review rejected deleting the temporary SDD directory with "blocked by policy"; the directory remains intact. No alternate deletion was attempted.
