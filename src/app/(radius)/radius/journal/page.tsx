import type { Metadata } from "next";
import { MotionController } from "../motion/MotionController";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { SubpageHeader } from "../sections/SubpageHeader";
import { JournalFeed } from "./JournalFeed";

export const metadata: Metadata = {
  title: "Field Notes & Urban Dispatches — RADIUS",
  description:
    "CMS-ready editorial collection covering city street routes, frame craft studies, tire tread notes, and carry setup.",
  alternates: { canonical: "/templates/radius/journal" },
};

export default function RadiusJournalPage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to field notes</a>
      <MotionController />
      <Header activePage="journal" />
      <main id="main">
        <SubpageHeader
          eyebrow="03 / CMS FIELD LOG"
          title="Notes from"
          accent="the detour."
          lede="Six illustrated field notes structured as an editable CMS collection — filter by route study, frame craft, or bike care."
          specs={[
            { label: "Dispatches", value: "6 entries" },
            { label: "Categories", value: "3 tracks" },
            { label: "Format", value: "CMS collection" },
            { label: "Status", value: "Editorial log" },
          ]}
        />
        <JournalFeed />
      </main>
      <Footer />
    </>
  );
}
