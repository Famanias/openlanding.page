"use client";

import { useEffect } from "react";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const heroDelays: Record<string, number> = {
  "hero-kicker": 0,
  "hero-title": 60,
  "hero-lead": 140,
  "hero-actions": 210,
  "hero-proof": 280,
};

export function Reveals() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".as-site");
    if (!site) return;

    const nodes = [...site.querySelectorAll<HTMLElement>("[data-as-reveal]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 900px), (max-height: 619px)");
    const animations = new Set<Animation>();
    const restored = window.scrollY > 80 || Boolean(window.location.hash);

    function animate(node: HTMLElement, delay = 0, distance = 24) {
      // Content stays visible in CSS. Only a running animation can conceal it.
      if (typeof node.animate !== "function") return;
      const animation = node.animate(
        [{ opacity: 0, translate: `0 ${distance * (compact.matches ? 0.5 : 1)}px` }, { opacity: 1, translate: "0 0" }],
        { duration: 700, delay, easing: ease, fill: "backwards" },
      );
      animations.add(animation);
      animation.onfinish = animation.oncancel = () => animations.delete(animation);
    }

    function reveal(node: HTMLElement) {
      if (node.dataset.in === "true") return;
      node.dataset.in = "true";
      if (preference.matches) return;

      const kind = node.dataset.asReveal ?? "";
      const order = Number(node.dataset.asOrder ?? 0);
      animate(node, heroDelays[kind] ?? (compact.matches ? 0 : order * 65), kind === "header" ? -12 : 24);
    }

    function finish() {
      animations.forEach((animation) => animation.cancel());
      nodes.forEach((node) => { node.dataset.in = "true"; });
    }

    if (preference.matches || !("IntersectionObserver" in window)) {
      finish();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px 40px" });

    nodes.forEach((node) => {
      const bounds = node.getBoundingClientRect();
      if (bounds.bottom <= 0 || (restored && bounds.top < window.innerHeight)) {
        node.dataset.in = "true";
      } else if (bounds.top < window.innerHeight) {
        reveal(node);
      } else {
        observer.observe(node);
      }
    });

    const onPreferenceChange = () => {
      if (preference.matches) {
        observer.disconnect();
        finish();
      }
    };
    // Never fade out a control that was reached by keyboard or an anchor jump.
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const node = event.target.closest<HTMLElement>("[data-as-reveal]");
        if (!node) return;
        node.dataset.in = "true";
        observer.unobserve(node);
        node.getAnimations().forEach((animation) => animation.finish());
      }
    };
    preference.addEventListener("change", onPreferenceChange);
    site.addEventListener("focusin", onFocus);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      nodes.forEach((node) => { delete node.dataset.in; });
      preference.removeEventListener("change", onPreferenceChange);
      site.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
