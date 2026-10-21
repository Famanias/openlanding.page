# Prompt: rebuild "WOWFLUTTER" (editorial magazine landing page)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional independent record label called **WOWFLUTTER Editions** (tagline "Every record is an issue", slogan "Slightly off-centre, on purpose."). It is a four-person label in a former print shop in Leeds. Every record ships with a 32-page saddle-stitched zine, in editions of 500. The name is the tape-speed wobble analog recordings have.

The page is a **magazine you turn by hand**. On desktop, Issue 07 ("The Sound of Rooms") sits open as a two-page spread, and you drag a page corner, flick, or press an arrow key to lift a leaf on a real hinge, with a shadow that follows your pointer. It must feel warm, grainy, tactile and handmade, never like a music-streaming template. No gradients, no glass, no soft rounded UI.

**Reference** (look and feel only; generate your own images): the live template at https://templateflow-blond.vercel.app/wowflutter.

## Brand rules

- **Tape black and one loud pink, on warm stock. Five colours only:**
  - tape `#14110F` (ink, text, the black feature page, the desk behind the book)
  - stock `#EFE6D4` (paper, default page ground, text on black)
  - riso pink `#FF3D8B` (the one loud colour: fills, overprints, two full pink pages, the tape-counter digits)
  - worn stock `#DCCFB8` (back pages, muted fills)
  - faded ink `#5E564D` (muted text, captions, rules)

  **Pink is a fill or an overprint, never small text on paper** (it is only 2.7:1 on stock). It carries ink text (5.6:1) or large type on black. Make tints with `color-mix()` of these colours. Paper grain is an inline SVG noise filter.
- **Type (via `next/font/google`, distinct variable names):**
  - **Young Serif** 400 for display: titles, the cover number, the back-cover motto.
  - **Newsreader** 400 and italic 400 for body (liner notes, interviews). Questions and titles are italic.
  - **Courier Prime** 400/700 for catalogue numbers, folios, labels and buttons: uppercase, 0.08em tracking.
- **Mark:** a vinyl record whose spindle hole is deliberately off-centre (the physical cause of "wow"), ink disc, three paper-coloured grooves, a pink label. `icon.svg` is the same mark on a stock rounded square.
- **Wordmark:** "wowflutter" in Young Serif with a wobbling baseline (per-letter offsets, big slow swings on "wow", quick small ones on "flutter") over an off-register pink copy shifted 0.045em right and down.
- **Plates:** every image sits on stock with a pink block behind it, offset 3.2% right and down (an off-register second pass).
- **A printed unit `u` is 1% of a page's width** (`1cqi`, each page is an inline-size container). Size everything on a page in `u` (body `max(14.5px, 3.6u)`, mono labels `max(11px, 2.3u)`, h2 `9.5u`) so a page looks identical at any size. On phones floor the unit at 4.4px.

## The magazine

14 pages = 7 leaves = 8 spreads. **Leaf k** has page 2k+1 on its front and 2k+2 on its back. **Spread s** shows the back of leaf s−1 on the left and the front of leaf s on the right (spread 0 is the cover alone, spread 7 the back cover alone). A leaf is "flat" if k ≥ s, "turned" if k < s.

**One DOM, two layouts**, chosen by a media query `(min-width: 1000px) and (min-height: 640px) and (scripting: enabled)` that you repeat in JS (`matchMedia`):

- **Book layout:** the page does not scroll. A 64px top bar, the book (two pages at 1:1.4 each, as tall as the space allows, max 860px, centred), and a 72px bar with a Prev button, a **tape counter** (three digits 000–999 in pink on black), the folio ("P. 04–05 / 14") and a Next button.
- **Flow layout (phones, short windows, no JS):** the 14 pages are single full-width cards (max 560px) in a normal vertical scroll with a sticky top bar. Nothing is hidden behind an animation.

