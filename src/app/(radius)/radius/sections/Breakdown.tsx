import { Picture } from "../assets";

export function Breakdown() {
  return (
    <section className="rd-breakdown" id="bike" aria-labelledby="rd-bike-title">
      <div className="rd-section-top"><span>01 / THE BIKE</span><span>FORM FOLLOWS YOUR ROUTE</span></div>
      <div className="rd-breakdown-heading">
        <div data-reveal="rise"><p className="rd-kicker">AN EVERYDAY MACHINE</p><h2 id="rd-bike-title">THE CITY.<br /><em>OPENED UP.</em></h2></div>
        <p data-reveal="rise">A familiar shape, considered from the ground up for the streets, shortcuts and turns that make a city yours.</p>
      </div>
      <div className="rd-blueprint" data-reveal="wipe">
        <div className="rd-blueprint-grid" aria-hidden="true" />
        <div className="rd-blueprint-tag"><span>R / 01</span><span>MODEL STUDY</span></div>
        <Picture assetKey="02-bike-side-graphite-alpha" alt="Side view of the RADIUS bicycle" className="rd-blueprint-bike" sizes="(min-width: 900px) 75vw, 100vw" />
        <div className="rd-blueprint-bottom"><span>ONE FRAME. MANY WAYS THROUGH.</span><span>01 — 03</span></div>
      </div>
      <div className="rd-detail-strips">
        <div data-reveal="rise"><span>01 / FRAME</span><p>Purposeful lines.<br />A considered profile.</p><b>↗</b></div>
        <div data-reveal="rise"><span>02 / YOUR SETUP</span><p>Choose the details<br />that come along.</p><b>↗</b></div>
        <a href="#build" data-reveal="rise"><span>03 / THE NEXT MOVE</span><p>Make it yours.</p><b>↗</b></a>
      </div>
      <div className="rd-angle-note" data-reveal="wipe"><Picture assetKey="01-bike-hero" alt="RADIUS bicycle photographed in an industrial space" className="rd-angle-photo" /><div><span>DESIGN STUDY / 01</span><p>BUILT TO<br /><em>GO FURTHER<br />THAN THE ROUTINE.</em></p><a href="#build">Find your setup ↗</a></div></div>
    </section>
  );
}
