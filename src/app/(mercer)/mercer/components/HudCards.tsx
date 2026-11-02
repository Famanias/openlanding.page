export function FpsBadge({ fps }: { fps: number }) {
  return (
    <div className="jm-fps jm-mono" aria-label="Measured rendering frame rate">
      <span className="jm-fps-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>{fps > 0 && Number.isFinite(fps) ? `${Math.round(fps)} FPS` : "— FPS"}</span>
    </div>
  );
}

const CODE = [
  "function applet() {",
  "  const scene = new THREE.Scene();",
  "  const knot = createGeometry({",
  "    type: 'torus-knot',",
  "    winding: [2, 3],",
  "    material: 'possibility'",
  "  });",
  "",
  "  scene.add(knot);",
  "  function animate(time) {",
  "    knot.rotation.z += 0.001;",
  "    renderer.render(scene, camera);",
  "    requestAnimationFrame(animate);",
  "  }",
  "  animate();",
  "}",
];

export function TerminalCodeCard() {
  return (
    <aside className="jm-terminal" aria-label="Procedural experiment code preview">
      <div className="jm-terminal-bar"><span aria-hidden="true"><i /><i /><i /></span><span>applet.ts</span><span>↗</span></div>
      <pre><code>{CODE.map((line, index) => (
        <span className={`jm-code-line${[0, 2, 9].includes(index) ? " jm-code-accent" : ""}`} key={index}>
          <span className="jm-code-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{line}{"\n"}
        </span>
      ))}</code></pre>
      <div className="jm-terminal-footer"><span>TYPESCRIPT</span><span>UTF-8</span></div>
    </aside>
  );
}

export function ExperimentStatusCard({ online = true, paused = false }: { online?: boolean; paused?: boolean }) {
  return (
    <div className="jm-experiment-status jm-mono">
      <span className="jm-experiment-label">INTERACTIVE EXPERIMENT / 001</span>
      <span className="jm-system-status" data-online={online && !paused}>
        <i aria-hidden="true" />
        {online ? (paused ? "SYSTEM PAUSED // STAT: IDLE" : "SYSTEM ONLINE // STAT: ACTIVE") : "STATIC PREVIEW // STAT: IDLE"}
      </span>
    </div>
  );
}
