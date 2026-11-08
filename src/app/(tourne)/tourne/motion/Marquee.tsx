type MarqueeProps = { items: readonly string[]; label: string };

/** Two identical tracks translate by one track width; paused on hover/focus and off-screen via CSS. */
export function Marquee({ items, label }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <ul className="tn-marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <i className="tn-marquee-dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="tn-marquee" role="group" aria-label={label} tabIndex={0}>
      <div className="tn-marquee-lane">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
