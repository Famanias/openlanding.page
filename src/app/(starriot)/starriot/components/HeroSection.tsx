"use client";

import React, { useState, useEffect } from "react";

const DJS = [
  { name: "DJ ORBIT", bpm: 120, speed: "0.5s", bg: "var(--hot-pink)", initials: "DO" },
  { name: "LUNA VEX", bpm: 124, speed: "0.4s", bg: "var(--acid-lime)", initials: "LV" },
  { name: "RIO SONIC", bpm: 128, speed: "0.32s", bg: "var(--electric-mint)", initials: "RS" },
];

const SLOTS = [
  { time: "10:00 PM", label: "WARM UP" },
  { time: "11:30 PM", label: "MAIN SET" },
  { time: "01:30 AM", label: "AFTERGLOW" },
];

const SCRUBBER_WIDTHS = ["68%", "84%", "52%"];

export function HeroSection() {
  const [activeDjIndex, setActiveDjIndex] = useState(0);
  const [activeSlotIndex, setActiveSlotIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [statusOverride, setStatusOverride] = useState<string | null>(null);

  const activeDj = DJS[activeDjIndex];

  useEffect(() => {
    document.documentElement.style.setProperty("--bpm-duration", activeDj.speed);
  }, [activeDj]);

  const selectDj = (index: number) => {
    const nextIdx = (index + DJS.length) % DJS.length;
    setActiveDjIndex(nextIdx);
    setStatusOverride(null);
  };

  const selectSlot = (index: number) => {
    setActiveSlotIndex(index);
    setStatusOverride(`TONIGHT: ${SLOTS[index].label} (${SLOTS[index].time})`);
  };

  const currentStatus =
    statusOverride || (isPlaying ? `DECK: ${activeDj.name} (${activeDj.bpm} BPM)` : `PAUSED - ${activeDj.name}`);

  return (
    <section className="sr-hero-section" aria-labelledby="hero-title">
      <div className="sr-container">
        <div className="sr-hero-grid">
          {/* Left Column: Typography & Conversion Actions */}
          <div className="sr-hero-copy-col">
            <div className="sr-kicker-label">
              <span>THE CITY'S NEW AFTER-DARK OBSESSION</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>

            <h1 id="hero-title" className="sr-display-type sr-hero-headline">
              <span className="sr-hero-line sr-hero-line-1">TONIGHT,</span>
              <span className="sr-hero-line sr-hero-line-2">WE GO</span>
              <span className="sr-hero-line sr-hero-line-3">
                <span className="sr-supernova-word">SUPERNOVA.</span>
              </span>
            </h1>

            <p className="sr-hero-subcopy">
              Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the
              whole universe.
            </p>

            <div className="sr-hero-cta-row">
              <a href="#guestlist" className="sr-btn-neon-pill">
                <span>GET ON THE LIST</span>
                <span className="sr-btn-arrow" aria-hidden="true">↗</span>
              </a>
              <a href="#nights" className="sr-btn-outline-trace">
                <span>EXPLORE THE NIGHTS</span>
              </a>
            </div>

            <div className="sr-hero-micro-bar">
              <span>DISCO</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>HOUSE</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>ELECTRIC JOY</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>LATE HOURS</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span id="live-deck-status" style={{ color: "var(--electric-mint)" }}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Layered Illustration & Club UI Stage */}
          <div className="sr-hero-stage" id="hero-stage">
            {/* Floating UI Panel 1: LINEUP Deck */}
            <div className="sr-club-ui-panel sr-panel-lineup" role="region" aria-label="Interactive DJ Lineup Deck">
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag">LIVE DECK</span>
              </div>
              <div className="sr-panel-header-row">
                <span className="sr-panel-title">
                  <span aria-hidden="true">🎧</span>
                  <span>LINEUP</span>
                </span>
                <span
                  id="deck-bpm-readout"
                  style={{ fontSize: "0.7rem", fontWeight: "800", color: "var(--electric-mint)" }}
                >
                  {activeDj.bpm} BPM
                </span>
              </div>
              <div className="sr-dj-list">
                {DJS.map((dj, idx) => (
                  <button
                    key={dj.name}
                    type="button"
                    className={`sr-dj-row-btn ${idx === activeDjIndex ? "sr-active" : ""}`}
                    data-dj={dj.name}
                    data-bpm={dj.bpm}
                    data-speed={dj.speed}
                    onClick={() => selectDj(idx)}
                  >
                    <span className="sr-dj-avatar-wrap">
                      <span className="sr-dj-avatar" style={{ background: dj.bg }}>
                        {dj.initials}
                      </span>
                      <span className="sr-dj-name">{dj.name}</span>
                    </span>
                    <span className="sr-dj-play-badge" aria-hidden="true">
                      {idx === activeDjIndex ? "▶" : "•"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating UI Panel 2: EVENTS TONIGHT */}
            <div className="sr-club-ui-panel sr-panel-tonight" role="region" aria-label="Tonight Set Schedule">
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag">SET TIMES</span>
              </div>
              <div className="sr-panel-header-row">
                <span className="sr-panel-title">
                  <span aria-hidden="true">📅</span>
                  <span>EVENTS TONIGHT</span>
                </span>
              </div>
              <div className="sr-tonight-slots">
                {SLOTS.map((slot, idx) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`sr-slot-btn ${idx === activeSlotIndex ? "sr-active" : ""}`}
                    data-slot={`${slot.label} (${slot.time})`}
                    onClick={() => selectSlot(idx)}
                  >
                    <span className="sr-slot-time">{slot.time}</span>
                    <span>{slot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating UI Panel 3: EQUALIZER / VISUALIZER */}
            <div
              className={`sr-club-ui-panel sr-panel-eq ${isPlaying ? "sr-eq-playing" : ""}`}
              id="hero-eq-panel"
              role="region"
              aria-label="Club Equalizer"
            >
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag" id="eq-state-tag">
                  {isPlaying ? "PULSE ON" : "PAUSED"}
                </span>
              </div>
              <div className="sr-eq-body">
                <div className="sr-eq-bars-grid" aria-hidden="true">
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                </div>
                <div className="sr-eq-controls">
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn"
                    id="eq-prev-btn"
                    aria-label="Previous DJ Track"
                    onClick={() => selectDj(activeDjIndex - 1)}
                  >
                    ⏮
                  </button>
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn sr-play-toggle"
                    id="eq-toggle-btn"
                    aria-label="Toggle Visualizer Pulse"
                    aria-pressed={isPlaying}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn"
                    id="eq-next-btn"
                    aria-label="Next DJ Track"
                    onClick={() => selectDj(activeDjIndex + 1)}
                  >
                    ⏭
                  </button>
                </div>
                <div className="sr-eq-scrubber" aria-hidden="true">
                  <div
                    className="sr-eq-scrubber-fill"
                    id="eq-scrubber-fill"
                    style={{ width: SCRUBBER_WIDTHS[activeDjIndex % 3] }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Perforated CLUB PASS Ticket Stub */}
            <a href="#guestlist" className="sr-club-pass-stub" aria-label="Claim Your Star Riot Club Pass">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "var(--paper-white)",
                }}
              >
                ✦ STAR RIOT
              </div>
              <span className="sr-pass-label">CLUB PASS</span>
              <div className="sr-pass-barcode" aria-hidden="true"></div>
            </a>

            <svg
                className="sr-hero-art-svg"
                viewBox="0 0 820 620"
                role="img"
                aria-label="Colossal neon five-point star portal, hanging disco mirror ball, and two expressive retro-pop dancers grooving in electric mint, hot pink, and acid lime"
              >
                <defs>
                  {/*  Signature Star Face Gradient: Electric Mint -> Acid Lime  */}
                  <linearGradient id="starFaceGrad" x1="0%" y1="15%" x2="95%" y2="85%">
                    <stop offset="0%" stopColor="#30F0CC" />
                    <stop offset="52%" stopColor="#90F878" />
                    <stop offset="100%" stopColor="#FCF03C" />
                  </linearGradient>
                  {/*  Signature 3D Star Extrusion Gradient: Hot Pink -> Electric Purple  */}
                  <linearGradient id="starExtrudeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FC3CCC" />
                    <stop offset="65%" stopColor="#9451FF" />
                    <stop offset="100%" stopColor="#4A157A" />
                  </linearGradient>
                  {/*  Lightning Bolt Gradient  */}
                  <linearGradient id="boltGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#30F0CC" />
                    <stop offset="65%" stopColor="#8AF882" />
                    <stop offset="100%" stopColor="#FCF03C" />
                  </linearGradient>
                  {/*  Pink Cloud Wave Gradient  */}
                  <linearGradient id="cloudPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FC3CCC" />
                    <stop offset="100%" stopColor="#6B1B9A" />
                  </linearGradient>
                  {/*  Pants Hot Pink Gradient  */}
                  <linearGradient id="pantsPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5AD9" />
                    <stop offset="100%" stopColor="#C8149C" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/*  Background Ribbons, Sparkles & Starbursts  */}
                <g aria-hidden="true">
                  {/*  Multi-point Starburst Left  */}
                  <polygon
                    points="96,178 109,154 134,148 118,170 138,188 111,189 102,214 91,189 65,194 84,173 68,152 92,160"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Bottom Left Starburst behind Dancer A  */}
                  <polygon
                    points="156,515 174,475 212,482 188,510 218,538 179,542 165,578 148,544 108,548 136,518 114,485 150,498"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Swooping Hot-Pink Ribbon Curves  */}
                  <path
                    d="M 190 285 C 145 255, 160 190, 235 210 C 190 215, 185 255, 225 270 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  <path
                    d="M 435 190 C 455 135, 515 135, 525 188 C 500 162, 468 168, 455 202 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  <path
                    d="M 695 280 C 765 275, 795 210, 745 168 C 762 212, 740 250, 685 255 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Acid-Lime Crescent Moon  */}
                  <path
                    d="M 488 415 A 22 22 0 1 0 518 442 A 16 16 0 1 1 488 415 Z"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Four-Point Neon Sparkles  */}
                  <path d="M235 90 L240 105 L255 110 L240 115 L235 130 L230 115 L215 110 L230 105 Z" fill="#FC3CCC" />
                  <path d="M350 288 L355 304 L371 309 L355 314 L350 330 L345 314 L329 309 L345 304 Z" fill="#FCF03C" />
                  <path d="M510 102 L514 115 L527 119 L514 123 L510 136 L506 123 L493 119 L506 115 Z" fill="#FFFDF8" />
                  <path d="M645 118 L649 131 L662 135 L649 139 L645 152 L641 139 L628 135 L641 131 Z" fill="#FCF03C" />
                  <path d="M405 478 L410 492 L424 497 L410 502 L405 516 L400 502 L386 497 L400 492 Z" fill="#30F0CC" />
                </g>

                {/*  1. COLOSSAL 3D EXTRUDED FIVE-POINT NEON STAR PORTAL  */}
                <g className="sr-svg-star-portal">
                  {/*  3D Extruded Depth Side Planes (Hot Pink & Electric Purple)  */}
                  <polygon
                    points="495,135 538,242 652,222 572,318 612,438 498,378 386,435 426,320 348,255 452,248"
                    transform="translate(22, 24)"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                  {/*  Extrusion Connector Facets  */}
                  <polygon
                    points="652,222 674,246 594,342 572,318"
                    fill="#FC3CCC"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="572,318 594,342 634,462 612,438"
                    fill="#B738E8"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="498,378 520,402 408,459 386,435"
                    fill="#FF42D2"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  {/*  Main Star Front Face (Mint to Acid Lime)  */}
                  <polygon
                    points="495,135 538,242 652,222 572,318 612,438 498,378 386,435 426,320 348,255 452,248"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  {/*  Crisp White Inner Comic Highlight Strokes  */}
                  <polyline
                    points="495,152 458,254 366,260"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="544,250 632,234"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>

                {/*  2. JAGGED MINT-TO-LIME LIGHTNING BOLT ARROW  */}
                <g aria-hidden="true">
                  <polygon
                    points="355,595 432,475 462,502 522,428 522,428 548,448 568,402 518,418 536,434 468,478 438,448 332,595"
                    fill="#12041B"
                    transform="translate(6, 8)"
                  />
                  <polygon
                    points="350,595 435,472 466,502 528,430 512,418 568,395 550,452 536,438 468,528 436,498 375,595"
                    fill="url(#boltGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </g>

                {/*  3. HANGING FACETED DISCO MIRROR BALL  */}
                <g className="sr-svg-disco-ball">
                  {/*  Hanging Cord  */}
                  <line x1="575" y1="0" x2="575" y2="58" stroke="#FC3CCC" strokeWidth="4" />
                  {/*  Top Cap Ring  */}
                  <rect x="563" y="54" width="24" height="10" rx="4" fill="#CAB9D4" stroke="#12041B" strokeWidth="3" />
                  {/*  Outer Glow Halo  */}
                  <circle cx="575" cy="118" r="58" fill="rgba(48, 240, 204, 0.18)" />
                  {/*  Main Sphere Base  */}
                  <circle cx="575" cy="118" r="52" fill="#1E092B" stroke="#12041B" strokeWidth="4" />
                  {/*  Mirror Tile Facets  */}
                  <g stroke="#12041B" strokeWidth="2">
                    <rect x="545" y="74" width="18" height="14" rx="2" fill="#30F0CC" />
                    <rect x="565" y="74" width="20" height="14" rx="2" fill="#FFFDF8" />
                    <rect x="587" y="74" width="18" height="14" rx="2" fill="#9451FF" />

                    <rect x="532" y="90" width="18" height="16" rx="2" fill="#FCF03C" />
                    <rect x="552" y="90" width="21" height="16" rx="2" fill="#30F0CC" />
                    <rect x="575" y="90" width="21" height="16" rx="2" fill="#FC3CCC" />
                    <rect x="598" y="90" width="18" height="16" rx="2" fill="#30F0CC" />

                    <rect x="528" y="108" width="19" height="18" rx="2" fill="#30F0CC" />
                    <rect x="549" y="108" width="23" height="18" rx="2" fill="#9451FF" />
                    <rect x="574" y="108" width="23" height="18" rx="2" fill="#FFFDF8" />
                    <rect x="599" y="108" width="19" height="18" rx="2" fill="#FC3CCC" />

                    <rect x="533" y="128" width="18" height="16" rx="2" fill="#FC3CCC" />
                    <rect x="553" y="128" width="21" height="16" rx="2" fill="#30F0CC" />
                    <rect x="576" y="128" width="21" height="16" rx="2" fill="#9451FF" />
                    <rect x="599" y="128" width="17" height="16" rx="2" fill="#FCF03C" />

                    <rect x="546" y="146" width="18" height="13" rx="2" fill="#30F0CC" />
                    <rect x="566" y="146" width="20" height="13" rx="2" fill="#FC3CCC" />
                    <rect x="588" y="146" width="16" height="13" rx="2" fill="#30F0CC" />
                  </g>
                  {/*  Sparkle Glints on Mirror Ball  */}
                  <path d="M532 76 L535 85 L544 88 L535 91 L532 100 L529 91 L520 88 L529 85 Z" fill="#FFFDF8" />
                  <path d="M614 128 L617 137 L626 140 L617 143 L614 152 L611 143 L602 140 L611 137 Z" fill="#FFFDF8" />
                </g>

                {/*  Bottom Neon Bass Cloud Waves  */}
                <g aria-hidden="true">
                  <circle cx="88" cy="595" r="46" fill="url(#starExtrudeGrad)" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="152" cy="605" r="38" fill="#30F0CC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="515" cy="592" r="48" fill="url(#cloudPinkGrad)" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="575" cy="568" r="42" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="715" cy="575" r="65" fill="url(#starExtrudeGrad)" stroke="#12041B" strokeWidth="3.5" />
                </g>

                {/*  4. DANCER A (LEFT FOREGROUND — Pointing Skyward, Pink Bubble Braid, Mint Jacket, Pink Bell-Bottoms)  */}
                <g className="sr-svg-dancer-left">
                  <g transform="translate(-48, 6)">
                  {/*  Flowing Pink Bubble Ponytail Braid  */}
                  <circle cx="135" cy="396" r="14" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="148" cy="374" r="17" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="168" cy="355" r="19" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="192" cy="345" r="16" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />

                  {/*  Raised Right Arm Pointing to the Star  */}
                  <path
                    d="M 248 360 L 282 298 L 296 305 L 266 372 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Pointing Hand  */}
                  <path
                    d="M 280 298 L 294 276 L 300 280 L 292 296 L 298 302 L 284 306 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3"
                  />

                  {/*  Left Arm Extended Downward  */}
                  <path
                    d="M 185 408 L 152 442 L 164 450 L 198 418 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />

                  {/*  Cropped Electric-Mint Puff Sleeve Jacket & Acid-Lime Crop Top  */}
                  <path
                    d="M 205 368 C 182 372, 168 395, 176 420 L 208 424 L 218 378 Z"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Acid-Lime Top & Midriff  */}
                  <polygon
                    points="212,374 252,372 246,414 210,414"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="212,414 245,414 243,432 210,432"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Right Mint Jacket Wing  */}
                  <path
                    d="M 244 368 L 278 320 L 296 332 L 262 396 L 245 398 Z"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />

                  {/*  Head, Gold Hoop Earring & Neon Visor Shades  */}
                  <circle cx="228" cy="346" r="18" fill="#FF9BB0" stroke="#12041B" strokeWidth="3.8" />
                  <path d="M 210 342 C 212 324, 238 322, 244 338 Z" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  {/*  Gold Hoop Earring  */}
                  <circle cx="212" cy="356" r="7" fill="none" stroke="#FCF03C" strokeWidth="3" />
                  {/*  Mint & Pink Futuristic Visor  */}
                  <rect
                    x="222"
                    y="335"
                    width="24"
                    height="10"
                    rx="4"
                    transform="rotate(-10 234 340)"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3"
                  />

                  {/*  High-Waisted Hot-Pink Wide Bell-Bottom Trousers  */}
                  <polygon
                    points="206,432 246,432 292,554 242,562 224,484 186,564 138,542"
                    fill="url(#pantsPinkGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  {/*  White Side Racing Stripes on Bell-Bottoms  */}
                  <path
                    d="M 238 438 L 276 552"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 212 442 L 156 544"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/*  Chunky Acid-Lime Platform Boots  */}
                  <polygon
                    points="146,546 178,560 172,592 126,592 132,572 144,570"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="252,558 284,554 306,588 248,592"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                    strokeLinejoin="round"
                  />
                  </g>
                </g>

                {/*  5. DANCER B (RIGHT FOREGROUND — Curly Purple Hair, Patterned Shirt, Mint Wide-Leg Pants)  */}
                <g className="sr-svg-dancer-right">
                  <g transform="translate(8, 22)">
                  {/*  Energy Rays above Dancer B  */}
                  <line x1="560" y1="305" x2="542" y2="282" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="576" y1="296" x2="568" y2="268" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="592" y1="298" x2="596" y2="270" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />

                  {/*  Raised Left & Right Arms  */}
                  <path
                    d="M 552 405 L 542 355 L 558 352 L 570 395 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M 652 365 L 682 325 L 652 296 L 642 308 L 662 328 L 636 355 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />

                  {/*  White Inner Tee & Open Purple/Gold Retro Disco Shirt  */}
                  <polygon
                    points="584,368 638,365 626,435 582,435"
                    fill="#FFFDF8"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Open Patterned Shirt Flaps  */}
                  <polygon
                    points="552,386 592,366 586,445 552,448"
                    fill="#4A157A"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="632,362 672,352 658,442 624,436"
                    fill="#4A157A"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Gold Squiggle Motifs on Shirt  */}
                  <circle cx="572" cy="402" r="5" fill="#FCF03C" />
                  <circle cx="568" cy="428" r="4" fill="#FC3CCC" />
                  <circle cx="646" cy="388" r="6" fill="#FCF03C" />
                  <circle cx="642" cy="418" r="4.5" fill="#30F0CC" />

                  {/*  Head, Curly Purple Hair & Mint Shades  */}
                  <circle cx="612" cy="342" r="17" fill="#FF9BB0" stroke="#12041B" strokeWidth="3.8" />
                  {/*  Curly Purple Hair Cloud  */}
                  <path
                    d="M 592 336 C 586 318, 604 308, 616 314 C 628 308, 644 320, 636 336 C 642 344, 632 352, 626 344 Z"
                    fill="#9451FF"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Mint Sunglasses  */}
                  <rect x="596" y="334" width="24" height="9" rx="3" fill="#30F0CC" stroke="#12041B" strokeWidth="2.8" />

                  {/*  Electric-Mint Wide-Leg Trousers  */}
                  <polygon
                    points="580,435 628,435 656,492 618,548 592,538 616,488 588,476 544,568 510,562"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/*  Platform Sneakers  */}
                  <polygon
                    points="508,562 540,568 544,592 496,592"
                    fill="#FFFDF8"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="588,540 622,548 632,572 580,578"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/*  Distinct Scroll Teaser  */}
          <div className="sr-scroll-teaser-wrap">
            <a href="#manifesto" className="sr-scroll-teaser-link">
              <span aria-hidden="true">✦</span>
              <span>DROP INTO THE FLOOR</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
  );
}
