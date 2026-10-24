import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Planner } from "./planner/Planner";
import { PlannerProvider } from "./planner/PlannerProvider";
import { PeakIndex } from "./sections/PeakIndex";
import { Stages } from "./sections/Stages";
import { Support } from "./sections/Support";
import { Logistics } from "./sections/Logistics";
import { FieldNotes } from "./sections/FieldNotes";
import { Inquiry } from "./sections/Inquiry";

export default function HiyasPage() {
  return <PlannerProvider><div className="hy-shell"><a className="hy-skip" href="#main">Skip to the route room</a><Header/><main id="main" className="hy-main"><Hero/><Planner/><PeakIndex/><Stages/><Support/><Logistics/><FieldNotes/><Inquiry/></main><Footer/></div></PlannerProvider>;
}

