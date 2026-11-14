'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { KOI_SPECIMENS, KoiId, KoiSpecimen } from '../data/garden';
import { createKoiField, KoiFieldController } from '../field/koiField';
import { mountField, prefersReducedMotion } from '../field/mount';
import Reveal from './Reveal';
import SplitWords from './SplitWords';

function KoiSilhouette({ specimen }: { specimen: KoiSpecimen }) {
  const { id, primaryColor, secondaryColor, accentColor } = specimen;
  const finColor = id === 'yamabuki' ? '#DFB07D' : '#EFE9DA';

  return (
    <svg viewBox="0 0 260 110" width="240" height="102" fill="none" aria-hidden="true">
      {/* Pectoral fins */}
      <path d="M148 41 C160 18, 134 12, 120 35 Z" fill={finColor} fillOpacity="0.9" stroke="#D6C7A9" strokeWidth="0.9" />
      <path d="M148 69 C160 92, 134 98, 120 75 Z" fill={finColor} fillOpacity="0.9" stroke="#D6C7A9" strokeWidth="0.9" />

      {/* Forked caudal tail fin */}
      <path
        d="M54 55 C32 34, 14 32, 10 43 C24 51, 24 59, 10 67 C14 78, 32 76, 54 55 Z"
        fill={finColor}
        stroke="#D6C7A9"
        strokeWidth="0.9"
      />

      {/* Body outline derived from R * sin(pi*u)^0.7 * (0.72 + 0.28u) */}
      <path
        d="M236 55 C234 36, 200 28, 152 31 C106 34, 72 44, 52 55 C72 66, 106 76, 152 79 C200 82, 234 74, 236 55 Z"
        fill={primaryColor}
        stroke="#D6C7A9"
        strokeWidth="1.2"
      />

      {/* Pattern islands matching the 3D TSL shader */}
      {id === 'kohaku' && (
        <>
          <path
            d="M222 51 C214 36, 186 33, 174 43 C168 51, 182 65, 204 65 C216 65, 224 58, 222 51 Z"
            fill={secondaryColor}
          />
          <path
            d="M150 35 C132 34, 110 42, 108 55 C112 67, 136 69, 154 60 C162 54, 160 38, 150 35 Z"
            fill={secondaryColor}
          />
        </>
      )}

      {id === 'yamabuki' && (
        <path
          d="M226 57 C208 68, 168 72, 128 70 C98 68, 76 62, 62 56 C84 69, 128 77, 172 76 C206 75, 224 67, 226 57 Z"
          fill={secondaryColor}
          fillOpacity="0.88"
        />
      )}

      {id === 'shiro' && (
        <>
          <path
            d="M206 36 C188 33, 168 42, 172 56 C178 68, 202 68, 212 56 C217 48, 214 39, 206 36 Z"
            fill={secondaryColor}
          />
          <path
            d="M138 38 C116 38, 98 48, 102 60 C108 69, 130 69, 142 59 C148 52, 146 41, 138 38 Z"
            fill={secondaryColor}
          />
        </>
      )}

      {id === 'sanke' && (
        <>
          <path
            d="M220 48 C210 35, 184 35, 176 47 C172 58, 190 66, 208 63 C218 61, 223 54, 220 48 Z"
            fill={secondaryColor}
          />
          <path
            d="M164 38 C148 35, 134 45, 138 58 C143 68, 160 68, 168 58 C172 50, 170 40, 164 38 Z"
            fill={accentColor}
          />
          <path
            d="M118 44 C104 42, 92 49, 95 59 C99 66, 114 66, 122 59 C126 53, 124 46, 118 44 Z"
            fill={secondaryColor}
          />
          <ellipse cx="136" cy="64" rx="10" ry="6" fill={accentColor} />
        </>
      )}

      {/* Dorsal fin ridge */}
      <path d="M166 55 C144 51, 116 52, 96 55 C116 58, 144 59, 166 55 Z" fill="#D6C7A9" fillOpacity="0.65" />

      {/* Eyes */}
      <circle cx="222" cy="43" r="3" fill="#1E2320" />
      <circle cx="222" cy="67" r="3" fill="#1E2320" />
    </svg>
  );
}

