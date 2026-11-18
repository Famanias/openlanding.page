import type { Metadata } from "next";
import { Dock } from "../dock/Dock";
import { ScrollDirector } from "../stage/ScrollDirector";
import { Finale } from "../sections/Finale";
import { SubpageHeader } from "../sections/SubpageHeader";
import { TopBar } from "../sections/TopBar";
import { PartsCatalog } from "./PartsCatalog";

export const metadata: Metadata = {
  title: "Repertoire & Studio Parts — Understudy",
  description:
    "Browse all 10 Understudy parts across Engineering, Product, Data, Design, Growth, and Operations. Inspect briefs, tools, and deliverables.",
  alternates: { canonical: "/templates/understudy/parts" },
};

export default function UnderstudyPartsPage() {
  return (
    <>
      <a className="us-skip" href="#main">Skip to parts catalog</a>
      <TopBar activePage="parts" />
      <main id="main" className="us-sub-main">
        <SubpageHeader
          eyebrow="Repertoire · CMS Directory"
          title="Every part in the"
          accent="repertoire."
          lede="Pick a role, read its production brief, and open the full syllabus before booking your first call time. Every part runs 10 hours a week with a live cast."
          stats={[
            { label: "Active parts", value: "10 roles" },
            { label: "Run length", value: "5–8 weeks" },
            { label: "Cast size", value: "4–6 peers" },
            { label: "Weekly pace", value: "10 hrs/wk" },
          ]}
        />
        <PartsCatalog />
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
    </>
  );
}
