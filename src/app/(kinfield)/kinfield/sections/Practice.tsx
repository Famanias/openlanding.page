'use client';

import { useState } from "react";
import { assets, responsivePhoto } from "../assets";

const principles = [
  { name: "Grounding", number: "01", title: "Begin where<br />you are.", text: "Find your footing. Let the floor hold you as you notice the small movements that bring you back to yourself." },
  { name: "Range", number: "02", title: "Make a little<br />more room.", text: "Explore the space around you at a pace that feels right. Curiosity is more useful here than perfection." },
  { name: "Recovery", number: "03", title: "Rest is part<br />of the rhythm.", text: "Give the quiet moments their place. A softer pace is a practice in listening to what you need today." },
] as const;

export function Practice() {
  const [active, setActive] = useState(0);
  const principle = principles[active];
  return (
    <section className="kf-section kf-practice" id="practice">
      <div className="kf-section-heading"><span>01 / THE PRACTICE</span><span>AN APPROACH, NOT A FORMULA</span></div>
      <div className="kf-practice-intro"><h2>There is no<br /><em>one way to move.</em></h2><p>Some days call for energy. Others ask for ease. We make space for all of it.</p></div>
      <div className="kf-practice-stage">
        <img className="kf-practice-room" src={assets.studio} srcSet={responsivePhoto(assets.studio)} sizes="100vw" alt="A quiet, light-filled movement studio" width="1376" height="768" loading="lazy" />
        <img className="kf-practice-person" src={assets.poseC} srcSet={responsivePhoto(assets.poseC)} sizes="40vw" alt="A dancer exploring a gentle reach" width="896" height="1200" loading="lazy" />
        <svg className={"kf-practice-arc kf-arc-" + active} viewBox="0 0 400 300" aria-hidden="true"><path d="M35 260C100 30 280 0 370 130" /><circle cx="35" cy="260" r="5" /></svg>
        <div className="kf-practice-card">
          <div className="kf-practice-card-top"><span>THE KINFIELD APPROACH</span><span>{principle.number} / 03</span></div>
          <div className="kf-principle-copy" key={principle.name}><p className="kf-small-label">{principle.name}</p><h3>{active === 0 ? <>Begin where<br /><em>you are.</em></> : active === 1 ? <>Make a little<br /><em>more room.</em></> : <>Rest is part<br /><em>of the rhythm.</em></>}</h3><p>{principle.text}</p></div>
          <div className="kf-tabs" role="group" aria-label="Practice principles">{principles.map((item, index) => <button key={item.name} onClick={() => setActive(index)} aria-pressed={active === index}>{item.name}</button>)}</div>
        </div>
        <div className="kf-stage-label">A PRACTICE FOR<br />THE LIFE YOU LIVE.</div>
      </div>
    </section>
  );
}
