import { PictureBook } from "./deck/PictureBook";
import { Welcome } from "./chapters/Welcome";
import { LandscapeChapter } from "./chapters/LandscapeChapter";
import { RhythmChapter } from "./chapters/RhythmChapter";
import { AdventuresChapter } from "./chapters/AdventuresChapter";
import { SeasonsChapter } from "./chapters/SeasonsChapter";
import { Farewell } from "./chapters/Farewell";

export default function SatoyamaPage() {
  return <PictureBook pages={[<Welcome key="welcome" />, <LandscapeChapter key="landscape" />, <RhythmChapter key="rhythm" />, <AdventuresChapter key="adventures" />, <SeasonsChapter key="seasons" />, <Farewell key="farewell" />]} />;
}
