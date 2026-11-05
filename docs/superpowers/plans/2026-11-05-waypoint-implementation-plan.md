# Waypoint Landing Page Implementation Plan (Stack-Agnostic)

> **For AI Coding Generators & Engineers:** This implementation plan provides a modular, step-by-step sequence to build the "Waypoint" landing page. It is intentionally stack-agnostic so it can be implemented in Google AI Studio, React, Vue, Svelte, or Vanilla HTML/Tailwind.

**Goal:** Build a complete, responsive landing page for "Waypoint" featuring a light pastel brown atmospheric hero, continuous parallax scroll-reveal pipeline deck, 4-card interactive feature bento, pricing cadence flip with rolling odometer numbers, FAQ accordion, early access card, and deep contrast colophon footer.

**Spec Reference:** [`docs/DESIGN.md`](file:///E:/orca/workspaces/webflow-projects/docs/DESIGN.md) and [`docs/superpowers/specs/2026-11-05-waypoint-landing-spec.md`](file:///E:/orca/workspaces/webflow-projects/docs/superpowers/specs/2026-11-05-waypoint-landing-spec.md)

---

## Global Design Rules & Constraints

1. **Palette:**
   - Background canvas: Light Pastel Brown (`#EDE6DF` / `#F5EFEB`).
   - Card surfaces: Pure Crisp White (`#FFFFFF`).
   - Text color: Deep Obsidian / Charcoal (`#121417` / `#2B2F38`). **Never use brown for text.**
   - Accent badges: Pastel Sage (`#D8EADF`), Pastel Sky (`#DBE8FA`), Pastel Apricot (`#FCE8DC`), Pastel Lavender (`#ECE6F6`).
   - Colophon footer: Deep Obsidian Navy (`#16181D`).
2. **Typography:** Geometric sans-serif with tight tracking (`-0.035em`) on headings and tabular numerals (`font-variant-numeric: tabular-nums`) for currency and calendar cells.
3. **Motion:** Smooth transforms and opacities only. Parallax scroll must be continuous and passive without wheel locking.

---

## Task Decomposition

### Task 1: CSS Variables & Design Tokens Setup
- Define the `:root` tokens for `--wp-bg-primary`, `--wp-bg-hero`, `--wp-text-primary`, `--wp-text-body`, `--wp-text-muted`, and pastel accent tokens.
- Establish baseline resets: `box-sizing: border-box`, smooth scrolling, and font smoothing.
- Include a `@media (prefers-reduced-motion: reduce)` block that resets all transitions and transform offsets to 0.

### Task 2: Pure Interaction Logic & Math Functions
- **Parallax Math:** Pure function `calculateParallaxOffset(scrollY, maxOffset = 110, factor = 0.22)` returning clamped offset.
- **Pricing Calculation:** Pure function `calculatePrice(plan, cadence)` returning `{ price: 0 | 28 | 22 | 58 | 48, period: "/ a month" }`.
- **Pipeline Progression:** Pure function `cycleStage(currentStage)` advancing cards through `pitched` → `in_review` → `panel_round` → `offer_stage`.

### Task 3: Floating Navigation Header
- Semantic `<header>` fixed at top with backdrop blur (`backdrop-filter: blur(14px)`).
- Brand lockup: Navigation chevron icon + bold wordmark **Waypoint**.
- Center navigation anchors: `Features`, `Pipeline`, `Pricing`, `FAQ`.
- Right actions: "Sign in" link + "Get started" obsidian pill button.
- Responsive mobile drawer toggle.

### Task 4: Full-Bleed Pastel Hero & Parallax Pipeline Deck
- Full-bleed background (`min-h-[92vh]`) in light pastel brown atmosphere.
- Category pill: *"Direct career outreach & pipeline tracking • Free to start"*.
- Hero H1: *"Pitch with intention. Land the offer."*
- Hero paragraph and CTA buttons: *"Start your pipeline →"* and *"See the flight deck"*.
- Social proof avatar row with counter.
- **Pipeline Deck (The Fold Cutoff):**
  - Crisp white card centered with top ~45% exposed at load.
  - Active breadcrumb: `Searches / Q4 Active Pipeline` and status pill `Elena at Anthropic replied • 12m ago`.
  - 4 columns: `Pitched`, `In Review`, `Panel Round`, `Offer Stage`.
  - Passive scroll listener bound to `requestAnimationFrame` translating the card upward as user scrolls.

### Task 5: 4-Card Feature Bento Grid (Playable Widgets)
- Responsive 2-column asymmetric desktop grid, 1 column on mobile.
- **Card 1 (Rounds in focus):** Month header + interactive calendar day cells. Clicking dates displays scheduled technical panel notes and checklist.
- **Card 2 (One board for every stage):** Mini Kanban board. Clicking/dragging candidate company cards cycles them across columns and updates counters.
- **Card 3 (Private by architecture):** Lavender security shield badge with clickable toggle displaying E2EE active status.
- **Card 4 (Live Recruiter Signal):** Real-time message card with a "Simulate Recruiter Inbound" button that slides in an incoming recruiter message toast.

### Task 6: Pricing Grid with Cadence Flip & Rolling Numbers
- Header with `Pricing` eyebrow and *"Transparent while you search."* headline.
- Segmented toggle control: `Monthly` vs `Annual (Save 20%)`.
- 3 cards:
  - Starter ($0 / free).
  - Professional ($28 ↔ $22/mo with pastel sky highlight).
  - Studio & Coaching ($58 ↔ $48/mo).
- Vertical rolling odometer animation when prices change.

### Task 7: FAQ Accordion Section
- Section container anchored at `#faq`.
- 4 collapsible cards (Gmail OAuth sync, client encryption privacy, CSV pipeline exports, Starter plan limits).
- Keyboard accessible (`Enter`/`Space`) with smooth height expansion and animated disclosure indicator.

### Task 8: Conversion Waitlist Card & Colophon Footer
- Floating white card: *"Give every outreach conversation a clear paper trail"* with email input field and floating frosted tech company logo pills (Linear, Stripe, Figma, Anthropic, Vercel, Airbnb).
- Deep obsidian navy footer (`#16181D`):
  - Waypoint brand lockup and mission statement.
  - Newsletter input.
  - 4 navigation columns (Product, Company, Resources, Legal).
  - Giant embossed lowercase watermark `waypoint` across the bottom.

### Task 9: Verification & Responsiveness Pass
- Verify layout across breakpoints: 1440px desktop, 1024px tablet, and 390px mobile.
- Verify that text colors are strictly obsidian/charcoal on all surfaces and zero brown text exists.
- Verify that all interactive controls work without errors in-memory.
