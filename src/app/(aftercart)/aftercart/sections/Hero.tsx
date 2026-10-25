export function Hero() {
  return (
    <section id="top" className="ac-hero" aria-labelledby="hero-title">
      <div className="ac-container ac-hero-grid">
        <div className="ac-hero-copy">
          <p className="ac-section-note" data-ac-hero="label">Shopify care / after launch</p>
          <h1 id="hero-title" data-ac-hero="headline">Keep your shop ready.</h1>
          <p className="ac-hero-lead" data-ac-hero="lead">For small shops, steady care keeps storefronts quick, clear, and ready.</p>
          <div className="ac-hero-actions" data-ac-hero="actions">
            <a className="ac-button" href="#call">Book a care call</a>
            <a className="ac-button ac-button--quiet" href="#health">See the console</a>
          </div>
          <div className="ac-hero-meta" data-ac-hero="lead">
            <span>Owner-led shops</span>
            <span>One calm partner</span>
            <span>Local demo / no endpoint</span>
          </div>
        </div>
        <div className="ac-hero-console" data-ac-hero="console" aria-label="Preview of the AFTERCART store health console">
          <div className="ac-console">
            <div className="ac-console-top">
              <div><strong>Store health</strong><small>Live care console</small></div>
              <span className="ac-console-case">Case 026 / Today</span>
            </div>
            <div className="ac-console-main">
              <div className="ac-ring" style={{ "--ac-score": 78 } as React.CSSProperties}>
                <div className="ac-ring-copy"><strong>78</strong><span>good shape</span></div>
              </div>
              <div className="ac-console-readout">
                <h2>Needs a closer look.</h2>
                <p>Conversion is asking for a little more attention before the next campaign.</p>
              </div>
            </div>
            <div className="ac-console-foot">
              <div className="ac-signal-row" aria-label="Store signal levels">
                <span className="ac-signal"><span>Journey</span><i style={{ "--ac-level": "0.78" } as React.CSSProperties} /><b>78</b></span>
                <span className="ac-signal"><span>Shelf</span><i style={{ "--ac-level": "0.72" } as React.CSSProperties} /><b>72</b></span>
                <span className="ac-signal"><span>Load</span><i style={{ "--ac-level": "0.86" } as React.CSSProperties} /><b>86</b></span>
                <span className="ac-signal"><span>Return</span><i style={{ "--ac-level": "0.64" } as React.CSSProperties} /><b>64</b></span>
              </div>
              <p className="ac-console-timestamp">Next check<strong>Today / 14:20</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
