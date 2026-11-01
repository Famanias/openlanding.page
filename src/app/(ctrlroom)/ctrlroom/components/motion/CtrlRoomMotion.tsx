'use client';

import { useEffect, type RefObject } from 'react';
import { CR_MOTION, scrollToCtrlRoom } from './tokens';

/** Event-driven writes only: no React updates or perpetual animation frame loop. */
export function CtrlRoomMotion({ rootRef, bootReady }: { rootRef: RefObject<HTMLDivElement | null>; bootReady: boolean }) {
  useEffect(() => {
    if (!bootReady || !rootRef.current) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    // Animate only the original, visible key nodes. Later angle remounts stay ready.
    const keys = Array.from(rootRef.current.querySelectorAll<HTMLElement>('.cr-hero-hardware [aria-label^="Hardware preview key"] > div'))
      .filter(el => !el.closest('dialog'));
    const animations = keys.map((key, index) => key.animate([
      { opacity: 0.3, transform: 'translateY(6px) scale(0.94)' },
      { opacity: 1, transform: 'none' },
    ], { duration: CR_MOTION.glyph * 1000, delay: 300 + (index % 5) * 40, easing: CR_MOTION.cssEase, fill: 'backwards' }));
    const cancel = () => animations.forEach(animation => animation.cancel());
    preference.addEventListener('change', cancel);
    return () => { cancel(); preference.removeEventListener('change', cancel); };
  }, [rootRef, bootReady]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const wide = matchMedia('(min-width: 1024px)');
    const hero = root.querySelector<HTMLElement>('.cr-hero');
    const hardware = root.querySelector<HTMLElement>('.cr-hero-hardware');
    const header = root.querySelector<HTMLElement>('.cr-header');
    const progress = root.querySelector<HTMLElement>('.cr-nav-progress');
    const chapters = Array.from(root.querySelectorAll<HTMLElement>('main > section[id]'));
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-cr-nav]'));
    root.querySelectorAll<HTMLElement>('main > section:not(.cr-hero) h2').forEach(el => { el.dataset.crHeading = ''; });
    root.querySelectorAll<HTMLElement>('main > section:not(.cr-hero) > div').forEach((el, index) => {
      if (!el.hasAttribute('data-cr-reveal')) el.dataset.crReveal = index === 0 ? 'workspace' : 'section';
    });
    const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-cr-reveal], [data-cr-heading]'));
    let scrollFrame = 0;
    let pointerFrame = 0;
    let focusFrame = 0;
    let pointerFocus = false;
    let disposed = false;
    let maxScroll = 1;
    let heroTop = 0;
    let heroHeight = 1;
    let chapterTops: number[] = [];
    let hover: HTMLElement | null = null;
    let hoverPlane: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let pointerX = 0;
    let pointerY = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.dataset.crSeen = 'true';
        delete target.dataset.crArmed;
        reveal.unobserve(target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    const ambient = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.crPlaying = String(entry.isIntersecting);
    });
    root.querySelectorAll('[data-cr-ambient]').forEach(el => ambient.observe(el));

    const paintScroll = () => {
      scrollFrame = 0;
      progress?.style.setProperty('transform', `scaleX(${clamp(scrollY / maxScroll)})`);
      header?.setAttribute('data-scrolled', String(scrollY > 32));
      // The hardware settles into the workspace as the existing hero leaves.
      const departure = motion.matches && wide.matches ? clamp((scrollY - heroTop) / heroHeight) : 0;
      if (hardware) {
        if (motion.matches && wide.matches) hardware.style.transform = `translateY(${departure * 24}px) scale(${1 - departure * 0.025})`;
        else hardware.style.removeProperty('transform');
      }
      let active = '';
      chapterTops.forEach((top, index) => { if (top < scrollY + innerHeight * 0.4) active = chapters[index].id; });
      for (const link of links) {
        const current = link.hash === `#${active}`;
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    const scheduleScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScroll); };
    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      heroTop = (hero?.getBoundingClientRect().top ?? 0) + scrollY;
      heroHeight = hero?.offsetHeight ?? 1;
      chapterTops = chapters.map(el => el.getBoundingClientRect().top + scrollY);
      resetPointer();
      scheduleScroll();
    };
    const resetPointer = () => {
      cancelAnimationFrame(pointerFrame); pointerFrame = 0;
      hover?.style.removeProperty('translate');
      hoverPlane?.style.removeProperty('transform');
      hoverPlane = null;
      hover = null; bounds = null;
    };
    const paintPointer = () => {
      pointerFrame = 0;
      if (!hover || !bounds) return;
      const x = clamp((pointerX - bounds.left) / bounds.width) - 0.5;
      const y = clamp((pointerY - bounds.top) / bounds.height) - 0.5;
      if (hover.matches('.cr-hardware-stage')) {
        hoverPlane = hover.querySelector<HTMLElement>('.cr-hardware-angle');
        if (hoverPlane) hoverPlane.style.transform = `perspective(1000px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      } else hover.style.translate = `${(x * 6).toFixed(2)}px ${(y * 4).toFixed(2)}px`;
    };
    const pointer = (event: PointerEvent) => {
      if (!motion.matches || !fine.matches || event.pointerType === 'touch') return;
      const target = (event.target as Element).closest<HTMLElement>('[data-cr-magnetic], .cr-hardware-stage');
      if (target !== hover) {
        resetPointer(); hover = target; bounds = target?.getBoundingClientRect() ?? null;
      }
      pointerX = event.clientX; pointerY = event.clientY;
      if (hover && !pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    };
    const pointerOut = (event: PointerEvent) => {
      if (hover && (!(event.relatedTarget instanceof Node) || !hover.contains(event.relatedTarget))) resetPointer();
    };
    const settleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      // A mouse press must keep its hit area still until the click is delivered.
      if (pointerFocus) { resetPointer(); return; }
      // Keyboard navigation must never land on a hidden reveal.
      let target = event.target.closest<HTMLElement>('[data-cr-reveal], [data-cr-heading]');
      while (target) {
        target.dataset.crInstant = 'true';
        target.dataset.crSeen = 'true'; delete target.dataset.crArmed; reveal.unobserve(target);
        target = target.parentElement?.closest<HTMLElement>('[data-cr-reveal], [data-cr-heading]') ?? null;
      }
      resetPointer();
    };
    const beginPointerFocus = () => { cancelAnimationFrame(focusFrame); pointerFocus = true; };
    const endPointerFocus = () => {
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => { pointerFocus = false; });
    };
    const keyboardFocus = () => { pointerFocus = false; };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hash.length < 2) return;
      let id: string;
      try { id = decodeURIComponent(anchor.hash.slice(1)); } catch { return; }
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToCtrlRoom(id, true);
      history.pushState(null, '', anchor.hash);
    };
    const mode = () => {
      root.dataset.crMotion = motion.matches ? 'live' : 'static';
      resetPointer(); reveal.disconnect();
      for (const el of reveals) {
        if (!motion.matches || el.dataset.crSeen || el.getBoundingClientRect().top < innerHeight * 0.94) {
          el.dataset.crSeen = 'true'; delete el.dataset.crArmed;
        } else { el.dataset.crArmed = 'true'; reveal.observe(el); }
      }
      measure();
    };
    const visibility = () => { root.dataset.crHidden = String(document.hidden); if (document.hidden) resetPointer(); };
    const sizes = new ResizeObserver(measure);
    sizes.observe(root);
    mode(); visibility();
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    addEventListener('scroll', scheduleScroll, { passive: true });
    addEventListener('resize', measure, { passive: true });
    motion.addEventListener('change', mode);
    fine.addEventListener('change', resetPointer);
    wide.addEventListener('change', measure);
    document.addEventListener('visibilitychange', visibility);
    root.addEventListener('pointermove', pointer, { passive: true });
    root.addEventListener('pointerout', pointerOut);
    root.addEventListener('focusin', settleFocus);
    root.addEventListener('pointerdown', beginPointerFocus, true);
    addEventListener('pointerup', endPointerFocus, true);
    addEventListener('pointercancel', endPointerFocus, true);
    addEventListener('keydown', keyboardFocus, true);
    root.addEventListener('click', click);
    return () => {
      disposed = true;
      cancelAnimationFrame(scrollFrame); resetPointer();
      cancelAnimationFrame(focusFrame);
      reveal.disconnect(); ambient.disconnect(); sizes.disconnect();
      removeEventListener('scroll', scheduleScroll); removeEventListener('resize', measure);
      motion.removeEventListener('change', mode); fine.removeEventListener('change', resetPointer); wide.removeEventListener('change', measure);
      document.removeEventListener('visibilitychange', visibility);
      root.removeEventListener('pointermove', pointer); root.removeEventListener('pointerout', pointerOut);
      root.removeEventListener('focusin', settleFocus); root.removeEventListener('click', click);
      root.removeEventListener('pointerdown', beginPointerFocus, true);
      removeEventListener('pointerup', endPointerFocus, true);
      removeEventListener('pointercancel', endPointerFocus, true);
      removeEventListener('keydown', keyboardFocus, true);
      delete root.dataset.crMotion;
      reveals.forEach(el => delete el.dataset.crArmed);
      hardware?.style.removeProperty('transform');
    };
  }, [rootRef]);
  return null;
}
