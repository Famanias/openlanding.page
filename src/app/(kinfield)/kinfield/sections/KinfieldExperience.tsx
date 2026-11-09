'use client';

import { useState } from "react";
import { SideDock } from "./SideDock";
import { Hero } from "./Hero";
import { Practice } from "./Practice";
import { Atlas } from "./Atlas";
import { Ledger } from "./Ledger";
import { Teachers } from "./Teachers";
import { SessionPicker } from "./SessionPicker";
import { Closing } from "./Closing";
import { MotionDirector } from "../motion/MotionDirector";
import type { ClassId } from "../study/model";

export function KinfieldExperience() {
  const [selectedClass, setSelectedClass] = useState<ClassId>("groundwork");
  return (
    <main className="kinfield" id="top" tabIndex={-1}>
      <a className="kf-skip" href="#practice">Skip to the practice</a>
      <MotionDirector />
      <SideDock />
      <Hero />
      <Practice />
      <Atlas />
      <Ledger selectedClass={selectedClass} onSelect={setSelectedClass} />
      <Teachers />
      <SessionPicker selectedClass={selectedClass} onSelect={setSelectedClass} />
      <Closing />
      <noscript><style>{".kf-scroll-copy{opacity:1!important;transform:none!important;filter:none!important}"}</style><div className="kf-noscript">This is a fictional studio. JavaScript enables the interactive atlas and session preview; no reservation is made.</div></noscript>
    </main>
  );
}
