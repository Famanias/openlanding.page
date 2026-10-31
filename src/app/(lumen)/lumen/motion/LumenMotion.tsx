'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { scrollToLumen } from './scroll';

interface LumenMotionProps {
  rootRef: RefObject<HTMLDivElement | null>;
  onHeroActivityChange?: (active: boolean) => void;
}

export function LumenMotion({ rootRef, onHeroActivityChange }: LumenMotionProps) {
  const callbackRef = useRef(onHeroActivityChange);
  useEffect(() => { callbackRef.current = onHeroActivityChange; }, [onHeroActivityChange]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const wide = matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const hero = root.querySelector<HTMLElement>('#workspace-hero');
    const statement = root.querySelector<HTMLElement>('[data-lm-statement]');
    const header = root.querySelector<HTMLElement>('.lumen-header');
    const atmosphere = root.querySelector<HTMLElement>('[data-testid="page-atmosphere"]');
    const chapters = Array.from(root.querySelectorAll<HTMLElement>('main section[id]'));
    const progressLine = root.querySelector<HTMLElement>('.lm-nav-progress');
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-lm-reveal], [data-lm-heading]'));
    let frame = 0;
    let disposed = false;
    let heroTop = 0;
    let heroHeight = 1;
    let statementTop = 0;
    let statementHeight = 1;
    let maxScroll = 1;
    let chapterTops: number[] = [];
    let hoverTarget: HTMLElement | null = null;
    let hoverBounds: DOMRect | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let hoverFrame = 0;

    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.lmIn = 'true';
        el.removeAttribute('data-lm-armed');
        reveal.unobserve(el);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.lmPlaying = String(entry.isIntersecting);
    });
    root.querySelectorAll('[data-lm-ambient]').forEach((el) => ambient.observe(el));
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry) callbackRef.current?.(entry.isIntersecting);
    }, { rootMargin: '200px' });
    if (hero) heroObserver.observe(hero);

    const measure = () => {
      const y = scrollY;
      heroTop = (hero?.getBoundingClientRect().top ?? 0) + y;
      heroHeight = hero?.offsetHeight ?? innerHeight;
      statementTop = (statement?.getBoundingClientRect().top ?? 0) + y;
      statementHeight = statement?.offsetHeight ?? 1;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      chapterTops = chapters.map((el) => el.getBoundingClientRect().top + y);
    };
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const paint = () => {
      frame = 0;
      const y = scrollY;
      const progress = clamp(y / maxScroll);
      progressLine?.style.setProperty('transform', 'scaleX(' + progress.toFixed(4) + ')');
      if (atmosphere) atmosphere.dataset.scrollProgress = progress.toFixed(2);
      header?.setAttribute('data-compact', String(y > 48));
      const out = motion.matches && wide.matches ? clamp((y - heroTop) / Math.max(1, heroHeight - innerHeight)) : 0;
      hero?.style.setProperty('--lm-departure', out.toFixed(4));
      const read = motion.matches ? clamp((y + innerHeight * 0.82 - statementTop) / (statementHeight + innerHeight * 0.2)) : 1;
      statement?.style.setProperty('--lm-reading', read.toFixed(4));
      let active = chapters[0]?.id;
      chapterTops.forEach((top, i) => { if (top < y + innerHeight * 0.4) active = chapters[i].id; });
      root.querySelectorAll<HTMLAnchorElement>('.lm-nav-link').forEach((link) => {
        const current = link.hash === '#' + active;
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const resize = () => { measure(); schedule(); };
    const mode = () => {
      resetHover();
      root.dataset.lmMotion = motion.matches ? 'live' : 'static';
      reveal.disconnect();
      targets.forEach((el) => {
        const seen = el.dataset.lmIn === 'true';
        if (!motion.matches || seen || el.getBoundingClientRect().top < innerHeight * 0.94) {
          el.dataset.lmIn = 'true';
          el.removeAttribute('data-lm-armed');
        } else {
          reveal.observe(el);
          el.dataset.lmArmed = 'true';
        }
      });
      resize();
    };
    const visibility = () => { root.dataset.lmHidden = String(document.hidden); };
    const settleFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const ancestor = target.closest<HTMLElement>('[data-lm-armed]');
      if (ancestor) { ancestor.dataset.lmIn = 'true'; ancestor.removeAttribute('data-lm-armed'); }
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hash.length < 2) return;
      let id: string;
      try { id = decodeURIComponent(anchor.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      scrollToLumen(target);
      history.pushState(null, '', anchor.hash);
    };
    const resetHover = () => {
      if (!hoverTarget) return;
      const plane = hoverTarget.querySelector<HTMLElement>('.lm-workspace-plane');
      plane?.style.removeProperty('--tilt-x'); plane?.style.removeProperty('--tilt-y');
      ['--lm-rx', '--lm-ry', '--lm-mx', '--lm-my'].forEach((name) => hoverTarget?.style.removeProperty(name));
      hoverTarget = null;
      hoverBounds = null;
    };
    const paintPointer = () => {
      hoverFrame = 0;
      if (!hoverTarget || !hoverBounds) return;
      const x = clamp((pointerX - hoverBounds.left) / hoverBounds.width);
      const y = clamp((pointerY - hoverBounds.top) / hoverBounds.height);
      hoverTarget.style.setProperty('--lm-light-x', (x * 100).toFixed(1) + '%');
      hoverTarget.style.setProperty('--lm-light-y', (y * 100).toFixed(1) + '%');
      if (hoverTarget.matches('.lm-workspace-stage')) {
        const plane = hoverTarget.querySelector<HTMLElement>('.lm-workspace-plane');
        plane?.style.setProperty('--tilt-x', (2 + (0.5 - y) * 5).toFixed(2) + 'deg');
        plane?.style.setProperty('--tilt-y', (-4 + (x - 0.5) * 6).toFixed(2) + 'deg');
      } else if (hoverTarget.matches('.lm-hover-card, .lm-cover')) {
        hoverTarget.style.setProperty('--lm-rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
        hoverTarget.style.setProperty('--lm-ry', ((x - 0.5) * 5).toFixed(2) + 'deg');
      } else {
        hoverTarget.style.setProperty('--lm-mx', ((x - 0.5) * 9).toFixed(2) + 'px');
        hoverTarget.style.setProperty('--lm-my', ((y - 0.5) * 7).toFixed(2) + 'px');
      }
    };
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || !motion.matches || event.pointerType === 'touch') { resetHover(); return; }
      const target = (event.target as Element).closest<HTMLElement>('.lm-hover-card, .lm-cover, .lm-magnetic, .lm-workspace-stage');
      if (target !== hoverTarget) {
        resetHover();
        hoverTarget = target;
        hoverBounds = target?.getBoundingClientRect() ?? null;
      }
      pointerX = event.clientX; pointerY = event.clientY;
      if (target && !hoverFrame) hoverFrame = requestAnimationFrame(paintPointer);
    };
    const pointerExit = (event: PointerEvent) => { if (!event.relatedTarget || !root.contains(event.relatedTarget as Node)) resetHover(); };

    const sizes = new ResizeObserver(resize);
    sizes.observe(root);
    mode(); visibility();
    document.fonts.ready.then(() => { if (!disposed) resize(); });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', resize, { passive: true });
    root.addEventListener('click', click);
    root.addEventListener('focusin', settleFocus);
    root.addEventListener('pointermove', pointer, { passive: true });
    root.addEventListener('pointerout', pointerExit);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', mode);
    fine.addEventListener('change', resetHover);
    wide.addEventListener('change', resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); cancelAnimationFrame(hoverFrame);
      reveal.disconnect(); ambient.disconnect(); heroObserver.disconnect(); sizes.disconnect();
      removeEventListener('scroll', schedule); removeEventListener('resize', resize);
      root.removeEventListener('click', click); root.removeEventListener('focusin', settleFocus);
      root.removeEventListener('pointermove', pointer); root.removeEventListener('pointerout', pointerExit);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', mode); fine.removeEventListener('change', resetHover); wide.removeEventListener('change', resize);
      resetHover();
      delete root.dataset.lmMotion;
      targets.forEach((el) => el.removeAttribute('data-lm-armed'));
      hero?.style.removeProperty('--lm-departure');
    };
  }, [rootRef]);
  return null;
}
