"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ActivityArt } from "../illustrations/ActivityArt";
import { ACTIVITIES } from "./chapters";
import { wrapActivity } from "./logic";

export function ActivityCarousel() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const go = (delta: number) => setIndex((value) => wrapActivity(value + delta, ACTIVITIES.length));
  return <div className="st-carousel" data-index={index} role="region" aria-roledescription="carousel" aria-label="Rural activities" onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); go(event.key === "ArrowRight" ? 1 : -1); } }} tabIndex={0}
    onTouchStart={(event) => { start.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (start.current !== null) { const delta = event.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1); } start.current = null; }}>
    <div className="st-carousel-window"><div className="st-carousel-track" style={{ "--st-card-index": index } as CSSProperties}>{[...ACTIVITIES, ...ACTIVITIES.slice(0, 2)].map((activity, i) => <article key={`${activity.id}-${i}`} className="st-activity" aria-hidden={i >= ACTIVITIES.length ? true : undefined} aria-label={`${i % ACTIVITIES.length + 1} of ${ACTIVITIES.length}: ${activity.title}`} aria-roledescription="slide"><div className="st-activity-picture"><ActivityArt scene={activity.scene} /><span className="st-activity-ja" lang="ja">{activity.japanese}</span><span className="st-postcard-number">0{i % ACTIVITIES.length + 1}</span></div><span className="st-activity-tag">{activity.tag}</span><h3>{activity.title}</h3><p>{activity.description}</p></article>)}</div></div>
    <div className="st-carousel-controls"><span className="st-carousel-caption">A few ways to spend a good day <span lang="ja">小さな楽しみ</span></span><span className="st-sr-only" aria-live="polite">Activity {index + 1} of {ACTIVITIES.length}</span></div>
  </div>;
}
