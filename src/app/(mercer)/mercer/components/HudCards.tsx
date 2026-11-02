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

export function AppletCode() {
  return (
    <code>{CODE.map((line, index) => (
        <span className={`jm-code-line${[0, 2, 9].includes(index) ? " jm-code-accent" : ""}`} key={index}>
          <span className="jm-code-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{line}
        </span>
      ))}</code>
  );
}

export function TerminalCodeCard({ onOpen }: { onOpen?: () => void }) {
  return (
    <button type="button" className="jm-terminal" aria-label="Open experiment notes" aria-haspopup="dialog" aria-controls="jm-detail-dialog" onClick={onOpen}>
      <span className="jm-terminal-bar"><span aria-hidden="true"><i /><i /><i /></span><span>applet.ts</span><span aria-hidden="true">↗</span></span>
      <span className="jm-terminal-code"><AppletCode /></span>
      <span className="jm-terminal-footer"><span>TYPESCRIPT</span><span className="jm-terminal-invite">OPEN NOTES ↗</span></span>
    </button>
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
