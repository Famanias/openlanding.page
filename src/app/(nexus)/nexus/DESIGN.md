# nexus — Design Specification

## Requirements and scope

Implement the official landing page template `nexus` as an isolated `/nexus` Next.js route. The source design from `https://github.com/Famanias/marketing-landing` is the visual and functional authority. All components, styles, interactive logic, and assets must be self-contained within `src/app/(nexus)/` without leaky imports or parent directory escapes.

## Concept and quality contract

nexus is an independent creative marketing studio that crafts tactile, organic brand worlds. Instead of sterile corporate grids or AI-generated gradients, nexus uses rich warm paper backgrounds, terracotta and olive pigments, physical clay sculpture cutouts, and editorial serif typography.

Key commitments:
- Warm paper palette (`#FBF8F1`, `#F5F1E8`, `#221B15`, `#C85A32`, `#777B45`, `#4C7262`, `#F6D6BA`, `#E5A93C`).
- Newsreader Google font with italic display styling and serif body rhythm.
- Tactile 3D clay botanical cluster, character illustration, and clay flower assets.
- Responsive mobile menu sheet with accessible dialog states.
- Hand-drawn flourish stroke animation on hero title.
- Interactive botanical principle tabs on Manifesto section.
- Expandable craft notes drawers on Services cards.
- Interactive 4-chapter timeline with scroll-scrubbed and clickable SVG botanical vine path.
- Work gallery filtering by discipline and accessible Case Study Modal dialog.
- Testimonial carousel with next/previous controls and note index counter.
- Interactive "Plant a project seed" contact form with live input validation, mailto draft generator, and clipboard copying.

## Typography and Color Architecture

- Primary Display & Serif: `Newsreader`, `serif`
- Fallback & Metadata: `system-ui`, `-apple-system`, `sans-serif`
- CSS Variables scoped under `.nx-body`:
  - `--paper-light`: `#FBF8F1`
  - `--paper-warm`: `#F5F1E8`
  - `--paper-card`: `#FFFFFF`
  - `--ink`: `#362E26`
  - `--ink-deep`: `#221B15`
  - `--ink-muted`: `#685F53`
  - `--terracotta`: `#C85A32`
  - `--clay`: `#D9824B`
  - `--peach`: `#F6D6BA`
  - `--sage`: `#4C7262`
  - `--olive`: `#777B45`
  - `--mustard`: `#E5A93C`
  - `--stroke`: `#E3DAC9`

## Layout and Motion Map

| Section | Elements | Interactions & Motion | Fallback / Reduced Motion |
| --- | --- | --- | --- |
| Header | Wordmark, Nav Links, CTA, Mobile Toggle | Responsive drawer slide-in, active link indicator | Instant open/close without animation |
| Hero | Display title, flourish SVG underline, tactile visuals, spinning seals | Staggered text entrance, terracotta flourish draw, spin-on-click wax seals | Static underline stroke, no rotation |
| Manifesto | Philosophy copy, proof metrics, principle tabs, almanac card | Interactive tab switcher, animated quote update | Instant tab state change |
| Services | 4 capability cards, SVG motifs, metadata chips, craft notes drawers | Tilt card hover, accordion drawer expansion | Simple disclosure toggle without height animation |
| Process | 4 chapter cards, scroll spine, chapter target pills | SVG vine path stroke-dashoffset scrub, active milestone glow, smooth scroll | Fully drawn vine, instant chapter jump |
| Work | 3 project cards, SVG illustration art, discipline filter pills, case study modal | Filter transitions, modal dialog backdrop fade, Escape key handling | Plain show/hide filtering, native modal behavior |
| Testimonials | Quote block, client author, role, counter, controls | Carousel index cycling with wrapped navigation | Instant text switch |
| Closing | Seed brief form, scope chips, mailto builder, copy feedback | Live input validation, dynamic mailto URL creation, clipboard API | Form submits gracefully, email fallback |
| Footer | Wordmark, copyright, site links | Hover underlines with animated sweep | Standard text links |

## Accessibility & Performance

- Strict ARIA roles for tabs (`role="tab"`, `role="tablist"`), dialogs (`role="dialog"`, `aria-modal="true"`), and live regions (`aria-live="polite"`).
- Keyboard support for Escape modal closing and tab switching.
- Full layout visibility under `<noscript>` via inline style overrides.
- Zero layout shift with fixed image aspect ratios and webp cutouts.
