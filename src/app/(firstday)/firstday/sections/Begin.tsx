import { Reveal } from "../motion/Reveal";
import { SignupForm } from "../forms/SignupForm";
import { DoorMark } from "../brand/Logo";
export function Begin() {
  return (
    <section className="fd-begin" id="begin" aria-labelledby="fd-begin-title">
      <div className="fd-wrap fd-begin-inner">
        <Reveal variant="mask">
          <p className="fd-eyebrow">YOUR NEXT CHAPTER / PAGE ONE</p>
          <h2 id="fd-begin-title">
            You don’t have to
            <br />
            see the whole way.
            <br />
            <span className="fd-soft">Just the first step.</span>
          </h2>
          <p>
            A little curiosity can take you a long way.
            <br />
            Let’s see where yours goes.
          </p>
          <div className="fd-begin-door" aria-hidden="true">
            <DoorMark />
          </div>
        </Reveal>
        <Reveal variant="card" className="fd-form-panel">
          <SignupForm />
        </Reveal>
      </div>
    </section>
  );
}
