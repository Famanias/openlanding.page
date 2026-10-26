# Prompt: rebuild LUCENTRA

Build an isolated Next.js 16 App Router + React 19 + TypeScript + Tailwind v4 landing page at `/lucentra` for LUCENTRA, a fictional real-time material calibration studio for product designers and frontend teams.

The central idea is: light is a material's proof, so the page is a calibration bench that moves one prism specimen through clear, tuned, spectral and ready states. Start from a quiet light-mode architectural field with a cut-glass SVG specimen, then tell the story through a tagline reveal, four optical principles, the pinned bench, presets, a three-step workflow, a local brief form, five field notes and a precise footer.

Use only graphite `#10141C`, paper `#F5F7FB`, cobalt `#2E63FF`, and spectral tint `#C5D4FF`; derive tints with `color-mix()`. Load Sora for display, Plus Jakarta Sans for body and Space Mono for utility through `next/font/google`. The motion identity is technical/cinematic with the verbs scan and focus-pull. Use mask/rise reveals, a hairline progress rail, a single rAF bench progress writer, button fill wipes, card lifts and a spectral recomposition signature moment. Reduced motion, touch and no-JS must keep every value and section readable.

The pure interfaces are `bench/state.ts` (`clamp01`, `sampleAt`, `benchSnapshot`, `benchReducer`) and `forms/validate.ts` (`validateBrief`). Keep the form local: validation, loading and a success stamp replace the form without a network request. Add the route's `DESIGN.md`, `docs/image-prompts/lucentra.md`, icon, OG image, gallery registration, unit tests and `tests/e2e/lucentra.spec.ts`. Do not deploy or commit.
