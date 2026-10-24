import { Landscape } from "../illustrations/Landscape";
import { Reveal } from "../motion/Reveal";
import { ScenePlayer } from "../process/ScenePlayer";
export function Process() {
  return <section className="kz-process" id="process" aria-labelledby="kz-process-title"><div className="kz-process-sticky"><div className="kz-container">
    <div className="kz-process-heading"><Reveal><span className="kz-eyebrow">02 / The quiet work behind the wonder</span><h2 id="kz-process-title">First, a line.<br /><em>Then, a little life.</em></h2></Reveal><Reveal><p>We make things slowly, thoughtfully,<br />and one imperfect frame at a time.<br />Watch a small world find its colour.</p></Reveal></div>
    <ScenePlayer><div className="kz-pencil-layer"><Landscape sketch /></div><div className="kz-colour-layer"><Landscape /></div><div className="kz-wipe-marker" aria-hidden="true"><span>✦</span></div></ScenePlayer>
  </div></div></section>;
}
