import { Reveal } from "../motion/Reveal";
const questions = [
  {
    q: "Do I need experience to start?",
    a: "Just curiosity and a little time. Every path starts with the basics, then gives you a useful challenge. You’ll have a mentor and a small team alongside you.",
  },
  {
    q: "What does a typical week look like?",
    a: "Plan for 4–6 hours of project work, one small-team check-in, and practical feedback from your mentor. The work fits around your life, with space to learn at your own pace.",
  },
  {
    q: "Will I have something for my portfolio?",
    a: "That’s the idea. You’ll finish with a project, a clear account of how you approached it, and feedback that helps you explain what you learned.",
  },
  {
    q: "Can I try a path before committing?",
    a: "Explore any path above to see its sample brief and skills. This is a fictional landing-page template: the signup below creates a local preview, with no payment or enrollment.",
  },
];
export function Questions() {
  return (
    <section className="fd-questions fd-wrap" aria-labelledby="fd-faq-title">
      <Reveal variant="mask">
        <p className="fd-eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p>
        <h2 id="fd-faq-title">
          Good questions.
          <br />
          <span className="fd-soft">Honest answers.</span>
        </h2>
      </Reveal>
      <div>
        {questions.map((item, i) => (
          <Reveal key={item.q} variant="draw">
            <details className="fd-faq">
              <summary>
                <span className="fd-label">0{i + 1}</span>
                {item.q}
                <span className="fd-faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="fd-faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
