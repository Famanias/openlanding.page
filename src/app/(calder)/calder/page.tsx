import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Argument } from "./sections/Argument";
import { Authorities } from "./sections/Authorities";
import { Counsel } from "./sections/Counsel";
import { FileMatter } from "./sections/FileMatter";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Matters } from "./sections/Matters";
import { Questions } from "./sections/Questions";

export default function CalderPage() {
  return (
    <div className="cr-site">
      <a className="cr-skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Matters />
        <Argument />
        <Counsel />
        <Authorities />
        <Questions />
        <FileMatter />
      </main>
      <Footer />
      <Reveals />
      <ScrollVars />
      <SmoothScroll />
    </div>
  );
}
