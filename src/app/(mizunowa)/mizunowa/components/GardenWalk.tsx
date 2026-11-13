'use client';

import { useRef } from 'react';
import { GARDEN_STOPS } from '../data/garden';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';

function WalkRow({
  number,
  title,
  description,
  delayMs,
}: {
  number: string;
  title: string;
  description: string;
  delayMs: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { threshold: 0.05, once: true });

  return (
    <div
      ref={rowRef}
      className={`mnw-walk-row ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <span className="mnw-mono" style={{ color: 'var(--mnw-vermilion)' }}>
        {number}
      </span>
      <h3 className="mnw-walk-row-title">{title}</h3>
      <p className="mnw-walk-row-desc">{description}</p>
      <div className="mnw-walk-segment-line" aria-hidden="true">
        <div className="mnw-walk-segment-fill" />
      </div>
    </div>
  );
}

export default function GardenWalk() {
  return (
    <section id="walk" className="mnw-section mnw-section-paper mnw-surface-light">
      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">03 / THE WALK</p>
            </Reveal>
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Three places, one slow path.</h2>
            </Reveal>
          </div>
        </div>

        <div className="mnw-walk-grid">
          <div className="mnw-walk-map-col">
            <Reveal variant="wipe">
              <figure className="mnw-walk-map-frame" style={{ margin: 0 }}>
                <img
                  src="/templates/mizunowa/garden-map.svg"
                  alt="Editorial route map showing the pond edge, the sakura grove on the upper left, and the stepping stone path through the torii to the shrine courtyard on the upper right."
                  width={1200}
                  height={900}
                  className="mnw-walk-map-img"
                  referrerPolicy="no-referrer"
                />
                <figcaption className="mnw-walk-map-labels">
                  {GARDEN_STOPS.map((stop) => (
                    <span
                      key={stop.number}
                      className="mnw-mono"
                      style={{ color: 'var(--mnw-pond)' }}
                    >
                      {stop.mapLabel}
                    </span>
                  ))}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mnw-walk-rows-col">
            {GARDEN_STOPS.map((stop, idx) => (
              <WalkRow
                key={stop.number}
                number={stop.number}
                title={stop.title}
                description={stop.description}
                delayMs={idx * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
