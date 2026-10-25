import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { GreaseLoop } from "./GreaseLoop";
import { FRAMES } from "./roll";

const STRIPS = [FRAMES.slice(0, 4), FRAMES.slice(4, 8), FRAMES.slice(8, 12)];

/** One roll printed on one sheet: three strips of four square frames, edge print, selects looped in grease pencil. */
export function ContactSheet() {
  return (
    <div className="cg-board">
      <div className="cg-board__head" aria-hidden="true">
        <span>Chinagraph 120</span>
        <span>Roll 07 · Concrete Flash</span>
        <span>12 exp · pushed +1</span>
      </div>
      <div className="cg-board__strips">
        {STRIPS.map((strip, s) => (
          <div key={s} className="cg-strip" style={{ "--s": s } as CSSProperties}>
            <span className="cg-strip__edge" aria-hidden="true">CHINAGRAPH 120 ▸ 07 ▸ {strip[0].n}A ▸ SAFETY FILM ▸ {strip[3].n}</span>
            <ol className="cg-strip__frames">
              {strip.map((frame) => (
                <li key={frame.n} className="cg-frame" data-frame-n={frame.n} data-select={frame.select ? "true" : undefined}>
                  <span className="cg-frame__img">
                    <Picture assetKey={frame.image} alt={`Frame ${frame.n}: ${frame.alt}`} sizes="(min-width: 1024px) 14vw, 24vw" priority={frame.n <= 4} />
                  </span>
                  <span className="cg-frame__n" aria-hidden="true">{frame.n}</span>
                  {frame.select ? <GreaseLoop n={frame.n} /> : null}
                </li>
              ))}
            </ol>
            <span className="cg-strip__edge cg-strip__edge--bottom" aria-hidden="true">{strip.map((f) => `${f.n} ▸`).join(" ")} KODAK-FREE ▸ ISO 400</span>
          </div>
        ))}
      </div>
      <span className="cg-loupe" aria-hidden="true">
        <span className="cg-loupe__ring" />
      </span>
    </div>
  );
}
