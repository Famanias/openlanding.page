import { ScrollBand } from "../motion/ScrollBand";
import { PhotoReel } from "../motion/PhotoReel";

export function Intro() {
  return <>
    <ScrollBand />
    <PhotoReel />
    <section className="aw-intro aw-section" id="about">
      <div className="aw-container">
        <div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">01 / THE IDEA</span><span>GOOD WALKS. BETTER COMPANY.</span></div>
        <div className="aw-intro-grid">
          <h2 data-reveal="mask">Not a race.<br />Not a workout.<br /><em>Just a walk.</em></h2>
          <div className="aw-intro-copy" data-reveal="rise"><p>Somewhere between your front door and wherever you end up, things start to feel a little lighter.</p><p>Afterwalk is a fictional neighborhood club built around a very simple idea: a good walk is even better together.</p><a className="aw-text-link" href="#together">A little more about us <span aria-hidden="true">↗</span></a></div>
          <div className="aw-doodle" aria-hidden="true"><svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="90" r="68" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7"/><path d="M33 124c16-36 29 2 44-21 12-18 5-35 24-34 14 1 14 26 29 18 9-4 11-13 17-22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="33" cy="124" r="5" fill="currentColor"/><path d="m138 61 12 2-4 12" stroke="currentColor" strokeWidth="2"/><text x="90" y="24" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="2">TAKE YOUR TIME</text></svg></div>
        </div>
      </div>
    </section>
  </>;
}
