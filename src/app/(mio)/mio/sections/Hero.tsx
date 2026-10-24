import { Harbor } from "../harbor/Harbor";
import { Arrow, Star } from "../brand/Icons";
import { SceneControl } from "../motion/SceneControl";
export function Hero() {
  return <section className="mh-hero" id="home" aria-labelledby="mh-hero-title" data-mh-ambient data-visible="true">
    <div className="mh-scene"><Harbor/></div>
    <div className="mh-hero-copy">
      <p className="mh-availability"><span/> A few commission spots open <Star/></p>
      <h1 id="mh-hero-title"><span className="mh-line"><span>A little wonder,</span></span><span className="mh-line"><span>made just for you.</span></span></h1>
      <p className="mh-hero-description">Hi, I&apos;m Mio. I draw quiet adventures, curious souls,<br className="mh-desktop-break"/> and places that feel a little like home.</p>
      <div className="mh-hero-actions"><a className="mh-button" href="#commissions">Bring your story to life <Arrow/></a><a className="mh-text-link" href="#work">Wander through my work <span aria-hidden="true">↘</span></a></div>
      <p className="mh-hero-note">A little imagination goes a long way.</p>
    </div>
    <div className="mh-hero-bottom"><a className="mh-scroll-note" href="#work"><span className="mh-scroll-line"/>Stay a while. Scroll a little.</a><span className="mh-scene-note">Somewhere between a memory & a daydream.</span><SceneControl/></div>
    <div className="mh-shoreline" aria-hidden="true"><svg viewBox="0 0 1600 70" preserveAspectRatio="none"><path d="M0 29C187 51 290 6 452 23S773 67 966 36 1336 9 1600 35V70H0Z" fill="var(--mh-paper)"/></svg></div>
  </section>;
}
