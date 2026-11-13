'use client';

import { KOI_SPECIMENS, KoiSpecimen } from '../data/garden';
import Reveal from './Reveal';

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

export default function KoiGallery() {
  return (
    <section
      id="koi"
      className="mnw-section mnw-section-paper mnw-surface-light"
      style={{ paddingTop: 24 }}
    >
      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">
                02 / <span className="mnw-ja" lang="ja">錦鯉</span> / NISHIKIGOI
              </p>
            </Reveal>
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Each one leaves a different line.</h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p style={{ margin: 0, color: 'color-mix(in srgb, var(--mnw-ink) 86%, transparent)' }}>
                Look closely and each fish has its own pattern. Their paths cross the same water
                at their own pace.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mnw-koi-strip">
          {KOI_SPECIMENS.map((specimen, idx) => (
            <Reveal key={specimen.id} variant="rise" delayMs={idx * 70}>
              <article className="mnw-koi-cell">
                <span className="mnw-mono" style={{ color: 'var(--mnw-vermilion)' }}>
                  {specimen.number}
                </span>
                <div className="mnw-koi-figure">
                  <KoiSilhouette specimen={specimen} />
                </div>
                <div>
                  <h3 className="mnw-koi-name">{specimen.label}</h3>
                  <p className="mnw-koi-pattern">{specimen.visiblePattern}</p>
                </div>
                <p className="mnw-koi-caption">{specimen.caption}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
