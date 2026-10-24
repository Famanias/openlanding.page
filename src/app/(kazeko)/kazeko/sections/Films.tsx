import { FILMS } from "../data/films";
import { Picture } from "../assets";
import { Landscape } from "../illustrations/Landscape";
import { Reveal } from "../motion/Reveal";
import { FilmCard } from "./FilmCard";
export function Films() {
  return <section className="kz-films kz-section" id="films" aria-labelledby="kz-films-title"><div className="kz-container">
    <Reveal variant="draw"><div className="kz-section-top"><span className="kz-eyebrow">01 / A few of our worlds</span><span className="kz-mono">SELECTED STORIES — 2025 / 26</span></div></Reveal>
    <div className="kz-section-heading"><Reveal variant="mask"><h2 id="kz-films-title">Small stories.<br /><em>Somewhere to get lost.</em></h2></Reveal><Reveal><p>A place you almost remember.<br />A feeling you can’t quite name.<br />Come stay for a little while.</p></Reveal></div>
    <div className="kz-film-grid">{FILMS.map((film, i) => <Reveal key={film.id} variant="scale" index={i} className={i === 0 ? "kz-film-featured" : ""}><FilmCard film={film}><Picture assetKey={film.id} alt={`${film.title} concept artwork`}><Landscape variant={film.variant} /></Picture></FilmCard></Reveal>)}</div>
    <div className="kz-films-foot"><span className="kz-mono">ORIGINALS · VISUAL POEMS · BRAND STORIES</span><p>Imagined films. Real possibilities.</p></div>
  </div></section>;
}
