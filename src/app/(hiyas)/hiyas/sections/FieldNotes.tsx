import { Picture } from "../assets";
import { FIELD_NOTES } from "../content/expedition-data";

export function FieldNotes() {
  return <section className="hy-section hy-notes" id="notes" aria-labelledby="hy-notes-title"><div className="hy-container"><div className="hy-section-head"><h2 id="hy-notes-title">Read the mountain before you read the summit.</h2><p>Short route reports from the work around the line: approach, rhythm, weather, return.</p></div><div className="hy-notes__rail">{FIELD_NOTES.map((note) => <article className="hy-note" key={note.id}><div className="hy-note__media"><Picture assetKey={note.asset} alt={note.title}/></div><div className="hy-note__body"><div><span className="hy-mono hy-note__meta">{note.meta}</span><h3 className="hy-note__title">{note.title}</h3></div><p>{note.copy}</p><a className="hy-button" href="#inquiry"><span>Read the route note</span><span>↗</span></a></div></article>)}</div></div></section>;
}

