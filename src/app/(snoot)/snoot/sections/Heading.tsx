import type { ReactNode } from "react";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";

/** A section heading: eyebrow slides in, the headline rises line by line through masks. */
export function Heading({ eyebrow, lines, id, children }: { eyebrow: string; lines: string[]; id: string; children?: ReactNode }) {
  return (
    <header className="sn-sec-head">
      <Reveal as="p" variant="slide" className="sn-eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" variant="lines" className="sn-h2" id={id}>
        <Lines lines={lines} />
      </Reveal>
      {children ? (
        <Reveal as="p" variant="rise" delay={240} className="sn-sec-lede">
          {children}
        </Reveal>
      ) : null}
    </header>
  );
}

