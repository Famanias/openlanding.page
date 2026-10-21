# openlandingpage landing page: agent prompt

A prompt for building openlandingpage's own landing page (the gallery at `/`), plus the agent skills that fit each step. Paste the prompt below into an agent running in this repo.

## Suggested agent skills

The names are as installed in this workspace (Claude Code). In another agent, look for its equivalent.

| When | Skill | Why it fits |
|---|---|---|
| Before building | `superpowers:brainstorming` | Settle the open choices first: name casing, accent colour, how "Copy website" bundles the source. |
| | `superpowers:writing-plans` | Turn the agreed design into small, testable tasks. |
| Visual direction | `ui-ux-pro-max` | Generates a design system (palette, type pairing, spacing) for a "design gallery" product, and covers UX rules for filters, cards and accessibility. |
| | `minimalist-ui` | Matches the "gallery is the frame" brief: neutral chrome, typography first, no decoration. |
| | `design-taste-frontend` | Anti-template guard rails, so the page doesn't look like a generic AI landing page. |
| | `high-end-visual-design` | Editorial spacing and card craft at the Awwwards level. |
| Building | `vercel:nextjs` and `vercel:next-cache-components` | Next.js 16 App Router and cacheComponents conventions. Read them alongside the repo's AGENTS.md. |
| | `vercel:shadcn` | The gallery shell is the one place shadcn/ui and Lucide are allowed (filters, dropdowns, buttons, toasts). |
| | `superpowers:test-driven-development` | Copy-to-clipboard, filters and the 375px layout each get a failing test first. |
| Motion | `improve-animations` | Audits hover, stagger and reveal timing so the motion stays restrained and interruptible. |
| | `animate-ui` | Optional: motion for shadcn components (dropdowns, chip toggles, the "Copied" state). |
| Review | `web-design-guidelines` | Checks against the Web Interface Guidelines: focus, contrast, forms, buttons. |
| | `impeccable` | A critique and polish pass: hierarchy, spacing, empty and filtered states, responsive layout. |
| | `vercel:verification` or `run` | Opens the real page and confirms it works, not only that tests pass. |
| Ship | `vercel:deploy` | Deploys to the existing `openlandingpage` Vercel project. |

**Skills to avoid for this page:**
- `industrial-brutalist-ui`: KŌJI's mood, not the gallery's.
- `gpt-taste`: pinning and scroll-scrub choreography conflicts with "no scroll-jacking".
- `page-builder`: its Tailark blocks would make the gallery look generic.

## The prompt

