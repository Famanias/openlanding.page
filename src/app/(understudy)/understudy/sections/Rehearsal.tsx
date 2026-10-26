import type { CSSProperties } from "react";
import { CueDot } from "../brand/Props";
import { MaskLine, Reveal } from "../motion/Reveal";
import { WaveLine, letterCount } from "../motion/WaveLine";
import { SCENES } from "../rehearsal/scenes";
import { SceneWindow } from "../rehearsal/Windows";

const LINE = ["Learn", "the", "part", "by", "playing", "it."];

/**
 * The house lights come back up over a dark bowl that flattens as you arrive. The line is held
 * at the top while a cue runs through it, then the four scenes pass beneath it, strung on one
 * line the scroll draws: from the title, across to a rail, through a node beside each scene.
 */
export function Rehearsal() {
  return (
    <section className="us-rehearse" id="rehearsal" data-scene="rehearse" data-flow data-line="1" data-tone="light" aria-labelledby="us-rehearse-t">
      <i className="us-bowl" aria-hidden="true" />
      {/* a measuring strip: the held line can't be measured once stuck, so this feeds its cue progress */}
      <i className="us-rehearse__cue" data-scene="wave" data-flow data-line="0.8" data-feeds=".us-rehearse__hold" aria-hidden="true" />
      <div className="us-rehearse__hold">
        <h2 className="us-rehearse__t" id="us-rehearse-t">
          <span className="us-sr">Learn the part by playing it.</span>
          <WaveLine words={LINE} total={letterCount(LINE)} cue={[4, 5]} after={<CueDot className="us-wave__pop" />} />
        </h2>
      </div>

      <div className="us-thread" data-scene="thread" data-flow data-line="0.7">
        <svg className="us-thread__lead" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M600 0C600 112 24 68 24 178" pathLength={1} />
        </svg>
        <i className="us-thread__rail" aria-hidden="true"><b /></i>
        <ol className="us-scenes">
          {SCENES.map((s, n) => (
            <li key={s.id} className="us-sc" style={{ "--i": n } as CSSProperties}>
              <div className="us-sc__h">
                <Reveal variant="scale" className="us-sc__node" ><i /></Reveal>
                <Reveal variant="slide" as="p" className="us-mono us-sc__n">{s.n}</Reveal>
                <h3 className="us-sc__t"><MaskLine>{s.lead} <em className="us-cueword">{s.cue}</em></MaskLine></h3>
                <Reveal as="p" className="us-sc__p" index={1}>{s.body}</Reveal>
              </div>
              <SceneWindow kind={s.id} title={s.window} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
