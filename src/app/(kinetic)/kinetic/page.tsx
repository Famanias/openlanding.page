import type { Metadata, Viewport } from "next";
import { CursorFlashlight } from "./components/CursorFlashlight";
import { LandingNav } from "./presentation/LandingNav";
import { LandingFooter } from "./presentation/LandingFooter";
import { JourneyExperience } from "./journey/JourneyExperience";
import { ChapterRail } from "./presentation/ChapterRail";
import {
  ArriveChapter,
  ConnectedChapter,
  DepartChapter,
  PrepareChapter,
  WorkspaceChapter,
} from "./presentation/chapters";
import { SceneScrim } from "./presentation/SceneScrim";
import { SlideController } from "./presentation/SlideController";
import { TruckTag } from "./presentation/TruckTag";
import { ZoomLock } from "./components/ZoomLock";

export const metadata: Metadata = {
  title: "KINETIC — Autonomous Freight & Megamarket Operations",
  description:
    "KINETIC — an autonomous transportation and fulfillment operating system. Follow Unit 104 from Chicago to Dallas across a 1,400-meter live 3D road.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function KineticPage() {
  return (
    <div
      data-journey="static"
      className="landing-warm relative min-h-screen touch-pan-x touch-pan-y overflow-x-clip bg-[var(--canvas)] font-ui text-[var(--text)]"
    >
      <ZoomLock />
      <CursorFlashlight />
      <JourneyExperience />
      <LandingNav />
      <SceneScrim />
      <TruckTag />
      <ChapterRail />
      <SlideController />
      
      {/* Five pinned scenes following Unit 104 from Chicago gate to Dallas dock */}
      <main id="top" className="relative">
        <DepartChapter />
        <PrepareChapter />
        <ConnectedChapter />
        <WorkspaceChapter />
        <ArriveChapter />
      </main>
      
      <LandingFooter />
    </div>
  );
}
