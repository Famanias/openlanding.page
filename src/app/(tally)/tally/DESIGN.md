# TALLY — Sell your hours like your goods

A service-counter layer and storefront kit for small Shopify businesses that provide services (alterations, repairs, fittings, studio classes, and local drop-offs) alongside or instead of physical goods.

## Requirements

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` plus `@theme static`).
- `npm i lenis` (dynamically imported on fine-pointer desktop only). Zero external 3D or animation libraries required beyond CSS transitions/keyframes and pure rAF drivers.
- Folder isolation: imports only npm packages and files inside `src/app/(tally)/`. No `@/` aliases. `npm run check` guards both isolation and the 5-colour palette.
- 100% original inline SVG illustrations and interactive shop-counter UI; `Picture` and `assets.tsx` are included for optional replacement photography (`docs/image-prompts/tally.md`). The user explicitly waived brand-board approval and chose coded SVG illustrations.

## Concept

**A service on Shopify isn't a box you ship—it's a two-part claim ticket that travels from the front counter to the workbench and back—so the page centers on a live perforated Service Ticket & Counter Ledger that stamps, advances through four bench stages as you scroll or configure a service, and tears along its perforation into a Merchant Bench Tag and a Customer Claim Stub.**

Everything is written in the vocabulary of a physical service counter and merchant ledger:
- Categories are **Counter Archetypes** (*Denim & Garment Atelier*, *Bicycle Repair Bay*, *Ceramic Kiln & Classes*, *Watch & Instrument Bench*).
- Workflow steps are **Ticket Stops 01–04** (*01 Booked at Checkout → 02 Checked In at Counter → 03 On the Workbench → 04 Ready for Pickup*).
- Features are **Four Ways to Sell Time** (*Appointments & Fittings*, *Drop-Off & Mail-In Repairs*, *Bespoke Product Add-Ons*, *Group Bench Sessions*).
- Case studies are **Merchant Dossiers** with inspectable receipt stubs.
- Pricing & ROI is the **Rate & Deposit Ledger**.
- Onboarding is **Open Your Counter**, which stamps and detaches a personalized **Merchant Trial Pass (`TLY-26-XXXX`)**.

## Palette (5-colour pastel shop counter)

| Role | Name | Hex | Use |
|---|---|---|---|
| Paper | Buttercream Paper | `#FAF4E8` | primary page ground, ticket stock, receipt surfaces, light text on ink slabs |
| Mint | Pistachio Mint | `#C8E6D0` | pastel sage-mint: ready-for-pickup badges, live Shopify sync pills, Mint counter cards |
| Blush | Apricot Blush | `#F7C8B6` | warm pastel peach-coral: counter stamps, primary CTA buttons, deposit tags, warm highlights |
| Lilac | Periwinkle Lilac | `#CFD6F6` | soft pastel lavender-blue: calendar slot slabs, workbench stage cards, secondary tags |
| Ink | Plum Charcoal Ink | `#231F2B` | deep muted plum-slate ink: all primary typography, 1px ticket rules, perforation notches, dark contrast slabs |

All tints, muted text, and subtle surface rules are derived exclusively via `color-mix()` of these five hex values (for example `color-mix(in srgb, #231F2B 68%, #FAF4E8)` for muted copy, and `color-mix(in srgb, #231F2B 14%, #FAF4E8)` for ledger hairlines).
Contrast ratios:
- `#231F2B` on `#FAF4E8` (Buttercream): **14.8 : 1** (AAA)
- `#231F2B` on `#C8E6D0` (Pistachio Mint): **11.2 : 1** (AAA)
- `#231F2B` on `#F7C8B6` (Apricot Blush): **10.1 : 1** (AAA)
- `#231F2B` on `#CFD6F6` (Periwinkle Lilac): **10.6 : 1** (AAA)
- `#FAF4E8` on `#231F2B` (Plum Charcoal Slab): **14.8 : 1** (AAA)

## Type

