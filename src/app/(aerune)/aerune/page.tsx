import { MotionEffects } from "./motion/MotionEffects";
import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { AirDemo } from "./sections/AirDemo";
import { Capabilities } from "./sections/Capabilities";
import { Approach } from "./sections/Approach";
import { Workplace } from "./sections/Workplace";
import { FAQ } from "./sections/FAQ";
import { Inquiry } from "./sections/Inquiry";
import { Footer } from "./sections/Footer";

export default function AerunePage() {
  return <><MotionEffects /><main><Hero /><Statement /><AirDemo /><Capabilities /><Approach /><Workplace /><FAQ /><Inquiry /></main><Footer /></>;
}
