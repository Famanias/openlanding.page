import { Logo } from "../brand/Logo";
import { Specimen } from "../bench/Specimen";
import { benchSnapshot } from "../bench/state";

export function Hero() {
  return <section className="lc-hero" id="top" aria-labelledby="hero-title">
    <div className="lc-hero__field" aria-hidden="true" />
    <div className="lc-container lc-hero__grid">
      <div className="lc-hero__copy"><p className="lc-mono lc-kicker">Real-time material studio</p><h1 id="hero-title">Tune the surface.</h1><p className="lc-hero__lede">A browser bench for teams who need transmission, dispersion, and refraction to behave before the handoff.</p><div className="lc-actions"><a className="lc-btn lc-btn--solid" href="#bench">Open the bench</a><a className="lc-btn lc-btn--ghost" href="#notes">Read the field notes <span aria-hidden="true">↗</span></a></div><div className="lc-hero__meta"><div><span className="lc-mono">BENCH</span><strong>04 / QUARTZ</strong></div><div><span className="lc-mono">READY IN</span><strong>12 MINUTES</strong></div><div><span className="lc-mono">FORMAT</span><strong>LIVE + SPEC</strong></div></div></div>
      <div className="lc-hero__visual lc-specimen-frame"><div className="lc-specimen-frame__top lc-mono">LUCENTRA / MATERIAL CALIBRATION</div><Specimen snapshot={benchSnapshot(0, "quartz")} /><div className="lc-specimen__readout lc-mono">IOR<strong>1.33</strong></div><div className="lc-specimen__caption lc-mono">CLEAR / SAMPLE 01</div></div>
    </div>
  </section>;
}
