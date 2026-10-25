# VALENCE design

## Requirements

- A B2B Lead Generation & Capture landing page template that teaches and executes all three classic top- and mid-funnel capture formats in one unified experience:
  1. **Splash Page:** Intermediary gatekeeping & launch announcement stage (cohort/region edition selection + single `"Enter the 2026 Briefing"` button).
  2. **Squeeze Page:** Minimalist single-field email capture (bold headline, two sentences of copy, and one pill input field) trading an address for the *14-Page Executive Digest* and waitlist spot.
  3. **Lead Capture (Lead Gen) Page:** Comprehensive B2B multi-field qualification suite (`Full Name`, `Work Email`, `Company Size`, `Role`) paired with verified enterprise social proof, benefit bullets, and a live interactive preview of the gated asset (*68-Page Funnel Architecture Monograph & Custom Benchmark Audit*).
- **Smooth pastel aesthetic** with heavily curved pill-shaped controls (`9999px`) and `24px–32px` squircle containers. Zero brutalist halftones, mixed-media clutter, or sharp utilitarian grids.
- **3D-focused signature mechanic:** Procedural Three.js (WebGPU with WebGL fallback) matte-ceramic pastel **Capsule Dossier** whose three nested rings physically unseal as the visitor steps through `01 Splash → 02 Squeeze → 03 Lead Capture`.
- Client-side validation only; forms never send network requests.
- Accessible (`lang="en"`, one `h1`, semantic landmarks, visible focus rings, AA contrast, keyboard navigation, reduced-motion and no-JS completeness).

## Concept

**Lead capture is a progressive trade of contact depth for asset depth, so the page centers on a smooth 3D pastel Capsule Dossier whose three nested rings physically unseal as you step from a 1-click Splash Gate, to a 1-field Squeeze page, to a multi-field B2B Lead Capture configurator.**

## Palette

Eight colours only, registered in `scripts/templates.config.ts`. All tints and translucent surfaces are composed with `color-mix()`.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-paper` | `#FBF9F5` | Cloud Porcelain — primary page canvas, card interiors, text on dark/iris pills |
| `--color-ink` | `#1E1B2E` | Plum Ink — primary typography, dark contrast pill containers, structural rules |
| `--color-lavender` | `#E8E0F8` | Lavender Mist — Tier 01 Splash Gate surface & outer 3D capsule ring |
| `--color-mint` | `#D9F2E6` | Pistachio Mint — Tier 02 Squeeze surface, verified badges & middle 3D ring |
| `--color-peach` | `#FCE2D5` | Peach Sorbet — Tier 03 Lead-Capture Dossier surface & inner 3D core |
| `--color-accent` | `#5B46E8` | Periwinkle Iris — interactive pill CTAs, active indicators, focus rings, chart strokes |
| `--color-mauve` | `#645D7A` | Muted Mauve — secondary copy, captions, metadata labels |
| `--color-rose` | `#D9385A` | Coral Rose — validation error state only |

## Type

Loaded via `next/font/google` in `src/app/(valence)/layout.tsx` with distinct CSS variable names:

- **Display (`--font-urbanist`):** **Urbanist** (`600`, `700`, `800`), tracking `-0.03em`, line-height `0.98–1.06`. Smooth geometric curves that mirror the pill controls and 3D capsule rings.
- **Body (`--font-jakarta`):** **Plus Jakarta Sans** (`400`, `500`, `600`, `700`), `16px–20px` / `1.55`. High-legibility sans for conversion copy, form labels, and report excerpts.
- **Mono / Utility (`--font-jetbrains`):** **JetBrains Mono** (`400`, `500`), `11px–13px` uppercase with `0.08em` tracking and `tabular-nums` for conversion rates, field counts, and dossier keys (`VL-2026-XXXX`).

## Layout