Loaded via `next/font/google` in `src/app/(tally)/layout.tsx` with distinct CSS variable names:
- **Besley** (`--font-besley`, weights 500, 600, 700, normal and italic): a warm Clarendon-inspired serif rooted in shopkeepers' ledger headers and printed claim tickets. Italic is used for conversational emphasis (*"like your goods."*).
- **Public Sans** (`--font-public-sans`, weights 400, 500, 600): crisp, neutral, highly legible body and interface typography.
- **Overpass Mono** (`--font-overpass-mono`, weights 400, 600): tabular monospace for ticket serials (`TLY-0418`), deposit splits, bench durations, and SKU codes. Always uppercase with `0.08em` tracking on labels.

Fluid type scale (`clamp()`):
- Display `h1`: `clamp(2.6rem, 5.2vw, 4.9rem)`, line-height `1.04`, tracking `-0.025em`
- Section `h2`: `clamp(2rem, 3.8vw, 3.4rem)`, line-height `1.08`, tracking `-0.02em`
- Card `h3`: `clamp(1.25rem, 1.8vw, 1.65rem)`, line-height `1.2`
- Body copy: `clamp(1rem, 1.05vw, 1.125rem)`, line-height `1.6`
- Mono labels / serials: `0.75rem` (12px), uppercase, tracking `0.08em`, `font-variant-numeric: tabular-nums`

## Layout

- Container: `min(1260px, 100% - 2 * clamp(20px, 4.5vw, 64px))`.
- Geometry: **6–8px subtle ticket rounding** (`border-radius: 8px`) with crisp `1px solid` ledger rules and semicircular **perforation notches** along ticket seams.
- Section handoffs: Pastel paper stock alternates with tinted pastel ledger slabs and one deep `#231F2B` Plum Charcoal workbench stage, joined by stitched perforation dividers and scroll-linked scale/settle handoffs.
- Responsive breakpoints: `1080px` (hero and pinned ticket stage split), `900px` (desktop nav switches to modal drawer), `640px` (two-column grids stack), `375px`–`390px` (compact touch ticket stub layout with zero horizontal overflow).

## The Mechanic: Perforated Service Ticket & Counter Ledger (`counter/`)

Pure, unit-tested logic lives in `counter/ticket.ts` (`counter/ticket.test.ts`), paired with the interactive and scroll-scrubbed stage in `counter/CounterStage.tsx`:

```
runwayProgress(scrollY, top, height, vh) = clamp((scrollY - top) / max(height - vh, 1), 0, 1)
activeStopIndex(progress, stopCount = 4) = clamp(floor(progress * stopCount), 0, stopCount - 1)
stopLocalProgress(progress, index, stopCount = 4) = clamp((progress - index / stopCount) * stopCount, 0, 1)
isStubDetached(progress, manualDetached) = manualDetached || progress >= 0.78
calculateTicketBreakdown(basePrice, depositPct, addOnTotal) -> { total, depositDueNow, balanceAtPickup, noShowProtection }
formatTicketSerial(archetypeCode, slotIndex, depositPct) -> "TLY-26-XXXX"
```

- **Four Merchant Archetypes** (`tailor`, `cycle`, `kiln`, `watch`), each with its own services, add-on options, turnaround time, and Shopify POS / Online Store checkout line items.
- **Four Ticket Stops (01–04):**
  - `01` **Booked at Checkout**: Customer picks a time slot or mail-in kit and pays the deposit in Shopify Checkout.
  - `02` **Checked In at Counter**: Item or guest arrives; barcode stub scans into Shopify POS and prints the bench tag.
  - `03` **On the Workbench**: Technician logs notes, parts, or fitting measurements; status link updates live.
  - `04` **Ready for Pickup**: SMS/email fires; remaining balance settles in one tap; the **Customer Claim Stub detaches**.
- **Dual control (Scroll + Interactive):** On desktop with motion enabled, scrolling through `#ledger` advances the 4 stops and detaches the stub at `progress >= 0.78`. At any time, visitors can also click any archetype tab, stop pill (`01`–`04`), deposit percentage (`25%`, `50%`, `100%`), or the **"Stamp & Tear Claim Stub"** button to inspect or toggle the perforation tear directly. Choosing *"Carry This Ticket to My Counter →"* pre-populates the onboarding form below.

