'use client';

import { ArrowRight } from 'lucide-react';
import { GARDEN_INLINE_NOTES } from '../data/garden';
import Reveal from './Reveal';

export default function GardenIntro() {
  return (
    <section id="garden" className="mnw-section-paper mnw-surface-light">
      {/* Ripple-to-rule graphic handoff */}
      <div className="mnw-handoff">
        <div className="mnw-container">
          <div className="mnw-handoff-rule-wrap" aria-hidden="true">
            <div className="mnw-handoff-line" />
            <div className="mnw-handoff-ring">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="#D6C7A9" strokeWidth="1.2" />
                <circle cx="22" cy="22" r="10.5" stroke="#9E3F32" strokeWidth="1.2" strokeOpacity="0.65" />
                <circle cx="22" cy="22" r="2.5" fill="#9E3F32" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mnw-section">
        <div className="mnw-container mnw-intro-grid">
          <div className="mnw-intro-index">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">01 / THE GARDEN</p>
            </Reveal>
          </div>

          <div className="mnw-intro-body">
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Take the long way around.</h2>
            </Reveal>

            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-intro-copy">
                The pond is the beginning of this imagined walk. A path follows the water, passes
                beneath the blossoms, and arrives at a quiet shrine courtyard.
              </p>
            </Reveal>

            <Reveal variant="rise" delayMs={210}>
              <div className="mnw-inline-notes">
                {GARDEN_INLINE_NOTES.map((note) => (
                  <div key={note.term}>
                    <span className="mnw-mono mnw-inline-note-term">{note.term}</span>
                    <span className="mnw-inline-note-meaning">{note.meaning}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="wipe" delayMs={260}>
              <div className="mnw-route-preview">
                <svg
                  className="mnw-route-svg"
                  viewBox="0 0 460 150"
                  fill="none"
                  aria-label="Line diagram showing the route from the koi pond past the sakura tree and torii to the shrine hall"
                >
                  {/* Pond outline */}
                  <ellipse cx="185" cy="92" rx="112" ry="44" stroke="#526E58" strokeWidth="1.5" />
                  <circle cx="205" cy="90" r="14" stroke="#D6C7A9" strokeWidth="1.2" />
                  <circle cx="205" cy="90" r="26" stroke="#D6C7A9" strokeWidth="1" strokeOpacity="0.6" />
                  {/* Sakura grove */}
                  <circle cx="76" cy="48" r="24" stroke="#C7A6A2" strokeWidth="1.6" strokeDasharray="3 3" />
                  <circle cx="64" cy="54" r="14" stroke="#C7A6A2" strokeWidth="1.2" />
                  {/* Connecting top-down route */}
                  <path
                    d="M110 124 C56 108, 44 64, 88 40 C142 12, 244 16, 336 42 L392 26"
                    stroke="#9E3F32"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                  {/* Torii mark */}
                  <line x1="330" y1="30" x2="344" y2="52" stroke="#9E3F32" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Shrine hall plan */}
                  <rect
                    x="378"
                    y="12"
                    width="44"
                    height="28"
                    rx="2"
                    transform="rotate(-14 378 12)"
                    stroke="#1E2320"
                    strokeWidth="1.6"
                    fill="#F4EFE2"
                  />
                </svg>

                <a href="#walk" className="mnw-link-underline" style={{ color: 'var(--mnw-pond)' }}>
                  <span>Follow the route</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
