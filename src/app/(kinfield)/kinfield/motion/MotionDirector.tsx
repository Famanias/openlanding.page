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
      media.add("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
        const handoffFocus = () => {
          const focused = document.activeElement;
          if (focused instanceof HTMLElement && focused.closest(".kf-manifesto, .kf-hero-ledger")) {
            root.querySelector<HTMLButtonElement>(".kf-dock")?.focus({ preventScroll: true });
          }
        };
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: ".kf-hero", start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
        });
        timeline
          .to(".kf-pose-1, .kf-backdrop-1", { opacity: 1, duration: 0.16, ease: "none" }, 0.25)
          .to(".kf-pose-2, .kf-backdrop-2", { opacity: 1, duration: 0.16, ease: "none" }, 0.48)
          .to(".kf-manifesto", { xPercent: -108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-ledger", { xPercent: 108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-image", { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 0.45, ease: "none" }, 0.48)
          .call(handoffFocus, [], 0.84)
          .to(".kf-manifesto, .kf-hero-ledger", { autoAlpha: 0, duration: 0.08, ease: "none", onUpdate: handoffFocus }, 0.85)
          .to(".kf-sideword", { autoAlpha: 0, duration: 0.16, ease: "none" }, 0.56);
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".kf-practice-room", { scale: 1.025, ease: "none", scrollTrigger: { trigger: ".kf-practice-stage", start: "top 90%", end: "top 35%", scrub: true } });
        gsap.from(".kf-practice-person", { yPercent: 3, ease: "none", scrollTrigger: { trigger: ".kf-practice-stage", start: "top 90%", end: "top 35%", scrub: true } });
        const practiceArc = root.querySelector<SVGPathElement>(".kf-practice-arc path");
        if (practiceArc) {
          const length = practiceArc.getTotalLength();
          gsap.set(practiceArc, { strokeDasharray: length });
          gsap.from(practiceArc, { strokeDashoffset: length, ease: "none", scrollTrigger: { trigger: ".kf-practice-arc", start: "bottom 95%", end: "bottom 45%", scrub: true } });
        }
        gsap.from(".kf-atlas", { y: 24, ease: "none", scrollTrigger: { trigger: ".kf-atlas", start: "top 90%", end: "top 35%", scrub: true } });
        gsap.from(".kf-figure-guides", { rotation: -28, svgOrigin: "170 290", ease: "none", scrollTrigger: { trigger: ".kf-figure-wrap", start: "top 90%", end: "top 40%", scrub: true } });
        gsap.from(".kf-schedule", { y: 28, ease: "none", scrollTrigger: { trigger: ".kf-schedule", start: "top 90%", end: "top 35%", scrub: true } });
        root.querySelectorAll<HTMLElement>(".kf-schedule-item").forEach((row) => {
          gsap.from(row, { rotationX: -14, transformPerspective: 900, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: row, start: "top 90%", end: "top 45%", scrub: true } });
        });
        gsap.from(".kf-teacher-one .kf-teacher-image img", { clipPath: "inset(35% 0 0 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-spread", start: "top 90%", end: "top 35%", scrub: true } });
        gsap.from(".kf-teacher-two .kf-teacher-image img", { clipPath: "inset(0 35% 0 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-two", start: "top 90%", end: "top 35%", scrub: true } });
        gsap.from(".kf-booking", { y: 24, rotationY: 5, transformPerspective: 1200, transformOrigin: "0% 50%", ease: "none", scrollTrigger: { trigger: ".kf-booking", start: "top 90%", end: "top 35%", scrub: true } });
        gsap.from(".kf-closing-panel", { y: 24, ease: "none", scrollTrigger: { trigger: ".kf-closing-panel", start: "top 90%", end: "top 35%", scrub: true } });
        const arc = root.querySelector<SVGPathElement>(".kf-closing-arc path");
        if (arc) {
          const length = arc.getTotalLength();
          gsap.set(arc, { strokeDasharray: length });
          gsap.from(arc, { strokeDashoffset: length, ease: "none", scrollTrigger: { trigger: ".kf-closing", start: "top 90%", end: "top 35%", scrub: true } });
        }
      });
      return () => media.revert();
    }, root);
    let disposed = false;
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    void document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);
  return null;
}
