# Prompt: rebuild "CALDER & ROWE" (a law-firm landing page that drafts itself like a brief)

Paste everything below the line into your AI coding agent.

---

Build a one-page landing site in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional small New York law firm, **Calder & Rowe LLP** (eleven attorneys, founded 1987, business law, disputes, employment, trusts & estates). Tagline: *"Hard decisions, argued well."* The page must look premium and quiet, nothing like a navy-and-white corporate template.

**The central idea: a law firm's product is a well-reasoned argument, so the page is a bound brief being drafted and filed.** A pinned section writes a memorandum word by word as you scroll; the form "files a matter" and a gold seal presses onto a docket number. Name everything in the brief's terms: practice areas are *Counts I–IV*, sections are *§ I–VI*, outcomes are *Authorities* written like citations, the address is *Chambers*.

**Reference (look and feel only; build your own):** the live template at https://openlandingpage.vercel.app/calder.

## Brand rules

- **Eight colours, nothing else.** Make tints only with `color-mix()` of these:
  - ink `#070C17` (ground, text on paper, footer)
  - midnight `#0E1830` (dark slabs)
  - ivory `#F5F0E4` (paper, text on slabs)
  - gold `#C9A55A` (the one accent: hairlines, numerals, the seal, italic emphasis on slabs, the CTA)
  - parchment `#E8DFCB` (paper tint)
  - slate `#55607A` (muted text on paper)
  - brass `#7D5F1F` (gold as *text* on paper; gold on ivory is only decorative)
  - garnet `#9C3A2E` (errors only)
