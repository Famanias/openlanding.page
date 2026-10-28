# AMAOTO — UI, Navigation & Responsiveness Audit & Implementation Plan

> **Target audience:** Implementation Agent\
> **Scope:** `src/app/(amaoto)/amaoto/**`, `tests/e2e/amaoto*.ts`, `docs/amaoto-*.md`\
> **Visual & metric evidence:** `.openlanding-page/amaoto-ux-audit/` (`report.json` + 50 viewport/rest captures)

---

## 1. Mission & Non-Negotiable Contracts

You are tasked with fixing verified UI, navigation, and responsiveness defects in the **AMAOTO** template (`/amaoto`) while preserving all existing architectural, brand, and test contracts.

### Do NOT Break or Alter
1. **Brand & Palette (`scripts/check-palette.ts`):** Retain only hues derived from sumi `#1A1613`, washi `#F4ECDD`, sakura `#F2B8C6`, deep sakura `#D9748F`, vermilion `#C8412B`, bamboo gold `#B8923A`, and indigo `#2B3A55`.
2. **Typography (`src/app/(amaoto)/layout.tsx`):** Keep `Shippori Mincho`, `Zen Kaku Gothic New`, and `DM Mono`.
3. **Copy & Domain Data (`scripts/generate-copy-bundles.ts`):** Keep all headlines, six part descriptions (`data/parts.ts`), ten making steps (`data/steps.ts`), four colourways (`data/colourways.ts`), and commission facts (`sections/Commission.tsx`).
4. **Authoritative Story Progress & E2E Hooks (`logic/chapters.ts`, `scene/scroll.ts`, `tests/e2e/amaoto*.ts`):**
   - Chapter ranges `0–.14`, `.14–.33`, `.33–.58`, `.58–.78`, `.78–.93`, `.93–1` and seven rests `[0, .18, .45, .66, .72, .86, 1]`.
   - Fragment aliases `#top`, `#structure`, `#light`, `#canopy`, `#making`, `#commission`.
   - Test hooks and DOM attributes: `window.__amaotoScrollTo`, `data-world-mode`, `data-active-chapter`, `data-sub-rest`, `data-inspect-phase`, `data-tool`, `data-stage-rect`, `data-camera-settled`, `data-open`, `data-colour`, `data-transmission`, and all existing `aria-label` strings asserted in `tests/e2e/amaoto*.spec.ts`.
5. **Template Isolation (`scripts/check-isolation.ts`):** All imports must remain self-contained inside `src/app/(amaoto)/`.

---

## 2. Verified Diagnostic Findings

Automated Playwright geometry and computed-style inspection across six viewports (`375×667`, `390×844`, `844×390`, `768×1024`, `1024×768`, `1440×900`) plus static reduced-motion mode exposed the following concrete issues:

| ID | Category | Severity | Summary of Defect | Where in Code |
| :--- | :--- | :--- | :--- | :--- |
| **R-01** | Responsiveness / Brand | **P0 Critical** | **Brand logo completely disappears (`0×0` px) on all phones (`≤600px`).** `.am-logo > span` hides both `<Hanko />` (`span.am-hanko`) and the wordmark `<span>AMAOTO</span>`. | `amaoto.css:2605-2607`, `brand/Logo.tsx`, `brand/Hanko.tsx` |
| **R-02** | Responsiveness | **P0 Critical** | **Landscape phones & short viewports (`height ≤ 560px`, e.g. `844×390`) crush all chapter cards to a 24px empty strip.** Fixed vertical deductions (`max-height: calc(50svh - 185px)`) leave `10px` of content height at `390px` viewport height. | `amaoto.css:2403-2413`, `amaoto.css:2608-2628`, `scene/staging.ts:10-27` |
| **R-03** | Responsiveness / Conversion | **P0 Critical** | **Primary CTAs, colourway swatches, and Commission form inputs are clipped inside nested scrollbars on phones (`375×667`, `390×844`) and tablets (`768×1024`, `1024×768`).** Because document touch-scroll drives the 900svh WebGL timeline, nested `overflow-y: auto` on `.am-chapter-copy` traps or hides the hero CTA (`31–144px` clipped), 3rd/4th canopy swatches (`33–170px` clipped), and the entire Commission form (`264–397px` clipped). | `amaoto.css:2120-2127`, `amaoto.css:2408-2413`, `amaoto.css:2505-2510`, `amaoto.css:2554-2559`, `amaoto.css:2608-2628` |
| **U-01** | UI / Layout Collision | **P0 Critical** | **Desktop & laptop (`1024×768`, `1440×900`) Chapter 02 `.am-inspector-navigation` collides with `.am-journey-nav`.** `WagasaCanvas.tsx` places `[data-inspector-navigation]` at `r.bottom + 4px` (`688px` at `1440×900`, `588px` at `1024×768`), extending `14–46px` into the bottom `.am-journey-nav` bar and obscuring `"Choose any part to look closer"` / `"Back to overview"`. | `scene/staging.ts:21-26`, `scene/WagasaCanvas.tsx:628-641`, `amaoto.css:1366-1432` |
| **U-02** | UI / Layout Collision | **P0 Critical** | **Chapter 05 (`.am-making-strip`) collides with `.am-enter-tool` on mobile/tablet and touches `.am-journey-nav` on desktop.** At `375×667`, `390×844`, `844×390`, and `768×1024`, `.am-enter-tool` (`bottom: 160px`) overlaps `.am-making-strip` (`bottom: 80px`, height `~82px`); at `1024×768` and `1440×900`, `.am-making-strip` (`bottom: 86px`) overlaps `.am-journey-nav`. | `amaoto.css:2247-2282`, `amaoto.css:2462-2479` |
| **N-01** | Navigation & Wayfinding | **P1 High** | **Rest 5 (`0.72` Street Gust) is invisible in `.am-jump-list`, and number buttons `01–06` lack chapter title tooltips/labels.** Prev/Next steps through 7 rests while the jump bar shows 6 numbers (`01–06`), causing two consecutive steps to stay on `04` with only a tiny `7.2px` `/ touch the rain` suffix. | `scene/AmaotoShell.tsx:351-399`, `amaoto.css:2197-2227` |
| **N-02** | Navigation & Touch Targets | **P1 High** | **11–16 interactive controls per screen fail the 44×44px minimum touch target size, and micro-labels drop to `7.2px–9.6px`.** Jump buttons are `22×31px`, Dusk/Day buttons are `14×26px`, Prev/Next arrows are `26×42px`, and mobile mono labels use `0.45rem–0.53rem` (`7.2px–8.5px`). | `amaoto.css:1994-2024`, `amaoto.css:2172-2227`, `amaoto.css:2377-2395`, `amaoto.css:2439-2461` |
| **N-03** | Navigation / Modal Ownership | **P1 High** | **When a tool sheet (`anatomy` or `making`) is engaged, bottom `.am-journey-nav` remains visually active and overlaps desktop sheets; clicking outside the sheet on backdrop does not dismiss.** Furthermore, Chapter 02 shows two identical `"Bamboo / paper / thread"` labels stacked in `.am-tool-sheet`. | `scene/AmaotoShell.tsx:439-562`, `scene/AnatomyControls.tsx:85-87`, `amaoto.css:2283-2361` |
| **N-04** | Navigation (Static Mode) | **P2 Medium** | **Static / reduced-motion mode (`7,459px` tall page) has no chapter navigation links in `.am-header` and hides the brand logo on phones.** CSS has `.am-header nav` rules (`amaoto.css:49-74`), but `AmaotoShell.tsx` never renders `<nav>` inside `.am-header`. | `scene/AmaotoShell.tsx:236-273`, `amaoto.css:49-74`, `amaoto.css:1178-1180` |
| **U-03** | UI / Dead Code & CSS Debt | **P2 Medium** | **Unused components, dead selectors, and 4 competing responsive override blocks in `amaoto.css`.** `ThreadLine.tsx` is dead code; `.am-mobile-band`, `.am-footer__drip`, `.am-runner-control`, `.am-spec`, `.am-rule`, `.am-part-callout`, `[data-pinned="true"]`, `[data-making-pinned="true"]`, `[data-hidden="true"]` are orphaned from earlier iterations. | `ui/ThreadLine.tsx`, `amaoto.css` |