**Rendering the leaves.** Each leaf is a slot (absolute, full book size, its own `perspective: 3400px`, z-index from state: flat leaves `n−k`, turned leaves `k+1`, the moving leaf 40) holding `.leaf`: absolute on the right half, `transform-origin: 0 50%`, `transform-style: preserve-3d`, `transform: rotateY(calc(var(--turn) * -180deg))`. It has two faces with `backface-visibility: hidden`; the back face is pre-rotated 180°. `--turn` comes from `data-state` (0 flat, 1 turned); while a leaf moves the engine writes `--turn` inline to that slot, and clears it once React has rendered the new resting spread. Shade the leaf with `opacity: calc(sin(var(--turn) * 180deg) * 0.28)`, and cast a shadow onto the page beneath with a gradient whose opacity is `sin(turn·180°) × (1 − turn)` on the right and `× turn` on the left. Gutter shading on every page (left edge on fronts, right edge on backs). Translate the whole stack by `translateX(shift%)` where shift = −25 at the front cover, 0 when open, +25 at the back cover (interpolated as a leaf moves), so a closed cover is centred.

**Turn maths (write these as pure, tested functions):**

- Drag progress = clamp01(base + travel / (pageWidth × 1.1)), travel = startX − x for a forward turn, x − startX for a back turn.
- On release: velocity ≥ 0.6 px/ms toward finishing → finish; ≤ −0.6 → cancel; otherwise finish if progress ≥ 0.4.
- Settle each frame: p += (target − p) × (1 − e^(−dt/100ms)), snap within 0.002; run ×2.4 faster for multi-leaf jumps.
- Tape count = round(position / 7 × 999), position = spread + dir × progress.

**An engine class** (`TurnEngine`) owns the state and talks to the DOM only through injected hooks (`render`, `commit`, `request`, `cancel`, `now`), so it can be tested with a fake clock. API: `jumpTo`, `goTo` (animated, one leaf at a time), `step(±1)` (extends a queue), `grab(dir)` (returns direction and progress; takes over a leaf already in the air), `drag(progress)`, `release(velocity)`, `setReduced`. **Progress is the single source of truth**: a leaf in the air can be grabbed where it is, an opposite key press sends it back, and nothing waits for an animation to finish. Write the tests first (including: queued steps, reversal mid-turn, re-grab in flight, nothing to grab past a cover, instant jumps and reduced motion).

**Input (book layout only):**

