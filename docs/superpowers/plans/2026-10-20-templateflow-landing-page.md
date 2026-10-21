# openlandingpage Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-grade landing page gallery for openlandingpage at `/` in this Next.js 16 App Router repository, showcasing Orrery, Cairn, and KŌJI with 1-click AI agent prompt & source bundling.

**Architecture:** A statically prerendered Next.js 16 root route (`src/app/(index)/`) featuring an editorial neutral chrome ("frame, not painting") with Stark Monochrome + Curatorial Emerald (`#10B981`) micro-accent. Client-side filter state synchronizes shallowly to the URL without server roundtrips, and templates are bundled at build-time into Repomix-compatible XML containers in `public/copy/`.

**Tech Stack:** Next.js 16.4.2 (App Router, Turbopack, `cacheComponents`), React 19, Tailwind CSS v4, `@phosphor-icons/react`, Vitest 5, Playwright 1.64.

**Spec:** [`docs/superpowers/specs/2026-10-20-openlandingpage-landing-page-design.md`](file:///E:/orca/workspaces/webflow-projects/docs/superpowers/specs/2026-10-20-openlandingpage-landing-page-design.md)

---

## Global Constraints

- **Framework:** Next.js 16 with App Router, Turbopack, and `cacheComponents: true` (see `next.config.ts`).
- **Template Isolation:** Gallery code in `src/app/(index)/` must NEVER import from `src/app/(${slug})/`. Enforced by `npm run check`.
- **Brand Wordmark:** `openlandingpage` (all-lowercase, bold neo-grotesk with `-0.03em` tracking).
- **Typography:** `Geist` for display/body, `Geist Mono` for tabular metadata.
- **Palette Chrome:** Deep Carbon `#0C0D0E` surface, `#141518` cards, `rgba(255,255,255,0.08)` hairline borders.
- **Accent Color:** Curatorial Emerald `#10B981` strictly reserved for `✓ Copied` states and live dots. High-contrast monochrome inversion for buttons and focus rings.
- **Bundling Format:** Repomix XML container format (`<file path="...">...</file>`).
- **Quality Bar:** Mobile-first with zero horizontal overflow at 375px; WCAG AA contrast; Lighthouse 95+; only 1st card preview loads eagerly.

---

## Review Focus

1. **Clipboard gesture timeout in Safari/WebKit:** Asynchronous `fetch` during click handler can trigger `NotAllowedError`. *Expectation:* "Copy prompt" copies inlined prompt data with 0ms latency; "Copy website" pre-fetches `/copy/<slug>.md` on card hover/focus before click.
2. **Horizontal overflow at 375px:** Long monospaced metadata strings (`Presentation · Next.js · GSAP`) breaking grid containers on small screens. *Expectation:* Flex-wrap or truncation with zero viewport horizontal scroll.
3. **Headless Chromium clipboard permissions:** `navigator.clipboard.readText()` throwing security DOMException in CI/Playwright. *Expectation:* `playwright.config.ts` explicitly configures `permissions: ["clipboard-read", "clipboard-write"]`.
4. **KŌJI video playback with reduced motion:** Video auto-playing or triggering on hover when user prefers reduced motion. *Expectation:* CSS/JS checks `prefers-reduced-motion: reduce` and keeps video strictly unmounted/hidden.
5. **Backtick escaping in XML bundle generator:** Source files containing template literals or Markdown backticks mangling CDATA boundaries. *Expectation:* Generator cleanly wraps file content in `<![CDATA[...]]>` and safely escapes any `]]>` sequences.

---

## Task Structure

### Task 1: Source Bundling Generator Script & Prebuild Hook

**Files:**
- Create: `scripts/generate-copy-bundles.ts`
- Test: `scripts/__tests__/generate-copy-bundles.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `readTemplateFiles(slug: string)` from `scripts/template-files.ts`, `TEMPLATES` from `scripts/templates.config.ts`.
- Produces: `public/copy/<slug>.md` (Repomix XML container), `public/copy/<slug>-prompt.md` (clean markdown brief).

- [ ] **Step 1: Write the failing unit test for bundle generation**

Create `scripts/__tests__/generate-copy-bundles.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { formatRepomixBundle } from "../generate-copy-bundles";

describe("generate-copy-bundles", () => {
  it("formats source files into Repomix XML container format with dependencies and instructions", () => {
    const files = [
      { path: "src/app/(orrery)/orrery/page.tsx", source: "export default function Page() { return <div>Orrery</div>; }" }
    ];
    const bundle = formatRepomixBundle("orrery", "Orrery", files, ["gsap", "motion"]);
    expect(bundle).toContain('<template slug="orrery" name="Orrery">');
    expect(bundle).toContain("<dependencies>");
    expect(bundle).toContain('"gsap"');
    expect(bundle).toContain('<file path="src/app/(orrery)/orrery/page.tsx">');
    expect(bundle).toContain("<![CDATA[");
    expect(bundle).toContain("export default function Page()");
    expect(bundle).toContain("</template>");
  });

  it("safely escapes CDATA closing sequence in source code", () => {
    const files = [{ path: "test.ts", source: "const x = ']]>';" }];
    const bundle = formatRepomixBundle("test", "Test", files, []);
    expect(bundle).not.toContain("<![CDATA[const x = ']]>';]]>");
    expect(bundle).toContain("]]]]><![CDATA[>");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run scripts/__tests__/generate-copy-bundles.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `formatRepomixBundle` and execution script in `scripts/generate-copy-bundles.ts`**

Implement XML formatter with CDATA escaping, package dependency resolution from template `DESIGN.md` / `package.json`, and file writer saving to `public/copy/<slug>.md` and `public/copy/<slug>-prompt.md`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run scripts/__tests__/generate-copy-bundles.test.ts`
Expected: PASS

- [ ] **Step 5: Add script to `package.json` `"prebuild"` and `"predev"` and execute it**

Run: `tsx scripts/generate-copy-bundles.ts`
Verify: `public/copy/orrery.md`, `public/copy/cairn.md`, and `public/copy/koji.md` exist and are valid XML.

---

### Task 2: Gallery Template Data & Inlined Prompts Module

**Files:**
- Create: `src/app/(index)/data/templates.ts`
- Test: `src/app/(index)/data/templates.test.ts`

**Interfaces:**
- Consumes: Static metadata and raw `PROMPT.md` contents from template directories at build-time.
- Produces: `export const TEMPLATES: TemplateItem[]`, where each `TemplateItem` has `slug`, `title`, `description`, `category`, `industry`, `stack`, `badges`, `previewImage`, `videoClip`, and `promptMarkdown`.

- [ ] **Step 1: Write the failing unit test for template data**

Create `src/app/(index)/data/templates.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { TEMPLATES, CATEGORIES } from "./templates";
import fs from "node:fs";
import path from "node:path";

describe("gallery template data", () => {
  it("contains all three seed templates with required metadata", () => {
    expect(TEMPLATES).toHaveLength(3);
    const slugs = TEMPLATES.map(t => t.slug);
    expect(slugs).toEqual(["orrery", "cairn", "koji"]);
  });

  it("has valid categories matching CATEGORIES constant", () => {
    const validCategoryIds = CATEGORIES.map(c => c.id);
    for (const t of TEMPLATES) {
      expect(validCategoryIds).toContain(t.category);
    }
  });

  it("inlines non-empty prompt markdown for instant clipboard copy", () => {
    for (const t of TEMPLATES) {
      expect(t.promptMarkdown).toBeDefined();
      expect(t.promptMarkdown.length).toBeGreaterThan(100);
      expect(t.promptMarkdown).toContain("# ");
    }
  });

  it("references preview images that exist in public folder", () => {
    for (const t of TEMPLATES) {
      const publicPath = path.join(process.cwd(), "public", t.previewImage);
      expect(fs.existsSync(publicPath), `Missing image at ${publicPath}`).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/data/templates.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `src/app/(index)/data/templates.ts`**

Define `TemplateItem` type, `CATEGORIES` array (`All`, `Keynote & Deck`, `Scroll Showcase`, `3D & WebGPU`), and `TEMPLATES` array with inlined prompts and preview paths.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(index)/data/templates.test.ts`
Expected: PASS

---

### Task 3: Scoped UI Primitives & Gallery Chrome Styling Tokens

**Files:**
- Modify: `src/app/(index)/index.css`
- Create: `src/app/(index)/components/ui/Button.tsx`
- Create: `src/app/(index)/components/ui/Badge.tsx`
- Test: `src/app/(index)/components/ui/ui.test.tsx`

**Interfaces:**
- Produces: `<Button variant="solid" | "outline" | "ghost" size="sm" | "md" />`, `<Badge variant="mono" | "emerald" />`.

- [ ] **Step 1: Write the failing test for UI components**

Create `src/app/(index)/components/ui/ui.test.tsx`:
```ts
import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./Button";
import { Badge } from "./Badge";

describe("gallery UI primitives", () => {
  it("renders Button with monochrome inversion classes", () => {
    const html = renderToStaticMarkup(<Button variant="solid">Copy prompt</Button>);
    expect(html).toContain("bg-white");
    expect(html).toContain("text-black");
    expect(html).toContain("<button");
  });

  it("renders Badge with tabular monospace styling", () => {
    const html = renderToStaticMarkup(<Badge variant="emerald">Issue #01</Badge>);
    expect(html).toContain("font-mono");
    expect(html).toContain("Issue #01");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/components/ui/ui.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `Button.tsx`, `Badge.tsx`, and update `src/app/(index)/index.css`**

Configure `@import "tailwindcss";` in `index.css` with dark mode default background (`#0C0D0E`), text colors, focus ring utilities (`focus-visible:ring-2 focus-visible:ring-white`), and hairline border tokens. Implement `Button.tsx` and `Badge.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(index)/components/ui/ui.test.tsx`
Expected: PASS

---

### Task 4: TemplateCard Component with Video Hover & Split-Action Hierarchy

**Files:**
- Create: `src/app/(index)/components/TemplateCard.tsx`
- Test: `src/app/(index)/components/TemplateCard.test.tsx`

**Interfaces:**
- Consumes: `TemplateItem` from `src/app/(index)/data/templates.ts`.
- Produces: `<TemplateCard template={template} isEager={boolean} />`.

- [ ] **Step 1: Write the failing unit test for `TemplateCard`**

Create `src/app/(index)/components/TemplateCard.test.tsx`:
```ts
import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../data/templates";

describe("TemplateCard", () => {
  it("renders 16:10 preview frame with correct live template link", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={true} />);
    expect(html).toContain('href="/orrery"');
    expect(html).toContain("aspect-[16/10]");
    expect(html).toContain("Orrery");
  });

  it("renders persistent copy actions for prompt and website", () => {
    const html = renderToStaticMarkup(<TemplateCard template={TEMPLATES[0]} isEager={false} />);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Copy website");
  });

  it("renders video tag for KŌJI with muted and loop attributes", () => {
    const koji = TEMPLATES.find(t => t.slug === "koji")!;
    const html = renderToStaticMarkup(<TemplateCard template={koji} isEager={false} />);
    expect(html).toContain("<video");
    expect(html).toContain("dive-2-m.mp4");
    expect(html).toContain("muted");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/components/TemplateCard.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `TemplateCard.tsx`**

Build client component:
- 16:10 preview container with 1px hairline border.
- First card image uses `loading="eager"`, others use `loading="lazy"`.
- KŌJI video hover/focus crossfade over 200ms with `@media (prefers-reduced-motion: reduce)` suppression.
- Persistent monospace utility bar with `[Copy Prompt]` (0ms inlined) and `[Copy Website]` (fetches `/copy/<slug>.md`).
- Clipboard success state: button transitions to `✓ Copied` in `#10B981` for 2000ms with `aria-live="polite"` feedback.
- Prefetch `/copy/<slug>.md` on mouse-enter / focus to avoid Safari gesture timeout.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(index)/components/TemplateCard.test.tsx`
Expected: PASS

---

### Task 5: FilterBar Component & Client State Synchronization

**Files:**
- Create: `src/app/(index)/components/FilterBar.tsx`
- Test: `src/app/(index)/components/FilterBar.test.tsx`

**Interfaces:**
- Consumes: `CATEGORIES` from `src/app/(index)/data/templates.ts`.
- Produces: `<FilterBar activeCategory={string} onSelectCategory={(cat: string) => void} totalCount={number} filteredCount={number} onReset={() => void} />`.

- [ ] **Step 1: Write the failing unit test for `FilterBar`**

Create `src/app/(index)/components/FilterBar.test.tsx`:
```ts
import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FilterBar } from "./FilterBar";
import { CATEGORIES } from "../data/templates";

describe("FilterBar", () => {
  it("renders horizontal category chips with counts", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="all"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={3}
        onReset={() => {}}
      />
    );
    expect(html).toContain("All");
    expect(html).toContain("Showing 3 of 3 templates");
  });

  it("displays reset button when non-all category is active", () => {
    const html = renderToStaticMarkup(
      <FilterBar
        activeCategory="3d-webgpu"
        onSelectCategory={() => {}}
        totalCount={3}
        filteredCount={1}
        onReset={() => {}}
      />
    );
    expect(html).toContain("Reset filters");
    expect(html).toContain("Showing 1 of 3 templates");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/components/FilterBar.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `FilterBar.tsx`**

Build component with accessible ARIA tablist/radiogroup semantics, horizontal scroll on mobile with `-webkit-overflow-scrolling: touch`, active chip highlight, live result counter, and `Reset filters` button.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(index)/components/FilterBar.test.tsx`
Expected: PASS

---

### Task 6: Header, Hero, "How It Works" & Footer Sections

**Files:**
- Create: `src/app/(index)/components/Header.tsx`
- Create: `src/app/(index)/components/Hero.tsx`
- Create: `src/app/(index)/components/HowItWorks.tsx`
- Create: `src/app/(index)/components/Footer.tsx`
- Test: `src/app/(index)/components/sections.test.tsx`

**Interfaces:**
- Produces: `<Header />`, `<Hero />`, `<HowItWorks />`, `<Footer />`.

- [ ] **Step 1: Write the failing unit test for page sections**

Create `src/app/(index)/components/sections.test.tsx`:
```ts
import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Footer } from "./Footer";

describe("landing page sections", () => {
  it("Header renders lowercase openlandingpage wordmark and nav links", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain("openlandingpage");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain('href="#how-it-works"');
  });

  it("Hero renders Issue #01 badge and smooth-scroll CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Issue #01");
    expect(html).toContain("Award-grade landing pages");
    expect(html).toContain('href="#gallery"');
  });

  it("HowItWorks renders 3-step guide and Orrery proof-of-work snippet", () => {
    const html = renderToStaticMarkup(<HowItWorks />);
    expect(html).toContain("Browse");
    expect(html).toContain("Copy");
    expect(html).toContain("Build");
    expect(html).toContain("#0E0F13");
    expect(html).toContain("clip-path inset");
  });

  it("Footer renders editorial columns and copyright notice", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain("openlandingpage");
    expect(html).toContain("GitHub");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(index)/components/sections.test.tsx`
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement `Header.tsx`, `Hero.tsx`, `HowItWorks.tsx`, and `Footer.tsx`**

Implement the 4 components adhering to the editorial typography, spacing, and accessibility guidelines from the spec.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(index)/components/sections.test.tsx`
Expected: PASS

---

### Task 7: Full Page Integration (`page.tsx` & `layout.tsx`) & Isolation Verification

**Files:**
- Modify: `src/app/(index)/layout.tsx`
- Modify: `src/app/(index)/page.tsx`
- Create: `src/app/(index)/components/GalleryShell.tsx`

**Interfaces:**
- Prerenders statically at `/` using Next.js 16 `"use cache"`.
- Assembles `Header`, `Hero`, `GalleryShell` (FilterBar + Grid), `HowItWorks`, and `Footer`.

- [ ] **Step 1: Implement `GalleryShell.tsx` to handle client filtering & shallow URL sync**

Create `GalleryShell.tsx` managing `activeCategory` state with `window.history.replaceState` shallow URL sync, rendering `FilterBar` and `TemplateCard` grid.

- [ ] **Step 2: Assemble `page.tsx` and update metadata in `layout.tsx`**

Update `layout.tsx` with proper fonts (`Geist`, `Geist_Mono`), meta tags, OpenGraph data, and favicon. Assemble `page.tsx` with `"use cache"`.

- [ ] **Step 3: Verify isolation and palette checks**

Run: `npm run check`
Expected: `isolation: ok`, `palette: ok`

- [ ] **Step 4: Verify production build**

Run: `npm run build`
Expected: Build succeeds with static route `/`.

---

### Task 8: End-to-End Playwright Test Suite & Clipboard Verification

**Files:**
- Modify: `playwright.config.ts`
- Modify: `tests/e2e/index.spec.ts`

**Interfaces:**
- Tests the live running page at `http://localhost:3100/`.

- [ ] **Step 1: Update `playwright.config.ts` to grant clipboard permissions**

Add `permissions: ["clipboard-read", "clipboard-write"]` under `use: { ... }` in `playwright.config.ts`.

- [ ] **Step 2: Implement comprehensive Playwright test cases in `tests/e2e/index.spec.ts`**

Add tests:
1. `index lists the three templates and navigates to live sites`
2. `clicking "Copy prompt" copies PROMPT.md content to clipboard and shows Copied state`
3. `clicking "Copy website" copies Repomix XML bundle to clipboard`
4. `category filter chips filter templates and update result counter`
5. `mobile viewport at 375px has zero horizontal overflow`
6. `hover video does not play or render under prefers-reduced-motion`

- [ ] **Step 3: Run Playwright test suite**

Run: `npm run test:e2e -- tests/e2e/index.spec.ts`
Expected: All tests PASS.

- [ ] **Step 4: Commit all changes**

```bash
git add .
git commit -m "feat: implement openlandingpage landing page gallery at /"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Every section from the spec (Brand, Chrome, Palette, Bundling, Taxonomy, Card Actions, How it Works, Quality bar) is assigned to a specific task.
- [x] **Step scan:** Every step contains a single unambiguous action with expected commands and outputs.
- [x] **Type consistency:** `TemplateItem`, `CATEGORIES`, `TEMPLATES`, and component prop interfaces are consistent across tasks.
- [x] **Review Focus:** All 5 high-risk edge cases (Safari gesture timeout, 375px overflow, headless clipboard permissions, reduced motion video, CDATA backtick escaping) are addressed with tests.
- [x] **Proportion:** Plan is structured, modular, and concise without dumping entire production files.
