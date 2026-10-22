import { Logo } from "../brand/Logo";
import { FIRM } from "../content/firm";

export function Footer() {
  return (
    <footer className="cr-footer">
      <div className="cr-wrap cr-footer__grid">
        <div className="cr-footer__brand">
          <Logo href="#top" />
          <p>Business law, disputes, employment and estates for New York clients, since {FIRM.founded}.</p>
        </div>
        <nav className="cr-footer__col" aria-label="Footer">
          <span className="cr-footer__label">Explore</span>
          <a href="#matters">Matters</a>
          <a href="#argument">The argument</a>
          <a href="#counsel">Counsel</a>
          <a href="#questions">Questions</a>
        </nav>
        <div className="cr-footer__col">
          <span className="cr-footer__label">Chambers</span>
          <span>{FIRM.addressLines[0]}</span>
          <span>{FIRM.addressLines[1]}</span>
          <a href={FIRM.phoneHref}>{FIRM.phone}</a>
        </div>
      </div>
      <p className="cr-footer__giant" aria-hidden="true" data-reveal="rise">
        Calder <i>&amp;</i> Rowe
      </p>
      <div className="cr-wrap cr-footer__bottom">
        <span>© 2026 {FIRM.legalName}</span>
        <span>Attorney advertising. Prior results do not guarantee a similar outcome.</span>
      </div>
    </footer>
  );
}
