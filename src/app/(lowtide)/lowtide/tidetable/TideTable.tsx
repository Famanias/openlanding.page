import { Logo } from "../brand/Logo";
import { chapter, CHAPTERS, PRODUCT, SENSORS, STATS, TESTIMONIALS } from "../content/story";
import { PreorderForm } from "../forms/PreorderForm";
import { CHAPTER_CLOCK, formatClock, type ChapterId } from "../night/clock";
import { NightCalculator } from "./NightCalculator";
import { ShorePoster } from "./ShorePoster";

/**
 * Every word of LOWTIDE, in order. With reduced motion, no JavaScript or no WebGL this is the page;
 * while the 3D night runs it stays in the accessibility tree, visually hidden, as its mirror.
 */
export function TideTable() {
  const hook = chapter("hook");
  return (
    <main className="lt-table" id="lt-table">
      <header className="lt-hero">
        <Logo className="lt-hero__logo" />
        <ShorePoster />
        <div className="lt-hero__copy">
          <p className="lt-eyebrow"><span className="lt-mono">{formatClock(CHAPTER_CLOCK.hook)}</span> {hook.label}</p>
          <h1 className="lt-display">{hook.headline}</h1>
          <p className="lt-quiet">{hook.quietLine}</p>
        </div>
      </header>

      {CHAPTERS.filter((c) => c.id !== "hook").map((c) => (
        <section key={c.id} className="lt-tide" data-chapter={c.id} aria-labelledby={`lt-h-${c.id}`}>
          <div className="lt-tide__rail">
            <span className="lt-mono lt-tide__time">{formatClock(CHAPTER_CLOCK[c.id])}</span>
            <span className="lt-tide__label">{c.label}</span>
          </div>
          <div className="lt-tide__body">
            <h2 id={`lt-h-${c.id}`} className="lt-display lt-display--2">{c.headline}</h2>
            <p className="lt-quiet">{c.quietLine}</p>
            <ChapterDetail id={c.id} />
          </div>
        </section>
      ))}

      <footer className="lt-foot">
        <Logo />
        <ul className="lt-foot__sources">
          {STATS.map((s) => (
            <li key={s.value}><a href={s.sourceUrl} rel="noreferrer">{s.value}: {s.source}</a></li>
          ))}
        </ul>
        <p className="lt-mono lt-foot__note">LOWTIDE is a fictional brand. Moon imagery: NASA SVS CGI Moon Kit.</p>
      </footer>
    </main>
  );
}

function ChapterDetail({ id }: { id: ChapterId }) {
  switch (id) {
    case "problem":
      return (
        <ul className="lt-stats">
          {STATS.map((s) => (
            <li key={s.value} className="lt-stat">
              <span className="lt-stat__value">{s.value}</span>
              <span className="lt-stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      );
    case "sensors":
      return (
        <ul className="lt-pools">
          {SENSORS.map((s) => (
            <li key={s.id} className="lt-pool" data-sensor={s.id}>
              <span className="lt-pool__ring" aria-hidden="true" />
              <span className="lt-pool__name">{s.name}</span>
              <span className="lt-pool__line">{s.line}</span>
            </li>
          ))}
        </ul>
      );
    case "smart-wake":
      return (
        <p className="lt-note">
          Set the latest you can get up. Somewhere in the {PRODUCT.wakeWindowMin[0]}–{PRODUCT.wakeWindowMin[1]} minutes before it,
          your last cycle turns light. That is when the ring pulses, not when the alarm says.
        </p>
      );
    case "proof":
      return (
        <ul className="lt-quotes">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <blockquote className="lt-quote">
                <p>“{t.quote}”</p>
                <footer className="lt-mono">{t.name}, {t.city}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      );
    case "reveal":
      return (
        <dl className="lt-specs">
          <div><dt>Material</dt><dd>{PRODUCT.material}</dd></div>
          <div><dt>Battery</dt><dd>{PRODUCT.batteryDays} days a charge</dd></div>
          <div><dt>Sensors</dt><dd>{SENSORS.map((s) => s.name).join(", ")}</dd></div>
          <div><dt>Sizes</dt><dd>{PRODUCT.sizes[0]}–{PRODUCT.sizes[PRODUCT.sizes.length - 1]}</dd></div>
          <div><dt>Finishes</dt><dd>{PRODUCT.finishes.map((f) => f.name).join(", ")}</dd></div>
          <div><dt>App</dt><dd>{PRODUCT.app}</dd></div>
          <div><dt>Price</dt><dd>${PRODUCT.price}, no subscription</dd></div>
        </dl>
      );
    case "dawn":
      return (
        <div className="lt-dawn">
          <div className="lt-dawn__block">
            <p className="lt-dawn__title">Your night</p>
            <NightCalculator />
          </div>
          <div className="lt-dawn__block">
            <PreorderForm />
          </div>
        </div>
      );
    default:
      return null;
  }
}
