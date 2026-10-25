# NULO — design specification

## Requirements

- Route: `/nulo`, isolated under `src/app/(nulo)/nulo/`.
- Fictional optical lab for screen-heavy city workers. The page demonstrates a tactile calibration configurator rather than a generic product grid.
- No photographs or video. Visuals are inline SVG, CSS, and a CSS 3D lens stack.
- All interactive controls work with pointer, keyboard, focus-visible states, and touch; the form never sends a network request.
- Reduced motion and no-JavaScript states render the complete page with the dial resting in its screen position.

## Concept

NULO makes modular prescription frames that adapt to the way a person moves through a day. **An optical lab is a calibration bench, so the page becomes a focus dial: drag the lens ring to tune a mode and watch the selected frame settle into alignment.**

The page is for people who want a considered frame without the clinical coldness of a typical eyewear site. The voice is brief, observant, and quietly technical: “low glare”, “true colour”, “edge lift”, “measured in motion”.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--nulo-paper` | `#F5F8F4` | frosted paper canvas |
| `--nulo-ink` | `#14232B` | body copy, outlines, deep panels |
| `--nulo-lilac` | `#B8B3FF` | screen calibration field and focus bloom |
| `--nulo-peach` | `#FFB49D` | street marker and action warmth |
| `--nulo-mint` | `#9ADBD1` | night marker, success state and rare signal |

Tints are made with `color-mix()` from these values. Lilac, peach and mint are fills, strokes, badges, and large fields; small text uses ink for contrast.

## Type

- Display: `DM_Mono` in a wide, measured uppercase scale. It makes the instrument readout feel engineered without becoming a dashboard.
- Body: `Plus_Jakarta_Sans` for approachable copy and form labels.
- Utility: `Space_Mono` for measurements, coordinates, and status codes.
- Headline sizes use `clamp()` and never rely on a single viewport width.

## Layout

The page is one long calibrated sheet. The hero reserves a 92vh instrument stage, then the paper slides into a shallow calibration band. The following sections use alternating two-column layouts and full-bleed ruled panels so the dial setting keeps echoing through the page. At 820px and below, the stage becomes a stacked instrument, frame cards become a snap-friendly horizontal rail, and the form becomes one column.

## The mechanic: focus dial (`calibration/`)

`geometry.ts` is the pure source of truth. A revolution has three equal sectors: screen, street, and night. Pointer movement maps to a degree value, the nearest 120-degree marker is used for the mode readout, and the active lens uses that mode's aperture and transmission values. `CalibrationDial.tsx` owns pointer capture and keyboard arrow keys; it writes CSS custom properties for rotation and aperture while React state only stores the current resting mode.

The visual instrument is a layered SVG lens with CSS perspective. The dial is draggable, but the three mode buttons provide a direct accessible path. The same mode is echoed in the frame index, material stack, and fitting form.

## Motion

**Identity:** organic / analog. **Verbs:** *tune* and *settle*. **Signature moment:** the user drags the focus ring; the aperture breathes open, the active frame rotates through a refractive field, and the status row locks with a soft spring.

Tokens live in `nulo.css`: `--nulo-ease-out`, `--nulo-ease-spring`, `--nulo-dur-fast`, `--nulo-dur-base`, `--nulo-dur-slow`, `--nulo-dur-hero`, `--nulo-shift`, and `--nulo-stagger`. Motion uses transforms, opacity, clip-path, and SVG stroke offsets. Hidden states exist only under `html[data-nulo-motion="live"]`; a `noscript` rule and reduced-motion branch keep all content visible.

### Motion map

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Header | logo and status cells stagger down | compacts and fills the progress rail | active dot slides, links underline | menu button rotates into a cross | hides while the hero is leaving |
| Hero copy | mask-rise headline, readout rises, CTA pops | instrument scales down and paper band lifts over it | dial glow follows the pointer | ring compresses then springs to its marker | stage dims into the calibration band |
| Focus dial | rings draw, lens stack rotates into place | CSS `--nulo-scroll` nudges the parallax halo | ring brightens and tick marks breathe | drag/arrow updates mode and locks readout | settles on the chosen marker |
| Calibration modes | three cells cascade and count labels rise | active mode underline follows dial | buttons tint on focus | selecting a mode snaps the dial | panel hands off to frame index |
| Frame index | cards clip-wipe from their ruled cells | horizontal rail parallax on desktop | cards tilt 4deg, lens sheen follows pointer | card presses down and sets the fitting frame | cards dim as materials arrive |
| Materials | layers slide in from their cut lines | stacked glass rotates 3deg with scroll | layer labels brighten | selected layer lifts 4px | cutaway folds into protocol |
| Fit protocol | ruled line draws; steps cascade | progress dots fill by section entry | step markers pulse on focus | active marker pops | final dot becomes form cue |
| Fitting form | card scales in, labels rise | none | focus ring draws, submit plate wipes | invalid fields shake once; submit morphs to three dots; success stamps in | reset returns to idle |
| Footer | columns cascade | signal line drifts slowly | underlines draw | links press inward | none |

Ambient life is limited to the hero halo, the status rail, and one off-screen marquee; all pause when their section leaves the viewport. Fine-pointer tilt and the halo are disabled on touch and under reduced motion.

## Signature details

1. Three calibration status cells (`SCREEN / STREET / NIGHT`) repeat in the header, dial, and form.
2. A focus ring with a tiny index mark replaces a generic carousel indicator.
3. A translucent “measured in motion” strip and ruled measurement ticks appear at every section handoff.
4. Material layers are named like lab samples (`L-01`, `AR-02`, `F-03`) and lift as the user hovers.
5. Success is a green calibration stamp with a stable `NU-XXXX` reference.

## Do / Don't

- Do keep the dial values in `geometry.ts`; components read its output rather than inventing their own angles.
- Do make the mode buttons and keyboard controls equivalent to dragging.
- Do use color for fields and fills, with ink for small text.
- Do reserve the spring for calibration and form success; the rest is measured and quiet.
- Don't add photography, stock icons, or a generic testimonial carousel.
- Don't put React state on the scroll or pointer path; pointer values write CSS variables in one frame.
- Don't hide content for no-JS or reduced motion.

## Files

```
(nulo)/layout.tsx
nulo/page.tsx
nulo/nulo.css
nulo/brand/Logo.tsx, icon.svg, opengraph-image.tsx
nulo/assets.tsx, assets.generated.ts
nulo/content/frames.ts, protocol.ts (+ tests)
nulo/calibration/geometry.ts (+ test), CalibrationDial.tsx
nulo/forms/fitting.ts (+ test), FittingForm.tsx
nulo/motion/math.ts (+ test), useReducedMotion.ts, Reveals.tsx, ScrollVars.tsx, SmoothScroll.tsx
nulo/sections/Header.tsx, Hero.tsx, Calibration.tsx, Frames.tsx, Materials.tsx, Protocol.tsx, Fitting.tsx, Footer.tsx
tests/e2e/nulo.spec.ts
```

## Imagery

No raster images are required. The optical instrument, frame silhouettes, lens sheen, and measurement marks are inline SVG and CSS. `docs/image-prompts/nulo.md` records the decision so a future art pass can add optional stills without changing the layout contract.
