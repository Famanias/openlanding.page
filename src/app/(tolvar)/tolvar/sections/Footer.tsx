import { Logo } from "../brand/Logo";
import { COMPANY, NAV } from "./content";

export function Footer() {
  return (
    <footer className="tv-footer tv-dark">
      <div className="tv-footer-hatch" aria-hidden="true" />
      <div className="tv-wrap">
        <p className="tv-footer-big" aria-hidden="true">
          Move it once.
        </p>
        <div className="tv-footer-grid">
          <div>
            <a className="tv-logo-link" href="#top" aria-label="Tolvar Earthworks, back to the top">
              <Logo />
            </a>
            <p className="tv-footer-line">Excavating, grading and hauling. Family-run in Aitkin since {COMPANY.founded}.</p>
          </div>
          <nav aria-label="Footer">
            <p className="tv-gauge tv-footer-label">Site</p>
            <ul>
              {NAV.map((item) => (
                <li key={item.id}>
                  <a className="tv-link" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="tv-link" href="#estimate">
                  Free estimate
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="tv-gauge tv-footer-label">Reach us</p>
            <ul>
              <li>
                <a className="tv-link" href={COMPANY.cell.href}>
                  {COMPANY.cell.label} cell
                </a>
              </li>
              <li>
                <a className="tv-link" href={COMPANY.office.href}>
                  {COMPANY.office.label} office
                </a>
              </li>
              <li>
                <a className="tv-link" href={COMPANY.email.href}>
                  {COMPANY.email.label}
                </a>
              </li>
              <li>
                {COMPANY.street}, {COMPANY.city}
              </li>
            </ul>
          </div>
        </div>
        <p className="tv-footer-fine tv-gauge">
          © 2026 {COMPANY.legal}. Licensed and insured. Tolvar Earthworks is a fictional company; names, numbers and
          addresses are illustrative.
        </p>
      </div>
    </footer>
  );
}
