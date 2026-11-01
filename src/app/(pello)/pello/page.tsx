import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Balance } from "./sections/Balance";
import { Journal } from "./sections/Journal";
import { Product } from "./sections/Product";
import { Stories } from "./sections/Stories";
import { Questions } from "./sections/Questions";
import { Begin } from "./sections/Begin";
import { Footer } from "./sections/Footer";
import { Runtime } from "./motion/Runtime";
export default function Pello() {
  return <div className="pel-site" id="pel-site"><Header/><main id="main"><Hero/><Balance/><Journal/><Product/><Stories/><Questions/><Begin/></main><Footer/><Runtime/></div>;
}
