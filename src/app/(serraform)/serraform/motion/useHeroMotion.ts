'use client';

import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { animate, createAnimatable, createScope, createTimeline, stagger } from 'animejs';
import { CURTAIN_LEAD_MS } from './usePageMotion';

/**
 * Hero motion system (anime.js).
 *
 * Markup hooks, all inside the hero section:
 *   data-hm="eyebrow" | "rule" | "char" | "lead" | "cta" | "dock" | "dock-group" | "chip"
 *   data-hm-stretch (headline word whose width axis opens like a pleat)
 *   data-hm-mood  (room name label, re-animated when the room changes)
 *   data-hm-play  (play glyph, pulses while the fold demo runs)
 *   data-hm-reset (reset button)
 *
 * The section ships with data-hero-motion="pending"; CSS keeps the entrance targets hidden
 * in that state (motion-safe only, with a timed failsafe) so nothing flashes before hydration.
 */

interface HeroMotionOptions {
  roomCode: string;
  demoActive: boolean;
}

const MAGNET_PULL = 0.16;

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function hasFinePointer(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}

/** CSS transitions on a target smear a per-frame JS tween, so rest them while it runs. */
function holdTransitions(els: Iterable<HTMLElement>): () => void {
  const list = [...els];
  for (const el of list) el.style.transition = 'none';
  return () => {
    for (const el of list) el.style.removeProperty('transition');
  };
}

function spawnRipple(host: HTMLElement) {
  const ring = document.createElement('span');
  ring.setAttribute('aria-hidden', 'true');
  ring.className = 'srf-hm-ripple';
  ring.style.borderRadius = getComputedStyle(host).borderRadius;
  host.appendChild(ring);
  animate(ring, {
    scale: [1, 1.9],
    opacity: [0.55, 0],
    duration: 620,
    ease: 'outExpo',
    onComplete: () => ring.remove(),
  });
}