````text
Design and build the landing page for openlandingpage, a gallery of landing-page templates that
people copy into their own AI agents. It lives at the site root ("/") of this Next.js 16 app
(https://openlandingpage.vercel.app).

SKILLS TO USE (if your agent has them)
- Plan first: superpowers:brainstorming, then superpowers:writing-plans.
- Design system: ui-ux-pro-max (run its --design-system search for a design-inspiration
  gallery), with minimalist-ui and design-taste-frontend as the visual guard rails.
- Build: vercel:nextjs, vercel:next-cache-components, vercel:shadcn, and
  superpowers:test-driven-development throughout.
- Motion: improve-animations (audit before shipping).
- Review: web-design-guidelines and impeccable, then vercel:verification before vercel:deploy.
- Don't use industrial-brutalist-ui, gpt-taste or page-builder for this page.

DESIGN REFERENCES (study both before designing)
1. https://motionsites.ai/ : the closest model for WHAT openlandingpage is. Take from it:
   - A short, punchy hero that sells the outcome, e.g. "Unlock your AI Design Superpowers /
     Build beautiful landing pages in minutes with our ready-to-use prompts. Just copy,
     paste, and launch.", with one emphasised word in italics and a single primary call to
     action.
   - A small "fresh drops" style label above the hero that signals new templates arrive often.
   - A horizontal row of category chips above the grid (All, Popular, Landing Page, 3D, SaaS,
     AI, Ecommerce, Creative…) plus "Recent" and "Popular" tabs.
   - Template cards that lead with a big preview, then a name and a category tag.
2. https://www.awwwards.com/websites : the model for HOW a serious design gallery feels.
   Take from it:
   - An editorial page title with a one-line intro ("Winning websites. Web Design
     Inspiration / Discover the best website designs of the world.").
   - A clean filter bar: dropdowns for Category, Tag, Technology and Font, a row of colour
     swatches, a live result count and "Reset filters".
   - Rich card metadata: type label, author, small award-style badges, and a date.
   - Restraint: lots of white space, strict grid alignment, typography doing the work, and the
     showcased sites as the only colour on the page.
   - Numbered pagination (later, once there are many templates).
Blend them: motionsites' copy-and-paste pitch and speed, presented with Awwwards' editorial
calm. Don't copy either site's branding, logo, wording or layout one-to-one; openlandingpage needs
its own identity.

WHAT TEMPLATEFLOW DOES
Visitors browse complete, production-grade landing pages for inspiration, then hand one to their
AI agent with one click:
- "Copy prompt": copies the template's design brief (its PROMPT.md) so an agent can rebuild it.
- "Copy website": copies the template's full source as one text bundle so an agent can
  reproduce it exactly.
The audience is designers and developers who build with AI agents. Success means a visitor lands,
browses, opens a template, and copies a prompt within a minute.

VISUAL DIRECTION
The gallery is the frame, not the painting. The templates are loud and very different from
each other, so openlandingpage's own chrome stays neutral:
- Colour: off-white and near-black, in both light and dark mode, plus greys and a single small
  accent reserved for the copy actions and focus states.
- Type: a confident grotesk for the display type, a monospace for metadata.
- Previews: large, image-first, with no drop shadows, gradients or glass effects.
- Brand: give openlandingpage its own simple wordmark and favicon.

THE TEMPLATES (only three for now; design the system for 30+)
1. Orrery (/orrery): an AI agent-orchestration company. Presentation style: a full-screen
   keynote deck with slide wipes, a chapter rail and keyboard navigation.
   Preview: /templates/orrery/title-orbits-1600.webp
2. Cairn (/cairn): mountaineering apparel. Showcase style: a scroll-driven ascent of K2 with an
   altitude meter, colourway swap and fabric zoom. Black, dark navy and white only.
   Preview: /templates/cairn/hero-k2-1600.webp
3. KŌJI (/koji): a Japanese fermentation restaurant in a 1972 Metabolist tower. 3D-focused: a
   real-time WebGPU nigiri in the hero and a scroll-scrubbed food video. 1960–90s brutalist.
   Preview: /templates/koji/hero-dish-poster-1600.webp
   Hover preview: /templates/koji/clips/dive-2-m.mp4 (muted, looped, only on hover or focus,
   never for reduced-motion visitors).
Each template folder has a DESIGN.md (brand, palette, type, motion) and a PROMPT.md (the
copyable brief). Read all six for card copy, tags and badges.

PAGE STRUCTURE
1. Header: wordmark, nav (Gallery, How it works, Submit placeholder) and a GitHub link
   placeholder.
2. Hero (motionsites-style): a "fresh drops" label, a one-line headline with one italic
   emphasised word (e.g. "Landing pages your *agent* can copy"), one supporting line and one
   primary action that scrolls to the gallery. On desktop, the top of the gallery shows in the
   first viewport.
3. Filter bar (Awwwards-style): theme chips (All / 3D / Presentation / Showcase), dropdowns for
   Industry and Technology, a result count and "Reset filters".
4. Gallery grid: three columns on desktop, two on tablet, one on phones. Each card has:
   - a large preview;
   - the name and a one-line description;
   - metadata in monospace: theme · stack (e.g. "Presentation · Next.js · GSAP"), plus a small
     badge such as "3D", "WebGPU" or "Scroll video";
   - three actions: "View live", "Copy prompt" and "Copy website".
   Copy buttons show an inline "Copied" state for about 2s and announce it to screen readers.
5. How it works: Browse → Copy → Paste into your agent, with a short excerpt of a real
   PROMPT.md as the example.
6. Footer (Awwwards-style link columns, kept short): Gallery, How it works, GitHub, a credit
   line and a copyright notice.

MOTION
Restrained, so it never competes with the templates: a subtle preview zoom or crossfade on
hover, a staggered card reveal on first load, and a 150–250ms ease-out on interactions.
Everything is static under prefers-reduced-motion. No scroll-jacking.

QUALITY BAR
- Mobile-first, with no horizontal scroll at 375px.
- WCAG AA contrast, visible focus rings, real <button>s for the copy actions, and alt text on
  every preview.
- Mobile Lighthouse performance 95+. Previews use AVIF/WebP with width and height set, and only
  the first card's image loads eagerly.

CONSTRAINTS (this repo)
- Before writing Next.js code, read the guide in node_modules/next/dist/docs/ (see AGENTS.md).
  This is Next.js 16 with the App Router, Turbopack and cacheComponents.
- Build only inside src/app/(index)/. Never import from a template's folder; `npm run check`
  enforces that isolation. Template content reaches the gallery as data or generated files.
- "Copy website": a build-time script writes public/copy/<slug>.md from the files listed by
  scripts/template-files.ts. "Copy prompt" is served the same way from each PROMPT.md.
- shadcn/ui and Lucide icons are reserved for this gallery shell. Use them here, not inside
  templates.
- Keep the template list in one data file, so adding a template is a single entry.
- Add Playwright tests for: each copy button puts the right text on the clipboard, filters
  narrow the grid, no horizontal overflow at 375px, and the page works with reduced motion.
````