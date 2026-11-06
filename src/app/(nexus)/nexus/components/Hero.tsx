"use client";

import { useState } from "react";

export function Hero() {
  const [spinSeal1, setSpinSeal1] = useState(false);
  const [spinSeal2, setSpinSeal2] = useState(false);

  const handleSpin1 = () => {
    setSpinSeal1(true);
    setTimeout(() => setSpinSeal1(false), 500);
  };

  const handleSpin2 = () => {
    setSpinSeal2(true);
    setTimeout(() => setSpinSeal2(false), 500);
  };

  return (
    <section className="nx-hero" aria-labelledby="hero-heading">
      {/* Sweeping Pale-Peach Organic Field SVG */}
      <div className="nx-hero-peach-bg" aria-hidden="true" data-parallax="-0.08">
        <svg viewBox="0 0 1200 820" fill="none" preserveAspectRatio="none">
          <path
            d="M845 0 C745 85, 685 215, 525 275 C365 335, 315 440, 215 520 C125 592, 22 615, 18 640 C14 668, 165 655, 330 662 C495 668, 565 695, 735 660 C905 625, 1085 525, 1200 415 L1200 185 C1110 210, 995 215, 965 135 C935 55, 985 15, 1035 0 Z"
            fill="var(--peach)"
          />
          <path
            d="M920 555 C985 455, 1095 365, 1200 392 L1200 465 C1095 525, 995 605, 885 635 Z"
            fill="#F1BE98"
            opacity="0.78"
          />
        </svg>
      </div>

      {/* Botanical Corner Sprigs */}
      <div className="nx-corner-sprig nx-corner-sprig--left" aria-hidden="true">
        <svg viewBox="0 0 110 150" fill="none">
          <path
            d="M4 146 C22 112, 46 78, 76 38"
            stroke="#777B45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M36 92 C24 72, 24 44, 42 32 C54 50, 50 76, 36 92 Z" fill="#777B45" />
          <path d="M58 64 C52 42, 60 18, 78 12 C84 30, 74 52, 58 64 Z" fill="#777B45" />
          <path d="M44 86 C64 78, 88 82, 98 96 C80 106, 58 100, 44 86 Z" fill="#777B45" />
          <path d="M18 118 C38 110, 62 114, 72 126 C54 136, 32 130, 18 118 Z" fill="#777B45" />
        </svg>
      </div>

      <div className="nx-corner-sprig nx-corner-sprig--right" aria-hidden="true">
        <svg viewBox="0 0 110 130" fill="none">
          <path
            d="M106 116 C86 86, 62 56, 32 24"
            stroke="#777B45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M68 68 C82 50, 86 24, 70 12 C56 28, 56 52, 68 68 Z" fill="#777B45" />
          <path d="M58 64 C38 54, 14 58, 6 72 C24 84, 44 78, 58 64 Z" fill="#777B45" />
          <path d="M84 92 C64 84, 40 88, 30 102 C48 112, 70 106, 84 92 Z" fill="#777B45" />
        </svg>
      </div>

      <div className="nx-container">
        <div className="nx-hero-stage">
          {/* Left Column: Headline, Copy, Primary CTA */}
          <div className="nx-hero-copy">
            <h1 className="nx-hero-title" id="hero-heading">
              <span className="nx-line-mask">
                <span className="nx-line-inner nx-line-inner--1">Marketing that</span>
              </span>
              <span className="nx-line-mask">
                <span className="nx-line-inner nx-line-inner--2">
                  feels{" "}
                  <span className="nx-human-word">
                    human.
                    <svg
                      className="nx-human-underline"
                      viewBox="0 0 280 28"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        id="human-flourish-path"
                        d="M6 18 C74 8, 178 7, 272 16 C214 21, 112 22, 34 24"
                        stroke="var(--terracotta)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            <p className="nx-hero-sub">
              High-contrast organic and highly creative work for brands with something to say.
            </p>

            <div className="nx-hero-cta-row">
              <a href="#contact" className="nx-btn nx-hero-cta" data-magnetic>
                <span>LET’S PARTNER UP</span>
                <svg className="nx-btn-arrow" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 7H17.5M17.5 7L12 1.5M17.5 7L12 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#work" className="nx-drawn-link">
                <span>Explore selected work</span>
              </a>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="nx-hero-visuals">
            {/* 3D Clay Botanical Cluster Cutout */}
            <div className="nx-clay-cluster-wrap" data-parallax="0.06">
              <img
                src="/templates/nexus/clay-cluster.webp"
                alt="Tactile 3D terracotta and cream clay botanical sculptures surrounded by hand-drawn black ink stems"
                className="nx-clay-cluster-img"
                width={412}
                height={315}
              />
              <svg
                className="nx-clay-doodle-right"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="48" cy="64" r="32" fill="#F6C88F" opacity="0.9" />
                <path
                  className="nx-draw-path is-drawing"
                  d="M36 66 C52 44, 78 34, 86 44 C78 58, 54 64, 36 66 Z"
                  stroke="#221B15"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M40 78 C64 66, 90 66, 94 78 C82 88, 60 86, 40 78 Z"
                  stroke="#221B15"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M38 88 C58 88, 80 94, 80 104 C68 108, 50 100, 38 88 Z"
                  stroke="#221B15"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <circle cx="96" cy="22" r="3.8" fill="#221B15" />
              </svg>
            </div>

            {/* Hand-Illustrated Character Holding Sprout Cutout */}
            <div className="nx-character-wrap" data-parallax="-0.05">
              <svg className="nx-sprout-spark" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                <path
                  className="nx-draw-path is-drawing"
                  d="M22 24 C14 14, 16 6, 26 4"
                  stroke="#777B45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M92 18 C102 10, 108 14, 104 24"
                  stroke="#777B45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="nx-shoulder-lines"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className="nx-draw-path is-drawing"
                  d="M12 52 C22 34, 34 18, 46 8"
                  stroke="#221B15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M26 62 C40 48, 54 36, 68 28"
                  stroke="#221B15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <img
                src="/templates/nexus/marketer.webp"
                alt="Friendly illustrated creative marketer holding a sprouting green plant in a clump of rich earth"
                className="nx-character-img"
                width={302}
                height={417}
              />
            </div>
          </div>
        </div>

        {/* Lower Hero Edge */}
        <div className="nx-hero-lower" data-reveal>
          <h2 className="nx-lower-headline">
            Friendly-organic
            <br />
            and purpose-driven.
          </h2>

          <p className="nx-lower-copy">
            A marketing partner that puts people, ideas, and real connection at the center of
            growth.
          </p>

          <div className="nx-lower-badges-cluster">
            {/* Soft Peach Mound SVG */}
            <svg
              className="nx-flower-mound"
              viewBox="0 0 500 190"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M10 190 C95 140, 165 25, 275 28 C385 32, 435 145, 495 190 Z"
                fill="var(--peach)"
                opacity="0.88"
              />
            </svg>

            {/* 12-Point Terracotta Starburst Stamp */}
            <button
              type="button"
              className="nx-starburst-stamp"
              aria-label="Verified human-crafted agency seal"
              title="100% Human-Crafted"
            >
              <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <path
                  d="M40 2 L47 13 L60 7 L61 21 L74 22 L69 35 L79 43 L68 52 L73 65 L60 66 L58 78 L46 72 L38 80 L30 69 L17 73 L18 60 L5 58 L12 46 L2 36 L14 29 L10 16 L23 16 L26 4 L38 11 Z"
                  fill="var(--terracotta)"
                />
                <path
                  d="M27 41 L36 50 L54 30"
                  stroke="var(--paper-light)"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 3D Clay Flower Stem Cutout */}
            <div className="nx-clay-flower-wrap">
              <img
                src="/templates/nexus/clay-flower.webp"
                alt="Sculpted 3D terracotta and olive clay flower stem"
                width={240}
                height={200}
              />
            </div>

            {/* Two Circular Botanical Seals */}
            <div className="nx-seal-pair">
              <button
                type="button"
                className="nx-seal-badge nx-seal-badge--sage"
                data-seal-spin
                aria-label="Casual Badges botanical seal"
                onClick={handleSpin1}
                style={{
                  transform: spinSeal1 ? "rotate(360deg) scale(1.08)" : undefined,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <svg viewBox="0 0 140 140" fill="none" aria-hidden="true">
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    fill="#C4CFAF"
                    stroke="#9AA884"
                    strokeWidth="2"
                  />
                  <circle cx="70" cy="70" r="54" stroke="#362E26" strokeWidth="1.4" />
                  <defs>
                    <path id="seal-top-1" d="M 24,70 A 46,46 0 1,1 116,70" />
                    <path id="seal-bot-1" d="M 20,70 A 50,50 0 0,0 120,70" />
                  </defs>
                  <text fill="#221B15" fontSize="12.5" fontWeight="700" letterSpacing="2.2">
                    <textPath href="#seal-top-1" startOffset="50%" textAnchor="middle">
                      · CASUAL ·
                    </textPath>
                  </text>
                  <text fill="#221B15" fontSize="12.5" fontWeight="700" letterSpacing="2.2">
                    <textPath href="#seal-bot-1" startOffset="50%" textAnchor="middle">
                      BADGES
                    </textPath>
                  </text>
                  <path
                    d="M68 84 C68 68, 52 56, 48 56 C48 68, 58 80, 68 84 Z"
                    fill="#4C7262"
                    stroke="#221B15"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M68 84 C70 64, 86 50, 92 50 C92 66, 80 80, 68 84 Z"
                    fill="#4C7262"
                    stroke="#221B15"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="nx-seal-badge nx-seal-badge--mustard"
                data-seal-spin
                aria-label="Clay-Made Culture botanical seal"
                onClick={handleSpin2}
                style={{
                  transform: spinSeal2 ? "rotate(360deg) scale(1.08)" : undefined,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <svg viewBox="0 0 140 140" fill="none" aria-hidden="true">
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    fill="var(--mustard)"
                    stroke="#D9963D"
                    strokeWidth="2"
                  />
                  <circle cx="70" cy="70" r="54" stroke="#82422D" strokeWidth="1.4" />
                  <defs>
                    <path id="seal-top-2" d="M 23,70 A 47,47 0 1,1 117,70" />
                    <path id="seal-bot-2" d="M 19,70 A 51,51 0 0,0 121,70" />
                  </defs>
                  <text fill="#5E2B18" fontSize="12" fontWeight="700" letterSpacing="1.8">
                    <textPath href="#seal-top-2" startOffset="50%" textAnchor="middle">
                      · CLAY-MADE ·
                    </textPath>
                  </text>
                  <text fill="#5E2B18" fontSize="12" fontWeight="700" letterSpacing="2">
                    <textPath href="#seal-bot-2" startOffset="50%" textAnchor="middle">
                      CULTURE
                    </textPath>
                  </text>
                  <ellipse cx="70" cy="88" rx="14" ry="4.5" fill="#A45337" />
                  <path
                    d="M70 86 V54"
                    stroke="#82422D"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="70"
                    cy="50"
                    r="5"
                    fill="#A45337"
                    stroke="#5E2B18"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M70 72 C58 64, 52 68, 56 76 C62 78, 66 76, 70 72 Z"
                    fill="#D9824B"
                    stroke="#5E2B18"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M70 72 C82 64, 88 68, 84 76 C78 78, 74 76, 70 72 Z"
                    fill="#D9824B"
                    stroke="#5E2B18"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
