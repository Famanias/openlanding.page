import { Reveal } from "../motion/Reveal";
import { WorkGallery } from "../works/WorkGallery";
export function Works() {
  return <section className="mh-works mh-section" id="work" aria-labelledby="mh-work-title">
    <div className="mh-section-heading"><Reveal variant="mask"><h2 id="mh-work-title">A few worlds<br/>I&apos;ve wandered into.</h2></Reveal><Reveal><p>For the daydreamers, the homebodies,<br/>and anyone who&apos;s ever taken the scenic route.</p><span className="mh-section-aside">Selected illustrations, 2025–26</span></Reveal></div>
    <WorkGallery/>
  </section>;
}
