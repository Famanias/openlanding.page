import { Signup } from "../forms/Signup";
import { Reveal } from "../motion/Reveal";
export function Begin() {
  return <section id="begin" data-chapter className="pel-begin pel-section"><div className="pel-container"><Reveal><p className="pel-eyebrow"><i/> HERE’S TO A LITTLE NEW BEGINNING</p></Reveal><Reveal variant="mask"><h2>The next big thing<br/>starts a little smaller.</h2></Reveal><Reveal><p>A clear picture. A small plan. A little more room for you.</p></Reveal><Reveal variant="scale"><Signup/></Reveal></div></section>;
}
