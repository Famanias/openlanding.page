import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="aw-footer"><div className="aw-container"><div className="aw-footer-top"><div><span className="aw-kicker">A LITTLE MORE OUTSIDE</span><h2>See you<br /><em>out there.</em></h2><a className="aw-button aw-button-lime" href="#walks">Find your kind of walk <span aria-hidden="true">↗</span></a></div><div className="aw-footer-sun" aria-hidden="true">✳</div><nav aria-label="Footer navigation"><a href="#about">The idea</a><a href="#walks">The walks</a><a href="#together">The company</a><a href="#questions">Good to know</a></nav></div><div className="aw-footer-bottom"><Logo light /><span>MADE FOR TAKING THE LONG WAY.</span><span>A FICTIONAL CLUB · LOCAL DEMO</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>;
}
