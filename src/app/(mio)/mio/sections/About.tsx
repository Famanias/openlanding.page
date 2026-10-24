import { ArtistPortrait } from "../art/ArtistPortrait";
import { Reveal } from "../motion/Reveal";
import { Star } from "../brand/Icons";
export function About() {
  return <section className="mh-about mh-section" id="about" aria-labelledby="mh-about-title">
    <div className="mh-portrait-wrap"><Reveal variant="wipe"><figure className="mh-portrait"><div role="img" aria-label="An illustration of Mio sketching in her little seaside studio"><ArtistPortrait/></div><figcaption>Usually drawing. Occasionally making tea.</figcaption></figure></Reveal><span className="mh-portrait-doodle" aria-hidden="true"><Star/>hello, from my little corner</span></div>
    <div className="mh-about-copy"><Reveal variant="mask"><h2 id="mh-about-title">A head full of clouds.<br/>A heart in the details.</h2></Reveal><Reveal><p>I&apos;m Mio, a digital illustrator who believes the best stories are hiding in the smallest things. A light left on. A cat at the window. That feeling of coming home.</p><p>My work lives somewhere between Japanese animation, old picture books, and the places I find on long walks. I draw characters with a life beyond the frame, and worlds you might like to get a little lost in.</p><p>Sometimes those worlds begin in my sketchbook.<br/>Sometimes, they begin with you.</p></Reveal><Reveal variant="draw"><div className="mh-artist-signature">Mio <svg width="84" height="20" viewBox="0 0 84 20" fill="none" aria-hidden="true"><path d="M2 14q33 6 79-8M65 3l17 3-11 9" stroke="currentColor" strokeWidth="1.2"/></svg><span>Illustrator. World-wanderer. Tea enthusiast.</span></div></Reveal></div>
  </section>;
}
