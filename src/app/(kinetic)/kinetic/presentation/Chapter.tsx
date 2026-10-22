import type { CSSProperties, ReactNode } from "react";
import type { StopId } from "../journey/story";
import styles from "./presentationStyles";

type ChapterProps = {
  id: string;
  stops: readonly StopId[];
  /** Section height in viewport heights; the stage stays pinned for the extra length. */
  length: number;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

/**
 * One scene of the presentation. The section reserves scroll length; its
 * stage sticks under the nav while the beats listed in `stops` play, so the
 * reader gets a still, composed frame to read before the journey moves on.
 * Without scripting (or on very short screens) the stage simply flows.
 */
export function Chapter({ id, stops, length, labelledBy, className = "", children }: ChapterProps) {
  return (
    <section
      id={id}
      data-chapter
      data-stops={stops.join(",")}
      aria-labelledby={labelledBy}
      className={styles.chapter}
      style={{ "--len": length } as CSSProperties}
    >
      <div data-stage className={`${styles.stage} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function ChapterLabel({ n, name, meta }: { n: number; name: string; meta?: string }) {
  return (
    <p className={styles.label}>
      <span className={styles.labelNum}>{String(n).padStart(2, "0")}</span>
      <span className={styles.labelRule} aria-hidden="true" />
      <span className={styles.labelName}>{name}</span>
      {meta ? <span className={styles.labelMeta}>{meta}</span> : null}
    </p>
  );
}
