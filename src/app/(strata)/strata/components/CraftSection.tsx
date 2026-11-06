"use client";

interface CraftSectionProps {
  progress?: number;
}

export function CraftSection({ progress = 0 }: CraftSectionProps) {
  return (
    <section
      className="craft"
      id="craft"
      data-nav="dark"
      data-chapter="05 / CRAFT"
      aria-labelledby="craft-title"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div className="craft-stage sticky">
        <img
          className="craft-bg"
          src="/templates/strata/strata-04-craft-process.webp"
          alt="Artisan's hands working the terraced stoneware vessel at a pottery wheel"
        />
        <div className="craft-vignette" aria-hidden="true" />
        <div className="craft-copy">
          <span className="eyebrow">05 / The process</span>
          <h2 id="craft-title">
            Thrown,
            <br />
            stepped,
            <br />
            <em>fired.</em>
          </h2>
          <p className="craft-lede">
            Every Vessel No. 01 begins on a potter&apos;s wheel in small batch runs. The stepped terraces are hand-turned at leather-hard dryness, demanding exact wall thickness to prevent warping during high-temperature vitrification.
          </p>
        </div>
        <div className="craft-step">
          <span className="step-num meta">STAGE 02 / TURNING</span>
          <p>
            Precision turning tools carve the sculptural terraces directly into the revolving clay cylinder.
          </p>
        </div>
      </div>
    </section>
  );
}
