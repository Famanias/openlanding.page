# Prompt: rebuild "SUNDIAL Coffee Roasters" (roast-curve scroll showcase)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional specialty coffee roastery called **SUNDIAL Coffee Roasters** (slogan *"Roasted to the minute."*, motto *"Small lots, read by the curve."*). It roasts 12 kg batches, logs every second of each roast, and prints the curve on the bag.

**The central metaphor: a roast is a curve of time and heat, so the page is a roast curve you scrub.** A pinned stage turns scroll progress into elapsed roast time — temperature climbs, the bean graphic darkens from green to espresso, and the development % counts up. It must feel sunny, bold, modern, friendly and appetizing — modern coffee retail (think chain-café friendliness with specialty precision), never moody-luxury. **Everything is heavily rounded: cards 24–32px, buttons and chips full pills.**

**Reference (look and feel):** the live template at https://openlandingpage.vercel.app/sundial (once published) and the brand board palette below.

## Brand rules

- **Six colours only:**
  - espresso `#241611` (ink: text, dark slabs — the Roast stage and Wholesale)
  - crema `#F7F1E6` (paper: page ground)
  - tangerine `#FF6B1A` (the single accent: pill buttons, the live curve, readout digits, the traveling dot)
  - roast green `#0F5C3F` (rare secondary: first-crack marker, error text, the Brew bench ground, perk bullets)
  - oat `#EADBC4` (tint: cards, panels, chart grid)
  - husk `#6F6152` (muted text, captions, eyebrows)

  **Tangerine is a fill, never small text on paper (2.5:1).** On tangerine use espresso text (6.1:1), never crema. All tints with `color-mix()` of these six hexes. The bean-colour ramp (green → hay → brown → espresso) is content colour, exempt in `scripts/templates.config.ts`.
- **Type (via `next/font/google`, distinct variable names):**
  - **Archivo 800** for display and headlines (hero at `clamp(46px, 9vw, 124px)`), with the final word of the hero headline in tangerine.
  - **Figtree** 400–600 for body, 17px / 1.6.
  - **Space Mono** 400/700 (`preload: false`) for labels, readouts, chips, stamps, buttons — 0.1em tracking, uppercase.
- **Logo:** a dial disc seen from above — a filled circle, an S-curve shadow that doubles as a coffee bean's crease, and a tangerine pivot dot where the gnomon stands. Wordmark "SUNDIAL" in Archivo 800 with "COFFEE ROASTERS" tracked wide in Space Mono beneath. Draw it as inline SVG (`currentColor` disc, crease colour per ground) plus `icon.svg` and a 1200×630 `opengraph-image.tsx`.
- **Custom graphic grounds (no photo needed for these):**
  - Sunburst: `repeating-conic-gradient` rays, faded under a radial crema overlay (hero).
  - Bean macro: `radial-gradient` ellipse tiled 56×68px on espresso (Roast stage, Wholesale).
  - Chart grid: two `repeating-linear-gradient` axes on crema (Lots, Subscribe).

## Page

