import { Lockup } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="lh-footer" aria-label="LOOPHOUSE Footer">
      <div className="lh-wrap">
        <div className="lh-footer-grid">
          <div className="lh-footer-brand">
            <Lockup height={36} />
            <p className="lh-footer-motto">
              &ldquo;Borrowed. Built. Returned.&rdquo;
            </p>
            <p className="lh-footer-desc">
              An independent community-owned tool library and trade collective operating across the Wrenfield Foundry
              District. High-performance machinery in common circulation.
            </p>
          </div>

          <div className="lh-footer-nav-col">
            <h4 className="lh-footer-col-title">CIRCULATION</h4>
            <ul className="lh-footer-links">
              <li>
                <a href="#pegboard" className="lh-footer-link">
                  Modular Tool Wall
                </a>
              </li>
              <li>
                <a href="#route" className="lh-footer-link">
                  Circulation Route
                </a>
              </li>
              <li>
                <a href="#kits" className="lh-footer-link">
                  Field Packs
                </a>
              </li>
              <li>
                <a href="#ledger" className="lh-footer-link">
                  Workshop Ledger
                </a>
              </li>
              <li>
                <a href="#requisition" className="lh-footer-link">
                  Equipment Requisition
                </a>
              </li>
            </ul>
          </div>

          <div className="lh-footer-nav-col">
            <h4 className="lh-footer-col-title">WORKSHOP DEPOTS</h4>
            <ul className="lh-footer-links">
              <li>
                <span className="lh-footer-static-item">14 Foundry Way (Central Bay)</span>
              </li>
              <li>
                <span className="lh-footer-static-item">88 Millrace Avenue (Timber Dock)</span>
              </li>
              <li>
                <span className="lh-footer-static-item">31 St. Jude Walk (Forge Arch)</span>
              </li>
              <li>
                <span className="lh-footer-static-item">Hours: 07:30 – 19:00 Daily</span>
              </li>
            </ul>
          </div>

          <div className="lh-footer-nav-col">
            <h4 className="lh-footer-col-title">STANDARDS &amp; GOVERNANCE</h4>
            <ul className="lh-footer-links">
              <li>
                <span className="lh-footer-static-item">Calibration Protocol ISO 9001:2015</span>
              </li>
              <li>
                <span className="lh-footer-static-item">Safety Induction Manual (Rev 4)</span>
              </li>
              <li>
                <span className="lh-footer-static-item">Battery Health Verification Log</span>
              </li>
              <li>
                <span className="lh-footer-static-item">Non-profit Maker Charter 2026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lh-footer-bottom">
          <span className="lh-footer-copy">
            &copy; 2026 LOOPHOUSE Tool Circulation Co-operative. All trade gear maintained by volunteer benchmasters.
          </span>
          <a href="#top" className="lh-footer-back-to-top">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
