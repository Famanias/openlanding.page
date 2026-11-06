"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-line]", {
          yPercent: 110,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".wyp-hero-description, .wyp-hero-actions", {
          opacity: 0,
          y: 14,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.3,
          clearProps: "all",
        });
        gsap.from(".wyp-hero-deck", {
          clipPath: "inset(0 0 35% 0 round 16px)",
          y: 35,
          duration: 1.1,
          delay: 0.2,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.to(".wyp-hero-landscape", {
          y: 65,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          "[data-panorama]",
          { clipPath: "inset(8% 4% 8% 4% round 24px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-panorama]",
              start: "top 90%",
              end: "center 60%",
              scrub: 0.5,
            },
          },
        );
        gsap.from("[data-word]", {
          opacity: 0.14,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-statement",
            start: "top 85%",
            end: "bottom 45%",
            scrub: true,
          },
        });
        gsap.fromTo(
          "[data-route-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: ".wyp-timeline",
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
        gsap.from("[data-stack-note]", {
          y: 55,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-note-stack",
            start: "top 90%",
            end: "center 65%",
            scrub: true,
          },
        });
      });
      let disposed = false;
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      if (root.current) observer.observe(root.current);
      return () => {
        disposed = true;
        observer.disconnect();
        media.revert();
      };
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
