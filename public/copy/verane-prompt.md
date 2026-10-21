# Prompt: rebuild "MAISON VÉRANE" (fragrance house landing page with interactive dry-down & organ)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional haute perfumery house in Grasse called **Maison Vérane** (slogan *"Composed slowly. Worn for hours."*, motto *"Perfume, as it is meant to unfold."*). It is an independent atelier on Rue de l'Oratoire that formulates four perfumes a year in single editions of 400 numbered flacons, macerated in Limousin oak for eighteen months.

The central metaphor: **A perfume isn't one smell; it changes on skin over twelve hours. So the page is a dry-down:** a pinned time scrubber runs from Hour 0 to Hour 12, and as it moves, top notes dissipate first, then the heart, until only the base resins cling to skin. The architectural flacon's liquid tiers drain to match. The perfumer's organ configurator uses the same clock to test custom formulas.

**Reference** (look and feel): the live template at https://openlandingpage.vercel.app/verane.

## Brand rules

- **Six colours only, drawn from natural raw materials:**
  - oud `#2A1E22` (ink: primary text on Calcaire, dark chapters for the Dry-Down and Appointments)
  - calcaire `#E3DFD8` (paper: limestone page ground, text on dark chapters)
  - orris `#655A7E` (the single accent: buttons, live hour readout, selected vial, heart liquid band)
  - gilt `#B59A6A` (rare secondary: hairlines and italic turns **on Oud only**; never text on Calcaire)
  - veil `#CFC9C0` (soft tint: cards, rules, organ panels)
  - ash `#5F5753` (muted text, captions, secondary borders)

  **Gilt is strictly an accent on dark backgrounds**, never body text on paper. All tints must be generated with `color-mix()` of these six hex tokens. Never introduce additional hex colors, neons, or digital gradients.
- **Type (via `next/font/google`, with distinct variable names):**
  - **Bodoni Moda** (variable weight + `opsz` axis, normal and italic) for display titles (h1, h2, h3, fragrance titles). Every headline ends in an *italic turn* ("A fragrance is *twelve hours long.*").
  - **Hanken Grotesk** (variable) for clean editorial body text (300 for leads, 400 for reading).
  - **Spline Sans Mono** (variable, `preload: false`) for lab ledgers, timestamps, batch numbers, eyebrows, and the live hour readout: uppercase, 0.12em tracking.
- **Mark:** a crystal perfume drop divided into the three evaporation tiers (top, heart, base). In the nav bar, the drop mark dynamically drains as you move through the dry-down clock.
- **Hero:** full-bleed 16:9 photographic still-life with an asymmetrical layout: crystal flacon on a limestone plinth on the right third, deep shadow on the left 45% overlaid with an Oud scrim to ensure WCAG AA contrast for text. On mobile (≤640px), the image crops around the flacon and sits above the copy.
- **Buttons:** 48px rectangular pills with square corners, solid Orris or 1px outline. Press state scales to `scale(0.97)`.

## The Dry-Down mechanic

- **Quadratic scroll-to-hour curve (desktop ≥ 900px without reduced motion):**
  - The Dry-Down section is `340svh` tall with a sticky `100svh` stage.
  - `progress = clamp(-rect.top / (rect.height - innerHeight), 0, 1)`.
  - `hour = 12 · progress²`. The first 25% of scroll travel covers the opening 45 minutes, where volatile citrus top notes disperse.
  - Inverted for the range input: `progress = sqrt(hour / 12)`. Dragging or using keyboard steps sets the hour and scrolls smoothly into place.
- **Evaporation mathematics (pure, tested functions):**
  - Every note defines `onset` (peak hour), `fade` (evaporation onset), and `gone` (complete dissipation).
  - `intensity`: ramps in before `onset` over `min(onset, 0.5)`, holds at 1 until `fade`, linearly decays to 0 at `gone`.
  - `remaining`: 1 until `fade`, linearly decays to 0 at `gone`.
  - `tier level`: maximum remaining volume across notes in that tier (0..1), driving the SVG liquid bands of the flacon.
  - `state`: `emerging` | `present` | `fading` | `gone`. Evaporated notes are struck through with `line-through` and reduced opacity (never removed).
- **Dominant tier & accessibility:**
  - `getDominantTier(notes, hour)` determines whether Top, Heart, or Base currently leads the sillage.
  - The range scrubber has `aria-valuemin="0"`, `aria-valuemax="12"`, `aria-valuenow`, and `aria-valuetext="H 03:20, leading Heart notes"`.
  - An `aria-live="polite"` region announces only when the dominant tier shifts ("At 3 hours, the heart notes now lead..."), avoiding repetitive noise on scroll.
- **Shared clock architecture:**
  - A central observable store (`createClockStore`) synchronizes the hour across the sticky header readout, the dynamic nav mark, the main Dry-Down stage, and The Organ composer.
- **Phones & reduced motion:**
  - Rendered in flow mode (`data-mode="flow"`, no sticky pinning). The scrubber sits below the flacon and updates the note pyramid in place. Under `prefers-reduced-motion`, all transitions are instant.

## The Organ (bespoke composer)

- Three tiers of 5 botanical distillations each (Top, Heart, Base).
- Selecting 1 vial per shelf generates:
  - A bespoke title (e.g. *"Néroli · Iris · Labdanum"*);
  - A unique batch code (`B-0111` through `B-0555`);
  - Longevity projection (`Lasts past 16 h on skin`);
  - A live dry-down strip and testing scrubber that uses the shared dry-down engine.

## Sections

1. **Header:** sticky Calcaire bar, dynamic draining mark, nav anchors, live readout "H 03:20", appointment CTA.
2. **Hero:** 16:9 full-bleed photo (`hero-flacon`), Oud shadow scrim, display headline with italic turn.
3. **The Dry-Down:** pinned laboratory stage (flacon + note pyramid + scrubber + fragrance switcher).
4. **The Hours:** four annual editions (Nº 1 Première Heure, Nº 2 Iris Calcaire, Nº 3 Fumée Lente, Nº 4 Nuit d'Oratoire) with individual notes, maceration records, and dry-down strips.
5. **The Organ:** interactive three-tier raw material composer with instant formula derivation.
6. **The Atelier:** four key numbers (312 raw materials, 18 mo. maceration, 400 flacons, 4 editions), three botanical plates, the Maceration Ledger table, and the Iris fields banner.
7. **Appointments:** dark Oud chapter with salon protocol details, location info, and client-side validated booking form with accessible success feedback.
8. **Footer:** brand colophon, anchors, Grasse legal registry.

## Quality bar & tests

- Only `transform` and `opacity` animate. Transitions remain under 250ms using `--ease-drain`.
- Client-side validation for the appointment form without network calls.
- Unit tests cover clock maths, quadratic curve inversion, evaporation dynamics, scroll progress, store subscriptions, organ formula derivation, and form validation.
- E2E spec verifies page load, header draining mark, scrubber interaction, keyboard stepping, organ selection, form submission, 375px mobile responsiveness, and reduced motion.
