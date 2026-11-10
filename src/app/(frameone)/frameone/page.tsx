import { Grain } from "./assets";
import { MotionDirector } from "./motion/MotionDirector";
import { Chrome } from "./sections/Chrome";
import { DirectorNotes } from "./sections/DirectorNotes";
import { Footer } from "./sections/Footer";
import { Inquiry } from "./sections/Inquiry";
import { ProofSheet } from "./sections/ProofSheet";
import { SelectedReel } from "./sections/SelectedReel";
import { WorkSwitcher } from "./sections/WorkSwitcher";
import { ContactSheet } from "./sheet/ContactSheet";
import { FilmProvider } from "./sheet/FilmProvider";

export default function FrameOnePage() {
  return <FilmProvider><MotionDirector /><Grain /><Chrome /><main id="main"><ContactSheet /><SelectedReel /><WorkSwitcher /><DirectorNotes /><ProofSheet /><Inquiry /></main><Footer /></FilmProvider>;
}
