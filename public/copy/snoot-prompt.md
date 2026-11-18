# Prompt: rebuild "Snoot" (a vet clinic where scrolling walks a stethoscope along a dachshund, nose to tail)

Build a landing page for **Snoot**, a fictional neighbourhood vet clinic for dogs, cats, rabbits and small and scaly pets, at 12 Lantern Street, Easton. Slogan: **"Every check-up, nose to tail."** Voice: warm, cheeky, specific ("Treats before needles", "Bloods back in 40 minutes", "Cat-only hours, because cats have opinions"). Prices in pounds, illustrative.

**Stack:** Next.js 16 App Router, React 19, Tailwind v4 used for tokens only (`@import "tailwindcss" source(none)` + `@theme static`, then hand-written classes prefixed `sn-`), `lenis` for smooth scroll, `three` (`three/webgpu` + `three/tsl`) for one 3D object. The template must import nothing outside its own `src/app/(snoot)/` folder.

## Central idea

A vet's exam goes nose to tail, **so the page is one very long illustrated dachshund called Frank**. A tall section (620 vh, 560 vh on phones) pins a full-height stage; scrolling slides Frank's body past a stethoscope chest-piece fixed at 42 % of the stage width (50 % on phones). The chest-piece rests on each of six body parts in turn, each part is a chapter of care, Frank reacts as it reaches him, an ECG trace draws beneath him, and at the tail an "All clear" stamp lands.

## Brand system

**Palette (only these hex values may appear):**

| name | hex | role |
|---|---|---|
| ink | `#1F1B3A` | text, every outline, dark slabs |
| paper | `#FFF4E4` | page |
| milk | `#FFFCF6` | cards, fields |
| pink | `#FF6B8B` | the nose, primary CTA, plans slab (ink text only) |
| blue | `#3550F0` | check-up and booking slabs, focus rings (milk text) |
| yolk | `#FFC23D` | tags, pills, active states, ticker, visit slab |
| mint | `#6FD3B0` | all clear, open now, booked |
| frank | `#C9773F` | Frank's coat |

Tints via `color-mix()` only: frank-light (frank 42 % + milk), frank-dark (frank 60 % + ink), ink-soft (ink 74 % + paper; reset to ink on pink/yolk).

**Type (next/font/google, distinct variable names):** Lilita One 400 (`--font-lilita`) for headlines, tag names, prices and the wordmark; Figtree (`--font-figtree`) for body and buttons; Ubuntu Sans Mono (`--font-ubuntu-sans-mono`, `preload: false`) for the patient chart, readouts and eyebrows. Fluid sizes: h1 `clamp(2.7rem, 1.1rem + 4.7vw, 6.2rem)` with authored `nowrap` lines, h2 `clamp(2.3rem, 1.4rem + 3.6vw, 4.6rem)`.

**Logo:** a pink squircle "snout" with an ink outline and an ink heart-shaped nose with a milk glint (`M32 27c-3-8-17-7-15 4c1 7 9 11 15 15c6-4 14-8 15-15c2-11-12-12-15-4z` in a 64-unit box), next to a lowercase "snoot" wordmark in Lilita One. Ship `brand/Logo.tsx` (Mark, Logo, NoseBullet), `icon.svg` and a `next/og` `opengraph-image.tsx` (1200 × 630, palette only).

**Geometry:** everything rounded (14 / 26 / 44 px, pills 999 px), 3–4 px ink borders, raised things sit on a solid ink block 5–8 px below ("sticker" build). Slabs stack with 44 px rounded tops overlapping by 40 px.

**Signature details:** the heart nose everywhere (logo, bullets, collar tag, stamp centres); mono patient-chart readouts (`CHART No. 0412`, `Heart · 92 bpm · steady`, `03/06`); one collar-tag shape with a punched hole for plans, the booking confirmation and Frank's own tag; a pink "leash" scroll-progress line with a paw at its tip.

## Sections