---

## 3. Step-by-Step Implementation Course of Action

Execute the following tasks in order. After each task, run the relevant unit/e2e tests before proceeding.

---

### Task 1 (P0): Restore Brand Logo on Mobile (`R-01`)

#### Root Cause
In `src/app/(amaoto)/amaoto/brand/Logo.tsx`:
```tsx
export function Logo() {
  return (
    <a className="am-logo" href="#top" aria-label="AMAOTO home">
      <Hanko />
      <span>AMAOTO</span>
    </a>
  );
}
```
Because `<Hanko />` renders `<span className="am-hanko">雨音</span>`, both children of `.am-logo` are `<span>` elements. The rule at `amaoto.css:2605-2607`:
```css
@media (max-width: 600px) {
  .am-logo > span {
    display: none;
  }
```
hides **both** the `<Hanko />` seal and the wordmark, collapsing `.am-logo` to `0×0` on all phones (`≤600px`).

#### Required Changes
1. In `src/app/(amaoto)/amaoto/brand/Logo.tsx`, give the wordmark an explicit class or element distinction (or target `:not(.am-hanko)` in CSS):
   ```tsx
   import { Hanko } from "./Hanko";
   export function Logo() {
     return (
       <a className="am-logo" href="#top" aria-label="AMAOTO home">
         <Hanko />
         <span className="am-logo__wordmark">AMAOTO</span>
       </a>
     );
   }
   ```
2. In `src/app/(amaoto)/amaoto/amaoto.css` (around line 2605), replace `.am-logo > span { display: none; }` with:
   ```css
   @media (max-width: 600px) {
     .am-logo__wordmark {
       display: none;
     }
     .am-header .am-logo {
       flex: none;
       min-width: 36px;
       min-height: 36px;
     }
   ```
   This preserves the red `雨音` hanko seal (`28×28px` visual inside a `≥36×36px` tap target) as the home anchor on compact phones while saving horizontal space for the time-of-day and sound controls.

---

### Task 2 (P0): Fix Desktop & Laptop Overlay Collisions in Chapters 02, 05 & 06 (`U-01`, `U-02`)

#### Root Cause
1. **Chapter 02 (`Structure` / `Anatomy`):**
   - `staging.ts:21-26` sets the desktop Chapter 02 virtual stage slot to `top: height * 0.11`, `height: height * 0.65` (`bottom = 0.76 * height`).
   - `WagasaCanvas.tsx:636-641` positions `[data-inspector-navigation]` at `top: ${r.bottom + 4}px`.
   - Because `.am-inspector-navigation` is `~150px` tall (two rows of parts + footer) and `.am-journey-nav` occupies the bottom `~76px` (`bottom: 20px` + `56px` height), `0.76 * height + 154px` exceeds `height - 76px` on both `1024×768` (`738px > 692px`) and `1440×900` (`838px > 824px`).
2. **Chapter 05 (`Craft` / `Making`):**
   - `.am-making-strip` (`bottom: 86px` desktop, `bottom: 80px` mobile) is `~82px` tall (`top ≈ height - 168px`).
   - On desktop (`1024×768`, `1440×900`), `.am-journey-nav` extends up to `~80px` from the bottom and its border/padding touches or overlaps `.am-making-strip`.
   - On mobile/tablet (`≤900px`), `.am-page[data-active-chapter="4"] .am-enter-tool` is placed at `bottom: 160px`, colliding directly with `.am-making-strip` (`bottom: 80px`, top edge at `~162px` from bottom).
3. **Chapter 06 (`Commission`) on `1440×900`:**
   - `.am-commission .am-chapter-copy` has `max-height: calc(100svh - 190px)` and is vertically centered in a grid container whose bottom padding is `120px`, allowing the bottom of `.am-chapter-copy` (`y = 824px`) to touch `.am-journey-nav` (`y = 824px`).

