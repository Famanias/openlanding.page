"use client";

interface MacroSectionProps {
  progress?: number;
}

export function MacroSection({ progress = 0 }: MacroSectionProps) {
  return (
    <section
      className="macro"
      id="material"
      data-nav="dark"
      data-chapter="03 / TEXTURE"
      aria-labelledby="macro-title"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div className="macro-stage sticky">
        <img
          className="macro-vessel"
          src="/templates/strata/strata-01-hero-vessel.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="macro-picture"
          src="/templates/strata/strata-02-ceramic-macro.webp"
          alt="Macro close-up of the vessel's tactile ridges and mineral grain"
        />
        <div className="macro-shade" aria-hidden="true" />
        <div className="macro-copy">
          <span className="eyebrow">03 / Mineral depth</span>
          <h2 id="macro-title">
            Tactile
            <br />
            <em>silence.</em>
          </h2>
        </div>
        <div className="macro-side">
          <span className="meta">SURFACE ANATOMY</span>
          <p>
            Chalky, unglazed stoneware. Micro-ridges left by artisan fingers during throwing, capturing soft shadow across daylight hours.
          </p>
        </div>
        <div className="macro-coord meta" aria-hidden="true">
          34.42° N, 135.53° E &nbsp;•&nbsp; 1,280°C REDUCTION
        </div>
      </div>
    </section>
  );
}
