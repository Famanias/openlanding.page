'use client';

import { useLayoutEffect, type RefObject } from 'react';
import {
  animate,
  createScope,
  createTimeline,
  createTimer,
  onScroll,
  splitText,
  stagger,
  svg,
  utils,
} from 'animejs';
import { deriveFold } from '../fold/geometry';

/**
 * SERRAFORM page motion system (anime.js).
 *
 * One idea runs through all of it: everything behaves like the divider. Type hinges open
 * along a crease, panels unfold like pleats, lines are drawn like a plan, and scrolling
 * opens and closes folds.
 *
 * Declarative hooks (played once when scrolled into view):
 *   data-m="heading"   characters hinge up from the baseline crease
 *   data-m="lines"     paragraph lines rise out of masks
 *   data-m="scramble"  mono captions resolve out of pleat glyphs
 *   data-m="rule"      hairline draws from the left
 *   data-m="unfold"    [data-m-item] children hinge open like pleats (data-m-fx="tick" for ruler ticks)
 *   data-m="reveal"    block opens like a curtain
 *   data-m="draw"      [data-draw] strokes draw
 *   data-m="count"     number counts up to data-count
 *   data-m="frame"     diagram frame opens from its centre crease, then plays data-diagram
 *
 * Scroll-scrubbed pieces: [data-crease], [data-trifold], [data-teeth], [data-plan],
 * [data-wordmark]. Continuous pieces: [data-ticker], [data-curtain], FAQ accordion.
 */

/** Time the pleat curtain needs before the page underneath should start moving. */
export const CURTAIN_LEAD_MS = 1050;

const SCRAMBLE_GLYPHS = '/\\|<>^v-_=+';