#### Required Changes
1. **Reserve safe bottom clearance in `src/app/(amaoto)/amaoto/scene/staging.ts`:**
   - For desktop (`width > 900`) at `index === 1` (Chapter 02), reduce the stage slot height or top so `r.bottom` leaves room for both `.am-inspector-navigation` (`~148px`) and `.am-journey-nav` (`~84px`):
     ```ts
     if (index === 1) {
       const navAllowance = 236; // inspector-navigation (~148px) + journey-nav (~84px) + gap
       const top = Math.round(height * 0.09);
       return {
         left: 0,
         top,
         width: width * 0.56,
         height: Math.max(240, Math.min(height * 0.6, height - top - navAllowance)),
       };
     }
     ```
   - Update `src/app/(amaoto)/amaoto/scene/staging.test.ts` if any snapshot/assertion hardcodes `0.65` for chapter 1.
2. **Clamp `[data-inspector-navigation]` in `src/app/(amaoto)/amaoto/scene/WagasaCanvas.tsx` (lines 636–641):**
   - Measure `nav.offsetHeight` and clamp `top` so it never intrudes into `.am-journey-nav`:
     ```ts
     if (nav) {
       const journeyNav = document.querySelector<HTMLElement>(".am-journey-nav");
       const maxBottom = journeyNav
         ? journeyNav.getBoundingClientRect().top - 10
         : innerHeight - 88;
       const navTop = Math.min(r.bottom + 4, Math.max(r.top, maxBottom - nav.offsetHeight));
       Object.assign(nav.style, {
         left: `${r.left + 16}px`,
         top: `${navTop}px`,
         width: `${r.width - 32}px`,
       });
     }
     ```
3. **Eliminate `.am-making-strip`, `.am-enter-tool`, and `.am-journey-nav` collisions in `src/app/(amaoto)/amaoto/amaoto.css`:**
   - Define shared layout tokens on `.am-page`:
     ```css
     --am-header-h: 68px;
     --am-journey-nav-h: 64px;
     --am-making-strip-h: 72px;
     ```
   - Position `.am-making-strip` cleanly above `.am-journey-nav`:
     - Desktop (`>900px`): `bottom: 92px;`
     - Mobile/tablet (`≤900px`): `bottom: 78px; padding: 8px 10px;`
   - Position `.am-page[data-active-chapter="4"] .am-enter-tool` cleanly above `.am-making-strip`:
     - Desktop (`>900px`): `bottom: 184px;`
     - Mobile/tablet (`≤900px`): `bottom: 168px;` (and enforce `.am-making-strip` `max-height: 76px; box-sizing: border-box;` so `78 + 76 = 154px < 168px`).
   - Ensure `.am-page[data-world-mode="cinematic"] .am-commission .am-chapter-copy` on desktop (`>900px`) respects the header and bottom nav:
     ```css
     .am-page[data-world-mode="cinematic"] > .am-commission {
       padding-top: 84px;
       padding-bottom: 96px;
     }
     .am-page[data-world-mode="cinematic"] .am-commission .am-chapter-copy {
       max-height: calc(100svh - 196px);
     }
     ```

---

### Task 3 (P0): Fix Mobile & Short-Viewport Card Clipping and Landscape Collapse (`R-02`, `R-03`)

#### Root Cause
1. **Portrait Phones (`375×667`, `390×844`) & Portrait Tablets (`768×1024`):**
   - At `≤600px`, `.am-section` has `padding-top: calc(36svh + 100px)` and `.am-chapter-copy` has `max-height: calc(64svh - 255px)`.
   - On `375×667`, `64% of 667 - 255 = 171px`! Inside `171px`, the Hero has kicker + `56px` kanji `<h1>` + `2 lines` of `<em>` + `2 lines` of body copy + `Reserve a commission` button (`315px` total content height -> `144px` clipped).
   - In Chapter 04 (`Canopy`), `171px` cuts off the 4 colourway swatches (`170px` clipped on `375×667`, `49px` clipped on `390×844`, `48px` clipped on `768×1024`).
   - In Chapter 06 (`Commission`), `max-height: calc(62svh - 170px)` gives `243px` on `375×667` and `353px` on `390×844`, cutting off the entire form (`264–397px` clipped).
2. **Landscape Phones & Short Viewports (`max-height: 560px`, e.g. `844×390`):**
   - Because `844px` is `≤900px`, it enters the stacked mobile layout (`padding-top: calc(50svh + 78px)` = `273px`, `max-height: calc(50svh - 185px)` = `10px`!). Every chapter card collapses into an unreadable `24px` dark bar.

