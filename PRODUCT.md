# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Primary: Developers, designers, and AI coding agents (Claude Code, Antigravity, Cursor, Codex) seeking production-ready, highly tailored landing page templates and rebuild prompts.
- Surface audience (Understudy): Early-career job seekers preparing for first roles in tech, looking for simulated on-the-job rehearsal, manager feedback, and portfolio reels.

## Product Purpose
OpenLandingPage is an open-source gallery of landing page templates engineered with strict route isolation and copyable prompts.
Current active focus: Visual design revisions on the **Understudy** template (`/understudy`), a rehearsal studio for first jobs that guides visitors through an interactive theatrical proscenium stage.

## Positioning
Landing pages your agent can build. Complete, zero-dependency isolation between template routes with end-to-end motion systems.
For Understudy: Simulated work experience structured as theatrical rehearsal (parts, cast, director, call sheet, reel, callbacks) rather than conventional coursework.

## Operating Context
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 on Bun.
For Understudy: Single-page theatrical journey featuring a 340svh sticky proscenium zoom, drifting 3D parts carousel, scene-by-scene rehearsal walkthrough, casting stage callback odometer, glass dock navigation, audition modal, and interactive Ask FAQ sheet.

## Capabilities and Constraints
- Scope: Visual design revisions exclusively on the Understudy template (`src/app/(understudy)`).
- Route isolation: Keep existing gallery templates untouched; zero cross-template imports or shared runtime state.
- Pure client-side interactions: Forms (audition/call sheet and Ask sheet) validate and transition entirely in-memory with zero network requests.
- Motion performance: Animations restricted to `transform`, `scale`, `opacity`, `clip-path`, and SVG stroke offsets; 60fps target with CLS 0.
- Workflow default: Comp-first workflow (`buildPath: comp`).

## Brand Commitments
- Name: Understudy ("The rehearsal studio for first jobs" / "Your first job, rehearsed.")
- Palette: house (`#F4F4F1`), white (`#FFFFFF`), ink (`#0D0D10`), night (`#1A1A1F`), graphite (`#66666E`), cue (`#5B3CF0`), cue light (`#AE9CFF`), tape (`#FFC547`).
- Typography: Google Sans Flex (with ROND 70 variation), Google Sans Code, Literata italic.
- Voice & Metaphor: Theatre vocabulary used systematically (parts, cast, director, notes, reel, callbacks, opening night, call time, call sheet).

## Evidence on Hand
- Complete existing implementation and tests in `src/app/(understudy)/understudy/`.
- Authored design specifications and prompt in `src/app/(understudy)/understudy/PROMPT.md` and `DESIGN.md`.
- No external client claims or testimonials fabricated; simulated companies are distinct invented brands.

## Product Principles
- Absolute Isolation: Every template remains completely standalone, copyable, and independently runnable.
- Spatial Theatrical Choreography: Physical metaphors (pushing through the proscenium arch, spotlighting, scene reveals) drive the interaction model.
- Craft & Rigor: Precise physics, deterministic stage math, and strict fallback support.

## Accessibility & Inclusion
- Robust fallback for `prefers-reduced-motion: reduce` and JavaScript-disabled environments.
- WCAG AA contrast compliance, visible focus rings, modal focus trapping (Esc to dismiss), and semantic ARIA attributes for interactive readouts.
