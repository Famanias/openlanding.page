# PATCHBAY: design spec

`npm i lenis` (already a repo dependency). Route: `/patchbay`. CSS prefix: `pby-`.

## Requirements
- Role-adaptive developer portfolio usable across four disciplines: Web Front-end, Full-stack, AI Engineering, and UX/UI Product Design.
- Single typed data model (`content/roles.ts`, `content/projects.ts`, `content/profile.ts`) making customization simple without touching component internals.
- Interactive patch bay hardware metaphor where plugging a patch cable into a jack dynamically re-routes and re-ranks the page content.
- URL state reflection (`?role=<role>`) allowing direct deep linking for recruiters and hiring managers.
- Folder isolation, strict palette compliance, media checks, 100% accessible keyboard navigation, reduced-motion fallbacks, zero layout shift (CLS 0).

## Concept
One engineer, many disciplines. The visitor plugs a cable into a role jack, so the whole page re-routes: hero messaging, project ranking, signal flow stack, process steps, and deep-dive case studies instantly re-compose around that discipline.

## Palette
| Role | Hex | Purpose |
|---|---|---|
| Graphite (ink) | `#15161A` | Page canvas, deep backgrounds |
| Panel | `#1E2024` | Surface cards, patch bay chassis, case study slab |
| Seam | `#34373D` | Structural hairlines, empty jack holes, dividers |
| Bone | `#ECE8DF` | High-contrast display headlines, primary text |
| Steel | `#9A9CA3` | Monospaced metadata, labels, secondary copy |
| Amber | `#F2A93B` | The only signal accent: active cable, LEDs, progress, focus rings |

Tints and translucent overlays are generated via CSS `color-mix()`, keeping strictly to these six hex colors.

## Type
- Display: Familjen Grotesk (geometric, technical yet human sans with tight metric tracking).
- Body: Hanken Grotesk (neutral, highly readable neo-grotesque for descriptions and interface elements).
- Mono: IBM Plex Mono (crisp monospaced utilitarian type for port labels, telemetry metrics, and status readouts).
All loaded via `next/font/google` with distinct CSS variables. Fluid typography scales driven by `clamp()`.

## Layout
- Shell: Max-width 1200px container with responsive inline padding `clamp(20px, 4vw, 48px)`.
- Fixed glass header with blurred backdrop compression after 80px scroll.
- Hero with two-line headline reservation to eliminate layout shift during role changes.
- Modular section grid: Selected Work (1 to 3 columns), Signal Flow (3 interconnected pipeline columns), Process (4 numbered stages), Case Study (split 50/50 stage), About (biography and career timeline), Contact (local brief generator).
- Footer with SVG jack mark and verified external profiles.

## The mechanic
- State & Routing: `bay/routing.ts` provides pure, tested utilities (`parseRole`, `stepRole`, `rankForRole`, `cablePath`, `jackCenterX`, `roleHref`). Bad or missing URL parameters cleanly fallback to `fullstack`.
- Cable Physics: Damped semi-implicit Euler spring simulation (`motion/math.ts`) calculates cable tension, sag, and natural overshoot. As the plug seats into the target jack, an expanding latch ring animates.
- Dynamic Re-ranking: Each project defines weights across roles. `rankForRole` hides irrelevant projects and sorts the rest by relevance weight without DOM recreation.
- Zero Layout Thrashing: Cable SVG paths and plug translate coordinates are updated directly via `requestAnimationFrame` on refs and CSS custom properties.

## Motion
**Personality:** technical / cinematic, expressive.
**Verbs:** *route* and *latch*.
**Signature moment:** You select or switch a role. The spring-driven cable whips taut across the bay, the plug latches into the brass jack with a satisfying kinetic lock, and a radiant amber signal pulse sweeps down through the page as sections re-rank.