/** The wake each koi draws on the water, shown as a short sample beside its name. */
function LineSample({ specimen }: { specimen: KoiSpecimen }) {
  return (
    <svg className="mnw-koi-note-line" viewBox="0 0 56 12" width="56" height="12" fill="none" aria-hidden="true">
      <path
        d="M2 7 C 12 1, 20 11, 30 6 S 46 2, 54 6"
        stroke={specimen.trailColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray={specimen.trailDash.map((dash) => dash * 0.45).join(' ') || undefined}
      />
    </svg>
  );
}

export default function KoiGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<KoiFieldController | null>(null);

  const [selected, setSelected] = useState<KoiId | null>(null);
  const [feedCount, setFeedCount] = useState(0);

  // The rings on the seam open as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    seamRef.current?.style.setProperty('--seam', value.toFixed(3));
  });

  useEffect(() => {
    const water = waterRef.current;
    const canvas = canvasRef.current;
    if (!water || !canvas) return;

    const reducedMotion = prefersReducedMotion();
    if (!reducedMotion) {
      seamRef.current?.style.setProperty('--seam', scrollYProgress.get().toFixed(3));
    }

    const field = createKoiField(canvas, water, {
      specimens: KOI_SPECIMENS,
      reducedMotion,
      labelFont: hintRef.current ? getComputedStyle(hintRef.current).fontFamily : 'monospace',
      onPick: (id) => setSelected((current) => (current === id ? null : id)),
      onFeed: () => setFeedCount((count) => count + 1),
    });
    fieldRef.current = field;
    const unmount = mountField(water, field);

    return () => {
      fieldRef.current = null;
      unmount();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    fieldRef.current?.setSelected(selected);
  }, [selected]);

  const selectedSpecimen = KOI_SPECIMENS.find((specimen) => specimen.id === selected);

  return (
    <section id="koi" ref={sectionRef} className="mnw-koi mnw-surface-dark">
      <div id="garden" className="sr-only" aria-hidden="true" />

      {/* Ripple handoff: rings spread from the bottom edge of the pond into the first chapter */}
      <div ref={seamRef} className="mnw-seam" aria-hidden="true">
        <svg viewBox="0 0 900 260" fill="none" focusable="false">
          <ellipse cx="450" cy="130" rx="446" ry="127" />
          <ellipse cx="450" cy="130" rx="330" ry="94" />
          <ellipse cx="450" cy="130" rx="214" ry="61" />
          <ellipse cx="450" cy="130" rx="98" ry="28" />
        </svg>
      </div>

      <div className="mnw-container mnw-koi-head">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">
                01 / <span className="mnw-ja" lang="ja">錦鯉</span> / NISHIKIGOI
              </p>
            </Reveal>
            <Reveal variant="words" delayMs={70}>
              <h2 className="mnw-h2">
                <SplitWords text="Each one leaves a different line." />
              </h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-lead">
                Look closely and each fish has its own pattern. Their paths cross the same water
                at their own pace.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mnw-koi-stage">
        <div ref={waterRef} className="mnw-koi-water">
          <canvas ref={canvasRef} className="mnw-koi-canvas" aria-hidden="true" />
          <div className="mnw-container mnw-koi-hint">
            <p ref={hintRef} className="mnw-mono">
              <span className="mnw-koi-hint-ring" aria-hidden="true" />
              Click the water to feed · pick a koi to follow its line
            </p>
            <button type="button" className="mnw-chip" onClick={() => fieldRef.current?.feed()}>
              Feed the koi
            </button>
          </div>
        </div>

        <div className="mnw-container mnw-koi-notes-wrap">
          <Reveal variant="rise" delayMs={120}>
            <ul className="mnw-koi-notes" aria-label="Koi field notes">
              {KOI_SPECIMENS.map((specimen) => {
                const isSelected = specimen.id === selected;
                return (
                  <li key={specimen.id}>
                    <button
                      type="button"
                      className={`mnw-koi-note ${isSelected ? 'is-selected' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(isSelected ? null : specimen.id)}
                      onPointerEnter={() => fieldRef.current?.setHighlighted(specimen.id)}
                      onPointerLeave={() => fieldRef.current?.setHighlighted(null)}
                      onFocus={() => fieldRef.current?.setHighlighted(specimen.id)}
                      onBlur={() => fieldRef.current?.setHighlighted(null)}
                    >
                      <span className="mnw-koi-note-top">
                        <span className="mnw-mono mnw-koi-note-num">{specimen.number}</span>
                        <span className="mnw-koi-note-name">{specimen.label}</span>
                        <LineSample specimen={specimen} />
                      </span>
                      <span className="mnw-koi-note-more">
                        <span className="mnw-koi-note-more-inner">
                          <span className="mnw-koi-note-figure">
                            <KoiSilhouette specimen={specimen} />
                          </span>
                          <span className="mnw-koi-note-pattern">{specimen.visiblePattern}</span>
                          <span className="mnw-koi-note-caption">{specimen.caption}</span>
                          <span className="mnw-koi-note-linecopy">
                            <span className="mnw-mono">Its line</span>
                            {specimen.line}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
        {selectedSpecimen ? `Following ${selectedSpecimen.label}` : ''}
      </div>
      <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
        {feedCount === 0 ? '' : feedCount % 2 === 0 ? 'Koi food dropped​' : 'Koi food dropped'}
      </div>
    </section>
  );
}
