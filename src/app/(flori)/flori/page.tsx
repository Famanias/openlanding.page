import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Promise } from "./sections/Promise";
import { Collection } from "./sections/Collection";
import { Composer } from "./sections/Composer";
import { Story } from "./sections/Story";
import { Plans } from "./sections/Plans";
import { Join } from "./sections/Join";
import { Footer } from "./sections/Footer";
import { PageMotion } from "./motion/PageMotion";
import { SmoothScroll } from "./motion/SmoothScroll";

export default function FloriPage() {
  return <><a className="fl-skip" href="#flowers">Skip to the flowers</a><Header /><main><Hero /><Promise /><Collection /><Composer /><Story /><Plans /><Join /></main><Footer /><PageMotion /><SmoothScroll /></>;
}
