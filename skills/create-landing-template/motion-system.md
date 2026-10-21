# The motion system

A template must **feel alive and premium on every interaction**: load, scroll, hover, press, focus, navigation, forms. A bare fade-in is not motion design. It is the absence of it. This file is the playbook. Read it before Phase 3 (so the concept includes a motion identity) and again before Phase 6 (so the build uses it).

The rule of thumb: **if an element appears, moves, changes state or responds to the pointer, it has a deliberate motion, and that motion belongs to the brand.**

## 1. Motion identity (decide before building)

Every template has a **motion personality**, derived from the brand's central idea and written in DESIGN.md's Motion section. Pick one primary verb and one secondary, then use them everywhere. Two sections that move with unrelated verbs look assembled, not designed.

| Personality | Primary verbs | Feel | Easing / duration |
|---|---|---|---|
| Precise / clockwork | *snap, tick, wipe, lock* | mechanical, exact | `expo-out`, 350–600 ms, no overshoot |
| Soft / luxurious | *drift, bloom, settle, dissolve* | slow, weighted, quiet | `quint-out`, 700–1100 ms, long staggers |
| Kinetic / bold | *slam, slide, skew, stretch* | loud, fast, confident | `back-out` or springs, 300–500 ms |
| Organic / analog | *breathe, sway, grow, unfurl* | irregular, hand-made | springs, slight randomness in delay |
| Technical / cinematic | *scan, reveal, parallax, focus-pull* | scrubbed, scroll-linked | `ease-in-out`, scroll-driven |

