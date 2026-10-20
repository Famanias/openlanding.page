const LAYERS = [
  { n: "01", name: "Base", detail: "Merino 200 · moves sweat" },
  { n: "02", name: "Mid", detail: "Grid fleece · traps air" },
  { n: "03", name: "Shell", detail: "3L hardshell · stops weather" },
] as const;

/**
 * The three-layer system as stacked panels. `spread` (0..1) pulls the layers apart as the chapter scrolls;
 * `active` is the layer being described. Under reduced motion the parent passes spread = 1.
 */
export function LayerDiagram({ active, spread }: { active: 0 | 1 | 2; spread: number }) {
  return (
    <figure className="crn-layers" aria-label="The layering system: base, mid and shell">
      <div className="crn-layers__stack" style={{ "--spread": spread } as React.CSSProperties}>
        {LAYERS.map((l, i) => (
          <div key={l.name} className="crn-layers__panel" data-layer={i} data-active={i === active ? "" : undefined}>
            <span className="crn-label">{l.n}</span>
            <span className="crn-layers__name">{l.name}</span>
            <span className="crn-label crn-layers__detail">{l.detail}</span>
          </div>
        ))}
      </div>
      <figcaption className="crn-label crn-muted">Worn together, each layer does one job.</figcaption>
    </figure>
  );
}
