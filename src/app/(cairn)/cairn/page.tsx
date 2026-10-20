import { Picture } from "./assets";
import { AscentStage } from "./ascent/AscentStage";
import { CAMPS } from "./ascent/camps";
import { Logo } from "./brand/Logo";
import { SmoothScroll } from "./SmoothScroll";

function ChapterPlaceholder({ index }: { index: number }) {
  const camp = CAMPS[index];
  return (
    <section className="crn-chapter" id={camp.id} data-camp={camp.id}>
      <p className="crn-label crn-chapter__alt">
        {camp.altitude.toLocaleString("en-US")} m · {camp.name}
      </p>
      <h2 className="crn-h2">{camp.name}</h2>
    </section>
  );
}

export default function CairnPage() {
  return (
    <>
      <SmoothScroll />
      <header className="crn-topbar">
        <Logo />
        <nav className="crn-nav" aria-label="Sections">
          <a href="#base">Collection</a>
          <a href="#c2">Layering</a>
          <a href="#c3">Shells</a>
          <a href="#c4">Down</a>
          <a href="#summit">Lookbook</a>
        </nav>
        <a className="crn-btn crn-btn--outline" href="#summit">
          Expedition list
        </a>
      </header>

      <main id="top">
        <section className="crn-hero">
          <Picture
            assetKey="hero-k2"
            alt="K2 at blue hour, seen from Concordia above the Baltoro Glacier"
            className="crn-hero__image"
            sizes="100vw"
            priority
          />
          <div className="crn-hero__copy">
            <p className="crn-label">Alpine equipment · Tested on K2</p>
            <h1 className="crn-display">Built above the treeline.</h1>
            <p className="crn-lead">
              Shells, down and layers for the long climb. Every piece in the FW26 collection was worn on the Abruzzi
              Spur, from base camp at 5,000 metres to the summit at 8,611.
            </p>
            <div className="crn-hero__actions">
              <a className="crn-btn" href="#base">
                Begin the ascent
              </a>
              <a className="crn-btn crn-btn--outline" href="#summit">
                Expedition lookbook
              </a>
            </div>
          </div>
          <p className="crn-hero__scroll crn-label" aria-hidden="true">
            Scroll to climb ↓
          </p>
        </section>

        <AscentStage>
          {CAMPS.map((_, i) => (
            <ChapterPlaceholder key={CAMPS[i].id} index={i} />
          ))}
        </AscentStage>
      </main>

      <footer className="crn-footer">
        <Logo />
        <p className="crn-label">© 2026 Cairn Alpine Equipment</p>
      </footer>
    </>
  );
}
