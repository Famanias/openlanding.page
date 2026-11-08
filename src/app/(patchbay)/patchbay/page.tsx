import { RoleProvider } from "./bay/RoleProvider";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";
import { About } from "./sections/About";
import { CaseStudy } from "./sections/CaseStudy";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Process } from "./sections/Process";
import { Stack } from "./sections/Stack";
import { Work } from "./sections/Work";

export default function PatchbayPage() {
  return (
    <RoleProvider>
      <ScrollProgress />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Process />
        <CaseStudy />
        <About />
        <Contact />
      </main>
      <Footer />
    </RoleProvider>
  );
}