#### Required Changes
1. **Compact mobile typography & spacing so Chapters 01, 03, 04, and 05 fit without internal scrollbars on `375×667` and `390×844`:**
   - In `amaoto.css` under `@media (max-width: 600px)`:
     - Reduce top stage reserve slightly on compact phones or tighten the gap between the upper stage slot and `.am-chapter-copy`:
       ```css
       @media (max-width: 600px) {
         .am-page[data-world-mode="cinematic"] > .am-section,
         .am-page[data-world-mode="cinematic"] .am-making-frame {
           padding: calc(32svh + 72px) 16px 76px;
         }
         .am-page[data-world-mode="cinematic"] .am-chapter-copy {
           max-height: calc(68svh - 156px);
           padding: 14px 16px;
         }
         .am-page[data-world-mode="cinematic"] h1 {
           font-size: clamp(2.5rem, 9.5vw, 3.4rem);
           margin: 6px 0;
         }
         .am-page[data-world-mode="cinematic"] h1 em {
           font-size: clamp(1rem, 4vw, 1.2rem);
           margin-top: 6px;
         }
         .am-page[data-world-mode="cinematic"] h2 {
           font-size: clamp(1.65rem, 6.2vw, 2.2rem);
           margin: 6px 0 8px;
         }
         .am-page[data-world-mode="cinematic"] .am-chapter-copy > p {
           font-size: 0.875rem;
           line-height: 1.45;
         }
         .am-page[data-world-mode="cinematic"] .am-hero .am-button {
           margin-top: 12px;
           padding: 11px 14px;
           min-height: 44px;
         }
       ```
     - In Chapter 04 (`Canopy`) on `≤900px`, keep `.am-swatches` in a compact 2×2 grid with `margin-top: 10px;` and `padding: 8px 6px; min-height: 44px;` so all 4 colourways are 100% visible without scrolling at `375×667`, `390×844`, and `768×1024`.
     - In Chapter 06 (`Commission`) on `≤900px`:
       - `staging.ts:17` already shrinks the Chapter 06 stage slot to `height * 0.3`. Match the CSS padding to that slot:
         ```css
         .am-page[data-world-mode="cinematic"][data-active-chapter="5"] > .am-commission {
           padding-top: calc(22svh + 64px);
         }
         .am-page[data-world-mode="cinematic"][data-active-chapter="5"] .am-commission .am-chapter-copy {
           max-height: calc(78svh - 144px);
         }
         ```
       - Compact the Commission `<dl>` (`margin: 10px 0 12px; padding-top: 10px;`) and `.am-form` (`gap: 10px;`, `.am-form label { padding-top: 8px; }`, `.am-button { margin-top: 12px; }`) so the Name, Email, Occasion fields and submit button are visible and immediately operable.
2. **Add a dedicated Short-Viewport / Landscape Mobile breakpoint (`@media (max-height: 560px) and (min-width: 560px)`):**
   - Both in `staging.ts` (`worldStageRect`) and `amaoto.css`, treat landscape viewports (`width > height * 1.2 && height <= 560`) as **side-by-side two-column layouts** rather than vertical stacked bands:
     - In `staging.ts` (`worldStageRect`):
       ```ts
       const stacked = width <= 900 && !(width > height * 1.15 && height <= 560);
       if (stacked) {
         ...
       }
       ```
     - In `amaoto.css`:
       ```css
       @media (max-width: 900px) and (max-height: 560px) and (orientation: landscape) {
         .am-page[data-world-mode="cinematic"] > .am-section,
         .am-page[data-world-mode="cinematic"] .am-making-frame {
           display: grid;
           grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
           column-gap: 24px;
           align-items: center;
           padding: 64px 24px 68px;
         }
         .am-page[data-world-mode="cinematic"] .am-chapter-copy {
           max-height: calc(100svh - 136px);
           padding: 14px 16px;
         }
         .am-tool-sheet {
           top: 64px;
           bottom: 68px;
           left: auto;
           right: 16px;
           width: min(46vw, 380px);
           max-height: none;
         }
       }
       ```
