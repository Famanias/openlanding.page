import { DoorMark } from "../brand/Logo";
const checks = [
  "Talk to real people",
  "Find the useful insight",
  "Make something better",
];
export function Workspace({ stage }: { stage: number }) {
  return (
    <div className="fd-workspace">
      <div className="fd-window-bar">
        <div className="fd-window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>your-first-project.space</span>
        <span>↗</span>
      </div>
      <div className="fd-workspace-body">
        <aside className="fd-workspace-side">
          <DoorMark />
          <span className="fd-side-active">▧</span>
          <span>◷</span>
          <span>◈</span>
          <span className="fd-side-bottom">✳</span>
        </aside>
        <div className="fd-workspace-main">
          <div className="fd-workspace-meta">
            <span className="fd-label">YOUR WORKSPACE</span>
            <span className="fd-tiny-avatars">
              <i>A</i>
              <i>J</i>
              <i>Y</i>
            </span>
          </div>
          <p className="fd-workspace-greeting">Hey, future you.</p>
          <h3>
            {stage === 0
              ? "Let’s make a start."
              : stage === 1
                ? "Better, together."
                : "Look what you made."}
          </h3>
          {stage === 0 ? (
            <>
              <div className="fd-brief-cover">
                <span className="fd-label">COMMON GROUND / PROJECT 01</span>
                <div className="fd-cover-door">
                  <DoorMark />
                </div>
                <span>
                  Good coffee.
                  <br />A better first order.
                </span>
              </div>
              <div className="fd-brief-list">
                {checks.map((check, i) => (
                  <div key={check}>
                    <span className={i === 0 ? "fd-check-done" : ""}>
                      {i === 0 ? "✓" : `0${i + 1}`}
                    </span>
                    {check}
                    <span className="fd-task-time">
                      {i === 0 ? "Done" : "Next up"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : stage === 1 ? (
            <>
              <div className="fd-coach-note">
                <span className="fd-avatar fd-avatar-large">J</span>
                <div>
                  <strong>Jules, your mentor</strong>
                  <small>Product designer · Here to help</small>
                </div>
                <span className="fd-dot" />
              </div>
              <div className="fd-chat-bubble">
                “That’s a really good question. What happens if you start with
                how they’re feeling?”<span>11:42 AM</span>
              </div>
              <div className="fd-chat-answer">
                A little less friction.
                <br />A lot more human. <span>↗</span>
              </div>
              <div className="fd-feedback">
                <span>✳</span>
                <div>
                  <strong>Small team. Big support.</strong>
                  <p>A fresh perspective is always one message away.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="fd-portfolio">
                <span className="fd-label">MADE BY YOU / PROJECT 01</span>
                <div className="fd-portfolio-symbol">↗</div>
                <h4>
                  A better
                  <br />
                  first order.
                </h4>
                <p>Research · Strategy · Prototype</p>
              </div>
              <div className="fd-complete">
                <span>✓</span>
                <div>
                  <strong>Your first project. Officially yours.</strong>
                  <p>One good story to tell in your next interview.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
