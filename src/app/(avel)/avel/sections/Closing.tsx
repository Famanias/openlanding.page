import { Logo, Mark } from "../brand/Logo";
import { Picture } from "../assets";
import { Signup } from "../forms/Signup";
export function Closing() {
  return <div className="avl-closing-wrap"><Picture assetKey="closing" alt="" className="avl-closing-image"/><section className="avl-closing" id="get-started"><div className="avl-closing-inner" data-reveal="rise"><Mark/><span className="avl-kicker">A LITTLE MORE IS POSSIBLE</span><h2>Make space for<br/><em>what’s next.</em></h2><p>Good ideas are waiting. Let’s see where yours can go.</p><Signup/></div></section><footer className="avl-footer"><div className="avl-footer-top"><a href="#top" aria-label="Avel home"><Logo/></a><p>A little more room<br/>for good thinking.</p><nav aria-label="Footer navigation"><a href="#models">Our models</a><a href="#how">How it works</a><a href="#stories">Our community</a><a href="#questions">Questions</a></nav><a href="#get-started" className="avl-footer-link">Get started ↗</a></div><div className="avl-footer-bottom"><span>© 2026 AVEL. A FICTIONAL COMPANY.</span><span>MADE FOR CURIOUS MINDS &nbsp; ✳</span></div></footer></div>;
}