## Motion

- **Personality:** Precise / clockwork (expressive intensity, warm shop-counter feel).
- **Primary Verbs:** **Stamp** (crisp mechanical arrival with a restrained spring settle) and **Detach** (clean separation along a perforated seam with a 3.5° tilt and lateral slide).
- **One Signature Moment:** When the ticket reaches Stop 04 (via scroll scrub or clicking *"Stamp & Tear Claim Stub"*), the circular **"READY · PAID IN FULL / DEPOSIT LOCKED"** counter stamp presses onto the ticket with `--ease-spring` while the right-hand **Customer Claim Stub** physically separates along its SVG perforation teeth (`translate3d(18px, 6px, 0) rotate(3.5deg)`), revealing the live pickup code and Shopify POS balance.

### Motion Tokens (`@theme static` in `tally.css`)

| Token | Value | Purpose |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Default entrances, card lifts, hover releases |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero mask rises, drawer transitions, large reveals |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Clip-path wipes, perforation tear, tab handoffs |
| `--ease-spring` | `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)` | Counter stamp press, button release, stub detach |
| `--dur-instant` | `90ms` | Button active press (`scale(0.97)`) |
| `--dur-fast` | `180ms` | Focus rings, colour shifts, pill hover |
| `--dur-base` | `420ms` | Card lift, tab slides, stamp press, accordion |
| `--dur-slow` | `800ms` | Scroll reveals, SVG rule draws, clip-path wipes |
| `--dur-hero` | `1200ms` | Hero load choreography |
| `--reveal-shift` | `26px` | Vertical distance for rise/cascade reveals |
| `--stagger` | `70ms` | Per-child stagger multiplier |

### Vocabulary of Reveals (6 distinct types)

1. `mask`: Headline lines rise through `overflow: clip` containers (`translateY(68%) → 0`).
2. `rise`: Body copy and captions rise `26px` with opacity.
3. `cascade`: Cards and merchant dossiers rise `28px` + `scale(0.96) → 1` with `--i` stagger.
4. `wipe`: Illustrated panels and receipt previews reveal via child `clip-path: inset(0 0 100% 0) → inset(0)` with inner `scale(1.08) → 1`.
5. `draw`: Ledger rules and perforation dividers scale from `scaleX(0) → 1` (`transform-origin: left`).
6. `stamp`: Badges and counter seals settle from `scale(1.35) rotate(-10deg) → scale(1) rotate(-3deg)` on `--ease-spring`.

