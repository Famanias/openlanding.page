import type { Metadata } from "next";
import { Dock } from "../dock/Dock";
import { Finale } from "../sections/Finale";
import { SubpageHeader } from "../sections/SubpageHeader";
import { TopBar } from "../sections/TopBar";
import { ScrollDirector } from "../stage/ScrollDirector";
import { CastingDirectory } from "./CastingDirectory";

export const metadata: Metadata = {
  title: "Casting Network & Partner Studios — Understudy",
  description:
    "Explore the 18 simulated studios inside Understudy and see how finished reels reach 3,400+ hiring companies.",
  alternates: { canonical: "/templates/understudy/casting" },
};

export default function UnderstudyCastingPage() {
  return (
    <>
      <a className="us-skip" href="#main">Skip to casting directory</a>
      <TopBar activePage="casting" />
      <main id="main" className="us-sub-main">
        <SubpageHeader
          eyebrow="Casting · Partner Network"
          title="You rehearse."
          accent="We cast."
          lede="Inside the studio you work at 18 simulated companies spanning fintech, health, devtools, games, and logistics. Finished reels go straight to the 3,400+ teams casting here."
          stats={[
            { label: "Simulated sets", value: "18 studios" },
            { label: "Hiring network", value: "3,400+" },
            { label: "Callbacks / season", value: "62%" },
            { label: "Median window", value: "6 weeks" },
          ]}
        />
        <CastingDirectory />
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
    </>
  );
}
