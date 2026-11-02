import React from "react";

export function ManifestoSection() {
  return (
    <section id="manifesto" className="sr-manifesto-section" aria-labelledby="manifesto-title">
      <div className="sr-container">
        <div className="sr-manifesto-card">
          <div>
            <div className="sr-kicker-label">
              <span>CLUB MANIFESTO</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="manifesto-title" className="sr-display-type sr-manifesto-headline">
              ORDINARY NIGHTS? <span className="sr-stroke-accent">NOT HERE.</span>
            </h2>
            <p className="sr-manifesto-prose">
              We tore out the velvet ropes, killed the bottle-service ego, and poured everything into a custom
              four-corner analog sound system and a light rig built like a UFO landing. At STAR RIOT, every body on
              the floor is the headliner—whether you came in platform boots or sneakers worn through from last
              weekend.
            </p>
            <div className="sr-manifesto-pillars">
              <span>✦ 360° CUSTOM BASS ARRAY</span>
              <span>✦ ZERO VIP ROPES</span>
              <span>✦ VINYL &amp; FUTURE SYNTH</span>
            </div>
          </div>

          {/* Spinning Cosmic Vinyl Illustration */}
          <div className="sr-manifesto-vinyl-art" aria-hidden="true">
            <svg className="sr-spin-vinyl" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="122" fill="#12041B" stroke="#30F0CC" strokeWidth="4" />
              <circle
                cx="130"
                cy="130"
                r="102"
                fill="none"
                stroke="rgba(202, 185, 212, 0.25)"
                strokeWidth="2"
                strokeDasharray="18 10"
              />
              <circle
                cx="130"
                cy="130"
                r="82"
                fill="none"
                stroke="rgba(252, 60, 204, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="28 14"
              />
              <circle cx="130" cy="130" r="62" fill="none" stroke="rgba(252, 240, 60, 0.45)" strokeWidth="2" />
              <polygon
                points="130,68 144,108 186,108 152,134 165,175 130,150 95,175 108,134 74,108 116,108"
                fill="url(#starFaceGrad)"
                stroke="#12041B"
                strokeWidth="3"
              />
              <circle cx="130" cy="130" r="14" fill="#12041B" stroke="#FFFDF8" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontally Marching Ticker */}
      <div className="sr-riot-ticker" aria-label="Dance, Sweat, Shine, Repeat">
        <div className="sr-ticker-track">
          <span>DANCE / SWEAT / SHINE / REPEAT ✦</span>
          <span>DISCO FEVER / FUTURE SOUNDS / ZERO ORDINARY NIGHTS ✦</span>
          <span>TONIGHT WE GO SUPERNOVA ✦</span>
          <span aria-hidden="true">DANCE / SWEAT / SHINE / REPEAT ✦</span>
          <span aria-hidden="true">DISCO FEVER / FUTURE SOUNDS / ZERO ORDINARY NIGHTS ✦</span>
          <span aria-hidden="true">TONIGHT WE GO SUPERNOVA ✦</span>
        </div>
      </div>
    </section>
  );
}
