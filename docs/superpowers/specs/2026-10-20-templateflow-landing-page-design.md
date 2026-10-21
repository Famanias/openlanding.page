# Design Specification: openlandingpage Landing Page

- **Date:** 2026-10-20
- **Status:** Approved / In Review
- **Target URL:** `/` (Root route of `https://openlandingpage.vercel.app`)
- **Document Scope:** Complete visual, product, and architectural specification for the openlandingpage landing page gallery.

---

## 1. Intent & The Why

### 1.1 Purpose & Problem Statement
openlandingpage is a gallery of production-grade landing page templates designed specifically to be copied into AI coding agents (such as Claude Code, Cursor, Windsurf, and Codex). 

Currently, developers and designers face two extremes:
1. **Generic AI boilerplate / template stores:** Low-effort, cookie-cutter templates with purple gradients, generic illustrations, and messy code that require heavy re-engineering.
2. **Inaccessible design inspiration galleries:** Sites like Awwwards showcase extraordinary web craft, but visitors cannot easily extract the underlying engineering, mathematical physics, or architectural prompts into their own development environments.

openlandingpage bridges this chasm by pairing **award-grade web craft** (WebGPU 3D, scroll-scrubbed video, GSAP Observer keynotes) with **1-click AI agent export**:
- **"Copy prompt":** Copies a mathematically rigorous design specification (`PROMPT.md`) containing exact palettes, typography ratios, animation curves, and negative constraints for an AI agent to recreate or adapt.
- **"Copy website":** Copies the complete, multi-file production source bundle wrapped in a machine-readable format for an AI agent to unpack and run immediately.

### 1.2 User Conversion Target
**The 60-Second Conversion Goal:** A visitor lands, browses, evaluates a template's preview and stack, and copies either a prompt or full source bundle to their clipboard within 60 seconds.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
- **Curatorial Frame:** The gallery shell acts as a neutral, high-end frame that lets the vivid visual identities of the showcased templates stand out without chromatic or typographic competition.
- **Zero-Friction Copy:** Copying prompts or complete source bundles is 1-click, instantaneous, and provides clear sensory confirmation (visual `✓ Copied` state + screen reader announcement).
- **Scalable Taxonomy:** Architect data and filter models for 30+ templates while presenting a satisfying, zero-empty-state experience for the initial 3 seed templates.
- **Strict Isolation:** Enforce absolute separation between the gallery shell in `src/app/(index)/` and the template directories in `src/app/(${slug})/`.
- **Top-Tier Performance:** Mobile Lighthouse performance score of 95+, strict AVIF/WebP image optimization, eager loading only for the first card, and lazy loading for hover previews.
- **Accessible & Responsive:** 100% responsive down to 375px with zero horizontal overflow, visible focus indicators, WCAG AA contrast, and full keyboard navigation.

### 2.2 Non-Goals
- **User Authentication / Accounts:** openlandingpage is an open curatorial utility. No login, sign-up, or user accounts.
- **Template Submission Form (v1):** The "Submit" navigation link acts as an external placeholder (e.g. GitHub issue/PR or mailto).
- **In-Browser Code Editing:** openlandingpage provides raw copy-to-clipboard functionality; it is not a web-based IDE or playground.
- **Template Purchasing / Payments:** All seed templates are open inspiration; no paywalls or checkout flows.

