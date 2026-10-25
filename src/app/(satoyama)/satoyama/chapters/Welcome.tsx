import { Arrow, Leaf } from "../brand/Icons";
import { MeadowScene } from "../illustrations/MeadowScene";

export function Welcome() {
  return <>
    <MeadowScene />
    <div className="st-hero-copy">
      <div className="st-kicker"><span className="st-small-rule" /> A SLOWER KIND OF DAY <span lang="ja">里山日和</span></div>
      <h1><span>A little closer to nature.</span><span>A little closer <em>to yourself.</em></span></h1>
      <p>Where the mountains breathe, the seasons linger,<br className="st-desktop-break" /> and the everyday feels a little more meaningful.</p>
      <a className="st-primary" href="#the-landscape"><Leaf /><span>Let’s wander a while</span><Arrow /></a>
      <div className="st-reading-note">An illustrated journey into rural Japan <span>—</span> at your own pace.</div>
    </div>
    <div className="st-vertical-poem" lang="ja"><span>何もない日が、</span><span>いちばん豊かな日になる。</span></div>
    <div className="st-landscape-label"><span className="st-label-line" /><span lang="ja">山と、田んぼと、小さな暮らし。</span><span>Mountains. Rice fields. A life in between.</span></div>
  </>;
}
