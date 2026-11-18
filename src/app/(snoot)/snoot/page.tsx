import { CheckupStage } from "./checkup/CheckupStage";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";
import { AfterHours } from "./sections/AfterHours";
import { Book } from "./sections/Book";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Patients } from "./sections/Patients";
import { Plans } from "./sections/Plans";
import { Team } from "./sections/Team";
import { Visit } from "./sections/Visit";
import { Ticker } from "./sections/Ticker";

export default function SnootPage() {
  return (
    <>
      <a className="sn-skip" href="#book">
        Skip to booking
      </a>
      <ScrollProgress />
      <Header />
      <main className="sn-main">
        <Hero />
        <Ticker />
        <CheckupStage />
        <Patients />
        <Plans />
        <Team />
        <Visit />
        <AfterHours />
        <Book />
      </main>
      <Footer />
      <SmoothScroll />
    </>
  );
}
