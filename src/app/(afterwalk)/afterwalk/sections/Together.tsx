import { Picture } from "../assets";
import { ParallaxPhoto } from "../motion/ParallaxPhoto";

export function Together() {
  return <section className="aw-together aw-section" id="together">
    <div className="aw-container"><div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">03 / THE GOOD COMPANY</span><span>COME AS YOU ARE</span></div>
      <div className="aw-together-grid"><div className="aw-together-image" data-reveal="wipe"><ParallaxPhoto><Picture assetKey="together" alt="Friends sitting together after a walk in the park" sizes="(max-width: 760px) 100vw, 55vw" /></ParallaxPhoto><span className="aw-image-label">A GOOD DAY, OUTSIDE ↗</span></div>
        <div className="aw-together-copy" data-reveal="rise"><span className="aw-kicker">A CLUB WITH ROOM FOR EVERYONE</span><h2>The best part<br />isn&apos;t the <em>destination.</em></h2><p>It&apos;s the tiny discoveries, the conversations that wander, and getting home feeling a little more like yourself.</p><div className="aw-values"><div><span>01</span><p><strong>Come as you are.</strong><br />No fancy gear or fast pace required.</p></div><div><span>02</span><p><strong>Walk your own way.</strong><br />Easy routes and plenty of room to pause.</p></div><div><span>03</span><p><strong>Leave with a story.</strong><br />And maybe a new favorite corner of town.</p></div></div><a className="aw-text-link" href="#walks">Find a walk that fits <span aria-hidden="true">↗</span></a></div></div>
    </div>
  </section>;
}
