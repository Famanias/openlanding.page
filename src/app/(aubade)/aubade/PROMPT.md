# Prompt: rebuild "AUBADE" (the overnight sleeper, a window you scroll through)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional overnight sleeper train called **AUBADE** (slogan *"Leave at dusk. Wake somewhere else."*). It runs from Paris-Gare de Lyon at 19:12 to Venezia Santa Lucia at 09:48: 9 carriages, 38 cabins, 1,128 km, Thursdays and Sundays. *Aubade* is a dawn song.

**The central idea: a night train is seen through its window, so the page is the window.** In the signature section, vertical scroll becomes the train moving sideways. Four landscape layers drawn as **flat SVG colour fields** slide past at different rates, and five legs of the night take over the glass in turn: claret dusk over Burgundy, the Jura's fir forest, the Simplon tunnel, Lago Maggiore by moon, and apricot dawn on the lagoon. The mood is hushed, nocturnal, saturated, unhurried and tailored: luxury quiet, built from bold colour fields.

**Reference (look and feel only):** the live template at https://openlandingpage.vercel.app/aubade.

## Brand rules

- **Six colours only**, used as large flat fields, never as gradients between fields. Make tints only with `color-mix()` of these:
  - nuit `#161233` (ink, page ground, the night field)
  - linen `#F3ECDF` (paper, text on dark, cabin stock, plaques)
  - claret `#8E1F3A` (the single action colour for CTAs, and the dusk field)
  - dawn `#F2B37A` (the dawn field; eyebrows, statuses and tunnel lamps on nuit; never text on linen)
  - sapin `#1F4A3F` (the forest field, the dining-car section)
  - lac `#3E6FA8` (the lake and lagoon; large type only on it)
- **Type (via `next/font/google`, with distinct variable names):**
  - **Gloock** 400 for display (hero `clamp(52px, 7vw, 124px)`, line-height 0.92).
  - **Albert Sans** 400–600 for body text, 17px / 1.6.
  - **Red Hat Mono** (variable, not preloaded) for times, km, voiture numbers and the departure board: 12px, uppercase, 0.12em tracking. Don't pass a weight list for this family; Turbopack fails on it.
- **Corners:** windows, photos and cards are rounded like carriage windows (`clamp(22px, 3vw, 44px)`; cards 18px). Buttons, inputs and plaques are near-square (2–3px).
- **Logo:** a rounded-square carriage window (`currentColor`) with a sun half-risen on a rail line (`--au-sun`, dawn on nuit and claret on linen), plus a second shorter rail. The wordmark is "AUBADE" in Gloock with 0.16em tracking. Provide `brand/Logo.tsx` (Mark plus lockup), `icon.svg` and a 1200×630 `opengraph-image.tsx`.
- **Voice:** unhurried and timetable-exact. Use times (`19:12`), km (`1,128 km`) and euros (`€1,180`). Never use "luxury experience", "unforgettable", "bucket list" or exclamation marks.

## Page