1. **Header:** floating milk pill (logo, nav Check-up / Patients / Plans / Team / Your visit, phone in mono, pink "Book" button). Compresses after 80 px, hides on scroll-down, returns on scroll-up; the active section gets one sliding yolk pill (clip-path); phones get a pink full-screen menu that opens as a clip-path circle from the toggle, with staggered mask-rise links, scroll lock and a focus trap.
2. **Hero:** eyebrow "Neighbourhood vet · Easton · open seven days"; h1 "Every check-up, / nose to tail." with a pink squiggle drawn under "nose"; sub-copy; CTAs "Fetch an appointment" (pink, magnetic) and "See the check-up" (milk); three count-up stats (40 min bloods, 1,860 owners rate us 4.9, 2 theatres). Right: a breathing blue blob with a yolk sun, drifting bone/ball/heart props, a tilted patient-chart card ("Frank · 7 y · dachshund · 7.4 kg · ✓ Very good boy"), and **Frank's head** (the same SVG cropped to `viewBox="20 70 520 420"`, body continuing off-frame). His nose is a real `<button aria-label="Boop me: Frank's nose">`: each press squishes the nose, squeezes the eyes, flops the ear, pops a speech bubble ("Boop!", "Hehe.", "Again?", "Snrrk.") and rolls a "1,284 boops today" counter; every fifth boop he sneezes (head jolt + sparks, "Achoo!").
3. **Waiting-room ticker:** a yolk band tilted −1.6°, marquee of milk patient pills ("Biscuit · 4 · spaniel · ♥ jabs done"), paused off-screen and on hover, with a screen-reader list beside it.
4. **The check-up (the mechanic):** blue slab. Heading "Nose to tail, in six stops.", a `01/06` counter, a six-step rail with a sliding yolk pill (links jump to chapters), a chapter card that swaps per chapter, a dark readout pill with a polite live region, Frank on a sliding track, the chest-piece (disc + long ink/pink tube), the ECG and the stamp. Chapters (x, y in Frank's 2600 × 640 viewBox):
   - Nose (96, 292): diagnostics and dental; Frank sniffs.
   - Eyes & ears (330, 196): skin, ears, eyes; the ear flops.
   - Heart (600, 340): wellness exams, ECG; a pink heart beats on his chest.
   - Belly (1220, 418): nutrition, weigh-ins, worming; the belly breathes.
   - Paws (1930, 560): surgery, claw trims, hydro; the back paw lifts.
   - Tail (2330, 180): written plan, follow-up call; the tail wags, the tongue comes out, "All clear" stamp lands.
5. **Who we see:** tabs Dogs / Cats / Rabbits / Small & scaly (sliding pink pill, arrow/Home/End keys). Each panel: a 2.5D stage (coloured blob, flat SVG pet in Frank's outline style, a polaroid patient photo) whose layers shift by depth toward the pointer, a headline, copy, a count-up "seen this year" and visit chips. Panels slide in the direction of travel.
6. **Snoot plans:** pink slab. A monthly/yearly switch (sliding knob, "2 months free") and a 1–4 pets stepper. Three collar tags hanging from rings: Pup & Kit £16, Grown-up £21 (yolk, "Most picked"), Golden Years £29; each extra pet 15 % off; yearly = 10 months. Prices roll on change, tags swing on hover, "What's in it" flips a tag in 3D to its list.
7. **The team:** four tilt cards (photo, "with Pudding, retired greyhound" sticker, name, role, one line): Dr Adaeze Okafor (clinical director), Dr Ruth Lindgren (surgeon), Dr Kenji Arai (exotics), Sol Medina RVN (head nurse). Tilt + yolk spotlight, lift, photo scale, sibling dimming.
8. **Your visit:** yolk slab, four steps with wiping photos and numbered pink tags (two doors, treats before needles, the check on their level, out with a plan), a dotted paw trail drawn on scroll, and promise chips.
9. **After hours:** ink slab, "Something wrong at 3 a.m.? Ring the night vet.", a live open/closed sign computed from the visitor's clock (Mon–Fri 08–20, Sat 09–17, Sun 10–14; "Closing soon" inside 45 minutes; "Doors open 08:00 tomorrow"), a pink emergency-call card with a rolling number, and an hours table.
10. **Fetch an appointment:** blue slab. Form: pet's name (floating label), species chips, reason select, the next five open days as chips (computed after mount, Sundays skipped), owner name, email or phone. Validation on blur and submit; invalid fields shake and their message slides open; filled fields draw a check. Submit morphs to "Fetching…" with bouncing dots, then the form folds away and a mint dog tag drops in on a wag curve with the summary ("Biscuit · Check-up · Thu 19 Nov") and a pink "Booked" stamp; focus moves to it. No network request. Beside it, **a real-time 3D tennis ball**: `WebGPURenderer` (WebGL2 fallback), `MeshPhysicalNodeMaterial` with sheen, a procedural TSL seam `1 − smoothstep(0.045, 0.07, |n.z − 0.75(n.x² − n.y²)|)` mixing yolk and milk, a fading contact shadow; it bobs, spins on drag with inertia, and on booking success is thrown away and bounces back in. Loaded on idle when near on desktop, on tap on touch screens, never under reduced motion; an SVG poster is the default.
11. **Footer:** ink slab, big logo, motto in yolk, link columns, address, night line, fictional-clinic note, paw prints walking across the bottom.

## Motion

Personality **organic and expressive**; verbs **wag** (overshoot and settle) and **breathe** (slow swells). Tokens: `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--ease-spring linear(0, .35 8%, .82 20%, 1.06 30%, 1.02 42%, .99 58%, 1)`, `--ease-wag linear(0, .48 7%, 1.16 18%, .93 30%, 1.05 42%, .98 56%, 1.01 70%, 1)`, durations 90/180/420/760/1200 ms, stagger 70 ms plus a deterministic 0–50 ms jitter.

- Hero load in CSS keyframes (runs before hydration): blob springs in at 0 ms, header drops at 150 ms, headline lines mask-rise from 250 ms, squiggle wipes, sub/CTAs/stats/chart follow, Frank pops up with a wag at 650 ms, ambient loops from ~900 ms.
- Reveal variants (hidden only under `prefers-reduced-motion: no-preference`, `<noscript>` override): lines, rise, pop, grow, wipe, slide, draw, plus count-ups and chip cascades.
- Buttons: a face on an ink block; hover lifts the face, wipes a fill in, rolls the label and swaps the arrow; press pushes the face onto the block; release springs.
- Handoffs: hero and the patients/team sections scale to .94 and dim as they exit (`animation-timeline: view()`), the ticker swings into its tilt on entry, tags drop from their rings, the visit trail draws.
- **Signature moment:** the stethoscope walk; at the tail the ECG's last spike, the double-time wag and the mint "All clear" stamp slamming in.
- The check-up engine: one passive scroll listener → one rAF → transforms written straight onto the track, the chest-piece and the ECG clip; data attributes change only when the chapter changes. The scrub layout exists only under `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)`; otherwise Frank is shown full-length with numbered markers above a grid of all six cards.
- Under reduced motion: everything visible, no loops, no smooth scroll, no tilt or magnet, the 3D never mounts.

## Logic (pure functions, unit-tested)

`stageProgress`, `bodyXAt` (`lerp(40, 2420, p)`), `trackOffset` (`anchor − x/2600 · trackWidth`), `pieceYAt` (piecewise-linear), `chapterIndexAt` (midpoint boundaries), `progressForChapter`, `ecgPath`, `isAllClear` (p ≥ .96); `boop` state (sneeze every 5th); `quote(plan, pets, billing)`; `clinicStatus(date)`; `validateBooking`, `nextDays`, `bookingSummary`; `throwArc(t)` and `idleBob(t)`; motion maths (`clamp`, `lerp`, `progress`, `staggerDelay`, `jitter`, `wag`, `damp`, `easeOutQuint`).

## Quality bar

Folder isolation; palette registered and guarded; 25–40 files split into `brand/`, `motion/`, `checkup/`, `boop/`, `species/`, `plans/`, `hours/`, `forms/`, `ball/`, `sections/`; one h1, landmarks, real buttons, AA contrast, visible focus; CLS 0; images through a `Picture` component with labelled placeholders until the twelve photographs (prompts in `docs/image-prompts/snoot.md`) arrive; an e2e spec covering the boop, the scrubbed chapters, the rail, tabs, plans, the booking success, phone layout and reduced motion; mobile Lighthouse performance ≥ 90, accessibility ≥ 95, best practices 100.
