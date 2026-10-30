'use client';

import { useEffect } from 'react';

/** Reveal each off-screen element once, including cards added by the archive filter. */
export function ScrollReveals() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.synapxe-root');
    if (!root || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.sxActivated = 'true';
        (entry.target as HTMLElement).dataset.sxState = 'visible';
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    const prepare = (element: HTMLElement) => {
      if (element.dataset.sxState === 'pending') {
        if (preference.matches) element.dataset.sxState = 'visible';
        else observer.observe(element);
        return;
      }
      if (element.dataset.sxState === 'visible') return;
      // Keep first-paint content visible, and avoid hiding anything when motion is reduced.
      if (preference.matches || element.getBoundingClientRect().top < window.innerHeight) {
        element.dataset.sxState = 'visible';
      } else {
        element.dataset.sxState = 'pending';
        observer.observe(element);
      }
    };
    const scan = (parent: ParentNode) => {
      parent.querySelectorAll<HTMLElement>('[data-sx-reveal]').forEach(prepare);
    };
    scan(root);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.removedNodes) {
          if (!(node instanceof HTMLElement) || root.contains(node)) continue;
          if (node.matches('[data-sx-reveal]')) observer.unobserve(node);
          node.querySelectorAll<HTMLElement>('[data-sx-reveal]').forEach((element) => observer.unobserve(element));
        }
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches('[data-sx-reveal]')) prepare(node);
          scan(node);
        }
      }
    });
    mutations.observe(root, { childList: true, subtree: true });

    const revealFocused = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const reveal = target.closest<HTMLElement>('[data-sx-reveal]');
      if (!reveal) return;
      delete reveal.dataset.sxActivated;
      reveal.dataset.sxState = 'visible';
      observer.unobserve(reveal);
    };
    const finishReveal = (event: AnimationEvent) => {
      if (event.animationName !== 'sx-power-on' || !(event.target instanceof HTMLElement)) return;
      delete event.target.dataset.sxActivated;
    };
    const preferenceChanged = () => {
      if (!preference.matches) return;
      root.querySelectorAll<HTMLElement>('[data-sx-activated]').forEach((element) => {
        delete element.dataset.sxActivated;
      });
      root.querySelectorAll<HTMLElement>('[data-sx-state="pending"]').forEach((element) => {
        element.dataset.sxState = 'visible';
        observer.unobserve(element);
      });
    };
    root.addEventListener('focusin', revealFocused);
    root.addEventListener('animationend', finishReveal);
    preference.addEventListener('change', preferenceChanged);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.removeEventListener('focusin', revealFocused);
      root.removeEventListener('animationend', finishReveal);
      preference.removeEventListener('change', preferenceChanged);
    };
  }, []);

  return null;
}
