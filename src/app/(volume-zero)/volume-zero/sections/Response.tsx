import { Reveal } from "../motion/Reveal";

export function Response() {
  return (
    <section className="vz-response" aria-labelledby="vz-response-title">
      <div className="vz-wrap vz-response__layout">
        <div className="vz-response__copy"><p className="vz-eyebrow">04 / Response curve</p><h2 id="vz-response-title" className="vz-section-title">Make the quiet measurable.</h2><Reveal delay={140}><p className="vz-lead">A live room is a set of decisions you can read. Our field notes turn first reflection, decay and seat position into a brief the whole team can share.</p><a className="vz-button" href="#commission" style={{ marginTop: 30 }}>Read the field notes</a></Reveal></div>
        <Reveal className="vz-response__chart" delay={220} as="figure">
          <div className="vz-response__chart-head"><span>Room 04 / oak slat</span><strong>0.82 S</strong></div>
          <svg className="vz-response__svg" viewBox="0 0 640 280" role="img" aria-label="Acoustic decay response curve from 0 to 1.2 seconds">
            <line x1="0" y1="36" x2="640" y2="36" /><line x1="0" y1="106" x2="640" y2="106" /><line x1="0" y1="176" x2="640" y2="176" /><line x1="0" y1="246" x2="640" y2="246" />
            <path pathLength="1" d="M0 36 C36 42 48 68 78 88 S132 118 188 138 S260 164 320 184 S410 207 480 226 S575 240 640 246" />
          </svg>
          <figcaption className="vz-response__legend"><span>source impulse</span><span>first reflection</span><span>field floor</span></figcaption>
        </Reveal>
      </div>
    </section>
  );
}
