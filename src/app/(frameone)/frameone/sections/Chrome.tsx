import { Logo } from "../brand/Logo";

export function Chrome() {
  return <>
    <a className="fo-skip" href="#main">Skip to content</a>
    <nav className="fo-rail" aria-label="Main navigation">
      <a href="#sheet" className="fo-rail__brand" aria-label="FRAME/ONE, back to contact sheet"><Logo compact /><span>FRAME<span className="fo-red">/</span>ONE</span></a>
      <span className="fo-rail__holes" aria-hidden="true" />
      <div className="fo-rail__links fo-mono"><a href="#sheet">INDEX</a><a href="#work">WORK</a><a href="#notes">NOTES</a><a href="#inquiry">CONTACT</a></div>
      <span className="fo-rail__end fo-mono">F/O · 001</span>
    </nav>
    <div className="fo-transport" aria-label="Page transport">
      <span className="fo-transport__progress" aria-hidden="true" />
      <a href="#sheet" aria-label="Index: back to contact sheet"><span aria-hidden="true">↤</span> <span>INDEX</span></a><a href="#selected" aria-label="View the films"><span aria-hidden="true">▷</span> <span>VIEW THE FILMS</span></a>
      <span className="fo-transport__center">A PORTFOLIO IN MOTION &amp; STILL</span>
      <a href="#inquiry">START A PROJECT <span aria-hidden="true">↗</span></a><span className="fo-transport__mute">MUTED / 01:16</span>
    </div>
  </>;
}
