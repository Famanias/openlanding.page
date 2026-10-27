/** A still of the night shore for the static page: moon, its streak on wet sand, five tide lines. */
export function ShorePoster() {
  const lines = [0, 1, 2, 3, 4];
  return (
    <svg className="lt-poster" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="lt-poster-glow" cx="70%" cy="26%" r="45%">
          <stop offset="0" className="lt-poster__glow-a" />
          <stop offset="1" className="lt-poster__glow-b" />
        </radialGradient>
        <linearGradient id="lt-poster-streak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" className="lt-poster__streak-a" />
          <stop offset="1" className="lt-poster__streak-b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="520" className="lt-poster__sky" />
      <rect width="1200" height="520" fill="url(#lt-poster-glow)" />
      <circle cx="840" cy="130" r="38" className="lt-poster__moon" />
      <path className="lt-poster__headland" d="M0 300 C140 268 220 286 330 262 S520 230 610 270 S760 300 900 286 1100 262 1200 276 V330 H0Z" />
      <rect x="0" y="300" width="1200" height="220" className="lt-poster__sand" />
      <path d="M800 300 L880 300 L940 520 L740 520Z" fill="url(#lt-poster-streak)" />
      {lines.map((i) => (
        <path
          key={i}
          className="lt-poster__tideline"
          d={`M0 ${330 + i * 38} C200 ${322 + i * 38} 360 ${342 + i * 38} 600 ${332 + i * 38} S1000 ${324 + i * 38} 1200 ${336 + i * 38}`}
          style={{ opacity: 0.55 - i * 0.09 }}
        />
      ))}
    </svg>
  );
}
