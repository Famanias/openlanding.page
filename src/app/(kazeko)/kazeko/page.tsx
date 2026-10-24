import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Films } from "./sections/Films";
import { Process } from "./sections/Process";
import { Studio } from "./sections/Studio";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { MotionDirector } from "./motion/MotionDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
export default function KazekoPage() {
  return <div className="kz-site"><div className="kz-progress" aria-hidden="true" /><Header /><main id="main"><Hero /><Films /><Process /><Studio /><Contact /></main><Footer /><MotionDirector /><SmoothScroll /></div>;
}
