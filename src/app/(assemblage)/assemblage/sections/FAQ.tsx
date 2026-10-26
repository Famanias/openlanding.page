const questions = [
  ["Is this a brand identity project?", "No. A material study is the working direction before a full identity, campaign or site. It gives the next project something solid to build from."],
  ["What do you need from us?", "A rough brief, a few references and the names of the people who will make the final call. Half formed is a useful starting point."],
  ["How long does it take?", "Most studies take two weeks from the first call to the handoff session. We keep the group small so decisions do not wait in a queue."],
  ["What is included in the handoff?", "A material board, type and image tests, a small set of rules, a recorded walkthrough and one working session with your team."],
  ["Can you work with an existing brand?", "Yes. We can extend an existing system, find its missing texture or help a new direction sit beside what already works."],
  ["What happens after the study?", "You can take the kit to your own team, bring us into production or ask for a separate proposal. There is no retainer attached."],
];

export function FAQ() {
  return <div className="as-faq">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><div className="as-faq-answer"><div><p>{answer}</p></div></div></details>)}</div>;
}
