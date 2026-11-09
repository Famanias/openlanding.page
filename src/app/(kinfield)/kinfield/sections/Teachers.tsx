'use client';

import { assets, responsivePhoto } from "../assets";

export function Teachers() {
  return (
    <section className="kf-section kf-teachers" id="teachers">
      <div className="kf-section-heading"><span>04 / PEOPLE & PRACTICE</span><span>A HUMAN WAY TO MOVE</span></div>
      <div className="kf-teachers-title"><h2>Good movement<br /><em>is a shared thing.</em></h2><p>Different rhythms. A shared belief that movement can feel like coming home.</p></div>
      <div className="kf-teacher-spread">
        <article className="kf-teacher kf-teacher-one">
          <div className="kf-teacher-image" tabIndex={0}><img src={assets.instructorA} srcSet={responsivePhoto(assets.instructorA)} sizes="(min-width: 701px) 50vw, 90vw" alt="A movement teacher sitting in the studio" width="896" height="1200" loading="lazy" /><span>01 / TEACHER STUDY</span></div>
          <div className="kf-teacher-caption"><div><h3>Mara Ellis</h3><span>GROUNDING / RANGE</span></div><p>“I like to start with what feels possible, and let curiosity do the rest.”</p></div>
        </article>
        <div className="kf-bridge" aria-hidden="true"><span>✳</span><svg viewBox="0 0 250 160"><path d="M0 130 C80 130 90 5 250 25" /></svg><small>WE MOVE<br />TOGETHER</small></div>
        <article className="kf-teacher kf-teacher-two">
          <div className="kf-teacher-image" tabIndex={0}><img src={assets.instructorB} srcSet={responsivePhoto(assets.instructorB)} sizes="(min-width: 701px) 40vw, 82vw" alt="A movement teacher stretching in the studio" width="896" height="1200" loading="lazy" /><span>02 / TEACHER STUDY</span></div>
          <div className="kf-teacher-caption"><div><h3>June Vale</h3><span>REST / RECOVERY</span></div><p>“There is a lot to discover when we give ourselves time to slow down.”</p></div>
        </article>
      </div>
      <p className="kf-fiction-note">KINFIELD and its teachers are fictional. Portraits are supplied creative assets.</p>
    </section>
  );
}
