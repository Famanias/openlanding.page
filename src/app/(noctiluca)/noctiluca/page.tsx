import { DepthRail, RoomAnnouncer } from "./chrome/DepthRail";
import { TopBar } from "./chrome/TopBar";
import { House } from "./house/House";
import { Light } from "./light/Light";
import { Poster } from "./light/Poster";
import { ExitRoom } from "./rooms/ExitRoom";
import { Foyer } from "./rooms/Foyer";
import { PhenomenonRoom } from "./rooms/PhenomenonRoom";
import { ScoreRoom } from "./score/ScoreRoom";
import { VisitRoom } from "./visit/VisitRoom";

export default function NoctilucaPage() {
  return (
    <>
      <a href="#nl-main" className="nl-skip">
        Skip to the rooms
      </a>
      <Poster />
      <Light />
      <TopBar />
      <main id="nl-main" className="nl-main">
        <House>
          <Foyer />
          <PhenomenonRoom id="blue-hour" />
          <PhenomenonRoom id="aurora" />
          <PhenomenonRoom id="noctiluca" />
          <PhenomenonRoom id="alpenglow" />
          <ScoreRoom />
          <VisitRoom />
          <ExitRoom />
        </House>
      </main>
      <DepthRail />
      <RoomAnnouncer />
      <div className="nl-grain" aria-hidden="true" />
    </>
  );
}
