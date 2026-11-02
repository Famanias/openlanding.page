"use client";

import React, { useState, useEffect, useRef } from "react";
import { computeScrollStage } from "../utils/clubLogic";

export function SoundStageSection() {
  const [progress, setProgress] = useState(0.15);
  const sectionRef = useRef<HTMLElement>(null);
  const manualLockUntilRef = useRef<number>(0);

  const stage = computeScrollStage(progress);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Date.now() >= manualLockUntilRef.current && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const startY = window.innerHeight * 0.75;
            const travel = Math.max(1, window.innerHeight * 0.65);
            const rawProgress = (startY - rect.top) / travel;
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              setProgress(rawProgress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleStagePillClick = (idx: number) => {
    const targetProgress = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.9;
    manualLockUntilRef.current = Date.now() + 1200;
    setProgress(targetProgress);
  };

  const ringOpacity = 0.25 + stage.progress * 0.75;
  const ringScale = (0.68 + stage.progress * 0.45).toFixed(3);

  const starOpacity = stage.progress < 0.34 ? 0.12 : stage.progress < 0.67 ? 0.48 : 1;
  const starScale = (0.5 + stage.progress * 0.65).toFixed(3);
  const starRot = (-25 + stage.progress * 50).toFixed(1);

  const dancersOpacity = 0.35 + stage.progress * 0.65;
  const dancersOffset = ((1 - stage.progress) * 26).toFixed(1);

  return (
    <section
      id="the-sound"
      ref={sectionRef}
      className="sr-sound-scroll-track"
      aria-labelledby="sound-stage-title"
    >
      <div className="sr-sound-sticky-stage">
        <div className="sr-container">
          <div className="sr-sound-stage-frame" id="sound-stage-frame" data-phase={stage.phaseId}>
            {/* Left Narrative & Interactive Stage Controls */}
            <div>
              <div className="sr-kicker-label">
                <span>SCROLL-DRIVEN SONIC PROGRESSION</span>
                <span className="sr-spark" aria-hidden="true">✦</span>
              </div>

              <div className="sr-stage-phase-controls" role="group" aria-label="Select sonic stage">
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 0 ? "sr-active" : ""}`}
                  data-stage-btn="0"
                  onClick={() => handleStagePillClick(0)}
                >
                  01. WARM UP
                </button>
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 1 ? "sr-active" : ""}`}
                  data-stage-btn="1"
                  onClick={() => handleStagePillClick(1)}
                >
                  02. TURN UP
                </button>
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 2 ? "sr-active" : ""}`}
                  data-stage-btn="2"
                  onClick={() => handleStagePillClick(2)}
                >
                  03. ALL OUT
                </button>
              </div>

              <h2 id="sound-stage-title" className="sr-display-type sr-sound-stage-headline">
                {stage.headline}
              </h2>

              <p className="sr-sound-stage-subcopy" id="sound-stage-subcopy">
                {stage.subcopy}
              </p>

              <div className="sr-sound-telemetry-bar">
                <span id="stage-phase-readout">PHASE: {stage.phaseLabel}</span>
                <span>·</span>
                <span id="stage-bpm-readout">{stage.bpm} BPM</span>
                <span>·</span>
                <span id="stage-pct-readout">PROGRESS: {Math.round(stage.progress * 100)}%</span>
              </div>
            </div>

            {/* Right Dynamic Scroll-Animated SVG Scene */}
            <div className="sr-sound-visual-canvas">
              <svg
                className="sr-sound-stage-svg"
                viewBox="0 0 440 400"
                role="img"
                aria-label="Dynamic club sound visualization transforming from Warm Up vinyl sphere to Turn Up bass rings to All Out supernova"
              >
                {/* Phase 2 Expanding Concentric Bass Rings */}
                <g
                  className="sr-stage-ring-group"
                  id="stage-ring-group"
                  style={{
                    opacity: ringOpacity,
                    transform: `scale(${ringScale})`,
                  }}
                >
                  <circle
                    cx="220"
                    cy="200"
                    r="165"
                    fill="none"
                    stroke="#30F0CC"
                    strokeWidth="2.5"
                    strokeDasharray="14 8"
                  />
                  <circle cx="220" cy="200" r="130" fill="none" stroke="#FC3CCC" strokeWidth="3" />
                  <circle
                    cx="220"
                    cy="200"
                    r="98"
                    fill="none"
                    stroke="#FCF03C"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                </g>

                {/* Phase 3 Erupting Neon Supernova Star */}
                <g
                  className="sr-stage-supernova-group"
                  id="stage-supernova-group"
                  style={{
                    opacity: starOpacity,
                    transform: `scale(${starScale}) rotate(${starRot}deg)`,
                  }}
                >
                  <polygon
                    points="220,25 256,132 368,118 286,196 322,308 220,250 118,308 154,196 72,118 184,132"
                    fill="url(#starFaceGrad)"
                    stroke="#FC3CCC"
                    strokeWidth="4"
                  />
                </g>

                {/* Phase 1 Core Cosmic Vinyl & Mirror Sphere */}
                <g id="stage-core-sphere">
                  <circle cx="220" cy="200" r="68" fill="#1E092B" stroke="#30F0CC" strokeWidth="4" />
                  <circle cx="220" cy="200" r="48" fill="#2C103B" stroke="#FC3CCC" strokeWidth="3" />
                  <circle cx="220" cy="200" r="22" fill="#FCF03C" stroke="#12041B" strokeWidth="3" />
                  <circle cx="220" cy="200" r="6" fill="#12041B" />
                </g>

                {/* Phase 2 & 3 Sliding Dancer Silhouettes & Equalizer Bars */}
                <g
                  className="sr-stage-dancers-group"
                  id="stage-dancers-group"
                  style={{
                    opacity: dancersOpacity,
                    transform: `translateY(${dancersOffset}px)`,
                  }}
                >
                  <rect x="75" y="330" width="14" height="42" rx="4" fill="#30F0CC" />
                  <rect x="98" y="310" width="14" height="62" rx="4" fill="#30F0CC" />
                  <rect x="121" y="322" width="14" height="50" rx="4" fill="#9451FF" />
                  <rect x="144" y="294" width="14" height="78" rx="4" fill="#FC3CCC" />
                  <rect x="167" y="315" width="14" height="57" rx="4" fill="#FC3CCC" />
                  <rect x="259" y="312" width="14" height="60" rx="4" fill="#FCF03C" />
                  <rect x="282" y="296" width="14" height="76" rx="4" fill="#FCF03C" />
                  <rect x="305" y="318" width="14" height="54" rx="4" fill="#30F0CC" />
                  <rect x="328" y="332" width="14" height="40" rx="4" fill="#30F0CC" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