- Container: `min(1280px, 100% - 2 * clamp(20px, 4.5vw, 64px))`, 12-column CSS grid with `24px` gaps.
- Corner geometry: `9999px` pill buttons, inputs, chips, and navigation bars; `24px–32px` rounded squircle cards and section slabs.
- Section sequence:
  1. **Floating Pill Header (`Header.tsx`):** Brand lockup, live 3-tier capture pill switcher (`01 Splash`, `02 Squeeze`, `03 Lead Gen`), live unlocked depth badge (`0% → 35% → 100%`), and primary `"Unseal Dossier"` pill CTA.
  2. **Stage 01 — The Splash Gate (`SplashGateSection.tsx`):** Hero & intermediary gatekeeping stage on a Lavender Mist & Porcelain field. Includes regional/industry cohort selector (`North America · Enterprise SaaS`, `EMEA · Privacy-First B2B`, `APAC · High-Velocity PLG`), single `"Enter the 2026 Briefing →"` action button, and the interactive 3D Pastel Capsule Monolith (`CapsuleCanvas.tsx`).
  3. **The 3-Format Value-Exchange Architecture (`CaptureMatrixSection.tsx`):** Pinned/interactive comparison stage contrasting the three funnel capture archetypes (**Splash Page**, **Squeeze Page**, **Lead Capture Page**). Selecting or scrolling across tiers updates the 3D capsule unsealing state, conversion rate benchmarks, field friction index, and recommended funnel placement.
  4. **Stage 02 — The Squeeze Fast-Lane (`SqueezeSection.tsx`):** Minimalist capture showcase on a Pistachio Mint & Porcelain slab: bold headline, two sentences of copy, and a single pill email input (`Work email → Send Executive Synthesis`) with instant waitlist/digest unlock and deterministic pass code.
  5. **Gated Asset Preview (`AssetPreviewSection.tsx`):** Interactive reader for the gated *2026 Funnel Architecture Monograph & Benchmark Audit*. Visitors switch chapters and filter live SVG benchmark charts by `Company Size` and `Role`, seeing how multi-field context tailors the asset.
  6. **Stage 03 — The Full B2B Lead-Capture Dossier (`LeadCaptureSection.tsx`):** Comprehensive multi-field conversion suite (`Full Name`, `Work Email`, `Company Size`, `Role`, plus optional `Primary Funnel Goal`) paired with verified B2B social proof, benefit bullets, and a choreographed **Dossier Access Key (`VL-2026-XXXX`)** minting state.
  7. **Funnel Governance FAQ & Colophon (`FaqFooterSection.tsx`):** Smooth pill-row accordion (`grid-template-rows: 0fr → 1fr`) and pastel colophon with an ambient motion pause/resume toggle.

## Mechanic: The 3-Tier Capsule Dossier (`capsule/`)

Pure logic in `capsule/logic.ts` (tested in `capsule/logic.test.ts`) and shared external state in `capsule/store.ts` (tested in `capsule/store.test.ts`):

- **Three Capture Tiers:**
  - `splash` (Tier 01 — 0 fields, gatekeeper threshold, outer Lavender ring active, `35%` unsealed once entered)
  - `squeeze` (Tier 02 — 1 email field, minimalist digest capture, middle Pistachio ring unsealed, `65%` unsealed once captured)
  - `lead-gen` (Tier 03 — 4 B2B fields, tailored monograph & custom audit, inner Peach Sorbet & Periwinkle Iris core unsealed, `100%` unsealed once completed)
- **Pure functions:**
  - `stageProgressFromScroll(scrollY, top, height, vh)` clamps scroll progress `0..1` across the pinned comparison runway.
  - `tierFromProgress(p)` maps `0..0.33 → "splash"`, `0.33..0.67 → "squeeze"`, `0.67..1 → "lead-gen"`.
  - `computeCapsuleTransforms(tier, unlockedTiers, scrollProgress)` returns deterministic ring offsets (`outerLift`, `middleLift`, `coreScale`, `ringRotation`, `unsealFraction`) used by both the Three.js 3D scene and the SVG/reduced-motion fallback.
  - `computeTailoredBenchmark(companySize, role)` returns deterministic conversion metrics (Splash pass-through %, Squeeze CVR %, Lead-Gen MQL %, and pipeline lift multiplier) for the live Gated Asset Preview.
