# AFTERCART — Shopify care after launch

## Requirements

AFTERCART is a fictional care partner for small, owner-led Shopify shops. The page sells ongoing store improvements, fixes, and growth support. The primary action is a 20-minute care call. The form is a local demo and never sends data.

## Concept

A shop is a living system, so the page is a pastel store health console whose signals rebalance as visitors explore the care tracks. Conversion, merchandising, speed, and retention are the four tracks. The console is the page's signature mechanic and every section uses care language: readout, signal, ticket, work log, and rhythm.

## Palette

Ink `#4C4668`, paper `#FFF7F3`, lilac `#DCCFF4`, mint `#BFE7D3`, peach `#FFCCB8`, butter `#F5E8A7`, and sky `#BFD8F0`. Ink on paper and paper on ink are the text pairings. Pastel surfaces use palette colors and `color-mix()` tints.

## Type

Manrope 700/800 is display, Inter Tight 400/500/600 is body, and JetBrains Mono 400/500 is utility. They load through `next/font/google` with distinct variables in `layout.tsx`. Display type is fluid with `clamp()` and utility labels stay small and uppercase.

## Layout

The page has a warm paper dot-grid canvas, a sticky status header, a two-column hero, an interactive health section, four care-track cards, a work log, a dark care rhythm, a booking section, FAQ, and a concise footer. Rounded corners are 6–10px for cards and 16–18px for the console. The layout collapses to one column at 980px and keeps all controls full-width and touch-friendly at 680px.

## The mechanic

`console/health.ts` exports `TRACKS`, `INITIAL_HEALTH`, `selectTrack(state, id)`, `getTrack(id)`, and `getHealthSnapshot(state)`. Track selection is pure, typed, and ignores unknown ids. `HealthConsole.tsx` renders semantic buttons and uses an `aria-live` console. The current score drives the ring's `--ac-score` custom property, signal levels, status sentence, and work-log ticket. The server render includes the complete copy so no-JS users see the finished fallback.

## Motion

Identity: expressive technical/cinematic. Verbs: **scan** and **reveal**. Signature moment: selecting a care track rebalances the ring, signal bars, status text, and ticket.

Tokens: ease-out `cubic-bezier(.23,1,.32,1)`, expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.77,0,.175,1)`, spring `linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1)`, durations 90/180/420/800/1200ms, reveal shift 28px, stagger 70ms.

| Element | Enter | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | Staggered logo/nav drop | Sticky compression by scroll vars | Underline draws | Menu opens with a bounded panel | Hero hands to console |
| Hero | Masked headline, rising copy, console scale settle | Small console drift and progress line | CTA fill wipe, preview lift | Buttons scale .97 | Console scales into health section |
| Health console | Panel wipe and signal draw | Section progress line | Track lifts and indicator shifts | Ring, bars, ticket and live copy update | Dark console hands to paper log |
| Care tracks | Staggered rise/scale | Small depth offsets | Cards lift, arrows nudge | Active card changes pastel surface | Last card hands to rhythm |
| Work log | Rule draw, row rises | One in-view reveal | Ticket border brightens | Status label settles | Paper hands to dark rhythm |
| Rhythm | Three steps rise and dots draw | None | Step surface lifts | Marker snaps | Dark strip hands to booking |
| Booking form | Fields and button rise | Sticky progress only | Inputs nudge, button wipes | Error nudge, loading, success stamp | Form swaps to success panel |
| FAQ/footer | Rules draw | None | Summary arrow rotates, links underline | Native details open | Final rule closes the page |

Reduced motion removes loops, parallax, smooth scroll, and hidden reveal states. No-JS leaves all content visible because hiding only applies after the `ac-js` class is attached. Hover effects are paired with press and focus behavior.

## Signature details

`STORE HEALTH / 04 SIGNALS`, case `026`, status ring, pastel signal bars, and the active work-log ticket recur across the page. The copy uses precise service language without invented claims or client proof.

## Do / Don't

Do keep the console readable, use explicit states, use original inline SVG/CSS interface art, and let one care call carry the conversion. Do not use Shopify's mark, imply a real integration, invent outcomes, or hide information behind hover.

## Files

`layout.tsx`, `aftercart.css`, `brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx`, `assets.tsx`, `console/health.ts`, `console/HealthConsole.tsx`, `forms/booking.ts`, `forms/BookingForm.tsx`, `motion/`, and `sections/` form the copy unit. Tests sit next to the pure modules; the browser test is `tests/e2e/aftercart.spec.ts`.

## Imagery

No photos or video are required. The page uses original CSS and SVG interface illustration. Optional replacement art prompts live in `docs/image-video-prompts/aftercart.md`; raw replacements would belong in `assets/incoming/aftercart/` and should be processed through the repo image pipeline.
