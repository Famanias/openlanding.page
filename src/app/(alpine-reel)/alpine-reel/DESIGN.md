# Alpine Reel

## Requirements

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.
- A full viewport horizontal reel containing the fourteen eight-thousanders from the supplied spec.
- Wheel, trackpad, drag, edge-zone taps, keyboard arrows and clickable pips all move one snap-based deck.
- The active frame opens a detail dossier that tilts the frame metaphorically through a door and slides in from the right.
- All fourteen peak stills are local, generated from `docs/image-prompts/alpine-reel.md`. The gallery preview is local and palette-safe.
- `prefers-reduced-motion` removes the entrance, cursor, parallax and ambient scanlines while leaving every frame readable.

## Concept

The world’s highest peaks are a film reel, so the page makes lateral movement the navigation and lets one frame swing open into a field dossier.

Brand story: Alpine Reel is a fictional moving index for people who read mountains as records of weather, geology and first ascent. It is exact, cold and cinematic.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| Abyss | `#040B16` | full-bleed ground, dark type and vignette |
| Navy | `#08162A` | secondary field, panel surface and image tint |
| Ice | `#6EA8D2` | active title line, cursor chevron and live readout |
| Snow | `#FFFFFF` | primary type, active pip and star state |

All component colours reference the tokens in `alpine-reel.css`. Tints are generated with `color-mix()`.

## Type

- Playfair Display 400/500/600/700, loaded through `next/font/google`, is the display voice for peak names, years, quotes and dossier prose.
- Geist 400/500/600 is the body face for operational copy.
- Geist Mono 400/500 is the utility face for ranges, coordinates, counters and labels.
- Display type scales from `clamp(2rem, 6.4dvh, 3.7rem)` on phones to `clamp(3.25rem, 9.2dvh, 9rem)` on desktop so headlines stay inside the first viewport.

## Layout

The reel is a `100dvh` stage with a 7.5dvh vertical frame on desktop and 2dvh on phones. Each slide is 80vw wide with a 5vw gap. The track starts on K2 in the middle copy, sweeps one full deck loop to Mount Everest, then springs to a target slot. Five copies of the fourteen peaks keep the deck visually continuous; after a loop the slot is normalized back to the middle copy.

## Mechanic

`mechanic/deck.ts` owns the pure math: wrapped indexes, `targetX`, the 0.11 spring step, 14% drag threshold, 1.2x image parallax and smooth content progress. `sections/CinemaReel.tsx` owns pointer input, wheel direction, keyboard input, the three-second entrance (a 13-slide `power3.out` sweep from K2 to the next copy's Everest, folded back to the middle copy on landing; horizontal SVG blur on the `.arl-stage` wrapper and vertical scanlines both follow the sweep's velocity, and all slide content stays at opacity 0 until it lands), custom cursor and the detail panel. Opening a dossier sets `data-open` on the active slide, which swings its frame `rotateY(15deg)` from the left edge. The panel is a scroll-contained `aside`, so wheel and touch input never chain into the deck while it is open.

## Motion

Personality: precise and cinematic. Verbs: **snap**, **whip**, **settle**. The signature moment is the active frame’s `rotateY(15deg)` door swing as the peak dossier enters.

Tokens: 180ms micro/state, 420ms settle, 700ms door, 900ms content reveal. Easing uses `cubic-bezier(0.16, 1, 0.3, 1)` for pointer response, `cubic-bezier(0.22, 1, 0.36, 1)` for the door and `cubic-bezier(0.65, 0, 0.35, 1)` for braking.

| Section / component | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Reel stage | three-second horizontal whip, blur and scanlines | wheel and trackpad delta move the target | cursor label changes in edge zones | drag commits at 14%; arrow keys advance | normalizes to the middle loop copy |
| Peak frame | image is visible before content; mask, blur and offset clear near center | image moves at 1/1.2 of slide speed | Explore lifts and its chevron travels | button compresses to 0.96 scale | door tilt gives the panel a hinge |
| Indicator | pips swell to active size | active pip follows the slot | focus ring is immediate | pip jumps to a named peak | fades while dossier is open |
| Detail dossier | backdrop and panel slide over 600/700ms | internal scroll only | close button rotates 90° | Escape, backdrop, X and edge tap close | panel exits past the right gutter |
| Cursor | appears on pointer entry | lerps with pointer position | left/right chevrons appear in edge masks | press scales the ring | fades on leave |

Reduced motion leaves the deck at Everest, disables image parallax, cursor, scanlines and entrance timing, and keeps the dossier as a direct state change. No content is hidden for no-JS users: the default CSS shows all frame content before the client enhancement flag exists.

## Signature details

1. A 104px circular cursor with a word-to-chevron state change.
2. A 14-pip counter that reads as a film contact sheet.
3. A 1.2x parallax image wrapper behind each 80vw frame.
4. A live bottom-right altitude readout for the active peak.

## Do / Don’t

- Do keep cold blue and snow as the only visual temperature.
- Do let the deck move as one physical object.
- Do keep labels short and factual: range, first ascent, elevation, coordinates.
- Don’t add generic feature cards, invented testimonials, logos or marketing metrics.
- Don’t use gradients outside the glacial vignette and panel depth treatment.
- Don’t rely on hover: edge taps and the touch-safe panel provide the phone path.

## Files

- `layout.tsx`, `page.tsx`, `alpine-reel.css`
- `sections/CinemaReel.tsx`
- `slides/data.ts`
- `mechanic/deck.ts` and `deck.test.ts`
- `motion/math.ts`, `math.test.ts`, `Reveal.tsx`, `useInView.ts`, `useReducedMotion.ts`
- `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx`, `assets.tsx`

## Imagery

All fourteen stills are local 16:9 frames (`public/templates/alpine-reel/<peak-id>-800.webp` and `-1600.webp`, plus AVIF), named after the peak `id` in `slides/data.ts` and served through `srcSet`. The sources are 1376 × 768, so the `-1600` files are capped at 1376 wide and `slideImage()` advertises that real width from `assets.generated.ts`. `object-fit: cover` crops them to the 120vw wrapper. Only K2 and Everest load eagerly; the rest of the sweep path is switched to eager once the window `load` event fires, so it never competes with the first paint. Prompts and the summit-centred composition rules are in `docs/image-prompts/alpine-reel.md`; to replace a frame, put the raw file in `assets/incoming/alpine-reel/` under the same name and run `npm run images -- alpine-reel`. The `imageId` field in `slides/data.ts` is the original brief's Unsplash ID and is no longer used.
