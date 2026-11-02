"use client";

import React, { useState } from "react";

interface NightsSectionProps {
  onOpenModal: (eventId: string) => void;
}

export function NightsSection({ onOpenModal }: NightsSectionProps) {
  const [filter, setFilter] = useState<"all" | "house" | "disco" | "soul">("all");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", (-y * 7).toFixed(2) + "deg");
    card.style.setProperty("--tilt-y", (x * 7).toFixed(2) + "deg");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const isCardVisible = (category: string) => filter === "all" || filter === category;

  return (
    <section id="nights" className="sr-nights-section" aria-labelledby="nights-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>WEEKEND LINEUP &amp; RESIDENCIES</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="nights-heading" className="sr-display-type sr-section-title">
              PICK YOUR FREQUENCY.
            </h2>
          </div>

          {/* Interactive Genre Filter Controls */}
          <div className="sr-frequency-filter-bar" role="group" aria-label="Filter club nights by vibe">
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "all" ? "sr-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Nights
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "house" ? "sr-active" : ""}`}
              onClick={() => setFilter("house")}
            >
              House &amp; Edits
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "disco" ? "sr-active" : ""}`}
              onClick={() => setFilter("disco")}
            >
              Classic Disco
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "soul" ? "sr-active" : ""}`}
              onClick={() => setFilter("soul")}
            >
              Soul &amp; Boogie
            </button>
          </div>
        </div>

        <div className="sr-nights-grid" id="nights-grid">
          {/* Card 1: FRIDAY FREQUENCY (Mint Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("house") ? "sr-hidden-card" : ""}`}
            data-theme="mint"
            data-category="house"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">122 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#180624" />
                  <circle
                    cx="180"
                    cy="120"
                    r="85"
                    fill="none"
                    stroke="#30F0CC"
                    strokeWidth="3"
                    strokeDasharray="10 6"
                  />
                  <polygon
                    points="180,32 258,188 102,188"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                  />
                  <path d="M20 185 Q 95 110, 180 185 T 340 185" fill="none" stroke="#FC3CCC" strokeWidth="6" />
                  <circle cx="180" cy="135" r="24" fill="#12041B" stroke="#FCF03C" strokeWidth="4" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">EVERY FRIDAY • 10 PM – 4 AM</div>
                  <h3 className="sr-display-type sr-poster-title">FRIDAY FREQUENCY</h3>
                  <p className="sr-poster-desc">
                    High-voltage house, laser-cut disco edits, and loud neon colors to detonate the workweek.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: DJ ORBIT · KIKI NOVA · SYNTHIA</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("friday-frequency")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: SATURDAY STARBURST (Hot Pink Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("disco") ? "sr-hidden-card" : ""}`}
            data-theme="pink"
            data-category="disco"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">126 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#1F072E" />
                  <polygon
                    points="180,18 206,86 280,78 228,132 252,204 180,168 108,204 132,132 80,78 154,86"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                  />
                  <circle cx="180" cy="122" r="42" fill="#FCF03C" stroke="#12041B" strokeWidth="4" />
                  <path d="M150 122 L210 122 M180 92 L180 152" stroke="#12041B" strokeWidth="5" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">EVERY SATURDAY • 10 PM – 5 AM</div>
                  <h3 className="sr-display-type sr-poster-title">SATURDAY STARBURST</h3>
                  <p className="sr-poster-desc">
                    70s &amp; 80s disco classics recharged with live brass horns, confetti drops, and cosmic synth bass.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: LUNA VEX · MILES ELECTRIC · RIOT HORNS</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("saturday-starburst")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: SUNDAY SLOWBURN (Acid Lime Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("soul") ? "sr-hidden-card" : ""}`}
            data-theme="lime"
            data-category="soul"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">114 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#160521" />
                  <circle cx="180" cy="135" r="72" fill="#FCF03C" stroke="#12041B" strokeWidth="4" />
                  <path
                    d="M40 165 Q 180 125, 320 165 L 320 240 L 40 240 Z"
                    fill="#2C103B"
                    stroke="#30F0CC"
                    strokeWidth="3"
                  />
                  <circle cx="180" cy="135" r="22" fill="#FC3CCC" stroke="#12041B" strokeWidth="3" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">SELECT SUNDAYS • 8 PM – 2 AM</div>
                  <h3 className="sr-display-type sr-poster-title">SUNDAY SLOWBURN</h3>
                  <p className="sr-poster-desc">
                    Deep crate-dug boogie, analog soul, warm coral lights, and the friendliest late-weekend afterglow.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: RIO SONIC · VELVET ECHO · SOLARIS</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("sunday-slowburn")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
