import { Arrow } from "../brand/Icons";
import { TerraceScene } from "../illustrations/TerraceScene";

export function LandscapeChapter() {
  return <><TerraceScene /><div className="st-essay st-landscape-essay"><span className="st-japanese-title" lang="ja">里山という場所。</span><h2>Between the mountains,<br />a world <em>of its own.</em></h2><p>Satoyama is the meeting place of village and mountain. A patchwork of woodland, rice paddies, streams, and homes, shaped by people living alongside nature.</p><p>Look a little closer. A kitchen garden by the gate. Water moving through an irrigation channel. A path worn smooth by generations of footsteps.</p><a className="st-text-link" href="#a-slower-rhythm">Meet the rhythm of the village <Arrow /></a></div><div className="st-field-note"><span lang="ja">里 — village &nbsp; 山 — mountain</span><p>Not wilderness. Not quite town.<br />A landscape made together.</p><svg viewBox="0 0 120 45" fill="none" aria-hidden="true"><path d="M3 8c25 39 68 29 109 3m-13 0 15-1-6 13" stroke="currentColor" strokeWidth="1.2" /></svg></div></>;
}
