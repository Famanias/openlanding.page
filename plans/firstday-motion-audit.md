# FIRSTDAY motion review

Scope: FIRSTDAY only. Quick audit using the improve-animations playbook. Stack: CSS transitions and keyframes, native sticky, IntersectionObserver, a requestAnimationFrame scroll writer, and conditionally imported Lenis. Marketing entrances are rare; filters, project dialogs and stage selection are occasional; hover and focus feedback are frequent. Source was reviewed against purpose, easing, physicality, interruptibility, performance, accessibility, token cohesion and missing feedback.

| Severity | Finding | Evidence | Resolution |
|---|---|---|---|
| High | Observing fully clipped reveal targets can prevent entrance | motion/Reveal.tsx, mask/wipe observer target | Resolved: observe unclipped parent geometry; browser-tested sticky scene is visible |
| Medium | Header height and navigation-indicator width transitions trigger layout | firstday.css, header and indicator rules | Resolved: fixed boxes, transform compression and indicator movement |
| Medium | Pause control's accessible name did not include its visible label verbatim | motion/MotionRuntime.tsx, pause button | Resolved: visible and accessible labels match |
| Low | A one-second mobile headline entrance delays the final paint | firstday.css, mobile load choreography | Resolved: mobile headline uses the 850ms reveal token |

Reduced-motion scenes, no-JavaScript flow, pause/offscreen/hidden-tab ambient controls, interruptible hover and dialog states, and manual story selection were verified in Playwright. Scroll-driven properties use non-inherited registered custom properties on the elements that consume them. No React state updates per scroll frame.

The first throttled trace ran concurrently with the full browser suite and could not establish isolated frame timing. The repeat ran in isolation at 4× CPU throttling: CLS 0, no scroll long tasks (over 50ms) during the measured 20-wheel-event journey, and one 96ms initialization task before scrolling. This is a bounded Chromium desktop measurement, not a guarantee for every device. Trace: `.openlanding-page/firstday/shots/performance-4x.json`. Mobile Lighthouse: performance 94, accessibility 100, best practices 100; initial CLS 0.

## Plan: remove layout transitions

Status: implemented and browser-verified. Base commit: 88f610c. Scope: firstday.css only. Category: performance. No new dependencies. Keep the brand tokens and visual composition.

The current header transitions `height` between 94px and 74px. Keep its box at 74px; express the initial 10px extra breathing room using `transform: translateY(10px)` and return to zero in its compact state. Transition transform with `var(--dur-base) var(--ease-out)`. Apply the load reveal to header children so its keyframe cannot override the responsive parent transform. At mobile widths use a 68px box with 5px initial translation.

Remove width from the navigation-indicator transition list. Width may update once per link focus or hover; the indicator moves with the existing transform transition. Keep focus feedback immediate. Replace the FAQ's block-size interpolation with native details-content grid rows, using 0fr/1fr and the existing duration token.

Verify: lint and typecheck the template; run tests/e2e/firstday.spec.ts; hover and keyboard-focus every nav link; scroll through header compression at desktop and 390px; open and close FAQ rapidly; check reduced motion. Done when no header height or nav width transition remains and no content shifts as the header changes state.