- **Type (via `next/font/google`, distinct variable names):** **Fraunces** weight 300, roman and italic, for display (`--font-fraunces`; static weight, not the optical-size axis, which would add ~110 KB to the first paint), tracking −0.02em, word-spacing +0.08em, the italic is the voice of emphasis; **Instrument Sans** weight 400 for body and UI (`--font-instrument`); **Cutive Mono** for labels, docket numbers and page counters, uppercase, 0.12em tracking (`--font-cutive`). Use Fraunces for numerals in running text (the mono's 3 reads like a 5). Size fluidly with `clamp()`.
- **Corners:** rounded. Pills for buttons, inputs, nav and chips; 24–32px for cards, sheets and photos.
- **Logo:** a C and an R drawn as strokes inside a fine gold ring, with a small gold full stop between them, plus the wordmark "CALDER & ROWE" in Fraunces uppercase with wide tracking, the ampersand in gold italic, and "ATTORNEYS AT LAW" in small tracked caps. Provide `brand/Logo.tsx` (Mark and lockup), a **Seal** (the mark inside two rings, with "CALDER & ROWE LLP · ATTORNEYS AT LAW · NEW YORK · EST. 1987 ·" set on a circle with `textPath`), `icon.svg` and a 1200×630 `opengraph-image.tsx` using `next/og`.
- **Voice:** composed, exact, plain. Specific numbers ("eleven attorneys", "within one business day", "a status note every Friday"). Never "game-changing", never exclamation marks, no stock-photo law clichés (no gavels, scales or handshakes).

## Layout

- Container `min(1240px, 100% − 2 × clamp(20px, 5vw, 72px))`.
- **Slabs lap over each other:** every section has a rounded top (28–56px) and a negative top margin of the same size, so each slides over the last with the previous colour showing in the corners. Alternate midnight and ivory: hero (midnight), matters (ivory), the argument (midnight), counsel (ivory), authorities (midnight), questions (ivory), file a matter (midnight), footer (ink).
- **Header** is a floating pill: logo, four links (Matters, The argument, Counsel, Questions), the direct line 212 555 0187 in mono, and a gold "File a matter" pill. Below 980px the links live in a full-screen panel that opens as a circle from the toggle.
- Add a skip link, one `h1`, landmarks, `lang="en"`, and visible focus rings (gold on slabs, brass on paper).

## Sections

1. **Hero** (midnight, min-height 100svh): gold-hairline colonnade line-art behind, eyebrow "New York — Business law · Disputes · Estates", h1 "Hard decisions, *argued well.*" (two masked lines, the second in gold italic), lead "Calder & Rowe is a New York law firm of eleven attorneys. When the matter is consequential, you work directly with the partners who argue it.", a magnetic gold pill "File a matter" and a text link "Read how we argue". On the right, a tilted ivory **memorandum sheet** (header "MEMORANDUM OF COUNSEL · No. 87-0412", "In the matter of *your decision*", two numbered clauses with ghost text lines, a gold chip "Settle before discovery.", a signature line) over a parchment back sheet, with the turning seal overlapping its corner. A four-up strip: Direct line, Offices (Manhattan · Brooklyn · Westchester), Since 1987, Reply within one business day.
2. **Matters** (§ I, ivory): "Four kinds of matter, *argued by partners.*" and four cards, each a count: I Business formation & contracts, II Commercial disputes, III Employment & executive matters, IV Trusts & estates. Each has a ghost Roman numeral, a summary, three typical matters with gold diamond bullets, and an "Ask about this" link that pre-selects the matter in the form.
3. **The argument** (§ II, midnight): the mechanic below. Four stages: Intake, Analysis, Position, Resolution, mapped to four clauses (Statement of facts, Questions presented, Recommended course, Disposition), each with a gold margin note ("Your call is answered by a partner.", "Usually two or three issues, rarely more.", "Fixed-fee quote included.", "A status note every Friday.").
4. **Counsel** (§ III, ivory): "The people who *answer the phone.*", two partner cards (Mara Calder, founding partner, commercial disputes; Daniel Rowe, partner, corporate & estates) with 4:5 portrait slots, a short bio and credential pills, then four count-up facts: 38 years in practice, 11 attorneys in one office, 2 partners on every matter, 1 business day to reply.
5. **Authorities** (§ IV, midnight): a large client quote ("Mara gave us a plan we could understand and act on. We felt *represented from the first call.*") with attribution, three anonymised matters written as citation cards (`No. 21-0388`, Founder buy-out, resolved in eleven weeks…), an advertising disclaimer, and a slow marquee of matter types.
6. **Questions** (§ V, ivory): five questions in an accordion (first consultation, fees, individuals vs businesses, confidentiality, where we meet) beside a sticky heading.
7. **File a matter** (§ VI, midnight): "Bring us the *hard one.*", the phone, email and Chambers (130 Madison Avenue, 12th Floor, New York, NY 10016), and an ivory form card: name, email, kind of matter (the four counts plus "Not sure yet"), message (10–600 characters). Pill inputs with floating labels. Client-side validation only, no network request.
8. **Footer** (ink): logo, one line, explore links, chambers, an oversized outlined "Calder & Rowe" wordmark in gold at 38%, and the line "Attorney advertising. Prior results do not guarantee a similar outcome."

## The mechanic: the brief (pure maths, unit-tested)

Render every clause as a finished document in a server component. A client leaf drives it from scroll with one rAF-throttled listener, writing `--p` on each clause, `transform` directly on the progress rail and `data-*` attributes (no React state), measuring on resize and font load. Never put a scroll value in a custom property on a parent such as `<html>` or the section: every descendant would recalculate styles each frame.

```
runwayProgress(scrollY, top, height, vh) = progress(scrollY, top, top + max(height − vh, 1))
span = (1 − SEAL_TAIL) / n,  SEAL_TAIL = 0.12,  n = 4
clauseProgress(p, i, n) = progress(p, i·span, i·span + 0.85·span)
activeClause(p, n) = clamp(floor(p / span), 0, n − 1)
isSealed(p) = p ≥ 1 − 0.7·SEAL_TAIL
pageLabel(active, n) = "p. {active + 1} of {n}"
```

- At `(min-width: 960px) and (min-height: 620px)` with motion allowed, the section is `440vh` and its stage is `position: sticky; height: 100svh`. Use the same media query in CSS and in the driver.
- Write `--p` (0–1) on each clause. Each word is a span with `--w` (its index) in a clause with `--n` (its word count): `opacity: clamp(.14, calc(var(--p, 1) * var(--n) − var(--w)), 1)`, so words resolve one after another. The margin note fades and slides in over p 0.55–0.97. The step list marks stages `past | active | next`, a gold rail fills with overall progress, the page counter updates, and `data-sealed` flips once the last clause is written, pressing the seal with a spring. Make the press a `transition` on transform and opacity keyed on `data-sealed` (hidden: scale 1.7, rotate −22°, opacity 0; pressed: rotate −8°), so scrubbing back reverses it mid-flight.
- Defaults make the unscripted page finished: `--p` falls back to 1, the seal is in place, the page counter is hidden. Phones, short windows, reduced motion and no-JS all see a plain, fully written document.

## Motion: soft and luxurious (verbs: settle, dissolve)

- **Tokens in `@theme static`:** `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-out-expo cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`, `--ease-spring linear(0,.3 7%,.78 17%,1.05 28%,1.03 40%,.99 56%,1)`, durations 110 / 220 / 420 / 1000 / 1300 / 2000 ms, `--reveal-shift 26px`, `--stagger 70ms`. No raw cubic-beziers or millisecond values in components.
- **Load sequence in CSS keyframes** (so it plays before hydration, no flash, CLS 0): the colonnade fades up and rises as one layer, the header drops in at 60 ms with links staggered, the headline lines rise through their masks from the first frame (130 ms apart, rising 68%: the h1 is the LCP element, so it never starts hidden), then the copy, CTAs, sheet and strip.
- **Animate whole elements, not SVG children** (they repaint on the main thread every frame): build the seal as two stacked SVGs so the lettering ring turns as a compositor layer while the mark stays still.
- **Six reveals, never opacity alone:** `mask` (display lines), `rise` (body), `cascade` (cards, rise + scale), `settle` (sheets and cards), `slide` (eyebrows, rule draws), `wipe` (photos: clip-path on the child, inner scale 1.16 → 1). One shared IntersectionObserver flips `data-in`, then `data-done` so hover transitions lose the stagger delay. Never put a clip-path on an element an observer watches.
- **Scroll:** hairline progress bar; hero colonnade drifts and the hero scales to .95 and dims as the next slab laps over it; the header compresses after 80px, tucks away going down and returns going up; Lenis smooth scroll on desktop fine pointers only, dynamically imported, anchors glide.
- **Interaction states everywhere** (rest, hover, focus-visible, pressed, disabled, loading, success), hover only behind `@media (hover: hover) and (pointer: fine)`: buttons roll their label, rise a fill from below, swap an arrow disc and scale to .97 on press, released on the spring; the primary CTA is magnetic (≤ 12px). Count cards tilt ≤ 4°, lift 8px, carry a gold spotlight that follows the pointer, fade in a pseudo-element shadow and dim their neighbours. Nav has one gold underline that slides between links and follows the active section. Accordion opens by animating `grid-template-rows 0fr → 1fr`. Inputs have floating labels and a brass focus ring that fades in; invalid fields shake once and slide their message down; submit rolls to three bouncing dots; on success the form dissolves and the seal presses onto a docket number (`CR-26-0000`, derived from the form so a re-send matches) with the name and email echoed.
- **Ambient (three at most in view, paused off-screen):** the hero sheet floats (11 s), the seal ring turns (70 s), a gold glow drifts (22 s); a 70 s marquee in authorities pauses on hover and focus.
- **Reduced motion and no JS:** hidden pre-reveal states exist only under `html[data-cr-motion="live"]` inside `prefers-reduced-motion: no-preference` (an inline script sets the attribute before first paint; a `<noscript>` rule makes `[data-reveal]` visible). With reduced motion nothing is hidden, nothing pins, nothing loops, Lenis never mounts, transform and clip-path changes become instant, opacity and colour still ease over 120 ms, and the page looks finished.
- Animate `transform`, `opacity` and `clip-path` only. Never `width`, `height`, `top` or `box-shadow`.

## Structure, tests, delivery

- Folders: `brand/`, `content/` (typed firm, partners, facts, authorities, FAQs, clauses), `brief/` (pure maths + driver), `forms/` (validation + form), `motion/` (math, mode, Reveals, SmoothScroll, Magnetic, TiltCard, CountUp, Marquee, ScrollVars), `sections/`, `assets.tsx` with a labelled placeholder `Picture` for the two portraits.
- Unit tests for the progress maths (runway, clause order, active clause, seal threshold, label), form validation and docket number, content integrity and the motion maths. Playwright tests for the pinned scrub and seal press, reveals, header hide/return, nav, accordion, form validate → loading → success with no network request, the phone menu, reduced motion (no pin, no loops, nothing hidden) and JS-disabled readability.
- Quality bar: mobile Lighthouse performance ≥ 90, accessibility ≥ 95, best practices 100; AA contrast; no horizontal overflow at 375px; the template imports only npm packages and files inside its own folder.
