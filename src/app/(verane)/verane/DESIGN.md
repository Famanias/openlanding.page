# MAISON VÉRANE: design system

A landing page for a fictional perfume house in Grasse. **A perfume isn't one smell; it changes on skin over twelve hours. So the page is a dry-down:** a time scrubber runs from Hour 0 to Hour 12, and as it moves the top notes evaporate first, then the heart, until only the base remains. The flacon's three liquid bands drain to match.

## Requirements

Copy two folders into a fresh Next.js app (`npx create-next-app@latest --ts --tailwind --app --src-dir`) and delete the scaffold's `src/app/layout.tsx`, `page.tsx` and `globals.css`. Nothing to install: the template imports no npm packages beyond Next and React.

- **Next.js ≥ 16.4** (App Router, a route group with its own root layout, `next/font/google`, `next/og`)
- **React ≥ 19** (`useSyncExternalStore`), **Tailwind CSS v4** (from `create-next-app`)
- A browser with `color-mix()`, `position: sticky` and `svh` units (all evergreen browsers)
- Folders: `src/app/(verane)/` (code) and `public/templates/verane/` (images)
- `*.test.ts` files are optional and need `vitest`

## Concept

Maison Vérane is a five-person perfume house on Rue de l'Oratoire in Grasse. It composes four fragrances a year, rests each in oak for eighteen months, bottles 400 flacons per edition and sells only by appointment.

- **The idea → the mechanic:** a fragrance is twelve hours long, so the page lets you *scrub through those hours*. The Dry-Down chapter pins on desktop and scroll progress becomes the hour. The scrubber is a real range input, so you can also drag it or use the keyboard. Every note has an evaporation window and fades, then strikes through when it's gone.
- **One clock for the page.** The nav readout, the nav mark, the Dry-Down stage and The Organ composer all read the same hour from one store. Moving the Organ's own scrubber moves the nav readout too.
- **Mood:** hushed, mineral, slow, tactile, exact. No gold gradients, no sparkle, no celebrity faces.

## Palette: honed limestone, oud resin, orris root, gilt foil

| Token | Hex | Role |
|---|---|---|
| `--color-oud` | `#2A1E22` | Ink: text on Calcaire, the dark chapters (Dry-Down, Appointments) |
| `--color-calcaire` | `#E3DFD8` | Paper: the page ground, text on Oud |
| `--color-orris` | `#655A7E` | **The single accent:** buttons, the live readout on paper, the selected vial, the heart band |
| `--color-gilt` | `#B59A6A` | Rare: hairlines and italic turns **on Oud only** (2.0:1 on Calcaire, so never text there) |
| `--color-veil` | `#CFC9C0` | Tint: cards, rules, the Organ panel |
| `--color-ash` | `#5F5753` | Muted text and captions on Calcaire (5.3:1) |

Orris on Calcaire is 4.8:1 (AA). Calcaire on Orris (the button) is 4.8:1. Tints come from `color-mix()` of these tokens, never new hexes. `npm run check` fails any other hex.

## Type

| Role | Font | Use |
|---|---|---|
| Display | **Bodoni Moda**, variable weight + `opsz` axis, normal and italic | h1–h3, fragrance names, note names. Every headline ends in an *italic turn* ("A fragrance is *twelve hours long.*") |
| Body | **Hanken Grotesk**, variable | 300 for large leads, 400 for reading at 17px / 1.6 |
| Utility | **Spline Sans Mono**, variable | the hour readout, timings, batch numbers, eyebrows; 11–13px, uppercase, 0.12em tracking |

Variables are named after the families (`--font-bodoni-moda`, `--font-hanken-grotesk`, `--font-spline-mono`) so the `@theme` tokens can't reference themselves. The mono font isn't preloaded. Headlines size with `clamp()`.

## Layout

- Gutter `clamp(20px, 5vw, 80px)`, max content width 1320px, 12-column grid on wide screens.
- Each chapter opens with a mono eyebrow: a 32px rule, then "§ 02 — The Dry-Down".
- Sticky 64px header on Calcaire: the mark (which drains), four anchors, the live readout, and "Request an appointment".
- Sections: **Hero** (full-bleed photo, Oud scrim on the left, copy bottom-left; on phones the photo is cropped around the flacon and sits above the copy) → **The Dry-Down** (Oud, pinned) → **The Hours** (four fragrance cards) → **The Organ** (bespoke composer) → **The Atelier** (numbers, maceration ledger, iris-field band) → **Appointments** (Oud, form) → Footer.
- Cards, picture frames, and metric containers feature refined rounded edges (`rounded-2xl` / `1.25rem`, nested elements `rounded-xl`).
- Call to action buttons are 48px pill-shaped rounded actions (`border-radius: 9999px`): solid Orris, or a 1px outline. They press to `scale(0.97)`.

## The mechanic: the dry-down

### Data

