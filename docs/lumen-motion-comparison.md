# Lumen motion comparison and implementation

Reviewed against the source of Cullet, Pipkin, and Satsuma on 2026-10-31. The reference templates remain unchanged.

| Layer | Cullet | Pipkin | Satsuma | Implemented in Lumen |
| --- | --- | --- | --- | --- |
| Main visual | Pointer-responsive glass slabs; scroll separates the shards | Staged jar entrances and a scroll-driven product journey | Reel wheel assembles, glides, and responds to dragging | A new composition of three glass workflow panels; staged assembly, pointer perspective, inspection, and scroll-driven separation |
| Page transitions | Sticky scenes, diagonal cuts, overlapping sheets | A clear progression through scenes and varied section grounds | The next sheet slides over the held hero | A held desktop hero with a raised content sheet sliding over it; dark workflow ribbon and dark problem chapter break up the light page |
| Type | Large masked display lines | Individual word entrances with grouped emphasis | Masked headline lines and staggered supporting copy | Larger editorial hero and section headings, masked word entrances, and a scroll-responsive benefit statement |
| Buttons | Magnetic pull, fill wipes, label and arrow movement | Magnetic response, fill wipes, physical press feedback | Magnetic pull, fill wipes, label rolls, spring presses | Fine-pointer magnetic movement, lavender fill wipes, moving arrows, press feedback, and drawn text-link underlines |
| Cards | Lift, spotlight, sheen, sibling dimming | Tilt, lift, animated product details | Tilt, pointer spotlight, sibling dimming, media movement | Benefit-card tilt, moving light, lift, illustration response, sibling dimming; tactile cover and larger folio transitions |
| Navigation | Active section, progress rail, animated mobile menu | Active/scroll feedback and mobile navigation | Moving selection, progress, expanding menu | Floating glass navigation, active underlines, page progress, full-screen circular menu entrance, native focus trapping, Escape, and scroll locking |
| Secondary interactions | Live materials and preset response | Steppers, tickets, accordion transitions | Tabs, pack selections, form confirmations | Scenario selection cancels replay; stage inspection; folio keyboard navigation; accordion expansion; form focus and confirmation treatment; optical presets and Glass Studio retained |
| Motion plumbing | Event-driven scene director, CSS variables, Lenis | Shared reveal and scroll coordination, Lenis | Shared reveals, scroll variables, Lenis | Route-scoped controller, event-driven scroll/pointer writes, paused offscreen ambient motion, dynamic fine-pointer Lenis, live reduced motion, and native touch scrolling |

The earlier upgrade retained the same visual composition and used small, short movements. That made the implementation difficult to distinguish from the original. This revision changes the scale, silhouettes, section grounds, and scroll composition as well as the motion.

## Main implementation locations

- `src/app/(lumen)/lumen/App.tsx`: new hero composition, content handoff, workflow ribbon, statement, and scrolling integration.
- `src/app/(lumen)/lumen/components/GlassWorkspace.tsx`: new spatial workflow illustration with working source and inspection controls.
- `src/app/(lumen)/lumen/motion/LumenMotion.tsx`: reveal, scroll, pointer, active navigation, ambient visibility, and preference coordination.
- `src/app/(lumen)/lumen/lumen.css`: typography, optical materials, motion vocabulary, responsive layouts, hover states, and reduced-motion alternatives.
- `src/app/(lumen)/lumen/motion/SmoothScroll.tsx` and `scroll.ts`: Lenis lifecycle and shared preference-aware navigation.
- `tests/e2e/lumen.spec.ts`: existing regressions plus actual scroll response, hover response, replay interruption, mobile menu, and no-JavaScript coverage.

Lumen's palette, product copy, guide data, local form behavior, Glass Studio, and footer sculpture are preserved. The copy-bundle dependency manifest includes Lenis so the exported template stays self-contained.

Timing and motion are interaction design choices, not measured conversion claims. Browser tests and visual captures are used to verify the implemented behavior.
