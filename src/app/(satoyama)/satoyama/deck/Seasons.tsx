"use client";

import { useState } from "react";
import { AutumnScene, SpringScene, SummerScene, WinterScene } from "../illustrations/SeasonScenes";
import { SEASONS } from "./chapters";

export function Seasons() {
  const [season, setSeason] = useState(0);
  const current = SEASONS[season];
  return <div className="st-seasons" data-season={season}><div className="st-season-stack">{[SpringScene, SummerScene, AutumnScene, WinterScene].map((Scene, index) => <div key={index} className="st-season-layer" data-on={season === index} aria-hidden={season === index ? undefined : true}><Scene /></div>)}</div><div className="st-season-copy"><span className="st-japanese-title" lang="ja">季節と、ともに暮らす。</span><h2>The same little village.<br /><em>Four different worlds.</em></h2><div className="st-season-tabs" role="tablist" aria-label="Choose a season">{SEASONS.map((item, index) => <button id={`st-season-${index}`} key={item.name} role="tab" aria-selected={season === index} aria-controls="st-season-panel" tabIndex={season === index ? 0 : -1} onClick={() => setSeason(index)} onKeyDown={(event) => { let next: number | null = null; if (event.key === "ArrowRight") next = (index + 1) % 4; if (event.key === "ArrowLeft") next = (index + 3) % 4; if (event.key === "Home") next = 0; if (event.key === "End") next = 3; if (next !== null) { event.preventDefault(); setSeason(next); document.getElementById(`st-season-${next}`)?.focus(); } }}><span lang="ja">{item.japanese}</span>{item.name}</button>)}</div><div id="st-season-panel" className="st-season-panel" role="tabpanel" aria-labelledby={`st-season-${season}`} tabIndex={0} key={season}><h3>{current.line}</h3><p>{current.description}</p></div></div><span className="st-season-kanji" lang="ja" aria-hidden="true">{current.japanese}</span></div>;
}
