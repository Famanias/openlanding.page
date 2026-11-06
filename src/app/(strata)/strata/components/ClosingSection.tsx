"use client";

interface ClosingSectionProps {
  onOpenInquiry: () => void;
}

export function ClosingSection({ onOpenInquiry }: ClosingSectionProps) {
  return (
    <section
      className="closing"
      id="closing"
      data-nav="dark"
      data-chapter="08 / ACQUIRE"
      aria-labelledby="closing-title"
    >
      <img
        className="closing-bg"
        src="/templates/strata/strata-07-closing-still-life.webp"
        alt="STRATA ceramic vessel standing on a rough limestone plinth against a dark backdrop"
      />
      <div className="closing-shade" aria-hidden="true" />
      <div className="closing-inner">
        <div className="closing-content">
          <span className="eyebrow">08 / Direct acquisition</span>
          <h2 id="closing-title">
            Formed by earth.
            <br />
            <em>Defined by time.</em>
          </h2>
          <div className="closing-actions">
            <button
              className="circle-link"
              id="inquire-trigger"
              type="button"
              aria-haspopup="dialog"
              aria-controls="inquire-dialog"
              onClick={onOpenInquiry}
            >
              <span className="circle-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M7 17 17 7m0 0H8m9 0v9" />
                </svg>
              </span>
              <span className="circle-label">Inquire about Vessel No. 01</span>
            </button>
            <div className="closing-note">
              <span className="meta">PRICE &amp; ACQUISITION</span>
              <p>
                € 1,850 · Hand-delivered worldwide in custom felt-lined timber crate. Private viewings arranged upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
