import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
import { ContactSheet } from "../sheet/ContactSheet";
import { SheetController } from "../sheet/SheetController";

/** The hero is the contact sheet: the loupe sweeps it, six frames get looped, frame 02 enlarges into Look 01. */
export function Sheet() {
  return (
    <SheetController>
      <div className="cg-sheet__stage">
        <div className="cg-container cg-sheet__grid">
          <div className="cg-sheet__copy cg-load">
            <p className="cg-eyebrow cg-load__item" style={{ "--i": 0 } as CSSProperties}>
              <span>Collection 07</span><span>Concrete Flash</span><span>AW26</span>
            </p>
            <h1 id="cg-title" className="cg-sheet__title">
              <SplitText delay={260}>{"Marked\nfor keeps."}</SplitText>
            </h1>
            <p className="cg-sheet__lead cg-load__item" style={{ "--i": 1 } as CSSProperties}>
              Tailoring and outerwear cut from deadstock cloth in London. One roll of film, shot at night with a flash. Six frames made the edit.
            </p>
            <div className="cg-sheet__actions cg-load__item" style={{ "--i": 2 } as CSSProperties}>
              <Magnetic>
                <a className="cg-button cg-button--solid" href="#looks">
                  <span className="cg-button__fill" aria-hidden="true" />
                  <span className="cg-button__roll"><span>See the six looks</span><span aria-hidden="true">See the six looks</span></span>
                </a>
              </Magnetic>
              <a className="cg-button cg-button--line" href="#shop">
                <span className="cg-button__fill" aria-hidden="true" />
                <span className="cg-button__roll"><span>Shop the collection</span><span aria-hidden="true">Shop the collection</span></span>
              </a>
            </div>
            <p className="cg-sheet__cue cg-mono cg-load__item" style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
              <span className="cg-dot" /> <span data-frame-counter>Frame 01 / 12</span> <span className="cg-sheet__cue-hint">· scroll to edit the roll</span>
            </p>
          </div>
          <div className="cg-sheet__board cg-load__board">
            <ContactSheet />
          </div>
        </div>
        <div className="cg-enlarge" aria-hidden="true">
          <Picture assetKey="roll-02" alt="" sizes="100vw" />
        </div>
        <span className="cg-strobe cg-strobe--sheet" aria-hidden="true" />
      </div>
    </SheetController>
  );
}
