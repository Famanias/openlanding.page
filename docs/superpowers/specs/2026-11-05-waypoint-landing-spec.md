# Architectural Specification: Waypoint Landing Page

## 1. Intent and Positioning

**Waypoint** is an editorial, high-trust career pipeline and direct-outreach platform tailored for senior software engineers, system architects, and product designers. Instead of unorganized spreadsheets or opaque recruiting portals, Waypoint structures cold outreach as an intentional, visual pipeline—empowering candidates to pitch hiring decision-makers directly, monitor live recruiter replies, and pilot interview rounds from initial contact to signed offer.

The landing page provides a distinct visual identity inspired by the continuous parallax reveal and tactile bento micro-sandboxes of modern high-end software, reimagined with a warm, light pastel brown atmospheric canvas and crisp obsidian typography.

---

## 2. Brand & Creative Identity

- **Brand Name:** Waypoint
- **Mark:** Sleek upward-pointing geometric navigation chevron inside a rounded badge.
- **Color Philosophy:**
  - **Canvas & Hero Backgrounds:** Warm, light pastel brown (`#EDE6DF`, `#F5EFEB`) and desert alabaster tones.
  - **Text & Typography:** Strictly Obsidian / Deep Charcoal (`#121417`, `#2B2F38`) and slate muted (`#666E7D`). **Zero brown text is used**, guaranteeing WCAG AAA readability.
  - **Surfaces & Cards:** Crisp pure white (`#FFFFFF`) to provide sharp optical lift and clean depth against the pastel brown background.
  - **Pastel Accents:** Soft pastel sage (`#D8EADF`), pastel sky blue (`#DBE8FA`), pastel apricot (`#FCE8DC`), and pastel lavender (`#ECE6F6`) for status chips, tags, and active states.
  - **Colophon Anchor:** Deep obsidian navy (`#16181D`) for the colophon footer.

---

## 3. Key Section Breakdown & Mechanics

### A. Navigation Header
- Floating, backdrop-blurred bar positioned at the top of the viewport.
- Brand lockup with chevron icon and "Waypoint" wordmark.
- Clean navigation links: Features, Pipeline, Pricing, FAQ.
- Primary CTA button in obsidian with warm cream text.

### B. Full-Bleed Light Pastel Brown Hero & Parallax Pipeline Deck
- Full-bleed hero canvas rendered with warm atmospheric tones and subtle horizon light.
- Centered headline: *"Pitch with intention. Land the offer."*
- Descriptive subhead and dual CTA buttons ("Start your pipeline →" and "See the flight deck").
- **Half-Shown Pipeline Deck (Fold Cutoff):**
  - Crisp white card anchored at the lower fold, with ~45% exposed at load.
  - Shows breadcrumbs (`Searches / Q4 Active Pipeline`), live status indicator (`Elena at Anthropic replied`), and 4 stages: `Pitched`, `In Review`, `Panel Round`, `Offer Stage`.
  - **Continuous Parallax Scroll:** As the user scrolls naturally, the deck glides upward via a relative translateY offset (`Math.min(scrollY * 0.22, 110)`), cleanly entering full view without any scroll hijacking or wheel locking.

### C. 4-Card Feature Bento Grid (Playable Micro-Widgets)
- **Card 1 (Rounds in Focus):** Interactive calendar for November / Week 45. Clicking dates inspects scheduled technical panel rounds and preparation checklists.
- **Card 2 (One board for every stage):** Playable 4-stage Kanban pipeline. Clicking or dragging candidate company cards cycles them across stages and updates column counters dynamically.
- **Card 3 (Private by architecture):** Client-side zero-knowledge encryption switch with security readouts ("E2EE AES-256 active • Zero telemetry").
- **Card 4 (Live Recruiter Signal):** Real-time notification feed with a "Simulate Recruiter Inbound" button that slides in an incoming recruiter response toast.

### D. Pricing Grid with Cadence Flip & Rolling Numbers
- Eyebrow: `Pricing`, Headline: *"Transparent while you search."*
- Segmented toggle: `Monthly` vs. `Annual (Save 20%)`.
- 3 Plans:
  - **Starter ($0 / permanent free):** 25 tracked pitches, verified lookup, basic templates.
  - **Professional ($28/mo ↔ $22/mo):** Highlighted card with pastel sky border. 350 tracked pitches, AI pitch drafting, multi-step sequences, engagement analytics. Price flips with a rolling odometer counter.
  - **Studio & Coaching ($58/mo ↔ $48/mo):** Unlimited pitches, team shared dashboard, custom sender domain. Price flips with rolling odometer.

### E. FAQ Accordion Section
- 4 clean collapsible cards addressing Gmail integration, client encryption privacy, CSV data exports, and Starter tier limits.
- Smooth CSS height transition with full keyboard accessibility.

### F. Early Access Conversion Card & Colophon Footer
- Floating white card: *"Give every outreach conversation a clear paper trail"* with validated email input and floating frosted company logo pills (Linear, Stripe, Figma, Anthropic, Vercel, Airbnb).
- Deep obsidian navy footer (`#16181D`) featuring brand positioning, quick newsletter input, 4-column navigation links, and a massive embossed watermark reading `waypoint`.

---

## 4. Stack-Agnostic Interaction & Layout Guidelines

- **Framework Independence:** This specification defines semantic DOM structure, CSS variables, layout geometry, and pure interaction formulas. It can be implemented in React, Vue, Svelte, or vanilla HTML/CSS/JavaScript with Tailwind or pure CSS.
- **Zero Network Latency:** All interactive widgets (Kanban card movements, calendar date selections, encryption toggles, simulated reply toasts, and pricing switches) manage state in-memory on the client.
- **Accessibility:** Full WCAG AA contrast, explicit visible focus indicators, and complete graceful degradation under `prefers-reduced-motion: reduce`.