### Completed Motion Map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| **Header (`Header.tsx`)** | Drops in at 120ms (`translateY(-14px)` → `0`), nav links staggered 50ms | Compresses padding after 72px scroll; top progress hairline scales `0 → 1` via `--tl-scroll` | Sliding pastel pill indicator tracks hovered/focused nav link; CTA fills from bottom | Press scales CTA to `0.97`; mobile menu toggle morphs to `×` and opens clip-path drawer | Tucks slightly on deep scroll, restores immediately on scroll-up |
| **Hero (`Hero.tsx`)** | Timed CSS load sequence: counter mat settles (0ms), header (120ms), masked `h1` lines (200ms / 310ms), subcopy & CTAs (480ms), interactive Hero Ticket (620ms) | Subtle counter-mat parallax (`translate3d` ≤ 18px); ambient brass bell & live queue ticker (pauses offscreen) | Primary CTA is magnetic (≤ 10px on fine pointers) with sliding arrow; ticket stub lifts on hover | Clicking *"Ring Counter Bell & Stamp"* rings the SVG bell wave, stamps the hero stub, and toggles stub preview | Scales to `0.985` as the perforated divider hands off to the Ticket Runway |
| **Ticket Runway (`CounterStage.tsx`)** | Section eyebrow slides in + rule draws (`draw`); heading `mask` rises; ticket board settles | Pinned 320vh desktop stage scrubs `--tl-runway` (`0 → 1`), advancing stops `01–04`, filling the progress track, and detaching the right stub at `p >= 0.78` | Archetype tabs and stop pills lift 2px with pastel highlight; stub seam glows | Switching archetype, deposit %, or clicking *"Stamp & Tear Claim Stub"* springs the stamp and detaches/re-attaches the stub | Hands off selected archetype & deposit % into the onboarding form when clicked |
| **Four Ways to Sell Time (`ServiceModes.tsx`)** | Eyebrow rule `draw`, `h2` `mask`, 4 bento cards `cascade` staggered 70ms | Perforation seam rule draws across top of slab | Cards tilt/lift `-6px`, inner SVG Shopify cart illustration scales `1.04`, sibling cards dim to `0.72` | Clicking a mode's *"Inspect Cart Line"* toggle flips between Storefront View and POS Bench View | Bottom ledger rule draws into Merchant Stories |
| **Merchant Bench (`MerchantStories.tsx`)** | Eyebrow `draw`, `h2` `mask`, 3 illustrated dossier cards `cascade`, SVG shop scenes `wipe`, metrics `CountUp` | Slow horizontal ticker of Shopify service tags (pauses on hover/focus and offscreen) | Dossier card lifts `-6px` with shadow opacity fade; receipt stub slides out `6px` | Clicking *"Inspect Receipt Stub"* opens a native accessible modal dialog (`<dialog>`) with full line-item breakdown | Closes dialog on `Escape` or backdrop click, restoring focus to trigger |
| **Rate & Deposit Calculator (`RevenueLedger.tsx`)** | Eyebrow `draw`, `h2` `mask`, calculator ledger and 3 plan cards `cascade` | — | Range sliders highlight thumb ring on hover/focus; plan cards lift `-6px` | Dragging or arrow-keying sliders updates recovered revenue, deposit float, and recommended plan tier in real time; clicking a plan pre-selects it in `#open-counter` | Transitions via scalloped paper edge into FAQ |
| **Counter Questions (`FaqSection.tsx`)** | Sticky heading `mask` + `rise`; 5 question rows `cascade` | Heading stays sticky beside the question list on desktop | Question row tints with `#C8E6D0` (Mint) and rotates `+` badge `45°` on hover/focus | Clicking toggles `aria-expanded` and animates answer height via `grid-template-rows: 0fr → 1fr` | Only one or multiple rows open smoothly with interruptible CSS transition |
| **Open Your Counter (`IntakeSection.tsx`)** | Eyebrow `draw`, `h2` `mask`, two-part form card settles | — | Floating/highlighted labels and `#231F2B` focus ring offset; submit button fill wipe | Invalid fields shake (`±6px`, 260ms) with `aria-invalid` error message sliding in; valid submit shows loading spinner then dissolves into a stamped, detached **Merchant Trial Pass (`TLY-26-XXXX`)** | Allows copying the trial configuration or resetting to issue another pass |
| **Footer (`Footer.tsx`)** | Illustrated pastel shopfront scene reveals via `wipe`; giant wordmark rises | Ambient hanging shop sign sways gently (paused offscreen & under reduced motion) | Footer links draw underline left-to-right; *"Pause ambient motion"* button toggles `data-paused` | Pressing *"Back to Counter ↑"* smoothly scrolls to top | — |

## Signature Details

1. **Scalloped Perforation Seams**: Real SVG/CSS semicircular teeth separating every two-part ticket into a **Merchant Bench Tag** and a **Customer Claim Stub**.
2. **Circular Counter Stamp**: An SVG rotary date-and-status stamp (`PAID · DEPOSIT LOCKED · TALLY POS`) that presses down with a spring bounce on Stop 04 and on form submission.
3. **Tabular Receipt Typography**: Dotted leader lines (`······`), monospace SKU codes (`SRV-HEM-01`), deposit/balance splits, and live serial numbers (`TLY-26-XXXX`).
4. **Counter Bell & Ambient Pause Control**: A clickable SVG brass counter bell in the hero and a global accessible motion pause/resume button in the header and footer.

