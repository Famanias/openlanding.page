import { CALIBRATION_MODES } from "../calibration/geometry";

export function Calibration() {
  return (
    <section id="calibrate" className="nu-section nu-calibration" aria-labelledby="calibrate-title">
      <div className="nu-container nu-calibration__grid">
        <div className="nu-calibration__copy">
          <span className="nu-eyebrow" data-nu-reveal="draw">01 / calibration</span>
          <h2 id="calibrate-title" data-nu-reveal="mask">Light changes. Your lens should too.</h2>
          <p data-nu-reveal="rise">NULO starts with the hours you actually spend out there. Pick a mode on the focus dial, then we tune one carrier to move between them without changing the frame.</p>
          <div className="nu-calibration__notes">
            {CALIBRATION_MODES.map((item, index) => (
              <div className="nu-calibration__note" key={item.id} data-nu-reveal="rise">
                <span className="nu-calibration__note-index">0{index + 1}</span>
                <p><strong>{item.label}</strong> / {item.note} / {item.marker.toString().padStart(3, "0")}°</p>
              </div>
            ))}
          </div>
        </div>
        <div className="nu-signal" data-nu-reveal="scale">
          <div className="nu-signal__grid" aria-hidden="true" />
          <div className="nu-signal__top"><span>signal / lens carrier 01</span><span className="nu-signal__status"><i /> stable</span></div>
          <div className="nu-signal__beams" aria-hidden="true"><span className="nu-signal__beam" /><span className="nu-signal__beam" /><span className="nu-signal__beam" /><span className="nu-signal__lens" /></div>
          <div className="nu-signal__readings"><div className="nu-reading"><span>glare</span><strong>−42%</strong></div><div className="nu-reading"><span>weight</span><strong>18.4g</strong></div><div className="nu-reading"><span>shift</span><strong>03.2°</strong></div></div>
        </div>
      </div>
    </section>
  );
}
