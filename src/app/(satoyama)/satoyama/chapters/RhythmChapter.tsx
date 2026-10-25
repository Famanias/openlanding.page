import { VillageScene } from "../illustrations/VillageScene";
import { ActivityArt } from "../illustrations/ActivityArt";

const MOMENTS = [
  { time: "Early morning", ja: "朝", title: "Wake with the village.", body: "Slide open the window. Put the kettle on. Somewhere nearby, a neighbour is already tending the garden." },
  { time: "The long afternoon", ja: "昼", title: "Make something of the day.", body: "A little work in the fields. A walk to the local shop. A conversation that lasts longer than you planned." },
  { time: "As evening settles", ja: "夕", title: "Come back to simple things.", body: "Rice on the stove, vegetables from the garden, and time around the table. Outside, the hills grow quiet." },
];

export function RhythmChapter() {
  return <div className="st-rhythm-layout"><VillageScene /><div className="st-rhythm-intro"><span className="st-japanese-title" lang="ja">日々を、ていねいに。</span><h2>Here, the little things<br />fill <em>the whole day.</em></h2><p>Rural life has work, weather, and responsibilities of its own. Its quiet beauty lives in the familiar rituals between them.</p><div className="st-tea-picture"><ActivityArt scene="tea" /><span lang="ja">お茶にしましょう。<small>Shall we have some tea?</small></span></div></div><div className="st-journal">{MOMENTS.map((moment, index) => <article className="st-journal-entry" key={moment.ja} style={{ "--st-i": index } as React.CSSProperties}><div className="st-journal-time"><span>{moment.time}</span><span lang="ja">{moment.ja}</span></div><h3>{moment.title}</h3><p>{moment.body}</p></article>)}</div></div>;
}
