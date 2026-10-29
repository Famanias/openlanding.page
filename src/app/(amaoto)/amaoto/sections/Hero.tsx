import { Hanko } from "../brand/Hanko";
import { StageAnchor } from "../bg/StageAnchor";
export function Hero() {
  return (
    <section id="top" className="am-section am-hero">
      <StageAnchor />
      <div className="am-hero__copy am-chapter-copy">
        <span className="am-kicker">Wagasa atelier / Kurokawa, Nagano</span>
        <h1>
          <span className="am-line">
            <span>雨音</span>
          </span>
          <em>
            <span className="am-line">
              <span>The sound of rain,</span>
            </span>
            <span className="am-line">
              <span>kept dry.</span>
            </span>
          </em>
        </h1>
        <p>
          Commission a hand-built oil-paper umbrella, tuned to the weather you
          will carry it through.
        </p>
        <a className="am-button am-button--red" href="#commission">
          Reserve a commission <span>↗</span>
        </a>
      </div>
      <div className="am-vertical">雨の音を、紙に。</div>
      <Hanko />
      <span className="am-stage-caption">40 ribs / one quiet mechanism</span>
    </section>
  );
}