## Do / Don't

- **Do** use only the 5 registered hex colours (`#FAF4E8`, `#C8E6D0`, `#F7C8B6`, `#CFD6F6`, `#231F2B`) and `color-mix()` derivatives.
- **Do** keep every text pairing anchored in `#231F2B` on pastel surfaces (or `#FAF4E8` on `#231F2B` slabs) so contrast stays > 10:1.
- **Do** keep `page.tsx` and section wrappers as Server Components, pushing `"use client"` to interactive leaves.
- **Don't** animate `width`, `height`, `top`, `left`, or `box-shadow`. Animate only `transform`, `opacity`, `clip-path`, and `grid-template-rows`.
- **Don't** hide content outside `html[data-tl-motion="live"]` inside `@media (prefers-reduced-motion: no-preference)`.
- **Don't** send any network request on form submit.

## Files

```
src/app/(tally)/
  layout.tsx                        Besley, Public Sans, Overpass Mono fonts; metadata; MOTION_SCRIPT; noscript override
  tally/
    page.tsx                        Server component composing all sections
    tally.css                       @import "tailwindcss"; @theme static tokens; scoped .tl-* styles & motion rules
    DESIGN.md  PROMPT.md
    icon.svg                        Perforated pastel ticket favicon in palette colours
    opengraph-image.tsx             1200×630 next/og share card in the 5-colour palette
    assets.tsx                      Responsive Picture + labelled pastel ticket placeholder
    assets.generated.ts             Image manifest
    brand/
      Logo.tsx                      Lockup, mark, circular counter stamp, and shop icons
      Illustrations.tsx             Original coded SVG illustrations (hero counter, 4 archetypes, 3 merchant shops, footer street)
    content/
      data.ts                       Typed archetypes, 4 stops, service modes, merchant dossiers, plans, FAQs
      data.test.ts                  Content integrity unit tests
    counter/
      ticket.ts                     Pure ticket maths, runway progress, deposit calculator, serial generator
      ticket.test.ts                Unit tests for ticket & calculator logic
      CounterStage.tsx              Interactive & scroll-scrubbed Perforated Service Ticket mechanic
      RevenueCalculator.tsx         Interactive rate & deposit recovery calculator + plan selector
    forms/
      validate.ts                   Pure client-side form validation & trial pass generator
      validate.test.ts              Unit tests for validation & trial pass generation
      CounterForm.tsx               Interactive onboarding form with stamped Trial Pass payoff
    motion/
      math.ts                       clamp, lerp, progress, staggerDelay, magneticOffset pure functions
      math.test.ts                  Unit tests for motion maths
      mode.ts                       Inline before-paint motion mode script & helpers
      Reveal.tsx                    Shared IntersectionObserver reveal wrapper + CountUp
      SmoothScroll.tsx              Lenis smooth scroll + header scroll state + ambient pause controller
    sections/
      Header.tsx                    Sticky counter bar, sliding nav indicator, mobile modal menu, motion toggle
      Hero.tsx                      Split hero with interactive counter bell & two-part ticket preview
      ServiceModes.tsx              Four Ways to Sell Time bento with Storefront / POS toggle
      MerchantStories.tsx           Three merchant dossiers with CountUp stats & native receipt modal
      FaqSection.tsx                Sticky header + 5-item grid-template-rows accordion
      IntakeSection.tsx             Open Your Counter section wrapping CounterForm
      Footer.tsx                    Illustrated pastel shopfront footer + links + motion toggle
```

## Imagery

All visuals are delivered as rich, original inline SVG illustrations in `brand/Illustrations.tsx` using the 5-colour pastel palette (`#FAF4E8`, `#C8E6D0`, `#F7C8B6`, `#CFD6F6`, `#231F2B`). `assets.tsx` and `docs/image-prompts/tally.md` are also provided so optional replacement photography can be dropped into `assets/incoming/tally/` and processed with `npm run images -- tally`.
