import { Picture } from "../assets";

const capabilities = [
  { number: "01", icon: "◉", title: "See the whole picture", text: "Bring rooms, floors, and buildings together in one clear view." },
  { number: "02", icon: "↗", title: "Know when things change", text: "Spot a shift in your spaces as the day unfolds." },
  { number: "03", icon: "⌁", title: "Find the next step", text: "Turn a reading into a practical action your team can take." },
];

export function Capabilities() {
  return <section className="ar-section ar-capabilities" id="platform">
    <div className="ar-section-heading" data-reveal="rise"><p className="ar-eyebrow">THE AERUNE PLATFORM</p><div><h2>Clarity for every<br /><span>kind of day.</span></h2><p>All the little signals that shape a space, made easier to understand.</p></div></div>
    <div className="ar-capabilities__grid">
      <div className="ar-sensor-card" data-reveal="scale">
        <Picture assetKey="sensor-detail" alt="A small environmental sensor on a stone desk" className="ar-sensor-card__image" />
        <div className="ar-sensor-card__graphic" aria-hidden="true"><div className="ar-sensor-card__ring ar-sensor-card__ring--one" /><div className="ar-sensor-card__ring ar-sensor-card__ring--two" /><div className="ar-sensor-card__sensor"><span /><i /><i /><i /></div></div>
        <div className="ar-sensor-card__caption"><span>FROM THE ROOM</span><span>TO THE WHOLE BUILDING ↗</span></div>
      </div>
      <div className="ar-capabilities__list">{capabilities.map((item, i) => <article className="ar-capability" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={item.number}><div className="ar-capability__top"><span className="ar-capability__icon" aria-hidden="true">{item.icon}</span><span>{item.number} / 03</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="ar-capability__arrow" aria-hidden="true">↗</span></article>)}</div>
    </div>
  </section>;
}
