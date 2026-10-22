import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";

export function Hero() {
  return (
    <section id="top" className="vz-hero" aria-labelledby="vz-hero-title">
      <div className="vz-hero__grid" aria-hidden="true" />
      <div className="vz-hero__field" aria-hidden="true" />
      <div className="vz-wrap vz-hero__inner">
        <div>
          <p className="vz-eyebrow">VZ / Acoustic architecture / Rotterdam</p>
          <h1 id="vz-hero-title" className="vz-hero__title">
            <span className="vz-hero__title-desktop">
              <span className="vz-mask"><span style={{ "--line": 0 } as React.CSSProperties}>Rooms that let</span></span>
              <span className="vz-mask"><span style={{ "--line": 1 } as React.CSSProperties}>sound arrive <em>whole.</em></span></span>
            </span>
            <span className="vz-hero__title-mobile" aria-hidden="true">
              <span className="vz-mask"><span style={{ "--line": 0 } as React.CSSProperties}>Rooms that</span></span>
              <span className="vz-mask"><span style={{ "--line": 1 } as React.CSSProperties}>let sound</span></span>
              <span className="vz-mask"><span style={{ "--line": 2 } as React.CSSProperties}>arrive</span></span>
              <span className="vz-mask"><span style={{ "--line": 3 } as React.CSSProperties}><em>whole.</em></span></span>
            </span>
          </h1>
        </div>
        <div className="vz-hero__aside">
          <Reveal delay={520}>
            <p>A room is not a container for sound. It is the instrument that gives the sound its shape.</p>
            <div className="vz-hero__actions">
              <a className="vz-button vz-button--fill" href="#chamber">Enter the chamber</a>
              <a className="vz-button" href="#commission">Commission a room</a>
            </div>
          </Reveal>
          <div className="vz-hero__stamp">
            <span><strong>ROOM 04</strong> / LISTENER 07</span>
            <span>RT60 <strong>0.82 S</strong></span>
          </div>
        </div>
      </div>
      <div className="vz-wrap" aria-hidden="true" style={{ position: "absolute", bottom: 18, left: 0, right: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--vz-muted)", font: "400 10px/1 var(--font-mono)", letterSpacing: ".12em", textTransform: "uppercase" }}>
          <span>Scroll to map the field</span><Logo className="vz-hero__mini-logo" />
        </div>
      </div>
    </section>
  );
}
