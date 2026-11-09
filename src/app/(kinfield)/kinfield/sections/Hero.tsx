'use client';

import { useRef, useState } from "react";
import { assets, responsivePhoto } from "../assets";

const poses = [assets.poseA, assets.poseB, assets.poseC];

export function Hero() {
  const [pose, setPose] = useState(0);
  const touchStart = useRef(0);
  return (
    <section className="kf-hero" aria-labelledby="kf-title">
      <div className="kf-hero-sticky">
        <div className="kf-hero-grid">
          <div className="kf-hero-image" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
            const delta = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(delta) > 55) setPose((current) => Math.max(0, Math.min(2, current + (delta < 0 ? 1 : -1))));
          }}>
            {poses.map((src, index) => <img key={src} className={"kf-hero-pose kf-pose-" + index} data-active={pose === index} src={src} srcSet={responsivePhoto(src)} sizes="(min-width: 1024px) 58vw, 100vw" alt={index === 0 ? "A dancer moving slowly in a sunlit studio" : ""} width="896" height="1200" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />)}
            <div className="kf-photo-caption"><span>STUDY 01 / THE BODY IN MOTION</span><span>01 — 03</span></div>
            <div className="kf-pose-controls" role="group" aria-label="Select a movement portrait">
              {poses.map((_, index) => <button key={index} aria-label={"Portrait " + (index + 1)} aria-pressed={pose === index} onClick={() => setPose(index)}><span /></button>)}
            </div>
          </div>
          <div className="kf-manifesto">
            <div className="kf-panel-top"><span>EST. FOR EVERY BODY</span><span>© 085</span></div>
            <div className="kf-manifesto-copy">
              <p className="kf-eyebrow"><span className="kf-dot" /> A MOVEMENT STUDIO</p>
              <h1 id="kf-title"><span>Move in</span><span>your own</span><span><em>rhythm.</em></span></h1>
              <p className="kf-intro">A little more room to move.<br />A little more room to be.</p>
              <a className="kf-button kf-button-dark" href="#session">Find a session <span aria-hidden="true">↗</span></a>
              <a className="kf-text-link" href="#practice">Explore the practice <span aria-hidden="true">↘</span></a>
            </div>
            <div className="kf-panel-bottom"><span>MOVEMENT<br />& RECOVERY</span><span>TAKE YOUR TIME<br />YOU ARE HERE</span></div>
          </div>
          <aside className="kf-hero-ledger" aria-label="Studio introduction">
            <div className="kf-panel-top"><span>THE KINFIELD WAY</span><span>↗</span></div>
            <div className="kf-ledger-intro"><span className="kf-small-label">AN OPEN INVITATION</span><p>Come as<br />you are.<br /><em>Move as<br />you feel.</em></p><span className="kf-drawn-star" aria-hidden="true">✳</span></div>
            <div className="kf-hero-entries"><div><span>01</span> Grounding <span>↗</span></div><div><span>02</span> Range <span>↗</span></div><div><span>03</span> Recovery <span>↗</span></div></div>
            <p className="kf-tiny">A STUDY IN<br />FEELING GOOD TO MOVE.</p>
          </aside>
          <div className="kf-sideword" aria-label="Kinfield">KINFIELD<span>®</span></div>
        </div>
        <div className="kf-mobile-hero-copy"><span className="kf-eyebrow">A MOVEMENT STUDIO / 085</span><h2>Move in your<br />own <em>rhythm.</em></h2><div><a className="kf-button kf-button-dark" href="#session">Find a session <span>↗</span></a><a className="kf-text-link" href="#practice">Explore the practice ↘</a></div></div>
      </div>
    </section>
  );
}
