# CTRL/ROOM motion adaptation

Implemented 2026-11-01 from the motion-only brief in root `prompt.md`.

## Reference and visual boundary

No separate reference URL or video was supplied. The existing CTRL/ROOM brief explicitly names the local Lumen project as a permissible behavioral reference, so the reference for this pass is the checked-in Lumen source. It was inspected before implementation. Its glass materials, palette, fonts, hero composition, components, and content were not imported.

CTRL/ROOM retains its original Chakra Petch / Plus Jakarta Sans / JetBrains Mono typography, navy/cobalt/yellow palette, dithered wallpaper, square windows, pixel glyphs, section sequence, product illustration, copy, simulator, profiles, local storage and official product links. The mobile navigation now exposes the existing section links. No new imagery or factual product claims were introduced.

## Observed inventory

These values are verified source parameters, not estimates made from a video or claims about real-world performance.

| Behavior | Reference evidence | Trigger, timing and physics |
| --- | --- | --- |
| Masked word entrances | `src/app/(lumen)/lumen/motion/SplitText.tsx`, `lumen.css` (`lm-mask-rise`) | Headline words rise through masks; hero uses 1000 ms and 55 ms stagger, `cubic-bezier(0.16, 1, 0.3, 1)`; section text uses 850 ms and 35 ms stagger. |
| Hierarchical assembly | `motion/timings.ts`, `components/GlassWorkspace.tsx` | Workspace entrance actually uses 160 ms stagger, 1.05 s duration and GSAP `expo.out`. The separate timing file declares a 60 ms stagger and 1.6 s demonstration budget; these declarations are not the runtime entrance values. Primary and secondary elements settle at different times. |
| Viewport reveals | `motion/LumenMotion.tsx` | IntersectionObserver, threshold 0.08; once-only arming of offscreen elements, focus reveals hidden ancestors, static default. |
| Scroll continuity | `motion/LumenMotion.tsx` | Cached geometry and requestAnimationFrame writes for hero departure, reading progress, active navigation and progress line. No per-frame React state. |
| Pointer response | `motion/LumenMotion.tsx`, `lumen.css` | Fine-pointer-only magnetic offsets and bounded perspective, easing back to neutral on exit. |
| State transitions | `lumen.css` | 280 ms sheet token, 350 ms content arrival, 120 ms press token, faster feedback than editorial entrances. |
| Navigation | `components/MinimalHeader.tsx`, `lumen.css` | Active underline, scroll progress, native mobile dialog, staggered links and focus management. |
| Preference and visibility lifecycle | `motion/LumenMotion.tsx` | Live media-query changes, offscreen/hidden ambient pause, observer/listener/frame cleanup. |

## Mapping and implementation

Motion identity: **assemble, then respond**. The focal moment is the existing pixel boot shutter handing off to the headline, hardware panel and 15 key glyphs. Frequent editing actions stay immediate.

| Target | Adaptation | Responsive / accessibility behavior |
| --- | --- | --- |
| Boot and hero | Complete all four original shutters in 840 ms; then 800 ms masked words at 55 ms intervals, 600 ms supporting copy, 800 ms hardware opacity arrival and a short five-column glyph stagger. Interactive group hit areas stay stationary. Glyphs animate once on their original DOM nodes via WAAPI. | Shutter bypassed for reduced motion, autostart and repeat session. No-JavaScript stylesheet removes it. Content remains visible by default. No artificial loader or input lock. |
| Hero departure | Existing hardware travels at most 24 px and scales by at most 2.5% as its hero leaves. | Desktop only. No sticky scene, scroll hijack or additional page height. Native touch scrolling. |
| Workspace and sections | Workspace settles by 32 px and 1% scale; supporting section groups use 24 px, 700 ms; masked section words use 35 ms stagger. Final existing matrix assembles in columns. | Only offscreen content is armed. Once revealed it stays visible. Focus settles all armed ancestors. Reduced motion removes spatial movement. |
| Primary actions | Bounded 6 × 4 px magnetic range, 280 ms return, 120 ms physical press. Transforms are written directly on their consumers. | Fine hover pointer only; keyboard and touch work without pointer effects. |
| Action/profile cards | 2 px horizontal / 4 px vertical offset with retained hard shadows; pixel icons respond by 2 px. | Keyboard `focus-within` feedback; no tilt or pointer-only information. |
| Window lifecycle | Motion AnimatePresence: 280 ms arrival, 160 ms exit, explicit transform strings with identity scale 1. Maximize/restore uses a separate 280 ms FLIP surface with `cubic-bezier(0.77, 0, 0.175, 1)`; repeated toggles start from the current visual bounds. | No transition is added to dragging. Final pointer coordinates are flushed; pending frames are cleaned up. A live media-query subscription cancels FLIP when reduced motion is enabled. |
| Profile matrix | Existing scan retained; key icons settle in row-plus-column order, 25 ms intervals, 300 ms duration. Every profile switch mounts a fresh scan and cancels the previous reset timer. | Profile state updates immediately; no animation lock. Confirmation retains its original profile names through dismissal. |
| Hardware inspection | Direct pointer perspective with a 200 ms return, 280 ms angle/callout entry, 320 ms modal entry and 160 ms exit. Angle changes do not replay boot glyphs. | Native modal semantics, explicit Tab/Shift+Tab cycling, Escape, focus restoration and scroll lock. Interrupted modal motion starts from its displayed opacity and transform; backdrop fades concurrently. |
| Run Log / mobile app panel | 220 ms new-event arrival; 280 ms app-panel arrival on selection. | Local simulation state is unchanged. Touch tabs remain the mobile control surface. |
| Navigation | Drawn active underline, progress strip, native fullscreen mobile menu with 45 ms link stagger. | Internal anchors transfer keyboard focus to the destination. Focused reveal ancestors become immediately opaque and stationary. Mobile destination focus follows native dialog dismissal. No-JavaScript section links remain functional. |
| Saving | Save control crossfades to a check and `SAVED LOCALLY` for two seconds, with stable width. Repeated saves restart the feedback timer. | Success is shown only after storage accepts the write. Rejected storage keeps the save control available and displays a specific inline error. |
| Patch cable | Existing dash flow retained. | Paused when desktop is offscreen, document is hidden, or reduced motion is requested. |

