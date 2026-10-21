import { PageFoot } from "./PageFoot";

/** Page 2. */
export function EditorsLetter() {
  return (
    <div className="wf-sheet wf-sheet--worn">
      <p className="wf-label">Editor&apos;s letter</p>
      <h2 className="wf-h2">A note on rooms</h2>
      <div className="wf-flow">
        <p className="wf-text wf-dropcap">
          Every record we press is made somewhere, and the somewhere always gets onto the tape. This issue is about
          that: a stairwell, a kitchen, a flat with the heating on.
        </p>
        <p className="wf-text">
          We still print on a two-colour press above the plant and fold every copy by hand on Thursdays. Come and help,
          or at least read slowly.
        </p>
        <p className="wf-sign">Dee Okafor-Lind, editor</p>
      </div>
      <dl className="wf-masthead wf-label">
        <div>
          <dt>Editor</dt>
          <dd>Dee Okafor-Lind</dd>
        </div>
        <div>
          <dt>Design</dt>
          <dd>Sol Marchetti</dd>
        </div>
        <div>
          <dt>Print</dt>
          <dd>Two inks, uncoated stock</dd>
        </div>
        <div>
          <dt>Stitching</dt>
          <dd>Thursdays</dd>
        </div>
      </dl>
      <PageFoot n={2} />
    </div>
  );
}
