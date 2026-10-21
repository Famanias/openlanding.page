import { Subscribe } from "../forms/Subscribe";
import { PageFoot } from "./PageFoot";

/** Page 13. */
export function SubscribePage() {
  return (
    <div className="wf-sheet wf-sheet--stock">
      <p className="wf-label">Get the next issue</p>
      <h2 className="wf-h2">Issue 08 is at the plant.</h2>
      <p className="wf-text">
        One email when it ships, and a zine through your door if you ask for one. We write rarely and we never share the
        list.
      </p>
      <Subscribe />
      <PageFoot n={13} label="Subscribe" />
    </div>
  );
}
