import { PROTOCOL } from "../content/protocol";

export function Protocol() {
  return (
    <section id="protocol" className="nu-section nu-protocol" aria-labelledby="protocol-title">
      <div className="nu-container">
        <div className="nu-section__head"><div><span className="nu-eyebrow" data-nu-reveal="draw">04 / protocol</span><h2 id="protocol-title" className="nu-section__title" data-nu-reveal="mask">A fitting is a small ritual.</h2></div><p className="nu-section__intro" data-nu-reveal="rise">One short read, one careful adjustment, and the frame leaves with a job to do.</p></div>
        <div className="nu-protocol__grid">
          {PROTOCOL.map((step, index) => <article className="nu-protocol-card" key={step.number} data-nu-reveal="rise" style={{ "--nu-delay": `${index * 80}ms` } as React.CSSProperties}><span className="nu-protocol-card__number">{step.number}</span><span className="nu-protocol-card__metric">{step.metric}</span><h3>{step.title}</h3><p>{step.detail}</p><span className="nu-protocol-card__rule" aria-hidden="true" /></article>)}
        </div>
      </div>
    </section>
  );
}
