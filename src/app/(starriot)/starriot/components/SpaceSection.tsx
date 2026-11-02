"use client";

import React, { useState } from "react";

export function SpaceSection() {
  const [floorColor, setFloorColor] = useState("#30F0CC");

  return (
    <section id="the-space" className="sr-space-section" aria-labelledby="space-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>ARCHITECTURE OF AFTER-DARK JOY</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="space-heading" className="sr-display-type sr-section-title">
              INSIDE THE RIOT.
            </h2>
          </div>
        </div>

        <div className="sr-space-bento-grid">
          {/* Zone 1: THE FLOOR */}
          <article
            className="sr-space-card sr-space-card-floor"
            id="floor-card"
            style={{
              borderColor: floorColor,
              boxShadow: `0 0 28px ${floorColor}44`,
            }}
          >
            <div>
              <span className="sr-space-sticker-tag">01 · THE FLOOR</span>
              <h3 className="sr-display-type sr-space-card-title">SUNKEN SPRUNG NEON FLOOR</h3>
              <p className="sr-space-card-copy">
                Built on cushioned maple and illuminated under-glass panels for 600 dancers. Zero VIP tables blocking
                sightlines—just one electric sea of motion. Test the under-floor light matrix below:
              </p>
            </div>
            <div>
              <div className="sr-floor-matrix-bar" role="group" aria-label="Preview under-floor lighting color">
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#30F0CC" ? "sr-active" : ""}`}
                  data-floor-color="#30F0CC"
                  onClick={() => setFloorColor("#30F0CC")}
                >
                  Electric Mint
                </button>
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#FC3CCC" ? "sr-active" : ""}`}
                  data-floor-color="#FC3CCC"
                  onClick={() => setFloorColor("#FC3CCC")}
                >
                  Hot Pink
                </button>
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#FCF03C" ? "sr-active" : ""}`}
                  data-floor-color="#FCF03C"
                  onClick={() => setFloorColor("#FCF03C")}
                >
                  Acid Lime
                </button>
              </div>
            </div>
          </article>

          {/* Zone 2: THE LIGHTS */}
          <article className="sr-space-card sr-space-card-lights">
            <div>
              <span className="sr-space-sticker-tag">02 · THE LIGHTS</span>
              <h3 className="sr-display-type sr-space-card-title">TRIPLE MIRROR-BALL ORBIT</h3>
              <p className="sr-space-card-copy">
                Three custom-faceted cosmic mirror spheres suspended above the room scatter thousands of mint,
                magenta, and lime starlets across the walls in real time.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--electric-mint)", letterSpacing: "0.1em" }}>
              ✦ 48 ANALOG PRISM BEAMS · ZERO HARSH STROBES
            </div>
          </article>

          {/* Zone 3: THE BOOTH */}
          <article className="sr-space-card sr-space-card-booth">
            <div>
              <span className="sr-space-sticker-tag">03 · THE BOOTH</span>
              <h3 className="sr-display-type sr-space-card-title">360° FLOOR-LEVEL DECK</h3>
              <p className="sr-space-card-copy">
                No distant stage altar. Our custom rotary mixer and twin turntables sit right in the pocket of the
                dance floor so DJ and crowd lock into the same sweat and energy.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--acid-lime)", letterSpacing: "0.1em" }}>
              ✦ CUSTOM ROTARY MIXER · DUAL VINYL &amp; DIGITAL
            </div>
          </article>

          {/* Zone 4: THE CREW */}
          <article className="sr-space-card sr-space-card-crew">
            <div>
              <span className="sr-space-sticker-tag">04 · THE CREW</span>
              <h3 className="sr-display-type sr-space-card-title">RADICAL INCLUSIVITY &amp; CARE</h3>
              <p className="sr-space-card-copy">
                Dedicated floor hosts, free cold water stations at both ends of the room, a cozy chill-out lounge
                with plush booths, and a camera-free dance floor policy so you can dance without performing.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--warm-coral)", letterSpacing: "0.1em" }}>
              ✦ NO FLASH PHOTOGRAPHY · FREE EARPLUGS AT COAT CHECK
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
