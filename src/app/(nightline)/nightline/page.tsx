import { RainWindow } from "./journey/RainWindow";
import { Reveals } from "./motion/Reveals";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Journey } from "./sections/Journey";
import { Cabins } from "./sections/Cabins";
import { Midnight } from "./sections/Midnight";
import { Border } from "./sections/Border";
import { Dawn } from "./sections/Dawn";
import { Booking } from "./sections/Booking";
import { Footer } from "./sections/Footer";
export default function NightlinePage() { return <div className="nli-page"><RainWindow /><Header /><main><Hero /><Journey /><Cabins /><Midnight /><Border /><Dawn /><Booking /></main><Footer /><Reveals /><SmoothScroll /></div>; }
