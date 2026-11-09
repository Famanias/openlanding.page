'use client';

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionDirector() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".kinfield");
    if (!root) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: ".kf-hero", start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
        });
        timeline
          .to(".kf-pose-1", { opacity: 1, duration: 0.16, ease: "none" }, 0.25)
          .to(".kf-pose-2", { opacity: 1, duration: 0.16, ease: "none" }, 0.48)
          .to(".kf-manifesto", { xPercent: -108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-ledger", { xPercent: 108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-image", { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-sideword", { autoAlpha: 0, duration: 0.16, ease: "none" }, 0.56);
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".kf-practice-stage", { clipPath: "inset(4% 10% 4% 10% round 32px)", ease: "none", scrollTrigger: { trigger: ".kf-practice-stage", start: "top 95%", end: "top 45%", scrub: true } });
        gsap.from(".kf-atlas", { clipPath: "inset(0 5% 0 5% round 32px)", y: 35, ease: "none", scrollTrigger: { trigger: ".kf-atlas", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-schedule", { y: 55, rotation: -1.2, ease: "none", scrollTrigger: { trigger: ".kf-schedule", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-schedule-item", { y: 20, stagger: 0.08, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: ".kf-schedule-list", start: "top 88%", once: true } });
        gsap.from(".kf-teacher-one .kf-teacher-image", { clipPath: "inset(0 0 100% 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-spread", start: "top 90%", end: "top 42%", scrub: true } });
        gsap.from(".kf-teacher-two .kf-teacher-image", { clipPath: "inset(0 100% 0 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-spread", start: "top 70%", end: "top 20%", scrub: true } });
        gsap.from(".kf-booking", { y: 45, rotate: 0.7, ease: "none", scrollTrigger: { trigger: ".kf-booking", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-closing-panel", { clipPath: "inset(0 100% 0 0 round 32px)", ease: "none", scrollTrigger: { trigger: ".kf-closing-panel", start: "top 98%", end: "top 55%", scrub: true } });
      });
      return () => media.revert();
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    return () => { window.removeEventListener("load", refresh); context.revert(); };
  }, []);
  return null;
}
