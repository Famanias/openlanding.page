import { JoinForm } from "../forms/JoinForm";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Join() {
  return <section className="fl-section fl-join" id="join" aria-labelledby="fl-join-title"><div className="fl-join-copy"><Reveal variant="mask"><p className="fl-eyebrow">Your next little good thing</p><h2 id="fl-join-title">Let’s make your<br /><em>day bloom.</em></h2></Reveal><Reveal><p className="fl-lead">Leave us a little hello. We’ll help you find<br />the flowers that feel right at home.</p><span className="fl-script fl-join-note">There’s always room<br />for a little lovely.<Flower /></span></Reveal></div><Reveal variant="scale" className="fl-form-wrap"><JoinForm /></Reveal></section>;
}
