export function ThreadLine() {
  return (
    <div className="am-threadline" aria-hidden="true">
      <span />
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} style={{ left: `${i * 20}%` }} />
      ))}
      <b />
    </div>
  );
}