export function motionAllowed(): boolean {
  return !(
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Drop the inline styles a finished reveal leaves behind so the stylesheet owns the element again. */
function clearStyles(targets: Iterable<Element>, ...props: string[]) {
  for (const target of targets) {
    for (const prop of props) (target as HTMLElement).style.removeProperty(prop);
  }
}

function hasFinePointer(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}

/* -------------------------------------------------------------------------- */
/* One-shot reveals                                                            */
/* -------------------------------------------------------------------------- */

function playHeading(el: HTMLElement, delay = 0) {
  const split = splitText(el, { words: true, chars: true });
  for (const word of split.words as HTMLElement[]) {
    word.style.perspective = '700px';
  }
  const chars = split.chars as HTMLElement[];
  for (const ch of chars) {
    ch.style.transformOrigin = '50% 100%';
    ch.style.backfaceVisibility = 'hidden';
  }
  utils.set(chars, { opacity: 0, rotateX: -94, y: '0.18em' });
  el.dataset.mIn = '';
  animate(chars, {
    opacity: { to: 1, duration: 260, ease: 'out(2)' },
    rotateX: 0,
    y: 0,
    duration: 1050,
    ease: 'outExpo',
    delay: stagger(24, { start: delay }),
    onComplete: () => split.revert(),
  });
}

function playLines(el: HTMLElement, delay = 0) {
  // Line boxes are only known once the splitter has measured, so the reveal runs as its effect
  const split = splitText(el, { lines: { wrap: 'clip' } });
  let played = false;
  split.addEffect((self: { lines: HTMLElement[] }) => {
    if (played) return;
    played = true;
    const lines = self.lines;
    if (!lines.length) {
      el.dataset.mIn = '';
      return;
    }
    for (const line of lines) line.style.transformOrigin = '0% 100%';
    utils.set(lines, { y: '108%', rotate: 2.5 });
    el.dataset.mIn = '';
    animate(lines, {
      y: '0%',
      rotate: 0,
      duration: 900,
      ease: 'outExpo',
      delay: stagger(70, { start: delay }),
      onComplete: () => split.revert(),
    });
  });
}

function playScramble(el: HTMLElement, delay = 0) {
  const finalText = el.textContent ?? '';
  const total = finalText.length;
  if (!total) {
    el.dataset.mIn = '';
    return;
  }
  const state = { p: 0 };
  const render = () => {
    const settled = Math.floor(state.p * total);
    let out = finalText.slice(0, settled);
    for (let i = settled; i < total; i += 1) {
      const ch = finalText[i];
      out +=
        ch === ' ' || i > settled + 5
          ? ' '
          : SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
    }
    el.textContent = out;
  };
  el.setAttribute('aria-label', finalText);
  // Hold the box so the caption never reflows while it resolves
  el.style.whiteSpace = 'pre';
  render();
  el.dataset.mIn = '';
  animate(state, {
    p: 1,
    duration: Math.min(1100, 260 + total * 22),
    delay,
    ease: 'inOut(2)',
    onUpdate: render,
    onComplete: () => {
      el.textContent = finalText;
      el.style.removeProperty('white-space');
      el.removeAttribute('aria-label');
    },
  });
}

function playRule(el: HTMLElement, delay = 0) {
  utils.set(el, { scaleX: 0 });
  el.dataset.mIn = '';
  animate(el, {
    scaleX: 1,
    duration: 1100,
    delay,
    ease: 'inOutQuart',
    onComplete: () => clearStyles([el], 'transform'),
  });
}

function playUnfold(el: HTMLElement, delay = 0) {
  const nested = Array.from(el.querySelectorAll<HTMLElement>('[data-m-item]'));
  const items = nested.length ? nested : [el];
  const fx = el.dataset.mFx;

  if (fx === 'tick') {
    utils.set(items, { scaleY: 0, opacity: 0 });
    el.dataset.mIn = '';
    animate(items, {
      scaleY: [
        { to: 1.5, duration: 260, ease: 'out(3)' },
        { to: 1, duration: 420, ease: 'outElastic(1, 0.6)' },
      ],
      opacity: { to: 1, duration: 120 },
      delay: stagger(38, { start: delay }),
      onComplete: () => clearStyles(items, 'transform', 'opacity'),
    });
    return;
  }

  // Pleats alternate: odd items hinge forward, even items hinge back
  items.forEach((item, i) => {
    utils.set(item, { opacity: 0, perspective: 900, rotateX: i % 2 ? 78 : -78, y: 26 });
  });
  for (const [i, item] of items.entries()) {
    item.style.transformOrigin = i % 2 ? '50% 100%' : '50% 0%';
  }
  el.dataset.mIn = '';
  animate(items, {
    opacity: { to: 1, duration: 320, ease: 'out(2)' },
    rotateX: 0,
    y: 0,
    duration: 1100,
    ease: 'outElastic(1, 0.78)',
    delay: stagger(95, { start: delay }),
    onComplete: () => clearStyles(items, 'transform', 'opacity', 'transform-origin'),
  });
}

function playReveal(el: HTMLElement, delay = 0) {
  utils.set(el, { clipPath: 'inset(0% 0% 100% 0%)', y: 48 });
  el.dataset.mIn = '';
  animate(el, {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    duration: 1200,
    delay,
    ease: 'outExpo',
    onComplete: () => clearStyles([el], 'clip-path', 'transform'),
  });
}

function playDraw(el: Element, delay = 0, duration = 1100) {
  const strokes = el.matches('[data-draw]')
    ? [el]
    : Array.from(el.querySelectorAll('[data-draw]'));
  if (!strokes.length) return;
  const drawables = svg.createDrawable(strokes as unknown as SVGGeometryElement[]);
  utils.set(drawables, { draw: '0 0' });
  if (el instanceof HTMLElement || el instanceof SVGElement) el.dataset.mIn = '';
  animate(drawables, {
    draw: '0 1',
    duration,
    ease: 'inOutQuart',
    delay: stagger(110, { start: delay }),
  });
}

function playCount(el: HTMLElement, delay = 0) {
  const target = Number(el.dataset.count ?? '0');
  const suffix = el.dataset.suffix ?? '';
  const state = { v: 0 };
  const fmt = new Intl.NumberFormat('en-US');
  const render = () => {
    el.textContent = `${fmt.format(Math.round(state.v))}${suffix}`;
  };
  render();
  el.dataset.mIn = '';
  animate(state, {
    v: target,
    duration: 1500,
    delay,
    ease: 'outExpo',
    onUpdate: render,
    onComplete: render,
  });
}

function playDiagram(frame: HTMLElement) {
  const kind = frame.dataset.diagram;
  const q = <T extends Element = SVGElement>(sel: string) =>
    Array.from(frame.querySelectorAll<T>(sel));

  if (kind === 'pleat') {
    const faces = q('[data-face]');
    utils.set(faces, { translateY: 230 });
    utils.set(q('[data-fade]'), { opacity: 0 });
    createTimeline({ defaults: { ease: 'outExpo' } })
      .add(faces, { translateY: 0, duration: 1100, delay: stagger(130) }, 250)
      .add(q('[data-fade]'), { opacity: 1, duration: 700, delay: stagger(120) }, 900);
    playDraw(frame, 900, 800);
    return;
  }

  if (kind === 'support') {
    const panel = q('[data-panel]');
    const base = q('[data-base]');
    utils.set(panel, { translateY: -170 });
    utils.set(base, { scaleX: 0 });
    utils.set(q('[data-fade]'), { opacity: 0 });
    createTimeline({ defaults: { ease: 'outExpo' } })
      .add(base, { scaleX: 1, duration: 900 }, 300)
      .add(panel, { translateY: 0, duration: 900, ease: 'outBounce' }, 620)
      .add(q('[data-fade]'), { opacity: 1, duration: 500 }, 1300);
    playDraw(frame, 250, 900);
    return;
  }

  // plan: hinge dots pop once the frame is open; the folding itself is scroll-scrubbed
  const dots = q('[data-hinge]');
  utils.set(dots, { scale: 0 });
  animate(dots, {
    scale: [
      { to: 1.9, duration: 220, ease: 'out(3)' },
      { to: 1, duration: 380, ease: 'outElastic(1, 0.6)' },
    ],
    delay: stagger(34, { start: 420 }),
  });
  playDraw(frame, 200, 1000);
}

function playFrame(el: HTMLElement, delay = 0) {
  utils.set(el, { clipPath: 'inset(0% 50% 0% 50% round 8px)' });
  el.dataset.mIn = '';
  animate(el, {
    clipPath: 'inset(0% 0% 0% 0% round 8px)',
    duration: 1300,
    delay,
    ease: 'inOutQuart',
    onComplete: () => clearStyles([el], 'clip-path'),
  });
  playDiagram(el);
}

function play(el: HTMLElement) {
  const delay = Number(el.dataset.mDelay ?? '0');
  switch (el.dataset.m) {
    case 'heading':
      return playHeading(el, delay);
    case 'lines':
      return playLines(el, delay);
    case 'scramble':
      return playScramble(el, delay);
    case 'rule':
      return playRule(el, delay);
    case 'unfold':
      return playUnfold(el, delay);
    case 'reveal':
      return playReveal(el, delay);
    case 'draw':
      return playDraw(el, delay);
    case 'count':
      return playCount(el, delay);
    case 'frame':
      return playFrame(el, delay);
    default:
      el.dataset.mIn = '';
  }
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export function usePageMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!motionAllowed()) return;

    const cleanups: Array<() => void> = [];
    const listen = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Window,
      type: K | 'scroll' | 'resize',
      handler: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions,
    ) => {
      el.addEventListener(type, handler as EventListener, opts);
      cleanups.push(() => el.removeEventListener(type, handler as EventListener, opts));
    };
    const q = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel));
    const desktop = window.matchMedia('(min-width: 768px)').matches;

    root.classList.add('srf-motion-ready');
    cleanups.push(() => root.classList.remove('srf-motion-ready'));

    const scope = createScope({ root }).add(() => {
      /* ---------- Pleat curtain ---------- */
      const curtain = root.querySelector<HTMLElement>('[data-curtain]');
      const hasCurtain = curtain !== null && getComputedStyle(curtain).visibility !== 'hidden';
      const lead = hasCurtain ? CURTAIN_LEAD_MS : 0;

      if (curtain && hasCurtain) {
        curtain.dataset.curtain = 'run';
        const panels = Array.from(curtain.querySelectorAll<HTMLElement>('[data-curtain-panel]'));
        const core = curtain.querySelector<HTMLElement>('[data-curtain-core]');
        const word = curtain.querySelector<HTMLElement>('[data-curtain-word]');
        const count = curtain.querySelector<HTMLElement>('[data-curtain-count]');
        const zig = svg.createDrawable(
          Array.from(curtain.querySelectorAll('[data-draw]')) as unknown as SVGGeometryElement[],
        );
        const counter = { n: 0 };
        utils.set(zig, { draw: '0 0' });

        const tl = createTimeline({
          onComplete: () => {
            curtain.dataset.curtain = 'done';
          },
        });
        tl.add(zig, { draw: '0 1', duration: 820, ease: 'inOutQuart' }, 0);
        if (word) {
          tl.add(
            word,
            {
              fontStretch: ['50%', '150%'],
              letterSpacing: ['0.3em', '-0.02em'],
              opacity: [0, 1],
              duration: 900,
              ease: 'inOutExpo',
            },
            0,
          );
        }
        if (count) {
          tl.add(
            counter,
            {
              n: 16,
              duration: 820,
              ease: 'inOut(2)',
              onUpdate: () => {
                count.textContent = String(Math.round(counter.n)).padStart(2, '0');
              },
            },
            0,
          );
        }
        if (core) {
          tl.add(
            core,
            { opacity: 0, scale: 1.08, duration: 300, ease: 'in(2)' },
            CURTAIN_LEAD_MS - 180,
          );
        }
        // Panels close up into their creases, pair by pair, like the divider being gathered
        tl.add(
          panels,
          {
            scaleX: 0,
            duration: 780,
            ease: 'inOutQuart',
            delay: stagger(26, { from: 'center' }),
          },
          CURTAIN_LEAD_MS - 100,
        );
      }

      /* ---------- Header: mark draws, nav drops in, crease tracks page progress ---------- */
      const header = root.querySelector<HTMLElement>('[data-header]');
      if (header) {
        const items = Array.from(header.querySelectorAll<HTMLElement>('[data-header-item]'));
        const mark = svg.createDrawable(
          Array.from(header.querySelectorAll('[data-draw]')) as unknown as SVGGeometryElement[],
        );
        utils.set(items, { y: -34, opacity: 0 });
        utils.set(mark, { draw: '0 0' });
        createTimeline({ defaults: { ease: 'outExpo' } })
          .add(mark, { draw: '0 1', duration: 1100, ease: 'inOutQuart' }, lead)
          .add(
            items,
            {
              y: 0,
              opacity: 1,
              duration: 900,
              delay: stagger(70),
              onComplete: () => clearStyles(items, 'transform', 'opacity'),
            },
            lead + 80,
          );
      }

      const crease = root.querySelector<HTMLElement>('[data-crease]');
      if (crease) {
        utils.set(crease, { scaleX: 0 });
        animate(crease, {
          scaleX: 1,
          ease: 'linear',
          duration: 1000,
          autoplay: onScroll({
            target: root,
            enter: { target: 'top', container: 'top' },
            leave: { target: 'bottom', container: 'bottom' },
            sync: 0.35,
          }),
        });
      }

      /* ---------- Velocity ticker ---------- */
      let scrollVelocity = 0;
      let lastScrollY = window.scrollY;
      const ticker = root.querySelector<HTMLElement>('[data-ticker]');
      const track = ticker?.querySelector<HTMLElement>('[data-ticker-track]');
      if (ticker && track) {
        let x = 0;
        let dir = -1;
        let skew = 0;
        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        io.observe(ticker);
        cleanups.push(() => io.disconnect());
        let lastTick = performance.now();
        createTimer({
          onUpdate: () => {
            const now = performance.now();
            const dt = Math.max(0, Math.min(64, now - lastTick)) / 1000;
            lastTick = now;
            if (dt === 0) return;
            const y = window.scrollY;
            const raw = (y - lastScrollY) / Math.max(dt, 0.001);
            lastScrollY = y;
            scrollVelocity += (raw - scrollVelocity) * Math.min(1, dt * 8);
            if (!visible) return;
            if (Math.abs(scrollVelocity) > 40) dir = scrollVelocity > 0 ? -1 : 1;
            const half = track.scrollWidth / 2;
            if (half <= 0) return;
            x += dir * (70 + Math.min(1400, Math.abs(scrollVelocity)) * 0.55) * dt;
            if (x <= -half) x += half;
            if (x > 0) x -= half;
            const targetSkew = Math.max(-14, Math.min(14, scrollVelocity * -0.012));
            skew += (targetSkew - skew) * Math.min(1, dt * 7);
            track.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
          },
        });
      }

      /* ---------- Tri-fold chapters: the three cards open flat as you scroll in ---------- */
      const trifold = root.querySelector<HTMLElement>('[data-trifold]');
      if (trifold) {
        const cards = Array.from(trifold.querySelectorAll<HTMLElement>('[data-trifold-panel]'));
        const axis = desktop ? 'rotateY' : 'rotateX';
        const tl = createTimeline({
          defaults: { ease: 'linear' },
          autoplay: onScroll({
            target: trifold,
            enter: { target: 'top', container: '96%' },
            leave: { target: 'top', container: '38%' },
            sync: 0.5,
          }),
        });
        cards.forEach((card, i) => {
          const even = i % 2 === 0;
          card.style.transformOrigin = desktop
            ? even
              ? '100% 50%'
              : '0% 50%'
            : even
              ? '50% 0%'
              : '50% 100%';
          const from = (desktop ? (even ? 1 : -1) : even ? -1 : 1) * 84;
          utils.set(card, { perspective: 1400, [axis]: from, opacity: 0.15 });
          tl.add(
            card,
            {
              [axis]: 0,
              opacity: { to: 1, duration: 500 },
              duration: 1000,
              ease: 'out(2)',
            },
            i * 180,
          );
        });
      }

      /* ---------- Pleated edge between the light page and the dark construction room ---------- */
      for (const teeth of q('[data-teeth]')) {
        const section = teeth.parentElement ?? teeth;
        utils.set(teeth, { scaleY: 1 });
        animate(teeth, {
          scaleY: 0,
          ease: 'inOut(2)',
          duration: 1000,
          autoplay: onScroll({
            target: section,
            enter: { target: 'top', container: 'bottom' },
            leave: { target: 'top', container: '30%' },
            sync: 0.4,
          }),
        });
      }

      /* ---------- Plan diagram folds from a flat line into the zigzag as it scrolls by ---------- */
      const plan = root.querySelector<SVGSVGElement>('[data-plan]');
      if (plan) {
        const poly = plan.querySelector<SVGPolygonElement>('[data-plan-poly]');
        const dots = Array.from(plan.querySelectorAll<SVGCircleElement>('[data-hinge]'));
        const label = plan.querySelector<SVGTSpanElement>('[data-plan-open]');
        const w = 520;
        const h = 220;
        const state = { o: 100 };
        const render = () => {
          const pose = deriveFold(state.o);
          const scale = 168 + (100 - state.o) * 1.24;
          const pt = (p: { x: number; z: number }) =>
            `${(w / 2 + p.x * scale).toFixed(1)},${(h / 2 + p.z * scale).toFixed(1)}`;
          poly?.setAttribute(
            'points',
            [...pose.front.map(pt), ...[...pose.back].reverse().map(pt)].join(' '),
          );
          pose.hinges.forEach((p, i) => {
            const dot = dots[i];
            if (!dot) return;
            dot.setAttribute('cx', (w / 2 + p.x * scale).toFixed(1));
            dot.setAttribute('cy', (h / 2 + p.z * scale).toFixed(1));
          });
          if (label) label.textContent = `${Math.round(state.o)}% open`;
        };
        render();
        animate(state, {
          o: 50,
          ease: 'linear',
          duration: 1000,
          onUpdate: render,
          autoplay: onScroll({
            target: plan,
            enter: { target: 'top', container: '88%' },
            leave: { target: 'bottom', container: '52%' },
            sync: 0.45,
          }),
        });
      }

      /* ---------- Footer wordmark: stretches open like the divider, then follows the cursor ---------- */
      const wordmark = root.querySelector<HTMLElement>('[data-wordmark]');
      if (wordmark) {
        const letters = Array.from(wordmark.querySelectorAll<HTMLElement>('span'));
        const REST = 112;
        const fit = () => {
          wordmark.style.fontSize = '100px';
          wordmark.style.fontStretch = `${REST}%`;
          const natural = wordmark.scrollWidth;
          const room = wordmark.parentElement?.clientWidth ?? natural;
          if (natural > 0) wordmark.style.fontSize = `${((100 * room) / natural) * 0.985}px`;
          wordmark.style.removeProperty('font-stretch');
        };
        fit();
        document.fonts?.ready.then(fit).catch(() => undefined);
        listen(window, 'resize', fit, { passive: true });

        animate(wordmark, {
          fontStretch: ['50%', `${REST}%`],
          ease: 'out(2)',
          duration: 1000,
          autoplay: onScroll({
            target: wordmark,
            enter: { target: 'top', container: 'bottom' },
            leave: { target: 'bottom', container: 'bottom' },
            sync: 0.4,
          }),
        });

        if (hasFinePointer()) {
          const current = letters.map(() => REST);
          const target = letters.map(() => REST);
          let hovering = false;
          const settle = createTimer({
            autoplay: false,
            onUpdate: () => {
              let moving = false;
              letters.forEach((letter, i) => {
                current[i] += (target[i] - current[i]) * 0.14;
                if (Math.abs(target[i] - current[i]) > 0.15) moving = true;
                letter.style.fontStretch = `${current[i].toFixed(1)}%`;
              });
              if (!moving && !hovering) {
                for (const letter of letters) letter.style.removeProperty('font-stretch');
                settle.pause();
              }
            },
          });
          listen(wordmark, 'pointermove', (e) => {
            hovering = true;
            const gains = letters.map((letter) => {
              const r = letter.getBoundingClientRect();
              const d = Math.abs(e.clientX - (r.left + r.width / 2)) / Math.max(1, r.width * 1.6);
              return Math.exp(-d * d);
            });
            const mean = gains.reduce((a, b) => a + b, 0) / gains.length;
            // Width is conserved: the pleat under the cursor opens, its neighbours gather
            gains.forEach((g, i) => {
              target[i] = Math.max(50, Math.min(150, REST + (g - mean) * 62));
            });
            settle.play();
          });
          listen(wordmark, 'pointerleave', () => {
            hovering = false;
            target.fill(REST);
            settle.play();
          });
        }
      }

      /* ---------- FAQ: a real accordion ---------- */
      const faqRuns = new WeakMap<Element, Array<{ cancel: () => unknown }>>();
      for (const summary of q('.srf-faq-summary')) {
        listen(summary, 'click', (e) => {
          const item = summary.parentElement as HTMLDetailsElement | null;
          const panel = item?.querySelector<HTMLElement>('.srf-faq-panel');
          const body = panel?.firstElementChild as HTMLElement | null;
          if (!item || !panel || !body) return;
          e.preventDefault();

          // Latest input wins: stop whatever this item was doing and carry on from where it is
          for (const run of faqRuns.get(item) ?? []) run.cancel();
          const interrupted = item.dataset.closing !== undefined;
          body.style.transformOrigin = '50% 0%';

          if (!item.open || interrupted) {
            delete item.dataset.closing;
            item.open = true;
            const from = interrupted ? panel.getBoundingClientRect().height : 0;
            panel.style.height = 'auto';
            const to = panel.getBoundingClientRect().height;
            panel.style.height = `${from}px`;
            if (!interrupted) utils.set(body, { perspective: 800, rotateX: -72, opacity: 0 });
            faqRuns.set(item, [
              animate(panel, {
                height: to,
                duration: 760,
                ease: 'outExpo',
                onComplete: () => panel.style.removeProperty('height'),
              }),
              // The answer hinges down from the question's crease
              animate(body, {
                rotateX: 0,
                opacity: 1,
                duration: 980,
                ease: 'outElastic(1, 0.8)',
                onComplete: () => body.removeAttribute('style'),
              }),
            ]);
          } else {
            item.dataset.closing = '';
            panel.style.height = `${panel.getBoundingClientRect().height}px`;
            if (!body.style.transform) utils.set(body, { perspective: 800, rotateX: 0 });
            faqRuns.set(item, [
              animate(body, { rotateX: -64, opacity: 0, duration: 380, ease: 'in(2)' }),
              animate(panel, {
                height: 0,
                duration: 460,
                ease: 'inOutQuart',
                onComplete: () => {
                  item.open = false;
                  delete item.dataset.closing;
                  panel.style.removeProperty('height');
                  body.removeAttribute('style');
                },
              }),
            ]);
          }
        });
      }

      /* ---------- One-shot reveals ---------- */
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.unobserve(entry.target);
            play(entry.target as HTMLElement);
          }
        },
        { threshold: 0.18, rootMargin: '0px 0px -7% 0px' },
      );
      for (const el of q('[data-m]:not([data-m-in])')) io.observe(el);
      cleanups.push(() => io.disconnect());
    });

    return () => {
      for (const off of cleanups) off();
      scope.revert();
    };
  }, [rootRef]);
}
