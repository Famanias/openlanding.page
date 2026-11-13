import { Picture } from "../assets";

export function Hero() {
  return <section className="aw-hero" id="top">
    <div className="aw-container aw-hero-grid">
      <div className="aw-hero-copy">
        <div className="aw-eyebrow aw-hero-eyebrow"><span className="aw-dot" /> A LITTLE MORE OUTSIDE</div>
        <h1>Good things<br />happen<br /><em>on foot.</em></h1>
        <p className="aw-hero-lede">A walking club for getting out of your head, into your neighborhood, and maybe making a friend or two along the way.</p>
        <div className="aw-hero-actions"><a className="aw-button aw-button-dark" href="#walks">Find your kind of walk <span aria-hidden="true">↗</span></a><span className="aw-action-note">No rush. No finish line.</span></div>
        <div className="aw-hero-foot"><div className="aw-avatars" aria-hidden="true"><span>A</span><span>W</span><span>✳</span></div><p>For the long way home<br /><strong>and the people you meet there.</strong></p></div>
      </div>
      <div className="aw-hero-visual">
        <div className="aw-photo-mat"><Picture assetKey="hero" alt="Two friends walking together beside a leafy city river" className="aw-hero-photo" priority sizes="(max-width: 760px) 100vw, 55vw" /><div className="aw-photo-caption"><span>THE WORLD CAN WAIT A MINUTE.</span><span>NO. 001 / THE RIVER</span></div></div>
        <div className="aw-stamp" aria-label="Good company, easy pace"><span>GOOD COMPANY</span><b>✳</b><span>EASY PACE</span></div>
        <div className="aw-hero-note"><span>TAKE THE<br />SCENIC ROUTE</span><svg viewBox="0 0 48 45" fill="none" aria-hidden="true"><path d="M3 3c21 0 29 11 32 30m-9-5 9 8 8-10" stroke="currentColor" strokeWidth="1.6"/></svg></div>
      </div>
    </div>
    <div className="aw-hero-bottom aw-container"><span>EST. FOR THE SAKE OF GETTING OUT</span><a href="#about">A LITTLE FURTHER DOWN <span aria-hidden="true">↓</span></a></div>
  </section>;
}