3. **Visual scroll-affordance when any `.am-chapter-copy` or `.am-tool-sheet` overflows:**
   - Add a subtle bottom fade/border cue or custom scrollbar thumb (`scrollbar-color: var(--am-gold) transparent`) so if a user is on an ultra-small screen where Commission still scrolls, the scrollability is unmistakable.

---

### Task 4 (P1): Upgrade Navigation, Wayfinding & Touch Ergonomics (`N-01`, `N-02`, `N-03`, `N-04`)

#### Required Changes
1. **Enforce ≥44×44px Hit Areas & Legible Type Floor (`≥11px`) across Header & Journey Nav (`N-02`):**
   - **Header (`.am-header`, `.am-time`, `.am-sound`):**
     - Give `Dusk` and `Day` buttons (`amaoto.css:2017-2024`) `min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 0 6px; font-size: max(0.68rem, 11px);`.
     - Give `.am-time input[type="range"]` `min-height: 44px;` so touch dragging is effortless.
     - Give `.am-sound` `min-height: 44px; padding: 0 8px; font-size: max(0.68rem, 11px);`.
   - **Journey Nav (`.am-journey-nav`, `.am-jump-list`):**
     - Give Prev/Next buttons (`.am-journey-nav > button`) `min-width: 44px; min-height: 44px; display: inline-grid; place-items: center;`.
     - Give each `.am-jump-list button` `min-width: 36px; min-height: 44px; padding: 0 8px; font-size: max(0.68rem, 11px); display: inline-flex; align-items: center; justify-content: center;` (on screens `≥768px`, use `min-width: 44px;`).
     - Raise `.am-chapter-marker` font size floor to `max(0.68rem, 11px)` and `.am-chapter-marker small` to `max(0.62rem, 10.5px)` with `opacity: 0.82` for WCAG AA contrast.
2. **Surface Chapter Titles & Sub-Rest (`0.72` Street Gust) in `.am-journey-nav` (`N-01`):**
   - In `src/app/(amaoto)/amaoto/scene/AmaotoShell.tsx` (lines 372–387):
     - Add `title={c.title}` to each `.am-jump-list` button (keep `aria-label={\`Jump to ${c.title}\`}` unchanged for e2e tests).
     - When `chapter === 3` (Weather), render a subtle secondary dot/pip on button `04` (`data-sub-rest={story.subRest ?? "none"}`) so the user can see that Chapter 04 has two stops (`Dusk street` at `0.66` and `Touch the rain` at `0.72`).
3. **Clean Up Tool Sheet Ownership & Duplicate Header in Chapter 02 (`N-03`):**
   - In `AmaotoShell.tsx:453-459` and `AnatomyControls.tsx:85-87`, when `panelTool === "anatomy"` and `state.part === null`, both the `<aside className="am-tool-sheet"><header><span>Bamboo / paper / thread</span>` and `<span className="am-inspector-material">Bamboo / paper / thread</span>` render the exact same string twice in a row.
     - Change `.am-tool-sheet > header > span` for `anatomy` to `"02 / Structure"` (matching `"03 / Paper"` and `"05 / Craft"` context) while keeping `"Bamboo / paper / thread"` as `.am-inspector-material`.
   - When `tool !== null` (explicitly engaged modal state: `data-tool="anatomy" | "light" | "making"`), dim and disable pointer interaction on `.am-chapter-copy` and prevent `.am-tool-sheet` from colliding with `.am-journey-nav` (`bottom: 96px` on desktop, `bottom: 76px` on mobile).
