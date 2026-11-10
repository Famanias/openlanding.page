import { Director } from "./motion/Director";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Curtain } from "./sections/Curtain";
import { Season } from "./sections/Season";
import { SeatPicker } from "./seats/SeatPicker";
import { Company } from "./sections/Company";
import { Visit } from "./sections/Visit";
import { Footer } from "./sections/Footer";
import { ProductionProvider } from "./sections/ProductionContext";

export default function GrandstandPage() {
  return <><a href="#main" className="gs-skip">Skip to content</a><noscript><style>{`.gs-zoom,.gs-map,.gs-alternative,.gs-receipt-button,.gs-reset,.gs-menu-button { display:none!important } .gs-schedule { flex-wrap:wrap } .gs-schedule a { display:flex; min-height:38px } .gs-production-row { display:none!important }`}</style></noscript><Director/><Header/><main id="main"><Hero/><Curtain/><ProductionProvider><Season/><noscript><p className="gs-noscript">JavaScript is needed to explore the season and seat picker. Seating and prices are illustrative.</p></noscript><SeatPicker/></ProductionProvider><Company/><Visit/></main><Footer/></>;
}
