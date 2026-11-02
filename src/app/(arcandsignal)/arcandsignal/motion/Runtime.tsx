"use client";
import { useEffect } from "react";

export function Runtime() {
  useEffect(() => {
    const items = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;
    const show = (item: HTMLElement) => {
      item.dataset.in = "true";
      items.delete(item);
      observer.unobserve(item);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    items.forEach((item) => observer.observe(item));
    // A large anchor jump can skip an observer's intersection entirely.
    // Mark passed content as revealed so scrolling back can never leave a blank section.
    const onScroll = () => {
      if (frame || items.size === 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        items.forEach((item) => { if (item.getBoundingClientRect().top < 0) show(item); });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.body.dataset.motionReady = "true";
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); delete document.body.dataset.motionReady; };
  }, []);
  return null;
}