- Pointer: press and drag on either page, or on a **page corner** (a 10% hot zone, inside the shifting stack, with a dog-ear that scales in on hover and focus). Pressing a corner without moving turns the whole leaf (use `e.detail === 0` on `click` for keyboard activation so a mouse press doesn't turn twice). Capture the pointer, track speed over the last ~90ms, and set `touch-action: pan-y pinch-zoom`.
- Keys: ArrowRight/PageDown next, ArrowLeft/PageUp previous, Home/End the covers. **Never handle Space or Enter**, ignore keys when the target is an input, textarea, select or contenteditable (so the radio group keeps its arrows), and ignore modifier combinations.
- Links of the form `href="#pN"` (contents rows, top bar, "On WF-007 →") turn the book instead of scrolling. `#pN` also opens the book at that page on load (jump, no animation). Keep the address on the visible page with `history.replaceState`, never adding history entries, and don't rewrite a hash that already names the current spread.
- Set `inert` on pages that aren't on the current spread (only in book layout), and keep an `aria-live="polite"` line announcing the spread ("Pages 4 and 5 of 14: …").
- **Reduced motion:** turns are instant, the leaf can't be dragged, transitions are off. **Phones:** the engine never mounts.

## The 14 pages

Pages are 1:1.4, each in its own tone. Give every inner page a mono folio at the foot (number on the outer edge, "wowflutter · Issue 07" or the section name opposite).

1. **Cover (stock):** mono row "Issue 07 · Autumn 2026" / "WF-007"; a giant "07" in Young Serif with a pink off-register copy behind it; the **only h1**, "The Sound of Rooms"; a plate (`cover-portrait`, priority/LCP); the mark and "32 pages · Edition of 500".
2. **Editor's letter (worn):** "A note on rooms", two short paragraphs with a pink drop cap, the signature "Dee Okafor-Lind, editor", a masthead (Editor, Design, Print, Stitching).
3. **Contents (stock):** five rows, each a link: page number on a pink square, title, italic note. Stairwell sessions 04, The roster 07, The catalogue 10, The pressing plant 12, Get the next issue 13.
4. **Feature opener (a black page):** a plate (`feature-stairwell`), label "Feature · Low Ceilings, WF-007", the title "The stairwell sessions", an italic dek. Give this page an inset hairline so it reads against the black desk.
5. **Liner notes, part one:** a drop-cap story about finding a closed Victorian baths in March, plus a plate (`feature-baths`).
6. **Liner notes, part two (a pink page):** the pull quote "A room is the fifth member of the quartet, and the only one who never misses a rehearsal." (Ife Okoro, cello) and spec rows: Room Stairwell B, Eastgate Baths; Reverb RT60 2.8 s; Mics 4, plus 1 on the roof; Takes 11, heating off.
7. **Roster · Marl Quartet** (string quartet, Leeds), 8. **Ines Haverford** (piano and voice, Glasgow), 9. **Dunmore & Ash** (guitar and harmonium, Whitby): a plate that fills the free space, name, mono meta line, one italic question and a short answer, and a link "On WF-00X →" to the catalogue.
10. **Catalogue, Side A (worn)** and 11. **Side B (stock):** WF-001 to WF-008, each with artist, italic title, year, edition and a status chip (Sold out / In stock / At the plant, the last one pink). Include Marl Quartet, *Low Ceilings* as WF-007 and Penny Lowe Trio, *Night Bus Lullabies* as WF-008 (at the plant). Page 10 ends with a wide plate band (`sleeve-stack`); page 11 with "WF-008 reaches subscribers first. Get the next issue →".
12. **The pressing plant (worn):** "Where Thursdays go", a plate (`press-room`), and colophon rows: 500 copies on 180 g black vinyl; 32 pages stitched by hand; half-speed mastering; "14 of the 32 pages" on screen.
13. **Get the next issue (stock):** "Issue 08 is at the plant." An email field and a radio fieldset ("How should it reach you?": Side A, the zine in the post; Side B, email only; the chosen one fills pink). Validate in the browser with these errors: "Enter a valid email" / "Pick Side A or Side B". On success show "You're on the list." with a line about how issue 08 will arrive. **Never send a network request.**
14. **Back cover (a pink page):** the motto "Slightly off-centre, on purpose.", the mark and wordmark, "Records & zines · Leeds · Est. 2019", a CSS barcode, and a "Back to the cover" link.

The top bar (tape black, sticky in flow layout) has the logo, links Contents, Feature, Roster, Catalogue, Subscribe (the page anchors above) and a pink "Get the next issue" button.

## Images

Generate 8 black-and-white photocopied-zine photographs: 35 mm flash-on-film, hard on-camera flash, visible grain, lifted blacks, high contrast, real rooms and objects, no colour, no faces looking at the lens, no text. Keys: `cover-portrait` (3:2), `feature-stairwell` (4:3), `feature-baths` (3:2), `artist-marl`, `artist-ines`, `artist-dunmore` (1:1), `sleeve-stack` (16:9, to be cropped to a wide band), `press-room` (3:2). Process each by mapping its Rec.709 luma onto a ramp from `#14110F` to `#EFE6D4` so no photo hue survives; the pink pass behind each image is CSS.

Until an image exists, render a hatched stock placeholder labelled with its key, so the layout never breaks.

## Quality bar

- Only `transform`, `opacity` and the leaf shade animate. UI transitions stay under 300ms with `cubic-bezier(0.23, 1, 0.32, 1)`. Hover effects only apply on `(hover: hover) and (pointer: fine)`. Buttons press to `scale(0.97)`.
- Accessibility: one h1; real buttons, links and form controls; visible focus (3px, ink on paper and pink on black); AA contrast; errors tied to inputs with `aria-describedby`; success in a `role="status"`.
- No horizontal overflow at 375px. Pages never overflow in the book layout at 1280×720 or 1440×900.
- Test the pure maths (spreads, turn, keys, engine, catalogue, contents, form validation) and write an end-to-end spec for the drag, the keys, deep links, the contents jump, the form and the phone layout.