export function useHeroMotion(
  sectionRef: RefObject<HTMLElement | null>,
  { roomCode, demoActive }: HeroMotionOptions,
) {
  const motionOnRef = useRef(false);
  const firstRoomRef = useRef(true);

  // Entrance choreography + pointer feedback
  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.dataset.heroMotion = 'done';
      return;
    }
    motionOnRef.current = true;

    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const listeners: Array<() => void> = [];
    const listen = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      type: K,
      handler: (e: HTMLElementEventMap[K]) => void,
    ) => {
      el.addEventListener(type, handler as EventListener);
      listeners.push(() => el.removeEventListener(type, handler as EventListener));
    };

    const scope = createScope({ root }).add(() => {
      /* ---------- Entrance ---------- */
      const pending = root.dataset.heroMotion === 'pending';
      const probe = root.querySelector('[data-hm="char"]');
      const failsafeFired = pending && probe !== null && getComputedStyle(probe).opacity !== '0';
      if (failsafeFired) {
        // Hydrated after the CSS failsafe already revealed everything: skip the entrance.
        root.dataset.heroMotion = 'done';
      } else if (pending) {
        root.dataset.heroMotion = 'run';
        const chips = q('[data-hm="chip"]');
        const release = holdTransitions(chips);
        const tl = createTimeline({
          defaults: { ease: 'outExpo' },
          onComplete: () => {
            root.dataset.heroMotion = 'done';
            requestAnimationFrame(() => {
              tl.revert();
              release();
            });
          },
        });

        // Let the pleat curtain start gathering before the hero moves underneath it
        const curtain = document.querySelector('[data-curtain]');
        const lead =
          curtain && getComputedStyle(curtain).visibility !== 'hidden' ? CURTAIN_LEAD_MS - 120 : 0;

        tl.add('[data-hm="eyebrow"]', { opacity: [0, 1], x: [-14, 0], duration: 620 }, lead + 180)
          .add(
            '[data-hm="rule"]',
            { opacity: [0, 1], scaleX: [0, 1], duration: 760, ease: 'inOutQuart' },
            lead + 260,
          )
          // Letters stand up from the baseline crease, one pleat after another
          .add(
            '[data-hm="char"]',
            {
              opacity: { from: 0, to: 1, duration: 240, ease: 'out(2)' },
              rotateX: [-96, 0],
              y: ['0.22em', '0em'],
              duration: 1150,
              ease: 'outElastic(1, 0.82)',
              delay: stagger(30),
            },
            lead + 300,
          )
          // "room" literally makes room: its width axis opens past rest, then settles
          .add(
            '[data-hm-stretch]',
            {
              fontStretch: [
                { from: '50%', to: '142%', duration: 620, ease: 'inOutQuart' },
                { to: '100%', duration: 900, ease: 'outElastic(1, 0.55)' },
              ],
            },
            lead + 560,
          )
          .add('[data-hm="lead"]', { opacity: [0, 1], y: [18, 0], duration: 720 }, lead + 900)
          .add(
            '[data-hm="cta"]',
            {
              opacity: [0, 1],
              y: [16, 0],
              scale: [0.94, 1],
              duration: 820,
              ease: 'outBack(1.4)',
              delay: stagger(90),
            },
            lead + 1020,
          )
          .add(
            '[data-hm="dock"]',
            { opacity: [0, 1], y: [30, 0], duration: 860 },
            lead + 1100,
          )
          // Dock sections hinge down like pleats being let out
          .add(
            '[data-hm="dock-group"]',
            {
              perspective: [900, 900],
              rotateX: [-82, 0],
              duration: 1100,
              ease: 'outElastic(1, 0.8)',
              delay: stagger(85),
            },
            lead + 1160,
          )
          .add(
            '[data-hm="chip"]',
            {
              opacity: [0, 1],
              scale: [0.55, 1],
              duration: 520,
              ease: 'outBack(1.8)',
              delay: stagger(24),
            },
            lead + 1420,
          );
      }

      /* ---------- Control feedback (delegated) ---------- */
      const dock = root.querySelector<HTMLElement>('[data-hm="dock"]');
      if (dock) {
        listen(dock, 'click', (e) => {
          const target = e.target as HTMLElement;

          const chip = target.closest<HTMLElement>('[data-hm="chip"]');
          if (chip && dock.contains(chip)) {
            const release = holdTransitions([chip]);
            spawnRipple(chip);
            animate(chip, {
              scale: [
                { to: 0.84, duration: 90, ease: 'out(2)' },
                { to: 1, duration: 620, ease: 'outElastic(1, 0.55)' },
              ],
              onComplete: (self) => {
                self.revert();
                release();
              },
            });
            return;
          }

          const reset = target.closest<HTMLElement>('[data-hm-reset]');
          if (reset && dock.contains(reset)) {
            const icon = reset.querySelector('svg');
            if (icon) {
              animate(icon, {
                rotate: [0, -360],
                duration: 760,
                ease: 'outExpo',
                onComplete: (self) => self.revert(),
              });
            }
            const chips = q('[data-hm="chip"]');
            const release = holdTransitions(chips);
            animate(chips, {
              scale: [
                { to: 0.86, duration: 110, ease: 'out(2)' },
                { to: 1, duration: 460, ease: 'outBack(2)' },
              ],
              delay: stagger(16),
              onComplete: (self) => {
                self.revert();
                release();
              },
            });
          }
        });
      }

      /* ---------- Headline: "room" opens wider while the pointer rests on it ---------- */
      const stretchWord = root.querySelector<HTMLElement>('[data-hm-stretch]');
      const headline = stretchWord?.closest('h1');
      if (stretchWord && headline && hasFinePointer()) {
        const openTo = (pct: number, bounce: number) => {
          if (root.dataset.heroMotion !== 'done') return;
          animate(stretchWord, {
            fontStretch: `${pct}%`,
            duration: 900,
            ease: `outElastic(1, ${bounce})`,
          });
        };
        listen(headline as HTMLElement, 'pointerenter', () => openTo(136, 0.5));
        listen(headline as HTMLElement, 'pointerleave', () => openTo(100, 0.7));
      }

      /* ---------- Magnetic call-to-action pull (mouse only) ---------- */
      if (hasFinePointer()) {
        for (const cta of q('[data-hm="cta"]')) {
          // Created on first use so it never competes with the entrance tween on the same node.
          let pull: ReturnType<typeof createAnimatable> | null = null;
          listen(cta, 'pointermove', (e) => {
            if (e.pointerType !== 'mouse' || root.dataset.heroMotion !== 'done') return;
            pull ??= createAnimatable(cta, { x: 420, y: 420, ease: 'out(4)' });
            const rect = cta.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            pull.x(Math.max(-7, Math.min(7, dx * MAGNET_PULL)));
            pull.y(Math.max(-5, Math.min(5, dy * MAGNET_PULL)));
          });
          listen(cta, 'pointerleave', () => {
            pull?.x(0);
            pull?.y(0);
          });
        }
      }
    });

    return () => {
      for (const off of listeners) off();
      scope.revert();
      if (root.dataset.heroMotion === 'run') root.dataset.heroMotion = 'pending';
      motionOnRef.current = false;
    };
  }, [sectionRef]);

  // Room change: the mood label rolls over and the accent rule redraws
  useEffect(() => {
    if (firstRoomRef.current) {
      firstRoomRef.current = false;
      return;
    }
    const root = sectionRef.current;
    if (!root || !motionOnRef.current || root.dataset.heroMotion !== 'done') return;

    const mood = root.querySelector<HTMLElement>('[data-hm-mood]');
    const rule = root.querySelector<HTMLElement>('[data-hm="rule"]');
    const running: Array<ReturnType<typeof animate>> = [];
    if (mood) {
      running.push(
        animate(mood, {
          opacity: [0, 1],
          y: ['90%', '0%'],
          duration: 640,
          ease: 'outExpo',
          onComplete: (self) => self.revert(),
        }),
      );
    }
    if (rule) {
      running.push(
        animate(rule, {
          scaleX: [0, 1],
          duration: 820,
          ease: 'inOutQuart',
          onComplete: (self) => self.revert(),
        }),
      );
    }
    return () => {
      for (const anim of running) anim.revert();
    };
  }, [roomCode, sectionRef]);

  // Fold demo: the play glyph breathes while the divider is unfolding
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || !demoActive || !motionOnRef.current) return;
    const glyphs = root.querySelectorAll('[data-hm-play]');
    if (!glyphs.length) return;
    const pulse = animate(glyphs, {
      scale: [1, 1.28],
      opacity: [1, 0.6],
      duration: 520,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
    });
    return () => {
      pulse.revert();
    };
  }, [demoActive, sectionRef]);
}
