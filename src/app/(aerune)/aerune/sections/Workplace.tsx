import { Picture } from "../assets";
import { ActionLink } from "../brand/ActionLink";

export function Workplace() {
  return <section className="ar-section ar-workplace">
    <div className="ar-workplace__copy" data-reveal="rise"><p className="ar-eyebrow">MADE FOR THE PLACES WE SHARE</p><h2>A better day<br /><span>starts inside.</span></h2><p>When building teams understand the rhythm of a space, they can make more considered choices for the people in it.</p><ActionLink href="#request">Request a demo</ActionLink><div className="ar-workplace__index"><span>SPACE / 02</span><span>THE WORKPLACE</span></div></div>
    <div className="ar-workplace__visual" data-reveal="wipe"><Picture assetKey="building-at-dusk" alt="A quiet contemporary workplace at blue hour" className="ar-workplace__image" /><div className="ar-building-graphic" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div><div className="ar-workplace__reading"><span>THE ROOM, IN CONTEXT</span><strong>One clearer view.</strong><small>SPACE / PEOPLE / AIR</small></div></div>
  </section>;
}
