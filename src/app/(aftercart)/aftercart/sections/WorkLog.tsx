const entries = [
  ["Today", "Collection hierarchy / 03", "In care"],
  ["Tue", "Product page clarity / 11", "Ready"],
  ["Mon", "Image weight pass / 08", "Shipped"],
] as const;

export function WorkLog() {
  return (
    <section className="ac-section" aria-labelledby="log-title">
      <div className="ac-container ac-log-grid">
        <div className="ac-log-intro" data-ac-reveal="rise">
          <p className="ac-section-note">A small, useful paper trail</p>
          <h2 id="log-title" className="ac-log-title">The work stays visible.</h2>
          <p>Every care window ends with a clear note: what moved, why it mattered, and what we would check next.</p>
        </div>
        <div className="ac-log-list" data-ac-reveal="draw">
          {entries.map(([date, title, status], index) => (
            <article className="ac-log-row" key={title} style={{ "--ac-index": index } as React.CSSProperties}>
              <time>{date}</time><strong>{title}</strong><small>{status}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
