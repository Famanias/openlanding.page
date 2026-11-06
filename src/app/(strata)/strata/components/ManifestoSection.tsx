"use client";

export function ManifestoSection() {
  return (
    <section
      className="manifesto"
      id="manifesto"
      data-nav="dark"
      data-chapter="02 / ETHOS"
      aria-labelledby="manifesto-title"
    >
      <div className="manifesto-inner">
        <div className="manifesto-content">
          <div className="manifesto-left">
            <span className="eyebrow reveal in-view">02 / The ethos</span>
            <h2 id="manifesto-title" className="manifesto-statement reveal in-view">
              We make objects that outlast the noise of the moment.
            </h2>
          </div>
          <div className="manifesto-right reveal in-view">
            <p className="manifesto-lead">
              In an era of fleeting surfaces, STRATA treats clay as geological architecture. Each stepped terrace is shaped by wheel, turned by hand, and fired to high vitrification.
            </p>
            <div className="manifesto-foot">
              <span className="meta">ARCHITECTURAL STONEWARE</span>
              <p>Not decoration. Not ornament. An enduring grounding anchor for considered living.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
