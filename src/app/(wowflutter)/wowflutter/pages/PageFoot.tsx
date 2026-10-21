/** The printed folio at the foot of every page: number on the outer edge, running head opposite. */
export function PageFoot({ n, label = "wowflutter · Issue 07" }: { n: number; label?: string }) {
  return (
    <footer className={`wf-foot ${n % 2 === 1 ? "wf-foot--recto" : "wf-foot--verso"}`}>
      <span className="wf-foot__n">{String(n).padStart(2, "0")}</span>
      <span>{label}</span>
    </footer>
  );
}