- **3D Scene (`capsule/CapsuleCanvas.tsx`):**
  - Uses `three` (`WebGLRenderer` with WebGPU-style physical matte-ceramic materials: `MeshPhysicalMaterial` with `roughness: 0.32`, `clearcoat: 0.4`, pastel colors `#E8E0F8`, `#D9F2E6`, `#FCE2D5`, and `#5B46E8` core).
  - Supports pointer drag-to-orbit with velocity damping, pauses when off-screen via `IntersectionObserver`, and never mounts under `prefers-reduced-motion: reduce` (rendering an interactive high-precision SVG pastel capsule diagram instead).

## Motion

- **Personality:** Precise / clockwork softened with plush spring cushions.
- **Primary Verbs:** **Snap** and **Unseal**.
- **Signature Moment:** Passing any capture gate (clicking *Enter* on the Splash Gate, submitting the 1-field *Squeeze* pill, or completing the 4-field *Lead-Capture Dossier*) drives the 3D pastel ceramic rings to rotate and glide apart along their vertical axis while the Gated Report Preview unblurs and mints deterministic Dossier Key `VL-2026-XXXX`.
- **Tokens (in `valence.css` `@theme`):**
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)`
  - `--dur-instant: 90ms`
  - `--dur-fast: 180ms`
  - `--dur-base: 420ms`
  - `--dur-slow: 800ms`
  - `--dur-hero: 1200ms`
  - `--reveal-shift: 28px`
  - `--stagger: 70ms`

### Motion Map

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
| --- | --- | --- | --- | --- | --- |
| Floating Pill Header | Drops in at `150ms` via CSS keyframe, tier pills stagger `50ms` | Compresses padding after `80px` scroll; top hairline progress bar scales `0→1` | Active tier pill indicator slides with `--ease-spring`; focus ring in `#5B46E8` | Tier pills scale to `0.97` and switch active capture mode | Stays pinned above pastel section handoffs |
| Stage 01: Splash Gate & Hero | Keyframe load sequence: background settles (`0ms`), masked 2-line `h1` rises (`250ms`), cohort pills & CTA rise (`550ms`) | Gentle depth drift on background pastel aura (`--vl-scroll`) | Cohort pills lift `-3px`; primary CTA has magnetic pull (`≤10px`) + fill wipe | Clicking `"Enter the 2026 Briefing"` unlatches Tier 01 ring (`35%` depth) and scrolls/announces unlock | Lavender Mist slab hands off via rounded overlap to Porcelain matrix |
| 3D Pastel Capsule Monolith | Scales from `0.94 → 1` with soft rim-light settle at `450ms` | Ring separation & axial rotation scrub with `--vl-stage-p` | Pointer drag orbits capsule with inertia; hover highlights active ring | Unseals outer, middle, or core ring as Splash, Squeeze, or Lead-Gen gates complete | Pauses rAF loop when scrolled off-screen |
| 3-Format Value-Exchange Matrix | Staggered card cascade (`translateY(28px) scale(0.96)`) | Pinned stage updates active archetype & telemetry bars on scroll | Format cards tilt (`≤4°`), track pointer spotlight (`--mx`/`--my`), dim siblings | Clicking any archetype tab snaps 3D capsule & telemetry readout to that format | Scales to `0.98` as Pistachio Mint Squeeze slab laps over |
| Stage 02: Squeeze Fast-Lane | Clip-path wipe on Mint container + masked headline rise + drawn rule | Unlock badge pulses gently when in view | Pill email input expands focus halo; submit pill wipes `#1E1B2E` fill | Invalid email shakes `±6px`; valid submit morphs to loading dots then unseals Executive Digest card | Mint slab hands off to Porcelain Gated Asset Preview |
| Gated Asset Preview Reader | Chapter cards stagger in; SVG benchmark bars draw via `scaleX`/`stroke-dashoffset` | Progress indicator tracks reading depth | Company Size & Role filter pills slide active capsule highlight | Selecting cohort or unlocking Squeeze/Lead-Gen unblurs locked pages & updates SVG numbers | Hands off to Peach Sorbet Lead-Capture Dossier |
| Stage 03: B2B Lead-Capture Dossier | 2-column settle reveal (`translateY(28px)`) + count-up social proof stats | Sticky preview summary follows form progress | Floating field labels rise; benefit cards lift `-5px` with spotlight | Field validation shakes on error; valid submit mints `VL-2026-XXXX` Dossier Key & unseals 3D core (`100%`) | Replaces form with stamped Pastel Dossier Pass |
| FAQ Accordion & Colophon | Staggered row rise + drawn divider rules | Marquee ticker of benchmark insights drifts horizontally | FAQ trigger pill shifts arrow `+4px`; marquee pauses on hover/focus | Accordion animates `grid-template-rows: 0fr → 1fr`; pause button toggles ambient motion | Closes cleanly on Plum Ink & Porcelain colophon |

