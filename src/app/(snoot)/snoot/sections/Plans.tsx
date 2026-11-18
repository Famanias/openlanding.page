import { Reveal } from "../motion/Reveal";
import { PlanTags } from "../plans/PlanTags";
import { Heading } from "./Heading";

export function Plans() {
  return (
    <section id="plans" className="sn-sec sn-plans" aria-labelledby="sn-plans-title">
      <Heading eyebrow="Snoot plans" lines={["Pick a tag.", "Never guess a bill."]} id="sn-plans-title">
        One monthly price covers the routine stuff, and everything else is discounted. Every extra pet in the house is 15% off.
      </Heading>
      <Reveal variant="rise" delay={160}>
        <PlanTags />
      </Reveal>
      <Reveal as="p" variant="rise" className="sn-plans-fine sn-chart">
        Illustrative prices for a fictional clinic. Plans renew monthly; cancel any time.
      </Reveal>
    </section>
  );
}

