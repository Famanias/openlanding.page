import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="vz-footer"><div className="vz-wrap"><div className="vz-footer__top"><a href="#top" aria-label="Back to top"><Logo /></a><nav className="vz-footer__links" aria-label="Footer links"><a href="#chamber">Chamber</a><a href="#rooms">Rooms</a><a href="#commission">Brief a room</a></nav></div><div className="vz-footer__bottom"><span>VZ / 2026 / FIELD ARCHIVE 07</span><span>Tune the silence between sounds.</span></div></div></footer>;
}
