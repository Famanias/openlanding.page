import { SURFACES, type SurfaceId } from "../chamber/geometry";
import { Reveal } from "../motion/Reveal";

const surfaceMeta: Array<{ id: SurfaceId; code: string; meta: string }> = [
  { id: "felt", code: "S-01", meta: "82% absorb / 03 paths" },
  { id: "slat", code: "S-04", meta: "44% absorb / 05 paths" },
  { id: "stone", code: "S-07", meta: "18% absorb / 07 paths" },
];

export function Surfaces() {
  return (
    <section id="surfaces" className="vz-surfaces-section" aria-labelledby="vz-surfaces-title">
      <div className="vz-wrap">
        <div className="vz-surfaces-section__head">
          <div><p className="vz-eyebrow">02 / Surface library</p><h2 id="vz-surfaces-title" className="vz-section-title">Materials give the room its accent.</h2></div>
          <p className="vz-lead">Three surfaces, one field. Select a material in the chamber to change absorption, reflection count and the shape of the listening moment.</p>
        </div>
        <div className="vz-surface-grid">
          {surfaceMeta.map((item, index) => {
            const material = SURFACES[item.id];
            return <Reveal key={item.id} delay={index * 80} className="vz-material-card" as="article">
              <div className="vz-material-card__top"><span className="vz-material-card__index">{item.code}</span><span>{material.label}</span></div>
              <div className="vz-material-card__bottom"><h3>{material.label}</h3><p>{material.description}</p><div className="vz-material-card__meta"><span>{item.meta}</span><span>FIELD / READY</span></div></div>
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