Record in DESIGN.md → Motion:
- the personality and its two verbs;
- the easing tokens and duration scale (see §2);
- the **motion map** (§9): every section and component, with its entrance, scroll, hover and exit behaviour;
- the **one signature moment**: a single scroll or interaction beat the user will remember (the hero entrance, the mechanic's transition, a section handoff).

## 2. Tokens (in `@theme`, never inline)

Put these in `<slug>.css`. Components reference the tokens; nobody writes a raw `cubic-bezier()` or `300ms` in a component.

```css
@theme {
  /* easings: pick the family that matches the personality, keep the names */
  --ease-out:        cubic-bezier(0.23, 1, 0.32, 1);     /* default entrance, hover release */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);      /* hero, big reveals */
  --ease-in-out:     cubic-bezier(0.77, 0, 0.175, 1);    /* wipes, state swaps, pinned scenes */
  --ease-spring:     linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1); /* press-release, toggles, magnet snap-back */

  /* durations */
  --dur-instant: 90ms;   /* press feedback */
  --dur-fast:    180ms;  /* hover, focus, colour */
  --dur-base:    420ms;  /* UI transitions, card lift */
  --dur-slow:    800ms;  /* section reveals, wipes */
  --dur-hero:    1200ms; /* load choreography */

  /* distance + stagger */
  --reveal-shift: 28px;
  --stagger: 70ms;       /* per child; cap total stagger at ~600 ms */
}
```

## 3. Vocabulary of reveals (use at least four, not one)

`opacity` alone never counts as a reveal. Every revealed element combines opacity with at least one of the following, chosen by the element's role:

| Element | Reveal |
|---|---|
| Headlines (display type) | **Split by line, mask-rise:** each line sits in an `overflow: clip` wrapper and its inner span rises from `translateY(110%)`. Optionally split to words/characters with a 20–35 ms stagger. |
| Body copy, captions | Short rise (`translateY(12px)`) + opacity, staggered by paragraph. |
| Images / media | **Clip-path wipe** (`inset(0 0 100% 0)` → `inset(0)`) with an inner scale settle (`scale(1.12)` → `1`) over `--dur-slow`. |
| Cards in a grid | Staggered rise with a tiny rotation or scale (`translateY(32px) scale(.96)`), ordered by reading direction, with the cascade starting from the card nearest the pointer/scroll entry when possible. |
| Lines, rules, dividers | **Draw:** `scaleX(0)` → `1` with `transform-origin` at the start. SVG paths use `stroke-dashoffset`. |
| Numbers, stats | **Count-up** with `tabular-nums`, final value kept in a visually hidden span (quality bar §5). |
| Labels, badges, eyebrows | Slide-in from the side of their line, or a typewriter/scramble if the brand is technical. |
| Section backgrounds | Colour or clip-path handoff between sections (§5), never a hard cut. |

Implementation rules:
- **Hidden state is applied in CSS under `prefers-reduced-motion: no-preference` only**, so no-JS and reduced-motion users see everything. Ship a `<noscript><style>` override.
- The observer toggles `data-in="true"`; the CSS does the rest. Reveal once, then `unobserve`, unless the section deliberately scrubs.
- Stagger through a CSS custom property: `style={{ "--i": index }}` with `transition-delay: calc(var(--i) * var(--stagger))`. Never `setTimeout` chains.
- Above-the-fold content uses a **CSS keyframe load sequence** (§4) so it runs without waiting for hydration.

## 4. Load choreography (the first 1.5 seconds)

The hero is the first impression. It gets a **timed, orchestrated sequence**, not one fade:

1. `0 ms`: the background / texture / canvas settles (`scale(1.06)` → `1`, or a clip reveal).
2. `150 ms`: the logo and nav drop in (nav items staggered 50 ms).
3. `250 ms`: the headline rises by line through its masks.
4. `600 ms`: the sub-copy, CTAs and signature detail (counter, stamp, readout) arrive in sequence.
5. `900 ms+`: ambient motion starts (floating element, marquee, slow parallax drift).

Use `@keyframes` with `animation-fill-mode: both` and `animation-delay` from tokens so the sequence plays before JS hydrates and never causes CLS. If a preloader is part of the concept, it must finish in under 1.8 s, be skippable, and never gate content for crawlers or reduced-motion users.

## 5. Scroll behaviour

A scroll should *do* something. Combine these, assigned per section in the motion map:

- **Smooth scroll:** `lenis` (already a repo dependency) with `lerp ≈ 0.1`, wired to `requestAnimationFrame`; disabled under reduced motion and on touch devices (native momentum is better). Anchor links use `lenis.scrollTo` with the `--ease-out-expo` curve and a header offset.
- **Scroll progress:** a hairline bar or a chapter rail driven by a single `--progress` custom property on the root (written in one rAF-throttled listener). Prefer CSS `animation-timeline: scroll()` / `view()` where supported, with an `IntersectionObserver` or rAF fallback behind `@supports not (animation-timeline: view())`.
- **Parallax layers:** 2–4 depth layers per hero or feature, moving at different rates (`translate3d` driven by `--progress`; strictly small ranges, ±8% of the section height). Never parallax body text.
- **Pinned scenes:** `position: sticky` stages whose content changes with progress (step lists, product tours, the mechanic). Progress comes from the pure, tested function in `repo-wiring.md`.
- **Scrubbed transitions between sections:** the outgoing section scales down and dims (`scale(.96)`, `opacity .6`) as the next slides over it, or clip-path wipes reveal the next background. Adjacent sections must visibly *hand off*.
- **Horizontal drift:** a marquee or a band of oversized type that translates sideways against the scroll direction.
- **Velocity effects (one at most):** a skew/stretch on headings proportional to scroll velocity (clamped to ±4°), easing back to zero.
- **Sticky chrome that reacts:** the header compresses, gains a blurred backdrop or hides on scroll-down and returns on scroll-up. Use a `data-state` on the header, not inline style.

Budget: at most **one** scroll-scrubbed system per viewport. Two competing parallax systems is noise.

## 6. Interaction states (every interactive element, no exceptions)

Every `button`, `a`, input, card, tab, toggle and accordion defines **all** of: rest, hover, focus-visible, active/pressed, disabled, and (for forms and async) loading and success. Gate hover effects behind `@media (hover: hover) and (pointer: fine)`.

**Buttons / links**
- Press: `scale(.97)` in `--dur-instant`, released with `--ease-spring`.
- Hover: a fill that wipes in from the cursor's entry side (pseudo-element `scaleX`/clip-path), an arrow or icon that slides and is replaced, or a label that rolls (two stacked copies of the text sliding in a mask).
- Primary CTAs get a **magnetic** pull (§8) on fine pointers.
- Text links: an underline that draws in from the left and exits to the right.

**Cards**
- Hover lift: `translateY(-6px)` plus an increase in shadow *opacity* (animate a pseudo-element's opacity, never `box-shadow` itself).
- **Spotlight / glow that follows the pointer:** `--mx`/`--my` written on `pointermove`, consumed by a `radial-gradient` on a pseudo-element.
- **Tilt:** up to ±6° on `rotateX/Y`, `perspective: 900px`, with a gloss highlight; spring back on leave. Only on cards that benefit from it, not on all.
- Inner media scales (`1.06`) while the card lifts; the label or arrow slides in; neighbouring cards dim (`:has(:hover)` sibling dimming to `opacity .6`).
- Cards that open into a detail view use a **shared-element transition** (View Transitions API with `view-transition-name`, or `motion`'s `layoutId`), not a cut.

**Inputs and forms**
- Floating labels that rise on focus; a focus ring that animates (`outline-offset` or a drawn border).
- Validation: invalid fields shake once (`translateX` ±6px, 280 ms) and show the message sliding down; valid fields show a drawn check.
- Submit: the button morphs to a loading state, then to a success state (check mark draws, confetti/stamp/ink drop in the brand's idiom). The success panel **replaces the form with a choreographed transition**, not an instant swap.

**Navigation**
- Active-link indicator that **slides between** items (one absolutely positioned element animated with `transform`, not per-item underlines).
- Mobile menu: full-screen panel opening with a clip-path circle/inset from the toggle button; its links stagger in; the toggle icon morphs between states; body scroll locks; focus is trapped.
- In-page navigation updates the chapter rail and the document title/hash smoothly.

**Tabs, accordions, toggles, carousels**
- Content changes use directional slides (direction follows the index delta), with the old content leaving and the new entering simultaneously.
- Accordions animate height through `grid-template-rows: 0fr → 1fr` (with the inner `overflow: hidden`), not `height`.
- Carousels are drag-able with inertia on touch and show next/prev affordances that respond on hover.

**Cursor (optional, desktop only)**
A custom follower is allowed when it carries meaning for the brand (a "drag" or "view" label, a lens, a reticle). Never hide the native cursor on form fields or text; disable on touch; never the only affordance.

## 7. Ambient and "alive" motion

A page that is perfectly still between interactions reads as static. Add **restrained** idle motion, capped at three simultaneous continuous animations in view:

- a slow marquee or ticker of brand text (pauses on hover);
- a drifting gradient, grain shimmer or aurora (a pre-composed layer translating or rotating, not a `filter` animation);
- floating / breathing objects with long periods (6–14 s) and desynchronised phases;
- a live readout, ticking counter or timestamp tied to the concept;
- an SVG path or line that draws and re-draws.

Ambient animations pause when off-screen (`IntersectionObserver`) and when the tab is hidden, and stop completely under `prefers-reduced-motion`.

## 8. Reusable primitives (build these in `motion/`)

Folder isolation means every template carries its own copy. Create `src/app/(<slug>)/<slug>/motion/` with the following, pick the ones the motion map needs, and trim the rest:

| File | Purpose |
|---|---|
| `useReducedMotion.ts` | Subscribes to `prefers-reduced-motion`; returns a boolean (SSR-safe, default `true`-safe). |
| `useInView.ts` | One shared `IntersectionObserver` per template; `{ ref, inView }`; `once` option. |
| `Reveal.tsx` | `<Reveal as variant delay>`: sets `data-reveal={variant}` and `data-in`. Variants: `rise`, `mask`, `wipe`, `scale`, `draw`, `slide-left`, `slide-right`. |
| `SplitText.tsx` | Splits a string into lines/words/chars as `<span>`s with `--i`; preserves a visually hidden full string (`aria-label` on the wrapper, `aria-hidden` on the pieces). Splits by line only after fonts load (`document.fonts.ready`) and re-splits on resize. |
| `Magnetic.tsx` | Pointer-proximity pull (max ~14 px), eased by `lerp` in rAF, spring back on leave. Fine pointers only. |
| `TiltCard.tsx` | Tilt + spotlight (§6) via CSS variables written in rAF. |
| `Marquee.tsx` | Duplicated track, CSS `@keyframes` translate, `animation-play-state` toggled by hover/visibility. |
| `CountUp.tsx` | Eased number tween with tabular numerals and the final value in a hidden span. |
| `ScrollProgress.tsx` / `useScrollProgress.ts` | Writes `--progress` (0–1) for an element or the page; the offsets→progress maths is a **pure function in a `.ts` with a test**. |
| `SmoothScroll.tsx` | Lenis provider (client leaf); no-ops on touch and reduced motion; cleans up on unmount. |
| `PageTransition.tsx` (optional) | View-transition wrapper for multi-view templates. |

Primitive rules:
- Client components only as **leaves**; `page.tsx` and sections remain server components that pass children in.
- Pure math (lerp, clamp, progress, stagger index, tilt angles) lives in `motion/math.ts` with `math.test.ts`.
- Write pointer-driven values to CSS custom properties from one rAF loop; never `setState` on `pointermove` or `scroll`.
- Listeners are `{ passive: true }`; observers and rAF loops are cleaned up in the effect return.

Minimal `Reveal` pattern (CSS carries the visuals; React only toggles state):

```tsx
"use client";
import { useInView } from "./useInView";

export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, rootMargin: "0px 0px -12% 0px" });
  return (
    <Tag ref={ref} className={className} data-reveal={variant} data-in={inView}
      style={{ "--delay": `${delay}ms`, "--i": index ?? 0 } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
```

```css
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out),
                  clip-path var(--dur-slow) var(--ease-in-out);
                  transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="rise"]:not([data-in="true"])  { opacity: 0; transform: translateY(var(--reveal-shift)); }
  [data-reveal="wipe"]:not([data-in="true"])  { clip-path: inset(0 0 100% 0); }
  [data-reveal="scale"]:not([data-in="true"]) { opacity: 0; transform: scale(.94); }
  [data-reveal="draw"]:not([data-in="true"])  { transform: scaleX(0); transform-origin: left; }
}
```

Libraries: `motion`, `gsap` and `lenis` are already repo dependencies. Prefer **CSS first**, then `motion` for springs, gestures, `layoutId` and presence animations, then `gsap` (ScrollTrigger, timelines) for complex pinned scrubs. Import `gsap/ScrollTrigger` dynamically inside the client leaf, and list every package the template imports in `TEMPLATE_METADATA.dependencies` (registration point 3). Do not mix two libraries to animate the same element.

## 9. The motion map (a required DESIGN.md artifact)

Before writing sections, fill in this table for **every section and every reusable component**. A row with an empty cell means the element will ship static.

| Element | Enter (load or scroll) | Scroll-linked | Hover / focus | Press / state change | Exit / handoff |
|---|---|---|---|---|---|
| Header | drops in at 150 ms, items staggered | compresses + blur after 80 px | link underline draws, active pill slides | menu toggle morphs | hides on scroll-down |
| Hero | §4 sequence | background parallax, headline lifts and dims | CTA magnetic + fill wipe | CTA press scale | scales down as next section slides over |
| Feature cards | staggered rise + scale | ·· | tilt + spotlight, siblings dim | ·· | ·· |
| … | … | … | … | … | … |

## 10. Premium vs. cheap (self-check)

| Cheap | Premium |
|---|---|
| Everything fades in with the same 0.6 s ease | Each element has a role-specific reveal; staggers; masks and wipes |
| Hover = colour change | Hover = lift, light follows the pointer, media scales, siblings react |
| Sections stack with hard cuts | Sections hand off: scale/dim, wipes, sticky overlap |
| Linear or default `ease` | Custom curves from tokens; springs on press-release |
| Motion everywhere at the same intensity | One signature moment; the rest is quieter support |
| Animation decorates content | Animation explains the brand's central idea |
| Scroll jank, layout shift, content flash | `transform`/`opacity`, 60 fps, CLS 0, no flash of hidden content |
| Looks broken with motion off | Fully designed static state under reduced motion |

## 11. Guardrails

- **Performance.** Animate `transform`, `opacity`, `clip-path`. One-shot reveals may also use a short `filter: blur()` entrance (≤ 12 px, ≤ 800 ms, removed afterwards with `filter: none`). Never animate `width`, `height`, `top/left`, `box-shadow` or blur on continuously moving elements. Use `will-change` only on the elements animating *right now* (set on enter, clear on end) and never on more than ~10 at a time. Avoid layout reads (`getBoundingClientRect`) inside scroll handlers; cache measurements and refresh on resize.
- **Reduced motion.** Under `prefers-reduced-motion: reduce`: no reveals hidden, no parallax, no smooth scroll, no ambient loops, no magnetic/tilt. State changes become instant or opacity-only (≤ 120 ms). Heavy engines never mount (tested in e2e). The page must look **finished**, not stripped.
- **Touch.** No hover-dependent information. Replace hover effects with `:active` press feedback and in-view triggers. Disable cursor effects, magnetism and tilt (optionally gyro-free).
- **Interruptibility.** Reversible interactions (hover, menus, tabs, accordions) use CSS transitions keyed on state so they can reverse mid-flight. Never leave a half-run timeline stuck.
- **Accessibility.** Motion never carries information alone. Nothing flashes more than 3 times a second. Auto-playing motion longer than 5 s offers a pause control (marquees pause on hover and focus). Focus order and focus rings survive every animation. Text revealed by splitting remains readable by screen readers (see `SplitText`).
- **Lighthouse.** Motion code is split into client leaves, `gsap` and `lenis` are dynamically imported, CLS stays 0 (reserve boxes, animate transforms only), and TBT stays low: no animation setup in the first long task.
- **Taste.** Distance, duration and intensity scale with the element's importance. Small things move small and fast; big things move far and slow. If you can't say what a motion communicates, remove it.
