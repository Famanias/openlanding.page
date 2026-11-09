import { Picture } from "../assets";

export function Curtain() {
  return <section className="gs-curtain-section" data-curtain aria-labelledby="gs-curtain-title"><div className="gs-curtain-sticky"><div className="gs-curtain-scene"><Picture assetKey="02-stage-performance" alt="Two performers meet on a dramatically lit stage" sizes="100vw"/><div className="gs-curtain-panel gs-curtain-left"/><div className="gs-curtain-panel gs-curtain-right"/><div className="gs-curtain-light"/><div className="gs-curtain-content"><div className="gs-curtain-overline"><span>ACT I &nbsp; / &nbsp; A NIGHT AT GRANDSTAND</span><span>LIGHTS UP ✳</span></div><div><p className="gs-kicker">THE STORY STARTS WHEN YOU ARRIVE</p><h2 id="gs-curtain-title">A LITTLE CLOSER<br/><em>TO THE STORY.</em></h2><a className="gs-button gs-button-lime" href="#season">Meet the season <span>↗</span></a></div></div></div></div></section>;
}
