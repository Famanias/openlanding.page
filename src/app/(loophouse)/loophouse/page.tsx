import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { PegboardStation } from "./workbench/PegboardStation";
import { CirculationRoute } from "./sections/CirculationRoute";
import { ProjectKitsSection } from "./sections/ProjectKitsSection";
import { WorkshopLedgerSection } from "./sections/WorkshopLedgerSection";
import { RequisitionSection } from "./sections/RequisitionSection";
import { Footer } from "./sections/Footer";

export default function LoopHousePage() {
  return (
    <div className="lh-root">
      <Header />
      <main id="main">
        <Hero />
        <PegboardStation />
        <CirculationRoute />
        <ProjectKitsSection />
        <WorkshopLedgerSection />
        <RequisitionSection />
      </main>
      <Footer />
    </div>
  );
}
