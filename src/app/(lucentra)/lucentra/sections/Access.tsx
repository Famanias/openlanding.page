import { BriefForm } from "../forms/BriefForm";

export function Access() {
  return <section className="lc-section lc-section--dark" id="access" aria-labelledby="access-title"><div className="lc-container lc-access"><div><p className="lc-mono lc-kicker">06 / Access</p><h2 id="access-title">Hold a bench for your next surface.</h2><p className="lc-section__copy" style={{ marginTop: 24 }}>A local demo brief is enough to begin. Choose a starting surface and Lucentra will keep the first readout close.</p><div className="lc-mono" style={{ marginTop: 38 }}>ACCESS / STUDIO PLAN · 18 USD / MONTH · LOCAL DEMO</div></div><div className="lc-access__card"><BriefForm /></div></div></section>;
}
