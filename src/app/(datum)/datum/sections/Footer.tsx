import { Logo } from "../brand/Logo";
import { NAV } from "./nav";

export function Footer() {
  return (
    <footer id="dt-footer" className="dt-footer">
      <div className="dt-footer-inner">
        <div className="dt-footer-top">
          <p className="dt-mono dt-footer-tag">SPATIAL SCENE-GRAPH & GPU FRAME STUDIO</p>
          <ul className="dt-footer-links">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="dt-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="dt-footer-brand">
          <Logo tone="dark" className="dt-footer-logo" />
        </div>

        <div className="dt-footer-bottom">
          <p className="dt-fineprint">
            DATUM is a fictional developer tool showcase created for OpenLandingPage. All frame budgets and briefs stay strictly in-browser.
          </p>
          <a href="#top" className="dt-link dt-mono">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