1. **Header** (fixed): the lockup; nav links in mono (The Line, Berths, Dining car, The Night, Departures) with **one dawn indicator that glides** between links (transform `translateX` + `scaleX`) and follows hover and the active section; and a claret "Reserve a berth" button. It compacts after 80px (blurred nuit backdrop), hides on scroll-down and returns on scroll-up. A 1px rail at the bottom fills with page progress, and a small claret train rides it. On phones a toggle (☰ → ×) opens a full-screen claret panel through a `clip-path: circle()` from the toggle. Links stagger in, body scroll is locked, focus is trapped, and Escape closes the panel.
2. **Hero:** an eyebrow ("Paris 19:12 → Venezia 09:48 · Thursdays & Sundays"); the h1 "Leave at dusk. / Wake somewhere else." with two masked lines that overlap the window; a lead; a magnetic claret CTA and a ghost "See the line" button; and a big rounded **window showing the dusk scene**, which glides on its own (layer loops of 34–220 s, the sun sinking over 14 s, paused off-screen). A **linen window blind lifts** on load. A "Next departure" plaque shows the first departure with berths left. Below are four facts: 1,128 km · 9 · 38 · 14 h 36.
3. **The Line (the mechanic):** a 560vh track with a sticky 100svh stage holding the window, an enamel plaque (leg n of 5, from → to, title), a clock and km readout, the leg's note, a **timetable rail** (8 stations, dots at their positions, a claret train that slides along, a dawn fill) and controls (prev and next buttons, plus a range input labelled "Travel the line").
   - **Stations** (position · time · km): Paris-Gare de Lyon 0 · 19:12 · 0; Dijon-Ville .20 · 20:51 · 315; Vallorbe .33 · 23:04 · 505; Brig .42 · 01:28 · 715; Domodossola .56 · 01:58 · 757; Stresa .64 · 03:15 · 797; Verona Porta Nuova .78 · 06:22 · 1,003; Venezia Santa Lucia 1 · 09:48 · 1,128.
   - **Legs:** dusk [0, .20), forest [.20, .42), tunnel [.42, .56), lake [.56, .78), dawn [.78, 1].
   - **Pure, unit-tested maths:** `progressFromOffsets` (cached offsets, `clamp((scrollY − top) / (height − viewport))`); `legAt` and `legProgress`; `clockAt` (interpolates minutes between stations across midnight and never runs backwards); `kmAt`; `layerShift(p, rate) = (p × rate × 300) mod 50`, applied to 200%-wide layers whose artwork repeats every 50%; `tunnelMouth(p)` → `{enter, exit}` ramps over 0.04 either side of the tunnel; `stepTarget(p, ±1)` for keyboard steps.
   - **Rendering:** each scene is server-rendered SVG with a sky, a sun or moon (positioned by `--au-leg-t` in container units), and detail, far, mid and near layers (rates 0.2 / 1 / 2.2 / 4.5; the tunnel lamps run at 9). One rAF loop writes `--au-p`, `--au-leg-t`, `--au-s0…s4`, `--au-enter` and `--au-exit` to the stage and sets `data-leg`. React state changes only when the leg changes (for the `aria-live` plaque). The clock and km are written with `textContent`. Scenes cross-fade with opacity.
   - **Signature moment, the Simplon:** a dark tunnel mouth slides across the glass from the right (`translateX((1 − enter − exit) × 102%)`) and fades once inside, so amber lamps stream past fast. A reading-lamp reflection blooms on the glass (opacity `enter × (1 − exit)`). At Domodossola the dark leaves to the left onto the moonlit lake.
   - The range input scrolls the page (scroll stays the single source of truth). ←/→ step legs. Space and Enter are never stolen.
   - **Static mode:** an inline script sets `html[data-au-motion="live"]` only when JS runs and motion is allowed. Otherwise the track is hidden and **five finished windows** with their plaques and notes render instead.
