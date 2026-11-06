"use client";

import { useEffect, useRef } from "react";

interface HeroSectionProps {
  progress?: number;
}

export function HeroSection({ progress = 0 }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroStage = heroRef.current?.querySelector(".hero-sticky") as HTMLElement | null;
    if (!heroStage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (!window.matchMedia("(pointer:fine)").matches || reduced) return;
      const r = heroStage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      heroRef.current?.style.setProperty("--mx", x.toFixed(3));
      heroRef.current?.style.setProperty("--my", y.toFixed(3));
    };

    const handlePointerLeave = () => {
      heroRef.current?.style.setProperty("--mx", "0");
      heroRef.current?.style.setProperty("--my", "0");
    };

    heroStage.addEventListener("pointermove", handlePointerMove);
    heroStage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      heroStage.removeEventListener("pointermove", handlePointerMove);
      heroStage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="top"
      data-nav="dark"
      data-chapter="01 / DISCOVER"
      aria-labelledby="hero-title"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div className="hero-sticky sticky">
        <div className="hero-circles" aria-hidden="true" />
        <div className="hero-vertical-line" aria-hidden="true" />
        <span className="hero-side-note meta">A STUDY OF EARTH &amp; FORM&nbsp; / &nbsp;01</span>
        <span className="hero-index" aria-hidden="true">
          01
        </span>

        <div className="hero-stage-content">
          <div className="hero-top-group">
            <div className="hero-collection-wrap">
              <span className="hero-collection-label eyebrow">
                Contemporary Ceramics&nbsp;&nbsp;/&nbsp;&nbsp;Collection 001
              </span>
            </div>
            <div className="hero-title-wrap">
              <h1 id="hero-title" className="hero-headline">
                FORMED BY EARTH.
              </h1>
            </div>
          </div>

          <div className="hero-vessel-stage">
            <div className="hero-spotlight" aria-hidden="true" />
            <div className="hero-ground" aria-hidden="true" />
            <div className="hero-object-holder" id="hero-object">
              <div className="hero-object-anim">
                <img
                  src="/templates/strata/strata-01-hero-vessel.png"
                  alt="STRATA Vessel No. 01, a sculptural bone-colored ceramic vase with three stepped terraces"
                  width={880}
                  height={1157}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          <div className="hero-bottom-group">
            <div className="hero-subtitle-wrap">
              <p className="hero-subtitle">Defined by time.</p>
            </div>
          </div>
        </div>

        <div className="hero-text-left">
          <div className="hero-text-left-inner">
            <span className="eyebrow">01 / Vessel No. 01</span>
            <p>Quietly sculptural. Intentionally imperfect. An enduring object shaped by the language of clay.</p>
          </div>
        </div>

        <a className="hero-text-right" href="#manifesto" aria-label="Scroll to discover the story">
          <div className="hero-text-right-inner">
            <span className="tiny">Scroll to explore &darr;</span>
            <span className="hero-scroll-ring">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 4v15m-6-6 6 6 6-6" />
              </svg>
            </span>
          </div>
        </a>

        <div className="hero-hairline" />
      </div>
    </section>
  );
}
