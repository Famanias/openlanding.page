const faqs = [
  ["Is this a rebuild service?", "No. AFTERCART is for the work that keeps a live shop healthy after the big launch work is done. We can spot a larger rebuild when it is genuinely the right next move, but the first step is a focused care window."],
  ["Do you need access to my Shopify admin?", "A real engagement would use the least access needed for the agreed care track. This template is a fictional demo and does not connect to Shopify or any outside system."],
  ["What happens after the call?", "You leave with one named next pass, the reason it matters, and a simple way to decide whether ongoing care fits your shop."],
  ["Can I use this template for my own service?", "Yes. Swap the name, copy, palette, and form endpoint. Keep the console mechanic only if it helps visitors understand the service you actually provide."],
] as const;

export function FAQ() {
  return (
    <section className="ac-faq" aria-labelledby="faq-title">
      <div className="ac-container ac-faq-grid">
        <div data-ac-reveal="rise"><p className="ac-section-note">Small questions</p><h2 id="faq-title">A clear read before you call.</h2></div>
        <div className="ac-faq-list" data-ac-reveal="draw">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
