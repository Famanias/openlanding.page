import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

type Props = { id: string; eyebrow: string; title: string; lede?: string; align?: "left" | "center" };

/** Eyebrow slides in, the title rises through word masks, the lede rises: three roles, three reveals. */
export function SectionHead({ id, eyebrow, title, lede, align = "left" }: Props) {
  return (
    <div className="pk-head" data-align={align}>
      <Reveal variant="slide-left"><p className="pk-eyebrow">{eyebrow}</p></Reveal>
      <Reveal variant="mask"><SplitText as="h2" id={id} className="pk-h2" text={title} /></Reveal>
      {lede ? <Reveal variant="rise" delay={180}><p className="pk-lede">{lede}</p></Reveal> : null}
    </div>
  );
}
