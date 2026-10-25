const steps = [
  ["01 / Listen", "We start with the shop as it is: the pressure points, the good parts, and the next customer you want to keep."],
  ["02 / Tune", "A focused care window makes one useful change at a time, with a short note you can actually act on."],
  ["03 / Keep", "The work becomes a rhythm, not a rebuild: a partner who knows what changed and what deserves a look next."],
] as const;

export function Rhythm() {
  return (
    <section id="rhythm" className="ac-section ac-section--ink" aria-labelledby="rhythm-title">
      <div className="ac-container">
        <div className="ac-section-head" data-ac-reveal="rise">
          <p className="ac-section-note">The care rhythm</p>
          <div><h2 id="rhythm-title">A shop gets better in passes.</h2><p>Not a giant handoff. A clear cadence that leaves the owner in the loop.</p></div>
        </div>
        <div className="ac-rhythm">
          {steps.map(([label, copy], index) => (
            <article className="ac-rhythm-step" key={label} data-ac-reveal="rise" style={{ "--ac-index": index } as React.CSSProperties}>
              <small>{label}</small><h3>{index === 0 ? "Listen." : index === 1 ? "Tune." : "Keep."}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
