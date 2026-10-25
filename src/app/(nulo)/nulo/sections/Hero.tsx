import { CalibrationDial } from "../calibration/CalibrationDial";
import { Logo } from "../brand/Logo";

export function Hero() {
  return (
    <section id="top" className="nu-hero" aria-labelledby="nulo-title">
      <div className="nu-hero__inner">
        <div className="nu-hero__copy">
          <span className="nu-eyebrow" data-nu-reveal="draw">optical lab / 02—24</span>
          <h1 id="nulo-title" className="nu-hero__title" data-nu-reveal="mask">Tune your <em>view.</em></h1>
          <p className="nu-hero__lede" data-nu-reveal="rise">Modular prescription frames calibrated for the way a real day moves: screen, street, night.</p>
          <div className="nu-hero__actions" data-nu-reveal="scale">
            <a className="nu-button nu-button--dark" href="#calibrate"><span>Start calibrating</span><span className="nu-button__arrow" aria-hidden="true">↗</span></a>
            <a className="nu-button nu-button--ghost" href="#frames"><span>View the frames</span></a>
          </div>
          <p className="nu-hero__note" data-nu-reveal="rise"><i aria-hidden="true" /> free 12-minute calibration · human checked</p>
        </div>
        <div className="nu-hero__instrument" data-nu-reveal="scale" data-ambient="true">
          <span className="nu-instrument-label nu-instrument-label--top">calibration bench / live</span>
          <CalibrationDial />
          <span className="nu-instrument-label nu-instrument-label--bottom">measured in motion / 001</span>
        </div>
      </div>
      <div className="nu-hero__rail" aria-hidden="true"><Logo className="nu-hero__rail-logo" /><span>scroll to read the room</span><span>↓</span></div>
    </section>
  );
}
