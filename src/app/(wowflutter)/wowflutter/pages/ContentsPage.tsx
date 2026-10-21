import { CONTENTS } from "../content/contents";
import { PageFoot } from "./PageFoot";

/** Page 3. Every row is a link that turns the book to that page. */
export function ContentsPage() {
  return (
    <div className="wf-sheet wf-sheet--stock">
      <p className="wf-label">In this issue</p>
      <h2 className="wf-h2">Contents</h2>
      <ol className="wf-toc">
        {CONTENTS.map((c) => (
          <li key={c.page}>
            <a href={`#p${c.page}`} className="wf-toc__row">
              <span className="wf-toc__page">{String(c.page).padStart(2, "0")}</span>
              <span className="wf-toc__text">
                <span className="wf-toc__label">{c.label}</span>
                <span className="wf-toc__note">{c.note}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <PageFoot n={3} />
    </div>
  );
}
