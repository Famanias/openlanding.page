import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { ReadTheLand } from "./sections/ReadTheLand";
import { WaterBudget } from "./sections/WaterBudget";
import { FieldSystems } from "./sections/FieldSystems";
import { FieldNotes } from "./sections/FieldNotes";
import { SeasonalLedger } from "./sections/SeasonalLedger";
import { FieldWalk } from "./sections/FieldWalk";
import { ProgressRail } from "./motion/ProgressRail";
import { WatershedProvider } from "./watershed/provider";

export default function RillPage() {
  return (
    <WatershedProvider>
      <div className="rl-shell">
        <a href="#main" className="rl-skip">Skip to the field</a>
        <Header />
        <ProgressRail items={[{ id: "land", label: "Land" }, { id: "budget", label: "Budget" }, { id: "systems", label: "Systems" }, { id: "notes", label: "Notes" }, { id: "ledger", label: "Ledger" }, { id: "field-walk", label: "Field walk" }]} />
        <main id="main" className="rl-main">
          <Hero />
          <ReadTheLand />
          <WaterBudget />
          <FieldSystems />
          <FieldNotes />
          <SeasonalLedger />
          <FieldWalk />
        </main>
        <Footer />
      </div>
    </WatershedProvider>
  );
}

