import { ScrollChrome } from "./motion/ScrollChrome";
import { SmoothScroll } from "./motion/SmoothScroll";
import { About } from "./sections/About";
import { Crew } from "./sections/Crew";
import { Estimate } from "./sections/Estimate";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { JobLogSection } from "./sections/JobLogSection";
import { Ticker } from "./sections/Ticker";
import { Work } from "./sections/Work";
import { Yard } from "./sections/Yard";
import { JobKindProvider } from "./work/JobKindProvider";

export default function TolvarPage() {
  return (
    <>
      <a className="tv-skip" href="#work">
        Skip to the work
      </a>
      <Header />
      <main className="tv-main">
        <Hero />
        <Ticker />
        {/* the kind of work picked in the tabs rides down to the estimate form */}
        <JobKindProvider>
          <Work />
          <JobLogSection />
          <Yard />
          <About />
          <Crew />
          <Estimate />
        </JobKindProvider>
      </main>
      <Footer />
      <ScrollChrome />
      <SmoothScroll />
    </>
  );
}
