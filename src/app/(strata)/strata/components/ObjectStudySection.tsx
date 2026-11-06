"use client";

export function ObjectStudySection() {
  return (
    <section
      className="object-study"
      id="object"
      data-nav="light"
      data-chapter="04 / ANATOMY"
      aria-labelledby="study-title"
    >
      <div className="study-inner">
        <div className="study-head">
          <span className="eyebrow">04 / Architectural study</span>
          <h2 id="study-title" className="study-title">
            The anatomy
            <br />
            <em>of form.</em>
          </h2>
          <p className="study-copy">
            Three stepped cantilevered rings taper gently into a weighted base. Conceived as a silent architectural monolith that anchors both empty space and Ikebana foliage.
          </p>
        </div>
        <div className="study-layout">
          <div className="study-photo-wrap">
            <img
              src="/templates/strata/strata-03-vessel-reference.png"
              alt="Four consistent views of the STRATA ceramic vessel showing its terraced silhouette"
              loading="lazy"
            />
          </div>
          <div className="study-specs">
            <div className="study-spec">
              <span className="spec-label meta">DIMENSIONS</span>
              <strong>380 × 240 mm</strong>
              <p>Height 38 cm, rim aperture 84 mm, base diameter 140 mm.</p>
            </div>
            <div className="study-spec">
              <span className="spec-label meta">WEIGHT &amp; DENSITY</span>
              <strong>4.2 kg</strong>
              <p>Thick-walled grogged stoneware providing stable ballast.</p>
            </div>
            <div className="study-spec">
              <span className="spec-label meta">FIRING SCHEDULE</span>
              <strong>1,280°C</strong>
              <p>Vitrified reduction firing over 36 hours in gas kiln.</p>
            </div>
          </div>
        </div>
        <div className="study-bottom">
          <div>
            <span className="meta">EDITION YIELD</span>
            <p>Strict numbered release of 48 specimens per finish.</p>
          </div>
          <div>
            <span className="meta">FUNCTIONALITY</span>
            <p>Water-tight interior glazing suitable for fresh stems or dry sculptural display.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
