"use client";
const steps = [
  {
    title: "Try the real thing.",
    body: "A real-world brief. A blank page. Your ideas, out in the world.",
  },
  {
    title: "Find your people.",
    body: "A mentor in your corner. A small team to figure things out with.",
  },
  {
    title: "Leave with a little proof.",
    body: "Something you made. Something you learned. A story worth telling.",
  },
];
export function StageControls() {
  return (
    <div className="fd-story-controls">
      {steps.map((step, i) => (
        <button
          data-stage-button={i}
          key={step.title}
          className="fd-story-step"
          aria-pressed={i === 0}
          onClick={(e) => {
            const root = e.currentTarget.closest<HTMLElement>(".fd-story");
            if (!root) return;
            root.dataset.manual = String(i);
            root
              .querySelectorAll("[data-stage-button]")
              .forEach((button, n) =>
                button.setAttribute("aria-pressed", String(i === n)),
              );
          }}
        >
          <span className="fd-step-number">0{i + 1}</span>
          <span>
            <strong>{step.title}</strong>
            <span>{step.body}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
