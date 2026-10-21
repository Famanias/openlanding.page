# openlandingpage Landing Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three self-contained, portfolio-grade landing-page templates (Orrery, Cairn and KŌJI) in one Next.js app on Vercel. Each template ships `DESIGN.md` and `PROMPT.md` so an AI agent can copy it.

**Architecture:**
- One Next.js App Router project with no shared root layout. Each template is a route group with its own root layout, tokens, fonts, components and assets.
- Repo-level scripts enforce the copy-unit rules (import isolation, palette discipline) and process owner-generated images.
- KŌJI combines a procedural Three.js WebGPU dish with the `scroll-world` video scrub engine, vendored into its folder.

**Tech Stack:** Next.js (latest stable via `create-next-app@latest`), React, TypeScript, Tailwind CSS v4, Motion, GSAP + ScrollTrigger + Observer, Lenis, Three.js (`three/webgpu` + TSL), sharp, Vitest, Playwright, ffmpeg, Vercel CLI.

**Spec:** `docs/superpowers/specs/2026-10-20-openlandingpage-landing-templates-design.md`. Read it alongside this plan: brand palettes, type, section outlines and K2 camp data live there and are copied into tasks below.

## Global Constraints

- **Next.js:** latest stable at scaffold time (`npx create-next-app@latest`), App Router, TypeScript, `src/` dir, Tailwind v4.
- **Hosting:** Vercel, `*.vercel.app` address. No Cloudflare adapter.
- **No shared root layout.** Route groups: `src/app/(index)`, `src/app/(orrery)`, `src/app/(cairn)`, `src/app/(koji)`. URLs `/`, `/orrery`, `/cairn`, `/koji`.
- **Copy unit:** `src/app/(<slug>)/` + `public/templates/<slug>/`.
  - Files there import only npm packages or relative paths inside the same `(<slug>)` folder.
  - No `@/` alias imports, and no imports from other templates.
- **No component kits inside templates.** No shadcn/ui, and no Lucide (Phosphor or custom SVG only). Logos and icons are hand-authored SVG.
- **Fonts:** via `next/font/google`, declared inside each template's own layout.
- **Palettes are exact and only these hexes appear in a template's CSS/TSX/SVG:**
  - **Orrery:** `#0E0F13` `#F2EFE8` `#2F3BFF` `#FFB000`
  - **Cairn:** `#0B0C0E` `#0F1E33` `#F5F6F7` `#16294A` `#2A3D5E` `#56657F` `#A5AEBD` `#DDE1E7`
  - **KŌJI:** `#1A1918` `#4A4743` `#8E8A83` `#EDEAE4` `#C8331F`
  - Alpha variants are allowed only as `rgb(from <token> r g b / a)` or `color-mix()` of a token, never as new hexes.
  - **One exemption:** `src/app/(koji)/koji/dish/**`. The 3D food's albedo colours (rice, fish, glaze) are content, like a photo, not brand UI. They're excluded from the palette check.
- **Type:**
  - **Orrery:** Instrument Serif / Inter Tight / Geist Mono
  - **Cairn:** Barlow Condensed 800 / Barlow / IBM Plex Mono
  - **KŌJI:** Dela Gothic One / Zen Kaku Gothic New / DM Mono
- **Motion:**
  - UI transitions under 300 ms with a strong ease-out, `cubic-bezier(0.23, 1, 0.32, 1)`. Scroll choreography may run longer.
  - Animate only `transform`/`opacity` (and `clip-path` for reveals).
  - Every template honours `prefers-reduced-motion`: no movement, fades kept, 3D dish static poster.
- **Forms** (Orrery demo, Cairn signup, KŌJI reservation) validate client-side, show a success state and make **no network request**.
- **Images:**
  - Owner-generated originals live in `assets/incoming/<slug>/` (git-ignored if over 5 MB each; otherwise committed).
  - Processed WebP/AVIF output goes to `public/templates/<slug>/`.
  - Cairn images are tritone-mapped black → `#0F1E33` → white at processing time.
- **Each template's `DESIGN.md`** starts with a "Requirements" section listing its npm packages and minimum Next.js version.
- **Owner-generated assets** (images, KŌJI clips) are a dependency. Pages must build and render with labelled placeholders before assets arrive.

## Review Focus

1. **Reduced motion.** Every template stays fully readable with `prefers-reduced-motion: reduce`. Nothing is stuck at `opacity:0` waiting for a scroll trigger, and Orrery's deck becomes normal scrolling. Pinned by `tests/e2e/reduced-motion.spec.ts` (Task 2), extended per template.
2. **Orrery keys inside form fields.** Arrow keys, Space and Page Up/Down typed inside the demo-form inputs must not change slides. Pinned by a test in Task 8.
3. **Phone width.** At a 375 px viewport, no template has horizontal page overflow (the Cairn lookbook scroller is the only intended horizontal scroll, inside its own container). Pinned by `tests/e2e/overflow.spec.ts` (Task 2), extended per template.
4. **Assets not delivered yet.** With `assets/incoming/<slug>/` empty, `next build` passes and every image slot renders a labelled placeholder block instead of a broken image. Pinned in Task 4 (`assetSrc` fallback) and each template's e2e.
5. **Reload mid-scroll.** Reloading `/cairn` halfway down restores a matching altitude readout and active camp, rather than resetting the meter to base camp while the page is mid-climb. Pinned by a test in Task 11.

---

## Phase 0: Foundation

### Task 1: Scaffold the app with multiple root layouts

