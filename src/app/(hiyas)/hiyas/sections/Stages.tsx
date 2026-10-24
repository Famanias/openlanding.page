import { STAGES } from "../content/expedition-data";
import { Picture } from "../assets";

export function Stages() {
  return <section className="hy-section hy-stages" id="stages" aria-labelledby="hy-stages-title"><div className="hy-container"><div className="hy-section-head"><h2 id="hy-stages-title">The summit is one part of the route.</h2><p>Preparation, support, weather, and the way home belong in the same frame.</p></div><div className="hy-stages__grid"><div className="hy-stage-list">{STAGES.map((stage) => <article key={stage.number} className="hy-stage"><span className="hy-stage__number">{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.copy}</p></div></article>)}</div><div className="hy-stages__visual"><Picture assetKey="planner-profile" alt="Topographic mountain route profile" /></div></div></div></section>;
}

