# Prompt: rebuild "TALLY" (service-counter landing page for small Shopify businesses)

Paste everything below the line into your AI coding agent.

---

Build an isolated `/tally` landing page in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** for a fictional service-commerce app and storefront kit called **TALLY** (tagline *"Sell your hours like your goods."*). It turns standard Shopify product checkouts into booked appointments, repair intakes, partial deposits, and perforated bench-tracked claim tickets for small Shopify businesses (tailors, bicycle mechanics, ceramic studios, and watchmakers).

**The central idea: a service on Shopify isn't a box you ship—it's a two-part claim ticket that travels from the front counter to the workbench and back—so the page centers on a live perforated Service Ticket & Counter Ledger that stamps, advances through four bench stages as you scroll or configure a service, and tears along its perforation into a Merchant Bench Tag and a Customer Claim Stub.**

## Brand rules

- **Five colours only (pastel shop counter palette):**
  - Buttercream Paper `#FAF4E8` (page ground, ticket stock, light text on ink slabs)
  - Pistachio Mint `#C8E6D0` (pastel sage-mint: ready badges, live sync pills, mint counter slabs)
  - Apricot Blush `#F7C8B6` (pastel peach-coral: counter stamps, primary CTA buttons, deposit tags)
  - Periwinkle Lilac `#CFD6F6` (pastel lavender-blue: calendar slot slabs, workbench stage cards)
  - Plum Charcoal Ink `#231F2B` (deep muted ink: all primary text, 1px ledger rules, dark contrast slabs)

  Derive all tints and muted rules with `color-mix()` of these five hex values. Never introduce other hex colours. Keep text anchored in `#231F2B` on pastel surfaces (10:1–14.8:1 contrast) or `#FAF4E8` on `#231F2B` slabs.
- **Type (via `next/font/google` with distinct variable names):**
  - **Besley** (`--font-besley`, weights 500/600/700, roman and italic) for display headings and ticket titles. Italic carries conversational emphasis (*"like your goods."*).
  - **Public Sans** (`--font-public-sans`, weights 400/500/600) for body and UI controls.
  - **Overpass Mono** (`--font-overpass-mono`, weights 400/600) uppercase with `0.08em` tracking and `tabular-nums` for serials (`TLY-26-1050`), SKU codes, and deposit splits.
- **Geometry & Artwork:** 6–8px ticket rounding, 1.5–2px solid `#231F2B` borders, dashed perforation seams, and 100% original inline SVG illustrations (`brand/Illustrations.tsx` and `brand/Logo.tsx`)—no external stock photos required.

## Sections

1. **Counter Top Bar (`Header.tsx`):** Sticky bar with the perforated Tally ticket mark, 5-item desktop nav with a sliding pastel mint pill indicator, live queue badge (`04 ON BENCH`), accessible motion pause/resume toggle, *"Issue a Ticket"* CTA, and a native `<dialog>` mobile drawer with Escape close and focus restoration.
2. **The Shop Counter (`Hero.tsx`):** Split editorial hero with masked headline *"Sell your hours / like your goods."*, merchant archetype quick-switcher, magnetic primary CTA, and an interactive **Front Counter Mat** featuring a clickable SVG brass counter bell (`CounterBellSvg`) that rings and stamps a two-part hero claim stub, followed by a 4-column ink ledger strip.
3. **The Perforated Ticket Runway (`CounterStage.tsx` — Signature Mechanic):**
   - Pinned scroll-and-click stage tracking a service order across four stops: `01 Booked at Checkout`, `02 Checked In at Counter`, `03 On the Workbench`, `04 Ready for Pickup`.
   - Visitors switch between 4 small-shop archetypes (*Hem & Haw Atelier*, *Spoke & Pawl Cycleworks*, *Kiln & Glaze Studio*, *Movement & Crown*), select booking slots, toggle checkout deposit % (`25%`, `50%`, `100%`), toggle labor add-ons, and click **"Stamp & Tear Claim Stub"** to press the rotary counter stamp and detach the right-hand **Customer Claim Stub** along its perforation seam (`translate3d(14px, 8px, 0) rotate(3.2deg)`).
   - Clicking *"Use This Counter Setup →"* carries the selected archetype and deposit % into the onboarding form.
4. **Four Ways to Sell Time (`ServiceModes.tsx`):** 2×2 bento comparing *1-on-1 Fittings & Consultations*, *Drop-Off & Mail-In Repairs*, *Bespoke Product Add-Ons*, and *Small-Group Bench Classes*. Each card toggles live between **Online Cart Line** and **Shopify POS Bench** views.
5. **The Merchant Bench (`MerchantStories.tsx`):** Pauseable service-category ticker band, followed by three illustrated small-business dossiers with `CountUp` metrics and an inspectable **Receipt Stub `<dialog>` modal** (`#TLY-26-1050`, `#TLY-26-2150`, `#TLY-26-3325`).
6. **Rate & Deposit Recovery Ledger (`RevenueCalculator.tsx`):** Interactive range sliders (weekly bookings, average ticket value, checkout deposit %) that compute monthly recovered no-show revenue and highlight the recommended flat-rate plan (*Counter $19/mo*, *Workshop $49/mo*, *Guild $99/mo*).
7. **Counter Questions (`FaqSection.tsx`):** Sticky header + 5-question accordion animating height via `grid-template-rows: 0fr → 1fr`.
8. **Open Your Counter (`IntakeSection.tsx` & `CounterForm.tsx`):** Client-validated onboarding form (store name, email, archetype, plan, service workflow note). Invalid fields shake once and focus the first invalid control. Valid submission never sends a network request; it stamps and detaches a personalized **Merchant Trial Pass (`TLY-26-XXXX`)** with one-click clipboard copy.
9. **Footer (`Footer.tsx`):** Full-width original SVG neighborhood street scene (`FooterShopfrontScene`) with a gently swaying hanging shop sign, section links, and motion pause control.

## Pure logic & tests (TDD)

Write unit tests first for:
- `motion/math.ts` (`math.test.ts`): `clamp`, `lerp`, `progress`, `staggerDelay`, `magneticOffset`.
- `counter/ticket.ts` (`ticket.test.ts`): `runwayProgress`, `activeStopIndex`, `stopLocalProgress`, `isStubDetached`, `calculateTicketBreakdown`, `formatTicketSerial`, `calculateLedgerRecovery`.
- `forms/validate.ts` (`validate.test.ts`): `validateCounterForm`, `buildTrialPass`.
- `content/data.ts` (`data.test.ts`): structural integrity of archetypes, stops, modes, dossiers, plans, and FAQs.

## Motion & accessibility

- **Personality:** Precise / clockwork (expressive). **Verbs:** *stamp* and *detach*.
- **Tokens in `@theme static`:** `--ease-out`, `--ease-out-expo`, `--ease-in-out`, `--ease-spring`, durations `90 / 180 / 420 / 800 / 1200ms`, `--reveal-shift: 26px`, `--stagger: 70ms`.
- Animate `transform`, `opacity`, `clip-path`, and `grid-template-rows` only.
- Scope all hidden pre-reveal states under `html[data-tl-motion="live"]` inside `@media (prefers-reduced-motion: no-preference)` with a `<noscript>` override so reduced-motion and no-JS visitors see a complete, finished page.
- Zero horizontal overflow at `375px` and `390px`.
