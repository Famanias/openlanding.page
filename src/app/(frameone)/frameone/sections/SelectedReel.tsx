import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { OpenProject } from "../sheet/OpenProject";

export function SelectedReel() {
  const film = PROJECTS[0];
  return <section className="fo-reel" id="selected" data-scroll-scene>
    <div className="fo-reel__sticky">
      <div className="fo-leader fo-mono"><span>01 / SELECTED FILM</span><span>FRAME / ONE · MOTION &amp; STILL</span><span>01:16</span></div>
      <div className="fo-reel__image"><Picture assetKey={film.stills[0]} alt="A fictional harbor film still" /><span className="fo-reel__eyebrow fo-mono">A FRAME/ONE FILM &nbsp; / &nbsp; {film.year}</span><h2 className="fo-reel__title">{film.title}</h2><span className="fo-reel__subtitle">{film.caption}</span><span className="fo-reel__marker fo-mono">01A / 24 FPS</span></div>
      <div className="fo-reel__info" data-reveal="rise"><div><p className="fo-kicker">A SELECTED EXPOSURE / 01</p><p className="fo-reel__ident">NONFICTION / {film.year} / {film.length}</p></div><p>{film.synopsis}</p><OpenProject index={0} className="fo-action fo-magnetic">Open the film <span aria-hidden="true">↗</span></OpenProject></div>
    </div>
  </section>;
}
