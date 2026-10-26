import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Network } from "./sections/Network";
import { Paths } from "./sections/Paths";
import { Experience } from "./sections/Experience";
import { Stories } from "./sections/Stories";
import { Questions } from "./sections/Questions";
import { Begin } from "./sections/Begin";
import { Footer } from "./sections/Footer";
import { MotionRuntime } from "./motion/MotionRuntime";
export default function Firstday() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Network />
        <Paths />
        <Experience />
        <Stories />
        <Questions />
        <Begin />
      </main>
      <Footer />
      <MotionRuntime />
    </>
  );
}
