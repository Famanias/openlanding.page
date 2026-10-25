import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="nu-footer"><span className="nu-footer__signal" aria-hidden="true" /><div className="nu-container"><div className="nu-footer__top"><div><a href="#top" aria-label="NULO home"><Logo /></a><p className="nu-footer__tag">Prescription frames for the way a day actually moves.</p></div><nav className="nu-footer__links" aria-label="Footer navigation"><a className="nu-footer__link" href="#calibrate">Calibrate</a><a className="nu-footer__link" href="#frames">Frames</a><a className="nu-footer__link" href="#fitting">Fitting</a><a className="nu-footer__link" href="mailto:hello@nulo.example">hello@nulo.example</a></nav></div><div className="nu-footer__bottom"><span>nulo optical lab / made for moving days</span><span>signal 03 / calibrated 2026</span></div></div></footer>
  );
}
