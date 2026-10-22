import { Reveal } from "../motion/Reveal";

export function Hero() {
  return (
    <section id="top" className="lh-hero-section">
      <div className="lh-wrap">
        <div className="lh-hero-grid">
          <div className="lh-hero-content">
            {/* Kicker badge */}
            <div className="lh-hero-kicker-wrap">
              <span className="lh-hero-kicker">COMMUNITY WORKSHOP &bull; TRADE-GRADE INVENTORY</span>
              <span className="lh-hero-code">SYS // 2026-REV</span>
            </div>

            {/* Headline with mask-rise effect */}
            <h1 className="lh-hero-headline">
              <span className="lh-mask-line">
                <span>The neighborhood</span>
              </span>
              <span className="lh-mask-line">
                <span>workshop on your</span>
              </span>
              <span className="lh-mask-line">
                <span className="lh-text-accent">own block.</span>
              </span>
            </h1>

            {/* Lead copy */}
            <p className="lh-hero-lead">
              Four hundred and twenty-eight trade-grade tools, joinery rigs, and machinery bays—held in common,
              serviced after every borrow, and located within a six-minute walk of your workbench.
            </p>

            {/* Dual CTAs */}
            <div className="lh-hero-actions">
              <a href="#pegboard" className="lh-btn lh-btn-primary">
                Unlatch the Tool Wall ↓
              </a>
              <a href="#kits" className="lh-btn lh-btn-secondary">
                Explore Field Packs →
              </a>
            </div>
          </div>

          {/* Hero Technical Staging Display */}
          <div className="lh-hero-technical">
            <div className="lh-hero-frame">
              <div className="lh-hero-frame-header">
                <span className="lh-frame-serial">INSPECTION RIG // BENCH BAY 01</span>
                <span className="lh-frame-indicator">LIVE FEED ●</span>
              </div>

              {/* Technical Schematic Art */}
              <div className="lh-hero-blueprint" aria-hidden="true">
                <svg viewBox="0 0 400 240" fill="none" className="lh-blueprint-svg">
                  {/* Caliper dimensions */}
                  <line x1="40" y1="20" x2="360" y2="20" stroke="#7E8A90" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="40" y1="15" x2="40" y2="25" stroke="#7E8A90" strokeWidth="2" />
                  <line x1="360" y1="15" x2="360" y2="25" stroke="#7E8A90" strokeWidth="2" />
                  <text x="180" y="16" fill="#7E8A90" fontFamily="monospace" fontSize="9">320.00 MM SPAN</text>

                  {/* Machine silhouette schematic */}
                  <rect x="110" y="60" width="180" height="130" rx="4" stroke="#F4EFE6" strokeWidth="2.5" fill="#111618" />
                  <circle cx="200" cy="125" r="42" stroke="#1E51EB" strokeWidth="3" />
                  <circle cx="200" cy="125" r="16" stroke="#7E8A90" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="200" cy="125" r="5" fill="#1E51EB" />

                  {/* Alignment tick marks */}
                  <line x1="200" y1="45" x2="200" y2="60" stroke="#1E51EB" strokeWidth="2" />
                  <line x1="200" y1="190" x2="200" y2="205" stroke="#1E51EB" strokeWidth="2" />
                  <line x1="95" y1="125" x2="110" y2="125" stroke="#1E51EB" strokeWidth="2" />
                  <line x1="290" y1="125" x2="305" y2="125" stroke="#1E51EB" strokeWidth="2" />

                  {/* Callout arrows */}
                  <path d="M260 85 L310 65 L330 65" stroke="#7E8A90" strokeWidth="1.5" />
                  <text x="315" y="60" fill="#F4EFE6" fontFamily="monospace" fontSize="9">COLLET RUNOUT &plusmn;0.02</text>

                  <path d="M140 165 L90 185 L70 185" stroke="#7E8A90" strokeWidth="1.5" />
                  <text x="45" y="180" fill="#F4EFE6" fontFamily="monospace" fontSize="9">230V 1,400W</text>
                </svg>
              </div>

              {/* Status details */}
              <div className="lh-hero-frame-footer">
                <div>
                  <span className="lh-spec-kicker">LAST CALIBRATION</span>
                  <strong className="lh-spec-bold">OCT 21, 2026 // PASS</strong>
                </div>
                <div>
                  <span className="lh-spec-kicker">LOAN STATUS</span>
                  <strong className="lh-spec-bold lh-text-accent">READY FOR HOLD</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stat Telemetry Strip */}
        <Reveal variant="rise" className="lh-hero-strip">
          <div className="lh-strip-cell">
            <span className="lh-strip-label">TRADE TOOLS REGISTERED</span>
            <strong className="lh-strip-val">428</strong>
            <span className="lh-strip-sub">Wood, metal, masonry, cordless</span>
          </div>
          <div className="lh-strip-cell">
            <span className="lh-strip-label">COMMUNITY RETURN RATE</span>
            <strong className="lh-strip-val">98.4%</strong>
            <span className="lh-strip-sub">Cleaned and checked on return</span>
          </div>
          <div className="lh-strip-cell">
            <span className="lh-strip-label">WORKBENCH DEPOTS</span>
            <strong className="lh-strip-val">03</strong>
            <span className="lh-strip-sub">Foundry Way, Millrace &amp; St. Jude</span>
          </div>
          <div className="lh-strip-cell">
            <span className="lh-strip-label">AVERAGE WALKING TIME</span>
            <strong className="lh-strip-val">5.8 min</strong>
            <span className="lh-strip-sub">Across neighborhood blocks</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
