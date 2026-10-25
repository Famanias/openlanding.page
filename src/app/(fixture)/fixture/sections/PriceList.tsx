import { SERVICES } from "../content/services";
import { STAGES } from "../fitout/scene";
import { AddToBrief } from "../forms/AddToBrief";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";

const stageName = (id: string) => STAGES.find((stage) => stage.id === id);

/** Services as shelf tags on two drawn shelves. No hourly meter, no "starting at, contact us". */
export function PriceList() {
  const shelves = [SERVICES.slice(0, 3), SERVICES.slice(3)];
  return (
    <section id="prices" className="fx-section fx-prices" aria-labelledby="fx-prices-title">
      <div className="fx-container">
        <Reveal className="fx-section-head" kind="rise">
          <p className="fx-eyebrow"><span>Price list</span><span>No hourly meter</span></p>
          <h2 id="fx-prices-title"><SplitText>{"Every stage has\na price on the tag."}</SplitText></h2>
          <p className="fx-section-lead">Pick the stages you need. Each one is scoped, priced and scheduled before we start, and if we find something extra we quote it before touching it.</p>
        </Reveal>
        {shelves.map((shelf, row) => (
          <div key={row} className="fx-shelf">
            <Reveal className="fx-shelf__rail" kind="draw" index={row} />
            <ul className="fx-shelf__tags">
              {shelf.map((service, index) => {
                const stage = stageName(service.stage);
                return (
                  <Reveal as="li" key={service.sku} kind="hang" index={index}>
                    <TiltCard className="fx-tag" max={5}>
                      <span className="fx-tag__hole" aria-hidden="true" />
                      <div className="fx-tag__top">
                        <span className="fx-mono fx-tag__sku">{service.sku}</span>
                        <span className="fx-mono fx-tag__stage">Stage {stage?.n} · {stage?.name}</span>
                      </div>
                      <h3 className="fx-tag__name">{service.name}</h3>
                      <p className="fx-tag__price">
                        {service.unit === "from" ? <span className="fx-tag__unit">from</span> : null}
                        {service.price}
                        {service.unit !== "from" && service.unit !== "flat" ? <span className="fx-tag__unit">{service.unit}</span> : null}
                        {service.unit === "flat" ? <span className="fx-tag__unit">flat</span> : null}
                      </p>
                      <p className="fx-tag__blurb">{service.blurb}</p>
                      <div className="fx-tag__foot">
                        <span className="fx-mono">Lead · {service.lead}</span>
                        <AddToBrief need={service.stage} label={service.name} />
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
