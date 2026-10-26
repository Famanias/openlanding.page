import { BookingForm } from "../forms/BookingForm";
import { Reveal } from "../motion/Reveal";
export function Booking() { return <section id="book" className="nli-section nli-book"><div className="nli-book__intro"><Reveal type="label"><p className="nli-eyebrow">07 / THE NIGHT DESK</p></Reveal><Reveal type="mask"><h2>Give the day<br /><em>back to yourself.</em></h2></Reveal><Reveal type="rise"><p>Tell us the city you want to wake in. We’ll find the train that gets you there while you sleep.</p></Reveal></div><Reveal type="clip"><BookingForm /></Reveal></section>; }
