import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="gs-footer"><div className="gs-finale" data-reveal><div><p className="gs-kicker">ONE MORE THING BEFORE YOU GO</p><h2>THE CURTAIN<br/>IS <em>CALLING.</em></h2><p>There’s a story with your name on it.</p><a href="#seats" className="gs-button gs-button-dark">Choose your seat <span>↗</span></a></div><div className="gs-finale-stub"><span>ADMIT ONE IDEA</span><strong>GOOD<br/>NIGHTS<br/>LIVE HERE<span>.</span></strong><span>GRANDSTAND / THEATRE FOR EVERYONE</span></div></div><div className="gs-footer-bottom"><a href="#top" aria-label="Grandstand, back to top"><Logo/></a><p>A FICTIONAL REPERTORY THEATRE.<br/>MADE FOR THE MOMENT.</p><nav aria-label="Footer navigation"><a href="#season">Season</a><a href="#seats">Seats</a><a href="#visit">Your visit</a><a href="#top">Back to top ↑</a></nav><span>© GRANDSTAND / DEMO</span></div></footer>;
}
