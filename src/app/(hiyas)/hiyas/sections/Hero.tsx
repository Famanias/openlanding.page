import { VideoPlate } from "../assets";
import { Reveal } from "../motion/Reveal";

export function Hero() {
  return <section className="hy-hero" id="top" aria-labelledby="hy-hero-title"><div className="hy-container hy-hero__grid"><div className="hy-hero__copy"><div><Reveal className="hy-label">Guided 8,000 m expeditions</Reveal><h1 id="hy-hero-title" className="hy-hero__title">Plan the line. Earn the summit.</h1><p className="hy-hero__lead">Compare the route, days, and support before the mountain asks.</p><div className="hy-hero__actions"><a className="hy-button hy-button--primary" href="#planner"><span>Plan an expedition</span><span className="hy-button__arrow">↗</span></a><a className="hy-button" href="#peaks"><span>Explore the fourteen</span><span className="hy-button__arrow">↓</span></a></div></div><div className="hy-hero__meta"><span>Hiyas / alpine expeditions</span><span>Kathmandu / high camp</span><span>Plan first / move well</span></div></div><div className="hy-hero__image"><VideoPlate clipKey="route-dawn" posterKey="hero-route" label="Pre-dawn mountain ridge with a route team" priority/><div className="hy-hero__badge">Route<br/>room</div><svg className="hy-hero__route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M5 88C20 76 24 82 36 62s17-8 26-22 17-2 29-30" pathLength="100"/></svg></div></div></section>;
}

