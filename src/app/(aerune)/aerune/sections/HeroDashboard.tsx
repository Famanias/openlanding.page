const bars = [24, 31, 28, 38, 44, 39, 55, 64, 59, 72, 68, 76, 64, 61, 72, 82, 69, 62, 55, 48, 43, 36, 31, 25];

export function HeroDashboard() {
  return <div className="ar-preview" aria-label="Example AERUNE dashboard">
    <div className="ar-preview__top"><div><span className="ar-status-dot" /> <span>THE WORKPLACE AT A GLANCE</span></div><span>MONDAY, 08:30 <span className="ar-preview__mini">↗</span></span></div>
    <div className="ar-preview__body">
      <div className="ar-preview__intro"><div><span className="ar-ui-label">BUILDING OVERVIEW</span><h2>A clearer picture,<br />room by room.</h2></div><div className="ar-preview__badge"><span className="ar-status-dot" /> Example readings</div></div>
      <div className="ar-preview__stats">
        <div><span>Indoor CO₂</span><strong>620 <small>ppm</small></strong><em>Morning arrival</em></div>
        <div><span>People in building</span><strong>38 <small>people</small></strong><em>Across 4 floors</em></div>
        <div><span>Ventilation</span><strong>61<small>%</small></strong><em>Following schedule</em></div>
      </div>
      <div className="ar-preview__graph"><div className="ar-preview__graph-head"><span>Air through the day</span><span>TODAY / 24 HOURS</span></div><div className="ar-preview__bars">{bars.map((height, i) => <span key={i} className={i >= 9 && i <= 15 ? "is-lit" : ""} style={{ "--bar": height } as React.CSSProperties} />)}</div><div className="ar-preview__hours"><span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span></div></div>
    </div>
  </div>;
}