4. **Berths** (linen field, blinding down over the night): three tilt cards in nuit, sapin and claret. Voiture 3 · Couchette Privée, "A berth of your own", 190 × 80 cm, €390, 12 cabins. Voiture 5 · Cabine, "Two, stacked", 2 × 190 × 80 cm, €640, 16 cabins. Voiture 7 · Grand Lit, "The double", 200 × 140 cm with a private shower, €1,180, 10 cabins. Fares are per cabin, with dinner and breakfast included. Each card has a 4:3 photo, specs, a price and "Choose this berth" (which pre-selects the form).
5. **Dining car** (sapin): the title, a lead, a 3:2 photo (blind wipe plus scroll parallax), count-up stats (2 seatings · 38 covers · 24 mo Comté) and a timed menu (19:40, 20:30, 21:15, 22:40, 07:10, 08:30) whose vertical rule draws in.
6. **The Night:** three sticky full-height colour cards (claret 21:30 Turndown, nuit 00:00 The quiet hour, dawn 08:15 The bell), each with a huge Gloock time and a 4:5 photo. As the next card covers one, it scales to .94 and dims (`--cover` from one rAF loop).
7. **Departures** (nuit): month tabs (November 2026, December 2026, January 2027) with a gliding indicator and arrow-key support, and a departure board table (date, departs, arrives, berths, status, Reserve →). Every Thursday and Sunday is listed, with deterministic availability (open, few left, complet). 24 Dec is "Réveillon dinner on board" and 31 Dec is complet ("Arrive for Capodanno"). Rows slide in the direction of the month change, and every character **split-flaps** in (`rotateX(-90deg)` → 0, staggered).
8. **Reserve** (linen): a **live ticket** on the left (a claret band with the mark, 19:12 → 09:48, date, berth, Voiture · Cabine, guests, name, and a fare stub) and the form on the right: a departure select grouped by month (complet nights disabled), berth radio cards, a guests segment (two is disabled for the couchette), floating-label name and email fields with a drawn check when valid, and optional notes (280 characters max). Validation is client-side and tested. Invalid fields shake once and their messages slide down. Submit morphs to "Coupling the carriages" with a shuttling dot, then the form is replaced by a nuit success panel; the ticket tilts, is **punched twice** and **stamped "Validé"** with a spring. No network request.
9. **Footer** (claret): a gliding marquee of station names (it pauses off-screen, on hover and on focus), the slogan set huge, the lockup with an address, links, timetable footnotes, and "AUBADE is a fictional rail company".

## Motion

- **Personality:** soft and luxurious, with one cinematic set piece. The verbs are **glide** and **settle**. Put the tokens in `@theme`: ease-out `cubic-bezier(.22,1,.36,1)`, expo `cubic-bezier(.16,1,.3,1)`, in-out `cubic-bezier(.65,0,.35,1)`, a spring `linear(0, .4 9%, .86 22%, 1.04 33%, 1.01 46%, .995 62%, 1)`, and durations of 90 / 200 / 520 / 950 / 1400 ms with a 90 ms stagger.
- **Reveals** (one shared IntersectionObserver flips `data-in`): mask (headlines), blind (photos and fields), rise, slide (eyebrows), cascade (cards), draw (rules), count-up, and flap (the board). Hidden states exist only under `html[data-au-motion="live"]`, and there's a `<noscript>` override.
- **Load:** the header drops in at 150 ms, nav links stagger 50 ms apart, the blind lifts, the headline masks rise at 300 and 420 ms, and the lead, CTAs, plaque and facts follow from 700 ms. Everything uses CSS keyframes with `backwards` fill.
- **Scroll:** Lenis on desktop fine pointers only. Where `animation-timeline: view()` is supported, the hero window scales and dims on exit, and the linen and sapin fields blind down on entry.
- **States:** buttons fill from the side and their labels roll, with press at `scale(.97)` and a spring release; cards lift and tilt ±6° with a lamplight spotlight, and their siblings dim; links' underlines draw in and exit to the right. Under reduced motion nothing animates and the page looks finished.

## Quality bar (must hold)

- Animate only `transform`, `opacity` and `clip-path` (plus stroke-dashoffset for the check). CLS is 0, and the root has no horizontal overflow at 375px.
- One h1, landmarks, real buttons and links, AA contrast, visible focus rings, and `aria-live` used only for leg names.
- Folder isolation: import only npm packages (`lenis`) and files inside `src/app/(aubade)/`. Register the six-colour palette in `scripts/templates.config.ts`.
- Structure: `brand/`, `content/` (typed data with tests), `line/` (the mechanic with `journey.ts` and tests), `motion/` (math plus tests, Reveals, Magnetic, TiltCard, Marquee, CountUp, SmoothScroll), `sections/`, `forms/` (booking rules with tests, the form and the ticket), and `assets.tsx` with labelled placeholders for seven in-carriage photos.
- Playwright covers the window mechanic, the slider and keyboard, reveals, hover, departures, the form, hash links, the phone menu, and reduced motion (the loop never mounts).
