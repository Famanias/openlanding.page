import { Picture } from "../assets";
import { ActionLink } from "../brand/ActionLink";
import { Contours } from "../brand/Contours";
import { Header } from "./Header";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  return <section className="ar-hero" id="top">
    <Picture assetKey="hero-atmosphere" alt="Atmospheric ridgelines at blue hour" className="ar-hero__image" priority />
    <div className="ar-hero__wash" aria-hidden="true" />
    <Contours className="ar-hero__contours" />
    <Header />
    <div className="ar-hero__copy">
      <p className="ar-hero__eyebrow"><span /> A LITTLE MORE ROOM TO BREATHE</p>
      <h1><span>Make room for</span><br /><span>better <i>air.</i></span></h1>
      <p className="ar-hero__description">AERUNE makes the invisible visible, helping workplace teams understand the air in every room and make more thoughtful decisions.</p>
      <ActionLink href="#air-demo">Explore the demo</ActionLink>
      <p className="ar-hero__note">AIR INTELLIGENCE FOR THE PLACES WE SHARE <span>↓</span></p>
    </div>
    <HeroDashboard />
    <div className="ar-hero__footer"><span>01 / THE AIR HAS A STORY</span><span>DESIGNED FOR THE WAY WE WORK</span></div>
  </section>;
}
