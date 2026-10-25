import { FRAMES } from "../content/frames";

export function Frames() {
  return (
    <section id="frames" className="nu-section nu-frames" aria-labelledby="frames-title">
      <div className="nu-container">
        <div className="nu-section__head">
          <div><span className="nu-eyebrow" data-nu-reveal="draw">02 / frame index</span><h2 id="frames-title" className="nu-section__title" data-nu-reveal="mask">Three shapes.<br />One calibrated day.</h2></div>
          <p className="nu-section__intro" data-nu-reveal="rise">Designed as carriers, not costumes. Choose a frame with a little room for the way you turn.</p>
        </div>
        <div className="nu-frame-grid">
          {FRAMES.map((frame, index) => (
            <article className="nu-frame-card" key={frame.id} data-nu-reveal="scale" style={{ "--nu-delay": `${index * 80}ms` } as React.CSSProperties}>
              <div className="nu-frame-card__top"><span className="nu-frame-card__index">N / {frame.index}</span><span className="nu-frame-card__tag">{frame.note}</span></div>
              <div className="nu-frame-card__art" aria-hidden="true"><div className="nu-frame-card__frame" /></div>
              <div className="nu-frame-card__bottom"><div><h3 className="nu-frame-card__name">{frame.name}</h3><p className="nu-frame-card__meta">{frame.descriptor}<br />{frame.fit}</p></div><a className="nu-frame-card__link" href="#fitting" data-frame={frame.name}>set fit <span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
