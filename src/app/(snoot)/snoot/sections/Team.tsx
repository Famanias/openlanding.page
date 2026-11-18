import { Picture } from "../assets";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { TEAM } from "./content";
import { Heading } from "./Heading";

export function Team() {
  return (
    <section id="team" className="sn-sec sn-team sn-handoff" aria-labelledby="sn-team-title">
      <Heading eyebrow="The team" lines={["Vets who go home", "to pets of their own."]} id="sn-team-title" />
      <ul className="sn-team-grid">
        {TEAM.map((vet, i) => (
          <Reveal as="li" key={vet.name} variant="pop" index={i}>
            <TiltCard className="sn-vet">
              <div className="sn-vet-photo">
                <Picture assetKey={vet.image} alt={vet.alt} sizes="(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 90vw" />
              </div>
              <span className="sn-vet-sticker sn-chart">with {vet.pet}</span>
              <div className="sn-vet-copy">
                <h3 className="sn-h3">{vet.name}</h3>
                <p className="sn-chart">{vet.role}</p>
                <p>{vet.note}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

