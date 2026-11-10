import { InquiryForm } from "../forms/InquiryForm";

export function Inquiry() {
  return <section className="fo-inquiry fo-section" id="inquiry"><div className="fo-section-top fo-mono"><span>05 / PROJECT INQUIRY</span><span>THE NEXT FRAME</span></div><div className="fo-inquiry__layout"><div data-reveal="mask"><p className="fo-kicker">HAVE A STORY IN MIND?</p><h2>Let’s make<br /><em>something</em><br />that stays.</h2><p>Every project begins with a conversation. Tell us what you are imagining.</p><span className="fo-inquiry__mark fo-mono">FRAME / ONE<br />INQUIRY SHEET 001</span></div><div data-reveal="rise"><InquiryForm /></div></div></section>;
}
