---
name: create-landing-template
description: Use when adding a new landing-page template to this openlandingpage repo (a new brand, business or theme for the gallery), or when asked to design, invent or generate a new template, landing page or brand for the gallery.
---

# Create a landing template

## Overview

Every template here is a complete fictional brand with **one central idea that drives the whole page**. A metaphor from the brand's world becomes the page's signature interaction: a climb becomes an altitude meter, clockwork becomes a slide deck, a dish becomes something you turn in 3D. Quality comes from that idea, a complete brand system, and the repo's guardrails. **The bar is in `quality-bar.md`. Read it before Phase 3 and again before Phase 6.**

Approval gates are hard. No template code before the brand board is approved.

## Scratch folder

Everything that isn't part of the template goes in **`.openlanding-page/<slug>/`**. Git, Vercel, TypeScript and ESLint all ignore it.

```
.openlanding-page/<slug>/
  board/        the brand board (index.html), served locally
  shots/        screenshots and contact sheets
  lighthouse/   Lighthouse reports
  media/        generation scripts, API responses, extracted video frames
  scratch/      any other helper scripts or temporary configs
```

Template code lives only where `repo-wiring.md` puts it.

## Workflow

### Phase 1: Recon (silent)
- List the existing templates: `scripts/templates.config.ts`, `src/app/(index)/data/templates.ts`.
- Skim their `DESIGN.md` files. Note their palettes, fonts and mechanics; the new template must not repeat any of them.
- Run `node .claude/skills/create-landing-template/media/detect-keys.mjs`. It reports which image and video API keys exist, by name only.
- Read `node_modules/next/dist/docs/` for anything you'll touch (see AGENTS.md). This is Next.js 16.

### Phase 2: Ask
Ask the questions in `questions.md`: at most two rounds, one topic at a time, each with a "you decide" option. Word question 7 (images and video: who generates them) from the key-detection result, following `media.md`. If the user says "invent it", decide and say what you decided.

### Phase 3: Concept (in chat)
Send a single short message containing:
- the brand name and the one-line story;
- **the central idea → the signature mechanic** (one sentence: "X, so the page does Y");
- the section list;
- the mood in five words;
- what this template shows that the gallery doesn't have yet.

Get a yes before moving on.

### Phase 4: Brand board (local page, hard gate)
1. Copy `brand-board/board.html` to `.openlanding-page/<slug>/board/index.html` and fill every section. The page shows:
   - the logo, as both a lockup and a mark, on light and dark, and at favicon sizes;
   - the slogan or motto and voice samples;
   - the palette with its roles (the page computes the contrast ratios);
   - the typography, using the real Google Fonts with a size scale;
   - imagery and texture direction;
   - the signature mechanic, sketched;
   - the identity applied to UI (nav, hero, button, card).

   Draw the logo as inline SVG, using no stock images and nothing copied. When you're done, `grep -c "{{" index.html` must print `0`.
2. Serve it with `node .claude/skills/create-landing-template/brand-board/serve.mjs .openlanding-page/<slug>/board`. Give the user the printed URL.
3. Iterate on their feedback until they say it's approved. **No template code before approval.** The approved board is the source of truth for the brand.

### Phase 5: Write the design docs
Write these before building:
- **`src/app/(<slug>)/<slug>/DESIGN.md`:** the spec, with sections for Requirements, Concept, Palette, Type, Layout, the mechanic, Motion, Signature details, Do/Don't, Files and Imagery.
- **`docs/image-prompts/<slug>.md`:** the image and video prompts, following `media.md`.
- **`PROMPT.md`:** the copyable rebuild brief. Write it after the build so it matches.

### Phase 6: Build, and generate media in parallel
- **Structure and registration:** follow `repo-wiring.md` for the folder layout, the build order and the **six registration points**.
- **Media:** if the agent is generating it, follow `media.md` §4b (confirm the cost first). Otherwise, hand the prompts to the user now and keep building on placeholders.
- **Logic first, tested:** logic modules (state machines, progress maths, validation) are pure functions with tests beside them. **REQUIRED SUB-SKILL:** superpowers:test-driven-development.
- **Specialist skills:** for 3D, use webgpu-threejs-tsl. For scroll-scrubbed video, use scroll-world. Before finishing, audit the motion with improve-animations.

### Phase 7: Verify
Run each of these and read the output:
- `npm run check`
- `npm test`
- `npx tsc --noEmit`
- `npx playwright test` (with a new `tests/e2e/<slug>.spec.ts`)

Screenshot the page at 1440×900 and 390×844 into `.openlanding-page/<slug>/shots/` and compare it with the brand board. Run mobile Lighthouse with its report saved to `.openlanding-page/<slug>/lighthouse/`: performance at least 90, accessibility at least 95, best practices 100.

### Phase 8: Hand off
Report:
- what was built;
- the decisions you made;
- the media status: generated and processed, or the prompts and filenames still waiting on the user, with the processing step from `media.md` §5.

Don't deploy or commit unless asked.

## Red flags: stop and go back

| Thought | Reality |
|---|---|
| "The brief is clear, skip the board" | The board is where the user sees the brand. Always show it. |
| "One `page.tsx` with everything is fine" | That's what makes a template thin. Split it into sections, brand, the mechanic and forms. |
| "A gradient hero and three feature cards" | No mechanic, no concept. Go back to Phase 3. |
| "Tests later" | The mechanic's logic gets a test first. |
| "Images can wait, skip the placeholders" | Use the labelled placeholder `Picture` from day one, and write the prompts. |
| "I'll just generate everything with the key I found" | Ask who generates. Confirm the cost before the first paid call. |
| "I'll drop this helper script in `scripts/`, `.superpowers/` or the root" | Scratch files go in `.openlanding-page/<slug>/`. |