4. **Add Chapter Navigation Links in Static / Reduced-Motion Mode (`N-04`):**
   - In `AmaotoShell.tsx`, render `<nav aria-label="Section links">` inside `.am-header` **only when `!cinematic`** (`mode === "static"`):
     ```tsx
     {!cinematic && (
       <nav aria-label="Story sections">
         {WORLD_CHAPTERS.map((c) => (
           <a key={c.id} href={`#${c.id}`}>
             {c.title}
           </a>
         ))}
       </nav>
     )}
     ```
   - This activates the existing `.am-header nav` styles (`amaoto.css:49-74`) for static/reduced-motion/no-JS readers without crowding the cinematic header.

---

### Task 5 (P2): Consolidate `amaoto.css` & Remove Dead Code (`U-03`)

#### Required Changes
1. **Remove unused file:** Delete `src/app/(amaoto)/amaoto/ui/ThreadLine.tsx` (verify with grep that nothing imports it).
2. **Remove dead CSS blocks in `src/app/(amaoto)/amaoto/amaoto.css`:**
   - Remove `.am-threadline` and all `.am-threadline > *` rules (lines 109–115, 1008–1044, 1306–1310).
   - Remove `.am-mobile-band` rules (lines 1200–1215, 1647–1649, 1768–1770, 1803–1810, 2366–2368) — no element has class `am-mobile-band`.
   - Remove `.am-making-sequence[data-pinned="true"]` and `.am-page[data-making-pinned="true"]` rules (lines 1698–1799, 1921–1934, 1983–1988) — `data-pinned` and `data-making-pinned` are never set anywhere in TS/TSX.
   - Remove `.am-footer__drip`, `.am-runner-control`, `.am-spec`, `.am-rule`, and `.am-part-callout` (note: `PartCallout.tsx` uses `.am-parts.am-inspector-parts`, not `.am-part-callout`, which is why `.am-sheet-parts .am-part-callout` at line 2496 was a dead selector!).
3. **Fix `.am-sheet-parts` selector bug (`amaoto.css:2496-2499`):**
   - Line 2496 wrote `.am-sheet-parts .am-part-callout { display: grid; grid-template-columns: repeat(3, 1fr); }`, which never matched `PartCallout.tsx` (`<div className="am-parts am-inspector-parts">`), forcing a duplicate rule at line 2633 (`.am-sheet-parts .am-parts`). Keep only `.am-sheet-parts .am-parts` and ensure buttons inside `.am-sheet-parts .am-parts` have `min-height: 44px; padding: 8px 6px;`.

---

## 4. Verification Protocol for the Implementation Agent

Before claiming completion, you **must** run every command below from `E:\orca\workspaces\webflow-projects\codex-session-1028-418` and confirm zero errors:

1. **Unit & Pure Logic Tests:**
   ```powershell
   ..\node_modules\.bin\vitest.cmd run "src/app/(amaoto)/amaoto"
   ```
2. **Typecheck & Lint:**
   ```powershell
   ..\node_modules\.bin\tsc.cmd --noEmit
   ..\node_modules\.bin\eslint.cmd "src/app/(amaoto)/amaoto" tests/e2e/amaoto*.ts
   ```
3. **Repo Guard Scripts (Isolation, Palette, Media, Copy Bundles):**
   ```powershell
   ..\node_modules\.bin\tsx.cmd scripts/check-isolation.ts
   ..\node_modules\.bin\tsx.cmd scripts/check-palette.ts
   ..\node_modules\.bin\tsx.cmd scripts/check-media.ts
   ..\node_modules\.bin\tsx.cmd scripts/generate-copy-bundles.ts
   ```
4. **Playwright E2E Suite (existing + responsive/collision assertions):**
   ```powershell
   node node_modules/playwright/cli.js test tests/e2e/amaoto.spec.ts tests/e2e/amaoto-anatomy.spec.ts tests/e2e/amaoto-making.spec.ts tests/e2e/amaoto-hero-framing.spec.ts --workers=1 --trace=off
   ```
5. **Visual & Geometry Audit Re-run:**
   Run `.openlanding-page/amaoto-ux-audit/capture.cjs` against the local server and verify in `report.json` that across all 6 viewports (`375×667`, `390×844`, `844×390`, `768×1024`, `1024×768`, `1440×900`):
   - `logo: true` at every viewport (including `375×667` and `390×844`).
   - `overlaps` contains no UI collisions (`nav×inspectorNav`, `enterTool×strip`, `nav×strip`, `nav×copy`, `copy×strip` are all `[]`).
   - `copyClipped === 0` at rests `0`, `0.18`, `0.45`, `0.66`, `0.72`, `0.86` across all viewports, and the Commission form at rest `1` is operable without hidden fields on standard phones/tablets/desktops.
   - `hOverflow === 0` at every viewport in both cinematic and static modes.
