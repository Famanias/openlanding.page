const questions = [
  ["What is AERUNE?", "AERUNE is a fictional workplace air intelligence platform. This template demonstrates how building teams might explore changing indoor conditions."],
  ["Who is it for?", "The concept is designed for workplace, facilities, and building operations teams who look after shared spaces."],
  ["Are the readings on this page live?", "No. Every reading in the interactive example is simulated to show how the interface could work."],
  ["What can the timeline show?", "The example brings together an indoor CO₂ reading, occupancy, airflow, and a suggested response for three moments in a day."],
  ["Does the page connect to real sensors?", "No. This is an independent visual template and does not connect to a sensor, building system, or external service."],
  ["What happens when I request a demo?", "The form creates a local preview in your browser. It does not send or store your information."],
];

export function FAQ() {
  return <section className="ar-section ar-faq" id="faq"><div className="ar-faq__intro" data-reveal="rise"><p className="ar-eyebrow">A FEW GOOD QUESTIONS</p><h2>Room for<br /><span>answers.</span></h2><p>Everything you might want to know before taking a closer look.</p></div><div className="ar-faq__list">{questions.map(([question, answer], i) => <details className="ar-faq__item" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={question}><summary><span>{question}</span><span className="ar-faq__plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}