**Tokens** (in `@theme`):
- `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)`
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)`
- `--ease-spring`: `linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1)`
- Durations: `--dur-instant` (90ms), `--dur-fast` (180ms), `--dur-base` (420ms), `--dur-slow` (800ms), `--dur-hero` (1200ms)
- Distance & Stagger: `--reveal-shift` (28px), `--stagger` (70ms)

**Motion map**

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | Drops in at 150ms, nav items staggered 50ms | Compresses & blurs at 80px scroll; progress indicator tracks page depth | Underline indicator slides smoothly between targets | Mobile toggle bars morph to X; radial clip-path expand | Slides up / fixed overlay |
| Hero | Staggered sequence: grid settles (0ms), eyebrow (300ms), headline mask rise (250ms), subcopy (650ms), CTAs (760ms), bay (860ms), metrics (980ms), ticker (1100ms) | Background grid parallax; content dims and lifts slightly as work enters | Magnetic proximity pull on buttons; fill wipes from left | Scale 0.97 spring compression on press | Subtle lift & dim handoff as Work section approaches |
| Patch Bay | Rises into place with hero sequence; cable connects to initial role | Stays pinned in view inside hero | Jacks highlight with subtle bone tint on fine pointer hover | Spring calculates trajectory; plug overshoots and latches; pulse sweeps screen | Persists in hero; chips in header mirror state |
| Project Cards | Staggered scale-rise with 70ms cascade | Parallax perspective container | 3D card tilt (±5°), radial cursor spotlight, media scales 1.06, sibling cards dim to 0.6 opacity | Press scale feedback | Staggered transition on re-ranking |
| Signal Flow | Column titles slide from left; wire hairlines draw in from left | Wire pulse particle loops across columns | Cards highlight border tint | Active ports pulse | Smooth swap on role shift |
| Process Steps | Number badges slide; amber rules draw from left; body copy rises | Progressively enters viewport | Step card background tint | None | Replaced gracefully |
| Case Study | Large media wipe reveal; problem and approach copy rise staggered; metric counters count up | Background panel pins/scrolls smoothly | Case card spotlight | Live tab switch if interacted | Section border line handoff |
| About & Timeline | Bio paragraphs rise; timeline rows slide from right staggered | Viewport entry trigger | Timeline rows illuminate amber year marker | None | Clean separation |
| Contact Form | Header rises; form fields reveal sequentially | Viewport entry trigger | Floating labels rise on focus; amber underline indicator draws | Invalid fields shake (±6px); submit button morphs to spinner, then choreographed success panel replacement with drawn check | Form fades down as success panel enters |
| Footer | Content rises with subtle opacity | Static baseline | Link underlines expand | Instant press | Terminal baseline |

## Signature details
1. **Physical Patch Bay chassis:** Real-time spring cable math with SVG cubic Bezier curve that reacts to spring velocity with dynamic catenary sag.
2. **Signal Flow Wire Pulses:** Animated energy pulses that travel along connector lines between input, core stack, and outputs.
3. **Deterministic Brief Ticket Reference:** Form hashes entered data into a reproducible brief code (e.g. `PB-XXXXXX`) and outputs a downloadable local brief document.
4. **Header Role Sync & Telemetry Ticker:** Header chips mirror the active role and allow re-routing from anywhere on the page, accompanied by a drifting availability marquee.

## Do / Don't
- **DO** keep all role configurations in `content/roles.ts` and `content/projects.ts` so developers can fork and adapt the template with zero code changes.
- **DO** respect `prefers-reduced-motion` by ensuring all content is immediately visible without animation and disabling physics loops.
- **DO** keep the form honest: download the brief locally rather than claiming a backend delivery occurred.
- **DON'T** hardcode role selections into individual sections; always read from `useRole()`.
- **DON'T** animate `width`, `height`, or layout properties; only transform `translate`, `scale`, `opacity`, and `clip-path`.
- **DON'T** introduce colors outside the 6-hex brand palette.

## Files and imagery
All template files are strictly isolated within `src/app/(patchbay)/`:
- `layout.tsx` - Root HTML layout with Google Font variables and metadata.
- `patchbay/page.tsx` - Server root assembling the section tree.
- `patchbay/patchbay.css` - Tailwind tokens, prefixed CSS rules, and accessibility overrides.
- `patchbay/brand/Logo.tsx` - SVG mark and wordmark.
- `patchbay/content/` - Pure TypeScript configuration for roles, projects, and bio.
- `patchbay/bay/` - Patch bay spring mechanics and RoleProvider context.
- `patchbay/motion/` - Motion primitives (Reveal, CountUp, ScrollProgress, Magnetic, TiltCard, etc.).
- `patchbay/sections/` - Individual semantic sections.
- `patchbay/forms/` - Validated brief generator and test suite.
- `patchbay/assets.tsx` - Labelled placeholder renderer with responsive picture support.
