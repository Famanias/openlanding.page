import { FittingForm } from "../forms/FittingForm";

export function Fitting() {
  return (
    <section id="fitting" className="nu-section nu-fitting" aria-labelledby="fitting-title">
      <div className="nu-container nu-fitting__grid">
        <div className="nu-fitting__copy"><span className="nu-eyebrow" data-nu-reveal="draw">05 / request a fitting</span><h2 id="fitting-title" data-nu-reveal="mask">Let’s find your setting.</h2><p data-nu-reveal="rise">Tell us where your eyes spend their time. A human from the lab will reply with a frame, a carrier, and a time to tune them.</p><div className="nu-fitting__facts" data-nu-reveal="rise"><div className="nu-fitting__fact"><strong>12m</strong><span>to read your day and choose a first mode</span></div><div className="nu-fitting__fact"><strong>48h</strong><span>for a real person to check the fit</span></div><div className="nu-fitting__fact"><strong>0</strong><span>pressure to buy before the setting feels right</span></div></div></div>
        <FittingForm />
      </div>
    </section>
  );
}
