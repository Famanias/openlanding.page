"use client";

interface InteriorSectionProps {
  progress?: number;
}

export function InteriorSection({ progress = 0 }: InteriorSectionProps) {
  return (
    <section
      className="interior"
      id="interior"
      data-nav="dark"
      data-chapter="06 / CONTEXT"
      aria-labelledby="interior-title"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div className="interior-stage sticky">
        <img
          className="interior-picture"
          src="/templates/strata/strata-05-interior.webp"
          alt="STRATA Vessel No. 01 displayed at realistic scale on a pale oak sideboard in a quiet architectural home"
        />
        <div className="interior-shade" aria-hidden="true" />
        <div className="interior-copy">
          <span className="eyebrow">06 / Interior scale</span>
          <h2 id="interior-title">
            A presence
            <br />
            <em>in the room.</em>
          </h2>
        </div>
        <div className="interior-side">
          <div className="interior-scale">38 cm</div>
          <p>
            Substantial enough to hold architectural space as a standalone sculpture; proportioned to sit calmly against lime plaster, raw concrete, or oiled timber.
          </p>
        </div>
      </div>
    </section>
  );
}
