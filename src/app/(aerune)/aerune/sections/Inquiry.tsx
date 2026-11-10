import { InquiryForm } from "../forms/InquiryForm";

export function Inquiry() {
  return <section className="ar-section ar-inquiry" id="request"><div className="ar-inquiry__copy" data-reveal="rise"><p className="ar-eyebrow">LET&apos;S CLEAR THE AIR</p><h2>Make space for<br /><span>what matters.</span></h2><p>See what a more complete picture of your workplace could look like.</p></div><div className="ar-inquiry__form" data-reveal="scale"><div className="ar-inquiry__form-head"><span>START A CONVERSATION</span><span>↗</span></div><h3>Get to know AERUNE.</h3><p>Leave a few details to preview a demo request.</p><InquiryForm /></div></section>;
}
