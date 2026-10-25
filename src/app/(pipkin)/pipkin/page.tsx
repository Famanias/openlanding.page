import { OrderProvider } from "./box/OrderContext";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { FlavorBand } from "./sections/FlavorBand";
import { TripStage } from "./trip/TripStage";
import { Shelf } from "./sections/Shelf";
import { BoxBuilder } from "./sections/BoxBuilder";
import { BatchDay } from "./sections/BatchDay";
import { Notes } from "./sections/Notes";
import { Faq } from "./sections/Faq";
import { ListForm } from "./forms/ListForm";
import { Footer } from "./sections/Footer";

export default function PipkinPage() {
  return (
    <OrderProvider>
      <a href="#trip" className="pk-skip">Skip to the trip</a>
      <ScrollProgress />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <FlavorBand />
        <TripStage />
        <Shelf />
        <BoxBuilder />
        <BatchDay />
        <Notes />
        <Faq />
        <ListForm />
      </main>
      <Footer />
    </OrderProvider>
  );
}
