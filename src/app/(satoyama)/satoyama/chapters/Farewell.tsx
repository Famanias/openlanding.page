import { Arrow, Leaf } from "../brand/Icons";
import { DuskScene } from "../illustrations/DuskScene";

export function Farewell() {
  return <><DuskScene /><div className="st-farewell-copy"><span className="st-japanese-title" lang="ja">また、いつか。この場所で。</span><h2>Take a little of<br /><em>the quiet with you.</em></h2><p>A slower morning. A meal made with care. A moment<br className="st-desktop-break" /> outside, just to see what the sky is doing.</p><p>You don’t have to live here to bring a little<br className="st-desktop-break" /> of this way of living home.</p><a className="st-primary" href="#welcome"><Leaf /><span>Wander through again</span><Arrow /></a><span className="st-farewell-note">Until next time. <span lang="ja">またね。</span></span></div><div className="st-goodbye-stamp" lang="ja">里山<br />日和</div></>;
}