## Technical notes

- New route-local files: `components/motion/CtrlRoomMotion.tsx`, `RevealText.tsx`, `MotionDialog.tsx`, `tokens.ts`.
- CSS variables hold durations and curves; TypeScript tokens drive window/modal timings. Existing Motion dependency is used only for interruptible window presence. Native Web Animations handles both modal directions, FLIP geometry transitions and the one-time key entrance. CSS handles bounded entrances, hovers, save feedback and scans.
- The controller measures on resize/content-size changes and writes scroll/pointer variables in scheduled animation frames. It has no perpetual render loop and does not update React state on scroll or hover.
- All new CSS is scoped to CTRL/ROOM classes. No imports from another template. No new dependencies. Nested window scrolling and dragging remain native.
- Lenis, pinned sections, WebGL, custom cursors and copied glass effects were intentionally omitted: they are unnecessary for this existing operating-system interface.
- Screenshots, performance trace and temporary verification scripts are under ignored `.openlanding-page/ctrlroom/`.

## Verification

- `npm run check`: isolation, palette and media checks pass.
- `npm test`: 201 files / 1,143 unit tests pass.
- `bunx next build`: optimized production build passes, including TypeScript. Existing unrelated font fallback / metadata / image-renderer warnings remain.
- `bunx tsc --noEmit`: standalone type check passes, including the browser tests.
- Scoped ESLint: no errors or warnings after removing pre-existing unused imports in the edited App.
- Original production Playwright coverage: 14 passing tests. The follow-up implementation expands this to 21 scenarios, adding skip-link focus, immediate reveal visibility, early modal cancellation, actual scan replay, one-time glyph choreography, interrupted maximize/restore, persisted save feedback and rejected storage. Final follow-up results are recorded below.
- Boot layout shift test passes with a cumulative shift threshold below 0.02; the browser records no uncaught page errors in that test.
- Desktop 1440 × 900, mobile 390 × 844 and tablet 768 × 1024 screenshots, plus 25/50/75% scroll frames, were inspected. Desktop static composition matches the original. Mobile adds access to the same section links. Computed document width equals viewport width at all three sizes.
- Production Chromium scroll sample with CDP tracing and 4× CPU throttling: 115 frame intervals after warmup, median 17.0 ms, 95th percentile 40.2 ms, **zero intervals above 50 ms**. This is a short synthetic local sample, not a guarantee for every device. The development-server sample was slower and is not used as the production result.
- Impeccable detector: one advisory for the original grid wallpaper on the actual OS workspace. It was retained to honor the visual-preservation brief.
- The copyable source and rebuild brief in `public/copy/ctrlroom*.md` have been regenerated. Other templates and the user's root `prompt.md` were left unchanged by this work.

## Follow-up implementation verification

All seven audit findings and both additive opportunities are implemented. No plan files were created.

- Optimized production build, standalone TypeScript, scoped ESLint and isolation/palette/media checks pass. The 201-file / 1,143-test unit suite passes.
- All **21 browser scenarios pass against the updated production server**. The assertions inspect displayed opacity, keyboard focus, restarted scan timelines, one-time glyph motion, interrupted FLIP geometry, persisted saves and storage failure, in addition to existing simulator and responsive coverage.
- Focus settling is immediate for keyboard/programmatic navigation. Pointer-down focus does not snap an ancestor reveal underneath the pending click. Hero controls also keep stationary hit areas during their load sequence.
- Final desktop, mobile and tablet captures retain the original visual system and have no document-level horizontal overflow. Scroll captures include the functional workspace with its new window surface.
- Final 4× CPU-throttled production scroll sample: 115 intervals after warmup, median **17.8 ms**, 95th percentile **24.3 ms**, **zero intervals above 50 ms**. This remains a short local sample, not a universal device guarantee.
- A stale Turbopack cache was preserved in ignored scratch storage before the clean build. The emitted production stylesheet was checked for the new immediate-focus rules and removal of the old boot-glyph selector.
- Copyable source and rebuild brief are refreshed. Preview: `http://localhost:3113/ctrlroom`.
