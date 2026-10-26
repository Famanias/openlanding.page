import { Dock } from "./dock/Dock";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Casting } from "./sections/Casting";
import { Contract } from "./sections/Contract";
import { Finale } from "./sections/Finale";
import { Hero } from "./sections/Hero";
import { Parts } from "./sections/Parts";
import { Rehearsal } from "./sections/Rehearsal";
import { TopBar } from "./sections/TopBar";
import { ScrollDirector } from "./stage/ScrollDirector";

export default function UnderstudyPage() {
  return (
    <>
      <a className="us-skip" href="#parts">Skip to the parts</a>
      <TopBar />
      <main id="main">
        <Hero />
        <Parts />
        <Rehearsal />
        <Casting />
        <Contract />
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
      <SmoothScroll />
    </>
  );
}
