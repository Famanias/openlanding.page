import { Plate } from "../assets";
import { formatCatNo } from "../content/catalogue";
import type { Artist } from "../content/roster";
import { PageFoot } from "./PageFoot";

/** Pages 7 to 9: one artist and one answer per page. */
export function RosterPage({ artist, n, of }: { artist: Artist; n: number; of: number }) {
  return (
    <div className={`wf-sheet ${n % 2 === 1 ? "wf-sheet--stock" : "wf-sheet--worn"}`}>
      <p className="wf-label">
        Roster · {of} of 3
      </p>
      <Plate assetKey={artist.portrait} alt={artist.portraitAlt} className="wf-portrait" sizes="(min-width: 1000px) 24vw, 80vw" />
      <h2 className="wf-h2">{artist.name}</h2>
      <p className="wf-label wf-meta">
        {artist.kind} · {artist.place}
      </p>
      <div className="wf-qa">
        <p className="wf-q">{artist.question}</p>
        <p className="wf-text">{artist.answer}</p>
      </div>
      <p className="wf-label wf-more">
        <a href="#p10">On {formatCatNo(artist.release)} →</a>
      </p>
      <PageFoot n={n} label="Roster" />
    </div>
  );
}
