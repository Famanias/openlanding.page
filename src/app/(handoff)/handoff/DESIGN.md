# HANDOFF design

## Requirements
A conversion landing page for small businesses that need help qualifying and managing the work they can actually take on. The primary action is a short local-only fit brief.

## Concept
Good work gets lost between interest and capacity, so the page turns a visitor brief into a visible route: inquiry, qualified, matched, managed, done.

## Palette
Paper `#F7F6F1`, ink `#171817`, dark ink `#202320`, signal orange `#F35B2A`, route blue `#9BC9D8`, pass green `#9CB99C`, line `#D9D7CF`, muted `#6C6D67`, white `#FFFFFF`.

## Type
DM Serif Display for editorial headlines; Geist for body; Geist Mono for route labels and status readouts.

## Layout
Builder-friendly 12-column sections with visible eyebrows, hairlines, CMS-like cards, 6px corners and a sticky header. The dotted paper canvas echoes the supplied reference without copying its brand or imagery.

## Mechanic
`Pipeline.tsx` uses an IntersectionObserver to make the active stage and ticket follow the user's scroll. Stages are stable content blocks so the template remains useful in Webflow or WordPress.

## Motion
Technical/cinematic. Verbs: scan, handoff. Hero uses a staged rise and dispatch desk settle. Pipeline stages dim and activate as the route advances; cards lift on hover; the progress rail fills with the active stage. Reduced motion removes all transforms and loops.

## Signature details
1. `SECTION / 0X` mono eyebrows.
2. Dispatch desk with route dots, operator ticket and terminal readout.
3. Pipeline status counter and active brief ticket.
4. Builder cues: `WEBFLOW READY`, `CMS-LIKE BLOCKS`, `NO LOCK-IN`.

## Do / Don't
Do preserve the warm dotted canvas, serif headlines, orange action colour, and clear CTA. Don't introduce stock photos, real company marks, gradients, or a generic SaaS dashboard.

## Files
The page is composed from `sections/`, `brand/`, `forms/`, and `motion/`. The form validates locally and never sends a request.

## Imagery
No external photos are required. The dispatch desk is CSS and SVG-like DOM geometry so the copy unit works without media files.
