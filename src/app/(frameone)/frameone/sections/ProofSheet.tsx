import { Picture } from "../assets";

export function ProofSheet() {
  return <section className="fo-proof fo-section" id="proof">
    <div className="fo-section-top fo-mono"><span>04 / BEHIND THE FRAME</span><span>PROOF SHEET 002</span></div>
    <div className="fo-proof__heading" data-reveal="mask"><div><p className="fo-kicker">THE PART YOU DON’T SEE</p><h2>Between<br /><em>the takes.</em></h2></div><p>A little evidence of the people, places and practical magic behind the picture.</p></div>
    <div className="fo-proof__grid">
      <figure className="fo-proof-card fo-proof-card--large" data-pointer data-reveal="scale"><div className="fo-proof-card__image"><Picture assetKey="09-bts-a" alt="Fictional behind-the-scenes harbor scene" /></div><span className="fo-proof-card__glow" aria-hidden="true" /><figcaption><span>01 / THE HARBOR</span><span>BEFORE FIRST LIGHT</span></figcaption></figure>
      <figure className="fo-proof-card fo-proof-card--small" data-pointer data-reveal="scale"><div className="fo-proof-card__image"><Picture assetKey="10-bts-b" alt="Fictional behind-the-scenes apartment scene" /></div><span className="fo-proof-card__glow" aria-hidden="true" /><figcaption><span>02 / THE ROOM</span><span>BETWEEN SETUPS</span></figcaption></figure>
    </div>
    <p className="fo-proof__foot fo-mono">ALL PROJECTS IN THIS PORTFOLIO ARE FICTIONAL. &nbsp; / &nbsp; NO CLIENTS OR AWARDS IMPLIED.</p>
  </section>;
}
