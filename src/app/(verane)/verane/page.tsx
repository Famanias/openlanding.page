import { ClockProvider } from "./drydown/ClockProvider";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { DryDownSection } from "./sections/DryDownSection";
import { Hours } from "./sections/Hours";
import { OrganSection } from "./sections/OrganSection";
import { Atelier } from "./sections/Atelier";
import { Appointments } from "./sections/Appointments";
import { Footer } from "./sections/Footer";

export default function VeranePage() {
  return (
    <ClockProvider initialHour={0} initialFragrance="iris-calcaire">
      <Header />
      <main id="top">
        <Hero />
        <DryDownSection />
        <Hours />
        <OrganSection />
        <Atelier />
        <Appointments />
      </main>
      <Footer />
    </ClockProvider>
  );
}
