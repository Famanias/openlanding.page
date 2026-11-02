const TAU = Math.PI * 2;

/** A lightweight projection of the same parametric centerline, with no WebGL dependency. */
function project(t: number, crossSection: number) {
  const radius = 2 * (1 + 0.32 * Math.cos(3 * t)) + Math.cos(crossSection) * 0.43;
  const x = radius * Math.cos(2 * t);
  const y = radius * Math.sin(2 * t);
  const z = -0.8 * Math.sin(3 * t) + Math.sin(crossSection) * 0.15;
  const tiltedX = x * Math.cos(-0.18) + z * Math.sin(-0.18);
  const tiltedY = y * Math.cos(0.12) - z * Math.sin(0.12);
  return `${(320 + (tiltedX * Math.cos(-0.2) - tiltedY * Math.sin(-0.2)) * 82).toFixed(1)},${(320 - (tiltedX * Math.sin(-0.2) + tiltedY * Math.cos(-0.2)) * 82).toFixed(1)}`;
}

const rails = Array.from({ length: 12 }, (_, column) => {
  const crossSection = column / 12 * TAU;
  return Array.from({ length: 8 }, (_, section) => ({
    lime: Math.sin(section / 8 * TAU - 0.7) > 0,
    path: Array.from({ length: 13 }, (_, index) => `${index ? "L" : "M"}${project((section + index / 12) / 8 * TAU, crossSection)}`).join(""),
  }));
}).flat();

const lattice = Array.from({ length: 2 }, (_, tone) => {
  let path = "";
  for (let ring = 0; ring < 60; ring++) {
    if (Number(Math.sin(ring / 60 * TAU - 0.7) > 0) !== tone) continue;
    for (let column = 0; column < 6; column++) {
      path += `M${project(ring / 60 * TAU, column / 6 * TAU)}L${project((ring + 1) / 60 * TAU, (column + 1) / 6 * TAU)}L${project(ring / 60 * TAU, (column + 1) / 6 * TAU)}`;
    }
  }
  return path;
});

export default function TorusKnotFallback() {
  return (
    <svg className="jm-knot-fallback" viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <g strokeWidth="0.6" opacity="0.48">
        <path d={lattice[0]} stroke="#00E5FF" />
        <path d={lattice[1]} stroke="#CCFF00" />
      </g>
      {rails.map((rail, index) => <path key={index} d={rail.path} stroke={rail.lime ? "#CCFF00" : "#00E5FF"} strokeWidth={index % 8 === 0 ? 1.4 : 0.65} opacity="0.85" />)}
      <g fill="#00E5FF" opacity="0.5">
        {Array.from({ length: 140 }, (_, index) => {
          const angle = index * 2.399963;
          const radius = 255 + Math.sin(angle * 3) * 24;
          return <circle key={index} cx={320 + Math.cos(angle) * radius} cy={320 + Math.sin(angle) * radius} r={index % 7 === 0 ? 1.2 : 0.6} />;
        })}
      </g>
    </svg>
  );
}
