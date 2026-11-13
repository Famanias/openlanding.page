'use client';

import { useEffect, useRef, useState } from 'react';
import { SEASON_NOTES, SeasonId } from '../data/garden';
import { useInView } from '../hooks/useInView';

const STATEMENT_LINES = [
  ['The', 'garden', 'keeps', 'its', 'shape.'],
  ['The', 'light', 'keeps', 'changing.'],
];

const SEASON_PALETTES: Record<
  SeasonId,
  {
    sky: string;
    bank: string;
    water: string;
    foliagePrimary: string;
    foliageSecondary: string;
    pathAccent: string;
    showCanopy: boolean;
    showPetals: boolean;
    showBareBranches: boolean;
  }
> = {
  spring: {
    sky: '#112C2A',
    bank: '#203D33',
    water: '#173A36',
    foliagePrimary: '#C7A6A2',
    foliageSecondary: '#526E58',
    pathAccent: '#D6C7A9',
    showCanopy: true,
    showPetals: true,
    showBareBranches: false,
  },
  summer: {
    sky: '#112C2A',
    bank: '#1E3A30',
    water: '#133532',
    foliagePrimary: '#526E58',
    foliageSecondary: '#2F523C',
    pathAccent: '#D6C7A9',
    showCanopy: true,
    showPetals: false,
    showBareBranches: false,
  },
  autumn: {
    sky: '#162B28',
    bank: '#2C3D31',
    water: '#15322F',
    foliagePrimary: '#CB9462',
    foliageSecondary: '#D6C7A9',
    pathAccent: '#CB9462',
    showCanopy: true,
    showPetals: true,
    showBareBranches: false,
  },
  winter: {
    sky: '#112C2A',
    bank: '#1C332D',
    water: '#102826',
    foliagePrimary: '#F4EFE2',
    foliageSecondary: '#D6C7A9',
    pathAccent: '#F4EFE2',
    showCanopy: false,
    showPetals: false,
    showBareBranches: true,
  },
};