1. **Floating pill top bar** (fixed, ~64px, crema at 92% with blur, 9999px radius, soft shadow): lockup left; nav links (The Roast, Lots, Brew bench, Subscribe) hidden under 900px; tangerine "Order bags" pill right.
2. **Hero** on the sunburst ground: mono eyebrow "Batch 041 · Roasted 06:12 Monday", h1 "Every batch has a curve.", lead, tangerine + outline pill buttons; on ≥900px the copy takes 7 columns and a 4:3 photo frame (kraft bags on a crema counter) takes 5; three readout stats (12 kg / 24% / 12 h) span the width over a hairline rule. Photo frames render a labelled placeholder until the generated image exists.
3. **The Roast (the mechanic).** Dark espresso section over the bean pattern. On desktop (≥900px, motion allowed) the stage is `position: sticky` inside a 380vh outer; scroll progress maps to 0–690 s. A real `<input type="range">` pill scrubber (and arrow keys / PageUp / Home / End) scrubs the same clock.
   - **The maths (pure functions, unit-tested):** total `690 s` (11:30), first crack `522 s` (8:42), charge 205 °C. Bean temp is piecewise-linear through control points `[0,205] [80,92] [180,146] [300,166] [420,184] [522,196] [600,203] [690,208]`. Development % = `(elapsed − 522) / 690 × 100`, zero before the crack. Six stages by elapsed: charge [0,80), drying [80,240), maillard [240,522), firstcrack [522,600), development [600,690), drop [690].
   - **Rendering:** an SVG chart with grid, a ghosted full curve, the drawn portion via `stroke-dasharray/offset` (`pathLength=100`, offset transitions ≤80 ms), a roast-green dashed first-crack marker that fades in at 8:42, and a tangerine traveling dot. Right column: stage label, blurb, and big mono readouts (bean temp, elapsed, dev % — visually hidden span keeps the final value). A bean swatch (`border-radius: 999px` + a rotated crease) darkens with elapsed. A dashed "batch stamp" rotates −2°/2°.
   - `aria-live="polite"` announces **stage changes only**.
   - **Under reduced motion / on phones:** never pins; the panel renders in normal flow with a usable scrubber, followed by a static six-row stage log (all content visible).
4. **Lots** on the chart grid: a chapter head pairing copy with a 1:1 kraft-bag photo, then four typed lot cards (LOT 041 Kayon Mountain Ethiopia 87.5; LOT 038 Finca La Esperanza Colombia 86.5; LOT 034 Sítio Bela Vista Brazil 85.0; LOT 042 Gichathaini AA Kenya 88.0) — mono code, bean dot, name, origin line, tasting-note chips, story, cupping score + price + espresso "Order" pill.
5. **Brew bench** on roast green: a mirrored chapter head (3:2 pour-over macro left, copy right), then three tab pills (V60 / Aeropress / Espresso, `role="tablist"`), a dark-green panel with dose/water/ratio/time readouts (ratio `1:16.7`, espresso shows yield %) and numbered step pills. Pure data functions, tested.
6. **Subscriptions** on the chart grid: three pill-forward plan cards priced **per delivery, never per month** (bags, not billing periods) — One bag $17 (1 × 340 g, every 2 weeks), Two bags $32 (featured: tangerine border + "Most ordered" badge, 2 × 340 g, every 2 weeks), Counter refill $52 (4 × 340 g, every 4 weeks) — each showing its per-bag price, green perk bullets and a full-width CTA. Per-bag prices must beat the cheapest counter bag.
7. **Wholesale** on the bean ground: copy + chips + a 3:2 counter-scene photo left, crema rounded form right — name, business, email, volume select, message; **client-side validation with tested rules** (required fields, email regex, volume whitelist, 600-char message cap), rosette-green errors, success state without any network request.
8. **Footer** on crema: giant "Roasted to the minute." (final word tangerine), lockup, counter hours, page links, legal line.

## Quality bar (must hold)

- Animate only `transform` / `opacity` (the curve's dashoffset is the one exception); every motion keyed on state and interruptible; `prefers-reduced-motion` shows everything static.
- One h1, landmarks, real buttons/links, AA contrast, visible focus rings (espresso on light, tangerine on dark).
- Folder isolation: import only npm packages and files inside `src/app/(sundial)/`; no `@/` aliases. Six-colour palette registered in `scripts/templates.config.ts`.
- Structure: `brand/`, `sections/`, `roast/` (mechanic), `brew/`, `forms/`, typed content in `content/`, pure logic with `*.test.ts` beside it, `assets.tsx` with labelled placeholders.
- Unit tests for the roast maths, the store, scroll progress, brew ratios and form validation; `tests/e2e/sundial.spec.ts` covering the scrubber, hash nav, keyboard, form success and phone layout.
- No lorem ipsum. Specific numbers everywhere: 12 kg, 8:42, 24 %, 87.5, $22.
