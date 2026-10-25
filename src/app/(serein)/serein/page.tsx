import { Logo } from "./brand/Logo";
import { ScrollEffects } from "./motion/ScrollEffects";
import { LandingSections } from "./sections/LandingSections";
import { PANELS } from "./sections/Panels";

export default function SereinPage() {
  return (
    <>
      <ScrollEffects />
      <a className="sr-skip" href="#outlook">Skip to the forecast</a>
      <header className="sr-header">
        <Logo />
        <nav className="sr-nav" aria-label="Forecast panels">
          {PANELS.slice(1, 6).map((panel) => <a key={panel.id} href={`#${panel.id}`}>{panel.label}</a>)}
        </nav>
        <a className="sr-header__cta" href="#subscribe">Join the dispatch</a>
      </header>
      <main>
        <section id="outlook" className="sr-intro" aria-labelledby="serein-title">
          <div className="sr-intro__copy">
            <div className="sr-intro__meta"><span>Open issue 07</span><span>51.52° N / 0.09° W</span><span>New moon / 2026</span></div>
            <h1 id="serein-title">Small weather,<br /><span>closely observed.</span></h1>
            <p>Reports from the places between the forecast and the feeling.</p>
            <div className="sr-intro__actions"><a className="sr-button" href="#forecast">Read the forecast</a><a className="sr-text-link" href="#bureau">The bureau note</a></div>
          </div>
          <div className="sr-intro__orb" aria-hidden="true">
            <div className="sr-intro__orb-grid" />
            <div className="sr-intro__orb-reading"><span>Current reading</span><strong>1016</strong><small>hPa / SW 12 kt</small></div>
            <span /><span /><span />
          </div>
        </section>
        <LandingSections />
      </main>
      <footer className="sr-footer">
        <Logo compact />
        <p>Small weather, closely observed.<br /><span>© 2026 SEREIN Bureau / Filed in the open air.</span></p>
        <div className="sr-footer__links"><a href="#bureau">The bureau</a><a href="#forecast">The forecast</a><a href="#dispatch">Dispatch</a></div>
        <a className="sr-footer__top" href="#outlook">Back to the cover</a>
      </footer>
    </>
  );
}
