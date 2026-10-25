# Prompt: rebuild "VALENCE" (3D pastel Lead Generation & Capture showcase)

Paste everything below the line into your AI coding agent.

---

Build an isolated landing page in **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Three.js** at `/valence` for a fictional B2B Funnel Intelligence & Research Studio called **Valence**.

The page teaches and executes all three classic top- and mid-funnel lead generation & capture formats in one unified experience:
1. **Splash Page:** Intermediary gatekeeping & launch announcement threshold (regional/industry cohort selection + single `"Enter the 2026 Briefing"` button).
2. **Squeeze Page:** Minimalist single-field email capture (one bold headline, two sentences of copy, and a single pill email input field) trading an address for the *14-Page Executive Digest* and waitlist pass.
3. **Lead Capture (Lead Gen) Page:** Comprehensive B2B multi-field qualification suite (`Full Name`, `Work Email`, `Company`, `Company Size`, `Role`) paired with verified enterprise social proof, benefit bullets, and a live interactive preview of the gated asset (*68-Page Funnel Architecture Monograph & Custom Benchmark Audit*).

## Central Idea → Signature Mechanic

**Lead capture is a progressive trade of contact depth for asset depth, so the page centers on a smooth 3D pastel Capsule Dossier whose three nested rings physically unseal as you step from a 1-click Splash Gate, to a 1-field Squeeze page, to a multi-field B2B Lead Capture configurator.**

## Brand Rules

- **Palette (8 smooth pastel & ink colours only, enforced in `scripts/templates.config.ts`):**
  - Cloud Porcelain `#FBF9F5` (primary page canvas, light card interiors)
  - Plum Ink `#1E1B2E` (primary typography, deep contrast pill fills, borders)
  - Lavender Mist `#E8E0F8` (Stage 01 Splash Gate surface & outer 3D capsule ring)
  - Pistachio Mint `#D9F2E6` (Stage 02 Squeeze Page surface, verified badges & middle 3D ring)
  - Peach Sorbet `#FCE2D5` (Stage 03 Lead Capture Dossier surface & inner 3D chamber)
  - Periwinkle Iris `#5B46E8` (primary interactive pill CTA, focus rings, chart highlights & 3D core orb)
  - Muted Mauve `#645D7A` (secondary copy, metadata captions)
  - Coral Rose `#D9385A` (form validation error state only)
- **Typography (`next/font/google`, distinct CSS variables):**
  - Display: `Urbanist` (`600`, `700`, `800`, `--font-urbanist`)
  - Body: `Plus Jakarta Sans` (`400`, `500`, `600`, `700`, `--font-jakarta`)
  - Utility / Mono: `JetBrains Mono` (`400`, `500`, `--font-jetbrains`)
- **Geometry:** Smooth pastel aesthetic with `9999px` pill controls and `24px–36px` rounded squircle containers. Zero brutalist halftones, mixed-media collages, or sharp 0px utilitarian grids.

## Sections

1. **Floating Pill Header (`Header.tsx`):** Brand lockup, live 3-format pill switcher (`01 Splash Gate`, `02 Squeeze Page`, `03 Lead Capture`), live unlocked depth badge (`15% → 40% → 70% → 100%`), primary `"Unseal Dossier"` pill CTA, and mobile modal dialog menu.
2. **Stage 01 — The Splash Gate (`SplashGateSection.tsx`):** High-impact announcement hero & intermediary cohort selector (`North America · B2B SaaS`, `EMEA & UK · Consent-First`, `APAC · High-Velocity PLG`) with a single `"Enter the 2026 Briefing"` button beside the interactive 3D Pastel Capsule Monolith (`CapsuleCanvas.tsx`).
3. **The 3-Format Value-Exchange Matrix (`CaptureMatrixSection.tsx`):** Scroll- and click-linked comparison stage contrasting Splash, Squeeze, and Lead Capture pages across median CVR, field friction, structural anatomy, and use cases.
4. **Stage 02 — The Squeeze Fast-Lane (`SqueezeSection.tsx`):** Minimalist single-field email capture on a Pistachio Mint slab. Validating the single email input mints a deterministic `SQ-26-XXXX` pass code, unlocks Chapter 02 in the Gated Asset Preview, and carries the email forward into Stage 03.
5. **Live Gated Asset Preview (`AssetPreviewSection.tsx`):** Interactive 4-chapter reader for the *2026 Funnel Architecture Monograph*. Visitors filter live SVG benchmark charts by `Company Size` and `Role` and watch locked chapters unseal as gates are completed.
6. **Stage 03 — The B2B Lead-Capture Dossier (`LeadCaptureSection.tsx`):** Multi-field B2B qualification form (`Full Name`, `Work Email`, `Company`, `Company Size`, `Role`) paired with benefit bullets, count-up benchmark stats (`418` funnels, `3.4×` pipeline lift, `94%` routing signal), and verified peer social proof cards. Valid submission mints deterministic Dossier Key `VL-2026-XXXX` and unseals the 3D capsule to `100%`.
7. **Funnel Governance FAQ & Colophon (`FaqFooterSection.tsx`):** Benchmark marquee ticker, smooth `grid-template-rows` FAQ accordion, ambient motion pause/resume button, and Plum Ink colophon.

## Pure Logic, Motion & Verification

- **Pure logic (unit-tested first):** `motion/math.ts`, `content/funnelData.ts`, `capsule/logic.ts`, `capsule/store.ts`, and `forms/validation.ts`.
- **Motion identity:** Precise / clockwork softened with spring cushions (verbs: **snap** and **unseal**). Animate `transform`, `opacity`, and `clip-path` only. Under `prefers-reduced-motion: reduce`, skip mounting Three.js and Lenis, keep the interactive SVG capsule schematic visible, and reveal all content immediately. With JavaScript disabled, all `[data-reveal]` elements remain visible via `<noscript>`.
- **Verification:** Register `valence` across all six gallery registration points and run `npm run check`, `npm test`, `npx tsc --noEmit`, and `npx playwright test tests/e2e/valence.spec.ts`.
