# FRAME/ONE — Every frame has a story

## Requirements

A fictional director and photographer portfolio, implemented as an isolated Next.js 16 / React 19 / TypeScript route at `/templates/frameone`. All projects and credits are invented, with no real clients or awards. The primary action is “View the films”; the secondary action is “Start a project.” Use the existing `motion` or browser animation capabilities only where they make the experience clearer; no additional dependency is required.

## Concept

A director discovers a story on a contact sheet, so visitors navigate this portfolio by selecting a frame that expands into a film reel and returns to its original place. The sheet remains the navigation system, rather than becoming a conventional editorial gallery. This distinguishes it from OROVA and from CHINAGRAPH's scroll-edited fashion sheet.

## Palette

- Silver paper `#DED9CF`: sheet, note and proof surfaces.
- Deep espresso `#201D1E`: film rebate, dark stages and dark text.
- Projector red `#B13F32`: active cue, action marks and the slash.
- Muted cyan `#8DA7A9`: cool film accents and abstract image stand-ins.
- Cream `#F7F2E9`: reading surfaces and type on dark.

Derive tints with `color-mix()`; small text on silver uses espresso, since red does not meet body-text contrast there.

## Type

League Gothic is the condensed film-title sans. Crimson Pro carries old-style editorial prose and projected captions. Anonymous Pro is used for frame numbers, metadata and transport controls. Load through `next/font/google` using separate variables. Tailwind's `source(none)` keeps unused gallery-wide utility classes out of this isolated route.

## Layout

Slim perforated left rail; fixed bottom transport; a full-viewport sheet of 16 image cells and one larger blank headline cell on desktop. A two-column mosaic preserves the sheet on mobile. Below it: a selected-project widescreen reel, nonfiction / fiction / commercial switcher, staggered screenplay-style director notes, behind-the-scenes proof sheet, inquiry sheet and end credits. A short sticky film strip ties scroll progression to the selected work on capable desktop viewports.

## The mechanic

Each of the four fictional projects has two consistent stills, reused across 16 contact frames. Focus or hover on fine pointers previews the paired still without sound. Opening measures the clicked cell and moves a full-viewport stage from that rectangle using transform-only FLIP; the sheet shifts away in the background. Previous and next cycle through projects. Escape or close animates back to the original cell and restores focus. Dialog focus remains inside the viewer. Playback is a user-initiated, muted still sequence; phones never autoplay media. Reduced motion switches state without spatial travel.

## Motion

Personality: cinematic analog. Verbs: **expose** and **splice**. Signature moment: the selected frame expands into the viewer and returns to its exact origin.

Tokens: ease-out `cubic-bezier(.22,1,.36,1)`; splice `cubic-bezier(.76,0,.24,1)`; spring `linear(0,.34 10%,.85 28%,1.025 46%,1 100%)`; press 90 ms, cue 220 ms, state 500 ms, reveal 850 ms, initial sequence 1250 ms; stagger 65 ms.

| Area | Entrance | Scroll | Hover / focus | Press / state | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Rail and transport | leader and transport settle independently | progress indicator tracks the page | active cue and focus ring | control compresses | chrome remains reachable |
| Contact sheet | frames illuminate in a measured irregular sequence | sheet gives way to the reel | paired still and pointer scanline, never tile tilt | chosen frame expands | neighbors recede; frame returns to origin |
| Project viewer | shared frame expands | internal notes scroll normally | controls brighten and draw cue | next / previous splice the image; playback is opt-in | reverse transform; restore focus |
| Selected reel | image wipe and text mask | sticky frame with subtle parallax / progress | magnetic action, image brightens | open the same project viewer | leader strip hands into work index |
| Work switcher | title mask and staggered image reveals | project index advances through page | tabs draw their active indicator | directional content swap | shutter rule leads to notes |
| Director notes | rules draw and lines rise | staggered screenplay margins shift subtly | inline links underline | link press | paper edge meets proof sheet |
| Proof sheet | image crops expose in staggered order | restrained image parallax | fine-pointer tilt and tracked radial light | cards compress | dark leader leads to inquiry |
| Inquiry | form and stamp expose | progress mark follows section | magnetic submit and visible field focus | local validation; form changes into an unsent confirmation | end-credit rule draws |
| Footer | credits and wordmark enter in sequence | subtle credits drift | links underline | press feedback | finished page |

Only transform and opacity are updated continuously; section entrances are one-shot. Pointer work is fine-pointer only and batches direct transforms (and the magnetic control's CSS variables) with requestAnimationFrame. All spatial motion and loops stop with reduced motion; no-JavaScript content is fully visible.

## Signature details

Perforations, mono frame counters, red projector cues, cream projected subtitles, film-leader dividers and a persistent bottom transport repeat through the page.

## Do / Don't

Do preserve the responsive sheet, visible touch controls and exact focus restoration. Do make project titles and local form behavior explicit. Do not use tile tilt in the sheet, fake testimonials, real film titles as fictional credits, unmuted autoplay, hover-only controls or a network-backed form claim.

## Files

`sheet/` owns selection and viewer geometry; `motion/` owns progressive reveals and pointer behavior; `forms/` owns validation and the local inquiry; `sections/` composes the narrative; `brand/` owns the logo. `assets.tsx` renders responsive processed files or a labeled placeholder. Gallery registration and browser tests live in the existing repo locations.

## Imagery

The user will generate the images from `docs/image-prompts/frameone.md`. Eight 2.39:1 project stills, two 3:2 behind-the-scenes photographs, one 4:5 portrait and a square grain overlay are expected. Until supplied, every slot is an intentional labeled abstract exposure. Optional silent clips remain opt-in. Run `npm run images -- frameone` after delivery to produce responsive variants and inspect a contact sheet.
