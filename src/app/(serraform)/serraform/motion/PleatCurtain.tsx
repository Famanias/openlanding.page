import React from 'react';

const PANELS = Array.from({ length: 16 }, (_, i) => i);
// Sixteen pleats drawn as one continuous zigzag
const ZIGZAG = PANELS.map((i) => `L${i * 10 + 5} ${i % 2 ? 22 : 2} L${i * 10 + 10} 12`).join(' ');

/**
 * Opening curtain: sixteen pleat panels cover the page, the mark draws, then the panels
 * gather into their creases. Driven by usePageMotion; hidden entirely for reduced motion,
 * and CSS retires it on its own if scripting never starts.
 */
export const PleatCurtain: React.FC = () => (
  <div data-curtain="" aria-hidden="true" className="srf-curtain">
    <div className="srf-curtain-panels">
      {PANELS.map((i) => (
        <span key={i} data-curtain-panel="" className="srf-curtain-panel" />
      ))}
    </div>
    <div data-curtain-core="" className="srf-curtain-core">
      <svg viewBox="0 0 160 24" fill="none" className="srf-curtain-zig">
        <path
          data-draw=""
          d={`M0 12 ${ZIGZAG}`}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div data-curtain-word="" className="srf-curtain-word">
        SERRAFORM
      </div>
      <div className="srf-curtain-meta">
        FOLD <span data-curtain-count="">00</span> / 16
      </div>
    </div>
  </div>
);
