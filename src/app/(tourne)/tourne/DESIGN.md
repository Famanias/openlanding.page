# TOURNE: design spec

`npm i three lenis` (both already repo dependencies). Route: `/tourne`. CSS prefix: `tn-`.

## Requirements
- Fictional pottery studio in Tacoma. The visitor sculpts a vessel on a real-time 3D wheel and orders it.
- Heavily curved geometry (pills and 28 to 48 px radii), organic blob backgrounds, WebGL only on demand.
- Folder isolation, palette guard, media guard, tests, reduced-motion and no-JS fallbacks.

## Concept
The wheel turns and clay rises under your hands, so the page is a real-time 3D lathe: scrolling pulls a lump into a vessel, handles reshape its profile, glazes recolour it.

## Palette
| Role | Hex |
|---|---|
| Page (bone) | `#F4EEE3` |
| Tint (oat) | `#E9DFCE` |
| Accent (clay), the only accent | `#A8492D` |
| Ink and dark slabs (soot) | `#1F1A17` |
| Muted text (umber) | `#6B5E54` |
| Rare glaze accent (celadon) | `#8FB5A0` |
| Cards (porcelain) | `#FFFDF8` |

Tints are made with `color-mix()`. Glaze and clay colours of the 3D vessel live in `tourne/vessel/` (content colours, exempt in `scripts/templates.config.ts`).

## Type
Fraunces (display, `SOFT` 100, optical size 144), DM Sans (body), DM Mono (readouts). Fluid `clamp()` sizes. Hero headline breaks are fixed by two block lines.

## Layout
Fixed pill header. Hero (bone) then Workshop (oat, rounded top overlapping) then Studio (soot slab) then Forms (bone) then Order (oat) then Footer (soot). Each section overlaps the previous one by 40 px with a 48 px top radius, so sections hand off like layers of slip.

## The mechanic
`vessel/profile.ts` is the single source of truth. A vessel is five control radii at fixed height fractions `[0, .38, .68, .87, 1]` (foot, belly, shoulder, neck, lip), joined by a uniform Catmull-Rom spline and spun with `THREE.LatheGeometry` (96 radial segments, 44 profile samples). The same `sampleProfile` feeds the SVG silhouette, the editor, the spec readout and the collection cards.

- **Throw:** `throwParams(target, t)` blends the `LUMP` profile into the target; `t` is `easeOutQuint(progress)` where progress is `sectionProgress(scrollY, throwBlockTop, throwBlockHeight, vh)` of the 230 svh throw block. Hollowing starts at 12 % and finishes at 70 %; glaze colour mixes in from 85 %.
- **Spec:** height 12 to 38 cm, width from the widest sample, volume by integrating `π r²` over the inner wall (wall 5.5 mm).
- **State:** `vesselReducer` clamps every parameter (`PARAM_LIMITS`), ignores unknown ids, and detaches from the preset form on manual edits.
- **Engine start:** idle callback on fine pointers, tap on coarse pointers, never under reduced motion. Pauses off-screen and in hidden tabs, DPR capped at 1.5, context loss falls back to the SVG poster.

## Motion
**Personality:** organic / analog, expressive. **Verbs:** *breathe* and *unfurl*. **Signature moment:** the scroll-pulled clay rising from a lump into the vessel while the wheel speeds up with scroll velocity.

**Tokens** (in `@theme`): `--ease-out`, `--ease-out-expo`, `--ease-in-out`, `--ease-spring`; `--dur-instant` 90, `--dur-fast` 180, `--dur-base` 420, `--dur-slow` 800, `--dur-hero` 1200 ms; `--reveal-shift` 28 px; `--stagger` 70 ms.

**Motion map**

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | pill drops in at 150 ms, links staggered 50 ms | compresses after 80 px, hides on scroll down | label roll on CTA, magnetic pull | menu toggle bars morph, circle clip-path panel | slides up out of the way |
| Hero | CSS load sequence: visual settles, eyebrow 150 ms, headline masks from 250 ms, lede 600, actions 700, stats 800 | headline block scales to .94 and dims | CTA fill wipe, label roll, arrow slide | CTA press scale .97 with spring release | Workshop slides over it with a rounded top |
| Hero blobs and vessel | settle with the visual | none | none | none | paused after 1.2 viewports |
| Workshop stage | poster crossfades to canvas | clay rises, wheel speeds up, meter fills | none | glaze and form changes rebuild the lathe live | stays pinned until the glaze step ends |
| Throw steps | rise | chips light in sequence from `--throw` | none | none | yields to Shape |
| Profile editor | rise | none | handles grow and tint | drag, arrow keys, reset | none |
| Glaze picker | rise | none | chip tilts and enlarges | press scale, selected state | none |
| Step rail | none | active step follows the viewport | press scale | anchor jump | none |
| Studio marquee | drift | none | pauses on hover and focus | none | none |
| Process steps | rule draws, text rises, staggered | none | none | none | Forms slide over the slab |
| Potter portraits | clip-path wipe | none | none | none | none |
| Studio facts | unfurl, count-ups | none | none | none | none |
| Form cards | staggered scale-rise | none | lift, pointer spotlight, tilt, art scales, siblings dim | button fill wipe, pressed = on the wheel | none |
| Order summary | rise | sticky | none | updates live with the vessel | none |
| Order form | rise | none | floating labels, drawn focus line | invalid shake once, message unfolds, loading spinner, success stamp draws | form leaves, success panel enters |
| Footer | rise | none | none | none | none |

## Signature details
1. Live "Wheel 62 rpm" readout that drifts.
2. Throw checklist chips (Centre, Open, Pull, Shape) that light as you scroll.
3. Vessel stamp reference (`TN-XXXXXX`) hashed from the vessel's own spec, drawn as a check-in-ring stamp on success.
4. Step rail (01 Throw, 02 Shape, 03 Glaze) that follows the viewport.

## Do / Don't
- Do keep one accent (clay) and let celadon appear only on dark slabs and glaze.
- Do hide pre-reveal states only under `prefers-reduced-motion: no-preference`.
- Don't animate `width`, `height`, `top` or `box-shadow`; Don't write scroll or pointer values into React state.
- Don't mount WebGL under reduced motion.

## Files
`layout.tsx`; `tourne/` with `page.tsx`, `tourne.css`, `assets.tsx`, `brand/Logo.tsx`, `motion/` (math, hooks, Reveal, SplitText, Magnetic, TiltCard, Marquee, CountUp, ScrollEngine, SmoothScroll), `vessel/` (profile, forms, glazes, state, scene, canvas, editor, picker), `sections/`, `forms/` (validation, quote, reference, form). Tests sit beside the logic.

## Imagery
Two portraits (`potter-hana`, `potter-teo`) described in `docs/image-prompts/tourne.md`; labelled placeholders until generated. Everything else is SVG, CSS and 3D.
