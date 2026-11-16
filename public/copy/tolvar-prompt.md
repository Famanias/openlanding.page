# Prompt: rebuild "TOLVAR EARTHWORKS" (an excavating contractor's site sorted by where the dirt goes)

Paste everything below the line into your AI coding agent.

---

Build an isolated Next.js 16 (App Router) / React 19 / TypeScript / Tailwind v4 landing page at `/tolvar` for **Tolvar Earthworks**, a fictional family-run excavating, grading and hauling company in Aitkin, Minnesota (est. 2002, owner-operator Dale Tolvar). The only extra package is `lenis`. Everything lives in `src/app/(tolvar)/` and imports nothing from outside it.

## The idea

Every job is dirt going somewhere, so the page sorts everything by the four ways dirt moves: **Cut, Fill, Pipe, Haul**. The services are four tabs, the photo job log filters by the same four, and the estimate form asks which of the four your job is. Slogan and h1: "Dig it right. Move it once."

## Brand

- Palette (use only these; make tints with `color-mix()`): diesel `#1B1A17` (ink, dark slabs), limestone `#ECE7DC` (page), chalk `#F8F5EE` (cards), blade `#F2B31B` (the only accent: a fill behind diesel type, or type on dark; never text on limestone), topsoil `#2F261E` (job log, footer), clay `#9A4A2B` (form errors only), gravel `#6A645A` (muted text), locate blue `#1F5FA8` (pipe flags only).
- Type via `next/font/google`: Sofia Sans Extra Condensed 800/900 uppercase for display and buttons, Work Sans for body, B612 Mono uppercase and tracked for eyebrows, tickets and readouts.
- Logo: a slab of ground with a rectangular notch dug out, and the same-sized block set down on grade beside it in yellow. Wordmark TOLVAR with EARTHWORKS spaced out beneath.
- Corners 2 px. Flat colour, no gradients. Voice: plainspoken, numbers first, says "dirt".
- Signature details: a spirit-level bar across the top whose bubble is scroll progress; civil-drawing section hatches (earth, gravel, rock) as dividers; dashed mono "load tickets"; a white dashed marking-paint outline around the hero photo; blue locate flags on pipe work.

## Sections

1. **Header:** level bar, logo, nav (The work, Job log, The yard, About, Crew), phone chip `(218) 555-0142`, "Free estimate" button. Hides on scroll down, returns on scroll up. One marker slides to the section being read. Full-screen phone menu with a focus trap and scroll lock.
2. **Hero:** diesel slab, two-line headline, lede, two buttons, two tickets ("Free estimates", "Licensed & insured"), a photo in the right half with a yellow job tag, a yellow grade line across the bottom.
3. **Ticker:** a yellow band of all 20 service names, drifting.
4. **The work:** "Dirt only moves four ways." Four tabs with a sliding yellow marker; each panel has a photo, a verb headline ("Dig it out.", "Build it up.", "Lay it in.", "Truck it."), a blurb, its services with one line each, and a "Get ___ work quoted" button that pre-selects that kind in the form. Services: Cut (Basements, Footers, Piers, Ponds & Waterfalls, Demolition, Clearing), Fill (Building Pads, Terraces, Yard Grades, Top Soil, Rock Walls, Excavating & Grading), Pipe (Water Lines, Storm Drains, Underground Utilities, Drainage Improvements), Haul (Hauling, Trucking Services, Dirt Work, Concrete).
5. **Job log:** topsoil slab, filter chips (All, Cut, Fill, Pipe, Haul, Built on it) with counts, a multi-column grid of 22 photo tickets (job number, kind, title), and a native `<dialog>` viewer with previous, next, close and arrow keys.
6. **The yard:** "We own the iron." Three photos and a fleet table (quantity, unit, size, what it does), ten units.
7. **About:** owner photo and story, three tickets, four count-up stats (25 years in the seat, 20 kinds of work, 10 machines, 3 counties).
8. **Crew:** diesel slab, "Three seats open." Accordion of Laborer, Operator, Foreman with requirements; terms; mailto button.
9. **Estimate:** phones, email, address (4410 Tamarack Pit Road, Aitkin, MN 56431), hours, counties, an 811 note; a form with kind-of-work chips, first name, last name, email, mobile phone (all required), company and comments. Local validation, a short "writing the ticket" state, then a ticket confirmation. No network request.
10. **Footer:** hatch strip, oversized "Move it once.", nav, contacts, a line saying the company is fictional.

## Motion

Weighted, like iron. Two verbs: **push** (things arrive sideways like a blade pass: clip-path photo wipes, button fills, tab panels, the phone menu) and **drop** (things land from above and settle slightly past level: cards, tickets, tiles). Tokens in `@theme`: `--ease-out: cubic-bezier(0.2, 0.9, 0.25, 1)`, `--ease-in-out: cubic-bezier(0.7, 0, 0.2, 1)`, a `linear()` settle curve that overshoots to 1.05, durations 90 / 160 / 380 / 700 / 1100 ms, stagger 60 ms.

- Hero load sequence in CSS keyframes (runs before hydration): photo wipe, nav items drop, headline lines rise through masks, copy and buttons rise, tickets drop, grade line draws.
- Reveals toggle `data-in` from one shared IntersectionObserver; variants `lines`, `push`, `drop`, `rise`, `slide`, `draw`, plus count-ups. Clip the children of a wiped element, not the observed element.
- One rAF-throttled scroll listener writes `--tv-progress` (level bubble), `--tv-hero` (5% photo drift), the header's `data-state` and the nav marker position. No React state on scroll.
- Tabs: all panels stay mounted in one grid cell; `data-state` of `active`, `before` or `after` slides them, so a change can reverse mid-flight.
- Hover (fine pointers only): buttons fill from the left, tiles lift while the others dim, stat cards lift with a pointer-following glow, link underlines draw in from the left and leave to the right, the primary hero button is magnetic. Every press drops 2 to 3 px and springs back.
- Accordion height animates through `grid-template-rows`. Invalid fields shake once. The sent form wipes out and the ticket drops in.
- Lenis smooth scroll on fine pointers only, loaded on idle.

## Guardrails

- Hidden pre-reveal states exist only under `prefers-reduced-motion: no-preference`; add a `<noscript>` style that shows everything and lays out all four panels. With reduced motion Lenis never loads.
- One `h1`, real buttons and links, a proper `tablist`, `aria-live` on the job count, AA contrast, visible focus rings (a diesel outline inside a yellow ring).
- Pure logic in tested `.ts` files: tab keys and panel state, job filtering and index stepping, form validation, scroll maths.
- Images through a responsive `<picture>` (AVIF and WebP, width and height set). Only the hero photo is eager. Keep photos at or below their native width.
- Animate `transform`, `opacity` and `clip-path` only. No layout shift.
