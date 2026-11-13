import { ScrollEngine } from "./motion/ScrollEngine";
import { SmoothScroll } from "./motion/SmoothScroll";
import { PipelineProvider } from "./pipeline/PipelineProvider";
import { Access } from "./sections/Access";
import { Architecture } from "./sections/Architecture";
import { BudgetLab } from "./sections/BudgetLab";
import { Dissection } from "./sections/Dissection";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";

export default function DatumPage() {
  return (
    <PipelineProvider>
      <a href="#main" className="dt-skip">
        Skip to content
      </a>
      <div className="dt-progress" aria-hidden="true" />
      <ScrollEngine />
      <SmoothScroll />
      <Header />
      <main id="main" className="dt-main">
        <Hero />
        <Dissection />
        <BudgetLab />
        <Architecture />
        <Access />
      </main>
      <Footer />
    </PipelineProvider>
  );
}