Every note has three times, in hours: `onset` (it's fully present), `fade` (it starts to leave) and `gone`. Notes with a non-zero onset ramp in over `min(onset, 0.5)` hours. `gone` may exceed 12: base notes are still there the next morning.

```
intensity(h) = ramp-in before onset · 1 from onset to fade · linear to 0 at gone
remaining(h) = 1 until fade · linear to 0 at gone        (how much of it is still in the bottle)
state(h)     = emerging | present | fading | gone
tier level   = max remaining over that tier's notes      (drives the flacon bands and the nav mark)
dominant     = the tier with the highest intensity; ties go to the earlier tier
```

### Scroll → hour (desktop ≥ 900px, no reduced motion)

- The Dry-Down section is `340svh` tall with a `100svh` sticky stage.
- `progress = clamp(-rect.top / (rect.height - innerHeight), 0, 1)`, read from the section's real rect.
- `hour = 12 · progress²`. The first quarter of the scroll covers only the first 45 minutes, where the top notes live, so the fast part of the perfume gets the most scroll.
- **The range input writes the scroll position:** dragging calls `scrollTo(sectionTop + progressFromHour(h) · travel)`, so scroll stays the single source of truth while you're in the section. Scroll only updates the clock while the section intersects the viewport, so the Organ can move the clock elsewhere on the page without being overwritten.

### Keyboard

The scrubber handles ← ↓ (−15 min), → ↑ (+15 min), Page Down (−1 h), Page Up (+1 h), Home (Hour 0) and End (Hour 12) through a pure `stepHour`. It's a focused form control, so it never steals keys from anything else.

### Phones and reduced motion

The section isn't pinned (`data-mode="flow"`). The scrubber sets the hour directly, changes are instant, and every note's timing is printed beside it, so nothing is hidden behind the animation. Mode starts as `unknown` and is resolved with `matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')`.

### Announcements

The range carries `aria-valuetext` ("Hour 3:20, heart notes"). A polite live region announces only changes of dominant tier ("The heart notes now lead"), never every minute.

## The Organ

Perfumers compose at an *organ*: tiered shelves of raw materials. The composer has three radio groups (Top, Heart, Base) with five notes each. The result card shows:
- the blend name ("Néroli · Iris · Labdanum");
- a batch number derived from the selection (`B-0101` to `B-0225`);
- how long it lasts ("Lasts past 12 h");
- a mini flacon and dry-down strip drawn at the shared hour, plus its own scrubber on the same clock.

## Motion

- Easing tokens in `@theme`: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for UI, `--ease-drain: cubic-bezier(0.33, 0, 0.2, 1)` for band and note changes.
- Band levels animate `transform: scaleY()` from the band's bottom edge. Notes animate `opacity`. Both use 220ms transitions, so keyboard steps glide and scroll-driven changes stay continuous. There's nothing fire-and-forget; every change is keyed on state.
- The hero photo settles from `scale(1.04)` to `1` over 1.6s on load.
- Under `prefers-reduced-motion`, every transition and the hero settle are removed.

## Signature details

1. **Live hour readout:** "H 03:20" in the header and huge on the Dry-Down stage.
2. **The nav mark drains** with the clock: the brand's three-tier drop *is* the dry-down.
3. **Evaporated notes strike through** and drop to 35% opacity, but are never removed.
4. **Edition stamps** on each card: "Édition 07 · 400 flacons".
5. **The maceration ledger:** laid down, bottled and count, as a real table.
6. **Gilt hairlines** frame the Oud chapters.

## Do / Don't

- **Do** write in times and quantities ("forty minutes", "eighteen months", "400 flacons").
- **Do** keep Gilt on Oud only, and Orris as the one accent.
- **Don't** use "luxurious", "indulge", "sensual" or exclamation marks.
- **Don't** add gradients beyond the hero scrim, glows, sparkle or rounded pill UI.
- **Don't** animate layout properties; only `transform` and `opacity`.

## Files

```
src/app/(verane)/
  layout.tsx                    fonts, metadata, <html lang="en">
  verane/
    page.tsx                    composes the sections inside <ClockProvider>
    verane.css                  tokens and vr- classes
    icon.svg  opengraph-image.tsx  assets.tsx  assets.generated.ts
    DESIGN.md  PROMPT.md
    brand/Logo.tsx              Mark (with drain levels) and Lockup
    content/notes.ts            the note library (times in hours)
    content/fragrances.ts       the four fragrances (+ test)
    content/atelier.ts          numbers and the maceration ledger
    drydown/clock.ts            hour maths: format, scroll curve, keys (+ test)
    drydown/evaporation.ts      intensity, remaining, state, tiers (+ test)
    drydown/progress.ts         progress through a pinned section (+ test)
    drydown/clock-store.ts      the one shared clock (+ test)
    drydown/ClockProvider.tsx   context + useClock hooks
    drydown/useStageMode.ts     pinned | flow | unknown
    drydown/DryDown.tsx         the pinned stage
    drydown/Flacon.tsx  Scrubber.tsx  NotePyramid.tsx  DryDownStrip.tsx  FragranceSwitch.tsx
    organ/organ.ts              blend name, batch, longevity (+ test)
    organ/Organ.tsx
    sections/Header.tsx Hero.tsx DryDownSection.tsx Hours.tsx FragranceCard.tsx
             OrganSection.tsx Atelier.tsx Appointments.tsx Footer.tsx Eyebrow.tsx
    forms/validate-appointment.ts (+ test)  forms/AppointmentForm.tsx
```

## Imagery

Prompts are in `docs/image-prompts/verane.md`: still life with a medium-format film look, north-window light, limestone and linen, desaturated warm grey with a violet cast in the shadows, no text, no logos, no faces. Eleven images, keyed `hero-flacon`, `flacon-01`–`flacon-04`, `orris-roots`, `organ-shelves`, `iris-fields`, `hands-scale`, `oak-casks` and `salon`. Until each exists, `Picture` renders a labelled placeholder in the palette. Images are processed with `npm run images -- verane` (no colour treatment).