**Files:**
- Create: project scaffold via `create-next-app` (merge into the repo root, keeping `.gitignore` and `docs/`)
- Create: `src/app/(index)/layout.tsx`, `src/app/(index)/page.tsx`, `src/app/(index)/index.css`
- Delete: the scaffold's `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/e2e/index.spec.ts`
- Modify: `package.json` scripts

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `start`, `test` (Vitest), `test:e2e` (Playwright, which starts `next start` on port 3100 after build), `check` (runs Task 2's checks).

- [ ] **Step 1: Scaffold.** Run `npx create-next-app@latest tf-tmp --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`. Move its contents into the repo root, then delete `tf-tmp`. Record the installed `next` version in the commit message.
- [ ] **Step 2: Add test tooling.** Run `npm i -D vitest @playwright/test` and then `npx playwright install chromium`. Set Playwright's `webServer` to `npm run build && npm run start -- -p 3100` and `baseURL` to `http://localhost:3100`.
- [ ] **Step 3: Write the failing e2e test** in `tests/e2e/index.spec.ts`:

```ts
test('index lists the three templates', async ({ page }) => {
  await page.goto('/');
  for (const [name, href] of [['Orrery', '/orrery'], ['Cairn', '/cairn'], ['KŌJI', '/koji']]) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});
```

- [ ] **Step 4: Run `npm run test:e2e`.** Expected: FAIL (the default Next page has no such links).
- [ ] **Step 5: Implement the `(index)` route group** with its own `<html>/<body>` layout and a plain list of the three links. It is a neutral placeholder for the future gallery: system font, no kit components. Delete the scaffold's root layout, page and globals.
- [ ] **Step 6: Run `npm run test:e2e`.** Expected: PASS.
- [ ] **Step 7: Commit:** `chore: scaffold Next.js app with per-template root layouts`

### Task 2: Copy-unit guard scripts and cross-template e2e checks

**Files:**
- Create: `scripts/check-isolation.ts`, `scripts/check-palette.ts`, `scripts/templates.config.ts`
- Test: `scripts/__tests__/check-isolation.test.ts`, `scripts/__tests__/check-palette.test.ts`
- Create: `tests/e2e/reduced-motion.spec.ts`, `tests/e2e/overflow.spec.ts`, `tests/e2e/templates.ts`

**Interfaces:**
- Produces:
  - `TEMPLATES: Record<'orrery'|'cairn'|'koji', { palette: string[]; paletteExempt?: string[] }>` in `scripts/templates.config.ts`. Palettes are copied from Global Constraints; koji has `paletteExempt: ['src/app/(koji)/koji/dish/']`.
  - `findIsolationViolations(slug: string, files: {path: string; source: string}[]): {path: string; specifier: string}[]`
  - `findPaletteViolations(slug: string, files: {path: string; source: string}[]): {path: string; hex: string}[]`
  - CLI: `npm run check` runs both over `src/app/(<slug>)/**/*.{ts,tsx,css,svg}` and exits 1 on any violation.
  - `tests/e2e/templates.ts` exports `TEMPLATE_PATHS: string[]`. Templates append their path when their page exists, so e2e suites cover them automatically.

- [ ] **Step 1: Write failing unit tests:**

```ts
expect(findIsolationViolations('cairn', [{ path: 'src/app/(cairn)/cairn/page.tsx',
  source: `import x from '@/lib/x'; import y from '../../(orrery)/a'; import z from './z'; import gsap from 'gsap'` }]))
  .toEqual([{ path: 'src/app/(cairn)/cairn/page.tsx', specifier: '@/lib/x' },
            { path: 'src/app/(cairn)/cairn/page.tsx', specifier: '../../(orrery)/a' }]);
expect(findPaletteViolations('cairn', [{ path: 'a.css', source: 'color:#E8542B;background:#0f1e33' }]))
  .toEqual([{ path: 'a.css', hex: '#E8542B' }]);   // case-insensitive match; 3-digit hex is expanded before comparing
```

- [ ] **Step 2: Run `npx vitest run scripts`.** Expected: FAIL (module not found).
- [ ] **Step 3: Implement both functions and the CLI.**
  - Resolve relative specifiers against the file's path and flag any that leave `src/app/(<slug>)/`.
  - Allow `public/templates/<slug>/` asset URLs written as strings, `/templates/<slug>/…`.
- [ ] **Step 4: Run `npx vitest run scripts`.** Expected: PASS.
- [ ] **Step 5: Write the e2e suites.**
  - `reduced-motion.spec.ts`: with `test.use({ reducedMotion: 'reduce' })`, for each path every `h1, h2` is visible and none has computed opacity `0`.
  - `overflow.spec.ts`: at viewport `375×812`, `document.documentElement.scrollWidth <= innerWidth`.
  - Both loop over `TEMPLATE_PATHS`, which starts as `[]`.
- [ ] **Step 6: Run `npm run check && npm run test:e2e`.** Expected: PASS.
- [ ] **Step 7: Commit:** `chore: add template isolation and palette guards`

### Task 3: Image prompt files for owner generation (Gemini)

**Files:**
- Create: `docs/image-prompts/README.md`, `docs/image-prompts/orrery.md`, `docs/image-prompts/cairn.md`, `docs/image-prompts/koji.md`
- Create: `assets/incoming/{orrery,cairn,koji}/.gitkeep` and `assets/incoming/koji/clips/.gitkeep`

**Interfaces:**
- Produces: the filename contract Task 4 and every template rely on. Filenames are kebab-case `.png`, listed per template. Templates reference images by these basenames as keys, for example `hero-orbits`.

- [ ] **Step 1: Write `README.md`.**
  - How to generate in Gemini, one image per prompt.
  - Save as PNG at the largest size offered.
  - Exact filename, into `assets/incoming/<slug>/`.
  - Re-roll anything off-style.
- [ ] **Step 2: Write each template's prompt file.**
  - Start with a **style preamble**, then a table with one row per image: `filename | aspect | where it's used`.
  - Then one section per image with the full prompt, the preamble pasted in verbatim at its start.
  - Image counts and direction (from spec §5):
    - **Orrery: 8.** Editorial abstract (orbits, textured bone paper, brass instrument close-ups, ultramarine/amber ink). No robots, brains, neon or purple. Covers: title-slide art, problem-slide art, 3 use-case images, a security-slide texture, the OG image base and a quote-slide portrait texture.
    - **Cairn: 12.** Night and blue-hour Karakoram, K2 from Concordia, climbers on fixed lines, and product shots of the shell, down suit, base layer, mid layer, gloves and gaiters in black, navy or white on seamless dark backdrops. Includes 2 fabric macro close-ups and 4 lookbook frames. Note in the preamble that colour will be removed in processing, so prompts favour strong tonal contrast.
    - **KŌJI: 11.** 1970s Fujicolor film, grain, slightly faded. Board-marked concrete counters, heavy stoneware, steam in raking light, chefs seen through concrete openings, the Metabolist tower exterior at dusk.
      - Includes the **5 flight scene stills**: one dish per course group (sakizuke, mukōzuke, yakimono, nimono/agemono, shokuji). Each dish sits on a concrete plinth against flat concrete grey, framed identically, 16:9.
      - Also 1 hero-dish poster: the fallback for the WebGPU dish, a 3/4 view of miso-glazed nigiri on dark stoneware.
- [ ] **Step 3: Verify.** Every filename is unique within its template, and every row has a matching prompt section. Read `koji.md` aloud against spec §5.1 photo direction.
- [ ] **Step 4: Commit:** `docs: add Gemini image prompts for all three templates`
- [ ] **Step 5: OWNER CHECKPOINT.** Tell the owner the prompt files are ready. Generation runs in parallel with Tasks 4–8. Do not block on it.

### Task 4: Image pipeline and asset fallback

**Files:**
- Create: `scripts/process-images.ts`
- Test: `scripts/__tests__/process-images.test.ts`

**Interfaces:**
- Produces:
  - `tritone(luma: number /*0..1*/): [number, number, number]`. It maps 0 → `#0B0C0E`, 0.5 → `#0F1E33`, 1 → `#F5F6F7`, interpolating linearly in sRGB between stops.
  - CLI: `npm run images -- <slug>`. For each PNG in `assets/incoming/<slug>/`, it writes `public/templates/<slug>/<name>-{800,1600}.{avif,webp}` and applies `tritone` when slug is `cairn`.
  - It also writes `src/app/(<slug>)/<slug>/assets.generated.ts`, exporting `ASSETS: Record<string, { w: number; h: number }>` keyed by basename.
  - Each template writes its own tiny `assetSrc(key, width)` helper. It returns `/templates/<slug>/<key>-<width>.webp`, or `null` when the key is absent from `ASSETS`.
  - Each template also has a `<Picture>` component that renders a palette-coloured placeholder labelled with the key when `assetSrc` returns `null`.
  - These helpers live inside each template folder (copy-unit rule), not in `scripts/`.

- [ ] **Step 1: Write the failing test:** `expect(tritone(0)).toEqual([11,12,14]); expect(tritone(0.5)).toEqual([15,30,51]); expect(tritone(1)).toEqual([245,246,247]);`
- [ ] **Step 2: Run `npx vitest run scripts/__tests__/process-images.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement with `sharp`** (`npm i -D sharp`). For Cairn: greyscale, then map luminance through `tritone` per pixel via raw buffer. Write the AVIF/WebP pairs, then regenerate `assets.generated.ts`, writing `export const ASSETS = {}` when there are no inputs.
- [ ] **Step 4: Run the tests and `npm run images -- cairn`** with an empty incoming folder. Expected: PASS, and an empty `ASSETS` file is generated.
- [ ] **Step 5: Commit:** `chore: add image processing pipeline with Cairn tritone`

### Task 5: Early Vercel deploy with heavy dependencies

**Files:**
- Modify: `package.json` dependencies
- Create: `src/app/(index)/deps-smoke.tsx`. It's a client component that dynamic-imports `three/webgpu`, `three/tsl`, `gsap`, `gsap/ScrollTrigger`, `gsap/Observer`, `lenis`, `motion/react` and renders `data-deps="ok"`. It's removed in Task 18.

- [ ] **Step 1: Install dependencies:** `npm i three gsap lenis motion @phosphor-icons/react` and `npm i -D @types/three`.
- [ ] **Step 2: Render `<DepsSmoke />` on `/`.** Add an e2e assertion that `[data-deps="ok"]` appears within 5 s.
- [ ] **Step 3: Run `npm run build && npm run test:e2e`.** Expected: PASS.
- [ ] **Step 4: OWNER STEP.** Ask the owner to run `! npx vercel login`. Then run `npx vercel link --yes` and `npx vercel deploy --prod --yes`.
- [ ] **Step 5: Verify.** `curl -s -o /dev/null -w "%{http_code}" <deploy-url>/` returns `200`. Record the URL in `docs/superpowers/plans/DEPLOY.md`.
- [ ] **Step 6: Commit:** `chore: verify heavy deps build and deploy on Vercel`

---

## Phase 1: Orrery (presentation-style)

### Task 6: Orrery shell, brand assets and deck engine

**Files:**
- Create: `src/app/(orrery)/layout.tsx`, `src/app/(orrery)/orrery/page.tsx`, `orrery.css`, `icon.svg`, `opengraph-image.tsx`
- Create: `src/app/(orrery)/orrery/deck/deck-state.ts`, `deck/Deck.tsx`, `deck/ChapterRail.tsx`, `deck/SlideCounter.tsx`
- Create: `src/app/(orrery)/orrery/brand/Logo.tsx`, `assets.ts` (`assetSrc` + `Picture` per Task 4)
- Test: `src/app/(orrery)/orrery/deck/deck-state.test.ts`, `tests/e2e/orrery.spec.ts`

**Interfaces:**
- Produces:
  - `type DeckState = { index: number; count: number }`
  - `deckReducer(s: DeckState, a: { type: 'next' | 'prev' | 'first' | 'last' } | { type: 'goto'; index: number }): DeckState` (clamped; no wrap)
  - `formatCounter(index: number, count: number): string`, which returns `"03 / 10"` for `(2, 10)`
  - `<Deck slides={{ id: string; chapter: string; render: (active: boolean) => ReactNode }[]} />`
- On desktop (`min-width: 900px`, not reduced-motion), `Deck`:
  - uses GSAP `Observer` (wheel/touch with a 600 ms lock per step), plus keys ArrowDown/ArrowRight/PageDown/Space → next, ArrowUp/ArrowLeft/PageUp → prev, Home/End;
  - transitions slides with a 700 ms `cubic-bezier(0.77, 0, 0.175, 1)` clip/translate;
  - updates `#hash` per slide id and reads it on load.
- On mobile or with reduced motion, slides render as stacked full-height sections with normal scrolling. The counter follows an IntersectionObserver instead.

- [ ] **Step 1: Write failing unit tests:** `formatCounter(2,10) === "03 / 10"`; `next` from index 9 of 10 stays at 9; `prev` from 0 stays 0; `goto 4` gives 4; `goto 99` gives 9.
- [ ] **Step 2: Run `npx vitest run "src/app/(orrery)"`.** Expected: FAIL.
- [ ] **Step 3: Implement `deck-state.ts`,** then `Deck`, `SlideCounter` and `ChapterRail`.
  - The chapter rail is a vertical list of chapter names; the active one is shown in ultramarine.
- [ ] **Step 4: Build the brand assets and shell.**
  - Logo: "Orrery." in Instrument Serif, with the full stop in ultramarine.
  - `icon.svg`: a dot inside two orbits with one ultramarine satellite.
  - Layout: fonts via `next/font/google`, tokens in `orrery.css` under `@theme` (the four hexes plus motion curve variables).
  - Metadata: title "Orrery — the orchestration layer for teams of AI agents".
  - Page: 10 placeholder slides with the spec §5.2 titles.
- [ ] **Step 5: Write the e2e test.**
  - At 1440×900, pressing ArrowDown twice shows `03 / 10` and the URL hash equals slide 3's id.
  - Loading `/orrery#security` shows `09 / 10`.
  - Add `/orrery` to `TEMPLATE_PATHS`.
- [ ] **Step 6: Run `npx vitest run && npm run check && npm run test:e2e`.** Expected: PASS.
- [ ] **Step 7: Commit:** `feat(orrery): brand shell and keynote deck engine`

### Task 7: Orrery slides 1–5 and the orbit build

**Files:**
- Create: `src/app/(orrery)/orrery/slides/{TitleSlide,ProblemSlide,OrrerySlide,HowSlide,UseCasesSlide}.tsx`, `slides/OrbitDiagram.tsx`
- Modify: `orrery/page.tsx`

**Interfaces:**
- Consumes: `Deck`'s `render(active)`.
- Produces: `<OrbitDiagram step={0|1|2|3|4} />`, a pure SVG whose content builds up by step:
  - 0: the core
  - 1: the inner orbit and 2 agents
  - 2: the outer orbit and 3 agents
  - 3: connection lines
  - 4: the amber "task" pulse travelling along the lines

  On the orrery slide, `step` advances every 450 ms while `active`, and renders at 4 immediately under reduced motion.

- [ ] **Step 1: Write the failing e2e test.**
  - On slide 3, `[data-orbit-step="4"]` exists within 3 s.
  - With reduced motion, it exists immediately on load of `/orrery#orrery`.
- [ ] **Step 2: Run `npm run test:e2e -- orrery`.** Expected: FAIL.
- [ ] **Step 3: Implement the five slides**, with copy in Orrery's calm, editorial voice.
  - Slide 2 headline: "One agent isn't a team."
  - Slide 4: three numbered steps that build in.
  - Slide 5: three use cases using `Picture` with keys `usecase-1..3`.
  - Use Phosphor icons only where an icon is needed.
- [ ] **Step 4: Run `npm run test:e2e -- orrery && npm run check`.** Expected: PASS.
- [ ] **Step 5: VISUAL REVIEW.** Take Playwright screenshots of slides 1–5 at 1440×900 and 375×812 into `artifacts/orrery/`, then review them against the anti-goals (no kit look, no AI clichés). Fix anything before committing.
- [ ] **Step 6: Commit:** `feat(orrery): slides 1-5 with orbit build`

### Task 8: Orrery slides 6–10 and the demo form

**Files:**
- Create: `slides/{ResultsSlide,QuotesSlide,PricingSlide,SecuritySlide,CtaSlide}.tsx`, `orrery/forms/demo-form.ts`, `forms/DemoForm.tsx`
- Test: `forms/demo-form.test.ts`

**Interfaces:**
- Produces:
  - `validateDemo(input: { name: string; email: string; company: string }): Partial<Record<'name'|'email'|'company', string>>`
  - Errors use the exact copy `"Add your name"`, `"Enter a work email"` and `"Add your company"`.
  - The email check is `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
  - `<DemoForm />` shows inline errors and, on valid submit, a success panel reading "Thanks — we'll be in touch within one working day." It makes no `fetch`.

- [ ] **Step 1: Write failing tests.**
  - Unit: `validateDemo({name:'',email:'x',company:''})` returns all three errors; a valid input returns `{}`.
  - E2E: submitting a valid form shows the success text, and `page.on('request')` records no non-asset requests after submit.
  - E2E (Review Focus 2): focus the email input on slide 10, press ArrowUp, Space and PageUp, and the counter still reads `10 / 10`. `Deck` must ignore key events whose target is an `input`, `textarea`, `select` or `[contenteditable]`.
- [ ] **Step 2: Run the tests.** Expected: FAIL.
- [ ] **Step 3: Implement the slides and form.**
  - Results: three large figures that count up when active (static under reduced motion).
  - Pricing: three tiers, with the middle one ink-filled.
  - Security: a short claims grid.
  - CTA: closing headline plus `DemoForm`.
- [ ] **Step 4: Run `npx vitest run && npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 5: Commit:** `feat(orrery): slides 6-10 and demo form`

### Task 9: Orrery images, DESIGN.md, PROMPT.md and copy-unit check

**Files:**
- Create: `src/app/(orrery)/orrery/DESIGN.md`, `orrery/PROMPT.md`, `scripts/copy-unit-check.sh`
- Modify: `orrery/assets.generated.ts` (via `npm run images -- orrery`)

**Interfaces:**
- Produces:
  - `scripts/copy-unit-check.sh <slug>`. It creates a temp dir with `npx create-next-app@latest` (same flags as Task 1), deletes its `src/app/{layout,page}.tsx` and `globals.css`, and copies in `src/app/(<slug>)/` and `public/templates/<slug>/`.
  - It then installs the packages listed under "Requirements" in `DESIGN.md` (parsed from the fenced `npm i …` line) and runs `npx next build`. It exits non-zero on failure.

- [ ] **Step 1: OWNER CHECKPOINT.** If `assets/incoming/orrery/` has the 8 images:
  - run `npm run images -- orrery`;
  - show the owner a contact sheet of the processed images;
  - get approval.

  If the images aren't there yet, continue with placeholders and note it in the task report.
- [ ] **Step 2: Write `DESIGN.md`** covering every section listed in spec §4 "Copy-ready files":
  - Requirements (packages and the Next.js version from Task 1)
  - concept
  - palette with roles
  - type scale
  - spacing and grid
  - motion rules (deck timing, the 450 ms build steps, the reduced-motion behaviour)
  - slide-by-slide layout
  - imagery direction, with the exact prompts copied from `docs/image-prompts/orrery.md`
  - signature details
  - do's and don'ts
- [ ] **Step 3: Write `PROMPT.md`.** A single paste-ready prompt for rebuilding in React/Next.js + Tailwind. It links the live asset URLs `https://<deploy>/templates/orrery/<key>-1600.webp` as reference images and tells the agent to generate its own.
- [ ] **Step 4: Run `bash scripts/copy-unit-check.sh orrery`.** Expected: exit 0.
- [ ] **Step 5: Run `npm run check && npm run test:e2e`, then `npx vercel deploy --prod --yes`.** Expected: PASS, and `/orrery` returns 200 on the deploy URL.
- [ ] **Step 6: Commit:** `feat(orrery): design docs, prompt and copy-unit check`

---

## Phase 2: Cairn (showcase)

### Task 10: Cairn shell, brand assets and the ascent model

**Files:**
- Create: `src/app/(cairn)/layout.tsx`, `cairn/page.tsx`, `cairn.css`, `icon.svg`, `opengraph-image.tsx`, `brand/Logo.tsx`, `assets.ts`
- Create: `cairn/ascent/route.ts`, `ascent/K2Silhouette.tsx`, `ascent/AltitudeMeter.tsx`, `ascent/AscentStage.tsx`
- Test: `cairn/ascent/route.test.ts`, `tests/e2e/cairn.spec.ts`

**Interfaces:**
- Produces:
  - `CAMPS: { id: string; name: string; altitude: number }[]` = `base 5000 "Base Camp"`, `c1 6050 "Camp 1"`, `c2 6700 "Camp 2"`, `c3 7350 "Camp 3"`, `c4 7900 "Camp 4"`, `bottleneck 8200 "Bottleneck"`, `summit 8611 "Summit"`.
  - `altitudeAt(progress: number): number` piecewise-linearly interpolates the camps at equal progress spacing (camp *i* at `i/6`), clamping to `[0, 1]`.
  - `activeCamp(progress: number): number` returns the index of the last camp whose position is ≤ `progress + 0.0001`.
  - `formatAltitude(m: number): string` returns `"8,611 M"` for `8611`.
  - `<AscentStage>` pins the K2 silhouette and meter for the length of the chapters container, driven by a GSAP ScrollTrigger whose `onUpdate` passes `progress`.
  - Cairn uses Lenis smooth scrolling synced to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` with GSAP's ticker driving `lenis.raf`). Lenis is disabled under reduced motion.
- `K2Silhouette` is a hand-authored SVG:
  - the classic south-face pyramid from Concordia above the Baltoro Glacier;
  - a dashed route path (`id="abruzzi"`);
  - a dot positioned with `getPointAtLength(progress × length)`.
- Coordinates `35.8825° N · 76.5133° E` appear in the stage corner.

- [ ] **Step 1: Write failing unit tests:** `altitudeAt(0)===5000`; `altitudeAt(1)===8611`; `altitudeAt(0.5)===7350`; `activeCamp(0.49)===2`; `activeCamp(0.5)===3`; `formatAltitude(8611)==="8,611 M"`; `altitudeAt(-1)===5000`.
- [ ] **Step 2: Run `npx vitest run "src/app/(cairn)"`.** Expected: FAIL.
- [ ] **Step 3: Implement `route.ts`, then build the stage components and the brand shell.**
  - Logo: "CAIRN" in Barlow Condensed 800.
  - `icon.svg`: three stacked stones, white on `#0F1E33`.
  - `cairn.css` `@theme` holds only the eight allowed hexes.
  - Tagline: "Alpine equipment · Tested on K2".
  - Seven chapter placeholders, one per camp.
- [ ] **Step 4: Write the e2e test.**
  - Scrolling to the bottom of the chapters shows meter text `8,611 M` and the active label `Summit`.
  - At the top it shows `5,000 M`.
  - Add `/cairn` to `TEMPLATE_PATHS`.
- [ ] **Step 5: Run `npx vitest run && npm run check && npm run test:e2e`.** Expected: PASS.
- [ ] **Step 6: Commit:** `feat(cairn): brand shell and K2 ascent stage`

### Task 11: Cairn chapters, Base Camp to Camp 2

**Files:**
- Create: `cairn/chapters/{BaseCamp,BaseLayers,MidLayers}.tsx`, `chapters/LayerDiagram.tsx`, `cairn/products.ts`
- Test: `cairn/products.test.ts`, extend `tests/e2e/cairn.spec.ts`

**Interfaces:**
- Produces:
  - `type Product = { id: string; name: string; category: 'base'|'mid'|'shell'|'down'|'hands'; colourways: ('black'|'navy'|'white')[]; specs: { label: string; value: string }[]; images: Record<'black'|'navy'|'white', string /*asset key*/> }`
  - `PRODUCTS: Product[]`, which includes `summit-shell-3l` with specs Weight `412 g`, Waterproof `28,000 mm` and Breathability `25,000 g/m²`.
  - `productsIn(category): Product[]`
  - `<LayerDiagram active={0|1|2} />`: three stacked layers (base, mid, shell) that separate on scroll.

- [ ] **Step 1: Write failing tests.**
  - Unit: every product has at least one colourway, and each listed colourway has an image key.
  - E2E (Review Focus 5): scroll to 50% of the chapters, reload, wait 500 ms, and the active camp label matches `CAMPS[activeCamp(progress)]` computed from `scrollY` in the page. Call `ScrollTrigger.refresh()` after fonts load and use `history.scrollRestoration = 'auto'`.
- [ ] **Step 2: Run the tests.** Expected: FAIL.
- [ ] **Step 3: Implement the chapters.**
  - Base Camp: brand intro and FW26 collection grid.
  - Camp 1: base-layer products.
  - Camp 2: mid layers plus `LayerDiagram`.
  - Emphasis uses white-on-navy inversion only.
- [ ] **Step 4: Run `npx vitest run && npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 5: Commit:** `feat(cairn): base camp to camp 2 chapters`

### Task 12: Cairn chapters, Camp 3 to Bottleneck

**Files:**
- Create: `cairn/chapters/{Shells,Down,HandsFeet}.tsx`, `cairn/showcase/{ColourwaySwap,FabricZoom,SpecSheet}.tsx`

**Interfaces:**
- Consumes: `PRODUCTS` and `productsIn`.
- Produces:
  - `<ColourwaySwap product={Product} />`: radio-group swatches (keyboard-operable). Swapping crossfades the image in 200 ms with a 2 px blur during the swap, using `motion/react` `AnimatePresence`. Under reduced motion the swap is an instant change.
  - `<FabricZoom src key />`: hover or tap shows a 2.5× loupe following the pointer, or a tap-to-toggle full zoom on touch.
  - `<SpecSheet product />`: a gear-label table in IBM Plex Mono with a stitched border.

- [ ] **Step 1: Write the failing e2e test.**
  - In Camp 3, select the "White" swatch with the keyboard (Tab to the group, ArrowRight), and the hero image `src` contains the white image key.
  - The spec sheet shows `28,000 mm`.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement the three chapters and the showcase components.**
- [ ] **Step 4: Run `npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 5: VISUAL REVIEW.** Take screenshots at 1440×900 and 375×812 into `artifacts/cairn/`. Confirm no hue outside the palette is visible, either by eye or with `npm run check`.
- [ ] **Step 6: Commit:** `feat(cairn): camp 3 to bottleneck showcase`

### Task 13: Cairn summit lookbook, signup, docs and copy-unit check

**Files:**
- Create: `cairn/chapters/Summit.tsx`, `cairn/showcase/Lookbook.tsx`, `cairn/forms/signup.ts`, `forms/Signup.tsx`, `cairn/DESIGN.md`, `cairn/PROMPT.md`
- Test: `cairn/forms/signup.test.ts`

**Interfaces:**
- Produces:
  - `validateEmail(email: string): string | null`. It returns `"Enter a valid email"` or `null`, using the same regex as Orrery but its own copy within the Cairn folder.
  - `<Lookbook frames={{ key: string; hotspots: { x: number; y: number; productId: string }[] }[]} />`: a horizontal drag/scroll container with `overflow-x: auto` and scroll-snap. Hotspots are buttons that open a small product card.

- [ ] **Step 1: Write failing tests.**
  - Unit: `validateEmail('a@b.co') === null` and `validateEmail('nope') === "Enter a valid email"`.
  - E2E: clicking the first hotspot shows the product's name, and a valid signup shows the success text without a network request.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement Summit, Lookbook and Signup.**
- [ ] **Step 4: OWNER CHECKPOINT.** Run `npm run images -- cairn`, which applies the tritone, then show the contact sheet and get approval. Use placeholders if the images aren't there yet.
- [ ] **Step 5: Write `DESIGN.md` and `PROMPT.md`,** with the same section list as Task 9. Include the camp table, the tritone rule and the exact image prompts.
- [ ] **Step 6: Run `bash scripts/copy-unit-check.sh cairn && npm run check && npm run test:e2e`, then deploy.** Expected: PASS, and `/cairn` returns 200.
- [ ] **Step 7: Commit:** `feat(cairn): summit lookbook, signup and design docs`

---

## Phase 3: KŌJI (3D-focused, brutalist)

### Task 14: KŌJI shell, brand assets and 2D brutalist sections

**Files:**
- Create: `src/app/(koji)/layout.tsx`, `koji/page.tsx`, `koji.css`, `icon.svg`, `opengraph-image.tsx`, `brand/{Wordmark,Hanko,Noren}.tsx`, `assets.ts`
- Create: `koji/sections/{Kitchen,Building,Chef,Reservation,Footer}.tsx`, `koji/forms/reservation.ts`, `forms/ReservationForm.tsx`
- Test: `koji/forms/reservation.test.ts`, `tests/e2e/koji.spec.ts`

**Interfaces:**
- Produces:
  - `validateReservation(i: { date: string; time: string; guests: number; name: string; email: string }): Partial<Record<keyof typeof i, string>>` with these rules:
    - `guests` must be 1–4 (the counter seats 12; parties of 4 or fewer only). Error copy: `"Parties of 1–4 only"`.
    - `time` must be one of `18:00`, `18:30`, `20:45`, `21:15`.
    - `date` must not be in the past.
  - The success panel reads "Your seats are held. A confirmation will follow by email."
  - `<Hanko size />`: a red `#C8331F` square seal bearing 麹. It's also used as `icon.svg`.
  - `<Noren />`: a curtain strip of five panels along the top nav.

- [ ] **Step 1: Write failing tests.**
  - Unit: guests `5` gives `"Parties of 1–4 only"`; time `19:00` gives an error; a valid booking gives `{}`.
  - E2E: a valid reservation shows the success text with no network request. Add `/koji` to `TEMPLATE_PATHS`.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the shell and 2D sections.**
  - Wordmark "KŌJI" in Dela Gothic One, with a vertical 麹 graphic.
  - Concrete-grey slabs and rigid grid.
  - Signage strip: `OPEN 18:00–23:00 · 11 COURSES · 12 SEATS · B1–14F`.
  - Board-marked concrete is a CSS `repeating-linear-gradient` texture using only palette tokens.
  - Photos via `Picture`.
  - A hero placeholder slot with id `dish` for Task 15, and a course-sequence slot with id `flight` for Task 17.
- [ ] **Step 4: Run `npx vitest run && npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 5: Commit:** `feat(koji): brutalist shell, sections and reservation form`

### Task 15: KŌJI real-time WebGPU hero dish

**Files:**
- Create: `koji/dish/createDishScene.ts`, `dish/nigiri.ts`, `dish/materials.ts`, `dish/HeroDish.tsx`, `dish/capabilities.ts`
- Test: `dish/capabilities.test.ts`, extend `tests/e2e/koji.spec.ts`

**Interfaces:**
- Produces:
  - `pickRenderMode(env: { reducedMotion: boolean; webgpu: boolean; webgl2: boolean }): 'webgpu' | 'webgl2' | 'poster'`. It returns `'poster'` when `reducedMotion` is true or neither GPU path is available.
  - `createDishScene(canvas: HTMLCanvasElement, opts: { onReady(): void }): Promise<{ dispose(): void }>`. It uses `three/webgpu` `WebGPURenderer` (with automatic WebGL2 fallback) and TSL `MeshStandardNodeMaterial`s from `materials.ts`.
  - Materials:
    - rice: per-grain noise bump plus subsurface-ish warm albedo
    - fish: layered fat-marbling stripes via `mx_noise` plus a glossy clearcoat
    - miso glaze: a translucent amber-brown sheen (food colour; `dish/` is palette-exempt)
    - stoneware plate: speckled dark `#1A1918`
  - Geometry is built procedurally in `nigiri.ts`: an instanced grain cluster for the rice, plus a draped slab for the fish.
  - Interaction: auto-rotates at 0.15 rad/s; pointer-drag rotates with inertia (damping 0.92 per frame); it pauses when off-screen via IntersectionObserver.
  - `<HeroDish />` lazy-loads the scene with `next/dynamic` and `ssr:false`. It shows the poster `hero-dish-poster` (Picture) until `onReady`, then fades the canvas in over 400 ms.

- [ ] **Step 1: Load the `webgpu-threejs-tsl` skill** and follow its import pattern and device-loss guidance.
- [ ] **Step 2: Write failing tests.**
  - Unit: `pickRenderMode({reducedMotion:true,webgpu:true,webgl2:true})==='poster'`; `({false,false,true})==='webgl2'`; `({false,false,false})==='poster'`.
  - E2E: with reduced motion, `#dish img` is visible and no `canvas` is present. With default motion in Chromium, `#dish canvas[data-ready="true"]` appears within 8 s.
- [ ] **Step 3: Run them.** Expected: FAIL.
- [ ] **Step 4: Implement `capabilities.ts`, `materials.ts`, `nigiri.ts`, `createDishScene.ts` and `HeroDish.tsx`.**
- [ ] **Step 5: Run `npx vitest run && npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 6: VISUAL REVIEW.** Take a screenshot of the hero at 1440×900 into `artifacts/koji/`. The dish must read as appetising food under raking light, not as plastic. Iterate the materials until it does, then show the owner.
- [ ] **Step 7: Commit:** `feat(koji): procedural WebGPU hero dish`

### Task 16: KŌJI clip relay tooling and dive prompts

**Files:**
- Create: `docs/image-prompts/koji-clips.md`, `scripts/seam-frames.sh`, `scripts/seam-check.sh`

**Interfaces:**
- Produces the clip filename contract in `assets/incoming/koji/clips/`:
  - `dive-1.mp4` … `dive-5.mp4`
  - `conn-1-2.mp4` … `conn-4-5.mp4`
- `scripts/seam-frames.sh <n>` writes `assets/incoming/koji/clips/seam-<n>-<n+1>/{start.png,end.png}`:
  - `start.png` is the last frame of `dive-n` (`ffmpeg -sseof -0.05 -i dive-n.mp4 -frames:v 1`);
  - `end.png` is the first frame of `dive-n+1`.
- `scripts/seam-check.sh` compares each connector's first frame with the matching `start.png` and its last frame with `end.png`. It uses `ffmpeg -lavfi psnr`, prints PSNR per seam, and exits 1 if any seam is under **30 dB**, the threshold from the scroll-world skill.

- [ ] **Step 1: Load the `scroll-world` skill.** Read its Step 4/5 seam method and `references/prompts.md` camera grammar, then adapt them to Veo:
  - 8 s dives, using "start from this image";
  - connectors via Veo first-and-last-frame (Flow "Frames to Video");
  - one shared style preamble matching the scene stills;
  - a locked brutalist camera feel: slow push-in onto each dish on its concrete plinth, flat concrete grey around it.
- [ ] **Step 2: Write `koji-clips.md`** with:
  - the relay steps for the owner, exactly as spec §5.1;
  - 5 dive prompts;
  - 4 connector prompts that reference `seam-n-n+1/start.png` and `end.png`;
  - the filename for each clip.
- [ ] **Step 3: Write both scripts.** Verify on a synthetic clip: `ffmpeg -f lavfi -i testsrc=d=2:s=1280x720 -pix_fmt yuv420p t.mp4`, then run `seam-frames` on two copies, then `seam-check` with the same clip as connector. It should report PSNR at least 30 and exit 0.
- [ ] **Step 4: Commit:** `docs(koji): Veo clip relay prompts and seam tooling`
- [ ] **Step 5: OWNER RELAY (asynchronous).**
  1. The owner generates `dive-1..5` from the approved scene stills.
  2. Run `seam-frames.sh 1..4` and hand the owner the seam folders.
  3. The owner generates the connectors.
  4. Run `seam-check.sh`.

  For any seam under 30 dB, ask the owner for one re-roll. If it still fails, mark that seam `slabWipe` in Task 17's config.

### Task 17: KŌJI scroll-scrubbed food flight

**Files:**
- Create: `koji/flight/scrub-engine.js` (copied verbatim from `~/.agents/skills/scroll-world/references/scrub-engine.js`, with a header comment crediting `oso95/scroll-world`), `flight/FoodFlight.tsx`, `flight/flight.config.ts`, `flight/SlabWipe.tsx`
- Create: `scripts/encode-clips.sh`
- Test: `flight/flight.config.test.ts`, extend `tests/e2e/koji.spec.ts`

**Interfaces:**
- Consumes: `mountScrollWorld(container, { sections: {id,label,still,clip}[], connectors: (string|null)[] })` from the vendored engine. A `null` connector means a hard cut between dives.
- Produces:
  - `FLIGHT: { sections: { id: 'sakizuke'|'mukozuke'|'yakimono'|'nimono'|'shokuji'; label: string; courses: string[] /* the 11 courses split across 5 groups */ }[]; seams: ('clip'|'slabWipe')[] /* length 4 */ }`
  - `toEngineConfig(f: typeof FLIGHT, base: string): Parameters<typeof mountScrollWorld>[1]`. It maps `slabWipe` seams to `null` connectors and builds URLs as `${base}/dive-<i>.mp4` and `${base}/conn-<i>-<i+1>.mp4`.
  - `<FoodFlight />` mounts the engine client-side.
    - On each `slabWipe` boundary it overlays `<SlabWipe>`: a flat `#4A4743` panel sweeping across in 450 ms with `cubic-bezier(0.77, 0, 0.175, 1)`.
    - It renders the 11-course menu in DM Mono beside the video, with the current group highlighted in shu.
    - With reduced motion, or when clips are missing, it shows the 5 scene stills as a static stacked sequence.
- `scripts/encode-clips.sh` encodes each clip to `public/templates/koji/clips/` with `-c:v libx264 -crf 20 -g 8 -keyint_min 8 -sc_threshold 0 -an -movflags +faststart`, the scroll-world desktop settings.

- [ ] **Step 1: Write failing tests.**
  - Unit: the 11 courses across `FLIGHT.sections` total exactly 11; `toEngineConfig` with `seams[1]='slabWipe'` gives `connectors[1] === null` and `connectors.length === 4`.
  - E2E (once clips exist): after scrolling to the `#flight` midpoint, the engine's active video `currentTime > 0`.
  - E2E (placeholder path): with no clips, 5 still images render.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement** `flight.config.ts`, `FoodFlight.tsx`, `SlabWipe.tsx` and `encode-clips.sh`, then vendor the engine.
- [ ] **Step 4: Encode the clips.** Run `bash scripts/encode-clips.sh` once the owner relay is done, then `npm run images -- koji`.
- [ ] **Step 5: Run `npx vitest run && npm run test:e2e && npm run check`.** Expected: PASS.
- [ ] **Step 6: VISUAL REVIEW.** Scrub the flight slowly in a real browser and confirm no seam pops. Owner sign-off.
- [ ] **Step 7: Commit:** `feat(koji): scroll-scrubbed food flight`

### Task 18: KŌJI docs, final checks and production deploy

**Files:**
- Create: `koji/DESIGN.md`, `koji/PROMPT.md`
- Delete: `src/app/(index)/deps-smoke.tsx` and its e2e assertion
- Modify: `docs/superpowers/plans/DEPLOY.md`

- [ ] **Step 1: Write `DESIGN.md` and `PROMPT.md`** with the same sections as Task 9, plus:
  - the WebGPU dish material recipe;
  - the flight config and Veo relay method;
  - credit to `oso95/scroll-world` for the scrub engine.

  `PROMPT.md` notes that the flight needs the visitor to generate their own clips, and links `docs/image-prompts/koji-clips.md`'s method.
- [ ] **Step 2: Run `bash scripts/copy-unit-check.sh koji`.** Expected: exit 0.
- [ ] **Step 3: Remove the deps smoke component.** Then run `npx vitest run && npm run check && npm run test:e2e`. Expected: PASS.
- [ ] **Step 4: Run Lighthouse mobile** on all three templates: `npx lighthouse <url> --preset=perf --form-factor=mobile --quiet --output=json`. Record the scores in `DEPLOY.md`. Investigate anything under 70 performance before shipping.
- [ ] **Step 5: Deploy.** Run `npx vercel deploy --prod --yes`. `/`, `/orrery`, `/cairn` and `/koji` all return 200.
- [ ] **Step 6: Commit:** `feat(koji): design docs; ship all three templates`
