import { ArrowRight } from "@phosphor-icons/react";
import { Picture } from "../assets";
import { rv } from "./Eyebrow";

export function TitleSlide() {
  return (
    <div className="orr-slide-inner orr-title">
      <div className="orr-title__copy">
        <p className="orr-label orr-reveal orr-title__kicker" style={rv(0)}>
          The orchestration layer for AI agents
        </p>
        <h1 className="orr-display orr-reveal" style={rv(1)}>
          Many agents,
          <br />
          <em>one clockwork.</em>
        </h1>
        <p className="orr-lead orr-reveal" style={rv(2)}>
          Orrery runs teams of specialised AI agents the way an orrery moves its planets. Each one keeps its own
          orbit, and all of them stay in time.
        </p>
        <div className="orr-title__actions orr-reveal" style={rv(3)}>
          <a className="orr-btn orr-btn--solid" href="#cta">
            Book a demo
          </a>
          <a className="orr-btn" href="#how">
            How it works <ArrowRight size={14} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
      <figure className="orr-title__art orr-reveal" style={rv(2)}>
        <Picture
          assetKey="title-orbits"
          alt="A brass orrery photographed from above, one planet painted ultramarine"
          className="orr-art orr-art--title"
          sizes="(min-width: 900px) 45vw, 100vw"
          priority
        />
      </figure>
      <p className="orr-title__hint orr-label orr-reveal" style={rv(4)}>
        Scroll, or press <kbd>→</kbd>
      </p>
    </div>
  );
}
