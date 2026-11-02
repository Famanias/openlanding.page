import { Runtime } from "./motion/Runtime";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Work } from "./sections/Work";
import { Approach } from "./sections/Approach";
import { Community } from "./sections/Community";
import { Contact } from "./sections/Contact";

export default function Page() {
  return <><main><Hero/><div className="asc-client-strip asc-wrap"><span>GOOD WORK STARTS WITH GOOD COMPANY</span><div aria-label="Fictional client examples"><b>✳ NUVORO</b><b>◒ mavori</b><b>◇ Veyla</b><b>◌ otherloom</b><b>✦ KIVORA</b></div></div><Services/><Work/><Approach/><Community/><Contact/></main><Runtime/></>;
}
