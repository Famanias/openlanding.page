# Mio Hazuki — little worlds, made just for you

## Requirements
A complete fictional digital artist commission portfolio at `/mio`, isolated in its route group. Next.js 16.4, React 19, TypeScript, Tailwind v4. Install with `npm i next react react-dom lenis`. The user approved the proposed concept and explicitly instructed building immediately, waiving the brand board. Original fully coded 2D scenery, no 3D, raster art, generated media, copied characters, or existing studio branding. Invented artist identity and sample pricing were explicitly requested.

## Concept
Every commission starts with a small wish, so scrolling lifts a paper lantern from an artist's seaside window and carries its warmth into the commission invitation. An evening harbor gives way to an open sketchbook of original worlds. The primary conversion is a commission brief, supported by work details, personal context, transparent scope and pricing.

## Palette
Eight colors: ink `#232C49`, paper `#F5EFE4`, hydrangea `#A8B1D1`, sea `#526D89`, apricot `#EDAD83`, coral `#BC6268`, plum `#654C65`, cloud `#D8CAD9`. Ink on paper, paper on ink, and ink on apricot carry readable text. Small secondary type uses ink mixes of at least 75%. Other illustration shades use these eight colors through SVG gradients or CSS color-mix. No palette exemptions.

## Type
Kaisei Decol 400/500 display (preload false); Karla 400/500/600 body; Inconsolata 400/500 for prices and work dates. All next/font/google, uniquely named variables. Headline 46–88px, section headings 36–60px, body 17–19px. Serif display stays roman. Sparse short Japanese labels only, with English context. Explicit headline breaks and reserved image aspect ratios prevent shifts.

## Layout
Full-bleed illustrated harbor, with left-set title and the studio on the right. A slim welcoming header sits within the sky. Paper content follows through an organic shoreline contour. Four staggered artwork plates, a personal sketchbook spread, three clearly compared commission scopes, a four-stage process, and a dark harbor invitation. 1240px content width, 24–80px gutters. No nested cards. Editorial columns collapse naturally at 760px. The mobile hero repositions the scene to keep the studio visible below readable text.

## Footer
A link grid (logo, tagline and availability note, Explore and Commissions columns) and a bottom row sit on paper above `harbor/FooterScene.tsx`, a full-width original SVG viewBox 1600×400 with `xMidYMax slice`, masked to fade up out of the paper. The story continues from the hero: a quiet seaside village with warm lit windows, a lighthouse, sailboat, blossoming trees and coral flowers, with the paper lantern now floating above the roofs. The key subjects sit in the central 500–1100 units so the phone crop (190px tall) still shows village, lantern and lighthouse. Only the eight palette colors via CSS variables; gradient ids are prefixed `mh-foot-`.

## Lantern mechanic
Hero progress is clamp(scrollY / heroHeight, 0, 1). The lantern rises 170 units and drifts 45 SVG units as progress increases, with a final soft rotation. Three landscape layers use modest transform-only offsets. A page-edge progress line recalls the lantern's string. The commission success panel releases a lantern into a small harbor. Pure progress and lantern pose functions have behavioral tests. A scene toggle pauses all ambient motion and freezes scroll effects; reduced-motion does the same. No information depends on movement.

## Motion
Organic / analog; verbs **sway** and **unfurl**. Signature moment: the studio's paper lantern lifts above the evening sea on scroll. Easing tokens: out cubic-bezier(.23,1,.32,1), expo cubic-bezier(.16,1,.3,1), in-out cubic-bezier(.77,0,.175,1), spring linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1). Durations 90, 180, 420, 800, 1200ms. Stagger 70ms, reveal shift 24px. Ambient periods 12, 18, 24s, at most three moving groups. One shared RAF for scroll writes, with cached geometry; Lenis only for fine desktop pointers. Reveals remain visible until JS attaches an observer; no-JS and reduced-motion are fully finished.

| Element | Enter | Scroll-linked | Hover / focus | Press / state | Exit / handoff |
|---|---|---|---|---|---|
| Header, logo, navigation | staggered downward settle | ink/paper surface after 70px; chapter indicator | drawn underline and ring | native menu disclosure, scale press | menu closes on anchor or Escape |
| Hero, headline, CTA | scene settle, line masks, copy and action stagger | three 2D layers and rising lantern | arrow translation and fill wipe | spring press | shoreline overlaps illustration |
| Harbor, ambient controls | immediately readable scene | lantern pose from tested math | pause control ring and label | pause freezes both scroll and idle motion | observer pauses offscreen; hidden tab pauses |
| Works / artwork buttons | wipe, alternating cascade | vertical offsets in editorial layout | image scale, plate lift, caption arrow | work details dialog with restored focus | reverse dialog opacity / transform |
| Artwork dialog | image unfurl and caption settle | internal native scrolling only | close and inquiry link underline | Escape, close, backdrop; CTA preselect | native dialog releases focus |
| About / sketchbook | drawn line, portrait wipe, masked heading | neighboring paper edge overlaps | text links draw | anchor press | ruled divider draws into pricing |
| Commission scopes | staggered scale / rise | progress line continues | lift and button wipe | selected scope prefilled in inquiry | same-page anchor handoff |
| Process | individual line draws and rising text | sequence revealed in reading order | native focus on related inquiry links | standard press feedback | paper-to-ink shoreline |
| Inquiry / form | heading mask, field cascade | final progress line lands here | rings, label tint, button wipe | error shake, loading, success lantern | success panel replaces form and receives focus |
| FAQ | line draw | in-view only | summary underline and plus turn | native disclosure with grid unfurl | reversible close |
| Footer, closing scene | rule draw, staggered column rise | progress finishes; scene fades up out of the paper | link underline draw, arrow nudge | press scale .97 | clouds drift, lantern bobs, foreground sways; all paused offscreen, in a hidden tab, with the scene toggle, and under reduced motion |
| Reveal / SmoothScroll | visibility progressive enhancement | native / Lenis fine pointer only | inherited semantics | motion preference change tears down | RAF, listeners, observers cleaned up |

## Signature details
Lantern-and-wave logo, handwritten SVG orbit strokes, little apricot stars, Japanese/English work annotations, scalloped shoreline transitions, signed artist note, warm windows against cool evening water.

## Do / Don't
Do give artwork and commission facts room; use original Japanese animation inspired scenery and independent original characters. Do label sample works, prices, availability and the local-only inquiry honestly. Do not suggest real clients, awards, completed sales or a sent message. Do not use 3D transforms, tilt, video, generated assets, copied layouts, copyrighted characters or hover-only information.

## Files
Root font/metadata layout; server page and sections; `brand/` SVG marks; `harbor/` original SVG and pure lantern math; `art/` independent original SVG works and artist portrait; typed `data.ts`; `motion/` math, observer/director, smooth scroll and reveal wrappers; `forms/` validation and inquiry; `works/` accessible detail dialog; icon and Open Graph. Gallery and copy bundle metadata include this template.

## Imagery
All finished imagery is original inline SVG authored in code. `assets.tsx` maps artwork keys to these illustrations; no external downloads, image API keys, pending media or placeholders are required. Media direction is documented at `docs/image-prompts/mio.md` for optional future art replacement, never for the hero.
