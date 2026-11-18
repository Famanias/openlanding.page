import { Reveal } from "../motion/Reveal";
import { SpeciesSwitcher } from "../species/SpeciesSwitcher";
import { Heading } from "./Heading";

export function Patients() {
  return (
    <section id="patients" className="sn-sec sn-patients sn-handoff" aria-labelledby="sn-patients-title">
      <Heading eyebrow="Who we see" lines={["Four legs, two legs,", "no legs. Mostly four."]} id="sn-patients-title">
        Every vet here sees every kind of patient, and each species gets the room, the hours and the handling it actually needs.
      </Heading>
      <Reveal variant="pop" delay={120}>
        <SpeciesSwitcher />
      </Reveal>
    </section>
  );
}

