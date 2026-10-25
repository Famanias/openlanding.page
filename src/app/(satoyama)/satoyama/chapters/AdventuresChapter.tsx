import { ActivityCarousel } from "../deck/ActivityCarousel";
import { ForestScene } from "../illustrations/ForestScene";

export function AdventuresChapter() {
  return <div className="st-adventures"><ForestScene /><div className="st-adventure-heading"><div><span className="st-japanese-title" lang="ja">寄り道も、旅のうち。</span><h2>Leave room for<br /><em>a little wandering.</em></h2></div><p>You don’t need a grand plan.<br /> Just a curious heart, comfortable shoes,<br /> and a little time to spare.</p></div><ActivityCarousel /></div>;
}