### 2.3 Anti-Goals (What would make this a failure)
- **Generic "AI Landing Page" Tropes:** No purple-to-indigo gradients, floating robot/brain graphics, glassmorphism cards with heavy drop shadows, or marketing buzzword soup.
- **Scroll-Jacking on the Gallery:** Smooth scrolling is only used for anchor links; the native scroll behavior of the browser must remain unhindered.
- **Palette Collisions:** The gallery chrome must never use accent colors that clash with or mimic the showcased templates (e.g. KŌJI's Vermilion `#C8331F`, Orrery's Ultramarine `#2F3BFF`, or Cairn's Glacier Navy `#0F1E33`).
- **Bloated JavaScript Bundles:** Inlining full source code of 30+ templates into client bundles would bloat JS payloads. Source bundles must remain static external assets.

---

## 3. Brand Identity & Design System

### 3.1 Design Philosophy: "The Gallery is the Frame"
The templates are loud, expressive, and visually divergent. openlandingpage's own chrome remains calm, restrained, and editorial—combining the speed and utility of **motionsites.ai** with the editorial dignity and typography of **Awwwards**.

### 3.2 Brand Wordmark & Typographic System
- **Brand Wordmark:** `openlandingpage` (all-lowercase, bold neo-grotesk with `-0.03em` tracking). Accompanied by a minimalist favicon and glyph.
- **Display & Body Font:** `Geist` (clean neo-grotesk neutrality).
- **Metadata & Technical Font:** `Geist Mono` (tabular numbers, stack metadata, tags, and copy feedback).

### 3.3 Palette & Neutral Chrome
- **Surface Canvas (Dark Mode Default):** Deep Carbon `#0C0D0E` (Light mode: `#F9F9F8`).
- **Card & Container Background:** `#141518` (Light mode: `#FFFFFF`).
- **Hairline Archival Borders:** `rgba(255, 255, 255, 0.08)` in dark mode / `rgba(0, 0, 0, 0.08)` in light mode. Every card preview container has a 1px border acting as a matting frame.
- **Curatorial Micro-Signal (Single Functional Accent):** **Curatorial Emerald (`#10B981`)**. 
  - Strictly reserved for:
    1. The `✓ Copied` feedback state pill.
    2. Active status / live indicator micro-dots.
  - Primary interactive buttons and focus states use high-contrast **monochrome inversion** (solid white on black, or solid black on white with 2px offset focus rings).

---

## 4. Page Architecture & Section Layout

```
+-------------------------------------------------------------------------+
| [Header] openlandingpage                  [Gallery] [How it works] [GitHub]|
+-------------------------------------------------------------------------+
| [Hero]                                                                  |
|   [Issue #01 · 3 Bespoke Drops]                                         |
|   Award-grade landing pages your *AI agent* can build.                  |
|   Browse production web designs. Copy the architectural prompt or source|
|   [Explore Templates ↓]                                                 |
+-------------------------------------------------------------------------+
| [Filter Bar]                                                            |
|   [All (3)]  [Keynote & Deck (1)]  [Scroll Showcase (1)]  [3D & WebGPU (1)] |
|   Showing 3 of 3 templates                                              |
+-------------------------------------------------------------------------+
| [Gallery Grid] (3 columns desktop / 2 tablet / 1 mobile)                 |
|   +-----------------------+ +-----------------------+ +-----------------+
|   | [Preview Image/Video] | | [Preview Image]       | | [Preview Image] |
|   | 16:10 Frame           | | 16:10 Frame           | | 16:10 Frame     |
|   | KŌJI ↗                | | Orrery ↗              | | Cairn ↗         |
|   | Description           | | Description           | | Description     |
|   | 3D · WebGPU · Next.js | | Deck · GSAP · Next.js | | Showcase · GSAP |
|   | [Copy Prompt] [Source]| | [Copy Prompt] [Source]| | [Copy Prompt]   |
|   +-----------------------+ +-----------------------+ +-----------------+
+-------------------------------------------------------------------------+
| [How It Works: Browse → Copy → Paste into Agent]                        |
|   Step 1: Browse & inspect award-grade web designs                      |
|   Step 2: Copy the mathematical prompt brief or complete source         |
|   Step 3: Paste into Claude Code, Cursor, or Windsurf                   |
|   [Interactive Proof-of-Work Prompt Snippet from Orrery & KŌJI]         |
+-------------------------------------------------------------------------+
| [Footer] Short editorial columns + GitHub link + credit notice          |
+-------------------------------------------------------------------------+
```

### 4.1 Header
- **Left:** Wordmark `openlandingpage` linking to `/`.
- **Right:** Nav links (`Gallery`, `How it works`), external GitHub repository icon link, and a theme toggle (Dark/Light).
- **Mobile:** Collapses into a minimal header with theme toggle and external link.

### 4.2 Hero Section
- **Fresh Drops Label:** Monospace badge: `Issue #01 · 3 Bespoke Drops` with a subtle pulsing emerald micro-dot.
- **Headline:** *"Award-grade landing pages your AI agent can build."* (with *AI agent* in subtle editorial italics).
- **Supporting Copy:** *"Skip the generic templates. Browse hand-crafted, production-ready web designs with mathematical design briefs and complete source bundles ready for your agent."*
- **Primary Action:** `[Explore Templates ↓]` which performs a smooth scroll to `#gallery`.
- **Desktop Viewport Requirement:** The top row of template cards must peek into the initial viewport fold on standard 1080p desktop displays to establish immediate visual discovery.

### 4.3 Filter Bar (Cold Start → 30+ Scalability)
- **Phase 1 (Initial 3 Seed Templates):** 
  - Horizontal chip row:
    - `All (3)`
    - `Keynote & Deck (1)`
    - `Scroll Showcase (1)`
    - `3D & WebGPU (1)`
  - Dynamic result counter: `Showing X of 3 templates`.
  - `Reset filters` button (appears when non-default filter active).
- **Phase 2 Ready (Underlying Data Schema):**
  - Schema defines `theme`, `industry`, `stack`, and `tags` for every template.
  - Dropdown controls (`Industry`, `Technology`) are architected in data and will unlock once catalog reaches 10+ items.

### 4.4 Gallery Grid & Template Cards
- **Grid Layout:** 3 columns on desktop (`lg:grid-cols-3`), 2 columns on tablet (`md:grid-cols-2`), 1 column on mobile (`grid-cols-1`) with gap-6.
- **Card Preview Container:**
  - Standardized **16:10 aspect ratio** (`aspect-[16/10]`) with `overflow-hidden` and 1px hairline border.
  - Cairn and Orrery fit natively; KŌJI's square poster uses centered `object-cover`.
  - **KŌJI Hover Preview:** For KŌJI only, on hover or focus (when `prefers-reduced-motion: no-preference`), a muted, looped `<video src="/templates/koji/clips/dive-2-m.mp4" />` crossfades in smoothly over 200ms. On mobile/touch devices, the video is not triggered.
- **Card Metadata & Actions:**
  - **Thumbnail & Title Link:** Clicking the preview image or title navigates to the live template (opens in new tab with `rel="noopener noreferrer"`).
  - **Title & Description:** Bold template title, one-line editorial description.
  - **Mono Metadata Row:** `theme · stack` (e.g. `Presentation · Next.js · GSAP`), plus small badge (`3D`, `WebGPU`, `Scroll video`).
  - **Persistent Utility Buttons:**
    - Primary: `[Copy Prompt]` (solid monochrome pill button, clipboard icon).
    - Secondary: `[Copy Website]` (hairline outline button, code icon).
    - Both buttons transition inline to `✓ Copied` (in `#10B981`) for 2 seconds with `aria-live="polite"` feedback for screen readers.

### 4.5 "How It Works" Section
- 3-column or step-based layout:
  1. **Browse:** Find complete, bespoke designs engineered with custom shaders, physics, and typography.
  2. **Copy:** Grab the architectural brief (`PROMPT.md`) or the full multi-file source bundle.
  3. **Build:** Paste into Claude Code, Cursor, or Windsurf to recreate or customize the site instantly.
- **Proof-of-Work Code Window:**
  - Display an authentic snippet of Orrery's strict design constraints (demonstrating why openlandingpage prompts produce elite output):
    ```markdown
    ## Brand Rules
    - Palette: ink #0E0F13, bone #F2EFE8, ultramarine #2F3BFF, amber #FFB000.
    - Never introduce other hues, gradients, glows, purple, robots, or brain imagery.
    ## Keynote Mechanics
    - Slide transitions: clip-path inset over 700ms cubic-bezier(0.77, 0, 0.175, 1).
    ```

### 4.6 Footer
- Editorial columns: Navigation links (`Gallery`, `How it works`), External resources (`GitHub`), and credit line with copyright notice.

---

## 5. Technical Architecture & Constraints

### 5.1 Next.js 16 & Server Shell Architecture
- **Framework:** Next.js 16 with App Router, Turbopack, and `cacheComponents: true`.
- **Prerendering Strategy:** The gallery page at `/` prerenders statically using `"use cache"`. 
- **Filter State Management:** Managed client-side within `<GalleryShell />`. Synchronizes active filter state to URL query parameters via shallow client replacement (`window.history.replaceState`), ensuring instant 0ms filtering and zero server roundtrips.
- **Component Placement:** All gallery-specific UI components and shadcn primitives reside strictly inside `src/app/(index)/components/`.

### 5.2 Strict Template Isolation Rule
- `src/app/(index)/` must **never import** any file from `src/app/(orrery)/`, `src/app/(cairn)/`, or `src/app/(koji)/`.
- Enforced automatically by `npm run check` via `scripts/check-isolation.ts`.
- Template metadata reaches the gallery exclusively through a static data manifest: `src/app/(index)/data/templates.ts`.

### 5.3 Source Bundling & Delivery Protocol
- **Format:** Repomix-style XML container format:
  ```xml
  <template slug="orrery" name="Orrery">
    <dependencies>
      {
        "dependencies": {
          "gsap": "^3.15.0",
          "motion": "^12.0.0"
        }
      }
    </dependencies>
    <instructions>
      Recreate the following files in your Next.js App Router project preserving relative paths.
    </instructions>
    <files>
      <file path="src/app/(orrery)/orrery/page.tsx">
  <![CDATA[
  // Code content
  ]]>
      </file>
    </files>
  </template>
  ```
- **Generation Script:** `scripts/generate-copy-bundles.ts` reads file lists from `scripts/template-files.ts` and outputs:
  - `public/copy/<slug>.md` (full source bundle).
  - `public/copy/<slug>-prompt.md` (clean markdown brief).
- **Delivery Mechanics:**
  - `PROMPT.md` content is inlined directly in `src/app/(index)/data/templates.ts` (~20 KB total for all 3 templates), enabling 0ms instant clipboard writes without network latency.
  - "Copy website" fetches from `/copy/<slug>.md`. The link is pre-fetched on card hover/focus to prevent Safari clipboard user-gesture timeout issues.
- **Automation:** Bundle generation runs automatically in `prebuild` and `predev` scripts in `package.json`.

---

## 6. Seed Template Data Matrix

| Slug | Title | Category | Industry | Tech Stack | Preview Image | Video Clip | Badges |
|---|---|---|---|---|---|---|---|
| `orrery` | **Orrery** | Keynote & Deck | AI & DevTools | Next.js 16 · Tailwind v4 · GSAP Observer · Motion | `/templates/orrery/title-orbits-1600.webp` | None | `Keynote Deck`, `GSAP`, `Keyboard Nav` |
| `cairn` | **Cairn** | Scroll Showcase | Apparel & Goods | Next.js 16 · Tailwind v4 · GSAP ScrollTrigger · Lenis | `/templates/cairn/hero-k2-1600.webp` | None | `Scroll Journey`, `Altitude Meter`, `Tritone Photos` |
| `koji` | **KŌJI** | 3D & WebGPU | Hospitality & Dining | Next.js 16 · Three.js (WebGPU/TSL) · Scroll-World | `/templates/koji/hero-dish-poster-1600.webp` | `/templates/koji/clips/dive-2-m.mp4` | `WebGPU 3D`, `Scroll Video`, `TSL Shaders` |

---

## 7. Testing, Verification & Quality Bar

### 7.1 Quality Bar
- **Mobile-first:** Clean, responsive rendering down to 375px with zero horizontal overflow.
- **Accessibility:** WCAG AA contrast, visible focus rings on interactive elements, proper `alt` tags on preview images, and `aria-live="polite"` feedback for clipboard actions.
- **Performance:** Mobile Lighthouse performance score of 95+. Eager load on first card preview only; lazy load all subsequent previews.

### 7.2 Playwright E2E Tests (`tests/gallery.spec.ts`)
- **Clipboard Verification:** Verify clicking "Copy prompt" and "Copy website" writes expected string contents to system clipboard (configured with native clipboard permissions in `playwright.config.ts`).
- **Filter Verification:** Verify clicking category chips narrows the grid items correctly, updates the result counter, and allows resetting.
- **Responsive Viewport:** Verify no horizontal scrollbar or element overflow at 375px width.
- **Reduced Motion:** Verify hover video does not trigger when `prefers-reduced-motion: reduce` is active.
