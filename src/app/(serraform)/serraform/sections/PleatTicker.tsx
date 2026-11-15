import React from 'react';

const PHRASES = [
  'Sixteen pleats',
  'One continuous surface',
  '2,880 mm unfolded',
  'Any colour, any print',
  'Gather it or give it room',
] as const;

const Zig: React.FC = () => (
  <svg viewBox="0 0 44 20" fill="none" className="srf-ticker-zig">
    <path
      d="M2 18L10 2L18 18L26 2L34 18L42 2"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Marquee band whose speed, direction and lean follow the scroll (see usePageMotion). */
export const PleatTicker: React.FC = () => (
  <div data-ticker="" aria-hidden="true" className="srf-ticker">
    <div data-ticker-track="" className="srf-ticker-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="srf-ticker-set">
          {PHRASES.map((phrase, i) => (
            <React.Fragment key={phrase}>
              <span className={i % 2 ? 'srf-ticker-word srf-ticker-outline' : 'srf-ticker-word'}>
                {phrase}
              </span>
              <Zig />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  </div>
);
