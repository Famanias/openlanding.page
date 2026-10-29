import { PARTS } from "../data/parts";
import type { PartId } from "../scene/anatomy";
export function PartCallout({
  selected,
  onSelect,
  onHighlight,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  onHighlight: (id?: PartId) => void;
}) {
  return (
    <div
      className="am-parts am-inspector-parts"
      role="group"
      aria-label="Explore the six umbrella parts"
    >
      {PARTS.map((part, index) => (
        <button
          key={part.id}
          type="button"
          data-part={part.id}
          aria-controls="am-inspector-detail"
          aria-pressed={selected === part.id}
          className={selected === part.id ? "is-active" : ""}
          onClick={() => onSelect(part.id)}
          onMouseEnter={() => onHighlight(part.id)}
          onMouseLeave={() => onHighlight(undefined)}
          onFocus={() => onHighlight(part.id)}
          onBlur={() => onHighlight(undefined)}
        >
          <small aria-hidden="true">0{index + 1}</small>
          <span>{part.name}</span>
        </button>
      ))}
    </div>
  );
}