function SeasonalPaperCut({ season }: { season: SeasonId }) {
  const pal = SEASON_PALETTES[season];

  return (
    <svg
      viewBox="0 0 680 480"
      width={680}
      height={480}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`Paper-cut garden diagram in ${season}`}
    >
      <rect width="680" height="480" fill={pal.sky} />
      {/* Layered paper-cut hills & mossy bank */}
      <path
        d="M0 240 C160 190, 340 205, 680 185 L680 480 L0 480 Z"
        fill={pal.bank}
      />
      <path
        d="M0 325 C170 295, 420 295, 680 320 L680 480 L0 480 Z"
        fill={pal.foliageSecondary}
        fillOpacity="0.32"
      />

      {/* Pond cutout */}
      <ellipse cx="330" cy="348" rx="220" ry="96" fill={pal.water} stroke={pal.pathAccent} strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="350" cy="342" rx="46" ry="20" fill="none" stroke="#F4EFE2" strokeOpacity="0.32" strokeWidth="1.2" />

      {/* Stepping stone path & shrine courtyard on right */}
      <g fill={pal.pathAccent}>
        <ellipse cx="445" cy="252" rx="14" ry="7" transform="rotate(-18 445 252)" />
        <ellipse cx="478" cy="232" rx="15" ry="7" transform="rotate(-22 478 232)" />
        <ellipse cx="512" cy="212" rx="15" ry="7" transform="rotate(-20 512 212)" />
        <ellipse cx="546" cy="192" rx="16" ry="7" transform="rotate(-16 546 192)" />
      </g>

      {/* Torii on approach */}
      <g transform="translate(520 192)">
        <rect x="-24" y="-44" width="6" height="46" fill="#9E3F32" />
        <rect x="18" y="-44" width="6" height="46" fill="#9E3F32" />
        <rect x="-30" y="-32" width="60" height="5" fill="#9E3F32" />
        <rect x="-36" y="-48" width="72" height="7" rx="1.5" fill="#9E3F32" />
        <rect x="-38" y="-51" width="76" height="3.5" fill="#1E2320" />
      </g>

      {/* Timber hall behind torii */}
      <g transform="translate(592 152)">
        <rect x="-46" y="4" width="92" height="28" fill="#F4EFE2" fillOpacity="0.92" />
        <rect x="-46" y="4" width="6" height="28" fill="#1E2320" />
        <rect x="40" y="4" width="6" height="28" fill="#1E2320" />
        <rect x="-10" y="10" width="20" height="22" fill="#1E2320" />
        <polygon points="-58,6 0,-26 58,6" fill="#1E2320" />
        <rect x="-48" y="32" width="96" height="7" fill={pal.pathAccent} />
      </g>

      {/* Sakura tree silhouette on left */}
      <g transform="translate(135 258)">
        <path
          d="M-8 10 C-6 -24, 4 -54, 16 -84 C26 -108, 48 -126, 76 -140 M6 -52 C-24 -78, -56 -96, -86 -106 M18 -92 C-8 -124, -26 -148, -32 -174 M36 -112 C68 -124, 102 -122, 132 -110"
          stroke="#1E2320"
          strokeWidth={pal.showBareBranches ? '8' : '11'}
          strokeLinecap="round"
          fill="none"
        />
        {pal.showBareBranches && (
          <path
            d="M-54 -95 C-72 -112, -90 -122, -108 -124 M48 -126 C72 -148, 96 -160, 118 -164 M-22 -142 C-38 -162, -48 -182, -48 -198"
            stroke="#F4EFE2"
            strokeOpacity="0.55"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {pal.showCanopy && (
          <g>
            <circle cx="-82" cy="-112" r="38" fill={pal.foliagePrimary} fillOpacity="0.9" />
            <circle cx="-26" cy="-168" r="44" fill={pal.foliagePrimary} fillOpacity="0.92" />
            <circle cx="42" cy="-152" r="40" fill={pal.foliagePrimary} fillOpacity="0.88" />
            <circle cx="114" cy="-116" r="36" fill={pal.foliagePrimary} fillOpacity="0.9" />
            <circle cx="24" cy="-108" r="30" fill={pal.foliageSecondary} fillOpacity="0.55" />
          </g>
        )}
      </g>

      {/* Fallen petals / autumn leaves on water */}
      {pal.showPetals && (
        <g fill={pal.foliagePrimary} fillOpacity="0.85">
          <ellipse cx="215" cy="336" rx="6" ry="3" transform="rotate(20 215 336)" />
          <ellipse cx="245" cy="358" rx="5" ry="2.6" transform="rotate(-14 245 358)" />
          <ellipse cx="282" cy="322" rx="5.5" ry="2.8" transform="rotate(30 282 322)" />
        </g>
      )}
    </svg>
  );
}

export default function Seasons() {
  const [activeSeason, setActiveSeason] = useState<SeasonId>('spring');
  const statementRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statementRef, { threshold: 0.35, once: true });
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const doneTimer = window.setTimeout(() => setLitCount(99), 0);
      return () => window.clearTimeout(doneTimer);
    }

    let count = 0;
    const totalWords = 9;
    const timer = window.setInterval(() => {
      count += 1;
      setLitCount(count);
      if (count >= totalWords) {
        window.clearInterval(timer);
      }
    }, 110);

    return () => window.clearInterval(timer);
  }, [inView]);

  const handleToggle = (seasonId: SeasonId, e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const detailsEl = e.currentTarget;
    if (detailsEl.open) {
      setActiveSeason(seasonId);
    } else {
      // Check if any sibling details remain open; if none, restore spring
      const parent = detailsEl.parentElement;
      if (!parent) return;
      const openEls = Array.from(parent.querySelectorAll<HTMLDetailsElement>('details[open]'));
      if (openEls.length === 0) {
        setActiveSeason('spring');
      } else {
        const lastOpen = openEls[openEls.length - 1];
        const fallbackId = (lastOpen.dataset.season as SeasonId | undefined) ?? 'spring';
        setActiveSeason(fallbackId);
      }
    }
  };

  return (
    <section id="seasons" className="mnw-section mnw-section-moss mnw-surface-dark">
      <div className="mnw-container">
        <div ref={statementRef} className="mnw-statement-wrap">
          <p className="mnw-eyebrow mnw-chapter-label">SEASONAL NOTES</p>
          <h2 className="mnw-statement">
            {STATEMENT_LINES.map((words, lineIdx) => (
              <span key={lineIdx} style={{ display: 'block' }}>
                {words.map((word, wordIdx) => {
                  const flatIndex = (lineIdx === 0 ? 0 : STATEMENT_LINES[0].length) + wordIdx + 1;
                  const isLit =
                    flatIndex <= litCount &&
                    (word === 'shape.' || word === 'light' || word === 'changing.');
                  return (
                    <span
                      key={`${lineIdx}-${word}`}
                      className={`mnw-statement-word ${isLit ? 'is-lit' : ''}`}
                      style={{ marginRight: '0.28em' }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
        </div>

        <div className="mnw-seasons-grid">
          <div className="mnw-seasons-art-col">
            <div className="mnw-seasons-art-frame">
              <SeasonalPaperCut season={activeSeason} />
            </div>
          </div>

          <div className="mnw-seasons-list-col">
            {SEASON_NOTES.map((note) => (
              <details
                key={note.id}
                data-season={note.id}
                open={note.id === 'spring'}
                className="mnw-season-details"
                onToggle={(e) => handleToggle(note.id, e)}
              >
                <summary className="mnw-season-summary">
                  <span className="mnw-season-title-group">
                    <span className="mnw-season-name">{note.season}</span>
                    <span className="mnw-season-summary-copy">{note.summary}</span>
                  </span>
                  <span className="mnw-season-indicator mnw-ja" lang="ja">
                    {note.japanese}
                  </span>
                </summary>
                <div className="mnw-season-body">{note.detail}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
