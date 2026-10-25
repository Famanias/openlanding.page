import { LOOKS } from "../content/looks";
import { Look } from "../looks/Look";
import { LookStack } from "../looks/LookStack";

/** Six selects, six looks: sticky full-bleed frames that slide over one another. */
export function Looks() {
  return (
    <section id="looks" className="cg-looks" aria-label="The six looks">
      <LookStack>
        {LOOKS.map((look, index) => <Look key={look.n} look={look} index={index} />)}
      </LookStack>
    </section>
  );
}
