import { Plate } from "../assets";
import { STATUS_LABEL, formatCatNo, releasesOnSide } from "../content/catalogue";
import { PageFoot } from "./PageFoot";

/** Pages 10 and 11: Side A and Side B of the catalogue. */
export function CataloguePage({ side, n }: { side: "a" | "b"; n: number }) {
  const releases = releasesOnSide(side);
  return (
    <div className={`wf-sheet ${side === "a" ? "wf-sheet--worn" : "wf-sheet--stock"}`}>
      <p className="wf-label">Catalogue · WF-{side === "a" ? "001 to 004" : "005 to 008"}</p>
      <h2 className="wf-h2">Side {side.toUpperCase()}</h2>
      <ul className="wf-releases">
        {releases.map((r) => (
          <li key={r.no} className="wf-release" data-status={r.status}>
            <span className="wf-release__no wf-label">{formatCatNo(r.no)}</span>
            <span className="wf-release__text">
              <span className="wf-release__artist">{r.artist}</span>
              <span className="wf-release__title">{r.title}</span>
            </span>
            <span className="wf-release__meta wf-label">
              {r.year} · ed. {r.edition}
              <span className="wf-chip">{STATUS_LABEL[r.status]}</span>
            </span>
          </li>
        ))}
      </ul>
      {side === "a" ? (
        <Plate
          assetKey="sleeve-stack"
          alt="A stack of hand-stitched zines tucked inside black record sleeves"
          className="wf-band"
          sizes="(min-width: 1000px) 30vw, 90vw"
        />
      ) : (
        <p className="wf-text wf-note">
          WF-008 reaches subscribers first. <a href="#p13">Get the next issue →</a>
        </p>
      )}
      <PageFoot n={n} label="Catalogue" />
    </div>
  );
}
