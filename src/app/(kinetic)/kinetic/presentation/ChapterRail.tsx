"use client";

import type { MouseEvent } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { scrollToStop } from "../journey/storyScroll";
import styles from "./presentationStyles";
import { useStorySelector } from "./useStory";

const CHAPTERS: ReadonlyArray<{ id: string; name: string; first: StopId }> = [
  { id: "depart", name: "Departure", first: "depart" },
  { id: "prepare", name: "Prepare the load", first: "prepare" },
  { id: "connected", name: "On the road", first: "truck" },
  { id: "workspace", name: "Connected workspace", first: "workspace" },
  { id: "arrive", name: "Arrival", first: "closeout" },
];

/**
 * Chapter navigation for the presentation (wide screens). Plain anchors
 * that also work without scripting; with it, they land on the chapter's
 * settled frame and the truck time-lapses there.
 */
export function ChapterRail() {
  const active = useStorySelector((p) => {
    let current = 0;
    CHAPTERS.forEach((c, i) => {
      if (p >= STOP_INDEX[c.first] - 0.5) current = i;
    });
    return current;
  }, 0);

  return (
    <nav className={styles.rail} aria-label="Presentation chapters">
      <ol>
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={styles.railLink}
              aria-current={active === i ? "step" : undefined}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (scrollToStop(chapter.first)) event.preventDefault();
              }}
            >
              <span className={styles.railNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.railName}>{chapter.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
