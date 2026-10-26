import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="lc-footer"><div className="lc-container"><div className="lc-footer__top"><Logo /><nav className="lc-footer__links" aria-label="Footer"><a href="#bench">Bench</a><a href="#materials">Materials</a><a href="#notes">Notes</a><a href="#access">Access</a><a href="#notes">Privacy</a><a href="#notes">Terms</a></nav></div><div className="lc-footer__bottom"><span className="lc-mono">© 2026 Lucentra Lab</span><span className="lc-mono">Make light legible.</span><a className="lc-mono" href="#top">Back to top ↑</a></div></div></footer>;
}
