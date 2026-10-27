# NIGHTLINE design

## Requirements

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Raw WebGL2 only for the moving window; no Three.js or 3D library.
- Native scroll remains the source of truth. Reduced-motion and touch use the same content in flow mode.
- A local booking form validates name, work email, and departure city without a network request.

## Concept

NIGHTLINE is a European sleeper-train booking brand for people who would rather spend a night moving than a day in an airport. **A sleeper train is a moving room, so the page becomes a rain-covered window and scroll is the speed of the journey.** The four chapters are Departure, Midnight, Border crossing, and Dawn.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| ink | `#081423` | deep blue ground and text on paper |
| deep | `#0D2238` | elevated carriage panels |
| paper | `#F4E8C1` | warm type and cabin section |
| amber | `#F4B65E` | route signal, links, focus and CTA |
| mist | `#A7B4C7` | quiet copy and secondary chrome |
| rose | `#C97972` | validation and rare dawn detail |

Tints use `color-mix()` from these six colours. WebGL light is atmospheric content, not UI chrome.

## Type

Instrument Serif 400 is display type for the long, italic turn in headlines. DM Sans carries readable body copy. IBM Plex Mono handles station times, route labels, and buttons. The variables are `--font-instrument-serif`, `--font-dm-sans`, and `--font-ibm-plex-mono`.

## Layout

The fixed header is a narrow timetable rail. Sections are full-viewport stories with generous horizontal gutters. On desktop the WebGL canvas sits behind the DOM. On phones sections stack naturally and the station rail becomes a horizontal strip.

## Mechanic

`RainWindow.tsx` compiles one WebGL2 full-screen fragment shader. It draws deep-blue atmospheric noise, defocused amber city signals, rain lines, and a slow fog pulse. `scroll` is passed as a uniform from a single rAF listener; pointer position changes the fog's direction. If WebGL2 is missing, the content remains complete over the CSS fallback surface. The pure `stationAt` and `windowOffset` functions keep route state testable.

## Motion

**Identity:** technical / cinematic. **Verbs:** scan and settle. Easing uses the `--ease-nl-out`, `--ease-nl-in-out`, and `--ease-nl-spring` tokens; durations are 90ms press, 180ms hover, 420ms state, 800ms reveal, and 1200ms hero.

**Signature moment:** the visitor's cursor acts like a cloth on the glass: fog clears around it while amber city lights slip past, then the condensation slowly returns.

| Section / component | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Header | mark and links settle from above | backdrop stays fixed; route follows page | links turn amber | CTA compresses | border hands to hero |
| Hero | label, mask headline, lead, CTA and stamp choreograph | shader scroll uniform changes city speed | CTA arrow travels | pill scales to .97 | copy dims into line |
| Journey | station cards rise and rail draws | active station follows progress | rail expands active rule | hash links jump to station | deep-blue field hands to paper |
| Cabins | cards cascade | window rain continues | tilt, lift and spotlight | berth link presses | paper field hands to midnight |
| Midnight | title mask, specs draw | city/noise shader breathes | text link underline | specs settle | texture darkens into map |
| Border | route line and dots draw | map stays pinned by layout | route dots brighten | station links focus | map line leads into dawn |
| Dawn | metrics count up | no competing scrub system | links retain underline | numbers resolve | amber field settles into desk |
| Booking | form clip-wipes in | fixed window remains | labels and focus lines draw | loading then success replacement | success card lifts to footer |
| Footer | marquee enters | one slow marquee | links underline | back link jumps | document ends quietly |

Reveal vocabulary includes mask-rise, clip wipe, short rise, cascaded cards, drawn rules, and count-up numbers. Reduced motion removes the shader, marquee, smooth scroll, tilt, and pre-reveal hiding; no-JS uses the noscript override.

## Signature details

1. A station rail that lights the active chapter.
2. Timetable copy on every important handoff.
3. Window rectangles and rain marks repeated across hero, cabin cards, and the board.
4. The route map moves from paper to deep blue to dawn amber.

## Do / Don't

- Do keep the page quiet, specific, and generous.
- Do let the window carry the drama while the DOM carries the words.
- Don't add gradients as decoration outside the atmospheric shader.
- Don't hide copy behind JavaScript, hijack Space/Enter, or use hover as the only affordance.

## Files

`layout.tsx`, `nightline.css`, `page.tsx`, `brand/Logo.tsx`, `journey/RainWindow.tsx`, `journey/journey.ts`, `content/stations.ts`, `content/cabins.ts`, `motion/*`, `sections/*`, `forms/*`, `assets.tsx`, `assets.generated.ts`, `icon.svg`, and `opengraph-image.tsx` form the copy unit. The template imports no shared application files.

## Imagery

The template supports responsive photography delivered via `npm run images -- nightline` and `<Picture>` in `assets.tsx`. Prompts live in `docs/image-prompts/nightline.md` for the rain-window still, cabin details, amber station lights, and dawn platform. When external media is absent, styled window placeholders and the WebGL rain shader carry the visual story.
