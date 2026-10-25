export function Materials() {
  return (
    <section className="nu-section nu-materials" aria-labelledby="materials-title">
      <div className="nu-container nu-materials__grid">
        <div className="nu-materials__stack" data-nu-reveal="scale" aria-label="NULO material stack">
          <div className="nu-material-layer"><span className="nu-material-layer__line" /><span className="nu-material-layer__code">L—01 / carrier</span><span className="nu-material-layer__name">clear base</span></div>
          <div className="nu-material-layer"><span className="nu-material-layer__line" /><span className="nu-material-layer__code">AR—02 / treatment</span><span className="nu-material-layer__name">soft return</span></div>
          <div className="nu-material-layer"><span className="nu-material-layer__line" /><span className="nu-material-layer__code">F—03 / frame</span><span className="nu-material-layer__name">quiet flex</span></div>
        </div>
        <div className="nu-materials__copy">
          <span className="nu-eyebrow" data-nu-reveal="draw">03 / material stack</span>
          <h2 id="materials-title" data-nu-reveal="mask">Nothing extra.<br />Everything tuned.</h2>
          <p data-nu-reveal="rise">Three layers make a NULO frame feel light: a clear carrier, a low-glare return, and a resilient shape that gives a little at the hinge.</p>
          <div className="nu-materials__specs" data-nu-reveal="rise"><div className="nu-spec"><span className="nu-spec__code">01 / flex</span><span className="nu-spec__value">bio-nylon hinge</span></div><div className="nu-spec"><span className="nu-spec__code">02 / lens</span><span className="nu-spec__value">carrier ready</span></div><div className="nu-spec"><span className="nu-spec__code">03 / return</span><span className="nu-spec__value">48 hour check</span></div></div>
        </div>
      </div>
    </section>
  );
}