## Signature Details

1. **The 3-Ring Pastel 3D Capsule Dossier:** Real-time matte-ceramic Lavender, Pistachio, and Peach Sorbet rings that physically unseal as you progress from Splash → Squeeze → Lead Capture.
2. **Live Value-Exchange Ratio Telemetry:** Every capture format displays its empirical B2B benchmark metrics (Fields Required, Median CVR, Intent Qualification Score, and Asset Payoff).
3. **Interactive Gated Report Unblur:** Visitors can filter the whitepaper's benchmark charts by *Company Size* and *Role* before submitting, and watch locked sections unseal immediately upon completing the Squeeze or Lead-Gen gate.
4. **Deterministic Dossier Key (`VL-2026-XXXX`):** Derived from a pure hash of the visitor's submitted fields so repeat submissions produce the same verifiable access code.

## Do / Don't

- **Do:** Keep surfaces smooth, luminous, and pastel (`#FBF9F5`, `#E8E0F8`, `#D9F2E6`, `#FCE2D5`) with crisp `#1E1B2E` Plum Ink typography and `#5B46E8` Periwinkle Iris actions. Use `9999px` pills for controls and `24px–32px` radii for containers.
- **Don't:** Use brutalist 0px grids, halftone patterns, mixed-media collages, dark utilitarian terminal themes, unvalidated forms, or network requests.

## Files

- `src/app/(valence)/layout.tsx` — Root layout with `Urbanist`, `Plus_Jakarta_Sans`, and `JetBrains_Mono`, metadata, and `<noscript>` reveal fallback.
- `src/app/(valence)/valence/page.tsx` — Server component composing all sections.
- `src/app/(valence)/valence/valence.css` — `@import "tailwindcss"`, `@theme` tokens, pill/squircle rules, keyframe load choreography, reveal states, and reduced-motion overrides.
- `src/app/(valence)/valence/brand/Logo.tsx`, `icon.svg`, `opengraph-image.tsx` — Brand mark, lockup, favicon, and 1200×630 OG card.
- `src/app/(valence)/valence/assets.tsx`, `assets.generated.ts` — Responsive `Picture` component with labelled pastel SVG concept placeholders.
- `src/app/(valence)/valence/motion/` — `math.ts` (`math.test.ts`), `mode.ts`, `useReducedMotion.ts`, `useInView.ts`, `Reveal.tsx`, `Magnetic.tsx`, `TiltCard.tsx`, `CountUp.tsx`, `Marquee.tsx`, `SmoothScroll.tsx`, `ScrollVars.tsx`.
- `src/app/(valence)/valence/capsule/` — `logic.ts` (`logic.test.ts`), `store.ts` (`store.test.ts`), `CapsuleCanvas.tsx`, `CapsuleStage.tsx`.
- `src/app/(valence)/valence/content/funnelData.ts` (`funnelData.test.ts`) — Typed data for the 3 capture formats, cohort benchmarks, report chapters, social proof, and FAQs.
- `src/app/(valence)/valence/forms/` — `validation.ts` (`validation.test.ts`), `SqueezeForm.tsx`, `LeadCaptureForm.tsx`.
- `src/app/(valence)/valence/sections/` — `Header.tsx`, `SplashGateSection.tsx`, `CaptureMatrixSection.tsx`, `SqueezeSection.tsx`, `AssetPreviewSection.tsx`, `LeadCaptureSection.tsx`, `FaqFooterSection.tsx`.

## Imagery

The template uses procedural 3D WebGL/WebGPU geometry, custom inline SVG diagrams, and CSS pastel surfaces so it is 100% self-contained without external photos. Optional art-direction prompts for high-resolution pastel 3D still renders are documented in `docs/image-prompts/valence.md`.
