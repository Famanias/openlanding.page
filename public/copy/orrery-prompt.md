# Prompt: rebuild "Orrery" (presentation-style landing page)

Paste everything below the line into your AI coding agent.

---

Build a landing page in **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** for a fictional AI company called **Orrery**. It's "the orchestration layer for teams of AI agents": it coordinates specialised agents the way a clockwork orrery moves its planets.

The page must work as a **10-slide keynote**, and look editorial and hand-crafted, never like a component kit or a generic AI site.

**Reference images** (look and feel only; generate your own): https://openlandingpage.vercel.app/templates/orrery/title-orbits-1600.webp, …/problem-single-1600.webp, …/usecase-1-1600.webp, …/security-texture-1600.webp. The live template is at https://openlandingpage.vercel.app/orrery.

## Brand

- **Palette, four colours only:**
  - ink `#0E0F13`
  - bone `#F2EFE8` (the page background)
  - ultramarine `#2F3BFF` (the single accent)
  - amber `#FFB000` (rare secondary)

  Make tints with `color-mix()` of these. Never introduce other hues, gradients, glows, purple, robots, brains or circuit imagery.
- **Type (via `next/font/google`):**
  - **Instrument Serif** 400 for display and headings. Every headline ends in an *italic turn*, for example "Many agents, *one clockwork.*"
  - **Inter Tight** for body text, 17px / 1.55.
  - **Geist Mono** 12px uppercase with 0.08em tracking for labels, the counter, buttons and eyebrows.
- **Logo:** the word "Orrery." in Instrument Serif with the full stop in ultramarine.
- **Icon:** a dot inside two concentric orbit rings, with one ultramarine satellite at the top right, on a bone rounded square.
- **Layout:**
  - Gutter `clamp(20px, 5vw, 80px)`, 12-column grid with 24px gaps.
  - Each slide opens with a mono eyebrow: a 28px rule, then "03 — The orrery".
  - Buttons are 44px pills: outline, or solid ultramarine.

## Keynote mechanics (desktop ≥ 900px without reduced motion)

- The page doesn't scroll. All slides are absolutely stacked at full viewport size.
- Each slide gets `data-state` = `past` / `active` / `future`:
  - **future:** `clip-path: inset(100% 0 0 0)`, on top.
  - **active:** `inset(0)`.
  - **past:** `inset(0)` plus `translateY(-7vh)`, underneath.
  - Transition clip-path and transform over 700ms `cubic-bezier(0.77, 0, 0.175, 1)`, so the next slide wipes up over the previous one.
- **Input:**
  - Wheel and touch go through GSAP `Observer` with `wheelSpeed: -1`, `onUp` → next, `onDown` → previous, and a 650ms lock per step.
  - Keys: ↓ → PageDown Space go forward, ↑ ← PageUp go back, Home/End jump to the ends. **Ignore keys whose target is an input, textarea, select or contenteditable.**
- **Chrome:**
  - A fixed slide counter "03 / 10" at bottom left (mono pill).
  - A chapter rail at right: one button per slide, shown as a short rule. The active one has a long rule, and labels reveal on hover.
  - A fixed top bar with the logo and a "Book a demo" button that links to `#cta`.
  - The bar, counter and rail switch colours with the active slide's tone.
- **Deep links:** each slide has an id. The hash updates on change and is read on load. Disable transitions until after that first jump.
- **Mode detection:** start in an "unknown" mode, then use `matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')`. Only attach keynote listeners or flow-mode observers once the mode is known.
- **Content build:** inside the active slide, children fade and rise 18px, staggered `index × 80ms + 280ms`.

**On phones and with reduced motion:** render the slides as normal stacked full-height sections with ordinary scrolling. The counter follows an IntersectionObserver. Nothing waits on an animation to become visible.

## The 10 slides (bone background unless marked ink)

1. **Title:**
   - Mono kicker "The orchestration layer for AI agents" in ultramarine.
   - Display h1 "Many agents, / *one clockwork.*"
   - One-sentence lead, buttons "Book a demo" (solid) and "How it works →".
   - A brass-orrery photo on the right 5 columns.
   - Hint text "Scroll, or press →".
2. **Problem:** a portrait photo of a lone brass sphere at left, then the h2 "One agent *isn't* a team." and three numbered failures: "It loses the thread." / "It does everything at one depth." / "Nobody checks its work."
3. **The orrery (ink):**
   - h2 "Specialists on their own orbits, *kept in time.*" with a 5-row legend: The conductor, Researchers, Builders, Shared memory, The hand-off (in amber).
   - An SVG diagram in a 600×600 viewBox that builds every 450ms while active:
     - core
     - inner orbit with 2 bone agents
     - outer dashed orbit with 3 agents, one large and ultramarine
     - thin links from the core to every agent
     - an amber dot travelling core → inner agent → ultramarine agent (`animateMotion`)
   - Each legend row lights up as its step appears. Under reduced motion it's fully built.
4. **How it works:** h2 "Three steps from brief *to finished work.*" Then three columns, each with a big ultramarine serif numeral, an h3 and a line of text: Describe the work / Orrery assembles the team / Review, approve, ship.
5. **Use cases:** h2 "Where teams put *it to work.*" Three cards (a 4:3 image, an h3, text): Customer operations / Research and analysis / Software engineering.
6. **Results:** h2 "Measured in work *that ships.*" Three huge serif figures with ultramarine units that count up when the slide is active: 4.2×, 63%, 99.6%. Short labels and a mono footnote.
7. **Customers:** a large italic serif pull quote over a faint ink-wash circle texture, plus two smaller quotes with names and roles.
8. **Pricing:** h2 "Priced by the team, *not the token.*" Three tiers: Starter $49, Team $390 (ink-filled, amber "Most teams" badge) and Enterprise Custom. Each has check-mark features.
9. **Security (ink):** h2 "Built for teams that *answer to auditors.*" A 2×3 grid of claims (SOC 2 Type II, data residency, every hand-off logged, approval gates, no training on your work, SSO and SCIM) and a guilloché-texture image column.
10. **Book a demo:**
    - Display "Put your agents *in orbit.*" and a lead paragraph.
    - A form card with Name, Work email and Company. Validate client-side with these errors: "Add your name" / "Enter a work email" / "Add your company".
    - On success, show "Thanks — we'll be in touch within one working day." **Never send a network request.**
    - Footer row with the mark, "© 2026 Orrery Labs" and links.

## Images

Generate 8 editorial still-life images. The style: warm bone paper, near-black ink, small ultramarine and amber accents, brass, glass and paper, soft daylight, lots of negative space. No people, screens, robots or text.

Keys: `title-orbits` (16:9), `problem-single` (4:5), `usecase-1..3` (4:3), `quote-texture` (1:1), `security-texture` (16:9), `og-base` (16:9).

Until an image exists, render a hatched placeholder box labelled with its key, so the layout never breaks.

## Quality bar

- Motion: only `transform`, `opacity` and `clip-path` animate. UI transitions stay under 300ms with `cubic-bezier(0.23, 1, 0.32, 1)`. Hover effects only apply on `(hover: hover) and (pointer: fine)`. Buttons press to `scale(0.97)`.
- Accessibility: slides have `aria-roledescription="slide"` and labels. Inactive slides are `inert` in keynote mode. The counter is `aria-live`. Focus outlines are ultramarine.
- No horizontal overflow at 375px. No layout shift from the deck on first paint.
