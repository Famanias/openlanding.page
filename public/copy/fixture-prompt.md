# Prompt: rebuild "FIXTURE" (a Shopify studio whose storefront fits itself out as you scroll)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** for a fictional five-person Shopify studio in Rotterdam called **FIXTURE**. It sets up, builds and tunes Shopify stores for small, independent merchants at flat prices per stage. Slogan: **"Your shop, fitted out properly."** The only action is **Book a walk-through** (a free, 30-minute video call).

Mention Shopify only as the platform. No Shopify logo, green or trade dress; the footer says the studio is not affiliated with Shopify Inc.

## The central idea

A physical shop is fitted out before it opens, so **the page builds a working storefront as you scroll**: an empty shell, then fixtures, wiring and signage, and finally the hanging sign flips from CLOSED to OPEN and the first orders arrive. The hero and the fit-out are one pinned scene, so the storefront you meet at the top is the one that gets built.

## Brand

- **Palette (7 colours, nothing else; tints via `color-mix()`):** ink `#121316` (text, dark slabs), paper `#F3F2EE` (page), white `#FFFFFF` (store canvas, cards), crimson `#CF1F35` (the one accent: primary buttons, active markers, SKU codes), graphite `#5E6168` (muted text), hairline `#D9D7D0` (rules, grid), till green `#1E7A4C` (the OPEN sign and order slips only).
- **Type (`next/font/google`, distinct variable names):** Familjen Grotesk 500/600/700 for display (tracking −0.04em, line-height 0.92), Rethink Sans 400/500/600 for body, Martian Mono 400/500 (`preload: false`) for 10.5 px uppercase labels, SKUs and readouts.
- **Geometry:** a 12-column Swiss grid (max 1360 px) whose column lines are drawn as hairlines behind the whole page. 4 px radius on buttons, inputs and chips; 8 px on cards and the storefront window.
- **Logo:** an F built from a wall bracket and two shelves, with one crimson square "product" on the lower shelf, on an ink rounded square. Lockup = mark + FIXTURE in Familjen Grotesk 700. Also `icon.svg` and a 1200×630 `opengraph-image.tsx` (palette only).
- **Voice:** short, exact, numbers instead of adjectives ("5 days", "€1,800 flat", "4.1 s → 1.2 s").

## Sections

