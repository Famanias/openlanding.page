import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="fo-footer fo-section"><div className="fo-section-top fo-mono"><span>06 / END CREDITS</span><a href="#sheet">BACK TO FIRST FRAME ↑</a></div><div className="fo-footer__main" data-reveal="rise"><div><p className="fo-kicker">ONE LAST THING</p><h2>Thank you<br /><em>for looking.</em></h2></div><div className="fo-footer__credits"><p><span>CONCEPT &amp; DIRECTION</span>FRAME / ONE</p><p><span>STARRING</span>LIGHT, TIME &amp; A LITTLE PATIENCE</p><p><span>THE FINE PRINT</span>All projects in this portfolio are fictional.</p></div></div><div className="fo-footer__bottom"><Logo /><span className="fo-mono">A FICTIONAL PORTFOLIO / 2026</span><span className="fo-mono">THE END · 001—016</span></div></footer>;
}