1. **Header:** logo, nav (Fit-out, Price list, Work, Care plans, FAQ) with one crimson indicator that slides between links, a live studio-hours chip ("Open · closes 18:00", computed for Europe/Amsterdam, Mon–Fri 09–18), and the crimson CTA. Becomes translucent after 24 px, hides on scroll-down, returns on scroll-up; a crimson progress hairline along its bottom. Below 1080 px: a toggle that opens a full-screen menu with a clip-path circle, focus trap and Escape.
2. **Scene (hero + fit-out, `#fit-out`):** left column holds the hero (eyebrow, h1 "Your shop, / fitted out / properly." split into masked lines, lead, two CTAs, three facts: 64 shops fitted, 4 wks door to door, €1,800 setup) stacked in the same grid cell as the **fit-out sheet** (five rows: 01 Shell · Store setup · Week 1; 02 Fixtures · Theme build · Weeks 2–3; 03 Wiring · App wiring · Week 3; 04 Signage · Speed + conversion · Week 4; 05 Open · Launch + care · Launch day; each with one line and four check chips). Right column: the **storefront** of the demo merchant Fennel & Clay (stoneware, Utrecht), drawn in DOM and inline SVG: browser bar with URL, "Payments live" chip, shipping bar, store nav with cart count, dark banner with coded vases and a headline, four product tiles (Tide mug €34, Low bowl €42, Dune vase €78, Pour jug €56), four app chips around the window (Reviews, Subscribe & save, Bookings, Email flows) with SVG connector paths, three order slips (`No. 1042 · Tide mug ×2 · €68.00 · Utrecht`…), and a hanging CLOSED/OPEN sign. Under it a readout: load time, conversion, orders, fitted count.
3. **Price list (`#prices`):** six services as shelf tags hanging from two drawn shelf rails: FX-01 Store setup €1,800 flat; FX-02 Theme build from €6,500; FX-03 App wiring €450 per app; FX-04 Speed audit €750 flat; FX-05 Conversion pass €1,200 flat; FX-06 Care plan €240 / month. Each tag has a punched hole and string, its stage, a lead time and an **Add to brief** toggle that preselects that need in the booking form (custom events both ways).
4. **Work (`#work`):** a full-width ink slab. Vertical tabs for three merchants (Fennel & Clay, Ritual Roast, Spokesmith) with arrow/Home/End keys; the panel shows what was fitted, a quote, a Before/After segmented toggle and three metrics that count between values with comparison bars.
5. **Schedule (`#schedule`):** a five-column Gantt (Week 1–4, Launch) whose bars draw in, plus a crimson "Today" marker that sweeps the weeks with the section's scroll progress.
6. **Care plans (`#plans`):** Counter €240, Shopfloor €420 (featured, ink card, "Most fitted"), Flagship €780 per month, with a Monthly/Annual toggle (annual = two months free: €200 / €350 / €650) and a rolling price.
7. **FAQ (`#faq`):** sticky heading; six questions in a one-open-at-a-time accordion (grid-rows animation).
8. **Book (`#book`):** three steps, and a form: name, email, store address (https:// prefix appears on focus), "What needs fitting?" chips (Setup, Theme, Apps, Speed + conversion, Care plan), budget radio chips, optional note. Client validation with specific messages, a one-shot shake and focus on the first invalid field; submit shows "Checking the shelves" for 900 ms, then the form wipes into a **fit-out slip** with a deterministic reference (`FX-1234-AB`), store host, chosen stages with prices, budget, rows printing one by one and a crimson BOOKED stamp. No network request.
9. **Footer (ink):** a marquee of the stage names, four columns (studio, hours with the live chip, links, small print), a giant FIXTURE wordmark with the mark.

## The mechanic

- `fitout/scene.ts` (pure, unit-tested): `INTRO = 0.1`, `STAGE_SPAN = 0.16`; `stageIndexAt(p)` → 0…5; `stageLocal(p, i)`; `readoutAt(p)` → load 4.1 → 1.2 s across stages 2–4, conversion 0.9 → 2.8% and orders 0 → 38 during stage 5, checks = completed stages; `scrollTargetFor(i, top, height, vh)` for sheet clicks.
- One client leaf, `SceneController`, measures the section's real offsets, computes progress with `progressFromOffsets` in one rAF per scroll, and writes `--fx-p`, `--fx-local`, `--fx-exit`, `--fx-load`, `data-stage`, `data-reached="1 2 3"` and the readout text nodes. React state changes only on a stage change (for an `aria-live` "Stage 3 of 5: Wiring").
- **Fitted is the default CSS.** Every storefront part carries `data-fit="n"`; dashed placeholder twins carry `data-slot="n"`. The unfitted states, the 600svh height, the sticky 100svh stage and the −50svh overlap of the next section exist only inside `@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)`, keyed on `.fx-scene:not([data-reached~="n"])`. The server renders `data-stage="0"` so the first paint is the empty shell; with no JS or reduced motion you get the finished, open shop and an expanded sheet.
- Below 1024 px in portrait, the copy stacks above a storefront sized by the remaining height; the sheet compacts to one line per row.

## Motion

- **Personality:** precise / clockwork. Verbs: **snap** (fast, stops dead, no overshoot) and **lock** (a check or hairline confirms). Wipes support.
- **Tokens in `@theme`:** `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.77,0,.175,1)`, `--ease-snap cubic-bezier(.5,0,0,1)`, `--ease-spring` (press release only); durations 90/180/380/600/1000 ms; `--reveal-shift: 24px`; `--stagger: 60ms`.
- **Signature moment:** stage 5. The sign flips (rotateY 180°, expo-out, 600 ms) and swings, the cart badge pops, order slips snap in 420 ms apart, the conversion readout counts up.
- **Load (CSS keyframes before hydration):** grid lines draw, logo and nav drop (50 ms stagger), h1 lines mask-rise, lead/CTAs/facts rise, the storefront window wipes open and its dashed slots fade in, the status dot starts breathing.
- **Reveals (hidden state only under `no-preference`; `<noscript>` override):** rise, slide, scale cascade, **hang** (tags drop from −28 px / −3° and lock), **draw** (shelf rails, Gantt bars), **wipe** (clip the child, not the observed element), mask-rise headlines. The Work slab opens from a framed card to full bleed with `animation-timeline: view()`.
- **Interaction states:** buttons wipe a fill in and roll their label, press to 0.97 with spring release, magnetic primary CTAs; tags lift and swing −1.2° from the hole with a pointer spotlight while siblings dim (no pointer tilt on cards that hold buttons); plan cards lift with a spotlight; toggles slide a thumb; tabs slide an indicator and the panel enters from the delta's direction; FAQ plus rotates to ×; inputs float labels and draw a crimson underline. Hover effects only on `(hover: hover) and (pointer: fine)`.
- **Ambient (max three):** status-dot ring, the newest order's dot breathing (only while the scene is on screen), the footer marquee (pauses on hover/focus and off-screen).
- Reduced motion: no smooth scroll, no pinning, no parallax, everything visible and finished.

## Quality bar

Folder isolation (only npm packages and files inside `src/app/(fixture)/`), `lenis` dynamically imported on fine pointers only. Unit tests for the scene maths, motion maths, studio hours, plan pricing and form validation; a Playwright spec for the fit-out, sheet jumps, reveals, the brief and booking flow, tabs, toggles, reduced motion, no-JS and a 390 px phone. Mobile Lighthouse: performance ≥ 90, accessibility ≥ 95, best practices 100. No horizontal overflow at 375 px. Never write `#` followed by digits in copy (use "No. 1042").
